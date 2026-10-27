// Catálogo de todas as questões do app, com o grupo de origem (missão ou missão especial).
// Base do ranking: domínio por missão e sorteio do Modo quiz e do Modo prova.

import { dificuldadeDe, idQuestao, PONTOS } from '@/lib/xp';

import { eras } from './historia';
import { secoes } from './secoes';
import type { Questao } from './tipos';

export type GrupoQuestao = 'conceitos' | 'sistemas' | 'aviacao' | 'espaco' | 'historia';

export interface ItemCatalogo {
  id: string;
  q: Questao;
  grupo: GrupoQuestao;
  pontos: number; // XP base (sem o peso da prova)
}

export const NOME_GRUPO: Record<GrupoQuestao, string> = {
  conceitos: 'Conceitos',
  sistemas: 'Sistemas',
  aviacao: 'Aviação',
  espaco: 'Espaço',
  historia: 'Missão especial',
};

export const catalogo: ItemCatalogo[] = [
  ...secoes.flatMap((s) =>
    s.capitulos.flatMap((c) => (c.teste ?? []).map((q) => ({ id: idQuestao(q), q, grupo: s.id as GrupoQuestao, pontos: PONTOS[dificuldadeDe(q)] }))),
  ),
  ...eras.flatMap((e) => e.teste.map((q) => ({ id: idQuestao(q), q, grupo: 'historia' as const, pontos: PONTOS[dificuldadeDe(q)] }))),
];
