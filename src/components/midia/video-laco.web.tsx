import { Asset } from 'expo-asset';
import { StyleSheet, View } from 'react-native';

import { Selo } from '@/components/selo';
import { Texto } from '@/components/texto';
import { Cores } from '@/constants/theme';

// Versão web do vídeo em laço: elemento <video> nativo do navegador (autoplay exige mudo e playsInline).
export function VideoLaco({ fonte, legenda, proporcao = 16 / 9 }: { fonte: number; legenda: string; proporcao?: number }) {
  const uri = Asset.fromModule(fonte).uri;
  return (
    <View style={{ gap: 6 }}>
      <View style={[styles.caixa, { aspectRatio: proporcao }]}>
        <video src={uri} autoPlay muted loop playsInline preload="auto" aria-label={legenda} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <View style={styles.selo}>
          <Selo texto="Vídeo" cor={Cores.dourado} />
        </View>
      </View>
      <Texto cor={Cores.textoApagado}>{legenda}</Texto>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: { width: '100%', borderRadius: 10, borderWidth: 1, borderColor: Cores.linha, overflow: 'hidden', backgroundColor: '#000' },
  selo: { position: 'absolute', top: 8, left: 8 },
});
