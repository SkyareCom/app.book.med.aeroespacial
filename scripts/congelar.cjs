'use strict';
// Gera scripts/congelados.json, o retrato assinado dos voos prontos (M2V2 a M2V9 e M2V11 a M2V15), do formulário
// Liberação para voo seguro, das animações e das traduções usadas pelos voos das Missões Conceitos e Sistemas.
// SÓ RODE COM AUTORIZAÇÃO EXPLÍCITA DO AUTOR. Depois de rodar, atualize a assinatura MANIFESTO em
// scripts/check-congelados.cjs e registre a autorização no comentário do checador.
// Congelamento autorizado pelo autor em 12/11/2026 ("Congele tudo que esta pronto").
// M3V1 incluído com autorização do autor em 15/11/2026 ("Congele"), depois da publicação do voo.
// M3V2 e M3V3 incluídos com autorização do autor em 17/11/2026 ("Congele"), depois da publicação dos voos; o marcador
// das animações da Missão Aviação passou a ser "FIM DO CONGELAMENTO M3V3".
// Recongelado em 16/11/2026 com autorização do autor ("Autorizo"): comando nervoso e hormonal na altitude em M2V1 a
// M2V15; src/data/comando-sistemas.ts e src/components/midia/comando-sistemas.tsx entram no retrato.
// Recongelado em 18/11/2026 com autorização do autor ("Os dois ajustes"): receptores adrenérgicos e colinérgicos
// nomeados em M2V1 a M2V15 e comando nervoso em M1V4, M1V7, M3V2 e M3V4.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');

const VOOS = {
  M2V2: ['coracao', 'cardiovascular', 'm2v2'],
  M2V3: ['ouvidos', 'ouvidos', 'm2v3'],
  M2V4: ['olhos', 'olhos', 'm2v4'],
  M2V5: ['orientacao', 'orientacao', 'm2v5'],
  M2V6: ['cerebro', 'cerebro', 'm2v6'],
  M2V7: ['mente', 'mente', 'm2v7'],
  M2V8: ['sono', 'sono', 'm2v8'],
  M2V9: ['hormonios', 'hormonios', 'm2v9'],
  M2V11: ['sangue-imunidade', 'sangue-imunidade', 'm2v11'],
  M2V12: ['ossos-musculos', 'ossos-musculos', 'm2v12'],
  M2V13: ['mulher', 'mulher', 'm2v13'],
  M2V14: ['rins', 'rins', 'm2v14'],
  M2V15: ['envelhecimento', 'envelhecimento', 'm2v15'],
  M3V1: ['certificacao', null, 'm3v1'],
  M3V2: ['farmacologia', null, 'm3v2'],
  M3V3: ['selecao', null, 'm3v3'],
};
// Arquivos cujas traduções também ficam congeladas (Conceitos e M2V1, já protegidos em conteúdo por check-m1v1).
const TRADUZIDOS_EXTRAS = ['atmosfera', 'descompressao', 'pressurizacao', 'radiacao', 'ruido', 'forcasg', 'impacto', 'temperatura', 'hipoxia']
  .map((c) => `src/data/capitulos/${c}.ts`).concat(['src/data/liberacao/respiratorio.ts', 'src/app/liberacao-voo.tsx']);
const COMUNS = ['src/app/liberacao-voo.tsx', 'src/lib/liberacao.ts', 'src/data/comando-sistemas.ts', 'src/components/midia/comando-sistemas.tsx'];

const blob = (buf) => crypto.createHash('sha1').update('blob ' + buf.length + '\0').update(buf).digest('hex');
const ler = (p) => fs.readFileSync(path.join(ROOT, p));

const arquivos = {};
const textos = [];
for (const [voo, [cap, lib, pref]] of Object.entries(VOOS)) {
  const lista = [`src/data/capitulos/${cap}.ts`, `src/components/midia/${pref}-graficos.tsx`];
  if (lib) lista.push(`src/data/liberacao/${lib}.ts`);
  const fonte = ler(lista[0]).toString('utf8');
  for (const m of fonte.matchAll(/require\('@\/(assets\/[^']+)'\)/g)) lista.push(m[1]);
  for (const p of lista) { arquivos[p] = blob(ler(p)); textos.push(p); }
}
for (const p of COMUNS) arquivos[p] = blob(ler(p));
textos.push(...TRADUZIDOS_EXTRAS, 'src/data/comando-sistemas.ts', 'src/components/midia/comando-sistemas.tsx', 'src/components/midia/animacoes.tsx', 'src/components/midia/animacoes-aviacao.tsx');

const anim = ler('src/components/midia/animacoes.tsx').toString('utf8');
const corte = anim.indexOf('// M2V10 · Gás intestinal');
if (corte < 0) throw new Error('marcador do M2V10 não encontrado em animacoes.tsx');
const animacoes = crypto.createHash('sha1').update(anim.slice(0, corte)).digest('hex');
// Missão Aviação: animações congeladas até o marcador; voos novos acrescentam abaixo dele.
const aviacao = ler('src/components/midia/animacoes-aviacao.tsx').toString('utf8');
const corteAv = aviacao.indexOf('// FIM DO CONGELAMENTO M3V3');
if (corteAv < 0) throw new Error('marcador do M3V3 não encontrado em animacoes-aviacao.tsx');
const animacoesAviacao = crypto.createHash('sha1').update(aviacao.slice(0, corteAv)).digest('hex');

// Literais de texto das fontes: '...', "...", `...` sem ${} e texto JSX entre > e <.
const literais = new Set();
for (const p of [...new Set(textos)]) {
  const f = ler(p).toString('utf8');
  for (const m of f.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`([^`$]*)`/g)) {
    const bruto = m[1] ?? m[2] ?? m[3] ?? '';
    let t = bruto;
    try { t = JSON.parse('"' + bruto.replace(/\\'/g, "'").replace(/"/g, '\\"') + '"'); } catch {}
    literais.add(t.trim());
  }
  for (const m of f.matchAll(/>([^<>{}]+)</g)) literais.add(m[1].replace(/\s+/g, ' ').trim());
}
const en = JSON.parse(ler('src/i18n/en-US.json'));
const es = JSON.parse(ler('src/i18n/es-ES.json'));
const chaves = Object.keys(en).filter((k) => es[k] !== undefined && literais.has(k)).sort();
const traducoes = {};
for (const k of chaves) traducoes[k] = [en[k], es[k]];

const manifesto = { autorizado: '12/11/2026; M3V1 em 15/11/2026; comando dos sistemas em 16/11/2026; M3V2 e M3V3 em 17/11/2026; receptores adrenérgicos e colinérgicos em 18/11/2026', voos: Object.keys(VOOS), arquivos, animacoes, animacoesAviacao, traducoes };
const saida = JSON.stringify(manifesto, null, 1) + '\n';
fs.writeFileSync(path.join(ROOT, 'scripts/congelados.json'), saida);
console.log(`congelados.json: ${Object.keys(arquivos).length} arquivos, ${chaves.length} traduções; assinatura ${crypto.createHash('sha1').update(saida).digest('hex')}`);
