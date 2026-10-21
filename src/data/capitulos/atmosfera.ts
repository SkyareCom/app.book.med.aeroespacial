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
// Recurso visual do tópico: ilustração das camadas da atmosfera, a incluir quando houver componente de imagem.

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
        explicacao:
          'O ar tem peso. Como numa pilha de cobertores, as camadas de baixo são comprimidas pelas de cima, por isso a pressão é maior perto do chão e cai com a altura: perto de 18.000 ft (cerca de 5.500 m) ela já é metade da do nível do mar. A camada onde vivemos e voamos é a troposfera, onde ficam as nuvens e o tempo, e a temperatura cai cerca de 2 °C a cada 1.000 ft. Ela termina na tropopausa, mais alta no equador que nos polos. Acima vem a estratosfera, onde fica a camada de ozônio.',
        clinico:
          'Ar seco: N₂ 78,08%, O₂ 20,95%, argônio 0,93% e CO₂ cerca de 0,04%, proporções constantes na faixa de voo; o vapor d’água varia e fica quase todo na troposfera. Atmosfera Padrão ICAO: 760 mmHg (1.013,25 hPa) e 15 °C ao nível do mar, gradiente de 1,98 °C/1.000 ft e tropopausa a 36.089 ft (11 km) com −56,5 °C. Divisão fisiológica clássica: zona fisiológica até 10.000 ft; zona fisiologicamente deficiente de 10.000 a 50.000 ft, que exige oxigênio suplementar e pressurização; acima de 50.000 ft, zona equivalente ao espaço. Na Linha de Armstrong, cerca de 63.000 ft, a pressão ambiente iguala 47 mmHg e os líquidos corporais fervem a 37 °C.',
        pontosChave: [
          'O ar tem cerca de 21% de oxigênio em qualquer altitude de voo.',
          'A pressão cai com a altitude e chega à metade perto de 18.000 ft.',
          'Na troposfera a temperatura cai cerca de 2 °C a cada 1.000 ft.',
          'Acima de 10.000 ft o corpo já precisa de proteção para voar com segurança.',
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
