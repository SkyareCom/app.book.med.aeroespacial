// Missão 1 (Conceitos) · Voo 2 — Pressurização e oxigênio suplementar.
// Prosa única e progressiva, com destaques; cada tema num só lugar (referências cruzadas "Veja M_V_").
//
// REGISTRO DE REVISÃO (não aparece no app)
// REVISÃO 30/10/2026 (foco no organismo, pedido do autor): tabela "Sistemas do corpo mais atingidos" montada só com
//   dados já registrados neste voo; acréscimos de texto com as fontes abaixo.
// - 502 voluntários em câmara (650 a 8.000 ft, voo simulado de 20 h): SpO₂ caiu no máximo 4,4 pontos a 8.000 ft;
//   desconforto maior a 7.000–8.000 ft, aparente após 3 a 9 h; mal agudo da montanha em 7,4%, sem diferença entre
//   altitudes: Muhm JM et al. N Engl J Med 2007;357(1):18-27.
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
// Fotos premium geradas por IA pelo autor (pessoas fictícias): topicos/m1v2-*.jpg.

// 10/11/2026 · Doenças, tratamentos e tipo de voo, a pedido do autor ("Em todos os voos / Insira informações sobre as
//   principais doenças relacionadas a cada tema...", "As doenças devem aparecer no texto e nao em tabelas isoladas...",
//   "Tratamentos exectantes e nao invasivos também devem entrar" e "Aplique em tudo"), com autorização para alterar os
//   voos congelados ("Autorizo todos", 10/11/2026): parágrafo de tratamentos (expectante, não invasivo e invasivo),
//   prognóstico, prazos e tipo de voo, e comparador "tipo de voo". Prazos e números vêm das fontes deste registro ou do
//   voo de Sistemas citado na remissão; linhas de tratamento sem número próprio são conhecimento médico geral.
import type { Capitulo } from '../tipos';

// 11/11/2026 (pedido do autor "Finalize todos os blocos incompletos"): parágrafos novos em 2.1, 2.3 e 2.4, orientação
//   "Como prevenir e amenizar" com tabela de decisão e motivo, 6 questões novas. Limites de cabine: 14 CFR 25.841; uso de
//   oxigênio: 14 CFR 91.211; máscaras de passageiros e gerador químico: FAA AC 25-20 e briefing padrão de segurança
//   (o oxigênio flui mesmo com a bolsa vazia); pressão positiva e esforço expiratório: Fundamentals of Aerospace Medicine.
export const pressurizacao: Capitulo = {
  numero: 2,
  titulo: 'Pressurização e oxigênio suplementar',
  tempoLeituraMin: 20,
  topicos: [
    {
      id: '2.1',
      titulo: 'Pressurização',
      pergunta: 'Como um avião mantém o ar respirável a mais de 10 km de altura?',
      conteudo: {
        texto: [
          "Na altitude de cruzeiro, a pressão lá fora é baixa demais para o corpo (Veja M1V1 - I). A **pressurização** resolve isso comprimindo ar dentro da cabine, para que o corpo viva numa **altitude de cabine** muito menor que a altitude de voo. Mas a cabine não fica ao nível do mar: num estudo com **502 voluntários** em câmara, a **saturação de oxigênio** caiu cerca de **4 pontos** a 8.000 ft e, depois de **3 a 9 horas** a 7.000 ou 8.000 ft, cresceram as queixas de **desconforto**, sem aumento do mal da montanha.",
          "O ar vem dos motores. Nos aviões a turbina, chega como **ar de sangria** do motor; nos aviões leves pressurizados, vem do **turbocompressor** ou de uma **bomba pneumática**. Esse ar entra sem parar, e a **válvula de saída** solta o excesso para fora, mantendo a pressão da cabine estável. Vindo de grandes altitudes, esse ar é muito seco e **resseca olhos, nariz e garganta** (Veja M1V1 - IV).",
          "A cabine funciona como um balão rígido. Cada avião suporta uma diferença máxima entre a pressão de dentro e a de fora: a **pressão diferencial**, mostrada num indicador. Algumas aeronaves têm **válvulas de alívio** que protegem a estrutura quando essa diferença sai do limite. Se a estrutura ou o sistema falham, a cabine sobe, e o corpo fica exposto à altitude real (Veja M1V3 - I).",
          "Nem todo avião é pressurizado. Os **aviões leves a pistão** e os **helicópteros**, em geral, voam com a cabine na altitude real; por isso ficam baixos ou levam oxigênio (Veja M1V2 - III). Nos jatos, um **controlador automático** programa a subida e a descida da cabine conforme o perfil do voo, e a tripulação acompanha a **altitude de cabine**, a **razão de variação** e a **pressão diferencial** no painel.",
          "**Pressurizar não dispensa o oxigênio.** Uma falha ou uma descompressão é sempre possível, e por isso o oxigênio suplementar continua a bordo (Veja M1V3).",
          "**Como prevenir e amenizar.** Para o passageiro saudável, a cabine pressurizada não pede preparo. Quem tem **doença do pulmão ou do coração** pergunta ao médico, antes do voo, se a cabine a 8.000 ft exige **oxigênio a bordo**. Se as **máscaras caírem**, siga a tripulação na hora: a cabine pode continuar subindo. Para a tripulação, a pressurização é conferida **antes e durante o voo**, e o alerta de cabine acima de 10.000 ft pede **máscara primeiro e descida**, porque a falha começa sem dor nem aviso.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · pressurização",
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Cabine pressurizada em operação normal", "Pode voar: a cabine fica em geral até 8.000 ft, bem tolerada por quem é saudável", "Conferir a pressurização antes e durante o voo, porque a falha começa silenciosa"],
                ["Alerta de cabine acima de 10.000 ft", "Seguir a tripulação e usar a máscara se cair: a cabine pode continuar subindo", "Máscara primeiro e descida, porque a hipóxia tira o julgamento em poucos minutos"],
                ["Doença do pulmão ou do coração", "Avaliar com o médico e pedir oxigênio pelo MEDIF se indicado: a cabine baixa a saturação de quem tem pouca reserva", "Avaliação do examinador, porque a reserva menor some primeiro na cabine"],
              ],
            },
          },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m1v2-aviao-cruzeiro.jpg'), legenda: 'Lá fora, o ar é rarefeito demais para o corpo; dentro da fuselagem, a pressurização cria uma bolha de ar respirável.' } },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m1v2-valvula-saida.jpg'), legenda: 'A válvula de saída abre e fecha para soltar o excesso de ar e manter a pressão da cabine estável.' } },
          { paragrafo: 3, midia: 'pressao-diferencial' },
          { paragrafo: 5, video: { fonte: require('@/assets/videos/m1v2-mascaras.mp4'), legenda: 'Se a cabine perde pressão, as máscaras caem: o oxigênio suplementar é a proteção que a pressurização não dispensa.' } },
        ],
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
          "**Doenças, tratamentos e tipo de voo.** A cabine a 8.000 ft é inofensiva para quem é saudável, mas pesa em quem tem pouca reserva: **DPOC** e outras doenças do pulmão, **insuficiência cardíaca**, **anemia**, **doença falciforme** e **hipertensão pulmonar** (Veja M2V1, M2V2 e M2V11). Para eles, a conduta pode ser **expectante** quando a saturação em repouso passa de 95%; o tratamento **não invasivo** é o **oxigênio a bordo**, combinado antes com a companhia pelo **MEDIF**, depois do **teste de simulação de altitude** quando indicado (Veja M2V1 - IX). Não há tratamento invasivo para a altitude da cabine; quem não tolera nem com oxigênio **adia** a viagem até estabilizar. No jato **pressurizado**, a cabine fica até 8.000 ft; no avião **não pressurizado**, a cabine é a própria altitude, e a regra exige oxigênio a partir de 12.500 ft (Veja M1V2 - III); no **helicóptero**, quase nunca pressurizado, o voo baixo poupa, salvo na montanha.",
          "**Como prevenir e amenizar.** Quem tem **saturação em repouso acima de 95%** costuma tolerar bem a cabine; abaixo disso, ou com doença do pulmão, do coração ou do sangue, o médico avalia o **oxigênio a bordo** antes do voo (Veja M2V1). Na descida, **engula, boceje ou beba água**, porque a cabine desce e a tuba auditiva precisa abrir; não voe com o nariz entupido (Veja M2V3). Na jornada longa, a cabine a 8.000 ft soma ao cansaço: o tripulante dorme bem antes e se hidrata durante o voo.",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · altitude de cabine",
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Saturação em repouso acima de 95%", "Pode voar: com essa reserva, a cabine a 8.000 ft é bem tolerada", "Pode voar, porque a queda na cabine normal não tira o desempenho"],
                ["Saturação baixa ou doença com pouca reserva", "Avaliar oxigênio a bordo com o médico: a cabine derruba ainda mais a saturação", "Avaliação do examinador, porque a hipóxia leve soma ao cansaço da jornada"],
                ["Ouvido tampado na descida", "Engolir, bocejar ou beber água: a cabine desce e a tuba precisa abrir", "Não voar resfriado, porque a dor na descida pode incapacitar"],
              ],
            },
          },
          { paragrafo: 5, midia: 'tipo-voo-cabine' },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m1v2-aviao-quadrado.jpg'), legenda: 'O avião cruza a mais de 10 km de altura, mas o corpo de quem está dentro vive na altitude de cabine.' } },
          { paragrafo: 2, midia: 'perfil-cabine' },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v2-mascaras-cabine.jpg'), legenda: 'Se a cabine perde pressão, as máscaras dos passageiros caem antes de a altitude de cabine passar de 15.000 ft.' } },
          { paragrafo: 4, figura: { imagem: require('@/assets/images/topicos/m1v2-painel-pressurizacao.jpg'), legenda: 'No painel de pressurização, a tripulação escolhe a altitude de cabine e a velocidade com que ela sobe ou desce.' } },
        ],
      },
    },
    {
      id: '2.3',
      titulo: 'Oxigênio e máscaras',
      pergunta: 'Quando a máscara cai, o que ela entrega, e até onde ela protege?',
      conteudo: {
        texto: [
          "O oxigênio de bordo não é qualquer oxigênio: é o **oxigênio respiratório de aviação**, com pureza definida por norma, guardado em cilindros a **1.800 a 2.200 psi**. Perto dele, **óleo, graxa e cigarro são proibidos**: o risco de fogo é real.",
          "Cada sistema tem um teto. No **fluxo contínuo**, o oxigênio sai sem parar e se mistura ao ar, com uma bolsa reservatória na máscara: é certificado até 41.000 ft, mas exige muita atenção acima de **25.000 ft**. Na **demanda diluidora**, o oxigênio flui só na inspiração, misturado ou a 100%, e é seguro até **40.000 ft**, desde que a máscara vede bem: **barba e bigode atrapalham**, e a máscara que vaza deixa entrar ar da cabine, e o oxigênio no pulmão cai sem aviso. Acima disso, só a **pressão de demanda** (Veja M1V2 - IV).",
          "A máscara dos pilotos pode entregar mais oxigênio que a dos passageiros; por isso, cada um usa a sua. Em voo não pressurizado, o oxigênio é **recomendado a partir de 10.000 ft de dia e acima de 5.000 ft à noite**. A diferença vem do corpo: a **visão noturna** é das primeiras funções a piorar com a falta de oxigênio (Veja M2V1 - IV).",
          "Nos aviões de linha, a máscara do passageiro costuma ser alimentada por um **gerador químico**: ao **puxar a máscara**, o gerador começa a produzir oxigênio, esquenta e pode soltar **cheiro de queimado**, o que é normal. **O oxigênio flui mesmo que a bolsa não infle.** A regra é colocar a **sua máscara primeiro** e só depois ajudar quem está ao lado, porque sem oxigênio a consciência útil é curta (Veja M2V1 - III).",
          "As regras da FAA escalonam o uso. Entre **12.500 e 14.000 ft** de cabine, a tripulação usa oxigênio se ficar mais de 30 minutos; acima de **14.000 ft**, o tempo todo; acima de **15.000 ft**, **todos a bordo** recebem oxigênio. Em aviões pressurizados, acima do **FL250** deve haver ao menos **10 minutos de oxigênio por ocupante** para a descida de emergência; acima do **FL350**, um piloto voa de máscara, salvo quando dois pilotos têm máscaras de colocação rápida, vestidas com uma mão em até 5 segundos, até o FL410. Os degraus seguem a fisiologia: quanto mais alta a cabine, **menor o tempo de consciência útil** sem oxigênio (Veja M2V1 - III).",
          "**Como prevenir e amenizar.** Preste atenção à **demonstração de segurança**: ela ensina a puxar e ajustar a máscara. Perto do oxigênio, **não fume** nem use cremes oleosos. O piloto **testa a máscara antes do voo**, com fluxo e vedação, e quem tem **barba** confere se ela veda bem, porque o vazamento dilui o oxigênio justamente quando ele mais falta. Em voo não pressurizado, siga os limites de oxigênio do dia e da noite (Veja M1V2 - III).",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · oxigênio e máscaras",
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Máscaras caem na cabine", "Puxar e colocar a sua antes de ajudar os outros: sem oxigênio, a consciência útil é curta", "Máscara em segundos e descida de emergência, porque o julgamento falha antes de qualquer aviso"],
                ["Bolsa da máscara que não infla", "Continuar respirando normalmente: o oxigênio flui mesmo com a bolsa vazia", "Orientar os passageiros, porque o medo leva a tirar a máscara"],
                ["Barba ou bigode", "Pode voar: a máscara do passageiro é de fluxo contínuo e não depende de vedação perfeita", "Testar a vedação da máscara de demanda antes do voo, porque o vazamento dilui o oxigênio quando ele mais falta"],
                ["Óleo, graxa e cigarro perto do oxigênio", "Não fumar nem usar cremes oleosos: o oxigênio facilita o fogo", "Manusear cilindros e máscaras sem óleo ou graxa, porque o oxigênio sob pressão inflama com facilidade"],
              ],
            },
          },
          { paragrafo: 1, figura: { imagem: require('@/assets/images/topicos/m1v2-cilindro-oxigenio.jpg'), legenda: 'O cilindro de oxigênio de bordo é inspecionado com o manômetro à vista e longe de óleo e graxa.' } },
          { paragrafo: 2, midia: 'sistemas-oxigenio' },
          { paragrafo: 3, figura: { imagem: require('@/assets/images/topicos/m1v2-piloto-mascara.jpg'), legenda: 'A máscara de colocação rápida dos pilotos: vestida com uma só mão, em até 5 segundos.' } },
          {
            paragrafo: 5,
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
          "Respirar sob pressão positiva **inverte o esforço**: a inspiração fica fácil, e a expiração exige força. Falar fica difícil, e o pescoço e o tórax se distendem. Por isso, quem usa esse sistema **treina antes em câmara**, e nos pilotos militares a máscara costuma vir com um **colete de contrapressão** no tórax, que ajuda a expirar e protege o retorno do sangue ao coração.",
          "Mais acima, perto da **linha de Armstrong** (Veja M1V1 - I), a proteção deixa de ser só respiratória e passa a envolver o corpo inteiro, com trajes pressurizados (Veja M3V12).",
          "**Como prevenir e amenizar.** A pressão positiva é para **tripulantes em voo muito alto**, sobretudo militares; o passageiro fica protegido pela cabine pressurizada. Quem vai usá-la **treina antes em câmara**, aprende a respirar contra a pressão e a falar com a máscara. O uso fica limitado ao **tempo da emergência**, seguido de **descida**, porque a pressão no tórax dificulta o retorno do sangue. Perto da linha de Armstrong, só o **traje pressurizado** protege (Veja M1V1 - I).",
        ].join('\n\n'),
        recursos: [
          {
            paragrafo: 6,
            tabela: {
              titulo: "Como prevenir e amenizar · pressão positiva",
              colunas: ['Situação', 'Passageiro', 'Tripulante'],
              linhas: [
                ["Voo acima de 40.000 ft", "Pode voar: a cabine pressurizada protege o passageiro", "Pressão positiva com treinamento prévio, porque o oxigênio a 100% sozinho já não basta"],
                ["Uso prolongado de pressão positiva", "Não se aplica: o sistema é só da tripulação", "Limitar ao tempo da emergência e descer, porque a pressão no tórax dificulta o retorno do sangue e causa hipóxia estagnante"],
                ["Perto da linha de Armstrong", "Não se aplica: só voos especiais chegam a essa altitude", "Traje pressurizado obrigatório, porque sem pressão os líquidos expostos do corpo fervem"],
              ],
            },
          },
          { paragrafo: 1, midia: 'oxigenio-100' },
          { paragrafo: 3, midia: 'animacao-pressao-positiva' },
          { paragrafo: 2, figura: { imagem: require('@/assets/images/topicos/m1v2-regulador.jpg'), legenda: 'O regulador de pressão de demanda empurra o oxigênio para dentro da máscara a cada inspiração.' } },
          { paragrafo: 5, figura: { imagem: require('@/assets/images/topicos/m1v2-traje-pressurizado.jpg'), legenda: 'Nas altitudes extremas, a proteção passa a envolver o corpo inteiro, com capacete e traje pressurizado.' } },
          {
            paragrafo: 5,
            tabela: {
              titulo: 'Sistemas do corpo mais atingidos',
              colunas: ['Sistema', 'O que acontece', 'Proteção e prevenção'],
              linhas: [
                ['Nervoso e visão', 'Na cabine a 8.000 ft, a saturação cai cerca de 4 pontos; acima de 10.000 ft, cresce a hipóxia; à noite, a visão piora antes; com menos pressão de oxigênio, menos oxigênio chega ao sangue, e a retina e o cérebro, que mais consomem, sentem primeiro', 'Cabine até 8.000 ft; alerta aos 10.000 ft; oxigênio pelos degraus da FAA'],
                ['Ouvidos e seios da face', 'Mudanças de pressão na subida e na descida: o ar do ouvido médio e dos seios precisa sair e entrar por aberturas estreitas, e a variação rápida não dá tempo', 'Descida da cabine de no máximo 500 a 600 ft por minuto'],
                ['Respiratório', 'A máscara que vaza deixa entrar ar da cabine e o oxigênio cai', 'Máscara bem ajustada; barba e bigode atrapalham a vedação'],
                ['Circulação', 'Respirar sob pressão positiva por muito tempo causa hipóxia estagnante: a pressão alta no tórax dificulta a volta do sangue ao coração, e o fluxo para os tecidos cai', 'Pressão positiva só nas altitudes extremas'],
                ['Olhos, nariz e garganta', 'O ar da cabine é seco e resseca as mucosas: ele vem de fora, onde o ar frio tem pouquíssimo vapor de água', 'Veja M1V1 - IV'],
                ['Corpo inteiro', 'Perto da linha de Armstrong, a respiração já não basta: mesmo com oxigênio puro, a pressão é tão baixa que não empurra oxigênio suficiente para o sangue', 'Traje pressurizado (Veja M3V12)'],
              ],
            },
          },
        ],
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
    {
      topico: "2.1",
      pergunta: "Nos aviões a turbina, de onde vem o ar que pressuriza a cabine?",
      opcoes: [
        "De cilindros de ar comprimido",
        "Do ar de sangria do motor",
        "Do oxigênio dos geradores químicos",
        "Do ar da cabine reciclado sem entrada nova",
      ],
      correta: 1,
      explicacao: "Nos aviões a turbina, o ar chega como ar de sangria do motor; a válvula de saída solta o excesso e mantém a pressão estável.",
    },
    {
      topico: "2.1",
      pergunta: "Qual é a função da válvula de saída na pressurização?",
      opcoes: [
        "Soltar o excesso de ar e manter a pressão da cabine estável",
        "Liberar as máscaras de oxigênio",
        "Aquecer o ar que entra",
        "Umidificar a cabine",
      ],
      correta: 0,
      explicacao: "O ar entra sem parar, e a válvula de saída regula quanto sai, o que define a pressão e a altitude da cabine.",
    },
    {
      topico: "2.2",
      pergunta: "Numa descompressão, por quanto tempo, no máximo, a cabine de um avião de transporte pode ficar acima de 25.000 ft?",
      opcoes: [
        "30 segundos",
        "2 minutos",
        "10 minutos",
        "30 minutos",
      ],
      correta: 1,
      explicacao: "A regra de certificação não permite a cabine acima de 25.000 ft por mais de 2 minutos nem, em nenhum caso, acima de 40.000 ft.",
    },
    {
      topico: "2.2",
      pergunta: "A partir de que altitude de cabine a tripulação recebe um alerta?",
      opcoes: [
        "8.000 ft",
        "10.000 ft",
        "15.000 ft",
        "25.000 ft",
      ],
      correta: 1,
      explicacao: "O alerta soa quando a cabine passa de 10.000 ft; as máscaras dos passageiros caem antes de 15.000 ft.",
    },
    {
      topico: "2.3",
      pergunta: "Uma passageira puxa a máscara, mas a bolsa não infla. O que fazer?",
      opcoes: [
        "Tirar a máscara, porque ela não funciona",
        "Soprar dentro da bolsa para enchê-la",
        "Continuar respirando normalmente com a máscara",
        "Trocar de máscara com o vizinho",
      ],
      correta: 2,
      explicacao: "O oxigênio flui mesmo que a bolsa não infle; tirar a máscara expõe à hipóxia em poucos minutos.",
    },
    {
      topico: "2.4",
      pergunta: "A 40.000 ft, respirando oxigênio a 100%, de quanto fica a pressão do oxigênio inspirado?",
      opcoes: [
        "Cerca de 93 mmHg, menos que o ar comum ao nível do mar",
        "Cerca de 149 mmHg, igual ao nível do mar",
        "Cerca de 300 mmHg",
        "Cerca de 760 mmHg",
      ],
      correta: 0,
      explicacao: "A pressão total é tão baixa que, mesmo puro e umidificado, o oxigênio inspirado fica perto de 93 mmHg, abaixo dos 149 mmHg do ar comum ao nível do mar; daí a pressão positiva.",
    },
  ],
};
