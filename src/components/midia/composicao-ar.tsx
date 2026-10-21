import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

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

// Arco de rosca entre dois ângulos (em voltas, 0 = topo, sentido horário).
function arco(cx: number, cy: number, r: number, esp: number, a0: number, a1: number) {
  const p = (a: number, rr: number) => [cx + rr * Math.sin(a * 2 * Math.PI), cy - rr * Math.cos(a * 2 * Math.PI)];
  const grande = a1 - a0 > 0.5 ? 1 : 0;
  const [x0, y0] = p(a0, r);
  const [x1, y1] = p(a1, r);
  const [x2, y2] = p(a1, r - esp);
  const [x3, y3] = p(a0, r - esp);
  return `M${x0} ${y0}A${r} ${r} 0 ${grande} 1 ${x1} ${y1}L${x2} ${y2}A${r - esp} ${r - esp} 0 ${grande} 0 ${x3} ${y3}Z`;
}

export function ComposicaoAr() {
  const [sel, setSel] = useState<(typeof GASES)[number]['id']>('o2');
  const [alt, setAlt] = useState(0);
  const pb = pressaoBarometrica(alt);
  const escala = Math.sqrt(pb / 760); // área da rosca proporcional à pressão: menos ar, mesma receita
  const R = 96 * escala;
  const esp = Math.max(14, 34 * escala);
  const gas = GASES.find((g) => g.id === sel)!;

  // Fatias visíveis: as menores ganham um mínimo de ângulo só para poderem ser tocadas.
  const minimo = 0.012;
  const pesos = GASES.map((g) => Math.max(g.pct / 100, minimo));
  const soma = pesos.reduce((a, b) => a + b, 0);
  let acc = 0;
  const fatias = GASES.map((g, i) => {
    const a0 = acc;
    acc += pesos[i] / soma;
    return { g, a0, a1: acc };
  });

  return (
    <MolduraMidia tipo="Gráfico" titulo="Do que é feito o ar" instrucao="Toque em cada gás. Depois suba de altitude: a receita do ar continua igual, só há menos ar.">
      <View style={styles.centro}>
        <Svg width={220} height={220}>
          <Circle cx={110} cy={110} r={96} stroke={Cores.trilha} strokeDasharray="3 5" fill="none" />
          <G>
            {fatias.map(({ g, a0, a1 }) => (
              <Path
                key={g.id}
                d={arco(110, 110, R, esp, a0 + 0.002, a1 - 0.002)}
                fill={g.cor}
                fillOpacity={sel === g.id ? 1 : 0.55}
                onPress={() => setSel(g.id)}
              />
            ))}
          </G>
          <SvgText x={110} y={106} fill={Cores.texto} fontSize={18} fontFamily={Fonte} textAnchor="middle">{fmt(gas.pct, 2)}%</SvgText>
          <SvgText x={110} y={124} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">{gas.id === 'co2' ? 'CO₂ E OUTROS' : gas.nome.split(' ')[0].toUpperCase()}</SvgText>
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
