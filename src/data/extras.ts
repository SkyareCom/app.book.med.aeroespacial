// Curiosidades e dados do Laboratório Aeroespacial.

export const curiosidades: string[] = [
  'A 35.000 pés, sem oxigênio, a consciência útil dura de 30 segundos a 1 minuto.',
  'A altitude de cabine de um avião comercial costuma ficar em até 8.000 pés, cerca de 2.400 m.',
  'Na altitude de cabine de 8.000 pés, o gás preso no corpo se expande cerca de um terço.',
  'Em voos longos, a umidade do ar da cabine fica frequentemente abaixo de 20%.',
  'Acima de cerca de 19 km de altitude, os líquidos do corpo ferveriam a 37 °C sem proteção.',
  'O recorde de permanência contínua no espaço é de 437 dias, do médico russo Valeri Polyakov.',
];

// Tempo de consciência útil médio por altitude (FAA Advisory Circular 61-107).
export const tabelaTUC: { altitudePes: number; tempo: string }[] = [
  { altitudePes: 18000, tempo: '20 a 30 minutos' },
  { altitudePes: 22000, tempo: '5 a 10 minutos' },
  { altitudePes: 25000, tempo: '3 a 5 minutos' },
  { altitudePes: 28000, tempo: '2,5 a 3 minutos' },
  { altitudePes: 30000, tempo: '1 a 2 minutos' },
  { altitudePes: 35000, tempo: '30 segundos a 1 minuto' },
  { altitudePes: 40000, tempo: '15 a 20 segundos' },
  { altitudePes: 45000, tempo: '9 a 15 segundos' },
];

export const simuladores = [
  { id: 'tuc', curto: 'Consciência útil', titulo: 'Tempo de consciência útil', descricao: 'Escolha a altitude e veja quanto tempo resta para agir.', disponivel: true },
  { id: 'hipoxia', curto: 'Hipóxia', titulo: 'Simulador de hipóxia', descricao: 'A visão e o raciocínio em queda conforme a altitude sobe.', disponivel: false },
  { id: 'forcas-g', curto: 'Forças G', titulo: 'Forças G', descricao: 'Do acinzentamento da visão à perda de consciência.', disponivel: false },
  { id: 'descompressao', curto: 'Descompressão', titulo: 'Descompressão', descricao: 'O que acontece na cabine nos primeiros segundos.', disponivel: false },
];
