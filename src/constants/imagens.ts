import type { SecaoId } from '@/data/tipos';

export const Imagens = {
  hero: require('@/assets/images/cenas/hero.jpg'),
  voo: require('@/assets/images/cenas/voo.jpg'),
  lab: require('@/assets/images/cenas/lab.jpg'),
  quiz: require('@/assets/images/cenas/quiz.jpg'),
  prova: require('@/assets/images/cenas/prova.jpg'),
  curiosidades: require('@/assets/images/cenas/curiosidades.jpg'),
};

export const ImagemSecao: Record<SecaoId, number> = {
  fisiologia: require('@/assets/images/cenas/fisiologia.jpg'),
  clinica: require('@/assets/images/cenas/clinica.jpg'),
  operacao: require('@/assets/images/cenas/operacao.jpg'),
  espaco: require('@/assets/images/cenas/espaco.jpg'),
};
