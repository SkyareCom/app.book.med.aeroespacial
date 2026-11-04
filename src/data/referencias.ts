// Lista única de referências do app, mostrada na página Referências (card na Home, em Ferramentas e extras).
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
  { titulo: 'ICAO', detalhe: 'Organização da Aviação Civil Internacional: Anexo 1 (licenças, Capítulo 6), Anexo 6 (gerenciamento da fadiga), Doc 8984 (Manual de Medicina da Aviação Civil) e Doc 9966 (Manual do FRMS)' },
  { titulo: 'ANAC', detalhe: 'Agência Nacional de Aviação Civil (Brasil): RBAC 67 (certificação médica), RBAC 25 e RBAC 120' },
  { titulo: 'FAA', detalhe: 'Administração Federal de Aviação dos EUA: 14 CFR Partes 25, 61, 67 e 117, Guia do Examinador Médico (AME), AC 120-100 (fadiga), Manual de Informação Aeronáutica (AIM) e publicações do CAMI' },
  { titulo: 'EASA', detalhe: 'Agência Europeia para a Segurança da Aviação' },
  { titulo: 'CAA da Nova Zelândia', detalhe: 'Manual médico da autoridade de aviação civil (sistema respiratório)' },
  { titulo: 'NASA', detalhe: 'Agência espacial dos EUA (tolerância humana à aceleração)' },
  { titulo: 'OTAN', detalhe: 'AAMedP-1.13: requisitos mínimos de treinamento fisiológico em alto G' },
  { titulo: 'ICRP', detalhe: 'Comissão Internacional de Proteção Radiológica (Publicações 103 e 132)' },
  { titulo: 'CNEN', detalhe: 'Comissão Nacional de Energia Nuclear (Brasil), norma NN 3.01' },
  { titulo: 'União Europeia', detalhe: 'Diretiva 2013/59/Euratom (proteção contra radiações ionizantes) e Diretiva 2002/44/CE (vibrações)' },
  { titulo: 'Lei do Aeronauta', detalhe: 'Lei 13.475/2017 (Brasil): jornada, repouso, folgas e gerenciamento de risco de fadiga' },
  { titulo: 'Ministério do Trabalho e Emprego', detalhe: 'NR-15 (Anexos 1 e 8, ruído e vibração) e NR-9 (Anexo 1, vibração)' },
  { titulo: 'Fundacentro', detalhe: 'Norma de Higiene Ocupacional NHO 01 (ruído)' },
  { titulo: 'ISO', detalhe: 'ISO 2631-1 (exposição do corpo inteiro à vibração)' },
  { titulo: 'NIOSH e OSHA', detalhe: 'Instituto e agência de saúde e segurança do trabalho dos EUA (exposição ocupacional ao ruído)' },
];

// Diretrizes médicas e de saúde do viajante usadas para passageiros (02/11/2026).
export const diretrizes: Referencia[] = [
  { titulo: 'British Thoracic Society', detalhe: 'Declaração clínica sobre viagem aérea de passageiros com doença respiratória (Thorax, 2022)' },
  { titulo: 'CDC', detalhe: 'Centros de Controle e Prevenção de Doenças dos EUA: Yellow Book, viagem à altitude, mal da altitude, trombose em viajantes e jet lag' },
  { titulo: 'UK Civil Aviation Authority', detalhe: 'Autoridade de aviação civil do Reino Unido: orientação a profissionais de saúde sobre passageiros com doença cardiovascular' },
  { titulo: 'CANSO, ICAO e IFATCA', detalhe: 'Guia de gerenciamento da fadiga para serviços de tráfego aéreo (2016)' },
  { titulo: 'NIH', detalhe: 'Instituto Nacional de Ciências Médicas Gerais dos EUA (NIGMS): ritmos circadianos' },
  { titulo: 'IATA', detalhe: 'Associação Internacional de Transporte Aéreo: Medical Manual, passageiros com trombose recente (citado pelo CDC)' },
  { titulo: 'British Dental Journal', detalhe: 'Felkai et al., 2023: turismo odontológico, barotrauma e barodontalgia, com prazos para voar depois do dentista' },
  { titulo: 'PeerJ', detalhe: 'Topbaş et al., 2024: barodontalgia em pilotos e a classificação de Ferjentsik e Aker' },
  { titulo: 'Leproult e Van Cauter', detalhe: 'Revisão sobre sono, perda de sono, hormônios e metabolismo (Endocrine Development, 2010)' },
  { titulo: 'Companhias aéreas', detalhe: 'Formulário médico de passageiros (MEDIF) e regras de oxigênio e aparelhos a bordo' },
];
