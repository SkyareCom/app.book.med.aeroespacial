import { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Esquema qualitativo: os símbolos representam vapor, sem escala de volume ou de umidade.
const POSICOES = [[18, 18], [50, 14], [34, 34], [66, 36], [18, 54], [52, 56]];

export function AquecimentoUmidade() {
  const [expansao] = useState(() => new Animated.Value(1));

  useEffect(() => {
    const animacao = Animated.timing(expansao, {
      toValue: 1.18,
      duration: 1200,
      useNativeDriver: Platform.OS !== 'web',
    });
    animacao.start();
    return () => animacao.stop();
  }, [expansao]);

  return (
    <MolduraMidia tipo="Animação" titulo="Aquecer não acrescenta água" instrucao="A mesma amostra é aquecida, sem adição de vapor, sob pressão constante.">
      <View style={styles.etapas}>
        <View style={styles.etapa}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Antes</Texto>
          <Texto t="item" cor={Cores.destaque}>Temperatura menor</Texto>
          <View style={styles.palco} accessible={false}>
            <View style={styles.amostra}>
              {POSICOES.map(([x, y], i) => <View key={i} style={[styles.vapor, { left: x, top: y }]} />)}
            </View>
          </View>
          <Texto cor={Cores.textoSuave}>Umidade relativa maior</Texto>
        </View>
        <View style={styles.etapa}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Depois</Texto>
          <Texto t="item" cor={Cores.dourado}>Temperatura maior</Texto>
          <View style={styles.palco} accessible={false}>
            <Animated.View style={[styles.amostra, { borderColor: Cores.dourado, transform: [{ scale: expansao }] }]}>
              {POSICOES.map(([x, y], i) => <View key={i} style={[styles.vapor, { left: x, top: y }]} />)}
            </Animated.View>
          </View>
          <Texto cor={Cores.textoSuave}>Umidade relativa menor</Texto>
        </View>
      </View>
      <Texto cor={Cores.dourado}>Vapor d’água: mesma quantidade.</Texto>
      <Texto cor={Cores.textoSuave}>Sob pressão constante, a amostra se expande ao aquecer. Sua umidade relativa diminui, mesmo sem retirada de água.</Texto>
      <Texto cor={Cores.textoApagado}>Esquema sem escala: os símbolos mostram que o vapor foi preservado.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  etapas: { flexDirection: 'row', gap: Espaco.md },
  etapa: { flex: 1, minWidth: 0, gap: Espaco.sm },
  palco: { height: 110, justifyContent: 'center', alignItems: 'center' },
  amostra: { width: 90, height: 78, borderWidth: 1, borderColor: Cores.destaque, borderRadius: 8 },
  vapor: { position: 'absolute', width: 5, height: 5, borderRadius: 3, backgroundColor: Cores.dourado },
});
