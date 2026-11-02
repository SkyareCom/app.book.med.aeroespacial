import type { Href } from 'expo-router';

// Novidades do app mostradas em Notificações. Ao incluir uma novidade, aumente VERSAO_NOTIFICACOES
// para o ponto de "não lida" voltar a aparecer no sino.
export const VERSAO_NOTIFICACOES = 12;

export interface Notificacao {
  id: string;
  rotulo: string;
  titulo: string;
  texto: string;
  destino?: Href;
}

export const notificacoes: Notificacao[] = [
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
