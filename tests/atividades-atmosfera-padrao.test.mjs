import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { carregarDados } from './helpers/carregar-dados.mjs';

const arquivo = path.resolve('src/data/atividades-atmosfera-padrao.ts');
const dados = fs.existsSync(arquivo) ? carregarDados(arquivo) : {};

test('a atividade distingue tabelas do modelo de observações feitas por instrumentos', () => {
  assert.ok(dados.CASOS_MODELO_MEDICAO, 'A atividade precisa oferecer situações prontas para responder');
  const casos = dados.CASOS_MODELO_MEDICAO;
  const respostas = new Map(casos.map((c) => [c.id, c.resposta]));
  assert.equal(respostas.get('referencia-comum'), 'Modelo');
  assert.equal(respostas.get('barometro'), 'Medição');
  assert.equal(respostas.get('tabela-padrao'), 'Modelo');
  assert.equal(respostas.get('termometro'), 'Medição');
  for (const caso of casos) {
    assert.ok(caso.texto.length > 0);
    assert.ok(caso.explicacao.length > 0);
    assert.ok(!caso.texto.includes('[confirmar'));
    assert.ok(!caso.explicacao.includes('[confirmar'));
  }
});

test('a demonstração associa menor pressão a maior altitude-pressão e vice-versa', () => {
  assert.ok(dados.EFEITOS_PRESSAO, 'O leitor precisa receber um resultado ao tocar na pressão');
  assert.equal(dados.EFEITOS_PRESSAO.menor.altitude, 'Mais alta');
  assert.equal(dados.EFEITOS_PRESSAO.menor.posicao, 'topo');
  assert.equal(dados.EFEITOS_PRESSAO.maior.altitude, 'Mais baixa');
  assert.equal(dados.EFEITOS_PRESSAO.maior.posicao, 'base');
  for (const efeito of Object.values(dados.EFEITOS_PRESSAO)) {
    assert.ok(efeito.explicacao.length > 0);
    assert.ok(!efeito.explicacao.includes('[confirmar'));
  }
});
