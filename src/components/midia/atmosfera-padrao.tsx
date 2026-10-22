import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';
import { pesParaMetros, pressaoBarometrica } from '@/lib/fisiologia';

// Atmosfera padrão (ICAO / U.S. Standard Atmosphere 1976): 15 °C e 1.013,25 hPa ao nível do mar,
// −6,5 °C/km até a tropopausa (11 km = 36.089 ft, −56,5 °C), temperatura constante acima.
// Fontes no registro de revisão do voo M1V1.
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });
const TROPOPAUSA_FT = 36089;
export const temperaturaISA = (ft: number) => 15 - 6.5 * (Math.min(ft, TROPOPAUSA_FT) * 0.3048) / 1000;
const hPa = (mmHg: number) => mmHg * 1.33322;
// Densidade relativa ao nível do mar: (P/P0) ÷ (T/T0), temperaturas em kelvin.
const densidadeRelativa = (pmmHg: number, tC: number) => (pmmHg / 760) / ((tC + 273.15) / 288.15);

export function GraficoAtmosferaPadrao() {
  const [ft, setFt] = useState(18000);
  const [larg, setLarg] = useState(300);
  const H = 260;
  const x0 = 40;
  const x1 = larg - 12;
  const yTopo = 18;
  const yBase = H - 34;
  const Y = (a: number) => yBase - (a / 45000) * (yBase - yTopo);
  // Eixo x compartilhado: temperatura de −60 a +20 °C; pressão de 0 a 100% do nível do mar.
  const XT = (t: number) => x0 + ((t + 60) / 80) * (x1 - x0);
  const XP = (pct: number) => x0 + (pct / 100) * (x1 - x0);
  let dT = '';
  let dP = '';
  for (let a = 0; a <= 45000; a += 1000) {
    dT += `${a ? 'L' : 'M'}${XT(temperaturaISA(a))} ${Y(a)}`;
    dP += `${a ? 'L' : 'M'}${XP((pressaoBarometrica(a) / 760) * 100)} ${Y(a)}`;
  }
  const t = temperaturaISA(ft);
  const p = pressaoBarometrica(ft);
  const rho = densidadeRelativa(p, t);
  return (
    <MolduraMidia tipo="Gráfico" titulo="A atmosfera padrão, altitude por altitude" instrucao="Arraste a altitude. A linha dourada é a temperatura; a azul, a pressão em relação ao nível do mar.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {[0, 10000, 20000, 30000, 40000].map((a) => (
            <G key={a}>
              <Line x1={x0} y1={Y(a)} x2={x1} y2={Y(a)} stroke={Cores.linha} />
              <SvgText x={x0 - 6} y={Y(a) + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{a / 1000}k</SvgText>
            </G>
          ))}
          {/* Tropopausa padrão */}
          <Line x1={x0} y1={Y(TROPOPAUSA_FT)} x2={x1} y2={Y(TROPOPAUSA_FT)} stroke={Cores.textoSuave} strokeDasharray="4 4" />
          <SvgText x={x1} y={Y(TROPOPAUSA_FT) - 4} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="end">TROPOPAUSA · 36.089 FT</SvgText>
          <Path d={dT} stroke={Cores.dourado} strokeWidth={2.5} fill="none" />
          <Path d={dP} stroke={Cores.destaque} strokeWidth={2.5} fill="none" />
          {/* Altitude escolhida */}
          <Line x1={x0} y1={Y(ft)} x2={x1} y2={Y(ft)} stroke={Cores.texto} strokeOpacity={0.5} />
          <Circle cx={XT(t)} cy={Y(ft)} r={5} fill={Cores.dourado} stroke={Cores.fundo} strokeWidth={2} />
          <Circle cx={XP((p / 760) * 100)} cy={Y(ft)} r={5} fill={Cores.destaque} stroke={Cores.fundo} strokeWidth={2} />
          {/* Eixos inferiores */}
          {[-60, -40, -20, 0, 20].map((v) => (
            <SvgText key={v} x={XT(v)} y={yBase + 13} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{v} °C</SvgText>
          ))}
          {[0, 50, 100].map((v) => (
            <SvgText key={v} x={XP(v)} y={yBase + 26} fill={Cores.destaque} fontSize={9} fontFamily={Fonte} textAnchor="middle">{v}%</SvgText>
          ))}
          <Rect x={0} y={0} width={1} height={1} fill="none" />
        </Svg>
      </View>
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Altitude</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(ft)} ft · {fmt(pesParaMetros(ft))} m</Texto>
        </View>
        <Deslizante min={0} max={45000} passo={500} valor={ft} onChange={setFt} rotulo="Altitude em pés" formatar={(v) => `${fmt(v)} pés`} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Temperatura" valor={`${fmt(t, 1)} °C`} cor={Cores.dourado} />
        <Leitura rotulo="Pressão" valor={`${fmt(hPa(p))} hPa · ${fmt(p)} mmHg`} cor={Cores.destaque} />
        <Leitura rotulo="Densidade do ar" valor={`${fmt(rho * 100)}% do nível do mar`} />
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Altitude-densidade
// Densidade do ar no aeroporto (altitude-pressão + temperatura do dia, ar seco) e a altitude da
// atmosfera padrão que tem a mesma densidade. Na troposfera padrão, densidade relativa σ = (1 − 6,8756·10⁻⁶·h)^4,2559.
function altitudeDensidade(ftPressao: number, tC: number) {
  const sigma = densidadeRelativa(pressaoBarometrica(ftPressao), tC);
  return (1 - Math.pow(sigma, 1 / 4.2559)) / 6.8756e-6;
}

export function SimuladorAltitudeDensidade() {
  const [ft, setFt] = useState(5000);
  const [temp, setTemp] = useState(35);
  const [larg, setLarg] = useState(300);
  const da = altitudeDensidade(ft, temp);
  const isa = temperaturaISA(ft);
  const H = 180;
  const base = H - 24;
  const max = 16000;
  const alt = (v: number) => (Math.max(0, Math.min(max, v)) / max) * (base - 20);
  const w = Math.min(70, larg * 0.22);
  const xa = larg * 0.25 - w / 2;
  const xb = larg * 0.7 - w / 2;
  const acima = da - ft;
  return (
    <MolduraMidia tipo="Simulação" titulo="Dia quente: o avião sente uma altitude maior" instrucao="Escolha a altitude do aeroporto e a temperatura do dia. Cálculo para ar seco; a umidade aumenta ainda mais a altitude-densidade.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Line x1={8} y1={base} x2={larg - 8} y2={base} stroke={Cores.linha} />
          <Rect x={xa} y={base - alt(ft)} width={w} height={alt(ft)} rx={6} fill={Cores.destaque} fillOpacity={0.55} />
          <SvgText x={xa + w / 2} y={base - alt(ft) - 6} fill={Cores.destaque} fontSize={12} fontFamily={Fonte} textAnchor="middle">{fmt(ft)} ft</SvgText>
          <SvgText x={xa + w / 2} y={H - 6} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ALTITUDE-PRESSÃO</SvgText>
          <Rect x={xb} y={base - alt(da)} width={w} height={alt(da)} rx={6} fill={acima > 0 ? Cores.dourado : Cores.acerto} fillOpacity={0.85} />
          <SvgText x={xb + w / 2} y={base - alt(da) - 6} fill={acima > 0 ? Cores.dourado : Cores.acerto} fontSize={12} fontFamily={Fonte} textAnchor="middle">{fmt(Math.round(da / 100) * 100)} ft</SvgText>
          <SvgText x={xb + w / 2} y={H - 6} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ALTITUDE-DENSIDADE</SvgText>
        </Svg>
      </View>
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Altitude do aeroporto</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(ft)} ft · {fmt(pesParaMetros(ft))} m</Texto>
        </View>
        <Deslizante min={0} max={10000} passo={500} valor={ft} onChange={setFt} rotulo="Altitude do aeroporto em pés" formatar={(v) => `${fmt(v)} pés`} />
      </View>
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Temperatura do dia</Texto>
          <Texto t="item" cor={Cores.dourado}>{fmt(temp)} °C</Texto>
        </View>
        <Deslizante min={-10} max={45} passo={1} valor={temp} onChange={setTemp} rotulo="Temperatura em graus Celsius" formatar={(v) => `${fmt(v)} °C`} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Temperatura padrão nessa altitude" valor={`${fmt(isa, 1)} °C`} />
        <Leitura rotulo="O avião se comporta como se estivesse" valor={`${acima >= 0 ? '+' : '−'}${fmt(Math.abs(Math.round(acima / 100) * 100))} ft`} cor={acima > 0 ? Cores.dourado : Cores.acerto} />
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
});
