import { StyleSheet, View } from 'react-native';

import { Texto } from '@/components/texto';

// Selo padrão do app (Interativo, Disponível, Gráfico, Simulação...): sempre com borda e fundo escuro.
export function Selo({ texto, cor }: { texto: string; cor: string }) {
  return (
    <View style={[styles.selo, { borderColor: cor }]}>
      <Texto t="rotulo" cor={cor}>{texto}</Texto>
    </View>
  );
}

const styles = StyleSheet.create({
  selo: { alignSelf: 'flex-start', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, borderWidth: 1, backgroundColor: 'rgba(3,5,10,0.65)' },
});
