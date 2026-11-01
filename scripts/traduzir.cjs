// Mantém os dicionários de tradução em dia (src/i18n/en-US.json e es-ES.json).
// 1. Extrai todos os textos do app (scripts/extrair-textos.cjs).
// 2. Lista o que falta em cada idioma.
// 3. Com --traduzir, manda o que falta à função "traduzir" do Supabase (Claude) e grava nos dicionários.
//
// Uso:
//   node scripts/traduzir.cjs              → só mostra o que falta (não muda nada)
//   node scripts/traduzir.cjs --traduzir   → traduz o que falta e grava
// Rode depois de escrever um voo novo. Revise o resultado no git diff antes de publicar.
// O que ficar faltando ainda é traduzido no aparelho, na hora, pela tradução automática (src/i18n/automatico.ts).
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const IDIOMAS = ['en-US', 'es-ES'];
const LOTE = 40;
const IGNORAR = /^(<svg|eyJ|rotate\(|url\(|translate\(|Bearer|AppBookDisplay)|\/functions\//;

function servidor() {
  const s = fs.readFileSync(path.join(RAIZ, 'src/constants/servidor.ts'), 'utf8');
  const url = s.match(/url:\s*'([^']+)'/)?.[1];
  const chave = s.match(/chavePublica:\s*'([^']+)'/)?.[1];
  return { url, chave };
}

async function main() {
  const tmp = path.join(os.tmpdir(), `textos-${process.pid}.json`);
  execFileSync('node', [path.join(__dirname, 'extrair-textos.cjs'), '--json', tmp], { stdio: 'inherit' });
  const textos = Object.keys(JSON.parse(fs.readFileSync(tmp, 'utf8'))).map((t) => t.trim()).filter((t) => t && !IGNORAR.test(t));
  fs.unlinkSync(tmp);
  const traduzir = process.argv.includes('--traduzir');
  const { url, chave } = servidor();

  for (const idioma of IDIOMAS) {
    const arq = path.join(RAIZ, 'src/i18n', `${idioma}.json`);
    const dic = JSON.parse(fs.readFileSync(arq, 'utf8'));
    const faltam = [...new Set(textos)].filter((t) => dic[t] === undefined);
    console.log(`${idioma}: ${faltam.length} texto(s) sem tradução`);
    if (!traduzir || !faltam.length) {
      faltam.slice(0, 20).forEach((t) => console.log('  · ' + t.slice(0, 100)));
      continue;
    }
    for (let i = 0; i < faltam.length; i += LOTE) {
      const lote = faltam.slice(i, i + LOTE);
      const r = await fetch(`${url}/functions/v1/traduzir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: chave, Authorization: `Bearer ${chave}` },
        body: JSON.stringify({ idioma, textos: lote }),
      });
      const dados = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(`${idioma}: ${dados.erro ?? r.status}`);
      Object.assign(dic, dados.traducoes);
      console.log(`  ${Math.min(i + LOTE, faltam.length)}/${faltam.length}`);
    }
    const ordenado = Object.fromEntries(Object.entries(dic).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(arq, JSON.stringify(ordenado, null, 0).replace(/","/g, '",\n"') + '\n');
  }
}

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
