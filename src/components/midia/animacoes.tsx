import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, G, Line, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { SvgText } from '@/components/svg-texto';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Fonte } from '@/constants/theme';
import { pressaoBarometrica } from '@/lib/fisiologia';
import { MAPA_MUNDI } from '@/components/midia/mapa-mundi';

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

// ---------------------------------------------------------------- M1V5 · Chuveiro de raios cósmicos
// Esquema: uma partícula primária bate num átomo do alto da atmosfera e se parte numa cascata de partículas
// secundárias (nêutrons, prótons, elétrons, múons...); o ar absorve a maior parte antes do solo (FAA AC 120-61B;
// Radioprotection 2017;52(3)). Trajetórias e alturas são ilustrativas.
const RAMOS = Array.from({ length: 16 }, (_, i) => ({
  ang: ((i / 15) * 2 - 1) * 0.62 + (((i * 7) % 5) - 2) * 0.03,
  // Fração do caminho até o solo em que a partícula é absorvida pelo ar (só algumas chegam ao chão).
  fim: i % 5 === 0 ? 1 : 0.42 + (((i * 13) % 7) / 7) * 0.4,
  atraso: ((i * 11) % 6) * 0.03,
}));

export function AnimacaoChuveiro() {
  const c = useCiclo(6000);
  const H = 230;
  const yC = 46; // colisão no alto da atmosfera
  const yCruz = 128;
  const ySolo = 204;
  return (
    <Quadro titulo="O chuveiro de partículas" instrucao="Esquema: a partícula que vem do espaço se parte ao bater no ar. O avião em cruzeiro fica no meio da cascata; no solo, quase tudo já foi absorvido." ciclo={c} altura={H}>
      {(w) => {
        const cx = w * 0.56;
        const chegada = Math.min(1, c.fase / 0.22);
        const px = cx + 70 * (1 - chegada);
        const py = yC - 46 * (1 - chegada);
        const s = Math.max(0, (c.fase - 0.22) / 0.78);
        const L = ySolo - yC;
        return (
          <G>
            <Defs>
              <LinearGradient id="ceuChuveiro" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#02040A" />
                <Stop offset="0.45" stopColor="#0B2142" />
                <Stop offset="1" stopColor="#2C6BAE" />
              </LinearGradient>
            </Defs>
            <Rect x={0} y={0} width={w} height={ySolo} rx={8} fill="url(#ceuChuveiro)" />
            <Rect x={0} y={ySolo} width={w} height={H - ySolo} fill="#1A2A1F" />
            <Line x1={0} y1={yCruz} x2={w} y2={yCruz} stroke={Cores.dourado} strokeOpacity={0.6} strokeDasharray="4 4" strokeWidth={1} />
            <SvgText x={8} y={yCruz - 5} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>CRUZEIRO</SvgText>
            <SvgText x={8} y={16} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>ESPAÇO</SvgText>
            <SvgText x={8} y={H - 10} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>SOLO</SvgText>
            {/* Avião em cruzeiro, de perfil */}
            <G>
              <Ellipse cx={cx - 18} cy={yCruz} rx={36} ry={5} fill="#E8EEF5" />
              <Path d={`M${cx - 50} ${yCruz - 2}l-8 -12h6l12 10z`} fill="#E8EEF5" />
              <Path d={`M${cx - 26} ${yCruz + 1}l14 0l-12 10h-6z`} fill="#C9D4E0" />
            </G>
            {chegada < 1 ? <Circle cx={px} cy={py} r={4} fill={Cores.dourado} /> : null}
            {chegada >= 1 && s < 0.12 ? <Circle cx={cx} cy={yC} r={6 + 40 * s} fill={Cores.dourado} fillOpacity={0.5 * (1 - s / 0.12)} /> : null}
            {RAMOS.map((r, i) => {
              const t = Math.max(0, Math.min(r.fim, (s - r.atraso) * 1.25));
              if (t <= 0) return null;
              const x = cx + Math.sin(r.ang) * L * t * 0.9;
              const y = yC + Math.cos(r.ang) * L * t;
              const absorvida = t >= r.fim && r.fim < 1;
              return <Circle key={i} cx={x} cy={Math.min(y, ySolo - 2)} r={absorvida ? 2 : 2.8} fill={i % 3 === 0 ? '#9CF0C5' : '#BFE0FF'} fillOpacity={absorvida ? 0.25 : 0.95} />;
            })}
            <SvgText x={w - 8} y={16} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="end">PARTÍCULA PRIMÁRIA</SvgText>
            {s > 0.1 ? <SvgText x={w - 8} y={ySolo + 16} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="end">NÊUTRONS, PRÓTONS, ELÉTRONS, MÚONS...</SvgText> : null}
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M1V6 · Do rotor ao olho
// Esquema (o movimento real é rápido demais para a tela). Frequências: rotor de 2 a 8 voltas por segundo, em geral
// 4 a 6; passagem das pás de 10 a 30 Hz, em geral 20 a 25; olho mais sensível de 12,5 a 31,5 Hz (Tamer A et al.,
// CEAS Aeronaut J 2021;12:427-40). Corpo mais sensível de 4 a 8 Hz no eixo vertical (ISO 2631).
export function AnimacaoVibracao() {
  const c = useCiclo(4000);
  const H = 220;
  const giro = 2 * Math.PI * 8 * c.fase;
  const tremor = Math.sin(2 * Math.PI * 40 * c.fase);
  return (
    <Quadro titulo="Do rotor ao olho" instrucao="Esquema: a cada volta do rotor, as pás empurram a estrutura; a vibração chega ao corpo pelo assento e faz tremer a leitura dos instrumentos." ciclo={c} altura={H}>
      {(w) => {
        const cx = w * 0.34;
        const cy = 112 + 1.6 * tremor;
        const rx = w * 0.19;
        const L = w * 0.27;
        const gx = w * 0.79;
        const gy = 96;
        const mostrador = (dx: number, dy: number, op: number, k: string) => (
          <G key={k} opacity={op}>
            <Circle cx={gx + dx} cy={gy + dy} r={26} fill="#0B1626" stroke={Cores.textoSuave} strokeWidth={2} />
            {[-120, -60, 0, 60, 120].map((a) => {
              const r = (a - 90) * (Math.PI / 180);
              return <Line key={a} x1={gx + dx + Math.cos(r) * 19} y1={gy + dy + Math.sin(r) * 19} x2={gx + dx + Math.cos(r) * 24} y2={gy + dy + Math.sin(r) * 24} stroke={Cores.textoSuave} strokeWidth={1.5} />;
            })}
            <Line x1={gx + dx} y1={gy + dy} x2={gx + dx + 15} y2={gy + dy - 11} stroke={Cores.dourado} strokeWidth={2.4} strokeLinecap="round" />
          </G>
        );
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1A2E" />
            <SvgText x={8} y={16} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>ROTOR: 4 A 6 VOLTAS POR SEGUNDO</SvgText>
            <SvgText x={8} y={30} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>PÁS: 20 A 25 Hz</SvgText>
            {/* Helicóptero de perfil, tremendo */}
            <Line x1={cx - rx * 0.6} y1={cy} x2={10} y2={cy - 6} stroke="#C9D4E0" strokeWidth={5} strokeLinecap="round" />
            <Circle cx={14} cy={cy - 8} r={7} fill="none" stroke="#C9D4E0" strokeOpacity={0.6} strokeWidth={1.5} />
            <Ellipse cx={cx} cy={cy} rx={rx} ry={26} fill="#E8EEF5" />
            <Path d={`M${cx + rx * 0.15} ${cy - 22}Q${cx + rx * 0.95} ${cy - 18} ${cx + rx * 0.98} ${cy + 2}L${cx + rx * 0.15} ${cy + 2}z`} fill="#7FB2E5" fillOpacity={0.55} />
            <Circle cx={cx + rx * 0.42} cy={cy - 8} r={6} fill="#2B3A4F" />
            <Rect x={cx + rx * 0.3} y={cy - 2} width={rx * 0.26} height={16} rx={3} fill="#2B3A4F" />
            <Line x1={cx} y1={cy - 26} x2={cx} y2={cy - 40} stroke="#C9D4E0" strokeWidth={3} />
            <Line x1={cx - L * Math.cos(giro)} y1={cy - 41} x2={cx + L * Math.cos(giro)} y2={cy - 41} stroke="#E8EEF5" strokeWidth={3} strokeLinecap="round" />
            <Line x1={cx - L * Math.sin(giro)} y1={cy - 41} x2={cx + L * Math.sin(giro)} y2={cy - 41} stroke="#E8EEF5" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
            <Line x1={cx - rx * 0.7} y1={cy + 38} x2={cx + rx * 0.8} y2={cy + 38} stroke="#C9D4E0" strokeWidth={3} strokeLinecap="round" />
            <Line x1={cx - rx * 0.4} y1={cy + 24} x2={cx - rx * 0.45} y2={cy + 38} stroke="#C9D4E0" strokeWidth={2} />
            <Line x1={cx + rx * 0.4} y1={cy + 24} x2={cx + rx * 0.45} y2={cy + 38} stroke="#C9D4E0" strokeWidth={2} />
            {/* Instrumento: a imagem se desdobra com o tremor */}
            {mostrador(-3 * tremor, 2.5 * tremor, 0.35, 'a')}
            {mostrador(3 * tremor, -2.5 * tremor, 0.35, 'b')}
            {mostrador(0, 0, 0.75, 'c')}
            <SvgText x={gx} y={gy + 44} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="middle">OLHOS: 12,5 A 31,5 Hz</SvgText>
            <SvgText x={gx} y={gy + 56} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="middle">LEITURA TREMIDA</SvgText>
            <SvgText x={8} y={H - 12} fill={Cores.destaque} fontSize={9} fontFamily={Fonte}>CORPO: MAIS SENSÍVEL DE 4 A 8 Hz</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M1V7 · A coluna de sangue
// Esquema: o G sobe de 1 a 7 e volta. Queda da pressão no nível dos olhos de cerca de 22 mmHg por G (Pollock RD et al.,
// Aerosp Med Hum Perform 2019); sintomas pelos pontos médios das faixas sem proteção (StatPearls, 2023).
export function AnimacaoColunaSangue() {
  const c = useCiclo(8000);
  const H = 230;
  const sobe = c.fase < 0.6 ? suave(c.fase / 0.6) : 1 - suave((c.fase - 0.6) / 0.4);
  const g = 1 + 6 * sobe;
  const queda = Math.round(22 * (g - 1));
  const visao = g >= 4.8 ? 'VISÃO APAGADA' : g >= 4.1 ? 'VISÃO CINZA E EM TÚNEL' : 'VISÃO NORMAL';
  const corVisao = g >= 4.8 ? Cores.erro : g >= 4.1 ? Cores.dourado : Cores.acerto;
  const esvazia = Math.min(1, (g - 1) / 4); // fração do vaso da cabeça sem sangue
  return (
    <Quadro titulo="A coluna de sangue" instrucao="Esquema: com o +Gz, o sangue desce do cérebro e dos olhos para as pernas. O coração não consegue empurrá-lo de volta a tempo." ciclo={c} altura={H}>
      {(w) => {
        const cx = w * 0.3;
        const yCab = 40, yCor = 112, yPe = 200;
        const larVaso = 10;
        const topoSangue = yCab + (yCor - yCab) * esvazia;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            {/* corpo sentado, de perfil esquemático */}
            <Circle cx={cx} cy={yCab} r={22} fill="#1E2C40" stroke="#C9D4E0" strokeWidth={1.5} />
            <Circle cx={cx + 9} cy={yCab - 4} r={4} fill={g >= 4.8 ? '#111' : g >= 4.1 ? '#777' : '#E8EEF5'} />
            <Rect x={cx - 18} y={yCab + 24} width={36} height={yCor - yCab + 10} rx={10} fill="#1E2C40" stroke="#C9D4E0" strokeWidth={1.5} />
            <Rect x={cx - 18} y={yCor + 30} width={70} height={18} rx={8} fill="#1E2C40" stroke="#C9D4E0" strokeWidth={1.5} />
            <Rect x={cx + 34} y={yCor + 40} width={18} height={yPe - yCor - 40} rx={8} fill="#1E2C40" stroke="#C9D4E0" strokeWidth={1.5} />
            {/* vaso da cabeça ao coração e às pernas */}
            <Rect x={cx - larVaso / 2} y={yCab} width={larVaso} height={yCor - yCab} rx={4} fill="#3A1418" />
            <Rect x={cx - larVaso / 2} y={topoSangue} width={larVaso} height={yCor - topoSangue} rx={4} fill={Cores.erro} />
            <Rect x={cx + 38} y={yCor + 44} width={10} height={yPe - yCor - 48} rx={4} fill={Cores.erro} fillOpacity={0.45 + 0.55 * esvazia} />
            <Circle cx={cx} cy={yCor} r={9} fill={Cores.erro} stroke={Cores.fundo} strokeWidth={2} />
            {/* seta do G */}
            <Line x1={cx - 44} y1={60} x2={cx - 44} y2={60 + 20 + 60 * sobe} stroke={Cores.dourado} strokeWidth={3} />
            <SvgText x={cx - 44} y={52} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="middle">+Gz</SvgText>
            {/* leituras */}
            <SvgText x={w - 10} y={36} fill={Cores.texto} fontSize={22} fontFamily={Fonte} textAnchor="end">{fmt(g, 1)} G</SvgText>
            <SvgText x={w - 10} y={62} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="end">PRESSÃO NO NÍVEL DOS OLHOS</SvgText>
            <SvgText x={w - 10} y={78} fill={Cores.erro} fontSize={13} fontFamily={Fonte} textAnchor="end">{queda ? `−${queda} mmHg` : 'sem queda'}</SvgText>
            <SvgText x={w - 10} y={106} fill={corVisao} fontSize={10} fontFamily={Fonte} textAnchor="end">{visao}</SvgText>
            <SvgText x={w - 10} y={H - 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">SANGUE DESCE PARA AS PERNAS</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M1V8 · A ejeção
// Esquema da sequência (canopi, catapulta, foguete, paraquedas); tempos de cada fase ilustrativos. Total de cerca de
// 1,8 s até o paraquedas no Gripen da FAB (Defesa Aérea & Naval); fratura da coluna em 20% a 30% das ejeções
// (Zivkovic MM et al., Aerosp Med Hum Perform 2024).
export function AnimacaoEjecao() {
  const c = useCiclo(7000);
  const H = 270;
  const f = c.fase;
  const etapa = f < 0.12 ? 0 : f < 0.22 ? 1 : f < 0.34 ? 2 : f < 0.48 ? 3 : 4;
  const ETAPAS = [
    { t: 'VOO SEM CONTROLE', cor: Cores.textoSuave },
    { t: '1 · O CANOPI É LANÇADO', cor: Cores.textoSuave },
    { t: '2 · CATAPULTA: CARGA NA COLUNA', cor: Cores.erro },
    { t: '3 · FOGUETE: LONGE DO AVIÃO', cor: Cores.dourado },
    { t: '4 · PARAQUEDAS ABERTO', cor: Cores.acerto },
  ];
  return (
    <Quadro titulo="A ejeção" instrucao="Esquema da sequência do assento ejetável. No Gripen da FAB, do comando ao paraquedas aberto, cerca de 1,8 segundo." ciclo={c} altura={H}>
      {(w) => {
        const ax = Math.max(w * 0.3, 92), ay = 186;
        // canopi
        const tc = suave((f - 0.12) / 0.12);
        const canX = ax + 6 - 70 * tc, canY = ay - 22 - 70 * tc;
        // assento: sobe na catapulta e no foguete; depois desce com o paraquedas, à deriva
        const subida = suave((f - 0.22) / 0.26);
        const descida = suave((f - 0.48) / 0.52);
        const sx = ax + 4 + 50 * subida + 30 * descida;
        const sy = ay - 20 - 92 * subida + 60 * descida;
        const chute = suave((f - 0.48) / 0.1);
        const fogo = f >= 0.26 && f < 0.48;
        const carga = f >= 0.22 && f < 0.34;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1A2E" />
            <SvgText x={8} y={H - 30} fill={ETAPAS[etapa].cor} fontSize={10} fontFamily={Fonte}>{ETAPAS[etapa].t}</SvgText>
            {/* avião de perfil */}
            <Path d={`M${ax - 70} ${ay} L${ax + 70} ${ay - 4} Q${ax + 96} ${ay} ${ax + 70} ${ay + 6} L${ax - 70} ${ay + 8} z`} fill="#C9D4E0" />
            <Path d={`M${ax - 60} ${ay} L${ax - 78} ${ay - 24} L${ax - 64} ${ay - 24} L${ax - 40} ${ay}`} fill="#C9D4E0" />
            <Path d={`M${ax - 10} ${ay + 4} L${ax + 30} ${ay + 18} L${ax + 40} ${ay + 18} L${ax + 20} ${ay + 4}`} fill="#9FB0C4" />
            {/* canopi */}
            {f >= 0.24 ? null : f >= 0.12 ? (
              <Path d={`M${canX - 14} ${canY + 10} Q${canX} ${canY - 6} ${canX + 18} ${canY + 10} z`} fill="#7FB2E5" fillOpacity={0.7 * (1 - tc)} />
            ) : (
              <Path d={`M${ax - 8} ${ay - 2} Q${ax + 6} ${ay - 20} ${ax + 26} ${ay - 2} z`} fill="#7FB2E5" fillOpacity={0.7} />
            )}
            {/* paraquedas */}
            {chute > 0 ? (
              <G opacity={chute}>
                <Path d={`M${sx - 30 * chute} ${sy - 40} Q${sx} ${sy - 40 - 34 * chute} ${sx + 30 * chute} ${sy - 40} z`} fill={Cores.dourado} />
                <Line x1={sx - 30 * chute} y1={sy - 40} x2={sx} y2={sy - 6} stroke="#C9D4E0" strokeWidth={1} />
                <Line x1={sx + 30 * chute} y1={sy - 40} x2={sx} y2={sy - 6} stroke="#C9D4E0" strokeWidth={1} />
              </G>
            ) : null}
            {/* assento com o piloto */}
            <Rect x={sx - 6} y={sy - 10} width={6} height={22} rx={2} fill="#3A4A60" />
            <Circle cx={sx + 4} cy={sy - 6} r={5} fill={carga ? Cores.erro : '#E8EEF5'} />
            <Rect x={sx} y={sy} width={8} height={12} rx={2} fill={carga ? Cores.erro : '#E8EEF5'} />
            {fogo ? <Path d={`M${sx - 4} ${sy + 12} L${sx - 1} ${sy + 32} L${sx + 4} ${sy + 12} z`} fill={Cores.dourado} /> : null}
            {carga ? <SvgText x={sx + 16} y={sy + 6} fill={Cores.erro} fontSize={9} fontFamily={Fonte}>VÉRTEBRAS</SvgText> : null}
            <SvgText x={8} y={H - 12} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>FRATURA DA COLUNA EM 20% A 30%</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V2 · O coração na cabine
// Esquema: no solo e na cabine pressurizada, o coração bate e as bolinhas (oxigênio) seguem com o sangue. Na cabine,
// menos oxigênio por volta e batidas um pouco mais rápidas. Saturação ~93% a 8.000 ft (ICAO, Doc 8984, Tabela II-1-2);
// +2,4 bpm em média a 7.000 ft (FAA, RITE-ACER-CoE-2011-1). Ritmo das batidas ilustrativo.
export function AnimacaoCoracao() {
  const c = useCiclo(12000);
  const cabine = c.fase >= 0.5;
  const local = (c.fase % 0.5) / 0.5;
  const batidas = cabine ? 7.6 : 7;
  const pulso = Math.pow(Math.max(0, Math.sin(local * Math.PI * 2 * batidas)), 6);
  const n = cabine ? 9 : 12;
  const H = 200;
  return (
    <Quadro titulo="O coração no solo e na cabine" instrucao="Esquema: as bolinhas são oxigênio levado pelo sangue. A cada 6 segundos, a cena troca entre o solo e a cabine em cruzeiro." ciclo={c} altura={H}>
      {(w) => {
        const cx = w * 0.24, cy = 100;
        const esc = 1 + 0.08 * pulso;
        const raio = Math.min(w * 0.19, 70);
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <Ellipse cx={cx} cy={cy} rx={raio} ry={58} fill="none" stroke="#3A1418" strokeWidth={10} />
            {Array.from({ length: n }, (_, k) => {
              const t = (local * 1.6 + k / n) % 1;
              const a = t * Math.PI * 2;
              return <Circle key={k} cx={cx + raio * Math.cos(a)} cy={cy + 58 * Math.sin(a)} r={4} fill={Cores.acerto} />;
            })}
            <G transform={`translate(${cx} ${cy}) scale(${esc}) translate(${-cx} ${-cy})`}>
              <Path d={`M ${cx} ${cy + 26} C ${cx - 40} ${cy} ${cx - 34} ${cy - 30} ${cx - 14} ${cy - 30} C ${cx - 4} ${cy - 30} ${cx} ${cy - 22} ${cx} ${cy - 16} C ${cx} ${cy - 22} ${cx + 4} ${cy - 30} ${cx + 14} ${cy - 30} C ${cx + 34} ${cy - 30} ${cx + 40} ${cy} ${cx} ${cy + 26} Z`} fill={Cores.erro} />
            </G>
            <SvgText x={w - 10} y={30} fill={cabine ? Cores.dourado : Cores.texto} fontSize={12} fontFamily={Fonte} textAnchor="end">{cabine ? 'CABINE EM CRUZEIRO' : 'SOLO'}</SvgText>
            <SvgText x={w - 10} y={48} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="end">{cabine ? '5.000 A 8.000 FT' : 'NÍVEL DO MAR'}</SvgText>
            <SvgText x={w - 10} y={H - 44} fill={cabine ? Cores.dourado : Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="end">{cabine ? 'SATURAÇÃO ≈ 93% A 8.000 FT' : 'MAIS OXIGÊNIO POR VOLTA'}</SvgText>
            <SvgText x={w - 10} y={H - 26} fill={cabine ? Cores.dourado : Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor="end">{cabine ? 'CORAÇÃO MAIS RÁPIDO: +2,4 BPM' : 'RITMO DE REPOUSO'}</SvgText>
            <SvgText x={w - 10} y={H - 12} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="end">{cabine ? 'MÉDIA A 7.000 FT (FAA)' : ''}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V2 · A válvula que aperta
// Esquema: válvula normal e com estenose. Na estenose, as cúspides abrem pouco e o sangue passa num jato estreito.
export function AnimacaoValvula() {
  const c = useCiclo(10000);
  const estenose = c.fase >= 0.5;
  const local = (c.fase % 0.5) / 0.5;
  const abre = Math.max(0, Math.sin(local * Math.PI * 2 * 4));
  const ang = (estenose ? 18 : 62) * abre;
  const H = 180;
  return (
    <Quadro titulo="A válvula que aperta" instrucao="Esquema: a cada 5 segundos, a cena troca entre uma válvula normal e uma com estenose, em que a abertura fica estreita." ciclo={c} altura={H}>
      {(w) => {
        const cx = w / 2, cy = 96, L = 46;
        const rad = (g: number) => (g * Math.PI) / 180;
        const larg = estenose ? 8 : 34;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <Rect x={cx - 64} y={cy - 64} width={128} height={124} rx={16} fill="#1E2C40" stroke="#C9D4E0" strokeWidth={1} />
            {Array.from({ length: estenose ? 6 : 12 }, (_, k) => {
              const t = (local * (estenose ? 6 : 3) + k / (estenose ? 6 : 12)) % 1;
              const y = cy + 60 - t * 130;
              const x = cx + ((k % 3) - 1) * (larg / 3) * (y < cy ? 1 : 2);
              return abre > 0.2 ? <Circle key={k} cx={x} cy={y} r={3.5} fill={Cores.erro} /> : null;
            })}
            <Line x1={cx - L} y1={cy} x2={cx - L + L * Math.cos(rad(ang))} y2={cy - L * Math.sin(rad(ang))} stroke={estenose ? Cores.dourado : '#E8EEF5'} strokeWidth={estenose ? 7 : 4} strokeLinecap="round" />
            <Line x1={cx + L} y1={cy} x2={cx + L - L * Math.cos(rad(ang))} y2={cy - L * Math.sin(rad(ang))} stroke={estenose ? Cores.dourado : '#E8EEF5'} strokeWidth={estenose ? 7 : 4} strokeLinecap="round" />
            <SvgText x={cx} y={20} fill={estenose ? Cores.dourado : Cores.texto} fontSize={11} fontFamily={Fonte} textAnchor="middle">{estenose ? 'ESTENOSE: ABERTURA ESTREITA' : 'VÁLVULA NORMAL'}</SvgText>
            <SvgText x={cx} y={H - 8} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{estenose ? 'MAIS FORÇA PARA EMPURRAR' : 'O SANGUE PASSA SEM ESFORÇO'}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V8 · O relógio de 24 horas
// Esquema qualitativo de quem dorme das 23 às 7 h: melatonina à noite (pico perto de 3–4 h), cortisol com pico no início
// da manhã e temperatura do corpo com mínimo no início da manhã. Faixa: janela de baixa circadiana (2–6 h).
export function AnimacaoRelogio() {
  const c = useCiclo(16000);
  const h = c.fase * 24;
  const H = 200;
  const gauss = (x: number, m: number, s: number) => {
    const d = Math.min(Math.abs(x - m), 24 - Math.abs(x - m));
    return Math.exp(-(d * d) / (2 * s * s));
  };
  const melatonina = (x: number) => gauss(x, 3.5, 3.2);
  const cortisol = (x: number) => gauss(x, 7.5, 2.6) * 0.95 + 0.08;
  const temperatura = (x: number) => 0.5 - 0.42 * Math.cos(((x - 5) / 24) * Math.PI * 2);
  const frase = h >= 2 && h < 6 ? 'JANELA DE BAIXA CIRCADIANA' : h >= 6 && h < 10 ? 'CORTISOL ALTO: DESPERTAR' : h >= 15 && h < 17 ? 'QUEDA DA TARDE' : h >= 21 || h < 2 ? 'MELATONINA SUBINDO' : 'DIA: MELATONINA BAIXA';
  const corFrase = h >= 2 && h < 6 ? Cores.erro : h >= 15 && h < 17 ? Cores.dourado : Cores.texto;
  return (
    <Quadro titulo="O relógio de 24 horas" instrucao="Esquema de quem dorme das 23 às 7 horas: a linha percorre o dia e mostra a melatonina, o cortisol e a temperatura do corpo." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 12, x1 = w - 12, y0 = 44, y1 = H - 34;
        const px = (x: number) => x0 + (x / 24) * (x1 - x0);
        const py = (v: number) => y1 - v * (y1 - y0);
        const curva = (f: (x: number) => number) => Array.from({ length: 97 }, (_, k) => {
          const x = (k / 96) * 24;
          return `${k ? 'L' : 'M'} ${px(x).toFixed(1)} ${py(f(x)).toFixed(1)}`;
        }).join(' ');
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <Rect x={px(0)} y={y0} width={px(7) - px(0)} height={y1 - y0} fill="#16233A" />
            <Rect x={px(23)} y={y0} width={px(24) - px(23)} height={y1 - y0} fill="#16233A" />
            <Rect x={px(2)} y={y0} width={px(6) - px(2)} height={y1 - y0} fill={Cores.erro} opacity={0.14} />
            <Path d={curva(temperatura)} stroke="#E8EEF5" strokeWidth={1.5} strokeDasharray="4 3" fill="none" />
            <Path d={curva(cortisol)} stroke={Cores.dourado} strokeWidth={2.5} fill="none" />
            <Path d={curva(melatonina)} stroke="#7FA8FF" strokeWidth={2.5} fill="none" />
            <Line x1={px(h)} y1={y0 - 4} x2={px(h)} y2={y1} stroke={Cores.texto} strokeWidth={1.5} />
            <Circle cx={px(h)} cy={py(melatonina(h))} r={4} fill="#7FA8FF" />
            <Circle cx={px(h)} cy={py(cortisol(h))} r={4} fill={Cores.dourado} />
            {[0, 6, 12, 18, 24].map((t) => (
              <SvgText key={t} x={px(t)} y={y1 + 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={t === 0 ? 'start' : t === 24 ? 'end' : 'middle'}>{`${t} h`}</SvgText>
            ))}
            <SvgText x={12} y={20} fill={Cores.texto} fontSize={13} fontFamily={Fonte}>{`${String(Math.floor(h)).padStart(2, '0')}:00`}</SvgText>
            <SvgText x={w - 12} y={20} fill={corFrase} fontSize={10} fontFamily={Fonte} textAnchor="end">{frase}</SvgText>
            <SvgText x={12} y={H - 6} fill="#7FA8FF" fontSize={9} fontFamily={Fonte}>MELATONINA</SvgText>
            <SvgText x={w / 2} y={H - 6} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="middle">CORTISOL</SvgText>
            <SvgText x={w - 12} y={H - 6} fill="#E8EEF5" fontSize={9} fontFamily={Fonte} textAnchor="end">TEMPERATURA</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V8 · Leste ou oeste no mapa
// Esquema, rotas escolhidas pelo autor: Brasília (UTC−3) → Auckland (UTC+12; UTC+13 no horário de verão da Nova
// Zelândia, de setembro a abril) para o leste, e Tóquio (UTC+9, sem horário de verão) → São Paulo (UTC−3) para o oeste.
// Ajuste médio do CDC: cerca de 1 h por dia para o leste e 1,5 h por dia para o oeste.
const ROTAS = {
  leste: { origem: [132.1, 98.8], destino: [354.8, 119.8], fusos: 15, titulo: 'PARA O LESTE', cidade: 'BRASÍLIA → AUCKLAND', relogio: 'RELÓGIO +15 H (+16 NO VERÃO DA NOVA ZELÂNDIA)', corpo: 'ADIANTAR O CORPO: CERCA DE 1 H POR DIA', cor: Cores.erro },
  oeste: { origem: [319.7, 47.3], destino: [133.4, 106.5], fusos: 12, titulo: 'PARA O OESTE', cidade: 'TÓQUIO → SÃO PAULO', relogio: 'RELÓGIO −12 H', corpo: 'ATRASAR O CORPO: CERCA DE 1,5 H POR DIA', cor: Cores.dourado },
} as const;

export function AnimacaoMapaJetLag() {
  const c = useCiclo(14000);
  const sentido = c.fase < 0.5 ? 'leste' : 'oeste';
  const r = ROTAS[sentido];
  const local = (c.fase % 0.5) / 0.5;
  const t = Math.min(local / 0.7, 1);
  const fusos = Math.min(r.fusos, Math.floor(t * (r.fusos + 0.999)));
  const H = 230;
  return (
    <Quadro titulo="Leste ou oeste no mapa" instrucao="Esquema: primeiro o voo para o leste, de Brasília a Auckland; depois o voo para o oeste, de Tóquio a São Paulo. O contador mostra os fusos cruzados." ciclo={c} altura={H}>
      {(w) => {
        const sx = Math.min((w - 24) / 360, (H - 96) / 150);
        const ox = (w - 360 * sx) / 2, oy = 38;
        const P = (x: number, y: number): [number, number] => [ox + x * sx, oy + y * sx];
        const [x0, y0] = P(r.origem[0], r.origem[1]);
        const [x2, y2] = P(r.destino[0], r.destino[1]);
        const xc = (x0 + x2) / 2, yc = Math.min(y0, y2) - 34 * sx;
        const bx = (u: number) => (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * xc + u * u * x2;
        const by = (u: number) => (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * yc + u * u * y2;
        const px = bx(t), py = by(t);
        const dx = 2 * (1 - t) * (xc - x0) + 2 * t * (x2 - xc), dy = 2 * (1 - t) * (yc - y0) + 2 * t * (y2 - yc);
        const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
        const feito = Array.from({ length: 31 }, (_, k) => {
          const u = (k / 30) * t;
          return `${k ? 'L' : 'M'} ${bx(u).toFixed(1)} ${by(u).toFixed(1)}`;
        }).join(' ');
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            {Array.from({ length: 25 }, (_, k) => {
              const [lx] = P(k * 15, 0);
              return <Line key={k} x1={lx} y1={oy} x2={lx} y2={oy + 150 * sx} stroke="#16233A" strokeWidth={1} />;
            })}
            <G transform={`translate(${ox} ${oy}) scale(${sx})`}>
              <Path d={MAPA_MUNDI} fill="#1E3A5A" stroke="#3D6A96" strokeWidth={0.4 / sx} />
            </G>
            <Path d={`M ${x0} ${y0} Q ${xc} ${yc} ${x2} ${y2}`} stroke={Cores.textoApagado} strokeWidth={1} strokeDasharray="3 3" fill="none" />
            <Path d={feito} stroke={r.cor} strokeWidth={2} fill="none" />
            <Circle cx={x0} cy={y0} r={4} fill={Cores.acerto} />
            <Circle cx={x2} cy={y2} r={4} fill={r.cor} />
            <G transform={`translate(${px} ${py}) rotate(${ang})`}>
              <Path d="M 9 0 L -6 -2 L -9 -8 L -11 -8 L -9 -1.5 L -12 -1 L -13 -4 L -14 -4 L -13.5 0 L -14 4 L -13 4 L -12 1 L -9 1.5 L -11 8 L -9 8 L -6 2 Z" fill="#E8EEF5" />
            </G>
            <SvgText x={10} y={18} fill={r.cor} fontSize={12} fontFamily={Fonte}>{r.titulo}</SvgText>
            <SvgText x={w - 10} y={18} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="end">{r.cidade}</SvgText>
            <SvgText x={10} y={oy + 150 * sx * 0.93} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>← OESTE</SvgText>
            <SvgText x={w - 10} y={oy + 150 * sx * 0.93} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">LESTE →</SvgText>
            <SvgText x={10} y={H - 46} fill={Cores.texto} fontSize={10} fontFamily={Fonte}>{`FUSOS CRUZADOS: ${fusos}`}</SvgText>
            <SvgText x={10} y={H - 29} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>{r.relogio}</SvgText>
            <SvgText x={10} y={H - 12} fill={t >= 1 ? r.cor : Cores.textoApagado} fontSize={10} fontFamily={Fonte}>{t >= 1 ? r.corpo : 'EM VOO'}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V3 · O ouvido na subida e na descida
// Esquema (ICAO Doc 8984 Part III 12.4.3–12.4.4): a tuba auditiva funciona como válvula de uma via; na subida o ar sai
// sozinho; na descida a ponta da tuba fica fechada e o ar só entra quando a pessoa engole, boceja ou faz a Valsalva.
export function AnimacaoOuvido() {
  const c = useCiclo(15000);
  const fase = c.fase < 1 / 3 ? 0 : c.fase < 2 / 3 ? 1 : 2;
  const local = (c.fase * 3) % 1;
  const H = 200;
  const titulo = ['SUBIDA: O AR SAI SOZINHO', 'DESCIDA: A TUBA FICA FECHADA', 'ENGOLIR ABRE A TUBA: O AR ENTRA'][fase];
  const rodape = ['O TÍMPANO ESTUFA PARA FORA E VOLTA', 'O TÍMPANO É PUXADO PARA DENTRO: DOR E OUVIDO CHEIO', 'A PRESSÃO SE IGUALA E O TÍMPANO VOLTA AO LUGAR'][fase];
  const cor = fase === 1 ? Cores.erro : fase === 2 ? Cores.acerto : Cores.dourado;
  const curva = fase === 0 ? -14 * Math.sin(local * Math.PI) : fase === 1 ? 16 * Math.min(1, local * 2) : 16 * Math.max(0, 1 - local * 1.6);
  return (
    <Quadro titulo="O ouvido na subida e na descida" instrucao="Esquema: o canal do ouvido à esquerda, o tímpano, o ouvido médio e a tuba auditiva que desce até o nariz. A cada 5 segundos, a cena passa da subida para a descida e para o gesto de engolir." ciclo={c} altura={H}>
      {(w) => {
        const xt = w * 0.36, yt = 52, yb = 132, ym = (yt + yb) / 2;
        const cx = w * 0.53, cy = ym;
        const nx = w * 0.86, ny = H - 46;
        const tubo = `M ${cx + 26} ${cy + 22} Q ${w * 0.72} ${cy + 30} ${nx} ${ny}`;
        const ponto = (u: number) => {
          const x0 = cx + 26, y0 = cy + 22, x1 = w * 0.72, y1 = cy + 30;
          return [(1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * x1 + u * u * nx, (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * y1 + u * u * ny];
        };
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <Rect x={10} y={ym - 14} width={xt - 10} height={28} fill="#1E2C40" />
            <Ellipse cx={cx} cy={cy} rx={w * 0.15} ry={46} fill="#1E2C40" stroke="#3D6A96" strokeWidth={1} />
            <Path d={tubo} stroke={fase === 1 ? Cores.erro : '#3D6A96'} strokeWidth={10} fill="none" strokeLinecap="round" />
            <Rect x={nx - 22} y={ny} width={44} height={22} rx={6} fill="#1E2C40" stroke="#3D6A96" strokeWidth={1} />
            {fase === 1 ? <Line x1={nx - 8} y1={ny - 8} x2={nx + 8} y2={ny + 8} stroke={Cores.erro} strokeWidth={3} /> : null}
            {fase === 1 ? <Line x1={nx + 8} y1={ny - 8} x2={nx - 8} y2={ny + 8} stroke={Cores.erro} strokeWidth={3} /> : null}
            {fase !== 1
              ? Array.from({ length: 4 }, (_, k) => {
                  const u = (local + k / 4) % 1;
                  const [x, y] = ponto(fase === 0 ? u : 1 - u);
                  return <Circle key={k} cx={x} cy={y} r={3.5} fill="#7FA8FF" />;
                })
              : null}
            <Path d={`M ${xt} ${yt} Q ${xt + curva * 2} ${ym} ${xt} ${yb}`} stroke={cor} strokeWidth={4} fill="none" />
            <SvgText x={12} y={ym + 30} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte}>CANAL</SvgText>
            <SvgText x={cx} y={cy - 52} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">OUVIDO MÉDIO</SvgText>
            <SvgText x={nx} y={ny + 34} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">NARIZ</SvgText>
            <SvgText x={10} y={18} fill={cor} fontSize={11} fontFamily={Fonte}>{titulo}</SvgText>
            <SvgText x={10} y={H - 8} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>{rodape}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V4 · Varredura visual
// FAA (Pilot Vision; AIM, Fitness for Flight): movimentos de até 10°, ao menos 1 s em cada área; cerca de 4–5 s no painel
// para cada 16 s fora. Ciclo de 20 s: 12 setores de 10° em 16 s (1,33 s cada) e 4 s no painel.
export function AnimacaoVarredura() {
  const c = useCiclo(20000);
  const t = c.fase * 20;
  const fora = t < 16;
  const setor = Math.min(11, Math.floor(t / (16 / 12)));
  const alvo = 8;
  const visto = fora && setor >= alvo;
  const H = 190;
  return (
    <Quadro titulo="A varredura do céu" instrucao="Vista do para-brisa: o círculo é onde o olho foca. Ele salta de 10° em 10°, para em cada setor e, no fim, olha o painel. O ponto à direita é outro avião." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 14, x1 = w - 14, larg = (x1 - x0) / 12;
        const hy = 96;
        const fx = fora ? x0 + larg * (setor + 0.5) : w / 2;
        const fy = fora ? hy - 18 : H - 30;
        const ax = x0 + larg * (alvo + 0.5) + 4, ay = hy - 26;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#2E5C8A" />
            <Rect x={0} y={hy} width={w} height={H - hy} fill="#3B5A3A" />
            <Rect x={0} y={H - 48} width={w} height={48} fill="#141E2B" />
            {Array.from({ length: 13 }, (_, i) => (
              <Line key={i} x1={x0 + larg * i} y1={24} x2={x0 + larg * i} y2={hy} stroke="#FFFFFF" strokeOpacity={0.18} strokeDasharray="2 4" />
            ))}
            {fora && Array.from({ length: setor + 1 }, (_, i) => (
              <Rect key={`v${i}`} x={x0 + larg * i} y={24} width={larg} height={hy - 24} fill="#FFFFFF" opacity={0.06} />
            ))}
            <Circle cx={ax} cy={ay} r={2.2} fill={visto ? Cores.dourado : '#DDE6F0'} />
            {visto ? <Circle cx={ax} cy={ay} r={8} fill="none" stroke={Cores.dourado} strokeWidth={1.5} /> : null}
            {[0.2, 0.4, 0.6, 0.8].map((p) => (
              <Rect key={p} x={w * p - 14} y={H - 38} width={28} height={20} rx={3} fill="#22334A" stroke="#3D6A96" />
            ))}
            <Circle cx={fx} cy={fy} r={Math.max(10, larg * 0.45)} fill="none" stroke={fora ? '#FFFFFF' : Cores.dourado} strokeWidth={2} />
            <SvgText x={10} y={16} fill={fora ? '#FFFFFF' : Cores.dourado} fontSize={10} fontFamily={Fonte}>{fora ? `FORA: SETOR ${setor + 1} DE 12 · 10° · 1 S` : 'PAINEL: CERCA DE 4 S'}</SvgText>
            <SvgText x={w - 10} y={16} fill={visto ? Cores.dourado : '#C9D4E0'} fontSize={10} fontFamily={Fonte} textAnchor="end">{visto ? 'TRÁFEGO À VISTA' : fora ? 'PROCURANDO' : ''}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// ---------------------------------------------------------------- M2V5 · O labirinto na curva
// ICAO Doc 8984 Part II 1.7.4 e 1.7.7; FAA Airman Education (10 a 20 s de rotação constante). Ciclo de 16 s: entrada na
// curva (o líquido fica para trás e a cúpula dobra), curva constante (o líquido acompanha e a sensação some), saída (o
// líquido continua e a cúpula dobra para o outro lado) e repouso. O tempo da curva está comprimido.
export function AnimacaoLabirinto() {
  const c = useCiclo(16000);
  const t = c.fase * 16;
  const fase = t < 3 ? 0 : t < 8 ? 1 : t < 12 ? 2 : 3;
  const local = fase === 0 ? t / 3 : fase === 1 ? (t - 3) / 5 : fase === 2 ? (t - 8) / 4 : (t - 12) / 4;
  // giro do canal (a cabeça), em graus acumulados
  const canal = t < 3 ? 40 * t * t / 6 : t < 8 ? 30 + 40 * (t - 3) : 230;
  const atraso = fase === 0 ? 28 * suave(local) : fase === 1 ? 28 * (1 - suave(local)) : fase === 2 ? -28 * Math.sin(Math.PI * Math.min(1, local * 1.2)) : 0;
  const dobra = fase === 0 ? 1 * suave(local) : fase === 1 ? 1 - suave(local) : fase === 2 ? -Math.sin(Math.PI * Math.min(1, local * 1.2)) : 0;
  const H = 200;
  const titulo = ['ENTRANDO NA CURVA: SENTE O GIRO', 'CURVA CONSTANTE: A SENSAÇÃO SOME', 'NIVELANDO: SENTE CURVA AO CONTRÁRIO', 'PARADO: O LÍQUIDO ASSENTA'][fase];
  const cor = [Cores.acerto, Cores.dourado, Cores.erro, Cores.textoSuave][fase];
  return (
    <Quadro titulo="O labirinto numa curva" instrucao="Esquema de um canal semicircular visto de cima: o anel gira com a cabeça e o líquido, com a cúpula, fica para trás. A cena passa pela entrada na curva, pela curva constante e pela saída." ciclo={c} altura={H}>
      {(w) => {
        const cx = w * 0.5, cy = 104, r = 56;
        const a = ((canal - 90) * Math.PI) / 180;
        const px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
        const af = ((canal - 90 - atraso) * Math.PI) / 180;
        const qx = cx + (r - 2) * Math.cos(af), qy = cy + (r - 2) * Math.sin(af);
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <Circle cx={cx} cy={cy} r={r} fill="none" stroke="#3D6A96" strokeWidth={16} />
            <Circle cx={cx} cy={cy} r={r} fill="none" stroke="#4A8CFF" strokeOpacity={0.35} strokeWidth={10} />
            <Circle cx={qx} cy={qy} r={5} fill="#7FA8FF" />
            <G rotation={canal} origin={`${cx}, ${cy}`}>
              <Line x1={cx} y1={cy - r - 9} x2={cx + dobra * 12} y2={cy - r + 9} stroke={cor} strokeWidth={4} strokeLinecap="round" />
            </G>
            <Circle cx={px} cy={py} r={2} fill={cor} />
            <SvgText x={10} y={18} fill={cor} fontSize={10} fontFamily={Fonte}>{titulo}</SvgText>
            <SvgText x={10} y={H - 10} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>{fase === 1 ? 'NA VIDA REAL, DEPOIS DE 10 A 20 S' : 'TRAÇO: CÚPULA · PONTO AZUL: LÍQUIDO'}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M2V6 · Ar no crânio: depois de cirurgia ou trauma, uma bolha de ar dentro da cabeça cresce na subida (Boyle, gás
// saturado de vapor a 37 °C, como em laboratorios.tsx) e volta na descida. Cabine de 0 a 8.000 ft.
export function AnimacaoArCranio() {
  const c = useCiclo(14000);
  const t = c.fase * 14;
  const fase = t < 2 ? 0 : t < 6 ? 1 : t < 9 ? 2 : 3;
  const ft = fase === 0 ? 0 : fase === 1 ? 8000 * suave((t - 2) / 4) : fase === 2 ? 8000 : 8000 * (1 - suave((t - 9) / 5));
  const pb = pressaoBarometrica(ft);
  const fator = (760 - 47) / (pb - 47);
  const H = 210;
  const titulo = ['NO SOLO: BOLHA DE AR NO CRÂNIO', 'SUBINDO: A BOLHA CRESCE', 'CABINE A 8.000 FT: CERCA DE 38% MAIOR', 'DESCENDO: A BOLHA VOLTA'][fase];
  const cor = [Cores.textoSuave, Cores.dourado, Cores.erro, Cores.acerto][fase];
  return (
    <Quadro titulo="Ar preso no crânio na subida" instrucao="Esquema de uma cabeça vista de lado, depois de uma cirurgia, com uma bolha de ar entre o crânio e o cérebro. A cabine sobe até 8.000 ft e desce." ciclo={c} altura={H}>
      {(w) => {
        const R = Math.min(66, w * 0.2), cx = R + 22, cy = 112;
        const r0 = R * 0.21, r = r0 * Math.cbrt(fator);
        const bx = cx + 6, by = cy - R + 10 + r;
        const aperto = (r - r0) * 1.4;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <Ellipse cx={cx} cy={cy} rx={R + 8} ry={R + 4} fill="#2A3442" stroke="#C9D4E0" strokeWidth={3} />
            <Path d={`M ${cx - R + 6} ${cy} Q ${cx - R + 6} ${cy - R + 8 + aperto} ${cx} ${cy - R + 8 + aperto} Q ${cx + R - 6} ${cy - R + 8 + aperto} ${cx + R - 6} ${cy} Q ${cx + R - 10} ${cy + R - 8} ${cx} ${cy + R - 8} Q ${cx - R + 10} ${cy + R - 8} ${cx - R + 6} ${cy} Z`} fill="#C98B9A" fillOpacity={0.85} stroke="#8E5A68" strokeWidth={1.5} />
            <Path d={`M ${cx - 30} ${cy - 10} q 12 -12 24 0 t 24 0 M ${cx - 36} ${cy + 18} q 14 -12 28 0 t 28 0`} stroke="#8E5A68" strokeWidth={1.5} fill="none" />
            <Circle cx={bx} cy={by} r={r} fill="#9FD8FF" fillOpacity={0.75} stroke="#E8F6FF" strokeWidth={1.5} />
            <SvgText x={10} y={18} fill={cor} fontSize={10} fontFamily={Fonte}>{titulo}</SvgText>
            <SvgText x={w - 10} y={H / 2 - 8} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">CABINE</SvgText>
            <SvgText x={w - 10} y={H / 2 + 8} fill={Cores.destaque} fontSize={13} fontFamily={Fonte} textAnchor="end">{`${fmt(ft / 1000, 1)} MIL FT`}</SvgText>
            <SvgText x={w - 10} y={H / 2 + 30} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">BOLHA</SvgText>
            <SvgText x={w - 10} y={H / 2 + 46} fill={cor} fontSize={13} fontFamily={Fonte} textAnchor="end">{`+${fmt((fator - 1) * 100)}%`}</SvgText>
            <SvgText x={10} y={H - 10} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>AZUL: AR · ROSA: CÉREBRO</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M2V7 · Antidepressivo e voo (ICAO Doc 8984, Part III, Cap. 9, Apêndice 2): linha do tempo de um tripulante que
// começa um ISRS aceito, fica 4 semanas estável, volta a voar (com copiloto), muda a dose (solo até estabilizar) e,
// depois, retira o remédio (solo durante a retirada e mais 2 semanas). Esquema sem escala de tempo real.
export function AnimacaoAntidepressivo() {
  const c = useCiclo(16000);
  const t = c.fase;
  const FASES = [
    { de: 0, ate: 0.18, titulo: 'COMEÇA O REMÉDIO: EM SOLO', cor: Cores.erro, voa: false },
    { de: 0.18, ate: 0.36, titulo: '4 SEMANAS ESTÁVEL: PODE VOLTAR, COM COPILOTO', cor: Cores.acerto, voa: true },
    { de: 0.36, ate: 0.5, titulo: 'A DOSE MUDOU: SOLO ATÉ ESTABILIZAR', cor: Cores.erro, voa: false },
    { de: 0.5, ate: 0.7, titulo: 'ESTÁVEL DE NOVO: VOA', cor: Cores.acerto, voa: true },
    { de: 0.7, ate: 0.86, titulo: 'RETIRADA + 2 SEMANAS: SOLO', cor: Cores.erro, voa: false },
    { de: 0.86, ate: 1, titulo: 'SEM REMÉDIO, ESTÁVEL: VOA', cor: Cores.acerto, voa: true },
  ];
  const f = FASES.find((x) => t >= x.de && t < x.ate) ?? FASES[FASES.length - 1];
  const H = 150;
  return (
    <Quadro titulo="Antidepressivo e voo, passo a passo" instrucao="Linha do tempo de um tripulante tratado com um antidepressivo aceito, pela orientação da ICAO. Vermelho: em solo; verde: pode voar." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 14, x1 = w - 14, X = (v: number) => x0 + v * (x1 - x0);
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            {FASES.map((x) => (
              <Rect key={x.de} x={X(x.de)} y={70} width={X(x.ate) - X(x.de)} height={16} fill={x.cor} fillOpacity={t >= x.de ? 0.75 : 0.18} />
            ))}
            <Line x1={X(t)} y1={60} x2={X(t)} y2={96} stroke={Cores.texto} strokeWidth={2} />
            <Circle cx={X(t)} cy={56} r={6} fill={f.cor} />
            <SvgText x={10} y={20} fill={f.cor} fontSize={10} fontFamily={Fonte}>{f.titulo}</SvgText>
            <SvgText x={10} y={38} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>{f.voa ? 'PODE VOAR' : 'EM SOLO'}</SvgText>
            <SvgText x={x0} y={112} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>INÍCIO</SvgText>
            <SvgText x={x1} y={112} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">SEM REMÉDIO</SvgText>
            <SvgText x={10} y={H - 10} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>FAA: 6 MESES ESTÁVEL ANTES DE VOLTAR</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M2V9 · Bomba de insulina na subida e na descida (King et al., Diabetes Care 2011; Boyle, M1V1 - II): a cabine vai do
// solo a 8.000 ft, a bolha do reservatório cresce e empurra cerca de 1 a 1,4 unidade a mais; na descida, a bolha encolhe e
// a bomba entrega quase 1 unidade a menos. Tamanho da bolha pela pressão barométrica; esquema sem escala de tempo real.
export function AnimacaoBombaInsulina() {
  const c = useCiclo(12000);
  const t = c.fase;
  // 0–0,3 subida; 0,3–0,6 cruzeiro; 0,6–0,9 descida; 0,9–1 solo.
  const alt = t < 0.3 ? suave(t / 0.3) : t < 0.6 ? 1 : t < 0.9 ? 1 - suave((t - 0.6) / 0.3) : 0;
  const ft = alt * 8000;
  const vol = 760 / pressaoBarometrica(ft);
  const fase = t < 0.3 ? 'SUBIDA: A BOLHA CRESCE E EMPURRA INSULINA A MAIS' : t < 0.6 ? 'CRUZEIRO: RECONECTAR SEM BOLHAS' : t < 0.9 ? 'DESCIDA: A BOLHA ENCOLHE E A DOSE CAI' : 'SOLO: PREENCHER O CATETER ANTES DE RECONECTAR';
  const cor = t < 0.3 ? Cores.erro : t < 0.6 ? Cores.acerto : t < 0.9 ? Cores.dourado : Cores.textoSuave;
  const extra = t < 0.3 ? '+1 A 1,4 U' : t < 0.6 ? '' : t < 0.9 ? 'QUASE −1 U' : '';
  const H = 170;
  return (
    <Quadro titulo="A bomba de insulina no voo" instrucao="Esquema: a cabine sobe a 8.000 ft e a bolha do reservatório cresce (lei de Boyle). Na descida, encolhe." ciclo={c} altura={H}>
      {(w) => {
        const rx = 24, ry = 54, rw = Math.min(170, w - 130), rh = 40;
        // Raio exagerado para ver a mudança (esquema); o rodapé mostra o volume real pela lei de Boyle.
        const r = 7 * vol * vol;
        const bx = rx + 12 + r;
        const gx = w - 62, gy0 = 128, gy1 = 52;
        const gy = gy0 - alt * (gy0 - gy1);
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={20} fill={cor} fontSize={10} fontFamily={Fonte}>{fase}</SvgText>
            <Rect x={rx} y={ry} width={rw} height={rh} rx={8} fill="none" stroke={Cores.textoSuave} strokeWidth={1.5} />
            <Rect x={rx + 4} y={ry + 4} width={rw - 8} height={rh - 8} rx={5} fill={Cores.destaque} fillOpacity={0.25} />
            <Circle cx={bx} cy={ry + rh / 2} r={r} fill="#0A1626" stroke={Cores.texto} strokeWidth={1.2} />
            <Line x1={rx + rw} y1={ry + rh / 2} x2={rx + rw + 26} y2={ry + rh / 2} stroke={Cores.textoSuave} strokeWidth={2} />
            <SvgText x={rx + rw + 30} y={ry + rh / 2 + 4} fill={cor} fontSize={11} fontFamily={Fonte}>{extra}</SvgText>
            <SvgText x={rx} y={ry + rh + 18} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>RESERVATÓRIO</SvgText>
            <Line x1={gx} y1={gy0} x2={gx} y2={gy1} stroke={Cores.linha} strokeWidth={2} />
            <Circle cx={gx} cy={gy} r={5} fill={cor} />
            <SvgText x={gx + 10} y={gy1 + 4} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>8.000 FT</SvgText>
            <SvgText x={gx + 10} y={gy0 + 4} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>SOLO</SvgText>
            <SvgText x={10} y={H - 10} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>{`CABINE: ${fmt(Math.round(ft / 100) * 100)} FT · BOLHA ×${fmt(vol, 2)}`}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M2V12 · Tala pneumática na subida: lei de Boyle (Veja M1V1 - II). UK CAA: soltar parte do ar antes do voo, porque
// a expansão pode causar desconforto, compressão circulatória ou neuropraxia. Espessura da câmara exagerada (esquema).
export function AnimacaoTalaPneumatica() {
  const c = useCiclo(12000);
  const t = c.fase;
  // 0–0,3 subida; 0,3–0,6 cruzeiro; 0,6–0,9 descida; 0,9–1 solo.
  const alt = t < 0.3 ? suave(t / 0.3) : t < 0.6 ? 1 : t < 0.9 ? 1 - suave((t - 0.6) / 0.3) : 0;
  const ft = alt * 8000;
  const vol = 760 / pressaoBarometrica(ft);
  const fase = t < 0.3 ? 'SUBIDA: O AR DA TALA EXPANDE E APERTA A PERNA' : t < 0.6 ? 'CRUZEIRO: A TALA CONTINUA APERTADA' : t < 0.9 ? 'DESCIDA: O AR ENCOLHE E A TALA AFROUXA' : 'SOLO: CONFERIR O APOIO DA TALA';
  const cor = t < 0.3 ? Cores.erro : t < 0.6 ? Cores.dourado : t < 0.9 ? Cores.acerto : Cores.textoSuave;
  const H = 184;
  return (
    <Quadro titulo="A tala pneumática na subida" instrucao="Esquema: a cabine sobe a 8.000 ft e o ar preso na tala se expande (lei de Boyle). Por isso se solta um pouco de ar antes do voo." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 22, x1 = Math.max(x0 + 140, w - 92), cy = 98;
        // A câmara de ar engrossa com o volume (exagerado para ver); a perna fica do mesmo tamanho.
        const perna = 16, camara = 9 * vol * vol;
        const gx = w - 46, gy0 = 150, gy1 = 56;
        const gy = gy0 - alt * (gy0 - gy1);
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={20} fill={cor} fontSize={10} fontFamily={Fonte}>{fase}</SvgText>
            <Rect x={x0 + 18} y={cy - perna - camara} width={x1 - x0 - 36} height={2 * (perna + camara)} rx={perna + camara} fill="#3A6E95" fillOpacity={0.55} stroke="#9CCBEA" strokeWidth={1.5} />
            <Rect x={x0} y={cy - perna} width={x1 - x0} height={2 * perna} rx={perna} fill="#C9A27E" stroke="#E6C7A6" strokeWidth={1.2} />
            <Ellipse cx={x1 - 4} cy={cy + perna - 2} rx={14} ry={7} fill="#C9A27E" />
            <SvgText x={x0 + 22} y={cy - perna - camara - 6} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>CÂMARA DE AR</SvgText>
            <Line x1={gx} y1={gy0} x2={gx} y2={gy1} stroke={Cores.linha} strokeWidth={2} />
            <Circle cx={gx} cy={gy} r={5} fill={cor} />
            <SvgText x={gx + 9} y={gy1 + 4} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>8.000 FT</SvgText>
            <SvgText x={gx + 9} y={gy0 + 4} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>SOLO</SvgText>
            <SvgText x={10} y={H - 10} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>{`CABINE: ${fmt(Math.round(ft / 100) * 100)} FT · AR ×${fmt(vol, 2)}`}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M2V10 · Gás intestinal sob menor pressão de cabine: lei de Boyle (Veja M1V1 - II).
// Esquema didático: o aumento do volume não é previsão clínica de tamanho de alça nem simulação cirúrgica.
export function AnimacaoGasIntestinal() {
  const ciclo = useCiclo(11000);
  const p = ciclo.fase;
  const fracao = p < 0.34 ? suave(p / 0.34) : p < 0.64 ? 1 : p < 0.94 ? 1 - suave((p - 0.64) / 0.3) : 0;
  const ft = 8000 * fracao;
  const fator = 760 / pressaoBarometrica(ft);
  const raio = 24 * Math.sqrt(fator);
  const altura = 204;
  const fase = p < 0.34 ? 'SUBIDA' : p < 0.64 ? 'CRUZEIRO' : p < 0.94 ? 'DESCIDA' : 'SOLO';
  return (
    <Quadro titulo="O gás intestinal durante a subida" instrucao="Toque para pausar. Uma bolha esquemática ocupa mais volume quando a pressão da cabine diminui; obstrução e sutura recente aumentam o risco clínico." ciclo={ciclo} altura={altura}>
      {(w) => {
        const cx = w * 0.36, cy = 112, medidor = w - 44;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={altura} rx={8} fill="#0A1626" />
            <SvgText x={12} y={22} fill={Cores.dourado} fontSize={11} fontFamily={Fonte}>{fase}</SvgText>
            <SvgText x={12} y={40} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>AR RETIDO NO INTESTINO</SvgText>
            <Ellipse cx={cx} cy={cy} rx={88} ry={62} fill="#29374A" stroke={Cores.textoSuave} strokeWidth={2} />
            <Ellipse cx={cx} cy={cy} rx={66} ry={40} fill="#76556A" stroke="#C99EAB" strokeWidth={3} />
            <Circle cx={cx} cy={cy} r={raio} fill="#B9E6FF" fillOpacity={0.82} stroke="#F1FAFF" strokeWidth={2} />
            <Line x1={medidor} y1={67} x2={medidor} y2={153} stroke={Cores.linha} strokeWidth={3} />
            <Circle cx={medidor} cy={153 - 86 * fracao} r={6} fill={Cores.dourado} />
            <SvgText x={w - 12} y={55} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="end">8.000 FT</SvgText>
            <SvgText x={w - 12} y={171} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte} textAnchor="end">SOLO</SvgText>
            <SvgText x={12} y={altura - 10} fill={Cores.textoSuave} fontSize={10} fontFamily={Fonte}>{`CABINE: ${fmt(Math.round(ft / 100) * 100)} ft · GÁS: ${fmt(fator, 2)}×`}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

const styles = StyleSheet.create({
  pausa: { alignItems: 'flex-end', marginTop: 2 },
});
