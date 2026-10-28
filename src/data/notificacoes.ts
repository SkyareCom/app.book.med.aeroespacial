import type { Href } from 'expo-router';

// Novidades do app mostradas em Notificações. Ao incluir uma novidade, aumente VERSAO_NOTIFICACOES
// para o ponto de "não lida" voltar a aparecer no sino.
export const VERSAO_NOTIFICACOES = 4;

export interface Notificacao {
  id: string;
  rotulo: string;
  titulo: string;
  texto: string;
  destino?: Href;
}

export const notificacoes: Notificacao[] = [
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
    titulo: 'Respiração e hipóxia',
    texto: 'O voo 1 da Missão 2 está completo, com 4 interativos e o teste no final.',
    destino: '/capitulo/sistemas/1',
  },
  {
    id: 'historia',
    rotulo: 'Missão especial',
    titulo: 'O Voo e a Medicina',
    texto: 'Dos balões de 1783 ao turismo espacial, em 5 eras e 20 eventos.',
    destino: '/historia',
  },
  {
    id: 'lab',
    rotulo: 'Laboratório aeroespacial',
    titulo: '11 interativos para testar',
    texto: 'Curva do oxigênio, forças G, visão sob hipóxia, radiação e mais.',
    destino: '/laboratorio',
  },
  {
    id: 'producao',
    rotulo: 'Em produção',
    titulo: 'Novos voos a caminho',
    texto: 'Os textos dos outros 39 voos estão sendo escritos. Eles aparecem aqui assim que ficarem prontos.',
  },
];
