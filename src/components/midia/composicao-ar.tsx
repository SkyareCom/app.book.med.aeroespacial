import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Defs, Ellipse, G, Line, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';
import { pesParaMetros, pressaoBarometrica } from '@/lib/fisiologia';

// Composição do ar seco (fração de volume). Fontes no registro de revisão do voo M1V1.
const GASES = [
  { id: 'n2', nome: 'Nitrogênio (N₂)', pct: 78.08, cor: '#6FD3FF', texto: 'Quase quatro quintos do ar. O corpo não o usa para respirar, mas ele se dissolve no sangue e nos tecidos e volta a ser gás quando a pressão cai, a base da doença descompressiva.' },
  { id: 'o2', nome: 'Oxigênio (O₂)', pct: 20.95, cor: '#E8C46A', texto: 'O gás da vida. Cada célula depende dele para produzir energia; o que muda com a altitude não é a porcentagem, é a pressão que o empurra para dentro do sangue.' },
  { id: 'ar', nome: 'Argônio (Ar)', pct: 0.93, cor: '#B28DFF', texto: 'Gás nobre, inerte: entra e sai dos pulmões sem participar de nenhuma reação no corpo.' },
  { id: 'co2', nome: 'Gás carbônico e outros', pct: 0.04, cor: '#5BD69B', texto: 'Cerca de 0,04% de gás carbônico, mais traços de neônio, hélio e outros. No corpo, o gás carbônico é o principal regulador da respiração.' },
] as const;

const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

// Ponto na borda da elipse para uma fração de volta (0 = topo, sentido horário).
const ponto = (cx: number, cy: number, rx: number, ry: number, t: number): [number, number] => [cx + rx * Math.sin(t * 2 * Math.PI), cy - ry * Math.cos(t * 2 * Math.PI)];

// Cores 3D: topo claro e lateral escura de cada gás.
const LATERAL: Record<string, string> = { n2: '#2C7FAE', o2: '#A9852E', ar: '#6F52B8', co2: '#2E8F62' };

export function ComposicaoAr() {
  const [sel, setSel] = useState<(typeof GASES)[number]['id']>('o2');
  const [alt, setAlt] = useState(0);
  const pb = pressaoBarometrica(alt);
  const gas = GASES.find((g) => g.id === sel)!;
  const [larg, setLarg] = useState(320);

  // Pizza 3D: o tamanho acompanha a pressão do ar (menos ar, mesma receita); as fatias, as proporções reais.
  const escala = Math.max(0.55, Math.sqrt(pb / 760));
  const rx = Math.min(larg / 2 - 20, 150) * escala;
  const ry = rx * 0.52;
  const prof = 30 * escala;
  const ryMax = 0.52 * Math.min(larg / 2 - 20, 150);
  const cx = larg / 2;
  const cy = 44 + ryMax;
  const H = cy + ryMax + 30 + 22;

  let acc = 0;
  const fatias = GASES.map((g) => {
    const a0 = acc;
    acc += g.pct / 100;
    return { g, a0, a1: acc, meio: (a0 + acc) / 2 };
  });
  // Fatia escolhida sai do conjunto, como na apresentação de um gráfico de cinema.
  const deslocar = (meio: number, id: string) => (id === sel ? [Math.sin(meio * 2 * Math.PI) * 12, -Math.cos(meio * 2 * Math.PI) * 6] : [0, 0]);

  const topo = (x: number, y: number, a0: number, a1: number) => {
    const [x0, y0] = ponto(x, y, rx, ry, a0);
    const [x1, y1] = ponto(x, y, rx, ry, a1);
    return `M${x} ${y}L${x0} ${y0}A${rx} ${ry} 0 ${a1 - a0 > 0.5 ? 1 : 0} 1 ${x1} ${y1}Z`;
  };
  // Parede lateral só na metade da frente (de 1/4 a 3/4 de volta).
  const lateral = (x: number, y: number, a0: number, a1: number) => {
    const b0 = Math.max(a0, 0.25);
    const b1 = Math.min(a1, 0.75);
    if (b1 <= b0) return null;
    const [x0, y0] = ponto(x, y, rx, ry, b0);
    const [x1, y1] = ponto(x, y, rx, ry, b1);
    return `M${x0} ${y0}A${rx} ${ry} 0 0 1 ${x1} ${y1}L${x1} ${y1 + prof}A${rx} ${ry} 0 0 0 ${x0} ${y0 + prof}Z`;
  };
  const fatiaPeq = (id: string) => id === 'ar' || id === 'co2';

  return (
    <MolduraMidia tipo="Gráfico" titulo="Do que é feito o ar" instrucao="Toque em cada gás. Depois suba de altitude: a pizza encolhe com a pressão, mas as fatias continuam iguais.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Defs>
            {GASES.map((g) => (
              <LinearGradient key={g.id} id={`topo-${g.id}`} x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.35} />
                <Stop offset="0.35" stopColor={g.cor} stopOpacity={1} />
                <Stop offset="1" stopColor={g.cor} stopOpacity={0.85} />
              </LinearGradient>
            ))}
          </Defs>
          <Ellipse cx={cx} cy={cy + prof + 10} rx={rx * 1.02} ry={ry * 0.9} fill="#000000" fillOpacity={0.45} />
          {fatias.map(({ g, a0, a1, meio }) => {
            const [dx, dy] = deslocar(meio, g.id);
            const d = lateral(cx + dx, cy + dy, a0, a1);
            return d ? <Path key={`l-${g.id}`} d={d} fill={LATERAL[g.id]} onPress={() => setSel(g.id)} /> : null;
          })}
          {fatias.map(({ g, a0, a1, meio }) => {
            const [dx, dy] = deslocar(meio, g.id);
            return (
              <Path key={`t-${g.id}`} d={topo(cx + dx, cy + dy, a0, a1)} fill={`url(#topo-${g.id})`} stroke="#03050A" strokeOpacity={0.5} strokeWidth={0.8} onPress={() => setSel(g.id)} />
            );
          })}
          {fatias.filter(({ g }) => !fatiaPeq(g.id)).map(({ g, meio }) => {
            const [dx, dy] = deslocar(meio, g.id);
            const [tx, ty] = ponto(cx + dx, cy + dy, rx * 0.58, ry * 0.58, meio);
            return (
              <G key={`r-${g.id}`}>
                <SvgText x={tx} y={ty} fill="#03050A" fontSize={18} fontFamily={Fonte} textAnchor="middle">{fmt(g.pct, 2)}%</SvgText>
                <SvgText x={tx} y={ty + 14} fill="#03050A" fontSize={10} fontFamily={Fonte} textAnchor="middle">{g.id === 'n2' ? 'NITROGÊNIO' : 'OXIGÊNIO'}</SvgText>
              </G>
            );
          })}
          {/* Chamadas para as fatias finas (argônio e gás carbônico), no topo da pizza */}
          {fatias.filter(({ g }) => fatiaPeq(g.id)).map(({ g, meio }, i) => {
            const [dx, dy] = deslocar(meio, g.id);
            const [px, py] = ponto(cx + dx, cy + dy, rx, ry, meio);
            const lx = cx + 34;
            const ly = 8 + i * 16;
            return (
              <G key={`c-${g.id}`} onPress={() => setSel(g.id)}>
                <Line x1={px} y1={py} x2={lx - 4} y2={ly + 1} stroke={g.cor} strokeWidth={1} />
                <SvgText x={lx} y={ly + 4} fill={g.cor} fontSize={10} fontFamily={Fonte} textAnchor="start">{g.id === 'ar' ? 'ARGÔNIO' : 'CO₂ E OUTROS'} {fmt(g.pct, 2)}%</SvgText>
              </G>
            );
          })}
        </Svg>
      </View>

      <View style={styles.legenda}>
        {GASES.map((g) => (
          <Pressable key={g.id} accessibilityRole="button" accessibilityState={{ selected: sel === g.id }} onPress={() => setSel(g.id)} style={[styles.item, sel === g.id && { borderColor: g.cor }]}>
            <View style={[styles.ponto, { backgroundColor: g.cor }]} />
            <Texto style={{ flex: 1 }} cor={Cores.texto}>{g.nome}</Texto>
            <Texto cor={Cores.textoSuave} style={{ fontVariant: ['tabular-nums'] }}>{fmt(g.pct, 2)}%</Texto>
          </Pressable>
        ))}
      </View>
      <Texto cor={Cores.textoSuave}>{gas.texto}</Texto>

      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Altitude</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(alt)} ft · {fmt(pesParaMetros(alt))} m</Texto>
        </View>
        <Deslizante min={0} max={40000} passo={1000} valor={alt} onChange={setAlt} rotulo="Altitude em pés" formatar={(v) => `${fmt(v)} pés`} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Oxigênio no ar" valor="20,95%" />
        <Leitura rotulo="Pressão do ar" valor={`${fmt(pb)} mmHg`} />
        <Leitura rotulo="Pressão do oxigênio" valor={`${fmt(pb * 0.2095)} mmHg`} cor={Cores.dourado} />
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  centro: { alignItems: 'center' },
  legenda: { gap: 6 },
  item: { flexDirection: 'row', alignItems: 'center', gap: Espaco.sm, minHeight: 40, paddingHorizontal: Espaco.md, borderRadius: 10, borderWidth: 1, borderColor: Cores.linha },
  ponto: { width: 10, height: 10, borderRadius: 5 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
});
