// Missão 1 (Conceitos) · Voo 4 — Temperatura e sobrevivência.
// Prosa única e progressiva, com destaques; cada tema num só lugar (referências cruzadas "Veja M_V_").
//
// REGISTRO DE REVISÃO (não aparece no app)
// REVISÃO 30/10/2026 (foco no organismo, pedido do autor): tabela "Sistemas do corpo mais atingidos" montada só com
//   dados já registrados neste voo; acréscimos de texto com as fontes abaixo.
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
// Fotos premium geradas por IA pelo autor (pessoas fictícias): topicos/m1v4-*.jpg.

// 10/11/2026 · Doenças, tratamentos e tipo de voo, a pedido do autor ("Em todos os voos / Insira informações sobre as
//   principais doenças relacionadas a cada tema...", "As doenças devem aparecer no texto e nao em tabelas isoladas...",
//   "Tratamentos exectantes e nao invasivos também devem entrar" e "Aplique em tudo"), com autorização para alterar os
//   voos congelados ("Autorizo todos", 10/11/2026): parágrafo de tratamentos (expectante, não invasivo e invasivo),
//   prognóstico, prazos e tipo de voo, e comparador "tipo de voo". Prazos e números vêm das fontes deste registro ou do
//   voo de Sistemas citado na remissão; linhas de tratamento sem número próprio são conhecimento médico geral.
//   Prazo de volta ao voo após insolação, hipotermia grave ou congelamento: [confirmar na referência].
import type { Capitulo } from '../tipos';

// 11/11/2026 (pedido do autor "Finalize todos os blocos incompletos"): orientação "Como prevenir e amenizar" com tabela
//   de decisão e motivo nos tópicos 4.1 a 4.3 e 4 questões novas. Aclimatação ao calor e aumento do suor: Fundamentals of
//   Aerospace Medicine e FAA AM-400-09/1; postura de proteção na água fria (HELP): manuais de sobrevivência no mar.
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
          "O corpo trabalha numa faixa estreita de temperatura. No calor, ele se defende **suando**: a evaporação do suor leva o calor embora. No calor úmido, esse resfriamento falha (Veja M1V1 - IV), e o problema cresce numa cabine parada ao sol, no uniforme ou durante o esforço no solo.",
          "O calor age em degraus. Com a temperatura central entre **37,5 e 37,8 °C**, vem o **estresse térmico**: caem a coordenação, a atenção, a visão, a decisão e a cautela, justamente o que o voo exige. Entre **38,3 e 40,6 °C**, a **exaustão pelo calor** traz fadiga, náusea, tontura, cãibras, respiração rápida e até desmaio. **Acima de 40,6 °C**, o controle da temperatura falha: é a **insolação**, com confusão, comportamento estranho e coma. O suor para, e a pele fica **quente e seca**.",
          "O calor anda junto com a **desidratação**. Cerca de **dois terços do corpo são água**. A **sede só aparece quando já se perdeu cerca de 2% do peso**; por volta de 5%, chegam fadiga, náusea e instabilidade emocional. Com mais perda, aparecem dor de cabeça, confusão, delírio e falência dos rins.",
          "A prevenção é simples e diária: **beber antes da sede**, cerca de **1,9 litro por dia** como base, mais no calor e no esforço, e **manter a urina clara**. Álcool e cafeína aumentam a perda de água. Quem muda para um clima quente leva **uma a duas semanas para se aclimatar**.",
          "**Doenças, tratamentos e tipo de voo.** O calor tem três degraus de doença, e cada um tem o seu tratamento. No **estresse térmico**, a conduta é **expectante** e de hábito: sombra, pausa e água. Na **exaustão pelo calor**, o tratamento é **não invasivo**: deitar num lugar fresco, tirar o excesso de roupa, resfriar a pele e beber água com sais. A **insolação** é emergência: **resfriamento rápido**, de preferência em água fria, e tratamento **invasivo** no hospital, com **soro na veia** e vigilância dos rins e do cérebro. Quem teve insolação só volta a voar depois da recuperação e da avaliação médica; a exaustão pede ao menos o dia de descanso e a reidratação completa. No jato **pressurizado**, o risco está no solo, com a cabine parada ao sol; no avião leve **não pressurizado** e no **helicóptero**, a cabine envidraçada esquenta como estufa, o capacete e o macacão retêm calor, e o voo baixo não refresca.",
          "**Como prevenir e amenizar.** Beba **antes da sede** e mantenha a **urina clara**. Use roupa leve e evite esperar no avião **parado ao sol** com as portas fechadas. Nas primeiras **uma a duas semanas** num clima quente, vá com calma, porque o corpo ainda não sua de forma eficiente. **Pele quente e seca, confusão ou desmaio** são emergência: resfrie a pessoa e chame socorro. O tripulante com sinais de **exaustão pelo calor** não voa até se recuperar, porque o calor tira atenção e julgamento antes de tirar a força.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · calor",
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Dia quente com espera no solo", "Beber antes da sede e evitar a cabine fechada ao sol: o suor não dá conta", "Ventilar a cabine e hidratar antes da partida, porque o estresse térmico já reduz a atenção"],
                ["Sinais de exaustão pelo calor", "Adiar e resfriar: deitar em lugar fresco e beber, porque tontura e náusea pioram a bordo", "Não voar até recuperar, porque fadiga, tontura e desmaio incapacitam"],
                ["Pele quente e seca com confusão", "Emergência: resfriar na hora e chamar socorro, porque a insolação pode matar", "Não voar e tratar como emergência, porque o cérebro já está falhando"],
                ["Chegada a clima quente", "Ir com calma nos primeiros dias: a aclimatação leva de 1 a 2 semanas", "Aumentar a hidratação nas primeiras semanas, porque o corpo ainda não sua de forma eficiente"],
              ],
            },
          },
          { paragrafo: 5, midia: 'tipo-voo-temperatura' },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m1v4-cabine-sol.jpg'), legenda: 'Avião parado ao sol, cabine abafada e macacão encharcado: o calor começa a pesar antes mesmo da decolagem.' } },
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
          "**Tratamentos, prognóstico e tipo de voo.** Na **hipotermia leve**, o tratamento é **não invasivo**: abrigo, roupa seca, isolamento e **reaquecimento passivo**, com bebida quente se a pessoa estiver alerta. Na **moderada**, entra o **reaquecimento ativo** do tronco, com mantas térmicas e calor nas axilas e no tórax. Na **grave**, o tratamento é **invasivo**, no hospital: soro aquecido na veia e, nos casos extremos, **circulação extracorpórea**, que aquece o sangue fora do corpo. O **congelamento** de dedos, nariz e orelhas se trata com reaquecimento em água morna, e a **cirurgia** de tecido morto só vem semanas depois, quando o limite da lesão fica claro. O prognóstico da hipotermia tratada a tempo é bom. No jato **pressurizado**, o risco é o pouso forçado em região fria; no avião leve **não pressurizado**, o aquecimento é fraco; no **helicóptero** de resgate, a vítima viaja **deitada**, aquecida e sem movimentos bruscos, por causa do afterdrop.",
          "**Como prevenir e amenizar.** Em voo sobre **água fria** ou região gelada, vista roupa adequada ao terreno sobrevoado, saiba onde está o **colete salva-vidas** e onde ficam as saídas. Na água, **controle a respiração no primeiro minuto** e depois, se não puder sair, **encolha o corpo abraçando os joelhos**, para perder menos calor. No resgate, aqueça o **tronco**, não braços e pernas, e mova a vítima com delicadeza. A tripulação usa **traje de imersão** quando o operador exigir e treina a saída da aeronave na água.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m1v4-2-agua-fria.jpg'), legenda: 'Saindo da água fria depois de um pouso forçado: tremor forte e respiração ofegante são os primeiros sinais, e o perigo continua fora da água.' } },
          {
            paragrafo: 7,
            tabela: {
              titulo: "Como prevenir e amenizar · frio",
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Voo sobre água fria", "Saber onde estão o colete e as saídas: a regra 1-10-1 dá pouco tempo", "Traje de imersão quando exigido e treino de saída, porque o choque frio tira o controle da respiração"],
                ["Dentro da água gelada", "Controlar a respiração e encolher o corpo: o perigo é aspirar água e perder calor", "Usar os 10 minutos úteis para sair ou se prender a algo, porque depois os músculos falham"],
                ["Resgate de vítima fria", "Aquecer o tronco, não braços e pernas: o afterdrop pode causar arritmia", "Mover com delicadeza e aquecer o centro, porque o movimento brusco devolve sangue frio ao coração"],
              ],
            },
          },
          { paragrafo: 1, video: { fonte: require('@/assets/videos/m1v4-frio.mp4'), legenda: 'No frio intenso, o corpo treme para gerar calor e cada respiração vira vapor: o tremor é a primeira defesa.' } },
          {
            paragrafo: 2,
            tabela: {
              titulo: 'Hipotermia: classificar pelos sinais',
              colunas: ['Estágio', 'Temperatura central', 'Sinais', 'No resgate'],
              linhas: [
                ['Leve', '35 a 32 °C', 'Treme, alerta, movimentos prejudicados', 'Sentado ou deitado; bebida quente e calórica se alerta'],
                ['Moderada', '32 a 28 °C', 'Tremor diminui ou para', 'Sempre deitado, sem comida; evacuar com cuidado'],
                ['Grave', 'Abaixo de 28 °C', 'Sem movimento, sem tremor, inconsciente', 'Sempre deitado; manuseio delicado; evacuar'],
              ],
            },
          },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v4-agua-gelada.jpg'), legenda: 'O primeiro minuto na água gelada: o choque frio força a respiração, e controlá-la evita aspirar água.' } },
          { paragrafo: 3, midia: 'agua-fria' },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m1v4-resgate-frio.jpg'), legenda: 'No resgate, a vítima fica deitada, isolada do chão e envolta numa barreira contra vento e umidade, com cabeça e pescoço protegidos.' } },
          { paragrafo: 5, midia: 'animacao-afterdrop' },
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
          "**Como prevenir e amenizar.** A sobrevivência começa antes da decolagem. Em voo sobre **área remota**, use **roupa e calçado** adequados ao terreno, registre o **plano de voo** e confira o **ELT** e o **kit**. Preste atenção à demonstração de segurança e conte as fileiras até a saída. Depois de um pouso forçado, **fique perto da aeronave**, conte os ocupantes e acione os sinais; no calor, **poupe o suor na sombra**, e no frio, isole-se do chão.",
        ].join('\n\n'),
        recursos: [
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m1v4-3-abrigo.jpg'), legenda: 'Abrigo montado junto à asa: perto da aeronave, a pessoa é mais fácil de achar, e o kit garante sinal, água e calor.' } },
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · sobrevivência",
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Antes do voo sobre área remota", "Vestir roupa e calçado adequados ao terreno: num pouso fora, é com eles que se sobrevive", "Plano de voo, ELT testado e kit a bordo, porque o resgate começa pela informação registrada"],
                ["Depois do pouso forçado", "Ficar perto da aeronave: ela é maior e mais fácil de achar do que uma pessoa", "Contar os ocupantes e acionar o ELT, porque os primeiros cinco minutos decidem muito"],
                ["Calor sem água suficiente", "Poupar o suor na sombra e trabalhar à noite: o corpo perde água mais rápido do que repõe", "Mesma conduta e racionar o esforço, porque a desidratação tira o julgamento"],
              ],
            },
          },
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
          {
            paragrafo: 5,
            tabela: {
              titulo: 'O kit que cabe num colete',
              colunas: ['Item', 'Para quê'],
              linhas: [
                ['Sinalizador e espelho', 'Ser visto pela busca'],
                ['Lanterna com pilhas extras', 'Trabalhar e sinalizar à noite'],
                ['Canivete ou ferramenta, corda', 'Abrigo, reparos e amarração'],
                ['Fósforos à prova d\'água', 'Fogo para calor e sinal'],
                ['Bússola', 'Orientação'],
                ['Primeiros socorros', 'Ferimentos'],
                ['Repelente e luvas', 'Proteção da pele e das mãos'],
                ['Água e comida', 'Reserva para esperar o resgate'],
              ],
            },
          },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Sistema nervoso (calor)', 'A partir de 37,5 °C caem atenção, visão e decisão; acima de 40,6 °C, insolação com confusão e coma; os neurônios funcionam mal acima da faixa normal de temperatura, e o calor extremo lesa as células', 'Beber antes da sede; aclimatar-se por 1 a 2 semanas'],
                ['Rins e água do corpo', 'Sede só com 2% do peso perdido; 5%, fadiga e náusea; depois, confusão e falência dos rins; com menos água, o volume de sangue cai, e o cérebro e o rim recebem menos fluxo', 'Cerca de 1,9 litro por dia como base; urina clara; menos álcool e cafeína'],
                ['Sistema nervoso (frio)', 'Por volta de 34 °C, o cérebro fica mais lento: as reações químicas dos neurônios ficam mais lentas no frio', 'Isolar do chão e barrar vento e umidade'],
                ['Coração (frio)', 'Abaixo de 30 °C, coração lento e risco de arritmia; o afterdrop pode desencadeá-la; o músculo do coração frio conduz mal o estímulo, e o sangue frio das extremidades, ao voltar, esfria ainda mais o coração', 'Aquecer o tronco, manter deitado e mover pouco'],
                ['Respiratório (água fria)', 'No primeiro minuto, o choque frio faz ofegar e aspirar água: o frio súbito na pele dispara um reflexo de inspiração forte e respiração acelerada', 'Controlar a respiração primeiro: regra 1-10-1'],
                ['Músculos (água fria)', 'Cerca de 10 minutos de movimentos úteis antes de falharem: o frio esfria músculos e nervos dos braços e das pernas, que perdem força e coordenação', 'Usar esses minutos para sair da água ou se proteger'],
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
    {
      topico: "4.1",
      pergunta: "Quanto tempo o corpo leva, em geral, para se aclimatar a um clima quente?",
      opcoes: [
        "Algumas horas",
        "Um a dois dias",
        "Uma a duas semanas",
        "Seis meses",
      ],
      correta: 2,
      explicacao: "Quem muda para um clima quente leva uma a duas semanas para se aclimatar; nesse período, a hidratação e o ritmo pedem mais cuidado.",
    },
    {
      topico: "4.1",
      pergunta: "Com que temperatura central começa o estresse térmico, que já reduz atenção e decisão?",
      opcoes: [
        "Entre 36,0 e 36,5 °C",
        "Entre 37,5 e 37,8 °C",
        "Acima de 40,6 °C",
        "Acima de 42 °C",
      ],
      correta: 1,
      explicacao: "Entre 37,5 e 37,8 °C vem o estresse térmico: caem coordenação, atenção, visão e decisão, justamente o que o voo exige.",
    },
    {
      topico: "4.2",
      pergunta: "A partir de que temperatura central se define a hipotermia?",
      opcoes: [
        "37 °C ou menos",
        "36 °C ou menos",
        "35 °C ou menos",
        "30 °C ou menos",
      ],
      correta: 2,
      explicacao: "Hipotermia é a temperatura central de 35 °C ou menos; por volta de 34 °C, o cérebro já funciona mais devagar.",
    },
    {
      topico: "4.3",
      pergunta: "Qual é o sinal internacional de socorro feito com fogo?",
      opcoes: [
        "Uma fogueira grande",
        "Duas fogueiras lado a lado",
        "Três fogueiras",
        "Uma fogueira com fumaça preta",
      ],
      correta: 2,
      explicacao: "Três fogueiras são o sinal internacional de socorro; com o espelho de sinalização e os sinais no chão, ajudam as aeronaves de busca a achar o local.",
    },
  ],
};
