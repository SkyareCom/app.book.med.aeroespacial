// Papos de Altitude · tradução automática do conteúdo (PT BR → EN US ou ES ES).
// Recebe uma lista de textos em português e devolve a tradução de cada um, preservando os marcadores do app:
// **destaques**, variáveis {0}, {1}..., referências "(Veja M1V3)" (que viram "(See M1V3)" / "(Ver M1V3)") e números.
// Usado pelo app (textos que ainda não estão nos dicionários) e por scripts/traduzir.cjs (que grava os dicionários).
// Nada é guardado no servidor. A chave fica no segredo ANTHROPIC_API_KEY do projeto Supabase.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ORIGENS = ["https://skyarecom.github.io"];
const MODELO = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-5-5";
const IDIOMAS: Record<string, string> = {
  "en-US": "inglês dos EUA (US English)",
  "es-ES": "espanhol da Espanha (español de España)",
};
const MAX_TEXTOS = 60;
const MAX_CARACTERES = 40_000;

const INSTRUCAO = (idioma: string) => `Você traduz o conteúdo do app-book de medicina aeroespacial "Papos de Altitude" do português do Brasil para ${idioma}.
Regras:
- Tradução fiel, técnica e clara, no registro de um livro de medicina aeroespacial para médicos e leigos. Não resuma, não acrescente, não explique.
- Use a terminologia médica e aeronáutica consagrada no idioma de destino (ex.: G-LOC, hipóxia → hypoxia / hipoxia, altitude de cabine → cabin altitude / altitud de cabina).
- Mantenha exatamente os marcadores: **texto em destaque** continua entre ** **; variáveis {0}, {1}... aparecem todas, sem mudar o número; quebras de linha iguais.
- Referências cruzadas "(Veja M1V3 - II)" viram "(See M1V3 - II)" em inglês e "(Ver M1V3 - II)" em espanhol, com o mesmo código.
- Números: em inglês, ponto decimal e vírgula de milhar (1,013.25); em espanhol, como no original (1.013,25). Unidades e siglas (ft, mmHg, RBAC 67, 14 CFR, ANAC, FAA, ICAO) não mudam; ANAC, CNEN, NR-15 e FAB são órgãos e normas brasileiros e ficam como estão.
- Textos em CAIXA ALTA continuam em caixa alta. Nomes próprios, títulos de livros e o nome do app não se traduzem.
Responda só com a ferramenta, devolvendo uma tradução para cada índice.`;

const FERRAMENTA = {
  name: "registrar_traducoes",
  description: "Registra a tradução de cada texto, pelo índice.",
  input_schema: {
    type: "object",
    properties: {
      traducoes: {
        type: "array",
        items: {
          type: "object",
          properties: { i: { type: "integer" }, texto: { type: "string" } },
          required: ["i", "texto"],
        },
      },
    },
    required: ["traducoes"],
  },
};

function permitida(origem: string | null) {
  return !!origem && (ORIGENS.includes(origem) || /^http:\/\/localhost:\d+$/.test(origem));
}

function cors(origem: string | null) {
  return {
    "Access-Control-Allow-Origin": permitida(origem) ? origem! : ORIGENS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function resposta(corpo: unknown, status: number, h: Record<string, string>) {
  return new Response(JSON.stringify(corpo), { status, headers: { ...h, "Content-Type": "application/json" } });
}

// A tradução só vale se mantiver as mesmas variáveis e o mesmo número de destaques do original.
const variaveis = (t: string) => (t.match(/\{\d+\}/g) ?? []).sort().join();
const destaques = (t: string) => (t.match(/\*\*/g) ?? []).length;

Deno.serve(async (req) => {
  const origem = req.headers.get("origin");
  const h = cors(origem);
  if (req.method === "OPTIONS") return new Response("ok", { headers: h });
  if (req.method !== "POST") return resposta({ erro: "Use POST." }, 405, h);
  if (origem && !permitida(origem)) return resposta({ erro: "Origem não autorizada." }, 403, h);

  const chave = Deno.env.get("ANTHROPIC_API_KEY");
  if (!chave) return resposta({ erro: "A tradução automática ainda não foi configurada no servidor." }, 503, h);

  let corpo: { idioma?: string; textos?: unknown };
  try {
    corpo = await req.json();
  } catch {
    return resposta({ erro: "Requisição inválida." }, 400, h);
  }
  const idioma = corpo.idioma ?? "";
  const textos = Array.isArray(corpo.textos) ? corpo.textos.filter((t): t is string => typeof t === "string" && t.trim().length > 0) : [];
  if (!IDIOMAS[idioma]) return resposta({ erro: "Idioma não suportado." }, 400, h);
  if (!textos.length) return resposta({ traducoes: {} }, 200, h);
  if (textos.length > MAX_TEXTOS || textos.reduce((n, t) => n + t.length, 0) > MAX_CARACTERES) {
    return resposta({ erro: `Envie no máximo ${MAX_TEXTOS} textos e ${MAX_CARACTERES} caracteres por vez.` }, 413, h);
  }

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": chave, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODELO,
      max_tokens: 16000,
      system: INSTRUCAO(IDIOMAS[idioma]),
      tools: [FERRAMENTA],
      tool_choice: { type: "tool", name: "registrar_traducoes" },
      messages: [{ role: "user", content: JSON.stringify(textos.map((texto, i) => ({ i, texto }))) }],
    }),
  });
  if (!r.ok) {
    console.error("Anthropic", r.status, (await r.text()).slice(0, 500));
    return resposta({ erro: "A tradução não está disponível agora." }, 502, h);
  }
  const dados = await r.json();
  const uso = dados.content?.find((c: { type: string }) => c.type === "tool_use");
  const lista = (uso?.input?.traducoes ?? []) as { i: number; texto: string }[];

  const traducoes: Record<string, string> = {};
  for (const { i, texto } of lista) {
    const original = textos[i];
    if (typeof original !== "string" || typeof texto !== "string" || !texto.trim()) continue;
    if (variaveis(original) !== variaveis(texto) || destaques(original) !== destaques(texto)) continue;
    traducoes[original] = texto;
  }
  return resposta({ traducoes }, 200, h);
});
