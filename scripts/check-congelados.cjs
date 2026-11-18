'use strict';
// Congelamento editorial de tudo o que está pronto, autorizado pelo autor em 12/11/2026 ("Congele tudo que esta pronto").
// Protege, pelo retrato em scripts/congelados.json:
//   - M2V2 a M2V9 e M2V11 a M2V15: capítulo, formulário de liberação, interativos, fotos e vídeos;
//   - M3V1 (autorizado pelo autor em 15/11/2026, "Congele"): capítulo, interativos, fotos, vídeo e a animação em
//     src/components/midia/animacoes-aviacao.tsx até o marcador "FIM DO CONGELAMENTO M3V3";
//   - M3V2 Farmacologia aeroespacial e M3V3 Seleção e treinamento (autorizado pelo autor em 17/11/2026, "Congele"):
//     capítulo, interativos, fotos, vídeo, traduções e as animações acima do marcador;
//   - o formulário Liberação para voo seguro (src/app/liberacao-voo.tsx e src/lib/liberacao.ts);
//   - as animações já publicadas (src/components/midia/animacoes.tsx até o bloco do M2V10, que tem checador próprio);
//   - as traduções EN e ES de todos os textos dos voos das Missões Conceitos e Sistemas.
//   - o comando nervoso e hormonal na altitude (autorizado pelo autor em 16/11/2026, "Autorizo"): parágrafo, tabela
//     e explorador no tópico de abertura de M2V1 a M2V15 (src/data/comando-sistemas.ts e comando-sistemas.tsx); retrato refeito.
//   - 18/11/2026 (autorizado pelo autor, "Os dois ajustes"): receptores adrenérgicos e colinérgicos nomeados em M2V1 a
//     M2V15 e comando nervoso em M1V4, M1V7, M3V2 e M3V4; retrato refeito.
// M1V1 a M1V8 e M2V1 seguem em check-m1v1-frozen.cjs; M2V10 em check-m2v10-frozen.cjs.
// Voos novos (Missões Aviação e Espaço) põem as animações num arquivo próprio e acrescentam traduções sem mudar as
// existentes. Qualquer divergência bloqueia o CI. Só autorização explícita do autor permite regenerar o retrato
// (node scripts/congelar.cjs) e atualizar a assinatura abaixo, com o registro da autorização neste comentário.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');
const MANIFESTO = '22f9c7b262702a06dd1acd7ef670746c80818e8c';
let falhas = 0;
const erro = (m) => { console.error('CONGELAMENTO VIOLADO: ' + m); falhas++; };
const ler = (p) => {
  const a = path.join(ROOT, p);
  if (!fs.existsSync(a)) { erro('arquivo removido: ' + p); return Buffer.alloc(0); }
  return fs.readFileSync(a);
};
const blob = (buf) => crypto.createHash('sha1').update('blob ' + buf.length + '\0').update(buf).digest('hex');

const bruto = ler('scripts/congelados.json');
if (crypto.createHash('sha1').update(bruto).digest('hex') !== MANIFESTO) erro('o retrato scripts/congelados.json foi modificado.');
let m = { arquivos: {}, traducoes: {}, voos: [] };
try { m = JSON.parse(bruto.toString('utf8')); } catch { erro('scripts/congelados.json inválido.'); }

for (const [p, esperado] of Object.entries(m.arquivos)) {
  const atual = blob(ler(p));
  if (atual !== esperado) erro(p + ': esperado ' + esperado + ', encontrado ' + atual);
}
const anim = ler('src/components/midia/animacoes.tsx').toString('utf8');
const corte = anim.indexOf('// M2V10 · Gás intestinal');
if (corte < 0 || crypto.createHash('sha1').update(anim.slice(0, corte)).digest('hex') !== m.animacoes) erro('animações publicadas foram modificadas.');
const av = ler('src/components/midia/animacoes-aviacao.tsx').toString('utf8');
const corteAv = av.indexOf('// FIM DO CONGELAMENTO M3V3');
if (corteAv < 0 || crypto.createHash('sha1').update(av.slice(0, corteAv)).digest('hex') !== m.animacoesAviacao) erro('animações da Missão Aviação (M3V1) foram modificadas.');

const en = JSON.parse(ler('src/i18n/en-US.json').toString('utf8') || '{}');
const es = JSON.parse(ler('src/i18n/es-ES.json').toString('utf8') || '{}');
let difs = 0;
for (const [k, [ven, ves]] of Object.entries(m.traducoes)) {
  if (en[k] !== ven || es[k] !== ves) { if (difs < 10) erro('tradução alterada ou removida: ' + JSON.stringify(k.slice(0, 80))); difs++; }
}
if (difs > 10) erro('... e mais ' + (difs - 10) + ' traduções alteradas.');

if (falhas) {
  console.error('Solicite autorização do autor antes de alterar conteúdo congelado.');
  process.exit(1);
}
console.log('CONGELADO / ÍNTEGRO: ' + m.voos.join(', ') + ', formulário de liberação, animações e ' + Object.keys(m.traducoes).length + ' traduções por idioma.');
