import { useState } from 'react';
import { StyleSheet, View, type GestureResponderEvent } from 'react-native';

import { Cores } from '@/constants/theme';

// Controle deslizante próprio: funciona igual no Android, iOS e web, sem módulo nativo extra.
export function Deslizante({
  min,
  max,
  passo,
  valor,
  onChange,
  rotulo,
  formatar = (v) => String(v),
}: {
  min: number;
  max: number;
  passo: number;
  valor: number;
  onChange: (v: number) => void;
  rotulo: string;
  formatar?: (v: number) => string;
}) {
  const [largura, setLargura] = useState(1);
  const pct = (valor - min) / (max - min);

  function mover(e: GestureResponderEvent) {
    const x = Math.max(0, Math.min(largura, e.nativeEvent.locationX));
    const bruto = min + (x / largura) * (max - min);
    onChange(Math.round(bruto / passo) * passo);
  }

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={rotulo}
      accessibilityValue={{ min, max, now: valor, text: formatar(valor) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) => onChange(Math.max(min, Math.min(max, valor + (e.nativeEvent.actionName === 'increment' ? passo : -passo))))}
      style={styles.area}
      onLayout={(e) => setLargura(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderTerminationRequest={() => false}
      onResponderGrant={mover}
      onResponderMove={mover}>
      <View pointerEvents="none" style={styles.trilha}>
        <View style={[styles.preenchido, { width: `${pct * 100}%` }]} />
      </View>
      <View pointerEvents="none" style={[styles.pino, { left: pct * largura - 14 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  area: { height: 44, justifyContent: 'center' },
  trilha: { height: 4, borderRadius: 2, backgroundColor: Cores.trilha, overflow: 'hidden' },
  preenchido: { height: 4, backgroundColor: Cores.destaque },
  pino: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Cores.fundo,
    borderWidth: 2,
    borderColor: Cores.destaque,
  },
});
