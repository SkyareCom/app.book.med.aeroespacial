// Comando nervoso e hormonal de cada sistema na altitude (inclusão autorizada pelo autor em 16/11/2026).
// Os mesmos textos das tabelas "Comando nervoso e hormonal na altitude" do tópico de abertura de cada voo de Sistemas.
// Fisiologia: Guyton & Hall, Tratado de Fisiologia Médica; West, Fisiologia Respiratória; Ernsting's Aviation and Space Medicine.
export const COMANDO: Record<string, { titulo: string; linhas: [string, string, string][] }> = {
  "hipoxia": {
    titulo: "Comando nervoso e hormonal na altitude · respiração e oxigênio",
    linhas: [
      ["Sensores", "Corpos carotídeos e aórticos, pelos nervos glossofaríngeo e vago", "Disparam quando o oxigênio do sangue cai e aumentam a respiração"],
      ["Centro no sistema nervoso", "Núcleo do trato solitário e centros respiratórios do bulbo, com saída pelo nervo frênico", "Respiração mais funda e rápida; o gás carbônico cai e o sangue fica alcalino"],
      ["Simpático", "Noradrenalina e adrenalina nos receptores beta-2 dos brônquios", "Brônquios mais abertos para passar mais ar"],
      ["Parassimpático", "Nervo vago, com acetilcolina nos receptores muscarínicos M3 dos brônquios", "Fecha os brônquios e aumenta o muco; pesa na asma"],
      ["Hormônios e enzimas", "HIF nas células, eritropoetina do rim e 2,3-DPG das hemácias", "Mais hemácias em dias, oxigênio solto mais fácil nos tecidos; os vasos do pulmão se fecham onde falta ar"],
    ],
  },
  "coracao": {
    titulo: "Comando nervoso e hormonal na altitude · coração e circulação",
    linhas: [
      ["Centro no sistema nervoso", "Bulbo ventrolateral rostral e núcleo do trato solitário, que recebe os barorreceptores e os quimiorreceptores", "Na hipóxia, mais simpático e menos vago: o coração acelera"],
      ["Simpático", "Noradrenalina nos receptores beta-1 do coração e alfa-1 dos vasos", "Frequência e força maiores; vasos da pele e do intestino mais fechados"],
      ["Parassimpático", "Nervo vago, com acetilcolina nos receptores M2 do nó sinusal", "Recua na hipóxia; o desmaio vasovagal é o vago disparando de repente"],
      ["Hormônios", "Adrenalina da suprarrenal, peptídeo natriurético do átrio e sistema renina-angiotensina", "Adrenalina sobe na altitude; o coração doente gasta a reserva mais cedo"],
      ["Sinais locais e enzimas", "Adenosina e óxido nítrico, produzido pela enzima óxido nítrico sintase", "Abrem as coronárias e os vasos do cérebro onde falta oxigênio"],
    ],
  },
  "ouvidos": {
    titulo: "Comando nervoso e hormonal na altitude · ouvidos, nariz e seios da face",
    linhas: [
      ["Comando muscular", "Nervo trigêmeo no músculo tensor do véu palatino", "Abre a tuba ao engolir; na descida, se ela não abre, a pressão de fora empurra o tímpano"],
      ["Simpático", "Noradrenalina nos receptores alfa dos vasos do nariz", "Desincha a mucosa; é o alvo dos descongestionantes"],
      ["Parassimpático", "Fibras que passam no gânglio pterigopalatino, com acetilcolina nas glândulas", "Mais muco e mais inchaço, que fecham a tuba e os seios"],
      ["Mediadores", "Histamina e outros mediadores da inflamação na mucosa", "No resfriado e na alergia, a mucosa incha e o gás preso não sai na mudança de pressão"],
      ["Centro no sistema nervoso", "Nervo coclear, núcleos do tronco cerebral e córtex auditivo do lobo temporal", "O ruído da cabine cansa a via e esconde os agudos"],
    ],
  },
  "olhos": {
    titulo: "Comando nervoso e hormonal na altitude · olhos e visão",
    linhas: [
      ["Parassimpático", "Núcleo de Edinger-Westphal e nervo oculomotor, com acetilcolina nos receptores M3", "Contrai a pupila e acomoda o foco de perto"],
      ["Simpático", "Gânglio cervical superior, com noradrenalina nos receptores alfa-1 do músculo dilatador", "Dilata a pupila no escuro e no susto"],
      ["Centro no sistema nervoso", "Nervo óptico, núcleo geniculado lateral do tálamo e córtex visual do lobo occipital", "A hipóxia deixa a percepção mais lenta e estreita o campo"],
      ["Pigmento e vitamina", "Rodopsina dos bastonetes, feita a partir da vitamina A", "Leva cerca de meia hora para se refazer no escuro; a hipóxia atrasa a adaptação"],
      ["Consumo de oxigênio", "Retina com consumo muito alto e circulação própria", "Os bastonetes sentem a hipóxia primeiro: a visão noturna cai cedo"],
    ],
  },
  "orientacao": {
    titulo: "Comando nervoso e hormonal na altitude · equilíbrio e orientação",
    linhas: [
      ["Centro no sistema nervoso", "Nervo vestibular, núcleos vestibulares, cerebelo e córtex", "Integra labirinto, olhos e corpo; a hipóxia e o álcool deixam a integração mais lenta"],
      ["Reflexo dos olhos", "Reflexo vestíbulo-ocular, dos núcleos vestibulares aos músculos dos olhos", "Mantém a imagem parada quando a cabeça mexe; falha na curva prolongada"],
      ["Centro do vômito", "Área postrema e núcleo do trato solitário, no bulbo", "Recebem o conflito de sinais e disparam a náusea"],
      ["Simpático e parassimpático", "Descarga autônoma com suor, palidez e salivação", "São os sinais de alerta do enjoo, antes do vômito"],
      ["Transmissores", "Histamina nos receptores H1 e acetilcolina nos receptores muscarínicos", "Os remédios contra enjoo os bloqueiam e por isso dão sono"],
    ],
  },
  "cerebro": {
    titulo: "Comando nervoso e hormonal na altitude · cérebro e sistema nervoso",
    linhas: [
      ["Fluxo de sangue", "Vasos cerebrais regulados por adenosina, óxido nítrico e gás carbônico", "Abrem na falta de oxigênio e fecham quando a hiperventilação baixa o gás carbônico"],
      ["Energia do neurônio", "Bomba de sódio e potássio, enzima que gasta a energia do oxigênio e da glicose", "Sem oxigênio, a carga elétrica se perde e a função cai em segundos"],
      ["Julgamento", "Córtex pré-frontal", "Falha cedo na hipóxia: a pessoa decide mal antes de perceber"],
      ["Alerta", "Sistema reticular ativador do tronco cerebral", "Sono, sedativos e hipóxia reduzem o estado de alerta"],
      ["Comando do corpo", "Hipotálamo, que liga o cérebro ao sistema autônomo e à hipófise", "Na altitude, aumenta o simpático e o cortisol"],
    ],
  },
  "mente": {
    titulo: "Comando nervoso e hormonal na altitude · mente e emoções",
    linhas: [
      ["Detector de ameaça", "Amígdala, ligada ao hipotálamo", "Dispara a resposta de medo diante de turbulência ou emergência"],
      ["Simpático", "Hipotálamo, simpático e adrenalina da suprarrenal", "Coração e respiração rápidos; pode levar à hiperventilação"],
      ["Eixo do estresse", "CRH do hipotálamo, ACTH da hipófise e cortisol da suprarrenal", "O cortisol sobe na altitude e no estresse prolongado e pesa no sono e no humor"],
      ["Vigilância", "Locus coeruleus, que espalha noradrenalina pelo cérebro", "Mantém a atenção; em excesso, aumenta a ansiedade"],
      ["Humor", "Núcleos da rafe, que produzem serotonina", "Alvo dos antidepressivos; a hipóxia pode trazer euforia e julgamento pior"],
    ],
  },
  "sono": {
    titulo: "Comando nervoso e hormonal na altitude · sono e relógio biológico",
    linhas: [
      ["Relógio central", "Núcleo supraquiasmático do hipotálamo, guiado pela luz dos olhos", "O fuso desalinha o relógio do dia local"],
      ["Simpático e pineal", "Noradrenalina nos receptores beta-1 da glândula pineal", "Liga a enzima que fabrica melatonina no escuro; a luz desliga"],
      ["Pressão de sono", "Adenosina acumulada no cérebro durante a vigília", "Aumenta o sono; o café bloqueia seus receptores"],
      ["Vigília e sono", "Orexina do hipotálamo lateral e GABA do núcleo pré-óptico", "Os remédios para dormir reforçam o GABA; por isso dão sono e lentidão"],
      ["Hormônios e altitude", "Cortisol, que sobe de manhã, e respiração controlada pelo tronco cerebral", "Na altitude, a respiração no sono fica irregular, com pausas e despertares"],
    ],
  },
  "hormonios": {
    titulo: "Comando nervoso e hormonal na altitude · hormônios e metabolismo",
    linhas: [
      ["Comando central", "Hipotálamo e hipófise", "Regulam tireoide, suprarrenais, gônadas e água do corpo"],
      ["Simpático e adrenalina", "Medula da suprarrenal, com adrenalina nos receptores beta-2 do fígado e alfa-2 do pâncreas", "Sobe o açúcar do sangue e segura a insulina"],
      ["Eixo do estresse", "CRH, ACTH e cortisol", "O cortisol sobe na altitude e aumenta a glicose"],
      ["Água do corpo", "Hormônio antidiurético da hipófise posterior", "Segura água no rim quando o corpo desidrata"],
      ["Enzimas e sensores", "HIF, que liga as enzimas da glicólise", "Mais glicose gasta sem oxigênio e mais lactato"],
    ],
  },
  "digestivo": {
    titulo: "Comando nervoso e hormonal na altitude · aparelho digestivo",
    linhas: [
      ["Sistema próprio", "Sistema nervoso entérico, na parede do intestino", "Coordena movimento e secreção mesmo sem ordens de fora"],
      ["Parassimpático", "Nervo vago, com acetilcolina nos receptores M3", "Mais movimento e mais suco digestivo"],
      ["Simpático", "Noradrenalina nos receptores alfa da parede e dos vasos do intestino", "Na hipóxia e no estresse, desvia o sangue e deixa a digestão lenta"],
      ["Centro do vômito", "Área postrema e núcleo do trato solitário, no bulbo", "Comandam náusea e vômito no enjoo e na intoxicação"],
      ["Hormônios", "Gastrina, secretina e colecistocinina", "Regulam o ácido do estômago, o pâncreas e a vesícula"],
    ],
  },
  "sangue-imunidade": {
    titulo: "Comando nervoso e hormonal na altitude · sangue e defesa",
    linhas: [
      ["Sensor de oxigênio", "Células do rim com HIF", "Ligam o gene da eritropoetina quando o oxigênio cai"],
      ["Hormônio", "Eritropoetina, do rim para a medula óssea", "Mais hemácias em dias a semanas; não ajuda no voo de poucas horas"],
      ["Enzima da hemácia", "Enzima que fabrica o 2,3-DPG", "A hemoglobina solta o oxigênio com mais facilidade nos tecidos"],
      ["Simpático", "Nervos na medula óssea, no baço e nos gânglios linfáticos", "Modula a saída de células de defesa no estresse"],
      ["Eixo do estresse", "Cortisol da suprarrenal", "Reduz parte da defesa; cansaço e viagens longas facilitam infecções"],
    ],
  },
  "ossos-musculos": {
    titulo: "Comando nervoso e hormonal na altitude · ossos, músculos e articulações",
    linhas: [
      ["Centro no sistema nervoso", "Córtex motor, cerebelo, núcleos da base e neurônios motores da medula", "Com menos oxigênio no cerebelo, a coordenação fina piora"],
      ["Placa motora", "Acetilcolina nos receptores nicotínicos do músculo", "Contrai o músculo; os relaxantes musculares agem nesse caminho ou na medula"],
      ["Simpático", "Noradrenalina e adrenalina nos receptores beta-2 dos vasos do músculo", "Abre os vasos no esforço e prepara o músculo para agir"],
      ["Energia do músculo", "Mioglobina, que guarda oxigênio, e enzimas da glicólise", "Na hipóxia, mais lactato e cansaço mais cedo"],
      ["Hormônios do osso", "Paratormônio, vitamina D e calcitonina", "Controlam o cálcio do sangue e a força do osso"],
    ],
  },
  "mulher": {
    titulo: "Comando nervoso e hormonal na altitude · saúde da mulher",
    linhas: [
      ["Comando central", "GnRH do hipotálamo, LH e FSH da hipófise", "Estresse, fuso e jornadas alteram o pulso e podem desregular o ciclo"],
      ["Hormônios do ovário", "Estrogênio e progesterona", "A progesterona estimula a respiração; o estrogênio aumenta o risco de trombose com a imobilidade"],
      ["Simpático", "Noradrenalina nos receptores alfa-1 e beta-2 do útero", "Alfa-1 contrai e beta-2 relaxa o músculo do útero"],
      ["Gestação", "Ocitocina da hipófise posterior e hormônios da placenta", "Comandam contrações e leite; a placenta depende do oxigênio da mãe"],
      ["Centro respiratório", "Tronco cerebral, estimulado pela progesterona", "Respiração mais funda na gestação e na segunda metade do ciclo"],
    ],
  },
  "rins": {
    titulo: "Comando nervoso e hormonal na altitude · rins e vias urinárias",
    linhas: [
      ["Simpático do rim", "Nervos renais, com receptores beta-1 e alfa-1", "Beta-1 libera renina; alfa-1 fecha a entrada de sangue no rim"],
      ["Hormônios da água e do sal", "Hormônio antidiurético, aldosterona e peptídeo natriurético", "Na altitude costuma haver mais urina nas primeiras horas; o ar seco pede água"],
      ["Enzima", "Anidrase carbônica dos túbulos", "Elimina bicarbonato para corrigir o sangue alcalino da hiperventilação; a acetazolamida a bloqueia"],
      ["Centro da micção", "Centro da micção na ponte e medula sacral", "Coordena o enchimento e o esvaziamento da bexiga"],
      ["Parassimpático e simpático da bexiga", "Acetilcolina nos M3; noradrenalina nos beta-3 e alfa-1", "M3 contrai a bexiga; alfa-1 fecha a saída e é o alvo da tansulosina"],
    ],
  },
  "envelhecimento": {
    titulo: "Comando nervoso e hormonal na altitude · o corpo que envelhece",
    linhas: [
      ["Barorreflexo", "Sensores do pescoço e da aorta e núcleo do trato solitário", "Responde menos com a idade: tontura ao levantar depois de horas sentado"],
      ["Simpático", "Tom em repouso maior e receptores beta do coração menos sensíveis", "O coração acelera menos na hipóxia e no esforço"],
      ["Parassimpático", "Nervo vago com menos força", "Menor variabilidade do ritmo do coração"],
      ["Sede e água", "Centro da sede no hipotálamo e hormônio antidiurético", "Sede menos sensível e rim que concentra menos: desidratação mais cedo"],
      ["Sono", "Glândula pineal e melatonina", "Menos melatonina e sono mais leve, que se ajusta mais devagar ao fuso"],
    ],
  },
};
