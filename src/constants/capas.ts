// Gerado a partir de assets/images/capas (tools/cenas/capas.py). Capa de cada episódio e arte de cada temporada.

import type { SecaoId } from '@/data/tipos';

// Capa de cada voo na organização atual (Conceitos, Sistemas, Aviação, Espaço). Os arquivos mantêm o nome antigo.
export const CapaEpisodio: Record<string, number> = {
  'conceitos-1': require('@/assets/images/capas/fis-01.jpg'),
  'conceitos-2': require('@/assets/images/capas/fis-04.jpg'),
  'conceitos-3': require('@/assets/images/capas/fis-05.jpg'),
  'conceitos-4': require('@/assets/images/capas/fis-11.jpg'),
  'conceitos-5': require('@/assets/images/capas/fis-12.jpg'),
  'conceitos-6': require('@/assets/images/capas/fis-10.jpg'),
  'conceitos-7': require('@/assets/images/capas/fis-06.jpg'),
  'conceitos-8': require('@/assets/images/capas/fis-07.jpg'),
  'sistemas-1': require('@/assets/images/capas/fis-03.jpg'),
  'sistemas-2': require('@/assets/images/capas/fis-02.jpg'),
  'sistemas-3': require('@/assets/images/capas/cli-07.jpg'),
  'sistemas-4': require('@/assets/images/capas/fis-09.jpg'),
  'sistemas-5': require('@/assets/images/capas/fis-08.jpg'),
  'sistemas-6': require('@/assets/images/capas/cli-04.jpg'),
  'sistemas-7': require('@/assets/images/capas/cli-05.jpg'),
  'sistemas-8': require('@/assets/images/capas/fis-13.jpg'),
  'sistemas-9': require('@/assets/images/capas/cli-08.jpg'),
  'sistemas-10': require('@/assets/images/capas/cli-09.jpg'),
  'sistemas-11': require('@/assets/images/capas/cli-10.jpg'),
  'sistemas-12': require('@/assets/images/capas/cli-11.jpg'),
  'sistemas-13': require('@/assets/images/capas/cli-12.jpg'),
  'aviacao-1': require('@/assets/images/capas/cli-01.jpg'),
  'aviacao-2': require('@/assets/images/capas/cli-13.jpg'),
  'aviacao-3': require('@/assets/images/capas/ope-03.jpg'),
  'aviacao-4': require('@/assets/images/capas/ope-01.jpg'),
  'aviacao-5': require('@/assets/images/capas/ope-02.jpg'),
  'aviacao-6': require('@/assets/images/capas/ope-04.jpg'),
  'aviacao-7': require('@/assets/images/capas/ope-06.jpg'),
  'aviacao-8': require('@/assets/images/capas/ope-07.jpg'),
  'aviacao-9': require('@/assets/images/capas/ope-08.jpg'),
  'aviacao-10': require('@/assets/images/capas/ope-09.jpg'),
  'aviacao-11': require('@/assets/images/capas/ope-10.jpg'),
  'aviacao-12': require('@/assets/images/capas/ope-11.jpg'),
  'aviacao-13': require('@/assets/images/capas/ope-12.jpg'),
  'aviacao-14': require('@/assets/images/capas/ope-13.jpg'),
  'aviacao-15': require('@/assets/images/capas/ope-14.jpg'),
  'aviacao-16': require('@/assets/images/capas/ope-16.jpg'),
  'espaco-1': require('@/assets/images/capas/esp-01.jpg'),
  'espaco-2': require('@/assets/images/capas/esp-02.jpg'),
  'espaco-3': require('@/assets/images/capas/esp-04.jpg'),
  'espaco-4': require('@/assets/images/capas/esp-05.jpg'),
  'espaco-5': require('@/assets/images/capas/esp-06.jpg'),
  'espaco-6': require('@/assets/images/capas/esp-07.jpg'),
  'espaco-7': require('@/assets/images/capas/esp-08.jpg'),
};

export const ArteTemporada: Record<SecaoId, number> = {
  conceitos: require('@/assets/images/capas/temporada-fisiologia.jpg'),
  sistemas: require('@/assets/images/capas/temporada-clinica.jpg'),
  aviacao: require('@/assets/images/capas/temporada-operacao.jpg'),
  espaco: require('@/assets/images/capas/temporada-espaco.jpg'),
};

export const ArteEspecialVoo = require('@/assets/images/capas/especial-voo.jpg');
