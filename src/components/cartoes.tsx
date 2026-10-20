import { Image, type ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { Cores, Espaco, Raio } from '@/constants/theme';

type Direcao = 'baixo' | 'esquerda' | 'topo';

const gradientes: Record<Direcao, { cores: [string, string, string]; inicio: { x: number; y: number }; fim: { x: number; y: number } }> = {
  baixo: { cores: ['rgba(3,5,10,0)', 'rgba(3,5,10,0.35)', 'rgba(3,5,10,0.92)'], inicio: { x: 0, y: 0.3 }, fim: { x: 0, y: 1 } },
  esquerda: { cores: ['rgba(3,5,10,0.92)', 'rgba(3,5,10,0.55)', 'rgba(3,5,10,0.1)'], inicio: { x: 0, y: 0 }, fim: { x: 1, y: 0 } },
  topo: { cores: ['rgba(3,5,10,0.88)', 'rgba(3,5,10,0.4)', 'rgba(3,5,10,0.15)'], inicio: { x: 0, y: 0 }, fim: { x: 0, y: 1 } },
};

// Cartão com imagem de ponta a ponta e degradê escuro para o texto ficar legível.
export function CartaoImagem({
  imagem,
  altura,
  direcao = 'baixo',
  onPress,
  rotuloAcessivel,
  children,
  style,
}: {
  imagem: ImageSource | number;
  altura: number;
  direcao?: Direcao;
  onPress?: () => void;
  rotuloAcessivel?: string;
  children: ReactNode;
  style?: ViewStyle;
}) {
  const g = gradientes[direcao];
  const corpo = (
    <>
      <Image source={imagem} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
      <LinearGradient colors={g.cores} start={g.inicio} end={g.fim} style={StyleSheet.absoluteFill} />
      <View style={[styles.conteudo, direcao === 'topo' && { justifyContent: 'flex-start' }, direcao === 'esquerda' && { justifyContent: 'center' }]}>
        {children}
      </View>
    </>
  );
  if (!onPress) return <View style={[styles.cartao, { height: altura }, style]}>{corpo}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={rotuloAcessivel}
      onPress={onPress}
      style={({ pressed }) => [styles.cartao, { height: altura, opacity: pressed ? 0.85 : 1 }, style]}>
      {corpo}
    </Pressable>
  );
}

// Painel translúcido, sem imagem.
export function Painel({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.painel, style]}>{children}</View>;
}

export function Barra({ valor, altura = 4 }: { valor: number; altura?: number }) {
  const pct = Math.max(0, Math.min(1, valor));
  return (
    <View style={{ height: altura, borderRadius: altura / 2, backgroundColor: Cores.trilha, overflow: 'hidden' }}>
      <View style={{ width: `${Math.round(pct * 100)}%`, height: altura, backgroundColor: Cores.destaque }} />
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: { borderRadius: Raio, overflow: 'hidden', borderWidth: 1, borderColor: Cores.linha, backgroundColor: Cores.fundo },
  conteudo: { flex: 1, padding: Espaco.lg, justifyContent: 'flex-end', gap: 4 },
  painel: { borderRadius: Raio, borderWidth: 1, borderColor: Cores.linha, backgroundColor: Cores.painel, padding: Espaco.lg, gap: Espaco.md },
});
