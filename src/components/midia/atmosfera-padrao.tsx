import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte, Tamanho } from '@/constants/theme';
import { lerNumeroBrasileiro } from '@/lib/medicao-atmosferica';

const PENDENTE = '[confirmar na referência]';

function Campo({ rotulo, valor, mudar, numerico = false }: {
  rotulo: string; valor: string; mudar: (valor: string) => void; numerico?: boolean;
}) {
  const invalido = numerico && valor.trim() !== '' && lerNumeroBrasileiro(valor) === null;
  return (
    <View style={styles.campo}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
      <TextInput
        accessibilityLabel={rotulo}
        value={valor}
        onChangeText={mudar}
        inputMode={numerico ? 'decimal' : 'text'}
        autoCorrect={false}
        underlineColorAndroid="transparent"
        style={[styles.entrada, invalido && styles.entradaInvalida]}
      />
      {invalido ? <Texto accessibilityLiveRegion="polite" cor={Cores.dourado}>Use um número; separe os decimais com vírgula.</Texto> : null}
    </View>
  );
}

export function CompararAtmosferaPadrao() {
  const [modo, setModo] = useState<'modelo' | 'medicao'>('modelo');
  const [pressao, setPressao] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [altitude, setAltitude] = useState('');
  const [local, setLocal] = useState('');
  const [momento, setMomento] = useState('');
  return (
    <MolduraMidia tipo="Interativo" titulo="Uma referência para comparar" instrucao="Toque em Modelo ou Medição para distinguir a referência dos valores observados.">
      <View style={styles.escolhas}>
        {(['modelo', 'medicao'] as const).map((valor) => (
          <Pressable key={valor} accessibilityRole="button" accessibilityState={{ selected: modo === valor }} onPress={() => setModo(valor)} style={[styles.escolha, modo === valor && styles.ativa]}>
            <Texto cor={modo === valor ? Cores.fundo : Cores.textoSuave}>{valor === 'modelo' ? 'Modelo' : 'Medição'}</Texto>
          </Pressable>
        ))}
      </View>
      {modo === 'modelo' ? (
        <View testID="atmosfera-modelo" style={styles.conteudo}>
          <Texto cor={Cores.textoSuave}>Condições definidas para uma referência comum.</Texto>
          {['Altitude de referência', 'Pressão em mmHg', 'Temperatura em °C'].map((rotulo) => (
            <View key={rotulo} style={styles.leitura}>
              <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
              <Texto cor={Cores.dourado}>{PENDENTE}</Texto>
            </View>
          ))}
          <Texto cor={Cores.textoApagado}>Equações, coeficientes e faixa de validade: {PENDENTE}.</Texto>
        </View>
      ) : (
        <View testID="atmosfera-medicao" style={styles.conteudo}>
          <Texto cor={Cores.textoSuave}>Registre os valores que você mediu e identifique a observação.</Texto>
          <Campo rotulo="Altitude medida (m)" valor={altitude} mudar={setAltitude} numerico />
          <Campo rotulo="Pressão medida (mmHg)" valor={pressao} mudar={setPressao} numerico />
          <Campo rotulo="Temperatura medida (°C)" valor={temperatura} mudar={setTemperatura} numerico />
          <Campo rotulo="Local e procedência" valor={local} mudar={setLocal} />
          <Campo rotulo="Data, hora e fuso da observação" valor={momento} mudar={setMomento} />
          <Texto cor={Cores.textoApagado}>Estes campos contêm apenas os valores digitados por você.</Texto>
        </View>
      )}
      <Texto cor={Cores.textoApagado}>Compare o modelo com uma medição identificada, usando a mesma altitude e as mesmas unidades. {PENDENTE}</Texto>
    </MolduraMidia>
  );
}

// Diagrama conceitual: não desenha uma curva nem calcula altitudes com coeficientes ainda pendentes.
export function AltitudePressao() {
  const [etapa, setEtapa] = useState<'pressao' | 'altitude'>('pressao');
  const [pressao, setPressao] = useState('');
  const numero = lerNumeroBrasileiro(pressao);
  return (
    <MolduraMidia tipo="Interativo" titulo="Da pressão à altitude-pressão" instrucao="Toque nas duas etapas para acompanhar a associação feita pelo modelo.">
      <View style={styles.escolhas}>
        <Pressable accessibilityRole="button" accessibilityState={{ selected: etapa === 'pressao' }} onPress={() => setEtapa('pressao')} style={[styles.escolha, etapa === 'pressao' && styles.ativa]}>
          <Texto cor={etapa === 'pressao' ? Cores.fundo : Cores.textoSuave}>Pressão</Texto>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityState={{ selected: etapa === 'altitude' }} onPress={() => setEtapa('altitude')} style={[styles.escolha, etapa === 'altitude' && styles.ativa]}>
          <Texto cor={etapa === 'altitude' ? Cores.fundo : Cores.textoSuave}>Altitude-pressão</Texto>
        </Pressable>
      </View>
      <Svg width="100%" height={126} viewBox="0 0 300 126" accessible={false}>
        <Rect x={12} y={12} width={88} height={102} rx={10} fill={Cores.painel} stroke={etapa === 'pressao' ? Cores.dourado : Cores.linha} strokeWidth={2} />
        <Rect x={200} y={12} width={88} height={102} rx={10} fill={Cores.painel} stroke={etapa === 'altitude' ? Cores.dourado : Cores.linha} strokeWidth={2} />
        <Circle cx={56} cy={63} r={22} fill="none" stroke={Cores.destaque} strokeWidth={2} />
        <Line x1={56} y1={63} x2={68} y2={49} stroke={Cores.dourado} strokeWidth={3} />
        <Line x1={217} y1={36} x2={271} y2={36} stroke={Cores.destaque} />
        <Line x1={217} y1={54} x2={249} y2={54} stroke={Cores.destaque} />
        <Line x1={217} y1={72} x2={271} y2={72} stroke={Cores.destaque} />
        <Line x1={217} y1={90} x2={249} y2={90} stroke={Cores.destaque} />
        <Line x1={111} y1={63} x2={188} y2={63} stroke={Cores.dourado} strokeWidth={2} />
        <Path d="M179 56L188 63L179 70" fill="none" stroke={Cores.dourado} strokeWidth={2} />
      </Svg>
      <View style={styles.leitura} accessibilityLiveRegion="polite">
        <Texto t="item" cor={Cores.dourado}>{etapa === 'pressao' ? 'Uma pressão informada' : 'Uma altitude no modelo'}</Texto>
        <Texto cor={Cores.textoSuave}>{etapa === 'pressao'
          ? 'A pressão é a medida de entrada. Identifique sua unidade e sua procedência.'
          : 'A altitude-pressão expressa essa pressão na escala de altitudes da atmosfera padrão.'}</Texto>
      </View>
      <Campo rotulo="Pressão informada (mmHg)" valor={pressao} mudar={setPressao} numerico />
      {numero !== null ? <Texto cor={Cores.textoSuave}>Pressão digitada: {numero.toLocaleString('pt-BR', { maximumFractionDigits: 8 })} mmHg.</Texto> : null}
      <View style={styles.leitura}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Altitude-pressão correspondente · ft (m)</Texto>
        <Texto cor={Cores.dourado}>{PENDENTE}</Texto>
        <Texto cor={Cores.textoApagado}>Relação entre pressão e altitude, faixa de validade e conversão numérica: {PENDENTE}.</Texto>
      </View>
      <Texto cor={Cores.textoApagado}>A altitude-pressão traduz uma pressão para a escala de altitudes do modelo.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  escolhas: { flexDirection: 'row', gap: Espaco.sm },
  escolha: { flex: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Espaco.sm, borderRadius: 8, borderWidth: 1, borderColor: Cores.linha },
  ativa: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  conteudo: { gap: Espaco.md },
  leitura: { gap: 4, paddingVertical: Espaco.sm, borderTopWidth: 1, borderTopColor: Cores.linha },
  campo: { gap: 4 },
  entrada: { minHeight: 44, padding: Espaco.sm, color: Cores.texto, fontFamily: Fonte, fontSize: Tamanho.corpo, backgroundColor: Cores.painel, borderWidth: 1, borderColor: Cores.linha, borderRadius: 8 },
  entradaInvalida: { borderColor: Cores.dourado },
});
