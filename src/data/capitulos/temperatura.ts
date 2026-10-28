// Missão 1 (Conceitos) · Voo 4 — Temperatura e sobrevivência.
// Prosa única e progressiva, com destaques; cada tema num só lugar (referências cruzadas "Veja M_V_").
//
// REGISTRO DE REVISÃO (não aparece no app)
// M1V4 - I · Calor
// - Estresse térmico 37,5–37,8 °C (queda de desempenho, coordenação, decisão, atenção, visão e cautela); exaustão
//   38,3–40,6 °C (fadiga, náusea ou vômito, tontura, cãibras, respiração rápida, perda de consciência); insolação acima
//   de 40,6 °C com falha do controle térmico (confusão, desorientação, comportamento estranho, coma); corpo com cerca
//   de dois terços de água; sede por volta de 2% do peso perdido; fadiga, náusea e instabilidade emocional por volta
//   de 5%; tabela de litros perdidos (1,5 a 12 L); beber antes da sede, cerca de 1,9 L por dia como base; urina clara;
//   limitar álcool e cafeína; aclimatação de 1 a 2 semanas: Flight Safety Foundation, Human Factors & Aviation
//   Medicine, vol. 48, n. 4, jul.–ago. 2001, "Dehydration Presents Unique Risks for Pilots".
// - Na insolação o suor cessa e a pele fica quente e seca: FAA CAMI, Basic Survival for Aviation (OK-06-033), p. 35.
// - No simulador, a faixa entre 37,8 e 38,3 °C aparece junto do estresse térmico (contínuo didático).
// M1V4 - II · Hipotermia
// - Definição (temperatura central de 35 °C ou menos); atividade cerebral cai por volta de 34 °C; tremor diminui por
//   volta de 32 °C e para por volta de 30 °C; abaixo de 30 °C, bradicardia e risco de arritmia; estadiamento pelos
//   sinais (estresse pelo frio, leve 35–32, moderada 32–28, grave abaixo de 28); conduta de campo (isolamento,
//   barreira de vapor, cabeça, pescoço e chão; roupa molhada até ambiente aquecido; manuseio delicado; leve: sentado
//   ou deitado por 30 min, comida ou bebida quente e calórica se alerta, calor em axilas, tórax e costas; moderada e
//   grave: horizontal, sem comida, evacuação cuidadosa); afterdrop; colapso no resgate da água fria; sinais de morte
//   não valem no hipotérmico: Wilderness Medical Society, resumo em Am Fam Physician 2020;102(9):571.
// - Princípio 1-10-1 (choque frio em 1 min, cerca de 10 min de movimento útil, hipotermia e inconsciência por volta
//   de 1 h; hipotermia leva ao menos meia hora; a maioria morre logo no início): G. Giesbrecht, McGill Office for
//   Science and Society, "Professor Popsicle's physiological proof".
// M1V4 - III · Sobrevivência
// - Primeiros 5 minutos (sair, contar ocupantes; respiração, sangramento e ferimentos, nessa ordem); ELT e PLB de
//   406 MHz; plano de voo; kit (canivete ou ferramenta, lanterna, corda, sinalizador, bússola, primeiros socorros,
//   fósforos à prova d'água, repelente, luvas, água e comida); roupa em camadas; curso de 1 dia do CAMI; não entrar
//   em pânico e ter vontade de sobreviver: FAA, General Aviation Survival (Safety Enhancement Topic, GAJSC).
// - Regra dos três (ar 3 min, abrigo 3 h, descanso 30 h, água 3 dias, comida 30 dias), p. 7; espelho visto a mais de
//   25 milhas (cerca de 40 km), p. 30; três fogueiras como sinal de socorro, p. 31; sinais terra-ar (I, II, X, F, K, LL)
//   e tamanho de 18 × 3 pés (cerca de 5,5 × 0,9 m), p. 32; "racione o suor, não a água", sombra até cerca de 22 °C
//   mais fresca, trabalhar à noite, roupas claras, folgadas e em camadas, p. 36; ficar perto da aeronave, p. 130:
//   FAA CAMI, Basic Survival for Aviation (OK-06-033).
// - Ernsting's (5ª ed.) e Fundamentals (5ª ed.), capítulos de estresse térmico e sobrevivência [confirmar capítulo e página].
// Fotos premium geradas por IA pelo autor (pessoas fictícias): topicos/m1v4-*.jpg. Pendente: foto da cabine ao sol (Calor, parágrafo 1).

import type { Capitulo } from '../tipos';

export const temperatura: Capitulo = {
  numero: 4,
  titulo: 'Temperatura e sobrevivência',
  tempoLeituraMin: 18,
  topicos: [
    {
      id: '4.1',
      titulo: 'Calor',
      pergunta: 'Até onde o corpo aguenta o calor na cabine?',
      conteudo: {
        texto: [
          "O corpo trabalha numa faixa estreita de temperatura. No calor, ele se defende **suando**: a evaporação do suor leva o calor embora. No calor úmido, esse resfriamento falha (Veja M1V1 - IV), e o problema cresce numa cabine parada ao sol, num macacão de voo ou durante o esforço no solo.",
          "O calor age em degraus. Com a temperatura central entre **37,5 e 37,8 °C**, vem o **estresse térmico**: caem a coordenação, a atenção, a visão, a decisão e a cautela, justamente o que o voo exige. Entre **38,3 e 40,6 °C**, a **exaustão pelo calor** traz fadiga, náusea, tontura, cãibras, respiração rápida e até desmaio. **Acima de 40,6 °C**, o controle da temperatura falha: é a **insolação**, com confusão, comportamento estranho e coma. O suor para, e a pele fica **quente e seca**.",
          "O calor anda junto com a **desidratação**. Cerca de **dois terços do corpo são água**. A **sede só aparece quando já se perdeu cerca de 2% do peso**; por volta de 5%, chegam fadiga, náusea e instabilidade emocional. Com mais perda, aparecem dor de cabeça, confusão, delírio e falência dos rins.",
          "A prevenção é simples e diária: **beber antes da sede**, cerca de **1,9 litro por dia** como base, mais no calor e no esforço, e **manter a urina clara**. Álcool e cafeína aumentam a perda de água. Quem muda para um clima quente leva **uma a duas semanas para se aclimatar**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, midia: 'termometro-corpo' },
          { paragrafo: 3, midia: 'desidratacao' },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m1v4-hidratacao.jpg'), legenda: 'Beber antes da sede, ainda no solo: a hidratação começa antes da decolagem.' } },
        ],
      },
    },
    {
      id: '4.2',
      titulo: 'Hipotermia',
      pergunta: 'O que o frio faz com o corpo, e o que fazer no resgate?',
      conteudo: {
        texto: [
          "**Hipotermia** é a temperatura central de **35 °C ou menos**. Por volta de **34 °C**, o cérebro já funciona mais devagar. O tremor, a principal defesa, **diminui por volta de 32 °C e para perto de 30 °C**. Abaixo disso, o coração fica lento e o risco de **arritmia** dispara.",
          "No campo, o termômetro pouco ajuda: **os sinais definem a gravidade**. Na **leve**, a pessoa treme e está alerta, mas se movimenta mal. Na **moderada**, o tremor diminui ou some. Na **grave**, não há movimento, nem tremor, nem consciência. Quem está com frio, tremendo e sem conseguir cuidar de si já é suspeito.",
          "A **água fria** é o cenário mais traiçoeiro, e a regra é **1-10-1**. No **primeiro minuto**, o **choque frio** provoca respiração ofegante: o perigo é **aspirar água**, por isso controlar a respiração vem antes de tudo. Depois, há cerca de **10 minutos de movimentos úteis** antes de os músculos falharem. A hipotermia leva **pelo menos meia hora** e, por volta de **1 hora**, à inconsciência. **A maioria das mortes acontece no começo, não pela hipotermia.**",
          "O resgate pede delicadeza. **Isole do chão, proteja cabeça e pescoço** e use uma **barreira contra vento e umidade**; a roupa molhada só sai num ambiente aquecido. Na forma leve, a pessoa fica sentada ou deitada por 30 minutos, recebe **bebida quente e calórica** se estiver alerta e **calor nas axilas, no tórax e nas costas**. Nas formas moderada e grave, **sempre deitada**, sem comida, com evacuação cuidadosa.",
          "Aquecer braços e pernas primeiro, ou mover demais o corpo, devolve sangue frio ao centro e baixa ainda mais a temperatura: é o **afterdrop**, que pode desencadear arritmia. Pela mesma razão, a vítima retirada da água fria pode **colapsar no próprio resgate**. E os sinais habituais de morte não valem aqui: **pupilas fixas e rigidez podem existir em quem ainda pode ser reanimado**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v4-agua-gelada.jpg'), legenda: 'O primeiro minuto na água gelada: o choque frio força a respiração, e controlá-la evita aspirar água.' } },
          { paragrafo: 3, midia: 'agua-fria' },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m1v4-resgate-frio.jpg'), legenda: 'No resgate, a vítima fica deitada, isolada do chão e envolta numa barreira contra vento e umidade, com cabeça e pescoço protegidos.' } },
        ],
      },
    },
    {
      id: '4.3',
      titulo: 'Sobrevivência',
      pergunta: 'Depois de um pouso forçado longe de tudo, o que vem primeiro?',
      conteudo: {
        texto: [
          "Os **primeiros cinco minutos** decidem muito. Saia da aeronave e **conte os ocupantes**. Depois, verifique **respiração, sangramento e ferimentos, nessa ordem**. Em seguida, acione o **ELT** e, se houver, o **localizador pessoal de 406 MHz**, e tente o telefone. Um **plano de voo** registrado faz o resgate começar a procurar quando o avião não chega.",
          "As prioridades seguem a **regra dos três**: sem **ar**, cerca de **3 minutos**; sem **abrigo** no frio ou no calor extremo, cerca de **3 horas**; sem **descanso**, **30 horas**; sem **água**, **3 dias**; sem **comida**, **30 dias**. A ordem mostra o que fazer primeiro, e a comida é a última preocupação.",
          "Em geral, o melhor é **ficar perto da aeronave**: ela é maior e mais fácil de achar do que uma pessoa andando. Para ser visto, um **espelho de sinalização** pode ser avistado a **mais de 40 km** num dia de sol, **três fogueiras** são o sinal internacional de socorro, e **sinais no chão** de cerca de **5,5 por 0,9 metro**, com bom contraste, falam com as aeronaves de busca.",
          "Cada ambiente muda a tática. No **deserto**, a regra é **poupar o suor, não a água**: ficar na sombra, que pode ser cerca de **22 °C mais fresca**, trabalhar à noite e usar **roupas claras, folgadas e em camadas**. No **frio**, as camadas de roupa e o isolamento do chão são o abrigo (Veja M1V4 - II). Na **água**, valem o controle da respiração e o 1-10-1.",
          "Sobrevive quem se prepara. O **kit** cabe num colete: canivete, lanterna com pilhas, corda, sinalizador, bússola, primeiros socorros, fósforos à prova d'água, repelente, luvas, **água e comida**. Roupas adequadas ao terreno sobrevoado, **treinamento de sobrevivência** e, acima de tudo, **não entrar em pânico e manter a vontade de sobreviver**.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 2, midia: 'regra-tres' },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v4-sinal-espelho.jpg'), legenda: 'Perto da aeronave, o espelho de sinalização aponta o sol para a busca; ao fundo, fogueiras de sinalização.' } },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v4-sinal-solo.jpg'), legenda: 'Visto do alto: um X grande e contrastante no chão avisa às aeronaves de busca que o grupo não consegue seguir.' } },
          {
            paragrafo: 3,
            tabela: {
              titulo: 'Sinais terra-ar para as aeronaves de busca',
              colunas: ['Sinal', 'Significado'],
              linhas: [
                ['I', 'Preciso de médico'],
                ['II', 'Preciso de remédios'],
                ['X', 'Não consigo seguir'],
                ['F', 'Preciso de água e comida'],
                ['K', 'Para que lado devo ir?'],
                ['LL', 'Está tudo bem'],
              ],
            },
          },
        ],
      },
    },
  ],
  teste: [
    {
      topico: '4.1',
      dificuldade: 'media',
      pergunta: 'Um piloto no calor tem pele quente e seca, sem suor, e está confuso. O que é mais provável?',
      opcoes: ['Estresse térmico leve', 'Insolação', 'Hipotermia leve', 'Hiperventilação'],
      correta: 1,
      explicacao: 'Na insolação, acima de cerca de 40,6 °C, o controle térmico falha: o suor para, a pele fica quente e seca e surgem confusão e alterações de comportamento. É emergência.',
    },
    {
      topico: '4.1',
      dificuldade: 'facil',
      pergunta: 'Por que esperar a sede para beber água é um erro?',
      opcoes: ['Porque a sede só aparece com cerca de 2% do peso já perdido.', 'Porque a sede nunca aparece em voo.', 'Porque a água em excesso desidrata.', 'Porque a sede indica hipotermia.'],
      correta: 0,
      explicacao: 'A sede é um aviso tardio: surge com cerca de 2% do peso perdido. O certo é beber antes e manter a urina clara.',
    },
    {
      topico: '4.2',
      dificuldade: 'media',
      pergunta: 'Uma pessoa resgatada do frio não treme mais, está alerta, mas se movimenta mal. Qual é a classificação mais provável?',
      opcoes: ['Hipotermia leve', 'Hipotermia moderada', 'Sem hipotermia', 'Insolação'],
      correta: 1,
      explicacao: 'Na moderada (32 a 28 °C), o tremor diminui ou para e os movimentos ficam prejudicados; a vítima deve ser mantida deitada.',
    },
    {
      topico: '4.2',
      dificuldade: 'dificil',
      pergunta: 'Na água gelada, o que mais mata no primeiro minuto?',
      opcoes: ['A hipotermia', 'O choque frio, com respiração ofegante e aspiração de água', 'A falta de comida', 'A desidratação'],
      correta: 1,
      explicacao: 'Pela regra 1-10-1, o primeiro minuto é o do choque frio; a hipotermia leva pelo menos meia hora. Controlar a respiração vem antes de tudo.',
    },
    {
      topico: '4.2',
      dificuldade: 'dificil',
      pergunta: 'Por que não se deve aquecer primeiro braços e pernas de uma vítima de hipotermia grave?',
      opcoes: ['Porque queima a pele', 'Porque devolve sangue frio ao centro do corpo (afterdrop) e pode causar arritmia', 'Porque aumenta o tremor', 'Porque desidrata'],
      correta: 1,
      explicacao: 'Aquecer as extremidades ou mover demais a vítima faz o sangue frio voltar ao centro: a temperatura central cai mais e o coração pode entrar em arritmia.',
    },
    {
      topico: '4.3',
      dificuldade: 'facil',
      pergunta: 'Pela regra dos três, qual é a ordem das prioridades na sobrevivência?',
      opcoes: ['Comida, água, abrigo, ar', 'Ar, abrigo, descanso, água, comida', 'Água, comida, ar, abrigo', 'Abrigo, comida, ar, água'],
      correta: 1,
      explicacao: 'Ar (3 minutos), abrigo (3 horas), descanso (30 horas), água (3 dias) e comida (30 dias).',
    },
  ],
};
