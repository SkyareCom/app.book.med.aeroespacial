import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CartaoImagem } from '@/components/cartoes';
import { Midia, NOME_MIDIA } from '@/components/midia';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Imagens } from '@/constants/imagens';
import { Cores, Espaco, Raio } from '@/constants/theme';
import type { TipoMidia } from '@/data/tipos';

const ORDEM: TipoMidia[] = ['simulador-o2', 'simulador-visao', 'grafico-tuc', 'forcas-g', 'leis-gases', 'adaptacao-escuro', 'regua-ruido', 'radiacao-voo', 'risco-aeromedico', 'perda-ossea', 'classificar-hipoxia'];

export default function Laboratorio() {
  const { midia } = useLocalSearchParams<{ midia?: string }>();
  const [ativo, setAtivo] = useState<TipoMidia>(ORDEM.includes(midia as TipoMidia) ? (midia as TipoMidia) : 'simulador-o2');

  return (
    <Tela titulo="Laboratório aeroespacial" rotulo="Simuladores, gráficos e atividades">
      <CartaoImagem imagem={Imagens.lab} altura={120}>
        <Texto t="item">Experimente o que acontece com o corpo em cada condição de voo. Cada simulador também aparece no voo do tema.</Texto>
      </CartaoImagem>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Espaco.sm }}>
        {ORDEM.map((m) => (
          <Pressable key={m} accessibilityRole="tab" accessibilityState={{ selected: ativo === m }} onPress={() => setAtivo(m)} style={[styles.chip, ativo === m && styles.chipAtivo]}>
            <Texto t="rotulo" cor={ativo === m ? Cores.fundo : Cores.texto}>{NOME_MIDIA[m]}</Texto>
          </Pressable>
        ))}
      </ScrollView>
      <View key={ativo}>
        <Midia tipo={ativo} />
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  chip: { minHeight: 40, paddingHorizontal: 14, borderRadius: Raio, borderWidth: 1, borderColor: Cores.linha, justifyContent: 'center', backgroundColor: 'rgba(3,5,10,0.6)' },
  chipAtivo: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
});
