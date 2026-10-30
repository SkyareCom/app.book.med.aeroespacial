import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, View, type ScrollViewInstance } from 'react-native';

import { IconeVoltar } from '@/components/icones';
import { Texto } from '@/components/texto';
import { Cores, Espaco, LarguraMaxima } from '@/constants/theme';

const fundo = require('@/assets/images/cenas/bg.jpg');

// Moldura de todas as telas: fundo estelar, rolagem e largura máxima.
// Com "titulo", mostra um cabeçalho com botão de voltar (telas fora das abas).
export function Tela({
  children,
  titulo,
  rotulo,
  refRolagem,
}: {
  children: ReactNode;
  titulo?: string;
  rotulo?: string;
  refRolagem?: RefObject<ScrollViewInstance | null>;
}) {
  const router = useRouter();
  return (
    <View style={styles.raiz}>
      <Image source={fundo} style={StyleSheet.absoluteFill} contentFit="cover" />
      <ScrollView ref={refRolagem} contentContainerStyle={[styles.conteudo, { paddingTop: Espaco.lg }]}>
        <View style={styles.coluna}>
          {titulo ? (
            <View style={styles.cabecalho}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Voltar"
                onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
                style={styles.voltar}>
                <IconeVoltar cor={Cores.texto} />
              </Pressable>
              <View style={{ flex: 1, gap: 2 }}>
                {rotulo ? <Texto t="rotulo" cor={Cores.destaque}>{rotulo}</Texto> : null}
                <Texto t="titulo">{titulo}</Texto>
              </View>
            </View>
          ) : null}
          {children}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: Cores.fundo },
  conteudo: { paddingHorizontal: Espaco.lg, paddingBottom: Espaco.xl * 2 },
  coluna: { width: '100%', maxWidth: LarguraMaxima, alignSelf: 'center', gap: Espaco.md },
  cabecalho: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md, marginBottom: Espaco.sm },
  voltar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Cores.linha,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(3,5,10,0.94)',
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
});

// Tela sem margens, para capas de ponta a ponta (Home, temporadas e episódios).
// O conteúdo cuida das próprias margens; a largura máxima mantém a leitura confortável em telas grandes.
export function TelaCheia({ children, refRolagem, aoRolar }: { children: ReactNode; refRolagem?: RefObject<ScrollViewInstance | null>; aoRolar?: (y: number) => void }) {
  return (
    <View style={styles.raiz}>
      <Image source={fundo} style={StyleSheet.absoluteFill} contentFit="cover" />
      <ScrollView
        ref={refRolagem}
        onScroll={aoRolar ? (e) => aoRolar(e.nativeEvent.contentOffset.y) : undefined}
        scrollEventThrottle={aoRolar ? 32 : undefined}
        contentContainerStyle={{ paddingBottom: Espaco.xl * 2 }}>
        <View style={{ width: '100%', maxWidth: LarguraMaxima, alignSelf: 'center', gap: Espaco.xl }}>{children}</View>
      </ScrollView>
    </View>
  );
}

// Botão de voltar sobre a capa. Com "visivel" falso (leitor rolando para baixo), some para não cobrir o conteúdo;
// volta assim que o leitor rola para cima ou retorna ao topo.
export function BotaoVoltarFlutuante({ visivel = true }: { visivel?: boolean }) {
  const router = useRouter();
  const anim = useRef(new Animated.Value(visivel ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: visivel ? 1 : 0, duration: 180, useNativeDriver: false }).start();
  }, [visivel, anim]);
  return (
    <Animated.View
      pointerEvents={visivel ? 'auto' : 'none'}
      style={{ position: 'absolute', top: 12, left: Espaco.lg, zIndex: 5, opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [-60, 0] }) }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Voltar"
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
        style={styles.voltar}>
        <IconeVoltar cor={Cores.texto} />
      </Pressable>
    </Animated.View>
  );
}
