import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';
import { pressaoBarometrica } from '@/lib/fisiologia';

// M1V1 - IV · Por que o ar da cabine é seco.
// Cálculo: pressão de vapor de saturação pela fórmula de Magnus (sobre água): es(T) = 6,112·exp(17,62·T / (243,12 + T)) hPa.
// Melhor caso: o ar externo está saturado (100%). A pressurização comprime o ar sem mudar a proporção de vapor, então a
// pressão de vapor cresce na razão das pressões (cabine ÷ fora). Temperatura externa na atmosfera padrão (ICAO);
// cabine a 8.000 ft (ou na altitude do avião, se menor) e a 22 °C. Não inclui o vapor que os ocupantes exalam
// nem a recirculação, que elevam a umidade real da cabine.
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });
const es = (t: number) => 6.112 * Math.exp((17.62 * t) / (243.12 + t));
const tempPadrao = (ft: number) => Math.max(15 - 0.0019812 * ft, -56.5);
const T_CABINE = 22;

function umidadeCabine(ft: number) {
  const fora = pressaoBarometrica(ft);
  const cabine = pressaoBarometrica(Math.min(ft, 8000));
  const vapor = es(tempPadrao(ft)) * (cabine / fora);
  return Math.min(100, (vapor / es(T_CABINE)) * 100);
}

export function UmidadeCabine() {
  const [ft, setFt] = useState(38000);
  const [larg, setLarg] = useState(300);
  const ur = umidadeCabine(ft);
  const H = 170;
  const x0 = 36, x1 = larg - 12, yT = 12, yB = H - 26;
  const X = (f: number) => x0 + (f / 41000) * (x1 - x0);
  // Escala logarítmica de 0,1% a 100%.
  const Y = (u: number) => yB - ((Math.log10(Math.max(u, 0.1)) + 1) / 3) * (yB - yT);
  let d = '';
  for (let f = 0; f <= 41000; f += 500) d += `${f ? 'L' : 'M'}${X(f)} ${Y(umidadeCabine(f))}`;
  return (
    <MolduraMidia
      tipo="Simulação"
      titulo="Por que o ar da cabine é tão seco"
      instrucao="Arraste a altitude. O ar de fora entra saturado, é comprimido e aquecido a 22 °C: veja quanta umidade sobra na cabine. Escala logarítmica.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Rect x={x0} y={Y(20)} width={x1 - x0} height={Y(10) - Y(20)} fill={Cores.dourado} fillOpacity={0.14} />
          <SvgText x={x0 + 4} y={Y(10) + 12} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>FAIXA DAS CABINES REAIS: 10–20%</SvgText>
          {[0.1, 1, 10, 100].map((u) => (
            <SvgText key={u} x={x0 - 6} y={Y(u) + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{fmt(u, u < 1 ? 1 : 0)}%</SvgText>
          ))}
          <Line x1={x0} y1={yB} x2={x1} y2={yB} stroke={Cores.linha} />
          {[0, 10000, 20000, 30000, 40000].map((f) => (
            <SvgText key={f} x={X(f)} y={H - 10} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={f === 0 ? 'start' : f === 40000 ? 'end' : 'middle'}>{f ? `${f / 1000} mil` : '0'}</SvgText>
          ))}
          <Path d={d} stroke={Cores.destaque} strokeWidth={2.4} fill="none" />
          <Line x1={X(ft)} y1={yT} x2={X(ft)} y2={yB} stroke={Cores.texto} strokeDasharray="3 3" />
          <Circle cx={X(ft)} cy={Y(ur)} r={6} fill={Cores.destaque} stroke={Cores.fundo} strokeWidth={2} />
        </Svg>
      </View>
      <Deslizante min={0} max={41000} passo={1000} valor={ft} onChange={setFt} rotulo="Altitude do avião em pés" formatar={(v) => `${fmt(v)} pés`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Altitude do avião" valor={`${fmt(ft)} ft`} />
        <Leitura rotulo="Ar de fora" valor={`${fmt(tempPadrao(ft), 1)} °C`} />
        <Leitura rotulo="Umidade na cabine" valor={`${fmt(ur, ur < 10 ? 1 : 0)}%`} cor={Cores.destaque} />
      </View>
      <View style={styles.marca}>
        <Texto cor={Cores.textoSuave}>
          Mesmo saturado, o ar gelado de cruzeiro quase não carrega vapor. Aquecido, a umidade relativa despenca. Na cabine real, o vapor exalado pelos ocupantes e o ar recirculado elevam um pouco esse valor.
        </Texto>
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
