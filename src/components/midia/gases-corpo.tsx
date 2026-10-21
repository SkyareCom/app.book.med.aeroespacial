import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte, Raio } from '@/constants/theme';
import { pesParaMetros, pressaoBarometrica } from '@/lib/fisiologia';

// Três leis, uma altitude: o que a queda de pressão faz com o gás preso (Boyle), com o oxigênio
// que entra (Dalton) e com o nitrogênio dissolvido (Henry). Valores calculados na atmosfera padrão;
// fontes no registro de revisão do voo M1V1.
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

const VAPOR = 47; // mmHg, vapor d’água a 37 °C
const FIO2 = 0.2095;
const N2_TECIDO = 0.7808 * (760 - VAPOR); // tensão aproximada de N₂ nos tecidos saturados ao nível do mar

type Lei = 'boyle' | 'dalton' | 'henry';
const LEIS: [Lei, string][] = [['boyle', 'Boyle'], ['dalton', 'Dalton'], ['henry', 'Henry']];
const ATALHOS: [number, string][] = [[0, 'Nível do mar'], [8000, 'Cabine 8.000 ft'], [18000, '18.000 ft'], [25000, '25.000 ft'], [35000, '35.000 ft']];

const TEXTO: Record<Lei, string> = {
  boyle: 'Menos pressão, mais volume. O gás preso no ouvido, nos seios da face e no intestino cresce e pressiona as paredes ao redor.',
  dalton: 'Cada gás responde por uma parte da pressão. A fatia do oxigênio continua em 21%, mas encolhe junto com a pressão total, e é ela que empurra o oxigênio para o sangue.',
  henry: 'O gás dissolvido acompanha a pressão. Quando o nitrogênio dos tecidos fica acima da pressão do ar em volta, ele tende a sair em bolhas, como num refrigerante aberto.',
};

// Posições fixas das bolhas (fração da largura e da altura do líquido).
const fr = (v: number) => v - Math.floor(v);
const BOLHAS = Array.from({ length: 36 }, (_, i) => [fr(i * 0.618034 + 0.13), fr(i * 0.754878 + 0.41), 2 + ((i * 7) % 4)]);

export function GasesNoCorpo() {
  const [lei, setLei] = useState<Lei>('boyle');
  const [alt, setAlt] = useState(8000);
  const [larg, setLarg] = useState(300);
  const pb = pressaoBarometrica(alt);
  const expansao = (760 - VAPOR) / (pb - VAPOR);
  const po2 = FIO2 * (pb - VAPOR);
  const razaoN2 = N2_TECIDO / pb;
  const H = 200;

  return (
    <MolduraMidia tipo="Simulação" titulo="O que a altitude faz com os gases do corpo" instrucao="Escolha uma lei e suba. Os valores são calculados na atmosfera padrão.">
      <View style={styles.abas}>
        {LEIS.map(([v, r]) => (
          <Pressable key={v} accessibilityRole="button" accessibilityState={{ selected: lei === v }} onPress={() => setLei(v)} style={[styles.aba, lei === v && styles.abaAtiva]}>
            <Texto t="item" cor={lei === v ? Cores.fundo : Cores.texto} style={{ textAlign: 'center' }}>{r}</Texto>
          </Pressable>
        ))}
      </View>

      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={styles.palco}>
        <Svg width={larg} height={H}>
          <Defs>
            <LinearGradient id="liquido" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#6FD3FF" stopOpacity={0.35} />
              <Stop offset="1" stopColor="#173C73" stopOpacity={0.6} />
            </LinearGradient>
            <LinearGradient id="balao" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.35} />
              <Stop offset="1" stopColor="#6FD3FF" stopOpacity={0.15} />
            </LinearGradient>
          </Defs>

          {lei === 'boyle' ? <Boyle larg={larg} H={H} expansao={expansao} /> : null}
          {lei === 'dalton' ? <Dalton larg={larg} H={H} pb={pb} po2={po2} /> : null}
          {lei === 'henry' ? <Henry larg={larg} H={H} razao={razaoN2} /> : null}
        </Svg>
      </View>

      <Texto cor={Cores.textoSuave}>{TEXTO[lei]}</Texto>

      <View style={{ gap: 6 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Altitude</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(alt)} ft · {fmt(pesParaMetros(alt))} m</Texto>
        </View>
        <Deslizante min={0} max={40000} passo={500} valor={alt} onChange={setAlt} rotulo="Altitude em pés" formatar={(v) => `${fmt(v)} pés`} />
        <View style={styles.atalhos}>
          {ATALHOS.map(([a, r]) => (
            <Pressable key={a} accessibilityRole="button" accessibilityState={{ selected: alt === a }} onPress={() => setAlt(a)} style={[styles.atalho, alt === a && { borderColor: Cores.destaque }]}>
              <Texto t="rodape" cor={alt === a ? Cores.destaque : Cores.textoSuave}>{r}</Texto>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.leituras}>
        <Leitura rotulo="Pressão do ar" valor={`${fmt(pb)} mmHg`} />
        {lei === 'boyle' ? <Leitura rotulo="Gás preso no corpo" valor={`${fmt(expansao, 1)}×`} cor={expansao > 2 ? Cores.erro : expansao > 1.3 ? Cores.dourado : Cores.texto} /> : null}
        {lei === 'dalton' ? <Leitura rotulo="Oxigênio inspirado" valor={`${fmt(po2)} mmHg`} cor={po2 < 80 ? Cores.erro : po2 < 120 ? Cores.dourado : Cores.texto} /> : null}
        {lei === 'henry' ? <Leitura rotulo="Nitrogênio nos tecidos ÷ pressão do ar" valor={`${fmt(razaoN2, 2)}`} cor={razaoN2 > 1.4 ? Cores.erro : razaoN2 > 1 ? Cores.dourado : Cores.texto} /> : null}
      </View>
    </MolduraMidia>
  );
}

function Boyle({ larg, H, expansao }: { larg: number; H: number; expansao: number }) {
  // A área do círculo representa o volume do gás.
  const r0 = 32;
  const r = Math.min(r0 * Math.sqrt(expansao), H / 2 - 12, larg * 0.3);
  const cx0 = larg * 0.25;
  const cx1 = larg * 0.66;
  return (
    <G>
      <Circle cx={cx0} cy={H / 2 - 8} r={r0} fill="url(#balao)" stroke={Cores.textoSuave} strokeWidth={1.2} />
      <SvgText x={cx0} y={H - 14} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">NÍVEL DO MAR · 1×</SvgText>
      <Circle cx={cx1} cy={H / 2 - 8} r={r0} fill="none" stroke={Cores.textoApagado} strokeDasharray="4 4" />
      <Circle cx={cx1} cy={H / 2 - 8} r={r} fill="url(#balao)" stroke={Cores.destaque} strokeWidth={2} />
      <SvgText x={cx1} y={H / 2 - 3} fill={Cores.texto} fontSize={18} fontFamily={Fonte} textAnchor="middle">{fmt(expansao, 1)}×</SvgText>
      <SvgText x={cx1} y={H - 14} fill={Cores.destaque} fontSize={10} fontFamily={Fonte} textAnchor="middle">NA ALTITUDE ESCOLHIDA</SvgText>
    </G>
  );
}

function Dalton({ larg, H, pb, po2 }: { larg: number; H: number; pb: number; po2: number }) {
  // Coluna empilhada: altura proporcional à pressão total (760 mmHg ocupa a coluna inteira).
  const base = H - 14;
  const esc = (H - 34) / 760;
  const w = 58;
  const x0 = larg * 0.2;
  const x1 = larg * 0.55;
  const coluna = (x: number, p: number, o2: number, destaque: boolean) => {
    const hv = VAPOR * esc;
    const ho = o2 * esc;
    const hn = (p - VAPOR - o2) * esc;
    return (
      <G>
        <Rect x={x} y={base - hv} width={w} height={hv} fill="#8A93A6" fillOpacity={0.5} />
        <Rect x={x} y={base - hv - hn} width={w} height={hn} fill="#6FD3FF" fillOpacity={destaque ? 0.55 : 0.3} />
        <Rect x={x} y={base - hv - hn - ho} width={w} height={ho} fill={Cores.dourado} fillOpacity={destaque ? 0.95 : 0.5} />
        <SvgText x={x + w / 2} y={base - hv - hn - ho - 6} fill={destaque ? Cores.texto : Cores.textoApagado} fontSize={11} fontFamily={Fonte} textAnchor="middle">{fmt(p)}</SvgText>
      </G>
    );
  };
  const o2Mar = FIO2 * (760 - VAPOR);
  return (
    <G>
      {coluna(x0, 760, o2Mar, false)}
      {coluna(x1, pb, po2, true)}
      <Line x1={x0 - 8} y1={base} x2={x1 + w + 8} y2={base} stroke={Cores.linha} />
      <SvgText x={x0 + w / 2} y={H - 1} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">NÍVEL DO MAR</SvgText>
      <SvgText x={x1 + w / 2} y={H - 1} fill={Cores.destaque} fontSize={9} fontFamily={Fonte} textAnchor="middle">ALTITUDE</SvgText>
      {/* Legenda */}
      <G>
        <Rect x={x1 + w + 14} y={18} width={9} height={9} fill={Cores.dourado} />
        <SvgText x={x1 + w + 27} y={26} fill={Cores.texto} fontSize={10} fontFamily={Fonte}>O₂ {fmt(po2)}</SvgText>
        <Rect x={x1 + w + 14} y={36} width={9} height={9} fill="#6FD3FF" fillOpacity={0.55} />
        <SvgText x={x1 + w + 27} y={44} fill={Cores.texto} fontSize={10} fontFamily={Fonte}>N₂ e outros</SvgText>
        <Rect x={x1 + w + 14} y={54} width={9} height={9} fill="#8A93A6" fillOpacity={0.5} />
        <SvgText x={x1 + w + 27} y={62} fill={Cores.texto} fontSize={10} fontFamily={Fonte}>Vapor 47</SvgText>
        <SvgText x={x1 + w + 14} y={82} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>mmHg</SvgText>
      </G>
    </G>
  );
}

function Henry({ larg, H, razao }: { larg: number; H: number; razao: number }) {
  // Frasco com líquido: as bolhas aparecem quando o nitrogênio dissolvido passa da pressão do ar em volta.
  const w = Math.min(150, larg * 0.5);
  const x = (larg - w) / 2;
  const topo = 30;
  const fundo = H - 20;
  const n = Math.max(0, Math.min(BOLHAS.length, Math.round((razao - 1) * 16)));
  return (
    <G>
      <Rect x={x} y={topo - 14} width={w} height={fundo - topo + 14} rx={14} fill="none" stroke={Cores.textoSuave} strokeWidth={1.4} />
      <Rect x={x + 3} y={topo + 6} width={w - 6} height={fundo - topo - 9} rx={11} fill="url(#liquido)" />
      {BOLHAS.slice(0, n).map(([bx, by, br], i) => (
        <Circle key={i} cx={x + 10 + bx * (w - 20)} cy={topo + 14 + by * (fundo - topo - 28)} r={br} fill="#FFFFFF" fillOpacity={0.75} />
      ))}
      <SvgText x={larg / 2} y={topo - 20} fill={n ? Cores.dourado : Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">
        {n ? 'NITROGÊNIO TENDE A SAIR EM BOLHAS' : 'NITROGÊNIO DISSOLVIDO, SEM BOLHAS'}
      </SvgText>
      <SvgText x={larg / 2} y={H - 4} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">TECIDOS SATURADOS AO NÍVEL DO MAR (≈ {fmt(N2_TECIDO)} mmHg DE N₂)</SvgText>
    </G>
  );
}

const styles = StyleSheet.create({
  abas: { flexDirection: 'row', gap: 6 },
  aba: { flex: 1, minHeight: 40, borderRadius: Raio - 8, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
  abaAtiva: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  palco: { borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: Cores.linha },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  atalhos: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  atalho: { paddingHorizontal: 10, minHeight: 32, justifyContent: 'center', borderRadius: 16, borderWidth: 1, borderColor: Cores.linha },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
});
