import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { OpcoesEntrada } from '@/components/entrar';
import { Texto } from '@/components/texto';
import { Imagens } from '@/constants/imagens';
import { Cores, Espaco, LarguraMaxima } from '@/constants/theme';
import { useConta, type ModoEntrada } from '@/state/conta';

// Abertura de cinema e tela de entrada numa só: campo estelar em aproximação, o logotipo surge,
// o título aparece e, para quem ainda não entrou, as formas de login logo abaixo.
// Quem já entrou vê só a abertura, que fecha sozinha (ou com "Pular").
export function Abertura({ onFim, entrada }: { onFim: () => void; entrada: boolean }) {
  const insets = useSafeAreaInsets();
  const { entrar } = useConta();
  const fundo = useRef(new Animated.Value(0)).current;
  const logo = useRef(new Animated.Value(0)).current;
  const titulo = useRef(new Animated.Value(0)).current;
  const saida = useRef(new Animated.Value(1)).current;
  const [terminou, setTerminou] = useState(false);
  const pedeEntrada = useRef(entrada);
  pedeEntrada.current = entrada;

  useEffect(() => {
    const intro = Animated.parallel([
      Animated.timing(fundo, { toValue: 1, duration: 3600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(300),
        Animated.timing(logo, { toValue: 1, duration: 1300, easing: Easing.out(Easing.back(1.2)), useNativeDriver: true }),
        Animated.timing(titulo, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
    ]);
    intro.start(({ finished }) => {
      // Sem login pendente, a abertura some sozinha; com login pendente, fica esperando a escolha.
      if (finished && !pedeEntrada.current) setTimeout(() => !pedeEntrada.current && sair(), 500);
    });
    return () => intro.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sair(depois?: () => void) {
    if (terminou) return;
    setTerminou(true);
    Animated.timing(saida, { toValue: 0, duration: 450, useNativeDriver: true }).start(() => {
      depois?.();
      onFim();
    });
  }

  function escolher(modo: ModoEntrada) {
    sair(() => entrar(modo));
  }

  return (
    <Animated.View pointerEvents={terminou ? 'none' : 'auto'} style={[StyleSheet.absoluteFill, styles.raiz, { opacity: saida }]}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: fundo, transform: [{ scale: fundo.interpolate({ inputRange: [0, 1], outputRange: [1.25, 1] }) }] }]}>
        <Image source={Imagens.fundo} style={StyleSheet.absoluteFill} contentFit="cover" />
      </Animated.View>
      <ScrollView contentContainerStyle={[styles.rolagem, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.coluna}>
          <Animated.View style={{ alignItems: 'center', opacity: logo, transform: [{ scale: logo.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }] }}>
            <Image source={Imagens.logo} style={styles.logo} contentFit="contain" accessibilityLabel="Papos de Altitude" />
          </Animated.View>
          <Animated.View style={{ opacity: titulo, transform: [{ translateY: titulo.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }], alignItems: 'center', gap: 10 }}>
            {/* Título em estilo de cartaz de cinema: crédito pequeno entre filetes e o nome em destaque. */}
            <View style={styles.credito}>
              <View style={styles.filete} />
              <Texto t="rotulo" maiusculo style={styles.textoCredito}>Seu app-book de</Texto>
              <View style={styles.filete} />
            </View>
            <Texto t="titulo" maiusculo style={styles.textoTitulo}>Medicina aeroespacial</Texto>
          </Animated.View>
          {entrada ? (
            <Animated.View style={{ opacity: titulo, width: '100%' }}>
              <OpcoesEntrada aoEscolher={escolher} />
            </Animated.View>
          ) : null}
        </View>
      </ScrollView>
      {!entrada ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Pular abertura" onPress={() => sair()} style={[styles.pular, { top: insets.top + 12 }]}>
          <Texto t="rotulo">Pular</Texto>
        </Pressable>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  raiz: { backgroundColor: '#000', zIndex: 100 },
  rolagem: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: Espaco.lg },
  coluna: { width: '100%', maxWidth: LarguraMaxima, alignSelf: 'center', alignItems: 'center', gap: Espaco.lg },
  logo: { width: 150, height: 150 },
  credito: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  filete: { width: 28, height: 1, backgroundColor: 'rgba(232,196,106,0.6)' },
  textoCredito: { color: Cores.textoSuave, letterSpacing: 5 },
  textoTitulo: { color: '#F2D58A', letterSpacing: 4, textAlign: 'center', textShadowColor: 'rgba(232,196,106,0.65)', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 16 },
  pular: { position: 'absolute', right: 16, minHeight: 40, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
});
