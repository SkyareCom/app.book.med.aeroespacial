import { Pressable, StyleSheet } from 'react-native';

import { Texto } from '@/components/texto';
import { Cores, Raio } from '@/constants/theme';

export function BotaoPrincipal({ rotulo, onPress, secundario }: { rotulo: string; onPress: () => void; secundario?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.botao, secundario ? styles.secundario : styles.primario, pressed && { opacity: 0.85 }]}>
      <Texto t="item" maiusculo espacado cor={secundario ? Cores.texto : Cores.fundo}>
        {rotulo}
      </Texto>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: { minHeight: 52, borderRadius: Raio, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  primario: { backgroundColor: Cores.destaque },
  secundario: { borderWidth: 1, borderColor: Cores.linha, backgroundColor: 'rgba(3,5,10,0.6)' },
});
