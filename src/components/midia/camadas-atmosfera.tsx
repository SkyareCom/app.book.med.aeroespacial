import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Camadas da atmosfera sobre uma imagem fotográfica do horizonte da Terra (gerada por IA, sem escala).
// As camadas altas são comprimidas para caber; a posição de cada uma acompanha as faixas da foto
// (brilho laranja e azul-claro perto do horizonte, meteoros, auroras e estrelas acima).
// Altitudes e temperaturas: ICAO Doc 7488 e US Standard Atmosphere 1976; detalhes no registro de revisão do voo M1V1.
const FOTO = require('@/assets/images/cenas/camadas.jpg');
const PROPORCAO_FOTO = 1366 / 1100; // altura / largura

const CAMADAS = [
  {
    id: 'troposfera', nome: 'Troposfera', de: 0, ate: 12, faixa: 'Do chão a 8–18 km',
    texto: 'Vai do chão até a tropopausa, a cerca de 8 a 9 km nos polos e 16 a 18 km no equador (11 km na atmosfera padrão). Guarda a maior parte do ar e quase todo o vapor d’água: é onde se formam nuvens e tempo, e onde voa a aviação comercial. A temperatura cai cerca de 2 °C a cada 1.000 ft, até cerca de −56,5 °C.',
  },
  {
    id: 'estratosfera', nome: 'Estratosfera', de: 12, ate: 50, faixa: 'Até cerca de 50 km',
    texto: 'Ar seco e estável, quase sem nuvens. Abriga a camada de ozônio, entre cerca de 15 e 35 km, que absorve a radiação ultravioleta e aquece a camada: a temperatura volta a subir, até perto de 0 °C no topo. O Concorde voava na parte baixa, a cerca de 60.000 ft.',
  },
  {
    id: 'mesosfera', nome: 'Mesosfera', de: 50, ate: 85, faixa: '50 a 85 km',
    texto: 'A camada mais fria da atmosfera, com cerca de −86 °C no topo. É onde a maioria dos meteoros se queima. Alta demais para aviões e baixa demais para satélites.',
  },
  {
    id: 'termosfera', nome: 'Termosfera', de: 85, ate: 600, faixa: '85 a cerca de 600 km',
    texto: 'O ar é extremamente rarefeito. As poucas moléculas absorvem radiação solar e passam de 1.000 °C, mas um termômetro não esquentaria: não há moléculas suficientes para aquecê-lo. A linha de Kármán, a 100 km, é a fronteira convencional do espaço. Aqui ficam as auroras e a órbita da Estação Espacial, a cerca de 400 km.',
  },
  {
    id: 'exosfera', nome: 'Exosfera', de: 600, ate: 700, faixa: 'Acima de cerca de 600 km',
    texto: 'A borda da atmosfera: as moléculas estão tão distantes que escapam aos poucos para o espaço.',
  },
] as const;

type IdCamada = (typeof CAMADAS)[number]['id'];

// Altitude (km) → posição na foto (fração da altura, de cima para baixo).
// Cada camada tem uma faixa própria, com espaço para os marcos ficarem dentro da camada certa.
// A foto é casada em três pontos: o horizonte (chão), os meteoros (mesosfera) e a aurora (termosfera).
const PONTOS: [number, number][] = [[0, 0.678], [12, 0.592], [50, 0.52], [85, 0.43], [100, 0.415], [260, 0.38], [400, 0.34], [600, 0.3], [700, 0.25]];
function naFoto(km: number) {
  for (let i = 1; i < PONTOS.length; i++) {
    const [k0, f0] = PONTOS[i - 1];
    const [k1, f1] = PONTOS[i];
    if (km <= k1) return f0 + ((km - k0) / (k1 - k0)) * (f1 - f0);
  }
  return PONTOS[PONTOS.length - 1][1];
}
// A foto começa logo acima da exosfera e é enquadrada à direita do centro, onde estão a aurora e os meteoros.
const CORTE_TOPO = 0.243;
const CENTRO_X = 0.62;

const MARCOS: { km: number; rotulo: string; cor: string }[] = [
  { km: 8.8, rotulo: 'Everest · 8,8 km', cor: Cores.texto },
  { km: 10.5, rotulo: 'Aviões de linha · 9–12 km', cor: Cores.dourado },
  { km: 19.2, rotulo: 'Linha de Armstrong · 19 km', cor: '#FF8A7A' },
  { km: 28, rotulo: 'Camada de ozônio', cor: Cores.dourado },
  { km: 75, rotulo: 'Meteoros se queimam', cor: Cores.texto },
  { km: 100, rotulo: 'Linha de Kármán · 100 km', cor: Cores.destaque },
  { km: 260, rotulo: 'Auroras', cor: '#7DF0B4' },
  { km: 400, rotulo: 'Estação Espacial · 400 km', cor: Cores.texto },
];

// Temperatura nos limites entre as camadas (e uma na termosfera).
const TEMPERATURAS: [number, string][] = [[0, '15 °C'], [12, '−56,5 °C'], [50, '0 °C'], [85, '−86 °C'], [520, '+1.000 °C']];

// Texto sobre a foto com uma tarja escura atrás, para ler bem em qualquer faixa do céu.
function Rotulo({ x, y, texto, cor, tam = 10, fim = false }: { x: number; y: number; texto: string; cor: string; tam?: number; fim?: boolean }) {
  const w = texto.length * tam * 0.5 + 12;
  const h = tam + 5;
  const x0 = fim ? x - w + 6 : x - 6;
  return (
    <G>
      <Rect x={x0} y={y - h / 2} width={w} height={h} rx={h / 2} fill="#03050A" fillOpacity={0.62} />
      <SvgText x={x} y={y + tam * 0.36} fill={cor} fontSize={tam} fontFamily={Fonte} textAnchor={fim ? 'end' : 'start'}>{texto}</SvgText>
    </G>
  );
}

export function CamadasAtmosfera() {
  const [sel, setSel] = useState<IdCamada>('troposfera');
  const [larg, setLarg] = useState(320);
  // Altura da foto escolhida para as camadas baixas terem espaço; a largura sobra e é cortada.
  const alturaFoto = Math.max(1392, larg * PROPORCAO_FOTO);
  const larguraFoto = alturaFoto / PROPORCAO_FOTO;
  const esquerdaFoto = Math.min(0, Math.max(larg - larguraFoto, larg / 2 - CENTRO_X * larguraFoto));
  const y = (km: number) => (naFoto(km) - CORTE_TOPO) * alturaFoto;
  const chao = y(0);
  const H = Math.round(chao + 40);
  const xe = 84; // coluna da esquerda: nomes das camadas
  const camada = CAMADAS.find((c) => c.id === sel)!;

  return (
    <MolduraMidia tipo="Ilustração" titulo="As camadas da atmosfera" instrucao="Toque em uma camada. As camadas altas estão comprimidas para caber na tela.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={[styles.quadro, { height: H }]}>
        <Image source={FOTO} contentFit="cover" style={{ position: 'absolute', top: -CORTE_TOPO * alturaFoto, left: esquerdaFoto, width: larguraFoto, height: alturaFoto }} />
        <Svg width={larg} height={H} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="veu" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#03050A" stopOpacity={0.75} />
              <Stop offset="0.7" stopColor="#03050A" stopOpacity={0.35} />
              <Stop offset="1" stopColor="#03050A" stopOpacity={0} />
            </LinearGradient>
          </Defs>
          {/* Véu escuro à esquerda, sob os nomes das camadas */}
          <Rect x={0} y={0} width={xe + 16} height={H} fill="url(#veu)" />

          {/* Camada de ozônio (15 a 35 km) */}
          <Rect x={xe} y={y(35)} width={larg - xe} height={y(15) - y(35)} fill={Cores.dourado} fillOpacity={0.14} />

          {/* Faixas das camadas: toque, limite e nome */}
          {CAMADAS.map((c) => {
            const ativa = sel === c.id;
            return (
              <G key={c.id} onPress={() => setSel(c.id)}>
                <Rect x={1} y={y(c.ate)} width={larg - 2} height={y(c.de) - y(c.ate)} fill="#FFFFFF" fillOpacity={ativa ? 0.08 : 0.001} stroke={ativa ? Cores.destaque : 'none'} strokeWidth={1.5} rx={4} />
                <Line x1={0} y1={y(c.ate)} x2={larg} y2={y(c.ate)} stroke="#FFFFFF" strokeOpacity={0.45} strokeDasharray="4 4" />
                <SvgText x={8} y={(y(c.de) + y(c.ate)) / 2 + 4} fill={ativa ? Cores.destaque : Cores.texto} fontSize={11} fontFamily={Fonte}>{c.nome.toUpperCase()}</SvgText>
              </G>
            );
          })}

          {/* Marcos, cada um na sua altitude, dentro da camada */}
          {MARCOS.map((m) => (
            <G key={m.rotulo}>
              <Circle cx={xe + 6} cy={y(m.km)} r={3} fill={m.cor} stroke="#03050A" strokeWidth={1} />
              <Rotulo x={xe + 20} y={y(m.km)} texto={m.rotulo} cor={m.cor} />
            </G>
          ))}

          {/* Temperaturas, à direita, sobre os limites */}
          {TEMPERATURAS.map(([km, t]) => (
            <Rotulo key={t} x={larg - 8} y={km === 0 ? chao - 10 : y(km)} texto={t} cor={Cores.textoSuave} tam={9} fim />
          ))}

          <SvgText x={larg / 2} y={H - 10} fill={Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="middle">SUPERFÍCIE DA TERRA</SvgText>
        </Svg>
      </View>

      <View style={styles.painel}>
        <View style={styles.linha}>
          <Texto t="item" cor={Cores.destaque}>{camada.nome}</Texto>
          <Texto t="rotulo" cor={Cores.textoApagado}>{camada.faixa}</Texto>
        </View>
        <Texto cor={Cores.textoSuave}>{camada.texto}</Texto>
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  quadro: { overflow: 'hidden', borderRadius: 10, backgroundColor: '#03050A' },
  painel: { gap: 6, padding: Espaco.md, borderRadius: 10, borderWidth: 1, borderColor: Cores.linha },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Espaco.sm },
});
