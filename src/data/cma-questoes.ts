import type { Questao } from './tipos';

// Simulado do Exame CMA: questões sobre os requisitos do RBAC 67 (ANAC, Emenda 05).
// Registro de revisão (27/10/2026): 67.15(a) validade; 67.71(g) recurso; 67.79(a) PA; 67.85(d)–(f) glicemia;
// 67.99(c) visão; 67.101(a) audição.
export const questoesCMA: Questao[] = [
  {
    dificuldade: 'facil',
    pergunta: 'Qual é a validade do CMA de 1ª classe de um piloto de linha aérea de 35 anos?',
    opcoes: ['6 meses', '12 meses', '24 meses', '60 meses'],
    correta: 1,
    explicacao: 'A 1ª classe vale 12 meses. Cai para 6 meses no transporte público a partir dos 60 anos, ou a partir dos 40 para piloto único com passageiros.',
    topico: 'CMA',
  },
  {
    dificuldade: 'media',
    pergunta: 'Um piloto privado de 45 anos renova o CMA de 2ª classe. Qual é a validade?',
    opcoes: ['12 meses', '24 meses', '48 meses', '60 meses'],
    correta: 1,
    explicacao: 'Para PP: 60 meses até os 39 anos, 24 meses dos 40 aos 49 e 12 meses a partir dos 50.',
    topico: 'CMA',
  },
  {
    dificuldade: 'media',
    pergunta: 'Uma comissária de 62 anos renova o CMA. Qual é a validade?',
    opcoes: ['12 meses', '24 meses', '48 meses', '60 meses'],
    correta: 1,
    explicacao: 'Comissário: 60 meses até os 59 anos e 24 meses a partir dos 60.',
    topico: 'CMA',
  },
  {
    dificuldade: 'facil',
    pergunta: 'Na 1ª classe, qual pressão arterial sustentada torna o candidato não apto?',
    opcoes: ['Acima de 130×85 mmHg', 'Acima de 140×90 mmHg', 'Acima de 160×100 mmHg', 'Só com lesão de órgão-alvo'],
    correta: 1,
    explicacao: 'O limite é 140×90 mmHg sustentado. Anti-hipertensivos são aceitos a critério do examinador, com a pressão controlada.',
    topico: 'CMA',
  },
  {
    dificuldade: 'media',
    pergunta: 'Qual acuidade visual de longe a 1ª classe exige?',
    opcoes: ['20/40 em cada olho', '20/30 em cada olho e 20/20 binocular', '20/20 em cada olho, sem correção', '20/50 binocular'],
    correta: 1,
    explicacao: 'Com ou sem correção: 20/30 ou melhor em cada olho e 20/20 ou melhor com os dois olhos.',
    topico: 'CMA',
  },
  {
    dificuldade: 'dificil',
    pergunta: 'Na audiometria da 1ª classe, qual é a perda máxima aceita em cada orelha?',
    opcoes: ['25 dB em todas as frequências', '35 dB em 500, 1.000 e 2.000 Hz e 50 dB em 3.000 Hz', '40 dB em 1.000 Hz', '50 dB em 500 a 3.000 Hz'],
    correta: 1,
    explicacao: 'Até 35 dB em 500, 1.000 e 2.000 Hz e até 50 dB em 3.000 Hz. Fora disso, o teste de discriminação da fala pode compensar.',
    topico: 'CMA',
  },
  {
    dificuldade: 'dificil',
    pergunta: 'Um piloto de 1ª classe passou a usar antidiabético oral. Quando ele pode ser julgado apto?',
    opcoes: ['Imediatamente, sem restrição', 'Após 60 dias com glicemia entre 70 e 139 mg/dl, com validade de até 6 meses', 'Após 1 ano, com validade normal', 'Nunca'],
    correta: 1,
    explicacao: 'O RBAC 67 exige 60 dias de observação com glicemia acima de 69 e abaixo de 140 mg/dl. A validade fica limitada a 6 meses.',
    topico: 'CMA',
  },
  {
    dificuldade: 'media',
    pergunta: 'Uma glicemia de jejum de 148 mg/dl aparece no exame. Qual é a conduta?',
    opcoes: ['Não apto na hora', 'Repetir em duas dosagens, em dias diferentes, antes de concluir', 'Apto, pois está perto do normal', 'Encaminhar direto à ANAC'],
    correta: 1,
    explicacao: 'Abaixo de 50 ou acima de 140 mg/dl só desqualifica quando confirmado em duas dosagens repetidas, em dias diferentes.',
    topico: 'CMA',
  },
  {
    dificuldade: 'dificil',
    pergunta: 'Qual é o limite de hiperforia aceito na 1ª classe?',
    opcoes: ['1 dioptria prismática', '5 dioptrias prismáticas', '10 dioptrias prismáticas', 'Qualquer valor, se corrigido'],
    correta: 0,
    explicacao: 'Hiperforia até 1 DP, exoforia até 5 DP e esoforia até 10 DP. Heterotropia não é aceita.',
    topico: 'CMA',
  },
  {
    dificuldade: 'media',
    pergunta: 'O examinador julga um candidato não apto. O que ele deve fazer?',
    opcoes: ['Emitir o CMA com restrição', 'Não emitir o CMA e informar o direito de recurso à ANAC', 'Pedir nova consulta em 30 dias, sem registro', 'Emitir o CMA com validade de 6 meses'],
    correta: 1,
    explicacao: 'Pelo RBAC 67.71(g), o examinador recusa a emissão e informa ao candidato o direito de recorrer à ANAC.',
    topico: 'CMA',
  },
];
