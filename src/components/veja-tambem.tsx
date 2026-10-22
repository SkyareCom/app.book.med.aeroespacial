import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import type { ConteudoTopico } from '@/data/tipos';

export function VejaTambem({ voos }: { voos: NonNullable<ConteudoTopico['vejaTambem']> }) {
  return (
    <View style={{ gap: Espaco.sm }}>
      <Texto t="rotulo" cor={Cores.destaque}>Veja também</Texto>
      {voos.map((voo) => (
        <Link key={voo.codigo} href={{ pathname: '/capitulo/[secao]/[numero]', params: { secao: voo.secao, numero: String(voo.voo) } }} asChild>
          <Pressable accessibilityRole="link" accessibilityLabel={`${voo.codigo} · ${voo.titulo}`} style={{ minHeight: 44, justifyContent: 'center', gap: 3, borderTopWidth: 1, borderTopColor: Cores.linha, paddingVertical: Espaco.sm }}>
            <Texto t="rotulo" cor={Cores.dourado}>{voo.codigo}</Texto>
            <Texto cor={Cores.textoSuave}>{voo.titulo}</Texto>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
