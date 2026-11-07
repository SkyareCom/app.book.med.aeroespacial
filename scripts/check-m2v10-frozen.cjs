'use strict';
// Congelamento editorial M2V10 autorizado pelo autor em 06/11/2026.
// Protege texto, tabelas, teste, formulário aeromédico, componentes exclusivos,
// 12 fotografias, vídeo, animação e entradas de tradução usadas neste voo.
// Não altera documentos; qualquer divergência bloqueia o CI da main e dos PRs.
// Somente autorização explícita do autor permite atualizar as assinaturas.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ROOT = path.resolve(__dirname, '..');
const BLOBS = Object.freeze({
  "assets/images/topicos/m2v10-1-cabine.jpg": "ffa6c75005dd48c40bb69f41631f5519b07b4cc3",
  "assets/images/topicos/m2v10-1-corredor.jpg": "37d95d0466d1a7a98f8ab62e8a3cff351bc0f88f",
  "assets/images/topicos/m2v10-2-consulta.jpg": "7a47eea535d78eab8a8ab7e77d51a0e514d23eca",
  "assets/images/topicos/m2v10-2-refeicao.jpg": "6f7dc5856442684284f3df745438234c7f339ee2",
  "assets/images/topicos/m2v10-3-acompanhamento.jpg": "2a2d3adbeb0431f1e3f8d4a67a738d308142184e",
  "assets/images/topicos/m2v10-3-hidratacao.jpg": "8afc245afd828d6f6e0eb4e11a1cdb073b251bbd",
  "assets/images/topicos/m2v10-4-avaliacao.jpg": "64787baef494c0ebb08bac2c6d1f8e62705f31f5",
  "assets/images/topicos/m2v10-4-tratamento.jpg": "c8203a90cf3b13e5008e329306db61849bc468ae",
  "assets/images/topicos/m2v10-5-pancreas.jpg": "6d9c733cfb441de893317cfb3431a27d7986bd8a",
  "assets/images/topicos/m2v10-5-vesicula.jpg": "e222cc2dcb204938bcb3dcd58db686c70307d761",
  "assets/images/topicos/m2v10-6-reabilitacao.jpg": "31d7f0031587ffa8b71b273d8925c103658a7554",
  "assets/images/topicos/m2v10-6-recuperacao.jpg": "244e1c505bbfb1d23fab49475a09e9c4d6abec18",
  "assets/videos/m2v10-gas-cabine.mp4": "33421089edfffda8eb270909769183d9c19dbec0",
  "src/components/midia/m2v10-graficos.tsx": "a24fda2cacc86652a96ed97eacdf9efc99299cea",
  "src/data/capitulos/digestivo.ts": "8c8bc613a68a056bb2dd72116f70073ca4d3c388",
  "src/data/liberacao/digestivo.ts": "54586a0145421faac22576ea5978c8c80ac0e410"
});
const I18N = Object.freeze({ 'en-US': 'dfc198388b66f6d6', 'es-ES': '1fb248eb7f984a26' });
const MAX_CHAVES = 629;
const ANIMACAO = '65fa9cbc56b5511a';
let falhas = 0;
function erro(mensagem) { console.error('CONGELAMENTO M2V10 VIOLADO: ' + mensagem); falhas++; }
function ler(p) {
  const arquivo = path.join(ROOT, p);
  if (!fs.existsSync(arquivo)) { erro('arquivo removido: ' + p); return Buffer.alloc(0); }
  return fs.readFileSync(arquivo);
}
function fnv(texto) {
  let valor = 0xcbf29ce484222325n;
  for (let i = 0; i < texto.length; i++) {
    valor ^= BigInt(texto.charCodeAt(i));
    valor = BigInt.asUintN(64, valor * 0x100000001b3n);
  }
  return valor.toString(16).padStart(16, '0');
}
function blobSha(buf) {
  return crypto.createHash('sha1').update('blob ' + buf.length + '\0').update(buf).digest('hex');
}
for (const [p, esperado] of Object.entries(BLOBS)) {
  const atual = blobSha(ler(p));
  if (atual !== esperado) erro(p + ': esperado ' + esperado + ', encontrado ' + atual);
}
// A lista assinada é um retrato exato das chaves existentes quando o autor congelou M2V10.
// Uma nova expressão do M2V11 pode aparecer no texto antigo como substring, mas não
// deve ser confundida com uma tradução que existia na data do congelamento.
const chavesArquivo = ler('scripts/m2v10-frozen-keys.json').toString('utf8');
if (fnv(chavesArquivo) !== '53fc5b2390b72174') erro('lista imutável de chaves do M2V10 foi modificada.');
let chavesCongeladas = [];
try { chavesCongeladas = JSON.parse(chavesArquivo); }
catch (e) { erro('lista de chaves do M2V10 inválida.'); }
if (!Array.isArray(chavesCongeladas) || chavesCongeladas.length !== MAX_CHAVES) erro('quantidade de chaves congeladas inválida.');
const animacoes = ler('src/components/midia/animacoes.tsx').toString('utf8');
const inicio = animacoes.indexOf('// M2V10 · Gás intestinal');
const fim = animacoes.indexOf('\n// M2V', inicio + 12);
const trecho = inicio >= 0 ? animacoes.slice(inicio, fim < 0 ? undefined : fim).trimEnd() : '';
if (fnv(trecho) !== ANIMACAO) erro('animação específica do M2V10 foi modificada.');
for (const [idioma, esperado] of Object.entries(I18N)) {
  const p = 'src/i18n/' + idioma + '.json';
  let d;
  try { d = JSON.parse(ler(p).toString('utf8')); }
  catch (e) { erro('JSON de idioma inválido: ' + idioma); continue; }
  const pares = chavesCongeladas.map(chave => [chave, d[chave]]);
  if (pares.some(([, traducao]) => typeof traducao !== 'string')) erro(idioma + ': entrada congelada removida.');
  if (fnv(JSON.stringify(pares)) !== esperado) erro(idioma + ': conteúdo das traduções do M2V10 mudou.');
}
const secoes = ler('src/data/secoes.ts').toString('utf8');
if (!secoes.includes("{ ...digestivo, numero: 10 }")) erro('o M2V10 saiu do catálogo ou mudou de número.');
const registro = ler('src/components/midia/index.tsx').toString('utf8');
if (!registro.includes("from '@/components/midia/m2v10-graficos'")) erro('registro dos interativos M2V10 removido.');
if (falhas > 0) {
  console.error('O conteúdo congelado não pode ser modificado sem autorização expressa do autor.');
  process.exitCode = 1;
} else {
  console.log('CONGELADO / ÍNTEGRO: M2V10 — seis tópicos, interativos, doze fotos, vídeo, teste, liberação e 629 chaves de tradução por idioma.');
}
