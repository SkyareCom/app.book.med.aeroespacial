'use strict';

// Congelamento editorial M1V1 I–IV — autorizado em 23/10/2026.
// Protege os quatro tópicos, imagens, gráficos, tabelas e o teste final associado.
// Não atualize estas assinaturas sem autorização explícita do autor.
// A verificação compara o conteúdo exato (inclusive espaços e pontuação).
const fs = require('node:fs');
const path = require('node:path');

const fonte = fs.readFileSync(path.resolve(__dirname, '../src/data/capitulos/atmosfera.ts'), 'utf8');
const ASSINATURAS = Object.freeze({
  '1.1': '35ad96b677ba7490', // M1V1 - I: Camadas da atmosfera
  '1.2': 'f969230fb84f2d9e', // M1V1 - II: Leis dos gases
  '1.3': '5a0fb17c9a87a7bb', // M1V1 - III: Atmosfera padrão
  '1.4': '5e25be7ea7bb45a3', // M1V1 - IV: Temperatura e umidade
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
if (diferente) {
  console.error('Solicite autorização do autor antes de descongelar ou alterar M1V1 I–IV.');
  process.exitCode = 1;
} else {
  console.log('M1V1 I–IV e teste final preservados. Nenhum conteúdo congelado mudou.');
}
