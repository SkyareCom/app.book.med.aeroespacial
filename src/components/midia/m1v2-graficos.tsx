import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';
import { pesParaMetros, pressaoBarometrica } from '@/lib/fisiologia';

// Gráficos e simuladores do M1V2 · Pressurização e oxigênio suplementar.
// Limites: 14 CFR 25.841 e 14 CFR 91.211; sistemas de oxigênio: FAA AC 61-107B, seção 2-9.
// Pressões calculadas na atmosfera padrão (registro de revisão do voo M1V2).
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });
const hPa = (mmHg: number) => mmHg * 1.33322;
const psi = (mmHg: number) => mmHg * 0.0193368;

// ---------------------------------------------------------------- Pressão diferencial
export function SimuladorPressaoDiferencial() {
  const [voo, setVoo] = useState(38000);
  const [cabine, setCabine] = useState(8000);
  const [larg, setLarg] = useState(300);
  const fora = pressaoBarometrica(voo);
  const dentro = pressaoBarometrica(Math.min(cabine, voo));
  const dif = dentro - fora;
  const H = 200;
  const base = H - 26;
  const esc = (H - 60) / 760;
  const w = Math.min(84, larg * 0.26);
  const xf = larg * 0.22 - w / 2;
  const xd = larg * 0.62 - w / 2;
  return (
    <MolduraMidia tipo="Simulação" titulo="A cabine é um balão sob pressão" instrucao="Mude a altitude do avião e a da cabine. A diferença entre dentro e fora é o esforço que a fuselagem suporta.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Defs>
            <LinearGradient id="ar-dentro" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#6FD3FF" stopOpacity={0.9} />
              <Stop offset="1" stopColor="#2C7FAE" stopOpacity={0.9} />
            </LinearGradient>
          </Defs>
          <Line x1={8} y1={base} x2={larg - 8} y2={base} stroke={Cores.linha} />
          <Rect x={xf} y={base - fora * esc} width={w} height={fora * esc} rx={6} fill="#8A93A6" fillOpacity={0.6} />
          <SvgText x={xf + w / 2} y={base - fora * esc - 6} fill={Cores.textoSuave} fontSize={11} fontFamily={Fonte} textAnchor="middle">{fmt(hPa(fora))} hPa</SvgText>
          <SvgText x={xf + w / 2} y={H - 8} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">LÁ FORA</SvgText>
          <Rect x={xd} y={base - dentro * esc} width={w} height={dentro * esc} rx={6} fill="url(#ar-dentro)" />
          <SvgText x={xd + w / 2} y={base - dentro * esc - 6} fill={Cores.destaque} fontSize={11} fontFamily={Fonte} textAnchor="middle">{fmt(hPa(dentro))} hPa</SvgText>
          <SvgText x={xd + w / 2} y={H - 8} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">NA CABINE</SvgText>
          {dif > 1 ? (
            <G>
              <Line x1={xd + w + 10} y1={base - dentro * esc} x2={xd + w + 10} y2={base - fora * esc} stroke={Cores.dourado} strokeWidth={2} />
              <Path d={`M${xd + w + 5} ${base - fora * esc - 6}l5 6 5-6`} stroke={Cores.dourado} strokeWidth={2} fill="none" />
              <SvgText x={xd + w + 16} y={base - (dentro + fora) * esc / 2} fill={Cores.dourado} fontSize={11} fontFamily={Fonte}>Δ</SvgText>
            </G>
          ) : null}
        </Svg>
      </View>
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Altitude do avião</Texto>
          <Texto t="item" cor={Cores.texto}>{fmt(voo)} ft · {fmt(pesParaMetros(voo))} m</Texto>
        </View>
        <Deslizante min={0} max={45000} passo={1000} valor={voo} onChange={setVoo} rotulo="Altitude do avião em pés" formatar={(v) => `${fmt(v)} pés`} />
      </View>
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Altitude de cabine</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(Math.min(cabine, voo))} ft</Texto>
        </View>
        <Deslizante min={0} max={10000} passo={500} valor={cabine} onChange={setCabine} rotulo="Altitude de cabine em pés" formatar={(v) => `${fmt(v)} pés`} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Pressão diferencial" valor={`${fmt(psi(dif), 1)} psi`} cor={Cores.dourado} />
        <Leitura rotulo="Equivale a" valor={`${fmt(hPa(dif))} hPa`} />
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Perfil avião × cabine
// Voo ilustrativo de 2 horas: subida a 38.000 ft com a cabine a 8.000 ft; descida da cabine a 500 ft/min.
const PERFIL_AVIAO: [number, number][] = [[0, 0], [25, 38000], [95, 38000], [120, 0]];
const PERFIL_CABINE: [number, number][] = [[0, 0], [25, 8000], [95, 8000], [111, 0], [120, 0]];

export function GraficoPerfilCabine() {
  const [larg, setLarg] = useState(300);
  const H = 230;
  const x0 = 40;
  const x1 = larg - 10;
  const yT = 14;
  const yB = H - 30;
  const X = (min: number) => x0 + (min / 120) * (x1 - x0);
  const Y = (ft: number) => yB - (ft / 40000) * (yB - yT);
  const linha = (pts: [number, number][]) => pts.map(([m, f], i) => `${i ? 'L' : 'M'}${X(m)} ${Y(f)}`).join('');
  return (
    <MolduraMidia tipo="Gráfico" titulo="O avião sobe; a cabine, bem menos" instrucao="Exemplo ilustrativo de um voo de 2 horas. As linhas tracejadas são os limites da regra de certificação.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {[0, 10000, 20000, 30000, 40000].map((f) => (
            <G key={f}>
              <Line x1={x0} y1={Y(f)} x2={x1} y2={Y(f)} stroke={Cores.linha} />
              <SvgText x={x0 - 6} y={Y(f) + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{f / 1000}k</SvgText>
            </G>
          ))}
          <Line x1={x0} y1={Y(10000)} x2={x1} y2={Y(10000)} stroke={Cores.dourado} strokeDasharray="5 4" />
          <SvgText x={X(60)} y={Y(10000) - 4} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{larg < 340 ? '10.000 FT · ALERTA' : '10.000 FT · ALERTA NA CABINE DE COMANDO'}</SvgText>
          <Line x1={x0} y1={Y(15000)} x2={x1} y2={Y(15000)} stroke={Cores.erro} strokeDasharray="5 4" />
          <SvgText x={X(60)} y={Y(15000) - 4} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="middle">15.000 FT · MÁSCARAS JÁ CAÍRAM</SvgText>
          <Path d={linha(PERFIL_AVIAO)} stroke="#8A93A6" strokeWidth={2.5} fill="none" />
          <Path d={linha(PERFIL_CABINE)} stroke={Cores.destaque} strokeWidth={3} fill="none" />
          <SvgText x={X(60)} y={Y(38000) + 16} fill={Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="middle">AVIÃO · 38.000 FT</SvgText>
          <SvgText x={X(60)} y={Y(8000) + 14} fill={Cores.destaque} fontSize={10} fontFamily={Fonte} textAnchor="middle">CABINE · ATÉ 8.000 FT</SvgText>
          {[0, 30, 60, 90, 120].map((m) => (
            <SvgText key={m} x={X(m)} y={yB + 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={m === 0 ? 'start' : m === 120 ? 'end' : 'middle'}>{m} min</SvgText>
          ))}
        </Svg>
      </View>
      <Texto cor={Cores.textoApagado}>Na descida, a cabine desce no máximo 500 a 600 ft por minuto e chega ao solo com a mesma pressão de fora.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Sistemas de oxigênio
const SISTEMAS = [
  { id: 'continuo', nome: 'Fluxo contínuo', ate: 41000, atencao: 25000, cor: '#6FD3FF', texto: 'Oxigênio sai sem parar, numa vazão definida, e se mistura ao ar; a máscara tem bolsa reservatória. É certificado até 41.000 ft, mas exige muita atenção acima de 25.000 ft.' },
  { id: 'diluidor', nome: 'Demanda diluidora', ate: 40000, atencao: 40000, cor: '#E8C46A', texto: 'Oxigênio só na inspiração, misturado ao ar da cabine ou a 100%. Seguro até 40.000 ft, com a máscara bem vedada: barba e bigode atrapalham.' },
  { id: 'pressao', nome: 'Pressão de demanda', ate: 50000, atencao: 50000, cor: '#5BD69B', texto: 'Oxigênio na inspiração com pressão positiva na máscara. É o sistema seguro acima de 40.000 ft.' },
] as const;

export function GraficoSistemasOxigenio() {
  const [sel, setSel] = useState<(typeof SISTEMAS)[number]['id']>('continuo');
  const [larg, setLarg] = useState(300);
  const x0 = 12;
  const x1 = larg - 12;
  const X = (ft: number) => x0 + (Math.min(ft, 50000) / 50000) * (x1 - x0);
  const linhaH = 34;
  const topo = 30;
  const H = topo + SISTEMAS.length * linhaH + 34;
  const s = SISTEMAS.find((q) => q.id === sel)!;
  return (
    <MolduraMidia tipo="Gráfico" titulo="Cada máscara tem seu teto" instrucao="Toque num sistema para ver até onde ele protege.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {[0, 10000, 20000, 30000, 40000, 50000].map((f) => (
            <G key={f}>
              <Line x1={X(f)} y1={topo + SISTEMAS.length * linhaH - 4} x2={X(f)} y2={H - 26} stroke={Cores.linha} />
              <SvgText x={X(f)} y={H - 12} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{f / 1000}k</SvgText>
            </G>
          ))}
          <SvgText x={(x0 + x1) / 2} y={H - 1} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ALTITUDE (PÉS)</SvgText>
          {SISTEMAS.map((q, i) => {
            const y = topo + i * linhaH;
            const ativo = q.id === sel;
            return (
              <G key={q.id} onPress={() => setSel(q.id)} opacity={ativo ? 1 : 0.5}>
                <Rect x={x0} y={y} width={X(q.atencao) - x0} height={18} rx={5} fill={q.cor} fillOpacity={0.85} />
                {q.ate > q.atencao ? <Rect x={X(q.atencao)} y={y} width={X(q.ate) - X(q.atencao)} height={18} rx={5} fill={q.cor} fillOpacity={0.3} stroke={q.cor} strokeDasharray="4 3" /> : null}
                <SvgText x={x0 + 8} y={y + 13} fill={Cores.fundo} fontSize={10} fontFamily={Fonte}>{q.nome.toUpperCase()}</SvgText>
              </G>
            );
          })}
          <Circle cx={X(40000)} cy={topo - 12} r={3} fill={Cores.erro} />
          <SvgText x={X(40000) - 6} y={topo - 9} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="end">40.000 FT</SvgText>
        </Svg>
      </View>
      <View style={styles.escolhas}>
        {SISTEMAS.map((q) => (
          <Pressable key={q.id} accessibilityRole="button" accessibilityState={{ selected: q.id === sel }} onPress={() => setSel(q.id)} style={[styles.escolha, q.id === sel && { borderColor: q.cor }]}>
            <View style={[styles.ponto, { backgroundColor: q.cor }]} />
            <Texto cor={q.id === sel ? Cores.texto : Cores.textoSuave}>{q.nome}</Texto>
          </Pressable>
        ))}
      </View>
      <Texto cor={Cores.textoSuave}>{s.texto}</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Ar × oxigênio a 100%
// Oxigênio inspirado (já umidificado): ar = 0,2095 × (PB − 47); oxigênio a 100% = PB − 47.
export function GraficoOxigenio100() {
  const [ft, setFt] = useState(40000);
  const [larg, setLarg] = useState(300);
  const H = 220;
  const x0 = 40;
  const x1 = larg - 10;
  const yT = 12;
  const yB = H - 30;
  const X = (a: number) => x0 + (a / 50000) * (x1 - x0);
  const Y = (mm: number) => yB - (Math.max(0, mm) / 720) * (yB - yT);
  const ar = (a: number) => 0.2095 * (pressaoBarometrica(a) - 47);
  const puro = (a: number) => pressaoBarometrica(a) - 47;
  let dA = '';
  let dP = '';
  for (let a = 0; a <= 50000; a += 1000) {
    dA += `${a ? 'L' : 'M'}${X(a)} ${Y(ar(a))}`;
    dP += `${a ? 'L' : 'M'}${X(a)} ${Y(puro(a))}`;
  }
  const vPuro = puro(ft);
  return (
    <MolduraMidia tipo="Gráfico" titulo="Nem o oxigênio puro dá conta lá em cima" instrucao="Compare o oxigênio que entra respirando ar (dourado) e oxigênio a 100% (verde). A linha tracejada é o ar comum ao nível do mar.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {[0, 200, 400, 600].map((v) => (
            <G key={v}>
              <Line x1={x0} y1={Y(v)} x2={x1} y2={Y(v)} stroke={Cores.linha} />
              <SvgText x={x0 - 6} y={Y(v) + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{v}</SvgText>
            </G>
          ))}
          <Line x1={x0} y1={Y(149)} x2={x1} y2={Y(149)} stroke={Cores.texto} strokeOpacity={0.6} strokeDasharray="5 4" />
          <SvgText x={x1} y={yT + 10} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="end">TRACEJADO: AR AO NÍVEL DO MAR · 149 mmHg</SvgText>
          <Path d={dP} stroke={Cores.acerto} strokeWidth={2.5} fill="none" />
          <Path d={dA} stroke={Cores.dourado} strokeWidth={2.5} fill="none" />
          <Line x1={X(ft)} y1={yT + 16} x2={X(ft)} y2={yB} stroke={Cores.texto} strokeOpacity={0.5} />
          <Circle cx={X(ft)} cy={Y(vPuro)} r={5} fill={Cores.acerto} stroke={Cores.fundo} strokeWidth={2} />
          <Circle cx={X(ft)} cy={Y(ar(ft))} r={5} fill={Cores.dourado} stroke={Cores.fundo} strokeWidth={2} />
          {[0, 10000, 20000, 30000, 40000, 50000].map((a) => (
            <SvgText key={a} x={X(a)} y={yB + 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{a / 1000}k</SvgText>
          ))}
          <SvgText x={(x0 + x1) / 2} y={H - 2} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ALTITUDE (PÉS) · OXIGÊNIO INSPIRADO EM mmHg</SvgText>
        </Svg>
      </View>
      <Deslizante min={0} max={50000} passo={1000} valor={ft} onChange={setFt} rotulo="Altitude em pés" formatar={(v) => `${fmt(v)} pés`} />
      <View style={styles.leituras}>
        <Leitura rotulo={`Ar a ${fmt(ft)} ft`} valor={`${fmt(ar(ft))} mmHg`} cor={Cores.dourado} />
        <Leitura rotulo="Oxigênio a 100%" valor={`${fmt(vPuro)} mmHg`} cor={vPuro < 149 ? Cores.erro : Cores.acerto} />
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  escolhas: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  escolha: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 36, paddingHorizontal: 12, borderRadius: 18, borderWidth: 1, borderColor: Cores.linha },
  ponto: { width: 8, height: 8, borderRadius: 4 },
});
