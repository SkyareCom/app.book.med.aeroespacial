// Missão I (Fisiologia) · Voo 1 — Atmosfera e ambiente de voo.
// Segue o Padrão Editorial dos Voos. Tópicos sem `conteudo` ainda estão em produção.
//
// REGISTRO DE REVISÃO (não aparece no app)
// M1V1 - I · Composição e camadas da atmosfera — CONGELADO em 21/10/2026: não alterar sem pedido do autor.
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
// Recursos: foto da Terra vista da órbita (cenas/hero.jpg), gráfico composicao-ar e camadas-atmosfera
// (rótulos sobre a foto cenas/camadas.jpg, gerada por IA).
//
// M1V1 - II · Leis dos gases aplicadas ao corpo
// - Leis de Boyle, Dalton, Henry e Charles e suas aplicações em voo: Ernsting's, 5ª ed., cap. sobre a atmosfera
//   e os efeitos da pressão [confirmar capítulo e página]; Fundamentals of Aerospace Medicine, 5ª ed.
//   [confirmar página]; Fisiologia Aeroespacial (Russomano et al.) [confirmar página].
// - Gás corporal saturado de vapor a 37 °C (47 mmHg): expansão = (760 − 47) ÷ (P − 47). Valores calculados na
//   atmosfera padrão ICAO (Doc 7488): 8.000 ft = 565 mmHg → 1,4×; 18.000 ft = 380 mmHg → 2,1×; 25.000 ft = 282 mmHg → 3×.
// - PO₂ inspirado = 0,2095 × (PB − 47): 149 mmHg ao nível do mar; 108 a 8.000 ft; 70 a 18.000 ft (cálculo).
// - Altitude máxima de cabine de 8.000 ft em condições normais: FAA 14 CFR 25.841 e EASA CS 25.841 [confirmar texto].
// - Barotraumas (ouvido médio mais comum na descida; seios da face; barodontalgia; gás gastrointestinal) e gases
//   iatrogênicos (pneumotórax não drenado, gás intraocular, balonete de cânula): Ernsting's e Fundamentals [confirmar página].
// - Doença descompressiva de altitude rara abaixo de 18.000 ft; mergulho antes do voo aumenta o risco:
//   Fundamentals of Aerospace Medicine, 5ª ed. [confirmar página]. Intervalos de superfície ficam para o voo de DD.
// - Tensão de N₂ nos tecidos ao nível do mar aproximada por 0,7808 × (760 − 47) ≈ 557 mmHg (cálculo didático).
// Recursos: tabela das leis, simulação gases-corpo (Boyle, Dalton, Henry) e tabela dos locais de gás preso.
// Imagem fotográfica pendente: pacote fechado estufado na bandeja do avião (prompt enviado ao autor).

import type { Capitulo } from '../tipos';

export const atmosfera: Capitulo = {
  numero: 1,
  titulo: 'Atmosfera e ambiente de voo',
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
    {
      id: '1.2',
      titulo: 'Leis dos gases aplicadas ao corpo',
      pergunta: 'Por que o ouvido dói na descida, falta oxigênio lá em cima e o mergulhador não pode voar logo depois?',
      conteudo: {
        essencial:
          'O corpo carrega gases: no ouvido, nos seios da face, no intestino, nos pulmões e dissolvidos no sangue. Quando a pressão cai na subida, três leis da física explicam o que acontece com eles: o gás preso se expande, o oxigênio entra com menos força e o nitrogênio dissolvido tende a sair em bolhas.',
        explicacao: [
          'Lei de Boyle: quanto menor a pressão, maior o volume de um gás. É o pacote de salgadinho que estufa durante o voo. No corpo, o gás preso em cavidades fechadas faz o mesmo e pressiona as paredes ao redor.',
          'Na subida, o ar do ouvido médio e dos seios da face precisa sair, e normalmente sai sozinho. Na descida, ele precisa entrar: se a passagem estiver fechada, como num resfriado, a pressão de fora empurra o tímpano e dói. Os gases do intestino também crescem e causam desconforto.',
          'Lei de Dalton: a pressão do ar é a soma das pressões de cada gás. O oxigênio responde por cerca de 21% dela em qualquer altitude. Quando a pressão total cai, a parte do oxigênio cai junto, e é ela que empurra o oxigênio dos pulmões para o sangue: daí a hipóxia em altitude.',
          'Lei de Henry: a quantidade de gás dissolvida num líquido acompanha a pressão desse gás. Ao abrir um refrigerante, a pressão cai e o gás sai em bolhas. O nitrogênio dissolvido no sangue e nos tecidos pode fazer o mesmo se a pressão cair rápido demais: é a doença descompressiva.',
          'Lei de Charles: o gás aquecido se expande e o resfriado se contrai. Dentro do corpo, cuja temperatura quase não muda, ela pesa pouco. Pesa mais nos equipamentos: no frio, a pressão de um cilindro de oxigênio fechado cai.',
        ].join('\n\n'),
        clinico: [
          'Boyle (P₁V₁ = P₂V₂, temperatura constante). O gás das cavidades corporais está saturado de vapor d’água a 37 °C (47 mmHg), que não se expande com a queda de pressão; por isso a expansão é (760 − 47) ÷ (P − 47). Na atmosfera padrão: cerca de 1,4× a 8.000 ft, a altitude máxima de cabine em operação normal; 2,1× a 18.000 ft; 3× a 25.000 ft.',
          'Gás preso: barotrauma de ouvido médio, mais frequente na descida; barossinusite; barodontalgia; distensão gastrointestinal. Gases patológicos ou iatrogênicos pedem atenção na avaliação para voo: pneumotórax não drenado, gás intraocular após cirurgia de retina e ar em balonetes de cânulas e sondas.',
          'Dalton (P total = soma das pressões parciais). PO₂ inspirado = 0,2095 × (PB − 47): cerca de 149 mmHg ao nível do mar, 108 mmHg a 8.000 ft e 70 mmHg a 18.000 ft. É a base da hipóxia hipóxica e do cálculo do oxigênio suplementar.',
          'Henry (gás dissolvido proporcional à sua pressão parcial). Tecidos saturados de N₂ ao nível do mar ficam supersaturados quando a pressão ambiente cai; com descompressão rápida ou exposição a grandes altitudes podem se formar bolhas. A doença descompressiva de altitude é rara abaixo de 18.000 ft, e mergulho com ar comprimido antes do voo aumenta o risco.',
          'Charles e Gay-Lussac (volume e pressão proporcionais à temperatura absoluta). Pouco relevantes no corpo, de temperatura estável; explicam a queda de pressão de cilindros de oxigênio no frio.',
        ].join('\n\n'),
        alerta: 'Com gripe, resfriado ou sinusite, a dor de ouvido e dos seios da face na descida é mais provável. Quem mergulhou com cilindro deve respeitar o intervalo antes de voar.',
        recursos: [
          {
            apos: 'essencial',
            tabela: {
              titulo: 'As leis dos gases em voo',
              colunas: ['Lei', 'O que diz', 'No corpo em voo'],
              linhas: [
                ['Boyle', 'Menos pressão, mais volume.', 'O gás preso se expande: ouvido, seios da face, dentes, intestino e pulmões.'],
                ['Dalton', 'Cada gás responde por uma parte da pressão total.', 'O oxigênio entra com menos força: hipóxia.'],
                ['Henry', 'O gás dissolvido acompanha a pressão.', 'O nitrogênio pode formar bolhas: doença descompressiva.'],
                ['Charles', 'Mais calor, mais volume.', 'Pouco efeito no corpo; no frio, cai a pressão dos cilindros de oxigênio.'],
              ],
            },
          },
          { apos: 'entenda', midia: 'gases-corpo' },
          {
            apos: 'profissionais',
            tabela: {
              titulo: 'Onde o gás fica preso',
              colunas: ['Local', 'Quando incomoda', 'O que se sente'],
              linhas: [
                ['Ouvido médio', 'Principalmente na descida.', 'Dor, ouvido tapado e audição abafada.'],
                ['Seios da face', 'Na subida ou na descida.', 'Dor na testa, ao redor dos olhos ou nos dentes de cima.'],
                ['Dentes', 'Na subida.', 'Dor em dente com cárie, restauração mal adaptada ou ar preso.'],
                ['Estômago e intestino', 'Na subida.', 'Estufamento, cólica e gases.'],
                ['Pulmões e pleura', 'Descompressão rápida ou pneumotórax prévio.', 'Falta de ar e dor no peito.'],
              ],
            },
          },
        ],
      },
    },
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
    {
      topico: '1.2',
      pergunta: 'Um passageiro resfriado sente forte dor de ouvido. Em que fase do voo isso é mais provável, e por quê?',
      opcoes: [
        'Na subida, porque o oxigênio do ouvido acaba.',
        'Na descida, porque o ar precisa voltar para o ouvido médio e a passagem está fechada.',
        'No cruzeiro, porque o nitrogênio forma bolhas no ouvido.',
        'Em qualquer fase, porque o frio contrai o tímpano.',
      ],
      correta: 1,
      explicacao: 'Lei de Boyle: na descida a pressão de fora aumenta; se a passagem do ouvido está fechada, o ar não entra e o tímpano é empurrado para dentro.',
    },
  ],
};
