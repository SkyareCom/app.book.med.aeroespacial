import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { CartaoImagem, Painel } from '@/components/cartoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Imagens } from '@/constants/imagens';
import { Cores, Espaco } from '@/constants/theme';
import { eras } from '@/data/historia';

// Linha do tempo em 5 eras. O teste fica no final de cada era.
export default function Historia() {
  const router = useRouter();
  return (
    <Tela titulo="O Voo e a Medicina" rotulo="Especial · 1783 → hoje">
      <CartaoImagem imagem={Imagens.voo} altura={140} direcao="esquerda">
        <Texto t="item" style={{ maxWidth: 260 }}>Cada vez que o ser humano voou mais alto, mais rápido ou mais longe, o corpo revelou um novo limite.</Texto>
      </CartaoImagem>

      {eras.map((era, i) => (
        <View key={era.id} style={{ gap: Espaco.sm }}>
          <View style={{ gap: 2, marginTop: Espaco.md }}>
            <Texto t="rotulo" cor={Cores.destaque}>Era {i + 1} · {era.periodo}</Texto>
            <Texto t="titulo">{era.titulo}</Texto>
          </View>
          <View style={styles.trilho}>
            {era.eventos.map((ev) => (
              <View key={ev.id} style={styles.evento}>
                <View style={styles.marco} />
                <Painel style={{ flex: 1 }}>
                  <Texto t="rotulo" cor={Cores.dourado}>{ev.ano}</Texto>
                  <Texto t="item">{ev.titulo}</Texto>
                  <Texto cor={Cores.textoSuave}>{ev.essencial}</Texto>
                </Painel>
              </View>
            ))}
          </View>
          <BotaoPrincipal
            rotulo="Teste o conhecimento"
            onPress={() => router.push({ pathname: '/teste', params: { origem: 'era', era: era.id, modo: 'quiz' } })}
          />
        </View>
      ))}
    </Tela>
  );
}

const styles = StyleSheet.create({
  trilho: { gap: Espaco.sm, borderLeftWidth: 1, borderLeftColor: Cores.linha, marginLeft: 6, paddingLeft: Espaco.md },
  evento: { flexDirection: 'row', alignItems: 'flex-start' },
  marco: { position: 'absolute', left: -Espaco.md - 5, top: 22, width: 9, height: 9, borderRadius: 5, backgroundColor: Cores.destaque },
});
