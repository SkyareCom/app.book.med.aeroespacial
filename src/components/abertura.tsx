import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Texto } from '@/components/texto';
import { Imagens } from '@/constants/imagens';
import { Cores } from '@/constants/theme';

// Abertura de cinema: campo estelar em aproximação, o logotipo surge e o título aparece. Toque para pular.
export function Abertura({ onFim }: { onFim: () => void }) {
  const insets = useSafeAreaInsets();
  const fundo = useRef(new Animated.Value(0)).current;
  const logo = useRef(new Animated.Value(0)).current;
  const titulo = useRef(new Animated.Value(0)).current;
  const saida = useRef(new Animated.Value(1)).current;
  const [terminou, setTerminou] = useState(false);

  useEffect(() => {
    const anim = Animated.sequence([
      Animated.parallel([
        Animated.timing(fundo, { toValue: 1, duration: 3600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.sequence([
          Animated.delay(300),
          Animated.timing(logo, { toValue: 1, duration: 1300, easing: Easing.out(Easing.back(1.2)), useNativeDriver: true }),
          Animated.timing(titulo, { toValue: 1, duration: 800, useNativeDriver: true }),
        ]),
      ]),
      Animated.delay(500),
      Animated.timing(saida, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]);
    anim.start(({ finished }) => finished && fechar());
    return () => anim.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fechar() {
    if (terminou) return;
    saida.stopAnimation();
    setTerminou(true);
    onFim();
  }

  return (
    <Animated.View pointerEvents={terminou ? 'none' : 'auto'} style={[StyleSheet.absoluteFill, styles.raiz, { opacity: saida }]}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: fundo, transform: [{ scale: fundo.interpolate({ inputRange: [0, 1], outputRange: [1.25, 1] }) }] }]}>
        <Image source={Imagens.fundo} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Animated.View>
      <View style={styles.centro}>
        <Animated.View style={{ opacity: logo, transform: [{ scale: logo.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }] }}>
          <Image source={Imagens.logo} style={styles.logo} contentFit="contain" accessibilityLabel="Papos de Altitude" />
        </Animated.View>
        <Animated.View style={{ opacity: titulo, transform: [{ translateY: titulo.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }], alignItems: 'center', gap: 4 }}>
          <Texto t="rotulo" cor={Cores.destaque}>App-book de medicina aeroespacial</Texto>
          <Texto t="item" cor={Cores.textoSuave}>4 temporadas · 50 episódios</Texto>
        </Animated.View>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel="Pular abertura" onPress={fechar} style={[styles.pular, { top: insets.top + 12 }]}>
        <Texto t="rotulo">Pular</Texto>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  raiz: { backgroundColor: '#000', zIndex: 100 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18, padding: 24 },
  logo: { width: 260, height: 260 },
  pular: { position: 'absolute', right: 16, minHeight: 40, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
});
