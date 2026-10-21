// Lista única de referências do app, mostrada na página Referências (atalho na Home, abaixo de Curiosidades).
// As fontes não aparecem dentro dos voos nem dos tópicos. Ao usar uma obra ou norma nova num voo, inclua-a aqui.

export interface Referencia {
  titulo: string;
  detalhe: string;
}

export const obras: Referencia[] = [
  { titulo: "Ernsting's Aviation and Space Medicine", detalhe: '5ª edição' },
  { titulo: 'Fundamentals of Aerospace Medicine', detalhe: '5ª edição' },
  { titulo: 'Handbook of Aviation and Space Medicine', detalhe: 'Manual de bolso de medicina de aviação e espacial' },
  { titulo: 'Fisiologia Aeroespacial', detalhe: 'Russomano et al.' },
  { titulo: 'A Gravidade, Esta Grande Escultora', detalhe: 'Vernikos e Russomano' },
];

export const normas: Referencia[] = [
  { titulo: 'ICAO', detalhe: 'Organização da Aviação Civil Internacional' },
  { titulo: 'EASA', detalhe: 'Agência Europeia para a Segurança da Aviação' },
  { titulo: 'FAA', detalhe: 'Administração Federal de Aviação dos EUA' },
  { titulo: 'ANAC', detalhe: 'Agência Nacional de Aviação Civil (Brasil)' },
];
