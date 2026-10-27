// Missão 1 (Conceitos) · Voo 2 — Pressurização e oxigênio suplementar.
// Prosa única e progressiva, com destaques; cada tema num só lugar (referências cruzadas "Veja M_V_").
//
// REGISTRO DE REVISÃO (não aparece no app)
// M1V2 - I · Pressurização
// - Pressurização comprime o ar para manter a altitude de cabine abaixo da altitude de voo; oxigênio suplementar
//   continua necessário porque a descompressão é sempre possível; ar de sangria (turbina) ou turbocompressor /
//   bomba pneumática (aviões leves); válvula de saída; pressão diferencial com máximo por aeronave; válvula de
//   alívio em algumas aeronaves: FAA AC 61-107B, seção 2-9.c (p. 34).
// - Pressão diferencial do simulador: diferença entre a pressão da atmosfera padrão na altitude de cabine e na de
//   voo (cálculo; 1 mmHg = 1,33322 hPa = 0,0193368 psi).
// M1V2 - II · Altitude de cabine
// - Definição: AC 61-107B, seção 1-4.d (p. 2).
// - Até 8.000 ft em condições normais; 15.000 ft em falha provável (aviões certificados acima de 25.000 ft);
//   não mais que 25.000 ft por mais de 2 min nem acima de 40.000 ft; alerta à tripulação acima de 10.000 ft
//   (até 15.000 ft em operações em aeroportos altos): 14 CFR 25.841(a), (b) e (d).
// - Máscaras de passageiros antes de 15.000 ft de cabine (aviões parte 25 com esses requisitos): AC 61-107B, 2-9.c.
// - Pressão da cabine igual à externa antes do pouso; descida da cabine geralmente até 500–600 ft/min:
//   AC 61-107B, seção 2-6.c (p. 9).
// - Perfil do gráfico: voo ilustrativo de 2 h (subida a 38.000 ft), não é dado de aeronave.
// M1V2 - III · Oxigênio e máscaras
// - Oxigênio respiratório de aviação conforme SAE AS8010; cilindros de 1.800 a 2.200 psi; óleo, graxa e fumo
//   proibidos; máscaras dos pilotos podem ter fluxo maior; fluxo contínuo certificado até 41.000 ft, atenção acima
//   de 25.000 ft; demanda diluidora até 40.000 ft, sem barba ou bigode; pressão de demanda acima de 40.000 ft:
//   AC 61-107B, seção 2-9.b (p. 33–34).
// - Oxigênio recomendado em voo não pressurizado a partir de 10.000 ft de dia e acima de 5.000 ft à noite:
//   AC 61-107B, seção 2-7.f(2) (p. 21).
// - 12.500–14.000 ft por mais de 30 min (tripulação); acima de 14.000 ft (tripulação, todo o tempo); acima de
//   15.000 ft (todos os ocupantes); acima do FL250, 10 min de oxigênio por ocupante; acima do FL350, um piloto de
//   máscara, exceto até o FL410 com dois pilotos e máscaras de colocação rápida (5 s, uma mão): 14 CFR 91.211.
// M1V2 - IV · Pressão positiva
// - Pressão de demanda aplica pressão positiva na máscara e é segura acima de 40.000 ft: AC 61-107B, 2-9.b(1)(b).
// - Respiração prolongada sob pressão positiva como causa de hipóxia estagnante: AC 61-107B, Tabela 2-4 (p. 19).
// - Oxigênio inspirado: ar = 0,2095 × (PB − 47); oxigênio a 100% = PB − 47 (cálculo na atmosfera padrão:
//   40.000 ft ≈ 140 mmHg → cerca de 93 mmHg).
// - Ernsting's (5ª ed.) e Fundamentals (5ª ed.), capítulos de cabine pressurizada e sistemas de oxigênio
//   [confirmar capítulo e página].
// Fotos premium pendentes (prompts enviados ao autor).

import type { Capitulo } from '../tipos';

export const pressurizacao: Capitulo = {
  numero: 2,
  titulo: 'Pressurização e oxigênio suplementar',
  resumo: 'Lá fora, o ar não sustenta a vida. Dentro, uma bolha pressurizada e uma máscara pronta para cair.',
  tempoLeituraMin: 20,
  objetivos: [
    'Explicar como a cabine é pressurizada',
    'Diferenciar altitude de voo e altitude de cabine',
    'Reconhecer os sistemas de oxigênio e seus limites',
    'Entender por que a pressão positiva é necessária acima de 40.000 ft',
  ],
  topicos: [
    {
      id: '2.1',
      titulo: 'Pressurização',
      pergunta: 'Como um avião mantém o ar respirável a mais de 10 km de altura?',
      conteudo: {
        texto: [
          "Na altitude de cruzeiro, a pressão lá fora é baixa demais para o corpo (Veja M1V1 - I). A **pressurização** resolve isso comprimindo ar dentro da cabine, para que o corpo viva numa **altitude de cabine** muito menor que a altitude de voo.",
          "O ar vem dos motores. Nos aviões a turbina, chega como **ar de sangria** do motor; nos aviões leves pressurizados, vem do **turbocompressor** ou de uma **bomba pneumática**. Esse ar entra sem parar, e a **válvula de saída** solta o excesso para fora, mantendo a pressão da cabine estável.",
          "A cabine funciona como um balão rígido. Cada avião suporta uma diferença máxima entre a pressão de dentro e a de fora: a **pressão diferencial**, mostrada num indicador. Algumas aeronaves têm **válvulas de alívio** que protegem a estrutura quando essa diferença sai do limite.",
          "**Pressurizar não dispensa o oxigênio.** Uma falha ou uma descompressão é sempre possível, e por isso o oxigênio suplementar continua a bordo (Veja M1V3).",
        ].join('\n\n'),
        recursos: [{ paragrafo: 3, midia: 'pressao-diferencial' }],
      },
    },
    {
      id: '2.2',
      titulo: 'Altitude de cabine',
      pergunta: 'A que altitude o seu corpo está, de verdade, durante o voo?',
      conteudo: {
        texto: [
          "**Altitude de cabine** é a pressão dentro da cabine traduzida na altitude equivalente acima do nível do mar. Num cruzeiro a 38.000 ft, o corpo não está a 38.000 ft: está na altitude que a pressão da cabine representa.",
          "Nos aviões de transporte, a regra de certificação limita a cabine a **até 8.000 ft em condições normais de operação**. É a altitude que o corpo de quem voa enfrenta em quase todo cruzeiro, com o oxigênio inspirado já mais baixo que no solo (Veja M1V1 - II).",
          "A regra também prevê a falha. Num defeito provável, os ocupantes não podem ficar acima de **15.000 ft** de cabine; numa descompressão, a cabine não pode passar de **25.000 ft por mais de 2 minutos** nem jamais de **40.000 ft**. A tripulação recebe um **alerta quando a cabine passa de 10.000 ft**, e as máscaras dos passageiros caem antes de 15.000 ft.",
          "Na descida, a cabine também desce, mas devagar: em geral, **no máximo 500 a 600 ft por minuto**, para poupar os ouvidos (Veja M2V3). Antes do pouso, a pressão de dentro iguala a de fora.",
        ].join('\n\n'),
        recursos: [{ paragrafo: 2, midia: 'perfil-cabine' }],
      },
    },
    {
      id: '2.3',
      titulo: 'Oxigênio e máscaras',
      pergunta: 'Quando a máscara cai, o que ela entrega, e até onde ela protege?',
      conteudo: {
        texto: [
          "O oxigênio de bordo não é qualquer oxigênio: é o **oxigênio respiratório de aviação**, com pureza definida por norma, guardado em cilindros a **1.800 a 2.200 psi**. Perto dele, **óleo, graxa e cigarro são proibidos**: o risco de fogo é real.",
          "Cada sistema tem um teto. No **fluxo contínuo**, o oxigênio sai sem parar e se mistura ao ar, com uma bolsa reservatória na máscara: é certificado até 41.000 ft, mas exige muita atenção acima de **25.000 ft**. Na **demanda diluidora**, o oxigênio flui só na inspiração, misturado ou a 100%, e é seguro até **40.000 ft**, desde que a máscara vede bem: **barba e bigode atrapalham**. Acima disso, só a **pressão de demanda** (Veja M1V2 - IV).",
          "A máscara dos pilotos pode entregar mais oxigênio que a dos passageiros; por isso, cada um usa a sua. Em voo não pressurizado, o oxigênio é **recomendado a partir de 10.000 ft de dia e acima de 5.000 ft à noite**.",
          "As regras da FAA escalonam o uso. Entre **12.500 e 14.000 ft** de cabine, a tripulação usa oxigênio se ficar mais de 30 minutos; acima de **14.000 ft**, o tempo todo; acima de **15.000 ft**, **todos a bordo** recebem oxigênio. Em aviões pressurizados, acima do **FL250** deve haver ao menos **10 minutos de oxigênio por ocupante** para a descida de emergência; acima do **FL350**, um piloto voa de máscara, salvo quando dois pilotos têm máscaras de colocação rápida, vestidas com uma mão em até 5 segundos, até o FL410.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, midia: 'sistemas-oxigenio' },
          {
            paragrafo: 4,
            tabela: {
              titulo: 'Quando o oxigênio é obrigatório (14 CFR 91.211)',
              colunas: ['Altitude de cabine', 'Quem usa', 'Por quanto tempo'],
              linhas: [
                ['12.500 a 14.000 ft', 'Tripulação mínima', 'Acima de 30 minutos nessa faixa'],
                ['Acima de 14.000 ft', 'Tripulação mínima', 'O tempo todo'],
                ['Acima de 15.000 ft', 'Todos os ocupantes recebem oxigênio', 'O tempo todo'],
              ],
            },
          },
        ],
      },
    },
    {
      id: '2.4',
      titulo: 'Pressão positiva',
      pergunta: 'Acima de 40.000 ft, por que respirar oxigênio puro já não basta?',
      conteudo: {
        texto: [
          "Oxigênio a 100% parece a solução definitiva, mas a física cobra seu preço. A **40.000 ft**, a pressão do ar é tão baixa que, mesmo puro e já umidificado, o oxigênio inspirado fica perto de **93 mmHg**, menos do que o **ar comum entrega ao nível do mar (149 mmHg)**.",
          "A saída é empurrar o oxigênio para dentro. O **regulador de pressão de demanda** entrega oxigênio na inspiração e mantém uma **pressão positiva na máscara**. É o sistema seguro **acima de 40.000 ft**.",
          "A pressão positiva tem custo: **respirar sob pressão positiva por muito tempo pode causar hipóxia estagnante** (Veja M2V1 - II). Por isso ela é uma proteção para altitudes extremas, não um modo de respirar confortável.",
          "Mais acima, perto da **linha de Armstrong** (Veja M1V1 - I), a proteção deixa de ser só respiratória e passa a envolver o corpo inteiro, com trajes pressurizados (Veja M3V12).",
        ].join('\n\n'),
        recursos: [{ paragrafo: 1, midia: 'oxigenio-100' }],
      },
    },
  ],
  teste: [
    {
      topico: '2.1',
      pergunta: 'Um avião voa a 38.000 ft com a cabine pressurizada. Por que ainda há oxigênio suplementar a bordo?',
      opcoes: [
        'Porque a cabine pressurizada tem menos oxigênio que o ar externo.',
        'Porque uma falha ou descompressão é sempre possível.',
        'Porque a pressurização só funciona acima de 40.000 ft.',
        'Porque o oxigênio resfria a cabine.',
      ],
      correta: 1,
      explicacao: 'A pressurização mantém a cabine numa altitude menor, mas pode falhar; o oxigênio suplementar é a proteção para esse momento.',
    },
    {
      topico: '2.2',
      pergunta: 'Qual é o limite de altitude de cabine em operação normal para aviões de transporte?',
      opcoes: ['Até 2.000 ft', 'Até 8.000 ft', 'Até 15.000 ft', 'Igual à altitude de voo'],
      correta: 1,
      explicacao: 'A regra de certificação (14 CFR 25.841) limita a cabine a 8.000 ft em condições normais de operação.',
    },
    {
      topico: '2.3',
      pergunta: 'Um piloto de barba usa máscara de demanda diluidora a 38.000 ft. Qual é o risco?',
      opcoes: [
        'Nenhum: a demanda diluidora funciona sem vedação.',
        'A barba pode impedir a vedação da máscara e reduzir o oxigênio recebido.',
        'A barba aumenta a pressão positiva na máscara.',
        'O oxigênio a 100% queima a barba.',
      ],
      correta: 1,
      explicacao: 'Sistemas de demanda dependem de boa vedação; barba e bigode atrapalham o ajuste da máscara.',
    },
    {
      topico: '2.4',
      pergunta: 'Por que acima de 40.000 ft é preciso pressão positiva, mesmo com oxigênio a 100%?',
      opcoes: [
        'Porque o oxigênio a 100% é tóxico nessa altitude.',
        'Porque a pressão é tão baixa que o oxigênio puro entra com menos força do que o ar ao nível do mar.',
        'Porque a máscara congela.',
        'Porque a cabine fica sem nitrogênio.',
      ],
      correta: 1,
      explicacao: 'A 40.000 ft o oxigênio puro inspirado fica perto de 93 mmHg, abaixo dos 149 mmHg do ar ao nível do mar; a pressão positiva compensa essa diferença.',
    },
  ],
};
