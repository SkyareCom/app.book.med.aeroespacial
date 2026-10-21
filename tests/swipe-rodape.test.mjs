import assert from 'node:assert/strict';
import { test } from 'node:test';

import { destinoSwipeRodape, podeIniciarSwipeRodape } from '../src/lib/swipe-rodape.ts';

const gesto = { dx: -110, dy: 4, vx: -0.2, largura: 390 };

test('o swipe muda uma aba por vez na ordem do rodapé, nas duas direções', () => {
  assert.equal(destinoSwipeRodape('/conceitos', gesto), '/sistemas');
  assert.equal(destinoSwipeRodape('/aviacao', { ...gesto, dx: 110 }), '/sistemas');
  assert.equal(destinoSwipeRodape('/', gesto), '/conceitos');
  assert.equal(destinoSwipeRodape('/sistemas', gesto), '/aviacao');
  assert.equal(destinoSwipeRodape('/aviacao', gesto), '/espaco');
});

test('um movimento rápido e intencional também troca a página', () => {
  assert.equal(destinoSwipeRodape('/conceitos', { ...gesto, dx: -32, vx: -0.8 }), '/sistemas');
  assert.equal(destinoSwipeRodape('/conceitos', { ...gesto, dx: -32, vx: 0.8 }), null);
});

test('toques curtos e rolagem vertical não trocam a aba', () => {
  assert.equal(destinoSwipeRodape('/conceitos', { ...gesto, dx: -12, vx: -1 }), null);
  assert.equal(destinoSwipeRodape('/conceitos', { ...gesto, dx: -110, dy: 160 }), null);
});

test('a primeira e a última aba não dão a volta para a outra ponta', () => {
  assert.equal(destinoSwipeRodape('/', { ...gesto, dx: 110 }), null);
  assert.equal(destinoSwipeRodape('/espaco', gesto), null);
});

test('capítulos e páginas fora do rodapé mantêm sua própria navegação', () => {
  for (const caminho of ['/capitulo/conceitos/1', '/perfil', '/laboratorio', '/historia']) {
    assert.equal(destinoSwipeRodape(caminho, gesto), null);
    assert.equal(podeIniciarSwipeRodape(caminho, { dx: -30, dy: 2, toques: 1, bloqueado: false }), false);
  }
});

test('carrosséis, múltiplos dedos e gestos verticais não são capturados', () => {
  const movimento = { dx: -30, dy: 2, toques: 1, bloqueado: false };
  assert.equal(podeIniciarSwipeRodape('/conceitos', movimento), true);
  assert.equal(podeIniciarSwipeRodape('/conceitos', { ...movimento, bloqueado: true }), false);
  assert.equal(podeIniciarSwipeRodape('/conceitos', { ...movimento, toques: 2 }), false);
  assert.equal(podeIniciarSwipeRodape('/conceitos', { ...movimento, dy: 60 }), false);
  assert.equal(podeIniciarSwipeRodape('/conceitos', { ...movimento, dx: -4 }), false);
});
