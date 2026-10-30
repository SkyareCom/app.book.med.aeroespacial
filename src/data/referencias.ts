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
  { titulo: 'ICRP', detalhe: 'Comissão Internacional de Proteção Radiológica (Publicações 103 e 132)' },
  { titulo: 'CNEN', detalhe: 'Comissão Nacional de Energia Nuclear (Brasil), norma NN 3.01' },
  { titulo: 'União Europeia', detalhe: 'Diretiva 2013/59/Euratom (proteção contra radiações ionizantes) e Diretiva 2002/44/CE (vibrações)' },
  { titulo: 'Ministério do Trabalho e Emprego', detalhe: 'NR-15 (Anexos 1 e 8, ruído e vibração) e NR-9 (Anexo 1, vibração)' },
  { titulo: 'Fundacentro', detalhe: 'Norma de Higiene Ocupacional NHO 01 (ruído)' },
  { titulo: 'NIOSH e OSHA', detalhe: 'Instituto e agência de saúde e segurança do trabalho dos EUA (exposição ocupacional ao ruído)' },
];
