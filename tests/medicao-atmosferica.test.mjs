import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { carregarDados } from './helpers/carregar-dados.mjs';

const arquivo = path.resolve('src/lib/medicao-atmosferica.ts');
const lerNumeroBrasileiro = (valor) => fs.existsSync(arquivo) ? carregarDados(arquivo).lerNumeroBrasileiro(valor) : undefined;

test('medição vazia ou inválida não se transforma em zero ou número inventado', () => {
  for (const valor of ['', ' ', 'NaN', 'Infinity', '760 mmHg', '12,3,4', '1.23.456']) {
    assert.equal(lerNumeroBrasileiro(valor), null);
  }
});

test('os campos de medição reconhecem números brasileiros, decimais e temperatura negativa', () => {
  assert.equal(lerNumeroBrasileiro('1.000'), 1000);
  assert.equal(lerNumeroBrasileiro('760,25'), 760.25);
  assert.equal(lerNumeroBrasileiro('-12,5'), -12.5);
  assert.equal(lerNumeroBrasileiro('0'), 0);
});
