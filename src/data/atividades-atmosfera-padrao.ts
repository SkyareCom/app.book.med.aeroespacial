// Atividades de M1V1 - III. Fontes e escopo no registro editorial do tópico.
// Os exemplos são autorais; não contêm observações ou valores físicos inventados.
export const CASOS_MODELO_MEDICAO = [
  {
    id: 'referencia-comum',
    texto: 'Um documento define condições de referência para comparar ensaios de aeronaves. Isso é modelo ou medição?',
    resposta: 'Modelo',
    explicacao: 'As condições pertencem a uma referência comum para os cálculos. Elas não descrevem uma observação específica.',
  },
  {
    id: 'barometro',
    texto: 'Uma profissional lê a pressão em um barômetro (instrumento que mede a pressão do ar). Isso é modelo ou medição?',
    resposta: 'Medição',
    explicacao: 'A leitura vem de um instrumento naquele local e momento. Ela descreve uma observação do ambiente.',
  },
  {
    id: 'tabela-padrao',
    texto: 'Uma equipe consulta os valores de uma tabela da atmosfera padrão. Isso é modelo ou medição?',
    resposta: 'Modelo',
    explicacao: 'A tabela apresenta as condições definidas pelo modelo. Consultá-la não mede as condições reais de um voo.',
  },
  {
    id: 'termometro',
    texto: 'Durante um voo, um termômetro registra a temperatura do ar. Isso é modelo ou medição?',
    resposta: 'Medição',
    explicacao: 'O instrumento registra uma condição observada naquele momento. Essa leitura pode diferir do valor definido pelo modelo.',
  },
];

export type VariacaoPressao = 'menor' | 'maior';

export const EFEITOS_PRESSAO = {
  menor: {
    altitude: 'Mais alta',
    posicao: 'topo',
    explicacao: 'Na mesma atmosfera padrão, uma pressão menor corresponde a uma altitude-pressão maior.',
  },
  maior: {
    altitude: 'Mais baixa',
    posicao: 'base',
    explicacao: 'Na mesma atmosfera padrão, uma pressão maior corresponde a uma altitude-pressão menor.',
  },
} as const;
