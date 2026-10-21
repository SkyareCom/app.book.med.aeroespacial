// Missão I (Fisiologia) · Voo 1 — Atmosfera e ambiente de voo.
// Segue o Padrão Editorial dos Voos. Tópicos sem `conteudo` ainda estão em produção.
//
// REGISTRO DE REVISÃO (não aparece no app)
// M1V1 - I · Composição e camadas da atmosfera
// - Composição do ar seco (N₂ 78,08%, O₂ 20,95%, Ar 0,93%, CO₂ cerca de 0,04%) e proporção constante com a altitude:
//   Ernsting's Aviation and Space Medicine, 5ª ed., cap. sobre a atmosfera [confirmar capítulo e página];
//   Fundamentals of Aerospace Medicine, 5ª ed., cap. sobre o ambiente físico [confirmar capítulo e página].
// - Atmosfera padrão: 760 mmHg / 1.013,25 hPa e 15 °C ao nível do mar; queda de cerca de 2 °C por 1.000 ft;
//   tropopausa padrão a 36.089 ft (11 km) com −56,5 °C: ICAO Doc 7488, Manual of the ICAO Standard Atmosphere.
// - Tropopausa mais baixa nos polos e mais alta no equador; pressão cai à metade perto de 18.000 ft (380 mmHg):
//   Ernsting's, 5ª ed. [confirmar página]; Fisiologia Aeroespacial (Russomano et al.) [confirmar página].
// - Zonas fisiológicas (até 10.000 ft; 10.000–50.000 ft; acima de 50.000 ft) e Linha de Armstrong
//   (cerca de 63.000 ft, 47 mmHg): Fundamentals of Aerospace Medicine, 5ª ed. [confirmar página].
// - Pressão parcial de O₂: 0,2095 × pressão total (ISA: 159 mmHg ao nível do mar; 80 mmHg a 18.000 ft, 380 mmHg total).
// - Camadas acima da tropopausa (estratosfera até ~50 km, ozônio ~15–35 km, mesosfera 50–85 km com ~−86 °C,
//   termosfera até ~600 km, exosfera acima), linha de Kármán a 100 km, auroras e Estação Espacial (~400 km):
//   US Standard Atmosphere 1976 e Ernsting's, 5ª ed. [confirmar página].
// - Concorde em cruzeiro a cerca de 60.000 ft; Everest 8.849 m [confirmar referência].
// Recursos: foto da Terra vista da órbita (cenas/hero.jpg), gráfico composicao-ar e ilustração camadas-atmosfera.

import type { Capitulo } from '../tipos';

export const atmosfera: Capitulo = {
  numero: 1,
  titulo: 'Atmosfera e ambiente de voo',
  laboratorio: ['leis-gases'],
  topicos: [
    {
      id: '1.1',
      titulo: 'Composição e camadas da atmosfera',
      pergunta: 'Do que é feito o ar que respiramos, e o que muda quando subimos?',
      conteudo: {
        essencial:
          'A atmosfera é a camada de gases que envolve a Terra: cerca de 78% de nitrogênio e 21% de oxigênio. Essa proporção quase não muda com a altitude. O que muda é a pressão, que cai à medida que subimos.',
        explicacao: [
          'O ar é uma mistura. Quase quatro quintos são nitrogênio, que o corpo não usa para respirar. Um quinto é oxigênio, o gás que cada célula usa para produzir energia. O resto é argônio, gás carbônico e traços de outros gases, além do vapor d’água, que varia com o clima.',
          'O ar tem peso. Como numa pilha de cobertores, as camadas de baixo são comprimidas pelas de cima, por isso a pressão é maior perto do chão e cai com a altura. Perto de 18.000 ft (cerca de 5.500 m) ela já é metade da do nível do mar.',
          'Subindo, a atmosfera muda de comportamento e se divide em camadas. A troposfera, onde vivemos e voamos, tem nuvens e tempo, e a temperatura cai cerca de 2 °C a cada 1.000 ft. Ela termina na tropopausa, mais alta no equador que nos polos.',
          'Acima vêm a estratosfera, com a camada de ozônio, a mesosfera, a mais fria, onde os meteoros se queimam, e a termosfera, onde ficam as auroras e a Estação Espacial. Na linha de Kármán, a 100 km, começa convencionalmente o espaço.',
        ].join('\n\n'),
        clinico: [
          'Ar seco: N₂ 78,08%, O₂ 20,95%, argônio 0,93% e CO₂ cerca de 0,04%, proporções constantes na faixa de voo. O vapor d’água varia e fica quase todo na troposfera.',
          'Atmosfera Padrão ICAO: 760 mmHg (1.013,25 hPa) e 15 °C ao nível do mar, gradiente de 1,98 °C/1.000 ft e tropopausa a 36.089 ft (11 km) com −56,5 °C. A pressão parcial de O₂ é 0,2095 × pressão total: cerca de 159 mmHg ao nível do mar e 80 mmHg a 18.000 ft.',
          'Divisão fisiológica clássica: zona fisiológica até 10.000 ft; zona fisiologicamente deficiente de 10.000 a 50.000 ft, que exige oxigênio suplementar e pressurização; acima de 50.000 ft, zona equivalente ao espaço.',
          'Na Linha de Armstrong, cerca de 63.000 ft (19 km), a pressão ambiente iguala 47 mmHg, a pressão do vapor d’água a 37 °C: sem traje pressurizado, os líquidos expostos do corpo fervem.',
        ].join('\n\n'),
        recursos: [
          { apos: 'essencial', figura: { imagem: require('@/assets/images/cenas/hero.jpg'), legenda: 'A atmosfera vista da órbita: a faixa azul fina no horizonte concentra quase todo o ar do planeta.' } },
          { apos: 'essencial', midia: 'composicao-ar' },
          { apos: 'entenda', midia: 'camadas-atmosfera' },
        ],
      },
    },
    { id: '1.2', titulo: 'Leis dos gases aplicadas ao corpo' },
    { id: '1.3', titulo: 'Atmosfera padrão e tipos de altitude' },
    { id: '1.4', titulo: 'Temperatura, umidade e radiação em altitude' },
  ],
  teste: [
    {
      topico: '1.1',
      pergunta: 'Um avião sobe do nível do mar para 18.000 ft. O que acontece com o ar fora da cabine?',
      opcoes: [
        'A porcentagem de oxigênio cai para cerca de 10%.',
        'A porcentagem de oxigênio continua perto de 21%, mas a pressão cai à metade.',
        'A pressão sobe, porque o ar fica mais frio.',
        'O nitrogênio dá lugar ao oxigênio nas camadas mais altas.',
      ],
      correta: 1,
      explicacao: 'A proporção dos gases se mantém na faixa de voo; o que cai é a pressão, que perto de 18.000 ft é metade da do nível do mar.',
    },
  ],
};
