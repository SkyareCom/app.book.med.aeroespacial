// Registro único dos cards especiais e das ferramentas do app (02/11/2026, varredura pedida pelo autor).
// Home, páginas das missões, páginas dos voos e as próprias páginas especiais leem daqui: o mesmo card, com a mesma
// capa, o mesmo título, a mesma sinopse e os números calculados dos dados, aparece igual em todas as telas.
// Cada item lista os voos ligados a ele; a ligação vale nos dois sentidos (o voo mostra o card, o card mostra o voo).

import type { Href } from 'expo-router';

import { ArteAdaptacao, ArteDeficiencias, ArteEspecialVoo, ArteExameCMA, ArteLiberacao } from '@/constants/capas';
import { Imagens } from '@/constants/imagens';
import { fasesAdaptacao } from '@/data/adaptacao';
import { fasesDeficiencias } from '@/data/deficiencias';
import { eras } from '@/data/historia';
import { secoes } from '@/data/secoes';
import type { SecaoId } from '@/data/tipos';
import { SISTEMAS } from '@/lib/cma';
import { catalogoLab } from '@/lib/laboratorio';

export type IdEspecial = 'historia' | 'adaptacao' | 'deficiencias' | 'laboratorio' | 'exame-cma' | 'liberacao-voo' | 'curiosidades' | 'referencias';

export interface Especial {
  id: IdEspecial;
  rota: Href;
  tipo: string; // selo do card
  titulo: string;
  sinopse: string;
  imagem: number;
  meta: () => string;
  voos: string[]; // chaves 'secao-numero' ligadas a este card
  missoes: SecaoId[]; // páginas de missão que mostram o card
}

const blocosLiberacao = () => secoes.find((s) => s.id === 'sistemas')!.capitulos.filter((c) => c.liberacao?.length);
const perguntasLiberacao = () => blocosLiberacao().reduce((n, c) => n + (c.liberacao?.length ?? 0), 0);
const topicosLiberacao = () => blocosLiberacao().reduce((n, c) => n + c.topicos.length, 0);

export const ESPECIAIS: Especial[] = [
  {
    id: 'historia',
    rota: '/historia',
    tipo: 'Missão especial',
    titulo: 'O Voo e a Medicina',
    sinopse: 'Dos balões de 1783 ao turismo espacial: como cada conquista do céu revelou um novo limite do corpo humano.',
    imagem: ArteEspecialVoo,
    meta: () => `${eras.length} eras · ${eras.reduce((n, e) => n + e.eventos.length, 0)} eventos`,
    voos: ['conceitos-1', 'conceitos-2', 'conceitos-7', 'conceitos-8', 'sistemas-1'],
    missoes: ['conceitos', 'espaco'],
  },
  {
    id: 'adaptacao',
    rota: '/adaptacao',
    tipo: 'Missão especial',
    titulo: 'Adaptação à altitude',
    sinopse: 'Como respiração, coração, vasos, sangue e rins respondem à falta de oxigênio, dos primeiros segundos aos meses, e quando a adaptação falha.',
    imagem: ArteAdaptacao,
    meta: () => `${fasesAdaptacao.length} fases · ${catalogoLab().filter((i) => i.capa === 'adaptacao').length} interativos`,
    voos: ['conceitos-1', 'conceitos-2', 'sistemas-1', 'sistemas-2'],
    missoes: ['conceitos', 'sistemas'],
  },
  {
    id: 'deficiencias',
    rota: '/deficiencias',
    tipo: 'Missão especial',
    titulo: 'Deficiências e o voo',
    sinopse: 'Amputações, cadeira de rodas, cegueira e cão-guia, visão monocular, surdez, autismo e deficiências ocultas: o que muda para o passageiro e o caminho do tripulante até o certificado médico.',
    imagem: ArteDeficiencias,
    meta: () => `${fasesDeficiencias.length} tópicos · ${catalogoLab().filter((i) => i.capa === 'deficiencias').length} interativos`,
    voos: ['sistemas-3', 'sistemas-4', 'sistemas-7'],
    missoes: ['sistemas', 'aviacao'],
  },
  {
    id: 'laboratorio',
    rota: '/laboratorio',
    tipo: 'Laboratório aeroespacial',
    titulo: 'Simule o corpo em voo',
    sinopse: 'Todos os simuladores, calculadoras e gráficos do app num só lugar, cada um ligado ao voo onde aparece.',
    imagem: Imagens.lab,
    meta: () => `${catalogoLab().length} interativos`,
    voos: [],
    missoes: [],
  },
  {
    id: 'exame-cma',
    rota: '/exame-cma',
    tipo: 'Ferramenta do examinador',
    titulo: 'Exame CMA',
    sinopse: 'Certificado Médico Aeronáutico: formulário por sistema pelo RBAC 67, o que muda na FAA e na ICAO, remédios e veredito.',
    imagem: ArteExameCMA,
    meta: () => `${SISTEMAS.length} sistemas · ANAC, FAA e ICAO`,
    voos: ['aviacao-1', 'aviacao-2'],
    missoes: ['aviacao', 'sistemas'],
  },
  {
    id: 'liberacao-voo',
    rota: '/liberacao-voo',
    tipo: 'Formulário',
    titulo: 'Liberação para voo seguro',
    sinopse: 'Para passageiro, tripulante e médico especialista: perguntas de todos os tópicos de cada sistema, prazos de repouso e um veredito com comentário.',
    imagem: ArteLiberacao,
    meta: () => (blocosLiberacao().length === 1 ? `${perguntasLiberacao()} perguntas · ${topicosLiberacao()} tópicos · 1 sistema` : `${perguntasLiberacao()} perguntas · ${topicosLiberacao()} tópicos · ${blocosLiberacao().length} sistemas`),
    voos: [],
    missoes: ['sistemas', 'aviacao'],
  },
  {
    id: 'curiosidades',
    rota: '/curiosidades',
    tipo: 'Curiosidades aeronáuticas',
    titulo: 'O corpo no céu e no espaço',
    sinopse: 'Números, recordes e fenômenos que mostram até onde o corpo humano vai quando sai do chão.',
    imagem: Imagens.curiosidades,
    meta: () => 'Fatos curtos',
    voos: [],
    missoes: [],
  },
  {
    id: 'referencias',
    rota: '/referencias',
    tipo: 'Referências',
    titulo: 'Obras e normas',
    sinopse: 'As obras e as autoridades que embasam todo o conteúdo do app.',
    imagem: Imagens.hero,
    meta: () => 'Lista completa',
    voos: [],
    missoes: [],
  },
];

// Voos com bloco no formulário de liberação também ficam ligados a ele.
export function voosDoEspecial(e: Especial): string[] {
  if (e.id === 'liberacao-voo') return blocosLiberacao().map((c) => `sistemas-${c.numero}`);
  return e.voos;
}

export function obterEspecial(id: IdEspecial) {
  return ESPECIAIS.find((e) => e.id === id)!;
}

export function especiaisDoVoo(chave: string) {
  return ESPECIAIS.filter((e) => voosDoEspecial(e).includes(chave));
}

export function especiaisDaMissao(id: SecaoId) {
  return ESPECIAIS.filter((e) => e.missoes.includes(id));
}

// Ligações entre os próprios especiais (mostradas no fim de cada página especial).
export const RELACIONADOS: Partial<Record<IdEspecial, IdEspecial[]>> = {
  historia: ['adaptacao', 'laboratorio'],
  adaptacao: ['historia', 'deficiencias', 'liberacao-voo', 'laboratorio'],
  deficiencias: ['liberacao-voo', 'exame-cma', 'adaptacao'],
  'exame-cma': ['liberacao-voo', 'referencias'],
  'liberacao-voo': ['exame-cma', 'deficiencias', 'adaptacao', 'referencias'],
  laboratorio: ['adaptacao', 'historia'],
  curiosidades: ['historia', 'laboratorio'],
  referencias: ['exame-cma', 'liberacao-voo'],
};
