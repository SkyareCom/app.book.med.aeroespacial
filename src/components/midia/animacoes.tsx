import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Fonte } from '@/constants/theme';
import { pressaoBarometrica } from '@/lib/fisiologia';

// Animações em laço (o "GIF" do app): leves, em SVG, sem arquivo de vídeo. Tocar pausa ou retoma.
// Todas são esquemas ilustrativos; os números exibidos vêm de cálculos já registrados nos voos:
// Boyle e Dalton na atmosfera padrão ICAO (M1V1 - II); oxigênio inspirado = 0,2095 × (PB − 47).

const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

// Fase de 0 a 1 que se repete a cada `periodo` ms.
function useCiclo(periodo: number) {
  const [fase, setFase] = useState(0);
  const [tocando, setTocando] = useState(true);
  const inicio = useRef<number | null>(null);
  const acumulado = useRef(0);
  useEffect(() => {
    if (!tocando) return;
    let quadro = 0;
    inicio.current = null;
    const passo = (agora: number) => {
      if (inicio.current === null) inicio.current = agora - acumulado.current;
      acumulado.current = agora - inicio.current;
      setFase((acumulado.current % periodo) / periodo);
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [tocando, periodo]);
  return { fase, tocando, alternar: () => setTocando((v) => !v) };
}

function Quadro({ titulo, instrucao, ciclo, altura, children }: { titulo: string; instrucao: string; ciclo: ReturnType<typeof useCiclo>; altura: number; children: (w: number) => ReactNode }) {
  const [larg, setLarg] = useState(300);
  return (
    <MolduraMidia tipo="Animação" titulo={titulo} instrucao={instrucao}>
      <Pressable accessibilityRole="button" accessibilityLabel={ciclo.tocando ? 'Pausar animação' : 'Tocar animação'} onPress={ciclo.alternar} onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={altura}>{children(larg)}</Svg>
        <View style={styles.pausa}>
          <Texto t="rodape" cor={Cores.textoApagado}>{ciclo.tocando ? 'TOQUE PARA PAUSAR' : 'PAUSADO · TOQUE PARA TOCAR'}</Texto>
        </View>
      </Pressable>
    </MolduraMidia>
  );
}

const suave = (x: number) => 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, x)));
// Pontos fixos pseudoaleatórios (sem Math.random, para não piscar a cada quadro).
const PONTOS = Array.from({ length: 90 }, (_, i) => ({ x: ((i * 37) % 97) / 97, y: ((i * 61) % 89) / 89 }));

// ---------------------------------------------------------------- M1V1 · O balão que sobe
export function AnimacaoBalao() {
  const c = useCiclo(9000);
  // Sobe em 7 s até 30.000 ft e volta em 2 s.
  const sub = c.fase < 0.78 ? suave(c.fase / 0.78) : 1 - suave((c.fase - 0.78) / 0.22);
  const ft = sub * 30000;
  const pb = pressaoBarometrica(ft);
  const vol = 760 / pb;
  const H = 240;
  return (
    <Quadro titulo="O ar rarefeito, visto por um balão" instrucao="Esquema: o balão sobe e cresce porque a pressão de fora cai (lei de Boyle). Os pontos são o ar: cada vez mais espaçados." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 46, yT = 16, yB = H - 20;
        const Y = (f: number) => yB - (f / 30000) * (yB - yT);
        const r = 14 * Math.cbrt(vol);
        const cx = w * 0.62;
        return (
          <G>
            <Defs>
              <LinearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#071a3a" />
                <Stop offset="1" stopColor="#2b6fae" />
              </LinearGradient>
            </Defs>
            <Rect x={x0} y={yT} width={w - x0 - 8} height={yB - yT} rx={8} fill="url(#ceu)" />
            {PONTOS.map((p, i) => {
              const f = p.y * 30000;
              // Densidade do ar ∝ pressão: os pontos altos somem na proporção da queda de pressão.
              if (i / PONTOS.length > pressaoBarometrica(f) / 760) return null;
              return <Circle key={i} cx={x0 + 6 + p.x * (w - x0 - 20)} cy={Y(f)} r={1.6} fill="#cfe9ff" fillOpacity={0.7} />;
            })}
            {[0, 10000, 18000, 30000].map((f) => (
              <G key={f}>
                <Line x1={x0 - 4} y1={Y(f)} x2={x0} y2={Y(f)} stroke={Cores.textoApagado} />
                <SvgText x={x0 - 7} y={Y(f) + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{f ? `${f / 1000} mil` : '0'}</SvgText>
              </G>
            ))}
            <Line x1={x0} y1={Y(18000)} x2={w - 8} y2={Y(18000)} stroke={Cores.dourado} strokeDasharray="4 4" />
            <SvgText x={w - 12} y={Y(18000) - 4} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="end">METADE DA PRESSÃO</SvgText>
            <Line x1={cx} y1={Y(ft) + r} x2={cx} y2={Y(ft) + r + 14} stroke="#d9e6f2" strokeWidth={1} />
            <Rect x={cx - 4} y={Y(ft) + r + 14} width={8} height={6} fill="#d9e6f2" />
            <Ellipse cx={cx} cy={Y(ft)} rx={r} ry={r * 1.08} fill="#f4f7fb" fillOpacity={0.92} />
            <SvgText x={x0 + 10} y={yT + 16} fill={Cores.texto} fontSize={11} fontFamily={Fonte}>{fmt(Math.round(ft / 100) * 100)} ft</SvgText>
            <SvgText x={x0 + 10} y={yT + 30} fill={Cores.textoSuave} fontSize={10} fontFamily={Fonte}>{fmt(pb)} mmHg</SvgText>
            <SvgText x={x0 + 10} y={yT + 43} fill={Cores.textoSuave} fontSize={10} fontFamily={Fonte}>balão {fmt(vol, 1)}×</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M1V2 · Respirar sob pressão positiva
export function AnimacaoPressaoPositiva() {
  const c = useCiclo(5000);
  const inspira = c.fase < 0.45;
  const vol = inspira ? suave(c.fase / 0.45) : 1 - suave((c.fase - 0.45) / 0.55);
  const H = 200;
  return (
    <Quadro titulo="O oxigênio empurrado para dentro" instrucao="Esquema: a máscara mantém pressão acima da ambiente o tempo todo. Inspirar fica fácil; expirar exige esforço contra essa pressão." ciclo={c} altura={H}>
      {(w) => {
        const cx = w * 0.3;
        const esc = 0.75 + 0.35 * vol;
        const x0 = w * 0.56, x1 = w - 10, yZ = 150, yP = 95;
        const X = (f: number) => x0 + f * (x1 - x0);
        let traco = '';
        for (let i = 0; i <= 40; i++) traco += `${i ? 'L' : 'M'}${X(i / 40)} ${yP - 10 * Math.sin((i / 40) * Math.PI * 2)}`;
        return (
          <G>
            <G transform={`translate(${cx} 100) scale(${esc}) translate(${-cx} -100)`}>
              <Path d={`M${cx - 6} 60 C ${cx - 50} 60, ${cx - 58} 150, ${cx - 26} 150 C ${cx - 10} 150, ${cx - 6} 120, ${cx - 6} 90 Z`} fill="#7fb7ff" fillOpacity={0.55} stroke="#9cc8ff" />
              <Path d={`M${cx + 6} 60 C ${cx + 50} 60, ${cx + 58} 150, ${cx + 26} 150 C ${cx + 10} 150, ${cx + 6} 120, ${cx + 6} 90 Z`} fill="#7fb7ff" fillOpacity={0.55} stroke="#9cc8ff" />
            </G>
            <Line x1={cx} y1={20} x2={cx} y2={62} stroke="#9cc8ff" strokeWidth={4} />
            <Rect x={cx - 22} y={6} width={44} height={20} rx={10} fill="#2f3a48" stroke={Cores.textoApagado} />
            {[0, 1, 2].map((k) => {
              const t = (c.fase * 3 + k / 3) % 1;
              const y = inspira ? 10 + t * 60 : 70 - t * 60;
              return <Circle key={k} cx={cx + (k - 1) * 5} cy={y} r={3} fill={inspira ? Cores.acerto : Cores.dourado} />;
            })}
            <SvgText x={cx} y={H - 12} fill={inspira ? Cores.acerto : Cores.dourado} fontSize={11} fontFamily={Fonte} textAnchor="middle">{inspira ? 'INSPIRA: O₂ ENTRA SOZINHO' : 'EXPIRA: CONTRA A PRESSÃO'}</SvgText>
            <Line x1={x0} y1={yZ} x2={x1} y2={yZ} stroke={Cores.linha} />
            <SvgText x={x0} y={yZ + 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>PRESSÃO AMBIENTE</SvgText>
            <Path d={traco} stroke={Cores.destaque} strokeWidth={2} fill="none" />
            <SvgText x={x0} y={yP - 22} fill={Cores.destaque} fontSize={9} fontFamily={Fonte}>PRESSÃO NA MÁSCARA</SvgText>
            <Line x1={X(c.fase)} y1={yP - 18} x2={X(c.fase)} y2={yZ} stroke={Cores.texto} strokeDasharray="2 3" />
            <Path d={`M${X(0.08)} ${yZ - 4} L${X(0.08)} ${yP + 14}`} stroke={Cores.acerto} strokeWidth={1.5} />
            <SvgText x={X(0.1)} y={(yZ + yP) / 2 + 8} fill={Cores.acerto} fontSize={9} fontFamily={Fonte}>SEMPRE ACIMA</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M1V3 · Bolhas de nitrogênio
export function AnimacaoBolhas() {
  const c = useCiclo(9000);
  // 0–0,15 solo; 0,15–0,55 subida rápida; 0,55–0,8 bolhas em altitude; 0,8–1 recompressão.
  const alt = c.fase < 0.15 ? 0 : c.fase < 0.55 ? suave((c.fase - 0.15) / 0.4) : c.fase < 0.8 ? 1 : 1 - suave((c.fase - 0.8) / 0.2);
  const bolha = c.fase < 0.4 ? 0 : c.fase < 0.8 ? suave((c.fase - 0.4) / 0.4) : 1 - suave((c.fase - 0.8) / 0.2);
  const H = 190;
  const fase = c.fase < 0.15 ? 'Solo: nitrogênio dissolvido' : c.fase < 0.55 ? 'Subida rápida: a pressão cai' : c.fase < 0.8 ? 'Em altitude: bolhas nos tecidos' : 'Pressão de volta: as bolhas encolhem';
  return (
    <Quadro titulo="Como nascem as bolhas" instrucao="Esquema: no solo, o nitrogênio está dissolvido; quando a pressão cai depressa, ele sai da solução e forma bolhas (lei de Henry)." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 12, x1 = w - 12, yT = 34, yB = H - 26;
        return (
          <G>
            <Rect x={x0} y={yT} width={x1 - x0} height={yB - yT} rx={12} fill="#5a1f2b" fillOpacity={0.55} stroke="#a3485c" />
            <Path d={`M${x0 + 20} ${(yT + yB) / 2} C ${w * 0.35} ${yT + 10}, ${w * 0.6} ${yB - 10}, ${x1 - 20} ${(yT + yB) / 2}`} stroke="#c0394f" strokeWidth={12} strokeOpacity={0.6} fill="none" />
            {PONTOS.slice(0, 60).map((p, i) => {
              const px = x0 + 10 + p.x * (x1 - x0 - 20);
              const py = yT + 8 + p.y * (yB - yT - 16);
              // Cada ponto migra para o centro de uma das 5 bolhas conforme `bolha` cresce.
              const k = i % 5;
              const bx = x0 + (x1 - x0) * (0.15 + 0.17 * k);
              const by = yT + (yB - yT) * (0.35 + 0.3 * ((k * 3) % 2));
              return <Circle key={i} cx={px + (bx - px) * bolha} cy={py + (by - py) * bolha} r={1.8} fill="#e8f2ff" fillOpacity={1 - 0.7 * bolha} />;
            })}
            {[0, 1, 2, 3, 4].map((k) => {
              const bx = x0 + (x1 - x0) * (0.15 + 0.17 * k);
              const by = yT + (yB - yT) * (0.35 + 0.3 * ((k * 3) % 2));
              return <Circle key={k} cx={bx} cy={by} r={2 + 12 * bolha * (0.7 + 0.15 * k)} fill="#e8f2ff" fillOpacity={0.25 + 0.5 * bolha} stroke="#ffffff" strokeOpacity={bolha} />;
            })}
            <SvgText x={x0} y={20} fill={Cores.texto} fontSize={11} fontFamily={Fonte}>{fase}</SvgText>
            <Rect x={x0} y={H - 14} width={x1 - x0} height={6} rx={3} fill={Cores.trilha} />
            <Rect x={x0} y={H - 14} width={(x1 - x0) * alt} height={6} rx={3} fill={Cores.destaque} />
            <SvgText x={x1} y={20} fill={Cores.destaque} fontSize={9} fontFamily={Fonte} textAnchor="end">ALTITUDE ↑</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M1V4 · Afterdrop
export function AnimacaoAfterdrop() {
  const c = useCiclo(8000);
  // 0–0,25 vítima estável; 0,25–0,75 calor nos braços e pernas devolve sangue frio ao centro; 0,75–1 núcleo esfria.
  const retorno = c.fase < 0.25 ? 0 : c.fase < 0.75 ? suave((c.fase - 0.25) / 0.5) : 1;
  const H = 210;
  const corNucleo = (k: number) => {
    const q = [232, 120, 60], f = [80, 150, 230];
    return `rgb(${q.map((v, i) => Math.round(v + (f[i] - v) * k)).join(',')})`;
  };
  return (
    <Quadro titulo="Afterdrop: o frio que volta ao centro" instrucao="Esquema: aquecer ou mexer braços e pernas abre a circulação deles, e o sangue frio volta ao tronco. A temperatura central cai ainda mais." ciclo={c} altura={H}>
      {(w) => {
        const cx = w / 2;
        const frio = '#4E8FE8';
        const mov = (k: number) => (retorno * 1.4 + k * 0.25) % 1;
        return (
          <G>
            <Circle cx={cx} cy={28} r={16} fill={corNucleo(retorno * 0.6)} />
            <Rect x={cx - 26} y={46} width={52} height={78} rx={18} fill={corNucleo(retorno * 0.85)} />
            <Rect x={cx - 52} y={50} width={22} height={70} rx={10} fill={frio} />
            <Rect x={cx + 30} y={50} width={22} height={70} rx={10} fill={frio} />
            <Rect x={cx - 24} y={126} width={22} height={74} rx={10} fill={frio} />
            <Rect x={cx + 2} y={126} width={22} height={74} rx={10} fill={frio} />
            {retorno > 0 && retorno < 1
              ? [0, 1, 2].flatMap((k) => [
                  <Circle key={`b${k}`} cx={cx - 41 + 20 * mov(k)} cy={110 - 40 * mov(k)} r={3} fill="#bfe0ff" />,
                  <Circle key={`c${k}`} cx={cx + 41 - 20 * mov(k)} cy={110 - 40 * mov(k)} r={3} fill="#bfe0ff" />,
                  <Circle key={`d${k}`} cx={cx - 13 + 4 * mov(k)} cy={190 - 70 * mov(k)} r={3} fill="#bfe0ff" />,
                  <Circle key={`e${k}`} cx={cx + 13 - 4 * mov(k)} cy={190 - 70 * mov(k)} r={3} fill="#bfe0ff" />,
                ])
              : null}
            {c.fase > 0.2 && c.fase < 0.8 ? (
              <G>
                <SvgText x={cx - 70} y={70} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="end">CALOR NOS</SvgText>
                <SvgText x={cx - 70} y={82} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="end">BRAÇOS</SvgText>
              </G>
            ) : null}
            <SvgText x={w - 4} y={38} fill={retorno > 0.6 ? frio : Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="end">
              {retorno < 0.05 ? 'Centro morno' : retorno < 1 ? 'Sangue frio volta' : 'Centro esfria mais'}
            </SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V1 · A cascata do oxigênio
const ETAPAS = ['AR', 'ALVÉOLO', 'SANGUE', 'TECIDO'];

export function AnimacaoCascata() {
  const c = useCiclo(10000);
  const alto = c.fase >= 0.5;
  const ft = alto ? 18000 : 0;
  const pio2 = 0.2095 * (pressaoBarometrica(ft) - 47);
  const n = Math.round((pio2 / 149) * 14);
  const local = (c.fase % 0.5) / 0.5;
  const H = 170;
  return (
    <Quadro titulo="Quatro etapas, menos oxigênio a cada subida" instrucao="Esquema: as bolinhas são oxigênio. A cada 5 segundos, o ar troca entre o nível do mar e 18.000 ft; a quantidade acompanha o oxigênio inspirado." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 12, x1 = w - 12;
        const larg = (x1 - x0) / 4;
        return (
          <G>
            {ETAPAS.map((e, i) => (
              <G key={e}>
                <Rect x={x0 + i * larg + 3} y={40} width={larg - 6} height={70} rx={10} fill={['#1d4f7a', '#2c6a91', '#7a2c3b', '#6b3b28'][i]} fillOpacity={0.6} />
                <SvgText x={x0 + i * larg + larg / 2} y={128} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="middle">{e}</SvgText>
              </G>
            ))}
            {Array.from({ length: n }, (_, k) => {
              const t = (local + k / n) % 1;
              const x = x0 + 8 + t * (x1 - x0 - 16);
              const y = 52 + ((k * 7) % 5) * 11;
              return <Circle key={k} cx={x} cy={y} r={4} fill={Cores.acerto} fillOpacity={0.9} />;
            })}
            <SvgText x={x0} y={22} fill={alto ? Cores.dourado : Cores.texto} fontSize={11} fontFamily={Fonte}>{alto ? '18.000 ft' : 'Nível do mar'}</SvgText>
            <SvgText x={x1} y={22} fill={Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="end">O₂ inspirado ≈ {fmt(pio2)} mmHg</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V1 · Hiperventilação
export function AnimacaoHiperventilacao() {
  const c = useCiclo(10000);
  // 0–0,5 respiração normal; 0,5–1 respiração acelerada: o gás carbônico cai e o vaso cerebral se estreita.
  const rapida = c.fase >= 0.5;
  const local = (c.fase % 0.5) / 0.5;
  const ritmo = rapida ? 6 : 2;
  const peito = 0.5 + 0.5 * Math.sin(local * Math.PI * 2 * ritmo);
  const co2 = rapida ? 1 - 0.55 * suave(local * 1.4) : 1 - 0.55 * (1 - suave(local * 2));
  const H = 180;
  return (
    <Quadro titulo="Respirar rápido demais" instrucao="Esquema: a respiração acelera, o gás carbônico do sangue cai e os vasos do cérebro se estreitam. Daí vêm a tontura e o formigamento." ciclo={c} altura={H}>
      {(w) => {
        const cx = w * 0.22;
        const vx = w * 0.72;
        const raio = 10 + 12 * co2;
        return (
          <G>
            <Ellipse cx={cx} cy={90} rx={30 + 10 * peito} ry={44 + 8 * peito} fill="#7fb7ff" fillOpacity={0.5} stroke="#9cc8ff" />
            <SvgText x={cx} y={158} fill={rapida ? Cores.dourado : Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="middle">RESPIRAÇÃO</SvgText>
            <SvgText x={cx} y={171} fill={rapida ? Cores.dourado : Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="middle">{rapida ? 'ACELERADA' : 'NORMAL'}</SvgText>
            <Rect x={w * 0.42} y={40} width={16} height={100} rx={8} fill={Cores.trilha} />
            <Rect x={w * 0.42} y={40 + 100 * (1 - co2)} width={16} height={100 * co2} rx={8} fill={Cores.dourado} />
            <SvgText x={w * 0.42 + 8} y={160} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="middle">CO₂</SvgText>
            <Rect x={vx - 60} y={90 - raio} width={120} height={raio * 2} rx={raio} fill="#c0394f" fillOpacity={0.75} />
            <SvgText x={vx} y={90 - 30} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="middle">VASO DO CÉREBRO</SvgText>
            <SvgText x={vx} y={160} fill={co2 < 0.6 ? Cores.erro : Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="middle">{co2 < 0.6 ? 'MENOS SANGUE: TONTURA' : 'FLUXO NORMAL'}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

const styles = StyleSheet.create({
  pausa: { alignItems: 'flex-end', marginTop: 2 },
});
