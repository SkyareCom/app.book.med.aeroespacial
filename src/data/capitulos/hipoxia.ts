// Missão 2 (Sistemas) · Voo 1 — Respiração e hipóxia (o número do voo é definido em secoes.ts).
// Conteúdo reorganizado em narrativa técnica contínua, com conceitos encadeados e destaques.
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
        texto: [
          "A oxigenação começa nos pulmões, mas depende de toda a circulação. O ar contém cerca de **20,95% de oxigênio** na faixa habitual de voo. Quando a altitude aumenta, a pressão atmosférica cai e, com ela, a pressão parcial desse gás. É essa redução de pressão, e não uma mudança importante da porcentagem de oxigênio, que limita sua entrada no organismo.",
          "Na inspiração, o oxigênio alcança os **alvéolos**, estruturas pulmonares onde ocorre a troca gasosa. Dali, atravessa a membrana alvéolo-capilar e entra no sangue. A **hemoglobina**, presente nas hemácias, transporta grande parte desse oxigênio até os tecidos, que dependem também de uma circulação adequada para utilizá-lo.",
          "A pressão inspirada de oxigênio pode ser estimada por **FiO₂ × (PB − 47 mmHg)**, descontando a pressão do vapor de água nas vias respiratórias a 37 °C. Ao nível do mar, a pressão alveolar de oxigênio é aproximadamente 100 mmHg em condições usuais. A 8.000 ft (2.400 m), pode cair para cerca de 65 a 70 mmHg, com saturação frequentemente próxima de 90% a 93% em pessoas saudáveis, conforme a resposta ventilatória.",
          "A **curva de dissociação da oxi-hemoglobina** explica por que uma queda adicional na pressão de oxigênio pode provocar redução progressivamente mais acentuada da saturação. A resposta depende de altitude, duração da exposição, ventilação e condições clínicas. A compreensão dessa sequência — ar, alvéolo, sangue e tecido — permite identificar em qual etapa ocorre a falha de oxigenação.",
        ].join('\n\n'),
      },
    },
    {
      id: '3.2',
      midias: ['classificar-hipoxia'],
      titulo: 'Tipos de hipóxia',
      pergunta: 'Falta de oxigênio é sempre por causa da altitude?',
      conteudo: {
        texto: [
          "**Hipóxia** significa oferta ou utilização insuficiente de oxigênio nos tecidos. Nem toda hipóxia é causada pela altitude: ela pode surgir em qualquer etapa entre a atmosfera e a célula. Na medicina aeroespacial, a classificação em quatro mecanismos ajuda a compreender causas diferentes que podem coexistir.",
          "Na **hipóxia hipóxica**, a pressão de oxigênio disponível para o pulmão é insuficiente. É o mecanismo clássico da exposição a grandes altitudes sem proteção adequada. Na **hipóxia hipêmica**, o sangue perde capacidade de transportar oxigênio, como ocorre em anemias relevantes ou na intoxicação por monóxido de carbono.",
          "A **hipóxia estagnante ou circulatória** resulta de perfusão insuficiente: o sangue não chega aos tecidos com o fluxo necessário. Pode ocorrer em distúrbios circulatórios ou sob acelerações que reduzam a perfusão cerebral. A **hipóxia histotóxica** acontece quando a célula não consegue utilizar o oxigênio adequadamente; a intoxicação por cianeto é um exemplo clássico.",
          "Os mecanismos podem se somar. Um piloto anêmico ou exposto a monóxido de carbono tem menor reserva para tolerar a queda da pressão parcial de oxigênio em altitude. **O monóxido de carbono liga-se fortemente à hemoglobina**, reduz a capacidade de transporte e modifica a liberação de oxigênio aos tecidos. Vazamentos de gases de escapamento em aeronaves a pistão são uma situação operacional que exige atenção, mesmo perto do solo.",
          "A identificação do mecanismo orienta prevenção e resposta. Oxigênio suplementar pode ser necessário em diferentes situações, mas **não substitui o reconhecimento e a correção da causa**: pressurização inadequada, contaminação da cabine, anemia, distúrbio circulatório ou exposição tóxica.",
        ].join('\n\n'),
      },
    },
    {
      id: '3.3',
      midias: ['grafico-tuc'],
      titulo: 'Tempo de consciência útil',
      pergunta: 'Quanto tempo uma pessoa continua lúcida sem oxigênio a 35.000 pés?',
      conteudo: {
        texto: [
          "O **tempo de consciência útil (TCU)** é o intervalo, após uma queda importante da oxigenação, durante o qual uma pessoa ainda consegue perceber o problema e executar ações adequadas. **Não equivale ao tempo até perder completamente a consciência.** Julgamento e coordenação podem se deteriorar antes do desmaio.",
          "Em exposição súbita sem oxigênio suplementar, os valores de referência tornam-se menores com a altitude: cerca de 20 a 30 minutos a 18.000 ft, 3 a 5 minutos a 25.000 ft, 1 a 2 minutos a 30.000 ft, **30 segundos a 1 minuto a 35.000 ft** e 15 a 20 segundos a 40.000 ft. São estimativas, não prazos seguros garantidos.",
          "Esses intervalos dependem da velocidade da despressurização, do esforço, da condição clínica e de características individuais. Exercício, fadiga e doenças podem reduzir a capacidade de agir. **Uma descompressão rápida pode encurtar o TCU de forma importante**, inclusive para aproximadamente metade de certos valores estimados em repouso.",
          "A aplicação operacional é imediata: diante de suspeita de perda de pressurização ou falha de oxigenação, **colocar e assegurar a própria máscara de oxigênio antes de outras tarefas**, verificar o suprimento e executar os procedimentos previstos para a aeronave. A demora em reconhecer os sintomas pode consumir todo o tempo disponível para uma resposta segura.",
        ].join('\n\n'),
      },
    },
    {
      id: '3.4',
      midias: ['simulador-visao'],
      titulo: 'Sinais e sintomas',
      pergunta: 'Como perceber que está faltando oxigênio?',
      conteudo: {
        texto: [
          "A **hipóxia pode começar sem dor e sem sensação clara de falta de ar**. Alterações do julgamento, da atenção e da coordenação podem surgir enquanto a pessoa ainda acredita estar em boas condições. Esse descompasso entre desempenho real e percepção pessoal é um dos riscos mais importantes no voo.",
          "Os sintomas podem incluir euforia, tontura, calor, formigamento e alterações visuais. Outras pessoas podem perceber confusão, dificuldade para executar tarefas, respiração alterada ou cianose, quando presente. **A ausência de cianose não exclui hipóxia.** A manifestação varia entre indivíduos e com a gravidade da exposição.",
          "A visão noturna é particularmente sensível à redução da disponibilidade de oxigênio e pode apresentar prejuízo mesmo em altitudes moderadas. Memória recente, raciocínio e movimentos finos podem piorar progressivamente. Durante treinamento fisiológico supervisionado, algumas pessoas reconhecem um conjunto relativamente característico de sintomas, chamado de **assinatura individual de hipóxia**.",
          "Em voo, a prioridade é **reconhecer a possibilidade de hipóxia e restabelecer a oxigenação imediatamente**, utilizando o sistema apropriado e seguindo os procedimentos da aeronave, inclusive descida quando indicada. Não se deve esperar pela confirmação de sinais tardios para agir.",
        ].join('\n\n'),
      },
    },
    {
      id: '3.5',
      titulo: 'Hiperventilação',
      pergunta: 'Respirar demais também pode fazer mal?',
      conteudo: {
        texto: [
          "A **hiperventilação** ocorre quando a ventilação elimina dióxido de carbono além do necessário para o metabolismo naquele momento. Pode surgir por ansiedade, dor, estresse ou por respostas fisiológicas à altitude. Tontura e formigamento podem lembrar sintomas de hipóxia, embora os mecanismos sejam diferentes.",
          "A queda excessiva do dióxido de carbono no sangue é chamada de **hipocapnia**. Ela provoca vasoconstrição cerebral, reduzindo o fluxo de sangue no cérebro, e favorece a alcalose respiratória. Em casos mais intensos, a diminuição do cálcio ionizado contribui para formigamento ao redor da boca e das mãos, espasmos musculares e sensação de mal-estar.",
          "Em ambiente aeronáutico, **hipóxia e hiperventilação podem coexistir ou ser confundidas**. Tratar um quadro potencialmente hipóxico como simples ansiedade atrasa uma intervenção crítica. Por isso, sintomas neurológicos ou respiratórios inexplicados em altitude exigem primeiro avaliação do suprimento de oxigênio e dos sistemas de pressurização.",
          "A conduta inicial segue os procedimentos de segurança da aeronave: **assegurar oxigênio adequado, verificar o sistema e corrigir a exposição à altitude quando necessário**. Somente depois de excluída a hipóxia é apropriado orientar a redução controlada da frequência respiratória. Respirar em saco de papel não é uma estratégia segura diante dessa incerteza.",
        ].join('\n\n'),
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
