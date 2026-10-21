import type { ReactElement } from 'react';

import { AtividadeClassificar } from '@/components/midia/atividade-classificar';
import { CamadasAtmosfera } from '@/components/midia/camadas-atmosfera';
import { ComposicaoAr } from '@/components/midia/composicao-ar';
import { GasesNoCorpo } from '@/components/midia/gases-corpo';
import { GraficoBoyle, GraficoCharles, GraficoDalton, GraficoHenry } from '@/components/midia/leis-gases-graficos';
import { GraficoTUC } from '@/components/midia/grafico-tuc';
import { AdaptacaoEscuro, LeisDosGases, PerdaOssea, RadiacaoVoo, ReguaRuido, RiscoAeromedico, SimuladorForcasG } from '@/components/midia/laboratorios';
import { SimuladorO2 } from '@/components/midia/simulador-o2';
import { SimuladorVisao } from '@/components/midia/simulador-visao';
import type { TipoMidia } from '@/data/tipos';

const CASOS_HIPOXIA = [
  { texto: 'Um piloto sobe a 14.000 pés sem oxigênio suplementar.', resposta: 'Hipóxica', explicacao: 'O ar rarefeito reduz a pressão parcial de oxigênio inspirado.' },
  { texto: 'Num monomotor, o aquecedor da cabine deixa passar gás do escapamento.', resposta: 'Hipêmica', explicacao: 'O monóxido de carbono ocupa a hemoglobina, que passa a carregar menos oxigênio.' },
  { texto: 'Numa curva a 6 G, a visão do piloto de caça fica cinza.', resposta: 'Estagnante', explicacao: 'O sangue é empurrado para longe da cabeça e a circulação no olho e no cérebro cai.' },
  { texto: 'Uma comissária com anemia importante sente falta de ar em voo.', resposta: 'Hipêmica', explicacao: 'Com menos hemoglobina, o sangue transporta menos oxigênio.' },
  { texto: 'Num incêndio a bordo, a fumaça contém cianeto.', resposta: 'Histotóxica', explicacao: 'O cianeto impede as células de usar o oxigênio que chega até elas.' },
  { texto: 'Após muito álcool na noite anterior, o piloto tolera menos a altitude.', resposta: 'Histotóxica', explicacao: 'O álcool prejudica o uso do oxigênio pelas células.' },
];

export const MIDIAS: Record<TipoMidia, () => ReactElement> = {
  'simulador-o2': () => <SimuladorO2 />,
  'simulador-visao': () => <SimuladorVisao />,
  'grafico-tuc': () => <GraficoTUC />,
  'classificar-hipoxia': () => <AtividadeClassificar titulo="Qual é o tipo de hipóxia?" categorias={['Hipóxica', 'Hipêmica', 'Estagnante', 'Histotóxica']} casos={CASOS_HIPOXIA} />,
  'leis-gases': () => <LeisDosGases />,
  'forcas-g': () => <SimuladorForcasG />,
  'adaptacao-escuro': () => <AdaptacaoEscuro />,
  'regua-ruido': () => <ReguaRuido />,
  'radiacao-voo': () => <RadiacaoVoo />,
  'risco-aeromedico': () => <RiscoAeromedico />,
  'perda-ossea': () => <PerdaOssea />,
  'composicao-ar': () => <ComposicaoAr />,
  'camadas-atmosfera': () => <CamadasAtmosfera />,
  'gases-corpo': () => <GasesNoCorpo />,
  'grafico-boyle': () => <GraficoBoyle />,
  'grafico-dalton': () => <GraficoDalton />,
  'grafico-henry': () => <GraficoHenry />,
  'grafico-charles': () => <GraficoCharles />,
};

export const NOME_MIDIA: Record<TipoMidia, string> = {
  'simulador-o2': 'Curva do oxigênio',
  'simulador-visao': 'Visão sob hipóxia',
  'grafico-tuc': 'Tempo de consciência útil',
  'classificar-hipoxia': 'Tipos de hipóxia',
  'leis-gases': 'Gases em expansão',
  'forcas-g': 'Forças G',
  'adaptacao-escuro': 'Visão no escuro',
  'regua-ruido': 'Ruído e audição',
  'radiacao-voo': 'Radiação por voo',
  'risco-aeromedico': 'Regra do 1%',
  'perda-ossea': 'Perda óssea no espaço',
  'composicao-ar': 'Composição do ar',
  'camadas-atmosfera': 'Camadas da atmosfera',
  'gases-corpo': 'Gases no corpo em voo',
  'grafico-boyle': 'Lei de Boyle',
  'grafico-dalton': 'Lei de Dalton',
  'grafico-henry': 'Lei de Henry',
  'grafico-charles': 'Lei de Charles',
};

export function Midia({ tipo }: { tipo: TipoMidia }) {
  return MIDIAS[tipo]();
}
