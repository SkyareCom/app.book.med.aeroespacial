import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';

import { Selo } from '@/components/selo';
import { Texto } from '@/components/texto';
import { Cores } from '@/constants/theme';

// Vídeo curto em laço, sem som, como um GIF de alta qualidade. Arquivos em assets/videos (MP4, até ~8 s).
export function VideoLaco({ fonte, legenda, proporcao = 16 / 9 }: { fonte: number; legenda: string; proporcao?: number }) {
  const player = useVideoPlayer(fonte, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });
  return (
    <View style={{ gap: 6 }}>
      <View style={[styles.caixa, { aspectRatio: proporcao }]}>
        <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="cover" nativeControls={false} allowsPictureInPicture={false} />
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
