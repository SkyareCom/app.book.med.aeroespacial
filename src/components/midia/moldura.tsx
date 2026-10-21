import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Selo } from '@/components/selo';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Raio } from '@/constants/theme';

// Moldura comum das mídias de um tópico: tipo, título e instrução de uso.
export function MolduraMidia({ tipo, titulo, instrucao, children }: { tipo: string; titulo: string; instrucao?: string; children: ReactNode }) {
  return (
    <View style={styles.moldura}>
      <View style={{ gap: 6 }}>
        <Selo texto={tipo} cor={Cores.dourado} />
        <Texto t="item">{titulo}</Texto>
        {instrucao ? <Texto cor={Cores.textoApagado}>{instrucao}</Texto> : null}
      </View>
      {children}
    </View>
  );
}

export function Leitura({ rotulo, valor, cor = Cores.texto }: { rotulo: string; valor: string; cor?: string }) {
  return (
    <View style={styles.leitura}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
      <Texto t="titulo" cor={cor} style={{ fontVariant: ['tabular-nums'] }}>{valor}</Texto>
    </View>
  );
}

const styles = StyleSheet.create({
  moldura: {
    gap: Espaco.md,
    padding: Espaco.md,
    borderRadius: Raio - 4,
    borderWidth: 1,
    borderColor: 'rgba(232,196,106,0.28)',
    backgroundColor: 'rgba(3,5,10,0.55)',
  },
  leitura: { flexBasis: '45%', flexGrow: 1, gap: 2 },
});
