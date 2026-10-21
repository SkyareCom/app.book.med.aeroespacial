// Fisiologia · Capítulo 3 — Respiração e hipóxia.
// Capítulo-modelo: mostra o padrão de redação dos três níveis de leitura e do teste.
// Valores de tempo de consciência útil: FAA Advisory Circular 61-107 (tabela de TUC).

import type { Capitulo } from '../tipos';

export const hipoxia: Capitulo = {
  numero: 3,
  titulo: 'Respiração e hipóxia',
  resumo: 'A falta de oxigênio é silenciosa: o cérebro sente antes de você perceber.',
  tempoLeituraMin: 25,
  objetivos: [
    'Explicar como o oxigênio chega às células',
    'Diferenciar os quatro tipos de hipóxia',
    'Conhecer o tempo de consciência útil em cada altitude',
    'Reconhecer os sinais de hipóxia e de hiperventilação',
  ],
  topicos: [
    {
      id: '3.1',
      midias: ['simulador-o2'],
      titulo: 'Transporte de oxigênio',
      pergunta: 'O que acontece com o oxigênio do ar até chegar ao cérebro?',
      conteudo: {
        essencial:
          'Em altitude, o ar tem a mesma proporção de oxigênio, cerca de 21%, mas a pressão é menor. Com menos pressão, menos oxigênio entra no sangue.',
        explicacao:
          'O oxigênio passa do ar para os alvéolos (pequenos sacos no fim das vias respiratórias), depois para o sangue, onde a hemoglobina (proteína que carrega oxigênio) o leva até as células. O que empurra o oxigênio nessa passagem é a pressão parcial (a parte da pressão total que cabe ao oxigênio). Quanto mais alto, menor a pressão do ar e menor esse "empurrão".',
        clinico:
          'A pressão parcial de O₂ inspirada é FiO₂ × (pressão barométrica − 47 mmHg), descontando o vapor d’água a 37 °C. Ao nível do mar a PAO₂ é de cerca de 100 mmHg. A 8.000 ft (cerca de 2.400 m) cai para cerca de 65–70 mmHg, ainda na parte plana da curva de dissociação, com saturação perto de 90–93%. Acima de 10.000 ft a curva entra na porção íngreme e a saturação cai rapidamente.',
      },
    },
    {
      id: '3.2',
      midias: ['classificar-hipoxia'],
      titulo: 'Tipos de hipóxia',
      pergunta: 'Falta de oxigênio é sempre por causa da altitude?',
      conteudo: {
        essencial:
          'Não. O oxigênio pode faltar porque o ar está rarefeito, porque o sangue não consegue carregá-lo, porque a circulação está lenta ou porque as células não conseguem usá-lo.',
        explicacao:
          'A hipóxia hipóxica vem do ar com pouca pressão de oxigênio, típica da altitude. A hipêmica (ou anêmica) acontece quando o sangue carrega pouco oxigênio, como na anemia ou na intoxicação por monóxido de carbono. A estagnante (ou circulatória) ocorre quando o sangue circula devagar, por exemplo sob forças G ou no frio intenso. A histotóxica acontece quando as células não conseguem usar o oxigênio, como na intoxicação por cianeto ou pelo álcool. Os tipos podem se somar no mesmo tripulante.',
        clinico:
          'Na prática, os tipos se somam: um piloto fumante (carboxi-hemoglobina elevada) e anêmico tem tolerância menor à altitude. O monóxido de carbono tem afinidade pela hemoglobina cerca de 200 a 250 vezes maior que a do oxigênio e desvia a curva de dissociação para a esquerda. Em vazamentos de escapamento em aeronaves a pistão, a hipóxia hipêmica pode ocorrer em baixa altitude.',
      },
    },
    {
      id: '3.3',
      midias: ['grafico-tuc'],
      titulo: 'Tempo de consciência útil',
      pergunta: 'Quanto tempo uma pessoa continua lúcida sem oxigênio a 35.000 pés?',
      conteudo: {
        essencial:
          'Tempo de consciência útil é o intervalo em que você ainda consegue agir corretamente depois de perder o oxigênio. A 35.000 pés, ele dura de 30 segundos a 1 minuto.',
        explicacao:
          'Não é o tempo até desmaiar, e sim o tempo em que ainda dá para colocar a máscara, avisar a tripulação e iniciar a descida. Quanto mais alto, menor esse tempo: cerca de 20 a 30 minutos a 18.000 pés, de 3 a 5 minutos a 25.000 pés, de 1 a 2 minutos a 30.000 pés e de 15 a 20 segundos a 40.000 pés.',
        clinico:
          'Os valores são médias de tripulantes em repouso. Exercício, fadiga, fumo, doença e descompressão rápida encurtam o tempo; a descompressão rápida pode reduzi-lo a cerca da metade. Por isso os procedimentos determinam colocar o oxigênio imediatamente, antes de qualquer diagnóstico da pane.',
        alerta: 'Em uma despressurização, coloque sua máscara antes de ajudar qualquer outra pessoa.',
      },
    },
    {
      id: '3.4',
      midias: ['simulador-visao'],
      titulo: 'Sinais e sintomas',
      pergunta: 'Como perceber que está faltando oxigênio?',
      conteudo: {
        essencial:
          'A hipóxia costuma começar sem dor: euforia, formigamento, visão turva e dificuldade de pensar. O perigo é que ela tira justamente a capacidade de perceber o problema.',
        explicacao:
          'Os sintomas que a própria pessoa sente incluem calor, tontura, formigamento, visão embaçada e falsa sensação de bem-estar. Os sinais que outros podem ver são lábios e unhas arroxeados (cianose), respiração acelerada, confusão e falta de coordenação. Cada pessoa tem uma combinação própria e repetível de sintomas, e o treinamento em câmara ensina a reconhecê-la.',
        clinico:
          'A visão noturna é afetada já a partir de cerca de 5.000 ft. Julgamento, memória recente e coordenação fina se degradam antes dos sinais objetivos. O treinamento em câmara hipobárica ou com dispositivos de respiração com mistura reduzida de oxigênio permite identificar a "assinatura" individual. Conduta: oxigênio a 100%, verificar o sistema e descer para altitude segura.',
      },
    },
    {
      id: '3.5',
      titulo: 'Hiperventilação',
      pergunta: 'Respirar demais também pode fazer mal?',
      conteudo: {
        essencial:
          'Sim. Respirar rápido demais, por ansiedade ou estresse, elimina gás carbônico em excesso e causa tontura e formigamento, sintomas parecidos com os da hipóxia.',
        explicacao:
          'O gás carbônico ajuda a regular o fluxo de sangue para o cérebro. Quando ele cai demais (hipocapnia), os vasos do cérebro se contraem e surgem tontura, formigamento nas mãos e ao redor da boca e, em casos intensos, espasmos musculares.',
        clinico:
          'A hipocapnia leva à alcalose respiratória, com vasoconstrição cerebral e redução do cálcio ionizado, o que explica parestesias e tetania. Como os quadros se confundem, a regra em voo é tratar primeiro como hipóxia: oxigênio a 100% e checagem do sistema. Só depois, descartada a hipóxia, controlar o ritmo respiratório.',
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
      pergunta: 'Qual é o tempo de consciência útil aproximado a 35.000 pés?',
      opcoes: ['De 5 a 10 minutos', 'De 3 a 5 minutos', 'De 30 segundos a 1 minuto', 'Menos de 5 segundos'],
      correta: 2,
      explicacao: 'A 35.000 pés, o tempo de consciência útil é de cerca de 30 segundos a 1 minuto.',
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
