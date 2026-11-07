import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Botões de opção padrão de todos os interativos do app: mesma altura, mesmo raio, mesma fonte, largura igual
// por linha e grade centrada. A grade escolhe as colunas pelo número de opções e pelo tamanho dos rótulos.
// Seleção única (valor) ou múltipla (ativos). A cor de cada opção é opcional (ponto à esquerda e fundo ativo).

export interface ItemOpcao<T> { valor: T; rotulo: string; cor?: string }
type Entrada<T> = ItemOpcao<T> | [T, string];

// Colunas pela largura real do painel: a maior palavra cabe inteira numa linha e o rótulo inteiro em até duas.
// Assim nenhum botão quebra palavra no meio (ex.: "Explosiv-a" a 320 px).
const LETRA = 8.2; // largura média de um caractere do estilo "item"
const FOLGA = 22; // padding horizontal + borda
function colunasAuto(n: number, rotulos: string[], largura: number) {
  const palavra = Math.max(...rotulos.flatMap((r) => r.split(/\s+/).map((w) => w.length)));
  const maior = Math.max(...rotulos.map((r) => r.length));
  const cabe = (c: number) => {
    const util = (largura - 8 * (c - 1)) / c - FOLGA;
    return palavra * LETRA <= util && maior * LETRA <= util * 2;
  };
  const preferidas = n <= 1 ? [1] : n === 2 ? [2, 1] : n === 3 ? [3, 1] : n === 4 ? [2, 1] : n % 3 === 0 ? [3, 2, 1] : [2, 3, 1];
  return preferidas.find(cabe) ?? 1;
}

export function Opcoes<T extends string | number | boolean>({
  itens,
  valor,
  ativos,
  onChange,
  colunas,
}: {
  itens: Entrada<T>[];
  valor?: T;
  ativos?: T[];
  onChange: (v: T) => void;
  colunas?: number;
}) {
  const lista: ItemOpcao<T>[] = itens.map((x) => (Array.isArray(x) ? { valor: x[0], rotulo: x[1] } : x));
  const [largura, setLargura] = useState(300);
  const cols = colunas ?? colunasAuto(lista.length, lista.map((x) => x.rotulo), largura);
  const multiplo = ativos !== undefined;
  return (
    <View style={styles.grade} onLayout={(e) => setLargura(e.nativeEvent.layout.width)} accessibilityRole={multiplo ? undefined : 'radiogroup'}>
      {lista.map((x) => {
        const on = multiplo ? ativos!.includes(x.valor) : valor === x.valor;
        const cor = x.cor ?? Cores.destaque;
        return (
          <Pressable
            key={String(x.valor)}
            accessibilityRole={multiplo ? 'checkbox' : 'radio'}
            accessibilityState={{ checked: on }}
            onPress={() => onChange(x.valor)}
            style={({ pressed }) => [
              styles.opcao,
              { flexBasis: `${100 / cols - 3}%` as `${number}%` },
              on && { backgroundColor: cor, borderColor: cor },
              pressed && !on && styles.pressionada,
            ]}>
            {x.cor && !on ? <View style={[styles.ponto, { backgroundColor: x.cor }]} /> : null}
            <Texto t="item" cor={on ? Cores.fundo : Cores.texto} style={styles.rotulo}>{x.rotulo}</Texto>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.sm, justifyContent: 'center' },
  opcao: {
    flexGrow: 1,
    minHeight: 46,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Cores.linha,
    backgroundColor: 'rgba(255,255,255,0.03)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pressionada: { backgroundColor: 'rgba(111,211,255,0.12)' },
  ponto: { width: 8, height: 8, borderRadius: 4 },
  rotulo: { textAlign: 'center', flexShrink: 1, minWidth: 0 },
});
