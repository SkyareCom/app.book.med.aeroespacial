import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';
import { pesParaMetros, po2Alveolar, po2Inspirado, pressaoBarometrica, saturacao } from '@/lib/fisiologia';

const fmt = (n: number) => Math.round(n).toLocaleString('pt-BR');

// Suba de altitude e veja o oxigênio cair em cada etapa: ar, alvéolo e hemoglobina.
export function SimuladorO2() {
  const [alt, setAlt] = useState(8000);
  const [larg, setLarg] = useState(300);
  const pb = pressaoBarometrica(alt);
  const pio2 = po2Inspirado(alt);
  const pao2 = po2Alveolar(alt);
  const sat = saturacao(pao2);
  const corSat = sat >= 94 ? Cores.acerto : sat >= 88 ? Cores.dourado : Cores.erro;

  // Gráfico: PO₂ 0–110 mmHg no eixo x, saturação 0–100% no eixo y.
  const h = 190;
  const m = { e: 38, d: 10, t: 10, b: 24 };
  const gx = (p: number) => m.e + (p / 110) * (larg - m.e - m.d);
  const gy = (s: number) => m.t + (1 - s / 100) * (h - m.t - m.b);
  let curva = '';
  for (let p = 0; p <= 110; p += 1) curva += `${p === 0 ? 'M' : 'L'}${gx(p).toFixed(1)},${gy(saturacao(p)).toFixed(1)}`;

  return (
    <MolduraMidia tipo="Interativo" titulo="Suba de altitude e acompanhe o oxigênio" instrucao="Arraste o controle. Os valores são do ar ambiente, em exposição aguda.">
      <View>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Altitude</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(alt)} ft · {fmt(pesParaMetros(alt))} m</Texto>
        </View>
        <Deslizante min={0} max={25000} passo={500} valor={alt} onChange={setAlt} rotulo="Altitude em pés" formatar={(v) => `${fmt(v)} pés`} />
      </View>

      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={h}>
          <Rect x={gx(0)} y={gy(100)} width={gx(60) - gx(0)} height={gy(0) - gy(100)} fill="rgba(255,122,110,0.08)" />
          {[0, 20, 40, 60, 80, 100].map((p) => (
            <SvgText key={p} x={gx(p)} y={h - 8} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">{p}</SvgText>
          ))}
          {[0, 50, 100].map((s) => (
            <SvgText key={s} x={m.e - 6} y={gy(s) + 3} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="end">{s}%</SvgText>
          ))}
          <Line x1={gx(0)} y1={gy(0)} x2={gx(110)} y2={gy(0)} stroke={Cores.linha} />
          <Path d={curva} stroke={Cores.destaque} strokeWidth={2.5} fill="none" />
          <Line x1={gx(pao2)} y1={gy(sat)} x2={gx(pao2)} y2={gy(0)} stroke={corSat} strokeDasharray="4 4" />
          <Line x1={gx(0)} y1={gy(sat)} x2={gx(pao2)} y2={gy(sat)} stroke={corSat} strokeDasharray="4 4" />
          <Circle cx={gx(pao2)} cy={gy(sat)} r={7} fill={corSat} />
          <SvgText x={gx(30)} y={gy(8)} fill={Cores.erro} fontSize={10} fontFamily={Fonte} textAnchor="middle">parte íngreme</SvgText>
          <SvgText x={gx(88)} y={gy(80)} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">parte plana</SvgText>
        </Svg>
        <Texto cor={Cores.textoApagado} style={{ textAlign: 'center' }}>PO₂ alveolar (mmHg) × saturação da hemoglobina</Texto>
      </View>

      <View style={{ gap: Espaco.sm }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>A cascata do oxigênio</Texto>
        <Barra rotulo="Ar ambiente (pressão total)" valor={pb} maximo={760} unidade="mmHg" cor={Cores.textoSuave} />
        <Barra rotulo="O₂ inspirado" valor={pio2} maximo={160} unidade="mmHg" cor={Cores.destaque} />
        <Barra rotulo="O₂ no alvéolo" valor={pao2} maximo={160} unidade="mmHg" cor={Cores.destaque} />
        <Barra rotulo="Saturação" valor={sat} maximo={100} unidade="%" cor={corSat} />
      </View>

      <View style={styles.leituras}>
        <Leitura rotulo="PO₂ alveolar" valor={`${fmt(pao2)} mmHg`} />
        <Leitura rotulo="Saturação" valor={`${fmt(sat)}%`} cor={corSat} />
      </View>
    </MolduraMidia>
  );
}

function Barra({ rotulo, valor, maximo, unidade, cor }: { rotulo: string; valor: number; maximo: number; unidade: string; cor: string }) {
  return (
    <View style={{ gap: 4 }}>
      <View style={styles.linha}>
        <Texto cor={Cores.textoSuave}>{rotulo}</Texto>
        <Texto cor={Cores.texto}>{fmt(valor)} {unidade}</Texto>
      </View>
      <View style={styles.trilha}>
        <View style={{ width: `${Math.min(100, (valor / maximo) * 100)}%`, height: 8, borderRadius: 4, backgroundColor: cor }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  trilha: { height: 8, borderRadius: 4, backgroundColor: Cores.trilha, overflow: 'hidden' },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
});
