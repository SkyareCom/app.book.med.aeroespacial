import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Rect, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Gráficos e calculadoras do M1V7 · Forças G. Fontes no registro de src/data/capitulos/forcasg.ts.
// Curva nivelada: n = 1 ÷ cos(inclinação). Limites: 14 CFR 25.337 (transporte, mínimo +2,5) e 23.337 (normal 3,8;
// utilidade 4,4; acrobática 6,0). G-LOC: incapacitação absoluta ≈ 11,9 s e relativa ≈ 16 s (StatPearls, 2023).
// Tolerância: relaxada ≈ 4,4 G; traje ≈ 1 G; manobra treinada ≈ 3 G (Renjhen e Agarwal, 2011).
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

// ---------------------------------------------------------------- Curva nivelada e limites de carga
const LIMITES = [2.5, 3.8, 4.4, 6].map((v) => [v] as [number]);

export function CurvaCarga() {
  const [inc, setInc] = useState(60);
  const [larg, setLarg] = useState(300);
  const g = 1 / Math.cos((inc * Math.PI) / 180);
  const H = 110;
  const x0 = 8, x1 = larg - 8;
  const X = (v: number) => x0 + ((Math.min(v, 7) - 1) / 6) * (x1 - x0);
  const cor = g > 6 ? Cores.erro : g > 2.5 ? Cores.dourado : Cores.acerto;
  const yB = 22;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quanto G uma curva faz" instrucao="Numa curva nivelada, a carga cresce com a inclinação das asas. Compare com o limite de cada categoria de avião.">
      <Deslizante min={0} max={80} passo={5} valor={inc} onChange={setInc} rotulo="Inclinação das asas em graus" formatar={(v) => `${fmt(v)} graus`} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <SvgText x={x0} y={12} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>FATOR DE CARGA (G)</SvgText>
          <Rect x={x0} y={yB} width={x1 - x0} height={12} rx={6} fill={Cores.trilha} />
          <Rect x={x0} y={yB} width={Math.max(X(g) - x0, 3)} height={12} rx={6} fill={cor} />
          {[1, 2, 3, 4, 5, 6, 7].map((v) => (
            <SvgText key={v} x={X(v)} y={yB + 26} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={v === 1 ? 'start' : v === 7 ? 'end' : 'middle'}>{v}</SvgText>
          ))}
          {LIMITES.map(([v]) => (
            <Line key={v} x1={X(v)} y1={yB - 4} x2={X(v)} y2={yB + 16} stroke={Cores.texto} strokeWidth={1.5} />
          ))}
          <SvgText x={x0} y={yB + 48} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>TRAÇOS: LIMITES DE MANOBRA</SvgText>
          <SvgText x={x0} y={yB + 64} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>TRANSPORTE 2,5 · NORMAL 3,8</SvgText>
          <SvgText x={x0} y={yB + 80} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>UTILIDADE 4,4 · ACROBÁTICA 6</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Carga na curva" valor={`${fmt(g, 1)} G`} cor={cor} />
        <Leitura rotulo="Uma pessoa de 70 kg pesa" valor={`${fmt(70 * g)} kg`} />
      </View>
      <View style={[styles.marca, { borderLeftColor: cor }]}>
        <Texto>
          {g > 6
            ? 'Acima do limite até da categoria acrobática. No corpo sem proteção, a visão já se apaga nessa faixa.'
            : g > 4.4
              ? 'Só a categoria acrobática suporta. O corpo sem proteção já pode perder a visão periférica a partir de 3,4 G.'
              : g > 2.5
                ? 'Acima do mínimo exigido do avião de transporte. O corpo sente peso, e o sangue começa a descer.'
                : 'Dentro da faixa de qualquer avião. O corpo sente o peso aumentar, sem efeito na visão.'}
        </Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Linha do tempo do G-LOC
const FASES = [
  { id: 'aviso', nome: 'Aviso visual', de: -6, ate: 0, cor: Cores.dourado, texto: 'Com o G subindo devagar, a visão estreita, fica cinza e apaga. Com subida rápida, acima de 1 G por segundo, este aviso pode não existir.' },
  { id: 'absoluta', nome: 'Inconsciência', de: 0, ate: 12, cor: Cores.erro, texto: 'Incapacitação absoluta: cerca de 12 segundos em média (de 2 a 38). Pode haver abalos musculares de alguns segundos e sonhos curtos.' },
  { id: 'relativa', nome: 'Confusão', de: 12, ate: 28, cor: '#E8A0A0', texto: 'Incapacitação relativa: cerca de 16 segundos (de 2 a 97). O piloto acorda, mas ainda não consegue comandar o avião com segurança.' },
];

export function LinhaGLOC() {
  const [sel, setSel] = useState('absoluta');
  const [larg, setLarg] = useState(300);
  const f = FASES.find((x) => x.id === sel) ?? FASES[1];
  const H = 84;
  const x0 = 8, x1 = larg - 8;
  const X = (s: number) => x0 + ((s + 6) / 36) * (x1 - x0);
  return (
    <MolduraMidia tipo="Gráfico" titulo="Quanto tempo o piloto fica fora" instrucao="Médias de 500 pessoas na centrífuga. O zero é o momento da perda de consciência. Toque numa fase.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {FASES.map((x) => (
            <G key={x.id} onPress={() => setSel(x.id)}>
              <Rect x={X(x.de)} y={16} width={X(x.ate) - X(x.de) - 2} height={22} rx={5} fill={x.cor} fillOpacity={x.id === sel ? 1 : 0.45} />
            </G>
          ))}
          <SvgText x={X(-3)} y={11} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="middle">AVISO</SvgText>
          <SvgText x={X(6)} y={11} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="middle">INCONSCIENTE</SvgText>
          <SvgText x={X(20)} y={11} fill="#E8A0A0" fontSize={9} fontFamily={Fonte} textAnchor="middle">CONFUSO</SvgText>
          <Line x1={X(28)} y1={12} x2={X(28)} y2={44} stroke={Cores.texto} strokeDasharray="3 3" />
          {[0, 10, 20, 30].map((s) => (
            <SvgText key={s} x={X(s)} y={56} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={s === 30 ? 'end' : 'middle'}>{s} s</SvgText>
          ))}
          <SvgText x={X(28)} y={72} fill={Cores.texto} fontSize={9} fontFamily={Fonte} textAnchor="end">≈ 28 s SEM CONTROLE</SvgText>
        </Svg>
      </View>
      <View style={styles.escolhas}>
        {FASES.map((x) => (
          <Pressable key={x.id} accessibilityRole="radio" accessibilityState={{ checked: sel === x.id }} onPress={() => setSel(x.id)} style={[styles.escolha, sel === x.id && { backgroundColor: x.cor, borderColor: x.cor }]}>
            <Texto t="rotulo" cor={sel === x.id ? Cores.fundo : Cores.texto}>{x.nome}</Texto>
          </Pressable>
        ))}
      </View>
      <View style={[styles.marca, { borderLeftColor: f.cor }]}>
        <Texto>{f.texto}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Pilha de tolerância
export function PilhaTolerancia() {
  const [traje, setTraje] = useState(true);
  const [manobra, setManobra] = useState(true);
  const [larg, setLarg] = useState(300);
  const base = 4.4;
  const total = base + (traje ? 1 : 0) + (manobra ? 3 : 0);
  const H = 92;
  const x0 = 8, x1 = larg - 8;
  const X = (v: number) => x0 + (v / 10) * (x1 - x0);
  const yB = 18;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Como se chega perto de 9 G" instrucao="Some as defesas à tolerância sem proteção. Valores médios; a tolerância de cada pessoa varia.">
      <View style={styles.escolhas}>
        <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: traje }} onPress={() => setTraje(!traje)} style={[styles.escolha, traje && styles.escolhaAtiva]}>
          <Texto t="rotulo" cor={traje ? Cores.fundo : Cores.texto}>Traje anti-G</Texto>
        </Pressable>
        <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: manobra }} onPress={() => setManobra(!manobra)} style={[styles.escolha, manobra && styles.escolhaAtiva]}>
          <Texto t="rotulo" cor={manobra ? Cores.fundo : Cores.texto}>Manobra anti-G</Texto>
        </Pressable>
      </View>
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Rect x={x0} y={yB} width={x1 - x0} height={18} rx={6} fill={Cores.trilha} />
          <Rect x={x0} y={yB} width={X(base) - x0} height={18} rx={6} fill={Cores.textoSuave} />
          {traje ? <Rect x={X(base)} y={yB} width={X(base + 1) - X(base)} height={18} fill={Cores.destaque} /> : null}
          {manobra ? <Rect x={X(base + (traje ? 1 : 0))} y={yB} width={X(3) - X(0)} height={18} fill={Cores.dourado} /> : null}
          <Line x1={X(9)} y1={yB - 6} x2={X(9)} y2={yB + 24} stroke={Cores.erro} strokeWidth={1.5} />
          <SvgText x={X(9)} y={yB - 8} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="middle">9 G</SvgText>
          {[0, 2, 4, 6, 8, 10].map((v) => (
            <SvgText key={v} x={X(v)} y={yB + 34} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={v === 0 ? 'start' : v === 10 ? 'end' : 'middle'}>{v}</SvgText>
          ))}
          <Circle cx={x0 + 4} cy={yB + 50} r={4} fill={Cores.textoSuave} />
          <SvgText x={x0 + 12} y={yB + 53} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>SEM PROTEÇÃO 4,4</SvgText>
          <Circle cx={x0 + 4} cy={yB + 66} r={4} fill={Cores.destaque} />
          <SvgText x={x0 + 12} y={yB + 69} fill={Cores.destaque} fontSize={9} fontFamily={Fonte}>TRAJE +1</SvgText>
          <Circle cx={X(5)} cy={yB + 66} r={4} fill={Cores.dourado} />
          <SvgText x={X(5) + 8} y={yB + 69} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>MANOBRA +3</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Tolerância estimada" valor={`${fmt(total, 1)} G`} cor={total >= 8 ? Cores.acerto : total >= 5.4 ? Cores.dourado : Cores.erro} />
      </View>
      <Texto cor={Cores.textoApagado}>Hidratação, descanso e forma física ajudam; desidratação, fadiga, fome e medicamentos tiram tolerância.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Centrífuga: braço e rotação
// Física: aceleração centrípeta = ω² × r; G sentido = √(1 + (ω²r ÷ 9,81)²), somando a gravidade (cálculo).
export function CalculadoraCentrifuga() {
  const [raio, setRaio] = useState(8);
  const [rpm, setRpm] = useState(30);
  const w = (2 * Math.PI * rpm) / 60;
  const gc = (w * w * raio) / 9.81;
  const g = Math.sqrt(1 + gc * gc);
  const cor = g >= 9 ? Cores.erro : g >= 7 ? Cores.dourado : Cores.acerto;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quantas voltas fazem 9 G" instrucao="Escolha o comprimento do braço e a rotação. A cabine na ponta do braço soma a força do giro à gravidade.">
      <Deslizante min={4} max={15} passo={0.5} valor={raio} onChange={setRaio} rotulo="Comprimento do braço em metros" formatar={(v) => `${fmt(v, v % 1 ? 1 : 0)} metros`} />
      <Deslizante min={5} max={60} passo={1} valor={rpm} onChange={setRpm} rotulo="Rotações por minuto" formatar={(v) => `${fmt(v)} voltas por minuto`} />
      <View style={styles.leituras}>
        <Leitura rotulo="G sentido pelo piloto" valor={`${fmt(g, 1)} G`} cor={cor} />
        <Leitura rotulo="Velocidade da cabine" valor={`${fmt(w * raio * 3.6)} km/h`} />
        <Leitura rotulo="Uma volta a cada" valor={`${fmt(60 / rpm, 1)} s`} />
      </View>
      <View style={[styles.marca, { borderLeftColor: cor }]}>
        <Texto>
          {g >= 9
            ? '9 G ou mais: o perfil de treino do padrão da OTAN para caças. Só com traje e manobra anti-G bem feita.'
            : g >= 7
              ? 'Faixa de G sustentado alto: 7 G ou mais com proteção, pelo padrão da OTAN.'
              : g >= 4.5
                ? 'Nesta faixa, sem proteção, a consciência já pode se perder (4,5 a 6,3 G).'
                : 'Faixa em que o corpo sente o peso e a visão ainda se mantém, na maioria das pessoas.'}
        </Texto>
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
  escolhas: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  escolha: { minHeight: 34, paddingHorizontal: 12, borderRadius: 17, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
  escolhaAtiva: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
});
