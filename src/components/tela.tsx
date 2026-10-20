import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import type { ReactNode, RefObject } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View style={styles.raiz}>
      <Image source={fundo} style={StyleSheet.absoluteFill} contentFit="cover" />
      <ScrollView ref={refRolagem} contentContainerStyle={[styles.conteudo, { paddingTop: insets.top + Espaco.lg }]}>
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
    backgroundColor: 'rgba(3,5,10,0.6)',
  },
});
