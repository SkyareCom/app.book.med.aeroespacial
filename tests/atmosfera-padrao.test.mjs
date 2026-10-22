import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import path from 'node:path';
import test from 'node:test';

import { carregarDados } from './helpers/carregar-dados.mjs';

const { atmosfera } = carregarDados(path.resolve('src/data/capitulos/atmosfera.ts'));
const hash = (valor) => createHash('sha256').update(JSON.stringify(valor)).digest('hex');

test('os tópicos I e II e suas questões permanecem integralmente congelados', () => {
  assert.equal(hash(atmosfera.topicos[0]), '805af069168827945f12afabb392d1f9a58026e7121518ed2c8086c64eb3202e');
  assert.equal(hash(atmosfera.topicos[1]), '504adbd3a626ef216bd7c4471795e6d42d8ba441e41724c5900bdf7abb0c043b');
  assert.equal(hash(atmosfera.teste[0]), '1e506a58680ff9b455f36363b9c89b7555bf70a8ce19f81acd8ec5c89e679518');
  assert.equal(hash(atmosfera.teste[1]), '0c809060029bb0af7c6498bbef83a3a2435be134b1201f253d071ec2e5752ef4');
});

test('III abre com os três níveis e intercala duas fotos e os dois interativos', () => {
  const topico = atmosfera.topicos.find((t) => t.id === '1.3');
  assert.ok(topico.conteudo, 'O tópico Atmosfera padrão precisa deixar de ser um cartão em produção');
  const c = topico.conteudo;
  assert.ok(c.essencial.split(/\s+/).length <= 40);
  assert.equal(c.explicacao.split('\n\n').length, 3);
  assert.equal(c.clinico.split('\n\n').length, 3);
  assert.equal(c.recursos.filter((r) => r.figura).length, 2);
  assert.equal(c.recursos.filter((r) => r.midia).length, 2);
  assert.ok(c.recursos.some((r) => r.apos === 'essencial' && r.figura));
  for (const paragrafo of [1, 2, 3]) {
    assert.ok(c.recursos.some((r) => r.apos === 'entenda' && r.paragrafo === paragrafo));
  }
  assert.ok(c.clinico.includes('[confirmar na referência]'));
  assert.equal(c.vejaTambem.length, 3);
});

test('a questão do tópico III participa do teste do voo, com quatro alternativas e explicação', () => {
  const q = atmosfera.teste.find((q) => q.topico === '1.3');
  assert.ok(q, 'A questão de Atmosfera padrão precisa estar acessível no teste');
  assert.equal(q.opcoes.length, 4);
  assert.equal(q.correta, 1);
  assert.ok(q.explicacao.length > 0);
});
