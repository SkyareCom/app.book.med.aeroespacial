// Missão 2 (Sistemas) · Voo 1 — Respiração e hipóxia (o número do voo é definido em secoes.ts).
// Conteúdo reorganizado em narrativa técnica contínua, com conceitos encadeados e destaques.
// Valores de tempo de consciência útil: FAA Advisory Circular 61-107 (tabela de TUC).
// Padrão de mídias (27/10/2026): recursos posicionados por parágrafo; tabelas-resumo montadas a partir do próprio texto;
// animações esquemáticas (cascata do oxigênio, hiperventilação). Fotos e vídeo do autor (pessoas fictícias): topicos/m2v1-*.jpg; m2v1-5-oxigenio é quadro do vídeo enviado em 28/10/2026.

import type { Capitulo } from '../tipos';

export const hipoxia: Capitulo = {
  numero: 3,
  titulo: 'Respiração e hipóxia',
  tempoLeituraMin: 25,
  topicos: [
    {
      id: '3.1',
      titulo: 'Transporte de oxigênio',
      pergunta: 'O que acontece com o oxigênio do ar até chegar ao cérebro?',
      conteudo: {
        texto: [
          "Respirar é só o começo. Para chegar ao cérebro, o oxigênio percorre quatro etapas: **ar, alvéolo, sangue e tecido**. Em altitude, o ar continua com cerca de 21% de oxigênio, mas sua **pressão parcial** cai (Veja M1V1 - II), e o empurrão que leva o gás para dentro do corpo enfraquece.",
          "Nos **alvéolos**, pequenos sacos no fim das vias aéreas, o oxigênio atravessa a **membrana alvéolo-capilar** e entra no sangue. Ali, a **hemoglobina** das hemácias o carrega até os tecidos, e a circulação precisa levá-lo até onde ele é usado.",
          "Ao nível do mar, a **pressão alveolar de oxigênio** fica perto de **100 mmHg**. A 8.000 ft (2.400 m), cai para **65 a 70 mmHg**, e a saturação de pessoas saudáveis costuma ficar entre **90% e 93%**, conforme a resposta da respiração.",
          "A **curva de dissociação da oxi-hemoglobina** explica o perigo: no início, a saturação resiste; depois de certo ponto, cada nova queda de pressão derruba a saturação cada vez mais rápido. Altitude, tempo de exposição, respiração e doenças mudam essa resposta. Descobrir em qual das quatro etapas o oxigênio falhou é o primeiro passo para corrigir.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, midia: 'animacao-cascata' },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-1-alveolos.jpg'), legenda: 'Nos alvéolos, cachos de pequenos sacos envolvidos por capilares, o oxigênio passa do ar para o sangue.' } },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m2v1-1-oximetro.jpg'), legenda: 'O oxímetro de dedo mostra a saturação: em cruzeiro, um pouco abaixo da do solo em pessoas saudáveis.' } },
          { paragrafo: 4, midia: 'simulador-o2' },
        ],
      },
    },
    {
      id: '3.2',
      titulo: 'Tipos de hipóxia',
      pergunta: 'Falta de oxigênio é sempre por causa da altitude?',
      conteudo: {
        texto: [
          "**Hipóxia** é a falta de oxigênio nos tecidos, por oferta ou por uso insuficiente. A altitude é só uma das causas: a falha pode acontecer em qualquer etapa entre o ar e a célula. Por isso a medicina aeroespacial a divide em **quatro mecanismos**, que podem se somar.",
          "Na **hipóxia hipóxica**, falta pressão de oxigênio no pulmão: é a hipóxia clássica da altitude sem proteção. Na **hipóxia hipêmica**, o sangue perde a capacidade de carregar oxigênio, como na **anemia** ou na **intoxicação por monóxido de carbono**, que se liga fortemente à hemoglobina e ainda dificulta a entrega do oxigênio aos tecidos.",
          "Na **hipóxia estagnante**, o sangue não chega com o fluxo necessário, como nos distúrbios circulatórios ou nas acelerações que reduzem o sangue no cérebro (Veja M1V7). Na **hipóxia histotóxica**, o oxigênio chega, mas a célula não consegue usá-lo; o exemplo clássico é o **cianeto**.",
          "Os mecanismos se somam. Um piloto anêmico, ou exposto a monóxido de carbono, tem menos reserva para enfrentar a altitude. Em aviões a pistão, **vazamentos do escapamento** são um risco real, mesmo perto do solo.",
          "Reconhecer o mecanismo orienta a resposta. O oxigênio suplementar ajuda em muitas situações, mas **não substitui corrigir a causa**: pressurização falha, cabine contaminada, anemia, problema circulatório ou exposição tóxica.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-2-fumaca.jpg'), legenda: 'Fumaça na cabine: monóxido de carbono e outros tóxicos podem roubar o oxigênio do sangue e das células.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Os quatro mecanismos da hipóxia',
              colunas: ['Tipo', 'Onde falha', 'Exemplos'],
              linhas: [
                ['Hipóxica', 'Pressão de oxigênio no pulmão', 'Altitude sem proteção'],
                ['Hipêmica', 'Transporte pelo sangue', 'Anemia, monóxido de carbono'],
                ['Estagnante', 'Fluxo de sangue', 'Distúrbios circulatórios, acelerações'],
                ['Histotóxica', 'Uso pela célula', 'Cianeto'],
              ],
            },
          },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v1-2-escapamento.jpg'), legenda: 'Inverno num monomotor: gás do escapamento entrando pela ventilação do aquecedor causa sonolência e dor de cabeça.' } },
          { paragrafo: 5, midia: 'classificar-hipoxia' },
        ],
      },
    },
    {
      id: '3.3',
      titulo: 'Tempo de consciência útil',
      pergunta: 'Quanto tempo uma pessoa continua lúcida sem oxigênio a 35.000 ft?',
      conteudo: {
        texto: [
          "O **tempo de consciência útil (TCU)** é o tempo que uma pessoa ainda tem, depois que o oxigênio cai, para perceber o problema e agir certo. **Não é o tempo até desmaiar**: o julgamento e a coordenação falham antes.",
          "Sem oxigênio, numa exposição súbita, o TCU encolhe com a altitude: cerca de **20 a 30 minutos a 18.000 ft**, **3 a 5 minutos a 25.000 ft**, **1 a 2 minutos a 30.000 ft**, **30 segundos a 1 minuto a 35.000 ft** e **15 a 20 segundos a 40.000 ft**. São estimativas, não prazos garantidos.",
          "Esforço físico, fadiga, doenças e diferenças individuais encurtam esse tempo. **Numa descompressão rápida, o TCU pode cair para cerca da metade.**",
          "Por isso a regra é imediata: diante de perda de pressurização, **coloque e ajuste a própria máscara de oxigênio antes de qualquer outra tarefa**, depois siga os procedimentos da aeronave. Cada segundo de dúvida consome o tempo disponível.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-3-cronometro.jpg'), legenda: 'Quando o alarme acende, o relógio passa a correr contra o piloto: o tempo útil é medido em segundos ou minutos.' } },
          { paragrafo: 2, midia: 'grafico-tuc' },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v1-3-mascara-primeiro.jpg'), legenda: 'Alarme de cabine: a máscara de colocação rápida vem antes de qualquer outra tarefa.' } },
        ],
      },
    },
    {
      id: '3.4',
      titulo: 'Sinais e sintomas',
      pergunta: 'Como perceber que está faltando oxigênio?',
      conteudo: {
        texto: [
          "A hipóxia é traiçoeira: **começa sem dor e sem falta de ar clara**. O julgamento, a atenção e a coordenação pioram enquanto a pessoa ainda se sente bem. Essa distância entre o que se sente e o que se consegue fazer é o maior risco a bordo.",
          "Os sintomas variam: **euforia, tontura, calor, formigamento e alterações da visão**. Quem está ao lado pode notar confusão, lentidão, respiração alterada ou lábios azulados, mas **a ausência de cianose não exclui hipóxia**.",
          "A **visão noturna** é das mais sensíveis e pode piorar já em altitudes moderadas. Depois sofrem a memória recente, o raciocínio e os movimentos finos. No treinamento em câmara, cada pessoa aprende a reconhecer o próprio conjunto de sintomas: a **assinatura individual de hipóxia**.",
          "A conduta é a mesma do tempo de consciência útil (Veja M2V1 - III): **ao suspeitar de hipóxia, restabelecer o oxigênio na hora**, sem esperar sinais tardios.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m2v1-4-euforia.jpg'), legenda: 'Na câmara, sem máscara, o aluno sorri e acha que está tudo bem enquanto a escrita desanda: a armadilha da hipóxia.' } },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-4-cianose.jpg'), legenda: 'Lábios e unhas azulados denunciam pouco oxigênio no sangue, mas a ausência deles não exclui a hipóxia.' } },
          { paragrafo: 3, midia: 'simulador-visao' },
        ],
      },
    },
    {
      id: '3.5',
      titulo: 'Hiperventilação',
      pergunta: 'Respirar demais também pode fazer mal?',
      conteudo: {
        texto: [
          "**Hiperventilar** é respirar além do necessário e eliminar **gás carbônico** demais. Ansiedade, dor, estresse e a própria altitude podem provocá-lo. A tontura e o formigamento lembram a hipóxia, mas o mecanismo é outro.",
          "A queda do gás carbônico no sangue, a **hipocapnia**, contrai os vasos do cérebro e reduz o fluxo de sangue nele, além de causar **alcalose respiratória**. Nos casos intensos, o cálcio ionizado cai e surgem **formigamento em volta da boca e nas mãos, espasmos musculares** e mal-estar.",
          "No voo, **hipóxia e hiperventilação podem coexistir ou ser confundidas**. Tratar hipóxia como ansiedade atrasa uma intervenção vital. Por isso, sintoma inexplicado em altitude pede primeiro a checagem do oxigênio e da pressurização.",
          "A ordem é fixa: **oxigênio adequado primeiro, sistema verificado e altitude corrigida, se preciso**. Só depois de excluir a hipóxia vale orientar a respiração mais lenta. **Respirar em saco de papel não é seguro** diante dessa dúvida.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m2v1-5-maos.jpg'), legenda: 'Mãos tensas e dedos em leve espasmo: o formigamento da hiperventilação lembra o da hipóxia.' } },
          { paragrafo: 2, midia: 'animacao-hiperventilacao' },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Hipóxia ou hiperventilação?',
              colunas: ['', 'Hipóxia', 'Hiperventilação'],
              linhas: [
                ['Causa', 'Falta de oxigênio nos tecidos', 'Gás carbônico eliminado demais'],
                ['Sintomas em comum', 'Tontura e formigamento', 'Tontura e formigamento'],
                ['Sinais próprios', 'Julgamento e visão pioram sem alarde', 'Formigamento em volta da boca, espasmos'],
                ['Primeira conduta', 'Oxigênio adequado e checar o sistema', 'Só depois de excluir a hipóxia: respirar mais devagar'],
              ],
            },
          },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m2v1-5-oxigenio.jpg'), legenda: 'Na dúvida entre ansiedade e hipóxia, primeiro o oxigênio; só depois se orienta a respiração mais lenta.' } },
        ],
      },
    },
  ],
  teste: [
    {
      pergunta: 'Por que há menos oxigênio disponível em altitude?',
      opcoes: [
        'A porcentagem de oxigênio no ar diminui',
        'A pressão parcial de oxigênio diminui',
        'O nitrogênio ocupa o lugar do oxigênio',
        'A temperatura baixa destrói o oxigênio',
      ],
      correta: 1,
      explicacao: 'O ar continua com cerca de 21% de oxigênio; o que cai é a pressão, e com ela a pressão parcial de oxigênio.',
      topico: '3.1',
    },
    {
      pergunta: 'Intoxicação por monóxido de carbono causa qual tipo de hipóxia?',
      opcoes: ['Hipóxica', 'Hipêmica', 'Estagnante', 'Histotóxica'],
      correta: 1,
      explicacao: 'O monóxido de carbono ocupa a hemoglobina, e o sangue passa a carregar menos oxigênio: hipóxia hipêmica.',
      topico: '3.2',
    },
    {
      pergunta: 'Qual é o tempo de consciência útil aproximado a 35.000 ft?',
      opcoes: ['De 5 a 10 minutos', 'De 3 a 5 minutos', 'De 30 segundos a 1 minuto', 'Menos de 5 segundos'],
      correta: 2,
      explicacao: 'A 35.000 ft, o tempo de consciência útil é de cerca de 30 segundos a 1 minuto.',
      topico: '3.3',
    },
    {
      pergunta: 'O que acontece com o tempo de consciência útil em uma descompressão rápida?',
      opcoes: ['Aumenta', 'Não muda', 'Pode cair para cerca da metade', 'Passa a depender só da temperatura'],
      correta: 2,
      explicacao: 'Na descompressão rápida, o tempo de consciência útil pode ser reduzido a cerca da metade.',
      topico: '3.3',
    },
    {
      pergunta: 'Qual é o principal perigo da hipóxia para quem está voando?',
      opcoes: [
        'Causar dor intensa imediata',
        'Tirar a capacidade de perceber o próprio problema',
        'Provocar sempre desmaio súbito',
        'Afetar apenas a visão',
      ],
      correta: 1,
      explicacao: 'A hipóxia altera o julgamento antes dos sinais visíveis, e a pessoa pode não perceber que está em perigo.',
      topico: '3.4',
    },
    {
      pergunta: 'Em voo, um tripulante sente tontura e formigamento. Qual é a primeira conduta?',
      opcoes: [
        'Respirar dentro de um saco de papel',
        'Esperar os sintomas passarem',
        'Oxigênio a 100% e checar o sistema',
        'Aumentar a altitude para economizar combustível',
      ],
      correta: 2,
      explicacao: 'Como hipóxia e hiperventilação se confundem, trata-se primeiro como hipóxia: oxigênio a 100%.',
      topico: '3.5',
    },
  ],
};
