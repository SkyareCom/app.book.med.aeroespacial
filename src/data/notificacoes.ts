import type { Href } from 'expo-router';

// Novidades do app mostradas em Notificações. Ao incluir uma novidade, aumente VERSAO_NOTIFICACOES
// para o ponto de "não lida" voltar a aparecer no sino.
export const VERSAO_NOTIFICACOES = 30;

export interface Notificacao {
  id: string;
  rotulo: string;
  titulo: string;
  texto: string;
  destino?: Href;
}

export const notificacoes: Notificacao[] = [
  {
    id: 'certificacao',
    rotulo: 'Voo disponível',
    titulo: 'Certificação e risco aeromédico',
    texto: 'O voo 1 abre a Missão Aviação: classes de certificado médico, requisitos por sistema do corpo em cada classe do RBAC 67, as regras da ICAO, ANAC, FAA e EASA, o médico examinador, a regra do 1% e a medicina de precisão.',
    destino: '/capitulo/aviacao/1',
  },
  {
    id: 'envelhecimento',
    rotulo: 'Voo disponível',
    titulo: 'Envelhecimento e limites de idade',
    texto: 'O voo 15 fecha a Missão Sistemas: o corpo que envelhece no voo, visão, audição e atenção com a idade, eletrocardiograma e validade do certificado, limites de idade do piloto e os direitos e cuidados do passageiro idoso.',
    destino: '/capitulo/sistemas/15',
  },
  {
    id: 'rins-vias-urinarias',
    rotulo: 'Voo disponível',
    titulo: 'Rins e vias urinárias',
    texto: 'O voo 14 da Missão Sistemas chegou: água e banheiro no voo, pedra nos rins e cólica renal, doença renal, diálise e transplante, próstata, bexiga e infecção urinária, sangue na urina e cirurgias, com as regras para passageiro e tripulante.',
    destino: '/capitulo/sistemas/14',
  },
  {
    id: 'liberacao-topicos',
    rotulo: 'Atualização',
    titulo: 'Liberação para voo: todos os tópicos',
    texto: 'O formulário Liberação para voo seguro agora tem perguntas de todos os tópicos de cada sistema, agrupadas por tópico, com o veredito para passageiro e tripulante.',
    destino: '/liberacao-voo',
  },
  {
    id: 'saude-mulher',
    rotulo: 'Voo disponível',
    titulo: 'Saúde da mulher',
    texto: 'O voo 13 da Missão Sistemas chegou: gestação e voo trimestre a trimestre, parto e perda gestacional, amamentação, ciclo menstrual, pílula e fuso horário, endometriose e menopausa, com as regras para passageira e tripulante.',
    destino: '/capitulo/sistemas/13',
  },
  {
    id: 'ossos-musculos',
    rotulo: 'Voo disponível',
    titulo: 'Coluna, ossos e músculos',
    texto: 'O voo 12 da Missão Sistemas chegou: dor no pescoço e nas costas, fraturas e gesso, próteses e amputação, condicionamento físico e retorno ao voo, com tratamentos, prazos e o comparador por tipo de aeronave.',
    destino: '/capitulo/sistemas/12',
  },
  {
    id: 'doencas-tratamentos',
    rotulo: 'Atualização',
    titulo: 'Doenças e tratamentos em todos os voos',
    texto: 'Cada voo agora traz as principais doenças do tema com os tratamentos expectantes, não invasivos e invasivos, o prognóstico no voo, os prazos para voltar a voar e um comparador entre avião pressurizado, não pressurizado e helicóptero. A Liberação para voo ganhou perguntas sobre cirurgias e procedimentos.',
    destino: '/liberacao-voo',
  },
  {
    id: 'deficiencias',
    rotulo: 'Missão especial',
    titulo: 'Deficiências e o voo',
    texto: 'Nova missão especial na Home: amputações, cadeira de rodas, cegueira e cão-guia, visão monocular, surdez, autismo e deficiências ocultas, com o caminho do tripulante até o certificado médico. A Liberação para voo ganhou o MEDIF e o FREMEC.',
    destino: '/deficiencias',
  },
  {
    id: 'sangue',
    rotulo: 'Voo disponível',
    titulo: 'Sangue, câncer e infecções',
    texto: 'O voo 11 da Missão Sistemas chegou: o sangue e a defesa do organismo na cabine, anemia e anticoagulação, câncer e quimioterapia, infecções transmissíveis, HIV sem discriminação e vacinas para o viajante. O formulário de liberação ganhou o bloco do sangue e da imunidade.',
    destino: '/capitulo/sistemas/11',
  },
  {
    id: 'digestivo',
    rotulo: 'Voo disponível',
    titulo: 'Estômago, intestino e fígado',
    texto: 'O voo 10 da Missão Sistemas apresenta a digestão na cabine, refluxo e úlcera, crises intestinais, doença do fígado, vesícula e pâncreas, cirurgias abdominais e prazos distintos para passageiros e tripulantes. O formulário de liberação ganhou o bloco digestivo.',
    destino: '/capitulo/sistemas/10',
  },
  {
    id: 'hormonios',
    rotulo: 'Voo disponível',
    titulo: 'Hormônios e metabolismo',
    texto: 'O voo 9 da Missão Sistemas chegou: diabetes e hipoglicemia com os prazos da ANAC e da FAA, o semáforo do açúcar dos pilotos com insulina, insulina, bomba e fuso na viagem, tireoide e iodo radioativo, obesidade e os remédios para emagrecer. O formulário de liberação ganhou o bloco dos hormônios.',
    destino: '/capitulo/sistemas/9',
  },
  {
    id: 'mente',
    rotulo: 'Voo disponível',
    titulo: 'Saúde mental e comportamento',
    texto: 'O voo 7 da Missão Sistemas chegou: a mente no voo e o checklist IMSAFE, depressão e ansiedade com os antidepressivos aceitos, bipolar e psicose, com a abordagem do surto a bordo, álcool e as 8 horas antes do voo, avaliação psicológica e apoio por pares. O formulário de liberação ganhou o bloco da saúde mental.',
    destino: '/capitulo/sistemas/7',
  },
  {
    id: 'cerebro',
    rotulo: 'Voo disponível',
    titulo: 'Cérebro e sistema nervoso',
    texto: 'O voo 6 da Missão Sistemas chegou: o cérebro em altitude e o ar preso no crânio, convulsão e epilepsia, desmaio, enxaqueca e o prazo de cada remédio, AVC e AIT, trauma e cirurgia da cabeça, Parkinson, esclerose múltipla e demência. O formulário de liberação ganhou o bloco neurológico.',
    destino: '/capitulo/sistemas/6',
  },
  {
    id: 'orientacao',
    rotulo: 'Voo disponível',
    titulo: 'Labirinto e orientação espacial',
    texto: 'O voo 5 da Missão Sistemas chegou: como o corpo sabe onde está, as ilusões do labirinto e da pista, a desorientação espacial e os 178 segundos na nuvem, prevenção e treino, enjoo de movimento e seus remédios. O formulário de liberação ganhou o bloco da orientação.',
    destino: '/capitulo/sistemas/5',
  },
  {
    id: 'olhos',
    rotulo: 'Voo disponível',
    titulo: 'Olhos e visão',
    texto: 'O voo 4 da Missão Sistemas chegou: a visão em altitude, acuidade e óculos nas três normas, visão noturna, varredura do céu, visão de cores, lasers e óculos de sol, doenças e colírios, e quanto esperar para voar depois de operar os olhos. O formulário de liberação ganhou o bloco dos olhos.',
    destino: '/capitulo/sistemas/4',
  },
  {
    id: 'ouvidos',
    rotulo: 'Voo disponível',
    titulo: 'Ouvidos, seios da face e dentes',
    texto: 'O voo 3 da Missão Sistemas chegou: por que o ouvido dói na descida, barotrauma, cirurgias do ouvido e vertigem, audição nas três normas, sinusite e quanto esperar para voar depois do dentista. O formulário de liberação ganhou o bloco dos ouvidos, seios e dentes.',
    destino: '/capitulo/sistemas/3',
  },
  {
    id: 'sono',
    rotulo: 'Voo disponível',
    titulo: 'Sono, relógio biológico e fadiga',
    texto: 'O voo 8 da Missão Sistemas chegou: o relógio biológico e seus hormônios, jet lag para o leste e para o oeste com plano de prevenção, fadiga, limites de jornada e repouso, remédios para dormir e apneia. O formulário de liberação ganhou o bloco do sono.',
    destino: '/capitulo/sistemas/8',
  },
  {
    id: 'coracao',
    rotulo: 'Voo disponível',
    titulo: 'Coração e vasos sanguíneos',
    texto: 'O voo 2 da Missão Sistemas chegou: pressão alta, infarto e stent, arritmias e marca-passo, válvulas, insuficiência cardíaca e trombose, com os prazos para passageiro e tripulante. O formulário de liberação ganhou o bloco do coração.',
    destino: '/capitulo/sistemas/2',
  },
  {
    id: 'adaptacao',
    rotulo: 'Missão especial',
    titulo: 'Adaptação à altitude',
    texto: 'Como respiração, coração, vasos, sangue e rins respondem à falta de oxigênio, dos primeiros segundos aos meses, e quando a adaptação falha.',
    destino: '/adaptacao',
  },
  {
    id: 'liberacao-voo',
    rotulo: 'Novidade',
    titulo: 'Liberação para voo seguro',
    texto: 'No fim da Missão Sistemas: formulário para passageiro, tripulante e médico especialista, com prazos de repouso e veredito. Cresce a cada voo da missão.',
    destino: '/liberacao-voo',
  },
  {
    id: 'impacto',
    rotulo: 'Voo disponível',
    titulo: 'Impacto e ejeção',
    texto: 'O voo 8 da Missão 1 chegou: tolerância ao impacto, retenção e assentos, ejeção e capacetes. Com 6 interativos e o teste no final.',
    destino: '/capitulo/conceitos/8',
  },
  {
    id: 'forcasg',
    rotulo: 'Voo disponível',
    titulo: 'Forças G',
    texto: 'O voo 7 da Missão 1 chegou: eixos G, G-LOC e A-LOC, manobra anti-G e centrífuga. Com 5 interativos e o teste no final.',
    destino: '/capitulo/conceitos/7',
  },
  {
    id: 'ruido',
    rotulo: 'Voo disponível',
    titulo: 'Ruído e vibração',
    texto: 'O voo 6 da Missão 1 chegou: som e decibel, perda auditiva, limites e proteção, e vibração. Com 5 interativos e o teste no final.',
    destino: '/capitulo/conceitos/6',
  },
  {
    id: 'radiacao',
    rotulo: 'Voo disponível',
    titulo: 'Radiação cósmica',
    texto: 'O voo 5 da Missão 1 chegou: raios cósmicos, dose por rota, riscos e gestação, limites e proteção. Com 4 interativos e o teste no final.',
    destino: '/capitulo/conceitos/5',
  },
  {
    id: 'temperatura',
    rotulo: 'Voo disponível',
    titulo: 'Temperatura e sobrevivência',
    texto: 'O voo 4 da Missão 1 chegou: calor e desidratação, hipotermia e água fria, e as prioridades de sobrevivência. Com 4 simuladores e o teste no final.',
    destino: '/capitulo/conceitos/4',
  },
  {
    id: 'descompressao',
    rotulo: 'Voo disponível',
    titulo: 'Descompressão',
    texto: 'O voo 3 da Missão 1 chegou: tipos de descompressão, doença descompressiva, mergulho e voo, câmaras de pressão. Com 3 simuladores e o teste no final.',
    destino: '/capitulo/conceitos/3',
  },
  {
    id: 'organizacao',
    rotulo: 'Novidade',
    titulo: 'Nova organização das missões',
    texto: 'Agora são Conceitos, Sistemas, Aviação e Espaço: cada tema num só lugar, do básico ao avançado.',
    destino: '/conceitos',
  },
  {
    id: 'hipoxia',
    rotulo: 'Voo disponível',
    titulo: 'Pulmões, oxigênio e hipóxia',
    texto: 'O voo 1 da Missão 2 ganhou asma e DPOC, apneia do sono, pneumotórax e simulação de altitude, com 9 interativos e o teste no final.',
    destino: '/capitulo/sistemas/1',
  },
  {
    id: 'historia',
    rotulo: 'Missão especial',
    titulo: 'O Voo e a Medicina',
    texto: 'Dos balões de 1783 ao turismo espacial, em 5 eras e 21 eventos.',
    destino: '/historia',
  },
  {
    id: 'lab',
    rotulo: 'Laboratório aeroespacial',
    titulo: 'Todos os interativos num só lugar',
    texto: 'Os simuladores, calculadoras e gráficos de todos os voos, por missão, cada um com o voo de origem.',
    destino: '/laboratorio',
  },
  {
    id: 'producao',
    rotulo: 'Em produção',
    titulo: 'Novos voos a caminho',
    texto: 'Os textos dos outros voos estão sendo escritos. Eles aparecem aqui assim que ficarem prontos.',
  },
];
