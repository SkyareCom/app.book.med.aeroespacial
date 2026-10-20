import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { G, Line, Rect, Text as SvgText } from 'react-native-svg';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte, Raio } from '@/constants/theme';

// Tempo de consciência útil (FAA, AC 61-107), em segundos: mínimo e máximo de cada faixa.
const DADOS: [number, number, number][] = [
  [18000, 1200, 1800],
  [22000, 300, 600],
  [25000, 180, 300],
  [28000, 150, 180],
  [30000, 60, 120],
  [35000, 30, 60],
  [40000, 15, 20],
  [45000, 9, 15],
];
const TICKS: [number, string][] = [[10, '10 s'], [30, '30 s'], [60, '1 min'], [300, '5 min'], [1800, '30 min']];

export function GraficoTUC() {
  const [rapida, setRapida] = useState(false);
  const [larg, setLarg] = useState(300);
  const fator = rapida ? 0.5 : 1;
  const e = 62;
  const d = 12;
  const lx = (s: number) => e + ((Math.log10(s) - Math.log10(4)) / (Math.log10(2000) - Math.log10(4))) * (larg - e - d);
  const linha = 24;
  const h = DADOS.length * linha + 24;

  return (
    <MolduraMidia tipo="Gráfico" titulo="Quanto tempo você tem para agir" instrucao="Escala logarítmica: cada marca é um salto grande de tempo.">
      <View style={styles.alternar}>
        {[false, true].map((v) => (
          <Pressable key={String(v)} accessibilityRole="button" accessibilityState={{ selected: rapida === v }} onPress={() => setRapida(v)} style={[styles.opcao, rapida === v && styles.ativa]}>
            <Texto t="rotulo" cor={rapida === v ? Cores.fundo : Cores.texto}>{v ? 'Descompressão rápida' : 'Perda gradual'}</Texto>
          </Pressable>
        ))}
      </View>
      <View onLayout={(ev) => setLarg(ev.nativeEvent.layout.width)}>
        <Svg width={larg} height={h}>
          {TICKS.map(([s, r]) => (
            <Line key={r} x1={lx(s)} y1={0} x2={lx(s)} y2={h - 20} stroke={Cores.linha} />
          ))}
          {TICKS.map(([s, r]) => (
            <SvgText key={`t${r}`} x={lx(s)} y={h - 6} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">{r}</SvgText>
          ))}
          {DADOS.map(([alt, mn, mx], i) => {
            const y = i * linha + 6;
            const a = lx(Math.max(4, mn * fator));
            const b = lx(mx * fator);
            const cor = mx * fator <= 60 ? Cores.erro : mx * fator <= 300 ? Cores.dourado : Cores.destaque;
            return (
              <G key={alt}>
                <SvgText x={e - 8} y={y + 11} fill={Cores.texto} fontSize={10} fontFamily={Fonte} textAnchor="end">{(alt / 1000).toFixed(0)} mil ft</SvgText>
                <Rect x={a} y={y + 2} width={Math.max(4, b - a)} height={12} rx={6} fill={cor} />
              </G>
            );
          })}
        </Svg>
      </View>
      <Texto cor={Cores.textoApagado}>
        {rapida ? 'Na descompressão rápida, o tempo pode cair para cerca da metade.' : 'Valores médios para uma pessoa em repouso. Fonte: FAA, AC 61-107.'}
      </Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  alternar: { flexDirection: 'row', gap: Espaco.sm },
  opcao: { flex: 1, minHeight: 40, alignItems: 'center', justifyContent: 'center', borderRadius: Raio - 6, borderWidth: 1, borderColor: Cores.linha },
  ativa: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
});
