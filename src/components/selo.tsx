import { StyleSheet, View } from 'react-native';

import { Texto } from '@/components/texto';

// Selo padrão do app (Interativo, Disponível, Gráfico, Simulação...): sempre com borda e fundo escuro, em 9px maiúsculo.
export function Selo({ texto, cor }: { texto: string; cor: string }) {
  return (
    <View style={[styles.selo, { borderColor: cor }]}>
      <Texto t="rodape" cor={cor}>{texto}</Texto>
    </View>
  );
}

const styles = StyleSheet.create({
  selo: { alignSelf: 'flex-start', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, backgroundColor: 'rgba(3,5,10,0.65)' },
});
