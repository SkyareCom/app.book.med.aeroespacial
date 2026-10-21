import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Camadas da atmosfera, fora de escala (as camadas altas são comprimidas para caber).
// Altitudes e temperaturas: ICAO Doc 7488 e US Standard Atmosphere 1976; detalhes no registro de revisão do voo M1V1.
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
    texto: 'O ar é tão rarefeito que quase não há ar. As poucas moléculas absorvem radiação solar e passam de 1.000 °C, mas um termômetro não esquentaria: não há moléculas suficientes para aquecê-lo. A linha de Kármán, a 100 km, é a fronteira convencional do espaço. Aqui ficam as auroras e a órbita da Estação Espacial, a cerca de 400 km.',
  },
  {
    id: 'exosfera', nome: 'Exosfera', de: 600, ate: 700, faixa: 'Acima de cerca de 600 km',
    texto: 'A borda da atmosfera: as moléculas estão tão distantes que escapam aos poucos para o espaço.',
  },
] as const;

type IdCamada = (typeof CAMADAS)[number]['id'];

// Altitude (km) → fração da altura do desenho; as camadas altas são comprimidas.
const PONTOS: [number, number][] = [[0, 0], [12, 0.3], [50, 0.56], [85, 0.72], [600, 0.94], [700, 1]];
function fracao(km: number) {
  for (let i = 1; i < PONTOS.length; i++) {
    const [k0, f0] = PONTOS[i - 1];
    const [k1, f1] = PONTOS[i];
    if (km <= k1) return f0 + ((km - k0) / (k1 - k0)) * (f1 - f0);
  }
  return 1;
}

const ESTRELAS = [[30, 18], [70, 40], [120, 12], [160, 52], [210, 26], [250, 44], [300, 16], [44, 66], [190, 70], [280, 74], [96, 84], [236, 92]];

export function CamadasAtmosfera() {
  const [sel, setSel] = useState<IdCamada>('troposfera');
  const [larg, setLarg] = useState(320);
  const H = 520;
  const chao = H - 40;
  const topo = 8;
  const y = (km: number) => chao - fracao(km) * (chao - topo);
  const xe = 74; // início da coluna das camadas (à esquerda ficam as temperaturas)
  const xd = larg - 6;
  const camada = CAMADAS.find((c) => c.id === sel)!;

  const marco = (km: number, rotulo: string, cor: string = Cores.texto) => (
    <G key={rotulo}>
      <Circle cx={xe + 14} cy={y(km)} r={3} fill={cor} />
      <Line x1={xe + 18} y1={y(km)} x2={xe + 30} y2={y(km)} stroke={cor} strokeOpacity={0.6} />
      <SvgText x={xe + 34} y={y(km) + 3.5} fill={cor} fontSize={10} fontFamily={Fonte}>{rotulo}</SvgText>
    </G>
  );

  return (
    <MolduraMidia tipo="Ilustração" titulo="As camadas da atmosfera" instrucao="Toque em uma camada. As camadas altas estão comprimidas para caber na tela.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Defs>
            <LinearGradient id="ceu" x1="0" y1="1" x2="0" y2="0">
              <Stop offset="0" stopColor="#7EC3F0" />
              <Stop offset="0.28" stopColor="#2F6FB3" />
              <Stop offset="0.5" stopColor="#173C73" />
              <Stop offset="0.72" stopColor="#0B1A3A" />
              <Stop offset="1" stopColor="#03050A" />
            </LinearGradient>
            <LinearGradient id="aurora" x1="0" y1="1" x2="0" y2="0">
              <Stop offset="0" stopColor="#5BD69B" stopOpacity="0.55" />
              <Stop offset="1" stopColor="#5BD69B" stopOpacity="0" />
            </LinearGradient>
          </Defs>

          <Rect x={xe} y={topo} width={xd - xe} height={chao - topo} rx={10} fill="url(#ceu)" />
          {ESTRELAS.map(([sx, sy], i) => (
            <Circle key={i} cx={xe + (sx / 320) * (xd - xe)} cy={topo + sy} r={i % 3 === 0 ? 1.4 : 0.9} fill="#FFFFFF" fillOpacity={0.8} />
          ))}

          {/* Camada de ozônio e auroras */}
          <Rect x={xe} y={y(35)} width={xd - xe} height={y(15) - y(35)} fill={Cores.dourado} fillOpacity={0.12} />
          <Rect x={xe} y={y(300)} width={xd - xe} height={y(100) - y(300)} fill="url(#aurora)" />

          {/* Limites e toque por camada */}
          {CAMADAS.map((c) => (
            <G key={c.id} onPress={() => setSel(c.id)}>
              <Rect x={xe} y={y(c.ate)} width={xd - xe} height={y(c.de) - y(c.ate)} fill="#FFFFFF" fillOpacity={sel === c.id ? 0.08 : 0.001} stroke={sel === c.id ? Cores.destaque : 'none'} strokeWidth={1.5} />
              <Line x1={xe} y1={y(c.ate)} x2={xd} y2={y(c.ate)} stroke="#FFFFFF" strokeOpacity={0.25} strokeDasharray="4 4" />
              <SvgText x={xd - 10} y={(y(c.de) + y(c.ate)) / 2 + 4} fill={sel === c.id ? Cores.destaque : Cores.texto} fontSize={12} fontFamily={Fonte} textAnchor="end">{c.nome.toUpperCase()}</SvgText>
            </G>
          ))}

          {/* Marcos */}
          {marco(8.8, 'Everest · 8,8 km')}
          {marco(11, 'Aviões de linha · 9–12 km', Cores.dourado)}
          {marco(19.2, 'Linha de Armstrong · 19 km', Cores.erro)}
          {marco(25, 'Camada de ozônio', Cores.dourado)}
          {marco(75, 'Meteoros se queimam')}
          {marco(100, 'Linha de Kármán · 100 km', Cores.destaque)}
          {marco(260, 'Auroras', Cores.acerto)}
          {marco(400, 'Estação Espacial · 400 km')}

          {/* Temperaturas (coluna à esquerda) */}
          <SvgText x={4} y={y(0) - 2} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte}>15 °C</SvgText>
          <SvgText x={4} y={y(12) + 4} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte}>−56,5 °C</SvgText>
          <SvgText x={4} y={y(50) + 4} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte}>0 °C</SvgText>
          <SvgText x={4} y={y(85) + 4} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte}>−86 °C</SvgText>
          <SvgText x={4} y={y(400) + 4} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte}>+1.000 °C</SvgText>
          <SvgText x={4} y={topo + 12} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte}>TEMP.</SvgText>

          {/* Terra */}
          <Path d={`M${xe} ${chao + 30}Q${(xe + xd) / 2} ${chao - 16} ${xd} ${chao + 30}Z`} fill="#0E2A1E" />
          <Path d={`M${xe} ${chao + 30}Q${(xe + xd) / 2} ${chao - 16} ${xd} ${chao + 30}`} stroke="#7EC3F0" strokeWidth={2} fill="none" />
          <SvgText x={(xe + xd) / 2} y={H - 6} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">SUPERFÍCIE DA TERRA</SvgText>
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
  painel: { gap: 6, padding: Espaco.md, borderRadius: 10, borderWidth: 1, borderColor: Cores.linha },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Espaco.sm },
});
