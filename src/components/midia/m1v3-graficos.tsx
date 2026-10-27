import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Gráficos e simuladores do M1V3 · Descompressão.
// Tipos de descompressão e intervalos após mergulho: FAA AC 61-107B, seções 2-11.a(3) e 2-7.d(4)(d)/(7).
// Câmara: altitude equivalente pela atmosfera padrão ICAO; profundidade em água do mar ≈ 10 m por atmosfera;
// Tabela 6 da Marinha dos EUA a 2,8 ATA (18 m) com oxigênio a 100% (DAN Europe, Alert Diver).
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

function Escolhas<T extends string>({ opcoes, valor, onChange }: { opcoes: [T, string][]; valor: T; onChange: (v: T) => void }) {
  return (
    <View style={styles.escolhas}>
      {opcoes.map(([id, nome]) => (
        <Pressable key={id} accessibilityRole="radio" accessibilityState={{ checked: valor === id }} onPress={() => onChange(id)} style={[styles.escolha, valor === id && styles.escolhaAtiva]}>
          <Texto t="rotulo" cor={valor === id ? Cores.fundo : Cores.texto}>{nome}</Texto>
        </Pressable>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------- Tipos de descompressão
type Tipo = 'explosiva' | 'rapida' | 'lenta';

const TIPOS: Record<Tipo, { nome: string; tempo: string; pulmao: string; perigo: string; cabine: (t: number) => number; pulmoes: (t: number) => number }> = {
  explosiva: {
    nome: 'Explosiva',
    tempo: 'Menos de 0,5 segundo',
    pulmao: 'A cabine perde pressão mais rápido do que os pulmões conseguem esvaziar.',
    perigo: 'O ar preso nos pulmões fica com pressão maior que a da cabine: maior risco de lesão pulmonar.',
    cabine: (t) => Math.min(1, t / 0.04),
    pulmoes: (t) => 1 - Math.exp(-t / 0.12),
  },
  rapida: {
    nome: 'Rápida',
    tempo: 'Segundos',
    pulmao: 'Os pulmões esvaziam mais rápido do que a cabine perde pressão.',
    perigo: 'Menor risco para os pulmões; a hipóxia chega quase de imediato.',
    cabine: (t) => 1 - Math.exp(-t / 0.18),
    pulmoes: (t) => 1 - Math.exp(-t / 0.16),
  },
  lenta: {
    nome: 'Lenta',
    tempo: 'Minutos',
    pulmao: 'A pressão cai aos poucos; os pulmões acompanham sem esforço.',
    perigo: 'Pode passar despercebida: a hipóxia se instala sem alarde.',
    cabine: (t) => t * 0.95,
    pulmoes: (t) => t * 0.95,
  },
};

export function GraficoTiposDescompressao() {
  const [tipo, setTipo] = useState<Tipo>('explosiva');
  const [larg, setLarg] = useState(300);
  const d = TIPOS[tipo];
  const H = 180;
  const x0 = 34, x1 = larg - 10, yT = 16, yB = H - 28;
  const X = (t: number) => x0 + t * (x1 - x0);
  const Y = (f: number) => yB - f * (yB - yT);
  const curva = (fn: (t: number) => number) => {
    let s = '';
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      s += `${i ? 'L' : 'M'}${X(t)} ${Y(Math.min(1, fn(t)))}`;
    }
    return s;
  };
  return (
    <MolduraMidia tipo="Gráfico" titulo="Três velocidades, três perigos" instrucao="Escolha o tipo. Esquema ilustrativo: a linha azul é a altitude da cabine; a dourada, a dos pulmões.">
      <Escolhas<Tipo> opcoes={[['explosiva', 'Explosiva'], ['rapida', 'Rápida'], ['lenta', 'Lenta']]} valor={tipo} onChange={setTipo} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Line x1={x0} y1={Y(1)} x2={x1} y2={Y(1)} stroke={Cores.erro} strokeDasharray="4 4" />
          <SvgText x={x1} y={Y(1) - 5} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="end">ALTITUDE DE VOO</SvgText>
          <Line x1={x0} y1={Y(0)} x2={x1} y2={Y(0)} stroke={Cores.linha} />
          <SvgText x={x0} y={Y(0) - 5} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>CABINE PRESSURIZADA</SvgText>
          <Path d={curva(d.pulmoes)} stroke={Cores.dourado} strokeWidth={2.4} fill="none" strokeDasharray={tipo === 'lenta' ? '6 4' : undefined} />
          <Path d={curva(d.cabine)} stroke={Cores.destaque} strokeWidth={2.4} fill="none" />
          {tipo === 'explosiva' ? (
            <G>
              <Rect x={X(0.04)} y={Y(1)} width={X(0.3) - X(0.04)} height={Y(0.25) - Y(1)} fill={Cores.erro} fillOpacity={0.12} />
              <SvgText x={X(0.18)} y={Y(0.55)} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="middle">PULMÃO</SvgText>
              <SvgText x={X(0.18)} y={Y(0.55) + 11} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="middle">ATRASADO</SvgText>
            </G>
          ) : null}
          <SvgText x={x1} y={H - 8} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">TEMPO →</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Duração" valor={d.tempo} cor={Cores.dourado} />
      </View>
      <View style={styles.marca}>
        <Texto>{d.pulmao}</Texto>
        <Texto cor={Cores.textoSuave}>{d.perigo}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Mergulho e voo
type Mergulho = 'sem-parada' | 'com-parada';
type Destino = 'ate8' | 'acima8';

export function CalculadoraMergulhoVoo() {
  const [mergulho, setMergulho] = useState<Mergulho>('sem-parada');
  const [destino, setDestino] = useState<Destino>('ate8');
  const [hora, setHora] = useState(16);
  const espera = mergulho === 'sem-parada' && destino === 'ate8' ? 12 : 24;
  const libera = hora + espera;
  const dia = libera >= 48 ? 'depois de amanhã' : libera >= 24 ? 'amanhã' : 'hoje';
  const [larg, setLarg] = useState(300);
  const H = 70;
  const x0 = 8, x1 = larg - 8;
  const X = (h: number) => x0 + (h / 48) * (x1 - x0);
  return (
    <MolduraMidia tipo="Simulação" titulo="Quando posso voar depois de mergulhar?" instrucao="Escolha o mergulho, o destino e a hora em que você saiu da água. Mínimos da FAA: esperar mais é mais seguro.">
      <Texto t="rotulo" cor={Cores.textoApagado}>Mergulho</Texto>
      <Escolhas<Mergulho> opcoes={[['sem-parada', 'Sem parada de descompressão'], ['com-parada', 'Com parada de descompressão']]} valor={mergulho} onChange={setMergulho} />
      <Texto t="rotulo" cor={Cores.textoApagado}>Altitude do voo</Texto>
      <Escolhas<Destino> opcoes={[['ate8', 'Até 8.000 ft (cabine de linha aérea)'], ['acima8', 'Acima de 8.000 ft']]} valor={destino} onChange={setDestino} />
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Saída da água</Texto>
          <Texto t="item">{String(hora).padStart(2, '0')}h00</Texto>
        </View>
        <Deslizante min={0} max={23} passo={1} valor={hora} onChange={setHora} rotulo="Hora de saída da água" formatar={(v) => `${v} horas`} />
      </View>
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Defs>
            <LinearGradient id="espera" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={Cores.erro} stopOpacity={0.55} />
              <Stop offset="1" stopColor={Cores.dourado} stopOpacity={0.55} />
            </LinearGradient>
          </Defs>
          <Rect x={x0} y={22} width={x1 - x0} height={14} rx={7} fill={Cores.trilha} />
          <Rect x={X(hora)} y={22} width={X(Math.min(libera, 48)) - X(hora)} height={14} rx={7} fill="url(#espera)" />
          <Circle cx={X(Math.min(libera, 48))} cy={29} r={8} fill={Cores.acerto} />
          {[0, 12, 24, 36, 48].map((h) => (
            <SvgText key={h} x={X(h)} y={56} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={h === 0 ? 'start' : h === 48 ? 'end' : 'middle'}>
              {h === 0 ? 'HOJE 0H' : h === 24 ? 'AMANHÃ 0H' : h === 48 ? 'DEPOIS 0H' : `${h % 24}H`}
            </SvgText>
          ))}
          <SvgText x={X(hora)} y={14} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor={hora < 4 ? 'start' : 'middle'}>MERGULHO</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Espera mínima" valor={`${espera} horas`} cor={Cores.dourado} />
        <Leitura rotulo="Pode voar a partir de" valor={`${String(libera % 24).padStart(2, '0')}h, ${dia}`} cor={Cores.acerto} />
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Câmaras de pressão
const altitudeDaPressao = (mmHg: number) => (1 - Math.pow(mmHg / 760, 1 / 5.2559)) / 6.8756e-6;

const MARCOS: { ata: number; rotulo: string }[] = [
  { ata: 760 * Math.pow(1 - 6.8756e-6 * 25000, 5.2559) / 760, rotulo: 'Demonstração de hipóxia · 25.000 ft' },
  { ata: 760 * Math.pow(1 - 6.8756e-6 * 18000, 5.2559) / 760, rotulo: 'Fim da descompressão rápida de treino · 18.000 ft' },
  { ata: 1, rotulo: 'Nível do mar · 1 atmosfera' },
  { ata: 2.8, rotulo: 'Tratamento da doença descompressiva · 2,8 ATA' },
];

export function SimuladorCamara() {
  const [ata, setAta] = useState(1);
  const [larg, setLarg] = useState(300);
  const hipo = ata < 1;
  const alt = hipo ? altitudeDaPressao(ata * 760) : 0;
  const prof = hipo ? 0 : (ata - 1) * 10;
  const volume = 1 / ata;
  const H = 150;
  const x0 = 10, x1 = larg - 10;
  const X = (a: number) => x0 + ((a - 0.3) / (3 - 0.3)) * (x1 - x0);
  const rBase = 18;
  const r = rBase * Math.cbrt(volume);
  const marco = MARCOS.reduce((m, k) => (Math.abs(k.ata - ata) < Math.abs(m.ata - ata) ? k : m));
  return (
    <MolduraMidia tipo="Simulação" titulo="Uma câmara sobe, a outra mergulha" instrucao="Arraste a pressão da câmara. À esquerda, a hipobárica simula altitude; à direita, a hiperbárica simula profundidade. A bolha segue a lei de Boyle.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Rect x={x0} y={70} width={X(1) - x0} height={12} rx={6} fill={Cores.destaque} fillOpacity={0.35} />
          <Rect x={X(1)} y={70} width={x1 - X(1)} height={12} rx={6} fill={Cores.dourado} fillOpacity={0.35} />
          <SvgText x={x0} y={100} fill={Cores.destaque} fontSize={9} fontFamily={Fonte}>HIPOBÁRICA</SvgText>
          <SvgText x={x1} y={100} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="end">HIPERBÁRICA</SvgText>
          {MARCOS.map((m) => (
            <Line key={m.rotulo} x1={X(m.ata)} y1={64} x2={X(m.ata)} y2={88} stroke={Cores.textoSuave} strokeWidth={1.5} />
          ))}
          {[0.5, 1, 2, 3].map((a) => (
            <SvgText key={a} x={X(a)} y={116} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{fmt(a, a % 1 ? 1 : 0)} ATA</SvgText>
          ))}
          <Circle cx={X(ata)} cy={76} r={7} fill={Cores.texto} />
          <Circle cx={larg / 2} cy={32} r={rBase} stroke={Cores.textoApagado} strokeDasharray="3 3" fill="none" />
          <Circle cx={larg / 2} cy={32} r={r} fill={hipo ? Cores.destaque : Cores.dourado} fillOpacity={0.55} stroke={hipo ? Cores.destaque : Cores.dourado} />
          <SvgText x={larg / 2 + rBase + 8} y={36} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>BOLHA (TRACEJADO: 1 ATM)</SvgText>
        </Svg>
      </View>
      <Deslizante min={0.3} max={3} passo={0.05} valor={ata} onChange={(v) => setAta(Math.round(v * 100) / 100)} rotulo="Pressão da câmara em atmosferas" formatar={(v) => `${fmt(v, 2)} atmosferas`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Pressão" valor={`${fmt(ata, 2)} ATA · ${fmt(ata * 760)} mmHg`} />
        <Leitura rotulo={hipo ? 'Equivale à altitude' : 'Equivale à profundidade'} valor={hipo ? `${fmt(Math.round(alt / 100) * 100)} ft` : `${fmt(prof, 0)} m de mar`} cor={hipo ? Cores.destaque : Cores.dourado} />
        <Leitura rotulo="Volume da bolha" valor={`${fmt(volume, 2)}×`} cor={Cores.texto} />
      </View>
      {Math.abs(marco.ata - ata) < 0.06 ? (
        <View style={styles.marca}>
          <Texto>{marco.rotulo}</Texto>
        </View>
      ) : null}
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  escolhas: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  escolha: { minHeight: 34, paddingHorizontal: 12, borderRadius: 17, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
  escolhaAtiva: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
