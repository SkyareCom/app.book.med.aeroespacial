// Simuladores e calculadoras curtos, cada um ligado a um capítulo.
// Valores aproximados vêm sempre indicados como tal na própria tela.

import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Imagens } from '@/constants/imagens';
import { Cores, Espaco, Fonte, Raio } from '@/constants/theme';
import { pesParaMetros, pressaoBarometrica } from '@/lib/fisiologia';

const fmt = (n: number, casas = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });

function Alternar<T extends string>({ opcoes, valor, onChange }: { opcoes: [T, string][]; valor: T; onChange: (v: T) => void }) {
  return (
    <View style={styles.alternar}>
      {opcoes.map(([v, r]) => (
        <Pressable key={v} accessibilityRole="button" accessibilityState={{ selected: valor === v }} onPress={() => onChange(v)} style={[styles.opcao, valor === v && styles.ativa]}>
          <Texto t="item" cor={valor === v ? Cores.fundo : Cores.texto} style={{ textAlign: 'center' }}>{r}</Texto>
        </Pressable>
      ))}
    </View>
  );
}

function Cabecalho({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={styles.linha}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
      <Texto t="item" cor={Cores.destaque}>{valor}</Texto>
    </View>
  );
}

// ---------------------------------------------------------------- Lei de Boyle
export function LeisDosGases() {
  const [alt, setAlt] = useState(8000);
  const pb = pressaoBarometrica(alt);
  const umido = (760 - 47) / (pb - 47); // gás saturado de vapor a 37 °C, como nas cavidades do corpo
  const seco = 760 / pb;
  const tam = 150;
  const r0 = 34;
  const r = r0 * Math.sqrt(umido);
  return (
    <MolduraMidia tipo="Simulação" titulo="O gás preso no corpo se expande" instrucao="Lei de Boyle: menos pressão, mais volume. Arraste para subir.">
      <View style={{ alignItems: 'center' }}>
        <Svg width={tam * 2} height={tam}>
          <Circle cx={tam * 0.5} cy={tam / 2} r={r0} stroke={Cores.textoApagado} strokeDasharray="4 4" fill="none" />
          <SvgText x={tam * 0.5} y={tam - 6} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">nível do mar</SvgText>
          <Circle cx={tam * 1.4} cy={tam / 2} r={Math.min(r, tam / 2 - 4)} fill="rgba(111,211,255,0.18)" stroke={Cores.destaque} strokeWidth={2} />
          <SvgText x={tam * 1.4} y={tam / 2 + 4} fill={Cores.texto} fontSize={14} fontFamily={Fonte} textAnchor="middle">{fmt(umido, 1)}×</SvgText>
        </Svg>
      </View>
      <View>
        <Cabecalho rotulo="Altitude" valor={`${fmt(alt)} ft · ${fmt(pesParaMetros(alt))} m`} />
        <Deslizante min={0} max={40000} passo={500} valor={alt} onChange={setAlt} rotulo="Altitude em pés" />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Pressão do ar" valor={`${fmt(pb)} mmHg`} />
        <Leitura rotulo="Gás no ouvido e no intestino" valor={`${fmt(umido, 2)}×`} cor={umido > 2 ? Cores.erro : umido > 1.3 ? Cores.dourado : Cores.texto} />
        <Leitura rotulo="Ar seco, como num pacote" valor={`${fmt(seco, 2)}×`} />
      </View>
      <Texto cor={Cores.textoApagado}>O gás dentro do corpo está saturado de vapor d&apos;água a 37 °C, por isso se expande mais que o ar seco.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Forças G
const LIMIARES = {
  sem: { cinza: 3.5, preto: 4.5, gloc: 5.0 },
  com: { cinza: 7.0, preto: 8.0, gloc: 9.0 },
};

export function SimuladorForcasG() {
  const [g, setG] = useState(1);
  const [prot, setProt] = useState<'sem' | 'com'>('sem');
  const l = LIMIARES[prot];
  const estado = g >= l.gloc ? 'Perda de consciência (G-LOC)' : g >= l.preto ? 'Visão apagada (blackout), ainda consciente' : g >= l.cinza ? 'Visão acinzentada e em túnel' : 'Visão normal';
  const t = Math.max(0, Math.min(1, (g - l.cinza + 1) / (l.gloc - l.cinza + 1)));
  const cor = g >= l.preto ? Cores.erro : g >= l.cinza ? Cores.dourado : Cores.acerto;
  return (
    <MolduraMidia tipo="Simulação" titulo="Puxe G e veja a visão apagar" instrucao="O sangue é empurrado para longe da cabeça. Valores típicos e aproximados; variam muito entre pessoas.">
      <Alternar opcoes={[['sem', 'Sem proteção'], ['com', 'Traje anti-G e manobra']]} valor={prot} onChange={setProt} />
      <View style={styles.tela}>
        <Image source={Imagens.hero} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(110,110,110,${(t * 0.6).toFixed(2)})` }]} />
        <LinearGradient colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.lado, { left: 0, width: `${t * 50}%` }]} />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.lado, { right: 0, width: `${t * 50}%` }]} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(0,0,0,${g >= l.preto ? 0.97 : t * 0.4})` }]} />
      </View>
      <View>
        <Cabecalho rotulo="Aceleração" valor={`${fmt(g, 1)} G`} />
        <Deslizante min={1} max={9} passo={0.5} valor={g} onChange={setG} rotulo="Força G" />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="O que acontece" valor={estado} cor={cor} />
        <Leitura rotulo="Um corpo de 70 kg passa a pesar" valor={`${fmt(70 * g)} kg`} />
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Adaptação ao escuro
export function AdaptacaoEscuro() {
  const [min, setMin] = useState(10);
  const [larg, setLarg] = useState(300);
  const h = 170;
  const x = (m: number) => 34 + (m / 40) * (larg - 44);
  // Curva esquemática do limiar visual: cones estabilizam em ~7–10 min; bastonetes seguem até ~30 min.
  const limiar = (m: number) => {
    const cones = 0.55 + 0.45 * Math.exp(-m / 2.5);
    const bast = 0.05 + 0.95 * Math.exp(-Math.max(0, m - 4) / 7);
    return Math.min(cones, m < 4 ? 1 : bast);
  };
  const y = (v: number) => 12 + (1 - (1 - v)) * (h - 40);
  let d = '';
  for (let m = 0; m <= 40; m += 0.5) d += `${m === 0 ? 'M' : 'L'}${x(m).toFixed(1)},${y(limiar(m)).toFixed(1)}`;
  const fase = min < 8 ? 'Os cones (visão de cores e detalhes) se adaptam primeiro.' : min < 25 ? 'Os bastonetes assumem: a sensibilidade continua subindo.' : 'Adaptação quase completa, após cerca de 30 minutos.';
  return (
    <MolduraMidia tipo="Gráfico" titulo="Quanto tempo os olhos levam para enxergar no escuro" instrucao="Curva esquemática: quanto mais baixo, menos luz é preciso para ver.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={h}>
          {[0, 10, 20, 30, 40].map((m) => (
            <SvgText key={m} x={x(m)} y={h - 8} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte} textAnchor="middle">{m} min</SvgText>
          ))}
          <Line x1={x(0)} y1={h - 24} x2={x(40)} y2={h - 24} stroke={Cores.linha} />
          <Path d={d} stroke={Cores.destaque} strokeWidth={2.5} fill="none" />
          <Line x1={x(min)} y1={8} x2={x(min)} y2={h - 24} stroke={Cores.dourado} strokeDasharray="4 4" />
          <Circle cx={x(min)} cy={y(limiar(min))} r={6} fill={Cores.dourado} />
          <SvgText x={x(3)} y={y(0.62) - 8} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte}>cones</SvgText>
          <SvgText x={x(22)} y={y(0.18) - 8} fill={Cores.textoApagado} fontSize={10} fontFamily={Fonte}>bastonetes</SvgText>
        </Svg>
      </View>
      <View>
        <Cabecalho rotulo="Tempo no escuro" valor={`${fmt(min)} min`} />
        <Deslizante min={0} max={40} passo={1} valor={min} onChange={setMin} rotulo="Minutos no escuro" />
      </View>
      <Texto cor={Cores.textoSuave}>{fase} Uma luz branca forte desfaz a adaptação em segundos; por isso cabines usam iluminação vermelha ou fraca à noite.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Ruído (NR-15)
const FONTES_RUIDO: [number, string][] = [
  [60, 'Conversa normal'],
  [80, 'Cabine de passageiros em cruzeiro, cerca de'],
  [100, 'Cabine de helicóptero, cerca de'],
  [120, 'Pátio perto de jato em operação, acima de'],
];

export function ReguaRuido() {
  const [db, setDb] = useState(90);
  const horas = 8 / Math.pow(2, (db - 85) / 5);
  const tempo = horas >= 1 ? `${fmt(horas, horas % 1 ? 1 : 0)} h` : `${fmt(horas * 60)} min`;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quanto tempo de ruído o ouvido aguenta" instrucao="Limite de exposição diária sem proteção pela NR-15 (Anexo 1): a cada 5 dB a mais, o tempo cai pela metade.">
      <View>
        <Cabecalho rotulo="Nível de ruído" valor={`${fmt(db)} dB(A)`} />
        <Deslizante min={85} max={115} passo={1} valor={db} onChange={setDb} rotulo="Nível de ruído em decibéis" />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Exposição máxima por dia" valor={tempo} cor={horas < 1 ? Cores.erro : horas < 4 ? Cores.dourado : Cores.texto} />
      </View>
      <View style={{ gap: 4 }}>
        {FONTES_RUIDO.map(([v, r]) => (
          <View key={v} style={styles.linha}>
            <Texto cor={Cores.textoSuave}>{r}</Texto>
            <Texto>{v} dB</Texto>
          </View>
        ))}
      </View>
      <Texto cor={Cores.textoApagado}>A NR-15 não permite exposição acima de 115 dB(A) sem proteção adequada.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Radiação cósmica
const ROTAS = { baixa: 2, media: 4, polar: 6 } as const;

export function RadiacaoVoo() {
  const [horas, setHoras] = useState(700);
  const [rota, setRota] = useState<keyof typeof ROTAS>('media');
  const msv = (horas * ROTAS[rota]) / 1000;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quanta radiação um ano de voos soma" instrucao="Taxas aproximadas em cruzeiro; variam com altitude, latitude e ciclo solar.">
      <Alternar opcoes={[['baixa', 'Baixa latitude'], ['media', 'Média latitude'], ['polar', 'Rota polar']]} valor={rota} onChange={setRota} />
      <View>
        <Cabecalho rotulo="Horas de voo por ano" valor={`${fmt(horas)} h`} />
        <Deslizante min={0} max={1000} passo={10} valor={horas} onChange={setHoras} rotulo="Horas de voo por ano" />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Dose estimada no ano" valor={`${fmt(msv, 1)} mSv`} cor={msv > 6 ? Cores.dourado : Cores.texto} />
        <Leitura rotulo="Equivale a radiografias de tórax" valor={`${fmt(msv / 0.02)}`} />
      </View>
      <View style={{ gap: 4 }}>
        <Comparar rotulo="Radiação natural média no mundo, por ano" valor="cerca de 2,4 mSv" />
        <Comparar rotulo="Limite ocupacional (média em 5 anos)" valor="20 mSv por ano" />
        <Comparar rotulo="Limite para o público em geral" valor="1 mSv por ano" />
      </View>
    </MolduraMidia>
  );
}

function Comparar({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={styles.linha}>
      <Texto cor={Cores.textoSuave} style={{ flex: 1 }}>{rotulo}</Texto>
      <Texto>{valor}</Texto>
    </View>
  );
}

// ---------------------------------------------------------------- Regra do 1%
export function RiscoAeromedico() {
  const [pct, setPct] = useState(1);
  const porHora = pct / 100 / 8760;
  const acidente = porHora * 0.1 * 0.01;
  const aceito = acidente <= 1.2e-9;
  const cientifico = (v: number) => {
    const e = Math.floor(Math.log10(v));
    return `${fmt(v / Math.pow(10, e), 1)} × 10^${e}`;
  };
  return (
    <MolduraMidia tipo="Calculadora" titulo="A regra do 1%" instrucao="Risco anual de incapacitação súbita de um piloto, em operação com dois pilotos.">
      <View>
        <Cabecalho rotulo="Risco de incapacitação por ano" valor={`${fmt(pct, 1)}%`} />
        <Deslizante min={0.1} max={5} passo={0.1} valor={pct} onChange={setPct} rotulo="Risco anual em porcentagem" />
      </View>
      <View style={{ gap: 4 }}>
        <Comparar rotulo="Risco por hora de voo" valor={cientifico(porHora)} />
        <Comparar rotulo="× 10% do tempo em fases críticas (decolagem e pouso)" valor="0,1" />
        <Comparar rotulo="× 1% de chance de o outro piloto não conseguir recuperar" valor="0,01" />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Risco de acidente fatal por hora" valor={cientifico(acidente)} cor={aceito ? Cores.acerto : Cores.erro} />
      </View>
      <Texto cor={Cores.textoSuave}>{aceito ? 'Dentro da meta de cerca de 1 em 1 bilhão de horas usada no projeto de sistemas da aeronave.' : 'Acima da meta: pede restrição, como voar só com outro piloto, ou afastamento.'}</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Perda óssea no espaço
export function PerdaOssea() {
  const [meses, setMeses] = useState(6);
  return (
    <MolduraMidia tipo="Calculadora" titulo="O osso que o espaço leva" instrucao="Sem exercício adequado, o quadril perde cerca de 1% a 1,5% da densidade mineral por mês em microgravidade (NASA).">
      <View>
        <Cabecalho rotulo="Tempo em órbita" valor={`${fmt(meses)} ${meses === 1 ? 'mês' : 'meses'}`} />
        <Deslizante min={1} max={12} passo={1} valor={meses} onChange={setMeses} rotulo="Meses em órbita" />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Perda estimada no quadril" valor={`${fmt(meses * 1, 0)}% a ${fmt(meses * 1.5, 1)}%`} cor={meses >= 6 ? Cores.dourado : Cores.texto} />
      </View>
      <Texto cor={Cores.textoSuave}>Em um mês no espaço, perde-se o que uma pessoa idosa perde em cerca de um ano na Terra. Exercício resistido diário reduz essa perda.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Espaco.md },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  alternar: { flexDirection: 'row', gap: Espaco.sm, flexWrap: 'wrap' },
  opcao: { flexGrow: 1, flexBasis: '30%', minHeight: 40, alignItems: 'center', justifyContent: 'center', borderRadius: Raio - 6, borderWidth: 1, borderColor: Cores.linha, paddingHorizontal: 6 },
  ativa: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  tela: { height: 170, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000' },
  lado: { position: 'absolute', top: 0, bottom: 0 },
});
