import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { SvgText } from '@/components/svg-texto';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Fonte } from '@/constants/theme';

// Animações da Missão Aviação, em arquivo próprio: animacoes.tsx está congelado (docs/modelo-sistemas.md, seção 7).
// Mesmo padrão das demais: laço em SVG, leve, que pausa ao toque. useCiclo e Quadro repetem os de animacoes.tsx.

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

// M3V1 · A regra do 1%: risco de cada piloto (1 incapacitação em 1 milhão de horas, cerca de 1% ao ano) × 10% de fase
// crítica × 1 em 100 que o outro piloto não recupera = 1 acidente em 1 bilhão de horas. Fonte: A. Evans (ICAO), Lima,
// 2009; registro de src/data/capitulos/certificacao.ts. Esquema, sem escala.
export function AnimacaoRegra1() {
  const c = useCiclo(13500);
  const t = c.fase;
  const etapa = t < 0.34 ? 0 : t < 0.67 ? 1 : 2;
  const u = etapa === 0 ? t / 0.34 : etapa === 1 ? (t - 0.34) / 0.33 : (t - 0.67) / 0.33;
  const linha1 = etapa === 0 ? 'CADA PILOTO: ATÉ 1 INCAPACITAÇÃO' : etapa === 1 ? 'SÓ 10% DO VOO É FASE CRÍTICA' : 'O OUTRO PILOTO ASSUME EM 99 DE 100';
  const linha2 = etapa === 0 ? 'EM 1 MILHÃO DE HORAS (CERCA DE 1% AO ANO)' : etapa === 1 ? 'NA FASE CRÍTICA: 1 EM 10 MILHÕES DE HORAS' : 'ACIDENTE: 1 EM 1 BILHÃO DE HORAS';
  const cor = etapa === 2 ? Cores.acerto : etapa === 1 ? Cores.dourado : Cores.destaque;
  const H = 214;
  return (
    <Quadro titulo="A regra do 1%" instrucao="Esquema: o risco de cada piloto, a fração do voo em fase crítica e o segundo piloto que assume levam à meta de 1 acidente em 1 bilhão de horas." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 16, x1 = w - 16, solo = 178, cruzeiro = 104;
        const xs = x0 + (x1 - x0) * 0.22, xd = x0 + (x1 - x0) * 0.78;
        const crit = (x1 - x0) * 0.05;
        // posição do avião ao longo do perfil
        const x = x0 + (x1 - x0) * u;
        const y = x < xs ? solo - ((x - x0) / (xs - x0)) * (solo - cruzeiro) : x > xd ? cruzeiro + ((x - xd) / (x1 - xd)) * (solo - cruzeiro) : cruzeiro;
        const naFase = x < x0 + crit || x > x1 - crit;
        const falhou = etapa === 0 ? u > 0.45 && u < 0.7 : naFase;
        const p1 = falhou ? Cores.erro : Cores.textoSuave;
        const p2 = etapa === 2 && falhou ? Cores.acerto : Cores.textoSuave;
        const pulso = falhou ? 1 + 0.25 * Math.sin(t * 120) : 1;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={20} fill={cor} fontSize={10} fontFamily={Fonte}>{linha1}</SvgText>
            <SvgText x={10} y={36} fill={cor} fontSize={10} fontFamily={Fonte}>{linha2}</SvgText>
            <Rect x={x0} y={92} width={crit} height={solo - 92} fill={Cores.dourado} fillOpacity={etapa === 0 ? 0.08 : 0.28} />
            <Rect x={x1 - crit} y={92} width={crit} height={solo - 92} fill={Cores.dourado} fillOpacity={etapa === 0 ? 0.08 : 0.28} />
            <Path d={`M ${x0} ${solo} L ${xs} ${cruzeiro} L ${xd} ${cruzeiro} L ${x1} ${solo}`} stroke="#9CCBEA" strokeOpacity={0.6} strokeWidth={2} fill="none" strokeDasharray="5 4" />
            <Rect x={x0} y={solo} width={x1 - x0} height={2} fill={Cores.textoApagado} />
            <Circle cx={x} cy={y} r={6} fill="#F3EEDC" stroke={naFase && etapa > 0 ? Cores.dourado : '#9CCBEA'} strokeWidth={2} />
            <SvgText x={x0} y={solo + 16} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>DECOLAGEM</SvgText>
            <SvgText x={x1} y={solo + 16} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">POUSO</SvgText>
            <SvgText x={w / 2} y={cruzeiro + 18} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">CRUZEIRO</SvgText>
            <Circle cx={w / 2 - 22} cy={64} r={9 * (falhou ? pulso : 1)} fill={p1} fillOpacity={0.85} />
            <Circle cx={w / 2 + 22} cy={64} r={9} fill={p2} fillOpacity={etapa === 2 ? 0.95 : 0.35} />
            <SvgText x={w / 2 - 22} y={86} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">PILOTO 1</SvgText>
            <SvgText x={w / 2 + 22} y={86} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">PILOTO 2</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

const styles = StyleSheet.create({
  pausa: { alignItems: 'flex-end', marginTop: 2 },
});
