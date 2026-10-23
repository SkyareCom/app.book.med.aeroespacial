import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { AtividadeClassificar } from '@/components/midia/atividade-classificar';
import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import { CASOS_MODELO_MEDICAO, EFEITOS_PRESSAO, type VariacaoPressao } from '@/data/atividades-atmosfera-padrao';

export function CompararAtmosferaPadrao() {
  return <AtividadeClassificar titulo="Modelo ou medição?" categorias={['Modelo', 'Medição']} casos={CASOS_MODELO_MEDICAO} />;
}

// Demonstração qualitativa: ensina o sentido da relação sem inventar uma escala numérica.
export function AltitudePressao() {
  const [variacao, setVariacao] = useState<VariacaoPressao | null>(null);
  const efeito = variacao ? EFEITOS_PRESSAO[variacao] : null;
  const y = efeito?.posicao === 'topo' ? 34 : efeito?.posicao === 'base' ? 146 : 90;
  return (
    <MolduraMidia tipo="Interativo" titulo="Pressão e altitude no modelo" instrucao="Toque em uma pressão e observe a posição do marcador de altitude.">
      <View style={styles.escolhas}>
        {(['menor', 'maior'] as const).map((valor) => (
          <Pressable
            key={valor}
            accessibilityRole="button"
            accessibilityState={{ selected: variacao === valor }}
            onPress={() => setVariacao(valor)}
            style={[styles.escolha, variacao === valor && styles.ativa]}>
            <Texto cor={variacao === valor ? Cores.fundo : Cores.textoSuave}>{valor === 'menor' ? 'Menor pressão' : 'Maior pressão'}</Texto>
          </Pressable>
        ))}
      </View>
      <View style={styles.palco}>
        <View style={styles.legendas}>
          <Texto cor={Cores.textoApagado}>Mais alto</Texto>
          <Texto cor={Cores.textoApagado}>Mais baixo</Texto>
        </View>
        <View style={styles.escala}>
          <Svg width="100%" height={180} viewBox="0 0 200 180" accessible={false}>
            <Line x1={22} y1={18} x2={22} y2={162} stroke={Cores.linha} strokeWidth={2} />
            {[34, 62, 90, 118, 146].map((p) => <Line key={p} x1={22} y1={p} x2={p === 34 || p === 146 ? 180 : 38} y2={p} stroke={Cores.linha} strokeDasharray={p === 34 || p === 146 ? '4 6' : undefined} />)}
            <Line x1={22} y1={y} x2={164} y2={y} stroke={efeito ? Cores.dourado : Cores.textoApagado} strokeWidth={2} />
            <Circle cx={164} cy={y} r={10} fill={efeito ? Cores.dourado : Cores.textoApagado} />
          </Svg>
        </View>
      </View>
      <View testID="resultado-altitude-pressao" style={styles.resultado} accessibilityLiveRegion="polite">
        <Texto t="rotulo" cor={Cores.textoApagado}>Altitude-pressão no modelo</Texto>
        <Texto t="item" cor={Cores.dourado}>{efeito ? efeito.altitude : 'Escolha uma das pressões acima'}</Texto>
        <Texto cor={Cores.textoSuave}>{efeito ? efeito.explicacao : 'O marcador mostra se a altitude correspondente fica mais alta ou mais baixa.'}</Texto>
      </View>
      <Texto cor={Cores.textoApagado}>A figura mostra o sentido da relação, sem escala numérica de altitude.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  escolhas: { flexDirection: 'row', gap: Espaco.sm },
  escolha: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Espaco.sm, borderRadius: 8, borderWidth: 1, borderColor: Cores.linha },
  ativa: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  palco: { flexDirection: 'row', gap: Espaco.sm },
  legendas: { width: 72, paddingVertical: 24, justifyContent: 'space-between' },
  escala: { flex: 1 },
  resultado: { gap: Espaco.sm, borderTopWidth: 1, borderTopColor: Cores.linha, paddingTop: Espaco.md },
});
