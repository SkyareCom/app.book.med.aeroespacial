import type { Href } from 'expo-router';

// Novidades do app mostradas em Notificações. Ao incluir uma novidade, aumente VERSAO_NOTIFICACOES
// para o ponto de "não lida" voltar a aparecer no sino.
export const VERSAO_NOTIFICACOES = 1;

export interface Notificacao {
  id: string;
  rotulo: string;
  titulo: string;
  texto: string;
  destino?: Href;
}

export const notificacoes: Notificacao[] = [
  {
    id: 'hipoxia',
    rotulo: 'Voo disponível',
    titulo: 'Respiração e hipóxia',
    texto: 'O voo 3 da Missão 1 está completo, com 4 interativos e o teste no final.',
    destino: '/capitulo/fisiologia/3',
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
    texto: 'Os textos dos outros 49 voos estão sendo escritos. Eles aparecem aqui assim que ficarem prontos.',
  },
];
