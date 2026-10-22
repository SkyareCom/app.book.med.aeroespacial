import type { Questao, Topico } from '../tipos';

// M1V1 - III. Texto autorizado pelo autor; pendências preservadas literalmente.
// Fontes, prompts e registro de revisão: docs/editorial/M1V1-III-Atmosfera-padrao.md.
export const topicoAtmosferaPadrao: Topico = {
  id: '1.3',
  titulo: 'Atmosfera padrão',
  pergunta: 'Como comparar voos diferentes se o ar muda de um lugar para outro?',
  conteudo: {
    essencial: 'A atmosfera padrão é um modelo de referência para os cálculos do voo. Ela funciona como uma régua comum, permitindo comparar resultados sob condições definidas. As condições encontradas durante um voo podem diferir desse modelo. [confirmar na referência]',
    explicacao: [
      'Imagine comparar receitas usando xícaras de tamanhos diferentes. Uma medida comum resolve o problema: a atmosfera padrão estabelece condições de referência para cálculos, ensaios e instrumentos.',
      'Um manequim ajuda a comparar tamanhos, mas não descreve todas as pessoas. Da mesma forma, o modelo não reproduz cada condição meteorológica encontrada em voo. [confirmar na referência]',
      'Uma tabela de conversão associa uma medida à outra. A altitude-pressão (altitude correspondente a uma pressão na atmosfera padrão) faz essa associação: expressa pressão em termos de altitude.',
    ].join('\n\n'),
    clinico: [
      'Para reproduzir um cálculo, identifique a pressão e a temperatura de referência, além da relação adotada entre pressão e altitude. Pressão basal: [confirmar na referência] mmHg; temperatura basal: [confirmar na referência] °C; equações e faixa de validade: [confirmar na referência].',
      'A interpretação clínica deve considerar as condições às quais a pessoa esteve exposta, distinguindo valores medidos de valores obtidos pelo modelo. Documentação da exposição, critérios de avaliação e condutas: [confirmar na referência].',
      'A padronização permite apresentar resultados de ensaios e avaliar instrumentos sob uma referência comum. Requisitos específicos de certificação e critérios médicos de aptidão para o voo: [confirmar na referência].',
    ].join('\n\n'),
    alerta: 'Um valor do modelo não comprova as condições reais da cabine nem determina, isoladamente, a segurança clínica de uma exposição. [confirmar na referência]',
    recursos: [
      {
        apos: 'essencial',
        figura: {
          imagem: require('@/assets/images/topicos/m1v1-3-voo.jpg'),
          legenda: 'O cenário muda; uma referência comum permite comparar os cálculos do voo.',
        },
      },
      { apos: 'entenda', paragrafo: 1, midia: 'comparar-atmosfera-padrao' },
      {
        apos: 'entenda', paragrafo: 2,
        figura: {
          imagem: require('@/assets/images/topicos/m1v1-3-observacao.jpg'),
          legenda: 'Observar e medir o ambiente permite confrontar a referência com as condições encontradas. [confirmar na referência]',
        },
      },
      { apos: 'entenda', paragrafo: 3, midia: 'altitude-pressao' },
    ],
    vejaTambem: [
      { codigo: 'M1V2', titulo: 'Pressurização e oxigênio suplementar', secao: 'conceitos', voo: 2 },
      { codigo: 'M2V1', titulo: 'Sistema respiratório e hipóxia', secao: 'sistemas', voo: 1 },
      { codigo: 'M3V1', titulo: 'Certificação e risco aeromédico', secao: 'aviacao', voo: 1 },
    ],
  },
};

export const questaoAtmosferaPadrao: Questao = {
  topico: '1.3',
  pergunta: 'Uma equipe precisa comparar dois ensaios de equipamentos realizados sob condições atmosféricas diferentes. Qual é o papel da atmosfera padrão?',
  opcoes: [
    'Garantir que ambos encontraram exatamente as mesmas condições meteorológicas.',
    'Oferecer condições de referência comuns para apresentar e comparar os resultados.',
    'Substituir todas as medições feitas durante os ensaios.',
    'Determinar automaticamente a aptidão médica das pessoas envolvidas.',
  ],
  correta: 1,
  explicacao: 'O modelo fornece uma referência compartilhada para a comparação dos ensaios. Ele não transforma condições medidas diferentes em condições reais idênticas. [confirmar na referência]',
};
