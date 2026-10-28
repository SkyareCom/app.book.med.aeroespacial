import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Rect, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Gráficos e simuladores do M1V4 · Temperatura e sobrevivência.
// Temperatura corporal: hipotermia pela Wilderness Medical Society (AAFP, 2020); calor pela Flight Safety Foundation,
// Human Factors & Aviation Medicine 48(4), 2001. Desidratação: mesma fonte, tabela 1.
// Água fria 1-10-1: Giesbrecht (McGill OSS, "Professor Popsicle's physiological proof").
// Regra dos três: FAA CAMI, Basic Survival for Aviation (OK-06-033), p. 7.
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });
const VERMELHO = Cores.erro;
const AMARELO = Cores.dourado;
const VERDE = Cores.acerto;
const AZUL = Cores.destaque;

// ---------------------------------------------------------------- Termômetro do corpo
const FAIXAS: { de: number; ate: number; nome: string; cor: string; sinais: string }[] = [
  { de: 24, ate: 28, nome: 'Hipotermia grave', cor: '#3B6FD9', sinais: 'Sem movimento, sem tremor, inconsciente. Risco alto de arritmia.' },
  { de: 28, ate: 32, nome: 'Hipotermia moderada', cor: '#4E8FE8', sinais: 'O tremor diminui ou para; movimentos prejudicados. Manter deitado.' },
  { de: 32, ate: 35, nome: 'Hipotermia leve', cor: AZUL, sinais: 'Tremor presente, alerta, mas com movimentos prejudicados.' },
  { de: 35, ate: 37.5, nome: 'Regulação normal', cor: VERDE, sinais: 'O corpo regula a própria temperatura: tremor no frio, suor no calor.' },
  { de: 37.5, ate: 38.3, nome: 'Estresse térmico', cor: AMARELO, sinais: 'Caem coordenação, atenção, decisão, visão e cautela.' },
  { de: 38.3, ate: 40.6, nome: 'Exaustão pelo calor', cor: '#F2994A', sinais: 'Fadiga, náusea ou vômito, tontura, cãibras, respiração rápida, desmaio.' },
  { de: 40.6, ate: 43, nome: 'Insolação', cor: VERMELHO, sinais: 'O controle de temperatura falha: confusão, comportamento estranho, coma. Emergência.' },
];

export function TermometroCorpo() {
  const [t, setT] = useState(37);
  const [larg, setLarg] = useState(300);
  const faixa = FAIXAS.find((f) => t >= f.de && t < f.ate) ?? FAIXAS[FAIXAS.length - 1];
  const H = 84;
  const x0 = 10, x1 = larg - 10;
  const X = (v: number) => x0 + ((v - 24) / (43 - 24)) * (x1 - x0);
  return (
    <MolduraMidia tipo="Simulação" titulo="Da hipotermia à insolação" instrucao="Arraste a temperatura central do corpo. Cada faixa tem os seus sinais; no campo, são os sinais que guiam a conduta.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {FAIXAS.map((f) => (
            <Rect key={f.nome} x={X(f.de)} y={30} width={X(f.ate) - X(f.de) - 1.5} height={16} fill={f.cor} fillOpacity={f === faixa ? 0.95 : 0.4} />
          ))}
          {[28, 32, 35, 37.5, 40.6].map((v, i) => (
            <SvgText key={v} x={X(v)} y={i % 2 ? 76 : 64} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{fmt(v, v % 1 ? 1 : 0)} °C</SvgText>
          ))}
          <Line x1={X(t)} y1={22} x2={X(t)} y2={52} stroke={Cores.texto} strokeWidth={2} />
          <Circle cx={X(t)} cy={18} r={6} fill={faixa.cor} stroke={Cores.texto} strokeWidth={1.5} />
        </Svg>
      </View>
      <Deslizante min={24} max={43} passo={0.1} valor={t} onChange={(v) => setT(Math.round(v * 10) / 10)} rotulo="Temperatura central em graus Celsius" formatar={(v) => `${fmt(v, 1)} graus`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Temperatura central" valor={`${fmt(t, 1)} °C`} cor={faixa.cor} />
        <Leitura rotulo="Faixa" valor={faixa.nome} cor={faixa.cor} />
      </View>
      <View style={[styles.marca, { borderLeftColor: faixa.cor }]}>
        <Texto>{faixa.sinais}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Desidratação
const PERDAS: [number, string][] = [
  [0, 'Sem perda relevante.'],
  [1.5, 'Sede.'],
  [3, 'Lentidão, fadiga, náusea e instabilidade emocional.'],
  [4, 'Falta de jeito, dor de cabeça; sobem temperatura, pulso e respiração.'],
  [5, 'Tontura, fala arrastada, fraqueza e confusão.'],
  [6, 'Delírio, língua inchada, queda do volume de sangue, falência dos rins.'],
  [9, 'Incapacidade de engolir, dor ao urinar, pele rachada.'],
  [12, 'Morte iminente.'],
];

export function SimuladorDesidratacao() {
  const [litros, setLitros] = useState(1.5);
  const [larg, setLarg] = useState(300);
  const etapa = [...PERDAS].reverse().find(([l]) => litros >= l) ?? PERDAS[0];
  const cor = litros < 1.5 ? VERDE : litros < 3 ? AMARELO : litros < 5 ? '#F2994A' : VERMELHO;
  const H = 66;
  const x0 = 8, x1 = larg - 8;
  const X = (l: number) => x0 + (l / 12) * (x1 - x0);
  return (
    <MolduraMidia tipo="Simulação" titulo="Quanto de água o corpo perdeu" instrucao="Arraste os litros perdidos. Os sinais se somam: a sede é só o primeiro aviso.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Rect x={x0} y={18} width={x1 - x0} height={14} rx={7} fill={Cores.trilha} />
          <Rect x={x0} y={18} width={X(litros) - x0} height={14} rx={7} fill={cor} fillOpacity={0.8} />
          {PERDAS.slice(1).map(([l]) => (
            <G key={l}>
              <Line x1={X(l)} y1={14} x2={X(l)} y2={36} stroke={Cores.textoApagado} strokeWidth={1} />
              <SvgText x={X(l)} y={52} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={l === 12 ? 'end' : 'middle'}>{fmt(l, l % 1 ? 1 : 0)} L</SvgText>
            </G>
          ))}
        </Svg>
      </View>
      <Deslizante min={0} max={12} passo={0.5} valor={litros} onChange={setLitros} rotulo="Litros de água perdidos" formatar={(v) => `${fmt(v, 1)} litros`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Água perdida" valor={`${fmt(litros, 1)} L`} cor={cor} />
      </View>
      <View style={[styles.marca, { borderLeftColor: cor }]}>
        <Texto>{etapa[1]}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Água fria 1-10-1
const FASES: { ate: number; nome: string; conduta: string; cor: string }[] = [
  { ate: 1, nome: 'Choque frio', conduta: 'Respiração ofegante e descontrolada: o risco é aspirar água. Mantenha a calma e controle a respiração.', cor: VERMELHO },
  { ate: 10, nome: 'Incapacitação pelo frio', conduta: 'Cerca de 10 minutos de movimentos úteis antes de os músculos falharem: saia da água ou se prenda a algo que flutue.', cor: AMARELO },
  { ate: 60, nome: 'Hipotermia', conduta: 'A hipotermia leva pelo menos meia hora e, por volta de 1 hora, à inconsciência. Poupe calor e espere o resgate.', cor: AZUL },
];

export function AguaFria() {
  const [min, setMin] = useState(0.5);
  const [larg, setLarg] = useState(300);
  const fase = FASES.find((f) => min <= f.ate) ?? FASES[2];
  const H = 70;
  const x0 = 8, x1 = larg - 8;
  // Escala não linear: o primeiro minuto ocupa um quarto da barra, os 10 minutos a metade.
  const X = (m: number) => x0 + (m <= 1 ? m * 0.25 : m <= 10 ? 0.25 + ((m - 1) / 9) * 0.25 : 0.5 + ((m - 10) / 50) * 0.5) * (x1 - x0);
  return (
    <MolduraMidia tipo="Simulação" titulo="1 minuto, 10 minutos, 1 hora" instrucao="Arraste o tempo na água gelada. A maioria das mortes acontece logo no início, não pela hipotermia.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {FASES.map((f, i) => {
            const de = i ? FASES[i - 1].ate : 0;
            return <Rect key={f.nome} x={X(de)} y={18} width={X(f.ate) - X(de) - 2} height={16} rx={4} fill={f.cor} fillOpacity={f === fase ? 0.9 : 0.35} />;
          })}
          {[[0, '0'], [1, '1 MIN'], [10, '10 MIN'], [60, '1 H']].map(([m, r]) => (
            <SvgText key={String(m)} x={X(Number(m))} y={52} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={m === 0 ? 'start' : m === 60 ? 'end' : 'middle'}>{String(r)}</SvgText>
          ))}
          <Circle cx={X(min)} cy={26} r={7} fill={Cores.texto} />
        </Svg>
      </View>
      <Deslizante min={0} max={60} passo={0.5} valor={min} onChange={setMin} rotulo="Minutos na água fria" formatar={(v) => `${fmt(v, 1)} minutos`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Tempo na água" valor={min < 1 ? `${fmt(min * 60)} s` : `${fmt(min, min % 1 ? 1 : 0)} min`} />
        <Leitura rotulo="Fase" valor={fase.nome} cor={fase.cor} />
      </View>
      <View style={[styles.marca, { borderLeftColor: fase.cor }]}>
        <Texto>{fase.conduta}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Regra dos três
const REGRA: { item: string; tempo: string; horas: number; dica: string }[] = [
  { item: 'Ar', tempo: '3 minutos', horas: 0.05, dica: 'Vias aéreas e sangramento vêm antes de tudo: respiração, hemorragia e ferimentos, nessa ordem.' },
  { item: 'Abrigo', tempo: '3 horas', horas: 3, dica: 'Frio, calor, vento e chuva matam rápido: roupa em camadas, sombra e isolamento do chão.' },
  { item: 'Descanso', tempo: '30 horas', horas: 30, dica: 'O cansaço tira o julgamento. Dormir e poupar energia fazem parte do plano.' },
  { item: 'Água', tempo: '3 dias', horas: 72, dica: 'Em condições extremas, cerca de 3 dias. No calor, poupe o suor, não a água.' },
  { item: 'Comida', tempo: '30 dias', horas: 720, dica: 'A comida é a última prioridade: dá para viver cerca de 30 dias sem ela.' },
];

export function RegraDosTres() {
  const [sel, setSel] = useState(0);
  const [larg, setLarg] = useState(300);
  const d = REGRA[sel];
  const linha = 30;
  const H = REGRA.length * linha + 18;
  const x0 = 78, x1 = larg - 64;
  const X = (h: number) => x0 + ((Math.log10(h) - Math.log10(0.03)) / (Math.log10(1000) - Math.log10(0.03))) * (x1 - x0);
  return (
    <MolduraMidia tipo="Gráfico" titulo="A regra dos três" instrucao="Toque numa linha. A escala é logarítmica: cada prioridade dá muito mais tempo que a anterior.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {REGRA.map((r, i) => {
            const y = 6 + i * linha;
            const ativo = i === sel;
            return (
              <G key={r.item} onPress={() => setSel(i)}>
                <Rect x={0} y={y - 2} width={larg} height={linha - 4} fill="transparent" />
                <SvgText x={x0 - 8} y={y + 15} fill={ativo ? Cores.texto : Cores.textoApagado} fontSize={12} fontFamily={Fonte} textAnchor="end">{r.item}</SvgText>
                <Rect x={x0} y={y + 4} width={X(r.horas) - x0} height={14} rx={7} fill={ativo ? AMARELO : AZUL} fillOpacity={ativo ? 0.9 : 0.45} />
                <SvgText x={X(r.horas) + 6} y={y + 15} fill={ativo ? AMARELO : Cores.textoSuave} fontSize={10} fontFamily={Fonte}>{r.tempo}</SvgText>
              </G>
            );
          })}
        </Svg>
      </View>
      <View style={styles.escolhas}>
        {REGRA.map((r, i) => (
          <Pressable key={r.item} accessibilityRole="button" accessibilityState={{ selected: i === sel }} onPress={() => setSel(i)} style={[styles.escolha, i === sel && styles.escolhaAtiva]}>
            <Texto t="rotulo" cor={i === sel ? Cores.fundo : Cores.texto}>{r.item}</Texto>
          </Pressable>
        ))}
      </View>
      <View style={styles.marca}>
        <Texto t="item" cor={AMARELO}>{d.item} · {d.tempo}</Texto>
        <Texto cor={Cores.textoSuave}>{d.dica}</Texto>
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  escolhas: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  escolha: { minHeight: 34, paddingHorizontal: 12, borderRadius: 17, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
  escolhaAtiva: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
