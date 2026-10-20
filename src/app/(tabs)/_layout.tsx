import { TabList, TabSlot, TabTrigger, Tabs, type TabTriggerSlotProps } from 'expo-router/ui';
import type { ComponentType } from 'react';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconeClinica, IconeEspaco, IconeFisiologia, IconeHome, IconeOperacao } from '@/components/icones';
import { Texto } from '@/components/texto';
import { Cores, LarguraMaxima } from '@/constants/theme';

// Rodapé: HOME · FISIOLOGIA · CLÍNICA · OPERAÇÃO · ESPAÇO (9px, maiúsculas).
const abas: { nome: string; href: '/' | '/fisiologia' | '/clinica' | '/operacao' | '/espaco'; rotulo: string; Icone: ComponentType<{ cor: string }> }[] = [
  { nome: 'index', href: '/', rotulo: 'Home', Icone: IconeHome },
  { nome: 'fisiologia', href: '/fisiologia', rotulo: 'Fisiologia', Icone: IconeFisiologia },
  { nome: 'clinica', href: '/clinica', rotulo: 'Clínica', Icone: IconeClinica },
  { nome: 'operacao', href: '/operacao', rotulo: 'Operação', Icone: IconeOperacao },
  { nome: 'espaco', href: '/espaco', rotulo: 'Espaço', Icone: IconeEspaco },
];

export default function LayoutAbas() {
  const insets = useSafeAreaInsets();
  const { width: largura } = useWindowDimensions();
  return (
    <Tabs style={{ flex: 1, backgroundColor: Cores.fundo }}>
      <TabSlot style={{ flex: 1 }} />
      {/* Sem asChild: no web, o Slot mescla estilos espalhando objetos e quebra estilos em lista. */}
      {/* Os TabTrigger precisam ser filhos diretos do TabList para o roteador encontrá-los. */}
      <TabList
        style={StyleSheet.flatten([
          styles.rodape,
          { paddingBottom: Math.max(insets.bottom, 12), paddingHorizontal: Math.max(0, (largura - LarguraMaxima) / 2) },
        ])}>
        {abas.map(({ nome, href, rotulo, Icone }) => (
          <TabTrigger key={nome} name={nome} href={href} asChild>
            <BotaoAba rotulo={rotulo} Icone={Icone} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

function BotaoAba({ rotulo, Icone, isFocused, onPress, onLongPress }: TabTriggerSlotProps & { rotulo: string; Icone: ComponentType<{ cor: string }> }) {
  const cor = isFocused ? Cores.destaque : Cores.textoApagado;
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} accessibilityRole="tab" accessibilityLabel={rotulo} accessibilityState={{ selected: !!isFocused }} style={styles.aba}>
      <Icone cor={cor} />
      <Texto t="rodape" cor={cor}>{rotulo}</Texto>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rodape: { flexDirection: 'row', backgroundColor: 'rgba(3,5,10,0.94)', borderTopWidth: 1, borderTopColor: Cores.linha, paddingTop: 8 },
  aba: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: 48 },
});
