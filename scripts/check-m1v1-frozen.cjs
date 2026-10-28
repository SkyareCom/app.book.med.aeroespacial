'use strict';

// Congelamento editorial M1V1 I–IV — autorizado em 23/10/2026; revisão de texto autorizada pelo autor em 26/10/2026
// (remoção de repetições entre tópicos, cadência e destaques; recursos e teste inalterados).
// Protege os quatro tópicos, imagens, gráficos, tabelas e o teste final associado.
// Não atualize estas assinaturas sem autorização explícita do autor.
// A verificação compara o conteúdo exato (inclusive espaços e pontuação).
const fs = require('node:fs');
const path = require('node:path');

const fonte = fs.readFileSync(path.resolve(__dirname, '../src/data/capitulos/atmosfera.ts'), 'utf8');
const ASSINATURAS = Object.freeze({
  '1.1': '2c67cfba7f40545a', // M1V1 - I: Camadas da atmosfera
  '1.2': '431b933e6534e6aa', // M1V1 - II: Leis dos gases
  '1.3': '9ed34fdc4760bbcb', // M1V1 - III: Atmosfera padrão
  '1.4': 'e7f504ae57a131ac', // M1V1 - IV: Temperatura e umidade (27/10/2026: simulador umidade-cabine, padrão de recursos pedido pelo autor)
});
const ASSINATURA_TESTE = '47754a8bbeb02cb4';

// FNV-1a 64 bits por unidade UTF-16; detecta alterações acidentais byte a byte
// da representação JavaScript. Não é assinatura criptográfica/controle de acesso.
function assinatura(texto) {
  let valor = 0xcbf29ce484222325n;
  for (let i = 0; i < texto.length; i++) {
    valor ^= BigInt(texto.charCodeAt(i));
    valor = BigInt.asUintN(64, valor * 0x100000001b3n);
  }
  return valor.toString(16).padStart(16, '0');
}

function posicaoUnica(marcador) {
  const primeira = fonte.indexOf(marcador);
  if (primeira < 0 || fonte.indexOf(marcador, primeira + 1) !== -1) {
    throw Error('Marcador do tópico ausente ou duplicado: ' + marcador);
  }
  return primeira;
}

const ids = Object.keys(ASSINATURAS);
const inicios = ids.map((id) => posicaoUnica("    {\n      id: '" + id + "',"));
const fimTopicos = fonte.indexOf('\n  ],\n  teste:', inicios[inicios.length - 1]);
const fimTeste = fonte.lastIndexOf('\n  ],\n};');
if (fimTopicos < 0 || fimTeste < 0 || !inicios.every((v, i) => i === 0 || v > inicios[i - 1])) {
  throw Error('A estrutura de M1V1 foi alterada. Não é permitido modificar os tópicos congelados.');
}

let diferente = false;
for (let i = 0; i < ids.length; i++) {
  const trecho = fonte.slice(inicios[i], i + 1 < ids.length ? inicios[i + 1] : fimTopicos);
  const atual = assinatura(trecho);
  if (atual !== ASSINATURAS[ids[i]]) {
    console.error('CONGELAMENTO VIOLADO: M1V1 - ' + ['I', 'II', 'III', 'IV'][i] +
      ' (' + ids[i] + '). Esperado: ' + ASSINATURAS[ids[i]] + '; recebido: ' + atual);
    diferente = true;
  } else {
    console.log('CONGELADO / ÍNTEGRO: M1V1 - ' + ['I', 'II', 'III', 'IV'][i]);
  }
}

const inicioTeste = fimTopicos + '\n  ],\n  teste: ['.length;
const teste = fonte.slice(inicioTeste, fimTeste);
if (assinatura(teste) !== ASSINATURA_TESTE) {
  console.error('CONGELAMENTO VIOLADO: questões e respostas do teste final de M1V1.');
  diferente = true;
}
// Congelamento editorial M1V2 e M1V3 — autorizado pelo autor em 27/10/2026.
// Protege o texto, recursos e testes (arquivos de dados), os gráficos e simuladores e as fotos de cada voo.
const crypto = require('node:crypto');
const ARQUIVOS = Object.freeze({
  'src/data/capitulos/pressurizacao.ts': '7484037e0bd2a0ff',
  'src/components/midia/m1v2-graficos.tsx': 'a24c3febbacf3176',
  'src/data/capitulos/descompressao.ts': '26ed048161495b77',
  'src/components/midia/m1v3-graficos.tsx': 'bffbed4b28aaff08',
  'assets/images/topicos/m1v2-aviao-cruzeiro.jpg': '7a329df60b37dbe1',
  'assets/images/topicos/m1v2-aviao-quadrado.jpg': 'adae60478408d5c8',
  'assets/images/topicos/m1v2-mascaras-cabine.jpg': '11bd27cc724154e7',
  'assets/images/topicos/m1v2-painel-pressurizacao.jpg': '03524be1749bf625',
  'assets/images/topicos/m1v2-piloto-mascara.jpg': '3f24651c16114376',
  'assets/images/topicos/m1v2-regulador.jpg': 'b74e0c0c66f4fda7',
  'assets/images/topicos/m1v2-traje-pressurizado.jpg': '78843fde8429aa4d',
  'assets/images/topicos/m1v2-valvula-saida.jpg': '2d6d73b39f91d24c',
  'assets/images/topicos/m1v3-cabine-nevoa.jpg': 'adf405291a2ccd88',
  'assets/images/topicos/m1v3-camara-hiperbarica.jpg': 'd448ef242cd93e92',
  'assets/images/topicos/m1v3-camara-hipobarica.jpg': 'e07de879e933a453',
  'assets/images/topicos/m1v3-jato-executivo.jpg': '80255ce43de6f9d1',
  'assets/images/topicos/m1v3-mergulhador-aviao.jpg': '641e8ba93dcccb9c',
  'assets/images/topicos/m1v3-mergulhador-subida.jpg': 'aaffbc821671f604',
  'assets/images/topicos/m1v3-pele-marmorizada.jpg': '60195898c00ba7a9',
  'assets/images/topicos/m1v3-piloto-dor.jpg': 'ba581322737531f6',
});
for (const [arquivo, esperado] of Object.entries(ARQUIVOS)) {
  const caminho = path.resolve(__dirname, '..', arquivo);
  const atual = fs.existsSync(caminho) ? crypto.createHash('sha256').update(fs.readFileSync(caminho)).digest('hex').slice(0, 16) : 'ausente';
  if (atual !== esperado) {
    console.error('CONGELAMENTO VIOLADO: ' + arquivo + '. Esperado: ' + esperado + '; recebido: ' + atual);
    diferente = true;
  }
}

if (diferente) {
  console.error('Solicite autorização do autor antes de descongelar ou alterar M1V1, M1V2 ou M1V3.');
  process.exitCode = 1;
} else {
  console.log('M1V1, M1V2 e M1V3 preservados (textos, recursos, gráficos, fotos e testes). Nenhum conteúdo congelado mudou.');
}
