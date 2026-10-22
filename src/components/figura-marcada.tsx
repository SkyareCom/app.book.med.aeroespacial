import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

export type Marcador = { x: number; y: number; rotulo: string; raio?: number };

// Figura com estruturas que só se destacam quando o leitor toca na legenda:
// um foco de luz sobre a estrutura, o resto da imagem escurece e um anel pulsa em volta.
export function FiguraMarcada({ imagem, legenda, proporcao = 16 / 9, marcadores }: { imagem: number; legenda: string; proporcao?: number; marcadores: Marcador[] }) {
  const [sel, setSel] = useState<number | null>(null);
  const [larg, setLarg] = useState(300);
  const alt = larg / proporcao;
  const [pulso] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (sel === null) return;
    pulso.setValue(0);
    const laco = Animated.loop(Animated.timing(pulso, { toValue: 1, duration: 1600, useNativeDriver: Platform.OS !== 'web' }));
    laco.start();
    return () => laco.stop();
  }, [sel, pulso]);
  const m = sel !== null ? marcadores[sel] : null;
  const r = m ? (m.raio ?? 0.08) * larg : 0;

  return (
    <View style={styles.figura}>
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={[styles.quadro, { aspectRatio: proporcao }]}>
        <Image source={imagem} style={StyleSheet.absoluteFill} contentFit="cover" accessibilityLabel={legenda} />
        {m ? (
          <>
            <Svg width={larg} height={alt} style={StyleSheet.absoluteFill} pointerEvents="none">
              <Defs>
                <RadialGradient id="foco" cx={m.x * larg} cy={m.y * alt} r={r * 2.6} gradientUnits="userSpaceOnUse">
                  <Stop offset="0" stopColor="#03050A" stopOpacity={0} />
                  <Stop offset="0.35" stopColor="#03050A" stopOpacity={0} />
                  <Stop offset="1" stopColor="#03050A" stopOpacity={0.62} />
                </RadialGradient>
              </Defs>
              <Rect x={0} y={0} width={larg} height={alt} fill="url(#foco)" />
              <Circle cx={m.x * larg} cy={m.y * alt} r={r} fill={Cores.destaque} fillOpacity={0.18} stroke={Cores.destaque} strokeWidth={2} />
            </Svg>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.anel,
                { left: m.x * larg - r, top: m.y * alt - r, width: r * 2, height: r * 2, borderRadius: r },
                { opacity: pulso.interpolate({ inputRange: [0, 1], outputRange: [0.9, 0] }), transform: [{ scale: pulso.interpolate({ inputRange: [0, 1], outputRange: [1, 1.7] }) }] },
              ]}
            />
            <View pointerEvents="none" style={[styles.etiqueta, m.x > 0.6 ? { right: larg * (1 - m.x) + r + 6 } : { left: m.x * larg + r + 6 }, { top: m.y * alt - 13 }]}>
              <Texto t="rodape" cor={Cores.fundo}>{m.rotulo}</Texto>
            </View>
          </>
        ) : null}
      </View>

      <Texto t="rotulo" cor={Cores.textoApagado}>Toque numa estrutura para destacá-la</Texto>
      <View style={styles.lista}>
        {marcadores.map((mk, k) => {
          const ativo = sel === k;
          return (
            <Pressable key={k} accessibilityRole="button" accessibilityState={{ selected: ativo }} onPress={() => setSel(ativo ? null : k)} style={[styles.item, ativo && styles.itemAtivo]}>
              <View style={[styles.ponto, ativo && { backgroundColor: Cores.destaque }]} />
              <Texto cor={ativo ? Cores.texto : Cores.textoSuave}>{mk.rotulo}</Texto>
            </Pressable>
          );
        })}
      </View>
      <Texto cor={Cores.textoApagado}>{legenda}</Texto>
    </View>
  );
}

const styles = StyleSheet.create({
  figura: { gap: Espaco.sm },
  quadro: { width: '100%', borderRadius: 10, borderWidth: 1, borderColor: Cores.linha, overflow: 'hidden', backgroundColor: '#03050A' },
  anel: { position: 'absolute', borderWidth: 2, borderColor: Cores.destaque },
  etiqueta: { position: 'absolute', paddingHorizontal: 8, height: 26, justifyContent: 'center', borderRadius: 13, backgroundColor: Cores.destaque },
  lista: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 40, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: Cores.linha },
  itemAtivo: { borderColor: Cores.destaque, backgroundColor: 'rgba(111,211,255,0.12)' },
  ponto: { width: 8, height: 8, borderRadius: 4, borderWidth: 1, borderColor: Cores.destaque },
});
