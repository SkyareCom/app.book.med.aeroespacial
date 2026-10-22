import type { Questao, Topico } from '../tipos';

// M1V1 - III. Definições e parâmetros conferidos em fontes públicas primárias.
// Fontes, prompts e registro de revisão: docs/editorial/M1V1-III-Atmosfera-padrao.md.
export const topicoAtmosferaPadrao: Topico = {
  id: '1.3',
  titulo: 'Atmosfera padrão',
  pergunta: 'O que é a atmosfera padrão e como ela se compara ao ar que encontramos?',
  conteudo: {
    essencial: 'Atmosfera padrão é um modelo matemático do ar, com valores definidos de pressão, temperatura e densidade para cada altitude. Serve como referência para calibrar instrumentos, comparar ensaios e calcular o desempenho das aeronaves.',
    explicacao: [
      'A ISA (atmosfera padrão internacional) considera ar seco e parte de condições definidas ao nível médio do mar. Na troposfera padrão, a temperatura cai 6,5 °C por quilômetro até 11 km. Pressão e densidade também diminuem com a altitude, conforme as relações do modelo.',
      'A atmosfera real varia com o relevo, o local, o horário e as condições meteorológicas. Superfície terrestre não significa nível do mar: praias, planaltos e montanhas estão em altitudes diferentes. Compare a medição com o valor padrão da mesma altitude, não automaticamente com o valor do nível do mar.',
      'O modelo fornece a referência; as medições mostram o ambiente encontrado. Na aviação, as condições reais exigem os ajustes previstos nas tabelas de desempenho da aeronave. Altitude-pressão é a altitude da ISA correspondente à pressão observada, que pode diferir da altitude real.',
    ].join('\n\n'),
    clinico: [
      'No perfil padrão até 11 km de altitude geopotencial, a temperatura é T = 15 − 6,5 × h, com h em quilômetros. Em 11 km, são −56,5 °C. Essa relação descreve o modelo; o perfil térmico real pode ser diferente.',
      'Densidade é a massa de ar por unidade de volume e depende de pressão, temperatura e umidade. Altitude-densidade é a altitude da ISA com a mesma densidade do ar real. Ela ajuda a interpretar o desempenho aeronáutico em condições diferentes das padronizadas.',
      'Diferencie a pressão local da pressão corrigida ao nível do mar, usada para comparar observações meteorológicas. A correção não representa a pressão efetivamente medida naquele ponto. Em cabine pressurizada, a pressão interna difere da externa; a avaliação da oxigenação considera o ar respirado e a oferta de oxigênio.',
    ].join('\n\n'),
    alerta: '15 °C e 1.013,25 hPa são referências ao nível do mar, não valores obrigatórios em toda a superfície terrestre. Para avaliar uma exposição, considere as condições reais do ambiente respirado.',
    recursos: [
      {
        apos: 'essencial',
        figura: {
          imagem: require('@/assets/images/topicos/m1v1-3-voo.jpg'),
          legenda: 'A atmosfera padrão fornece a referência; as condições reais do ar influenciam o desempenho do voo.',
        },
      },
      {
        apos: 'entenda', paragrafo: 1,
        tabela: {
          titulo: 'Parâmetros: padrão × atmosfera real',
          colunas: ['Parâmetro', 'Atmosfera padrão', 'Atmosfera real'],
          linhas: [
            ['Temperatura ao nível do mar', '15 °C.', 'Varia conforme o local e o momento.'],
            ['Pressão ao nível do mar', '1.013,25 hPa, equivalentes a 760 mmHg.', 'Varia com as condições meteorológicas; não é sempre igual à referência.'],
            ['Densidade ao nível do mar', '1,225 kg/m³.', 'Depende da pressão, da temperatura e do vapor d’água.'],
            ['Vapor d’água', 'Ar seco, sem vapor d’água.', 'Quantidade variável de vapor d’água.'],
            ['Temperatura com a altitude', 'Queda de 6,5 °C por quilômetro até 11 km de altitude geopotencial.', 'A variação não é uniforme e depende do perfil meteorológico.'],
          ],
        },
      },
      {
        apos: 'entenda', paragrafo: 2,
        figura: {
          imagem: require('@/assets/images/topicos/m1v1-3-observacao.jpg'),
          legenda: 'As medições descrevem o ar daquele local e momento; a comparação precisa considerar a altitude da estação.',
        },
      },
      { apos: 'entenda', paragrafo: 3, midia: 'altitude-pressao' },
      {
        apos: 'profissionais', paragrafo: 3,
        tabela: {
          titulo: 'Superfície, ar externo e cabine',
          colunas: ['Ambiente', 'O que comparar', 'Como interpretar'],
          linhas: [
            ['Superfície terrestre', 'Condições medidas e valores padrão na altitude do local.', 'Um aeroporto em altitude não deve ser comparado diretamente com a referência do nível do mar.'],
            ['Ar externo em voo', 'Pressão, temperatura e densidade externas na mesma altitude.', 'O perfil observado pode diferir do modelo devido às condições atmosféricas reais.'],
            ['Cabine pressurizada', 'Pressão interna e condições do ar respirado.', 'A altitude de voo não representa, sozinha, a exposição dos ocupantes.'],
          ],
        },
      },
    ],
  },
};

export const questaoAtmosferaPadrao: Questao = {
  topico: '1.3',
  pergunta: 'Qual alternativa descreve corretamente a atmosfera padrão internacional (ISA)?',
  opcoes: [
    'É a previsão exata das condições meteorológicas em qualquer aeroporto.',
    'É um modelo com parâmetros definidos por altitude, usado como referência nos cálculos aeronáuticos.',
    'É qualquer ambiente com pressão de 1.013,25 hPa, independentemente da temperatura.',
    'É o conjunto de condições que todo voo deve reproduzir para ser considerado seguro.',
  ],
  correta: 1,
  explicacao: 'A ISA define uma referência para pressão, temperatura e densidade em cada altitude. Os valores medidos podem diferir do modelo; a comparação deve considerar a mesma altitude e as mesmas unidades.',
};
