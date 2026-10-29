import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, RadialGradient, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte, Raio } from '@/constants/theme';
import { pressaoBarometrica } from '@/lib/fisiologia';

// Um gráfico para cada lei dos gases (M1V1 - II). Valores calculados na atmosfera padrão ICAO;
// fontes e cálculos no registro de revisão do voo M1V1.
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });
const VAPOR = 47;
const NATIVO = Platform.OS !== 'web';
const expansao = (ft: number) => (760 - VAPOR) / (pressaoBarometrica(ft) - VAPOR);

function Escolhas<T extends string | number>({ itens, valor, onChange }: { itens: [T, string][]; valor: T; onChange: (v: T) => void }) {
  return (
    <View style={styles.escolhas}>
      {itens.map(([v, r]) => (
        <Pressable key={String(v)} accessibilityRole="button" accessibilityState={{ selected: valor === v }} onPress={() => onChange(v)} style={[styles.escolha, valor === v && styles.escolhaAtiva]}>
          <Texto t="rodape" cor={valor === v ? Cores.fundo : Cores.textoSuave}>{r}</Texto>
        </Pressable>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------- Boyle
const PONTOS_BOYLE: [number, string][] = [[0, 'Nível do mar'], [8000, 'Cabine 8.000 ft'], [18000, '18.000 ft'], [25000, '25.000 ft'], [35000, '35.000 ft']];

export function GraficoBoyle() {
  const [ft, setFt] = useState(8000);
  const [larg, setLarg] = useState(300);
  const H = 230;
  const e = expansao(ft);
  // Gráfico: altitude (x) × volume do gás preso (y, até 6×). À direita, o balão no tamanho correspondente.
  const gx0 = 34;
  const gx1 = larg * 0.62;
  const gy0 = H - 28;
  const gy1 = 16;
  const X = (a: number) => gx0 + (a / 40000) * (gx1 - gx0);
  const Y = (v: number) => gy0 - ((v - 1) / 5) * (gy0 - gy1);
  let d = '';
  // A curva para quando o gás chega a 6× (perto de 37.000 ft), o topo do gráfico.
  let fimCurva = 0;
  for (let a = 0; a <= 40000 && expansao(a) <= 6; a += 500) {
    d += `${a ? 'L' : 'M'}${X(a)} ${Y(expansao(a))}`;
    fimCurva = a;
  }
  const bx = (gx1 + larg) / 2 + 6;
  const r0 = 22;
  const r = Math.min(r0 * Math.sqrt(e), (larg - gx1) / 2 - 6, 64);
  return (
    <MolduraMidia tipo="Gráfico" titulo="Lei de Boyle: o gás preso cresce na subida" instrucao="Toque numa altitude. A curva mostra quantas vezes o gás das cavidades do corpo aumenta.">
      <View onLayout={(ev) => setLarg(ev.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Defs>
            <RadialGradient id="balaoB" cx="0.35" cy="0.3" r="0.75">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.9} />
              <Stop offset="0.35" stopColor="#6FD3FF" stopOpacity={0.75} />
              <Stop offset="1" stopColor="#173C73" stopOpacity={0.9} />
            </RadialGradient>
            <LinearGradient id="areaB" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#6FD3FF" stopOpacity={0.35} />
              <Stop offset="1" stopColor="#6FD3FF" stopOpacity={0} />
            </LinearGradient>
          </Defs>
          {[1, 2, 3, 4, 5, 6].map((v) => (
            <G key={v}>
              <Line x1={gx0} y1={Y(v)} x2={gx1} y2={Y(v)} stroke={Cores.linha} />
              <SvgText x={gx0 - 6} y={Y(v) + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{v}×</SvgText>
            </G>
          ))}
          <Path d={`${d}L${X(fimCurva)} ${gy0}L${X(0)} ${gy0}Z`} fill="url(#areaB)" />
          <Path d={d} stroke={Cores.destaque} strokeWidth={2.5} fill="none" />
          {[0, 10000, 20000, 30000, 40000].map((a) => (
            <SvgText key={a} x={X(a)} y={gy0 + 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{a / 1000}k</SvgText>
          ))}
          <SvgText x={(gx0 + gx1) / 2} y={H - 2} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ALTITUDE (PÉS)</SvgText>
          <Line x1={X(ft)} y1={gy0} x2={X(ft)} y2={Y(Math.min(6, e))} stroke={Cores.dourado} strokeDasharray="3 3" />
          <Circle cx={X(ft)} cy={Y(Math.min(6, e))} r={6} fill={Cores.dourado} stroke={Cores.fundo} strokeWidth={2} />
          {/* Balão: área proporcional ao volume */}
          <Circle cx={bx} cy={H / 2 - 10} r={r0} fill="none" stroke={Cores.textoApagado} strokeDasharray="3 3" />
          <Circle cx={bx} cy={H / 2 - 10} r={r} fill="url(#balaoB)" />
          <Path d={`M${bx} ${H / 2 - 10 + r}l-4 8h8z`} fill="#173C73" />
          <SvgText x={bx} y={H / 2 - 4} fill={Cores.fundo} fontSize={16} fontFamily={Fonte} textAnchor="middle">{fmt(e, 1)}×</SvgText>
          {/* Legenda do balão, na coluna dele, abaixo do balão (não cruza a curva em telas estreitas). */}
          <SvgText x={bx - 6} y={H - 26} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">GÁS PRESO</SvgText>
          <SvgText x={bx - 6} y={H - 14} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">TRACEJADO:</SvgText>
          <SvgText x={bx - 6} y={H - 3} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">NÍVEL DO MAR</SvgText>
        </Svg>
      </View>
      <Escolhas itens={PONTOS_BOYLE} valor={ft} onChange={setFt} />
      <View style={styles.leituras}>
        <Leitura rotulo="Pressão do ar" valor={`${fmt(pressaoBarometrica(ft))} mmHg`} />
        <Leitura rotulo="Volume do gás preso" valor={`${fmt(e, 1)}×`} cor={e > 2 ? Cores.erro : e > 1.3 ? Cores.dourado : Cores.texto} />
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Dalton
const COLUNAS_DALTON: [number, string][] = [[0, 'Mar'], [8000, '8.000'], [18000, '18.000'], [25000, '25.000'], [35000, '35.000']];

export function GraficoDalton() {
  const [sel, setSel] = useState(8000);
  const [larg, setLarg] = useState(300);
  const H = 240;
  const base = H - 30;
  const esc = (H - 64) / 760;
  const n = COLUNAS_DALTON.length;
  const passo = (larg - 20) / n;
  const w = Math.min(44, passo * 0.62);
  const pb = pressaoBarometrica(sel);
  const po2 = 0.2095 * (pb - VAPOR);
  return (
    <MolduraMidia tipo="Gráfico" titulo="Lei de Dalton: a fatia do oxigênio encolhe" instrucao="Cada coluna é a pressão do ar inspirado, dividida entre os gases. Toque numa coluna.">
      <View onLayout={(ev) => setLarg(ev.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {COLUNAS_DALTON.map(([ft, r], i) => {
            const p = pressaoBarometrica(ft);
            const o = 0.2095 * (p - VAPOR);
            const x = 10 + i * passo + (passo - w) / 2;
            const hv = VAPOR * esc;
            const hn = (p - VAPOR - o) * esc;
            const ho = o * esc;
            const ativo = ft === sel;
            return (
              <G key={ft} onPress={() => setSel(ft)} opacity={ativo ? 1 : 0.55}>
                <Rect x={x - 6} y={10} width={w + 12} height={base - 10} fill="#FFFFFF" fillOpacity={ativo ? 0.06 : 0.001} rx={8} />
                <Rect x={x} y={base - hv} width={w} height={hv} fill="#8A93A6" fillOpacity={0.6} />
                <Rect x={x} y={base - hv - hn} width={w} height={hn} fill="#2C7FAE" />
                <Rect x={x} y={base - hv - hn - ho} width={w} height={ho} fill={Cores.dourado} />
                <SvgText x={x + w / 2} y={base - hv - hn - ho - 6} fill={ativo ? Cores.dourado : Cores.textoSuave} fontSize={11} fontFamily={Fonte} textAnchor="middle">{fmt(o)}</SvgText>
                <SvgText x={x + w / 2} y={base + 14} fill={ativo ? Cores.destaque : Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">{r}</SvgText>
              </G>
            );
          })}
          <Line x1={6} y1={base} x2={larg - 6} y2={base} stroke={Cores.linha} />
          <SvgText x={larg / 2} y={H - 2} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">PÉS · EM DOURADO: O₂ INSPIRADO (mmHg)</SvgText>
        </Svg>
      </View>
      <View style={styles.legenda}>
        <Item cor={Cores.dourado} texto="Oxigênio (20,95%)" />
        <Item cor="#2C7FAE" texto="Nitrogênio e outros" />
        <Item cor="#8A93A6" texto="Vapor d’água (47)" />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Pressão do ar" valor={`${fmt(pb)} mmHg`} />
        <Leitura rotulo="Oxigênio inspirado" valor={`${fmt(po2)} mmHg`} cor={po2 < 80 ? Cores.erro : po2 < 120 ? Cores.dourado : Cores.texto} />
      </View>
    </MolduraMidia>
  );
}

function Item({ cor, texto }: { cor: string; texto: string }) {
  return (
    <View style={styles.item}>
      <View style={[styles.quadrado, { backgroundColor: cor }]} />
      <Texto t="rodape" cor={Cores.textoSuave}>{texto}</Texto>
    </View>
  );
}

// ---------------------------------------------------------------- Henry
// Bolhas sobem quando a garrafa é aberta: a pressão cai e o gás dissolvido sai do líquido.
const fr = (v: number) => v - Math.floor(v);
const BOLHAS = Array.from({ length: 22 }, (_, i) => ({ x: fr(i * 0.618034 + 0.1) * 0.8 + 0.05, atraso: fr(Math.sin(i * 12.9898) * 43758.5453), r: 2 + ((i * 5) % 5) }));

export function GraficoHenry() {
  const [aberta, setAberta] = useState(false);
  const t = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!aberta) {
      t.stopAnimation();
      t.setValue(0);
      return;
    }
    const laco = Animated.loop(Animated.timing(t, { toValue: 1, duration: 2600, easing: Easing.linear, useNativeDriver: NATIVO }));
    laco.start();
    return () => laco.stop();
  }, [aberta, t]);
  const LH = 190;
  return (
    <MolduraMidia tipo="Animação" titulo="Lei de Henry: o gás dissolvido sai em bolhas" instrucao="Abra a garrafa. Com a pressão menor, o gás que estava dissolvido escapa. No corpo, o nitrogênio faz o mesmo se a pressão cai rápido.">
      <View style={styles.palcoHenry}>
        <View style={styles.coluna}>
          <View style={[styles.garrafa, { height: LH }]}>
            <View style={[styles.tampa, aberta && styles.tampaAberta]} />
            <View style={[styles.liquido, { height: LH - 36 }]}>
              {aberta
                ? BOLHAS.map((b, i) => {
                    const fase = Animated.modulo(Animated.add(t, b.atraso), 1);
                    return (
                      <Animated.View
                        key={i}
                        style={[
                          styles.bolha,
                          { left: `${b.x * 100}%`, width: b.r * 2, height: b.r * 2, borderRadius: b.r, bottom: 4 },
                          { opacity: fase.interpolate({ inputRange: [0, 0.1, 0.85, 1], outputRange: [0, 0.9, 0.9, 0] }), transform: [{ translateY: fase.interpolate({ inputRange: [0, 1], outputRange: [0, -(LH - 50)] }) }] },
                        ]}
                      />
                    );
                  })
                : BOLHAS.slice(0, 5).map((b, i) => <View key={i} style={[styles.bolha, { left: `${b.x * 100}%`, bottom: 10 + i * 22, width: 3, height: 3, borderRadius: 2, opacity: 0.35 }]} />)}
            </View>
          </View>
          <Texto t="rodape" cor={aberta ? Cores.dourado : Cores.textoApagado}>{aberta ? 'Pressão menor: bolhas' : 'Fechada: gás dissolvido'}</Texto>
        </View>
        <View style={{ flex: 1, gap: Espaco.sm }}>
          <View style={styles.paralelo}>
            <Texto t="rotulo" cor={Cores.destaque}>Na garrafa</Texto>
            <Texto cor={Cores.textoSuave}>Gás carbônico dissolvido sob pressão.</Texto>
          </View>
          <View style={styles.paralelo}>
            <Texto t="rotulo" cor={Cores.destaque}>No corpo</Texto>
            <Texto cor={Cores.textoSuave}>Nitrogênio dissolvido no sangue e nos tecidos, saturado ao nível do mar.</Texto>
          </View>
          <View style={styles.paralelo}>
            <Texto t="rotulo" cor={Cores.dourado}>Quando a pressão cai rápido</Texto>
            <Texto cor={Cores.textoSuave}>As bolhas podem se formar: doença descompressiva.</Texto>
          </View>
        </View>
      </View>
      <Pressable accessibilityRole="button" onPress={() => setAberta((v) => !v)} style={styles.botao}>
        <Texto t="item" maiusculo espacado cor={Cores.fundo}>{aberta ? 'Fechar a garrafa' : 'Abrir a garrafa'}</Texto>
      </Pressable>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Charles e Gay-Lussac
export function GraficoCharles() {
  const [temp, setTemp] = useState(-30);
  const [larg, setLarg] = useState(300);
  // Cilindro fechado, cheio a 20 °C: a pressão acompanha a temperatura absoluta (Gay-Lussac).
  const pct = ((temp + 273.15) / (20 + 273.15)) * 100;
  const H = 190;
  const cx = larg / 2;
  const cy = 120;
  const R = Math.min(88, larg / 2 - 40);
  // Mostrador de 60% a 120%, num arco de 180°.
  const ang = (v: number) => Math.PI * (1 - (Math.max(60, Math.min(120, v)) - 60) / 60);
  const p = (v: number, rr: number): [number, number] => [cx + rr * Math.cos(ang(v)), cy - rr * Math.sin(ang(v))];
  const [nx, ny] = p(pct, R - 16);
  const arco = (a: number, b: number) => {
    const [x0, y0] = p(a, R);
    const [x1, y1] = p(b, R);
    return `M${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}`;
  };
  return (
    <MolduraMidia tipo="Gráfico" titulo="Lei de Charles: o frio baixa a pressão do cilindro" instrucao="Exemplo: cilindro de oxigênio fechado, cheio a 20 °C. Mude a temperatura e veja o manômetro.">
      <View onLayout={(ev) => setLarg(ev.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Path d={arco(60, 90)} stroke="#2C7FAE" strokeWidth={10} fill="none" />
          <Path d={arco(90, 110)} stroke={Cores.acerto} strokeWidth={10} fill="none" />
          <Path d={arco(110, 120)} stroke={Cores.dourado} strokeWidth={10} fill="none" />
          {[60, 70, 80, 90, 100, 110, 120].map((v) => {
            const [x0, y0] = p(v, R - 8);
            const [x1, y1] = p(v, R + 8);
            const [tx, ty] = p(v, R + 20);
            return (
              <G key={v}>
                <Line x1={x0} y1={y0} x2={x1} y2={y1} stroke={Cores.texto} strokeOpacity={0.6} />
                <SvgText x={tx} y={ty + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{v}%</SvgText>
              </G>
            );
          })}
          <Line x1={cx} y1={cy} x2={nx} y2={ny} stroke={Cores.dourado} strokeWidth={3} strokeLinecap="round" />
          <Circle cx={cx} cy={cy} r={7} fill={Cores.dourado} />
          <SvgText x={cx} y={cy + 34} fill={Cores.texto} fontSize={20} fontFamily={Fonte} textAnchor="middle">{fmt(pct)}%</SvgText>
          <SvgText x={cx} y={cy + 50} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">DA PRESSÃO MARCADA A 20 °C</SvgText>
        </Svg>
      </View>
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Temperatura do cilindro</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(temp)} °C</Texto>
        </View>
        <Deslizante min={-50} max={50} passo={5} valor={temp} onChange={setTemp} rotulo="Temperatura em graus Celsius" formatar={(v) => `${fmt(v)} °C`} />
      </View>
      <Texto cor={Cores.textoApagado}>O oxigênio não sumiu: com o frio, as moléculas se movem menos e empurram menos as paredes. Ao aquecer, a pressão volta.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  escolhas: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  escolha: { paddingHorizontal: 10, minHeight: 32, justifyContent: 'center', borderRadius: 16, borderWidth: 1, borderColor: Cores.linha },
  escolhaAtiva: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  legenda: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  item: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  quadrado: { width: 10, height: 10, borderRadius: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  palcoHenry: { flexDirection: 'row', gap: Espaco.md, alignItems: 'center' },
  coluna: { alignItems: 'center', gap: 6 },
  garrafa: { width: 92, alignItems: 'center' },
  tampa: { width: 30, height: 14, borderRadius: 3, backgroundColor: Cores.dourado, marginBottom: 2 },
  tampaAberta: { transform: [{ translateY: -10 }, { rotate: '-35deg' }, { translateX: 18 }] },
  liquido: { width: 92, marginTop: 6, borderRadius: 18, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.5)', backgroundColor: 'rgba(111,211,255,0.22)', overflow: 'hidden' },
  bolha: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.9)' },
  paralelo: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 1, borderLeftColor: Cores.linha },
  botao: { minHeight: 46, borderRadius: Raio - 4, backgroundColor: Cores.destaque, alignItems: 'center', justifyContent: 'center' },
});
