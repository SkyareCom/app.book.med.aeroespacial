// Papos de Altitude · Exame CMA · análise de exames por IA.
// Recebe um PDF ou uma imagem (base64), pede ao Claude que leia apenas o que está escrito no exame e devolve os
// valores no formato dos campos do formulário, cada um com o trecho que o justifica. Nada é gravado: o arquivo
// vive só durante a requisição. A chave fica no segredo ANTHROPIC_API_KEY do projeto Supabase.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ORIGENS = ["https://skyarecom.github.io", "http://localhost:8081", "http://localhost:8766", "http://localhost:19006"];
const TIPOS = ["application/pdf", "image/png", "image/jpeg", "image/webp"];
const MAX_BASE64 = 14_000_000; // cerca de 10 MB de arquivo
const MODELO = Deno.env.get("ANTHROPIC_MODEL") ?? "claude-sonnet-5-5";

// Campos que a IA pode preencher. Números como lidos no laudo; sim/não só quando o laudo afirma.
const CAMPOS: Record<string, string> = {
  pas: "pressão arterial sistólica, mmHg",
  pad: "pressão arterial diastólica, mmHg",
  peso: "peso, kg",
  altura: "altura, cm",
  cintura: "circunferência da cintura, cm",
  glicemia: "glicemia de jejum, mg/dl",
  avOD: "acuidade visual de longe do olho direito, denominador de 20/x (ex.: 20/25 → 25)",
  avOE: "acuidade visual de longe do olho esquerdo, denominador de 20/x",
  avBin: "acuidade visual binocular, denominador de 20/x",
  hiperforia: "hiperforia, dioptrias prismáticas",
  exoforia: "exoforia, dioptrias prismáticas",
  esoforia: "esoforia ou endoforia, dioptrias prismáticas",
  od500: "audiometria, orelha direita, 500 Hz, dB", od1000: "audiometria, orelha direita, 1.000 Hz, dB",
  od2000: "audiometria, orelha direita, 2.000 Hz, dB", od3000: "audiometria, orelha direita, 3.000 Hz, dB",
  oe500: "audiometria, orelha esquerda, 500 Hz, dB", oe1000: "audiometria, orelha esquerda, 1.000 Hz, dB",
  oe2000: "audiometria, orelha esquerda, 2.000 Hz, dB", oe3000: "audiometria, orelha esquerda, 3.000 Hz, dB",
  eeg: "sim/não: EEG com grafoelementos epileptiformes",
  eegLento: "sim/não: EEG com lentificações",
  arritmia: "sim/não: arritmia significativa no ECG ou Holter",
  bloqueio: "sim/não: bloqueio de condução significativo no ECG",
  preExc: "sim/não: pré-excitação ventricular no ECG",
  anemia: "sim/não: anemia no hemograma",
  pneumotorax: "sim/não: pneumotórax na radiografia de tórax",
  neoTorax: "sim/não: lesão sugestiva de neoplasia no tórax",
  campoVisual: "sim/não: campo visual normal",
  pressaoOcular: "sim/não: pressão ocular normal",
  fundoOlho: "sim/não: fundo de olho normal",
  cornea: "sim/não: córneas normais",
  cores: "sim/não: reconhece as cores exigidas",
};

const FERRAMENTA = {
  name: "registrar_exame",
  description: "Registra o que o exame mostra, no formato do formulário do CMA.",
  input_schema: {
    type: "object",
    properties: {
      tipo_exame: { type: "string", description: "Tipo de exame identificado, em português (ex.: audiometria tonal, hemograma, ECG)." },
      data_exame: { type: "string", description: "Data do exame como escrita no documento, ou vazio." },
      legivel: { type: "boolean", description: "O documento pôde ser lido com segurança?" },
      valores: {
        type: "array",
        items: {
          type: "object",
          properties: {
            campo: { type: "string", enum: Object.keys(CAMPOS) },
            valor: { description: "Número (use ponto decimal) ou true/false para itens sim/não.", type: ["number", "boolean"] },
            trecho: { type: "string", description: "Trecho literal curto do exame que justifica o valor." },
          },
          required: ["campo", "valor", "trecho"],
        },
      },
      outros_achados: { type: "array", items: { type: "string" }, description: "Achados relevantes do laudo que não cabem nos campos, em português, frases curtas." },
      resumo: { type: "string", description: "Resumo objetivo do exame em até 3 frases, em português do Brasil." },
    },
    required: ["tipo_exame", "legivel", "valores", "outros_achados", "resumo"],
  },
};

const INSTRUCAO = `Você lê exames médicos para apoiar o médico examinador do Certificado Médico Aeronáutico (RBAC 67, ANAC).
Regras:
- Registre só o que está escrito no documento. Não deduza, não estime, não complete valores ausentes.
- Cada valor precisa de um trecho literal curto do exame que o comprove.
- Itens sim/não só quando o laudo afirma claramente; na dúvida, deixe de fora e cite em outros_achados.
- Acuidade visual em pés (20/x); se vier em decimal ou em metros, não converta: cite em outros_achados.
- Não dê veredito de aptidão: isso é do médico examinador.
Campos disponíveis:
${Object.entries(CAMPOS).map(([k, v]) => `- ${k}: ${v}`).join("\n")}`;

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

Deno.serve(async (req) => {
  const origem = req.headers.get("origin");
  const h = cors(origem);
  if (req.method === "OPTIONS") return new Response("ok", { headers: h });
  if (req.method !== "POST") return resposta({ erro: "Use POST." }, 405, h);
  if (origem && !permitida(origem)) return resposta({ erro: "Origem não autorizada." }, 403, h);

  const chave = Deno.env.get("ANTHROPIC_API_KEY");
  if (!chave) return resposta({ erro: "A análise por IA ainda não foi configurada no servidor." }, 503, h);

  let corpo: { arquivo?: string; tipo?: string; nome?: string };
  try {
    corpo = await req.json();
  } catch {
    return resposta({ erro: "Requisição inválida." }, 400, h);
  }
  const { arquivo, tipo } = corpo;
  if (!arquivo || !tipo || !TIPOS.includes(tipo)) return resposta({ erro: "Envie um PDF ou uma imagem PNG, JPG ou WEBP." }, 400, h);
  if (arquivo.length > MAX_BASE64) return resposta({ erro: "Arquivo grande demais (máximo de cerca de 10 MB)." }, 413, h);

  const bloco = tipo === "application/pdf"
    ? { type: "document", source: { type: "base64", media_type: tipo, data: arquivo } }
    : { type: "image", source: { type: "base64", media_type: tipo, data: arquivo } };

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": chave, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODELO,
      max_tokens: 2000,
      system: INSTRUCAO,
      tools: [FERRAMENTA],
      tool_choice: { type: "tool", name: "registrar_exame" },
      messages: [{ role: "user", content: [bloco, { type: "text", text: "Leia este exame e registre o que ele mostra." }] }],
    }),
  });
  if (!r.ok) {
    const detalhe = await r.text();
    console.error("Anthropic", r.status, detalhe.slice(0, 500));
    return resposta({ erro: "A IA não conseguiu analisar o arquivo agora. Tente de novo em instantes." }, 502, h);
  }
  const dados = await r.json();
  const uso = dados.content?.find((c: { type: string }) => c.type === "tool_use");
  if (!uso) return resposta({ erro: "A IA não devolveu a análise." }, 502, h);

  // Só passam campos conhecidos e valores do tipo certo.
  const entrada = uso.input as { valores?: { campo: string; valor: unknown; trecho: string }[] } & Record<string, unknown>;
  const valores = (entrada.valores ?? []).filter((x) => {
    if (!(x.campo in CAMPOS)) return false;
    const simNao = CAMPOS[x.campo].startsWith("sim/não");
    return simNao ? typeof x.valor === "boolean" : typeof x.valor === "number" && Number.isFinite(x.valor);
  });
  return resposta({ ...entrada, valores }, 200, h);
});
