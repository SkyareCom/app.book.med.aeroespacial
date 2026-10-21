import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Painel } from '@/components/cartoes';
import { IconeSeta } from '@/components/icones';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import { notificacoes } from '@/data/notificacoes';
import { useNotificacoes } from '@/state/notificacoes';

// Novidades do app: voos liberados, missão especial, laboratório e o que está em produção.
export default function Notificacoes() {
  const router = useRouter();
  const { marcarLidas } = useNotificacoes();

  useEffect(() => {
    marcarLidas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tela titulo="Notificações" rotulo="Novidades do app">
      {notificacoes.map((n) => {
        const conteudo = (
          <Painel>
            <View style={styles.linha}>
              <View style={{ flex: 1, gap: 4 }}>
                <Texto t="rotulo" cor={Cores.dourado}>{n.rotulo}</Texto>
                <Texto t="item">{n.titulo}</Texto>
                <Texto cor={Cores.textoSuave}>{n.texto}</Texto>
              </View>
              {n.destino ? <IconeSeta cor={Cores.destaque} /> : null}
            </View>
          </Painel>
        );
        return n.destino ? (
          <Pressable key={n.id} accessibilityRole="link" accessibilityLabel={`${n.rotulo}: ${n.titulo}`} onPress={() => router.push(n.destino!)} style={({ pressed }) => pressed && { opacity: 0.85 }}>
            {conteudo}
          </Pressable>
        ) : (
          <View key={n.id}>{conteudo}</View>
        );
      })}
    </Tela>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md },
});
