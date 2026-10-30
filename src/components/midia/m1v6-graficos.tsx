import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Rect, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Gráficos e calculadoras do M1V6 · Ruído e vibração.
// Níveis de ruído: FAA CAMI, Hearing and Noise in Aviation (AM-400-98/3), tabela de níveis em dB.
// Faixas de audição: mesma fonte (20–20.000 Hz; maior sensibilidade 500–4.000; conversa 500–3.000; perda
// por ruído perto de 4.000 Hz; idade 1.000–6.000 Hz a partir dos 30 anos). Frequências mais atingidas em pilotos
// civis (ouvido esquerdo): Falcão TP et al., Rev Saúde Pública 2014;48(5):790-6.
// Limites de ruído: NR-15, Anexo 1 (quadro de limites; nível intermediário usa o imediatamente superior);
// NIOSH 98-126 (85 dBA em 8 h, regra dos 3 dB, teto de 140 dBA).
// Vibração: A(8) = a × √(T ÷ 8 h) (Diretiva 2002/44/CE, anexo, parte B; ISO 2631-1); NR-9, Anexo 1 (nível de ação
// 0,5 m/s², limite 1,1 m/s²); Diretiva 2002/44/CE, art. 3 (0,5 e 1,15 m/s²); helicópteros: Kåsin JI, Mansfield N,
// Wagstaff A. Aviat Space Environ Med 2011;82:790-6 (A(8) de 0,32 a 0,51 m/s²).
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

// ---------------------------------------------------------------- Régua de decibéis
interface FonteSom { id: string; nome: string; min: number; max: number; aviacao?: boolean }
const FONTES: FonteSom[] = [
  { id: 'sussurro', nome: 'Sussurro', min: 20, max: 30 },
  { id: 'escritorio', nome: 'Casa ou escritório', min: 40, max: 60 },
  { id: 'conversa', nome: 'Conversa', min: 60, max: 65 },
  { id: 'jato', nome: 'Cabine de jato de transporte', min: 60, max: 88, aviacao: true },
  { id: 'monomotor', nome: 'Cabine de monomotor pequeno', min: 70, max: 90, aviacao: true },
  { id: 'rua', nome: 'Rua movimentada', min: 80, max: 100 },
  { id: 'helicoptero', nome: 'Cabine de helicóptero', min: 80, max: 102, aviacao: true },
  { id: 'motosserra', nome: 'Motosserra', min: 100, max: 110 },
  { id: 'show', nome: 'Show de rock', min: 115, max: 120 },
  { id: 'motor', nome: 'Motor a jato, de perto', min: 130, max: 160, aviacao: true },
];

function efeito(f: FonteSom) {
  if (f.max >= 140) return 'Passa do nível em que o tímpano pode se romper (140 dB). Só com proteção dupla.';
  if (f.max >= 115) return 'Acima de 115 dB(A), a NR-15 não permite ficar sem proteção adequada.';
  if (f.max > 85) return 'O topo da faixa passa de 85 dB(A): o tempo seguro por dia fica limitado.';
  return 'Abaixo de 85 dB(A): fora da faixa de risco para o ouvido.';
}

export function ReguaDecibeis() {
  const [sel, setSel] = useState('helicoptero');
  const [larg, setLarg] = useState(300);
  const f = FONTES.find((x) => x.id === sel) ?? FONTES[0];
  const linha = 26;
  const yT = 6;
  const H = yT + FONTES.length * linha + 30;
  const x0 = 8, x1 = larg - 8;
  const X = (db: number) => x0 + (db / 160) * (x1 - x0);
  const yEixo = yT + FONTES.length * linha + 4;
  return (
    <MolduraMidia tipo="Gráfico" titulo="Do sussurro ao motor a jato" instrucao="Faixas de ruído pela FAA. Em azul, a aviação. Toque numa faixa.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {FONTES.map((_, i) => [85, 140].map((db) => (
            <Line key={`${i}-${db}`} x1={X(db)} y1={yT + i * linha + 12} x2={X(db)} y2={yT + i * linha + 23} stroke={db === 85 ? Cores.dourado : Cores.erro} strokeDasharray="3 3" strokeOpacity={0.8} />
          )))}
          {FONTES.map((s, i) => {
            const y = yT + i * linha;
            const ativo = s.id === sel;
            const cor = ativo ? Cores.dourado : s.aviacao ? Cores.destaque : Cores.textoApagado;
            const direita = X(s.min) > larg * 0.55;
            return (
              <G key={s.id} onPress={() => setSel(s.id)}>
                <Rect x={0} y={y} width={larg} height={linha} fill="#FFFFFF" fillOpacity={0.001} />
                <SvgText x={direita ? X(s.max) : X(s.min)} y={y + 10} fill={ativo ? Cores.dourado : s.aviacao ? Cores.texto : Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor={direita ? 'end' : 'start'}>{s.nome}</SvgText>
                <Rect x={X(s.min)} y={y + 14} width={Math.max(X(s.max) - X(s.min), 4)} height={7} rx={3.5} fill={cor} fillOpacity={ativo ? 1 : 0.75} />
              </G>
            );
          })}
          {[0, 40, 80, 120, 160].map((db) => (
            <SvgText key={db} x={X(db)} y={yEixo + 12} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={db === 0 ? 'start' : db === 160 ? 'end' : 'middle'}>{db}</SvgText>
          ))}
          <SvgText x={X(85) + 3} y={yEixo + 24} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>85: LIMITE DE 8 H</SvgText>
          <SvgText x={x0} y={yEixo + 24} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>dB</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Fonte" valor={f.nome} cor={Cores.dourado} />
        <Leitura rotulo="Faixa" valor={`${f.min} a ${f.max} dB`} />
      </View>
      <View style={[styles.marca, { borderLeftColor: f.max > 85 ? Cores.erro : Cores.acerto }]}>
        <Texto>{efeito(f)}</Texto>
      </View>
      <Texto cor={Cores.textoApagado}>Tracejado vermelho: 140 dB, ruptura do tímpano por ruído de impacto.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Faixas de audição
interface Faixa { id: string; nome: string; de: number; ate: number; cor: string; texto: string }
const FAIXAS: Faixa[] = [
  { id: 'audicao', nome: 'Audição humana', de: 20, ate: 20000, cor: '#5C7A99', texto: 'O ouvido capta de cerca de 20 a 20.000 vibrações por segundo.' },
  { id: 'sensivel', nome: 'Maior sensibilidade', de: 500, ate: 4000, cor: Cores.destaque, texto: 'Entre 500 e 4.000 Hz, o ouvido percebe sons mais fracos.' },
  { id: 'conversa', nome: 'Conversa', de: 500, ate: 3000, cor: Cores.acerto, texto: 'A fala fica entre 500 e 3.000 Hz. A perda por ruído começa logo acima, por isso passa despercebida.' },
  { id: 'idade', nome: 'Perda com a idade', de: 1000, ate: 6000, cor: Cores.dourado, texto: 'A partir de cerca dos 30 anos, a audição cai entre 1.000 e 6.000 Hz e se soma à perda por ruído.' },
];
// Pilotos civis com suspeita de perda por ruído, por frequência (ouvido esquerdo, %): Falcão et al. 2014.
const PICOS: [number, number][] = [[3000, 10.5], [4000, 20.6], [6000, 16.9]];

export function FaixasAudicao() {
  const [sel, setSel] = useState('conversa');
  const [larg, setLarg] = useState(300);
  const linha = 30;
  const yT = 6;
  const yRuido = yT + FAIXAS.length * linha;
  const H = yRuido + 56;
  const x0 = 10, x1 = larg - 10;
  const lmin = Math.log10(20), lmax = Math.log10(20000);
  const X = (hz: number) => x0 + ((Math.log10(hz) - lmin) / (lmax - lmin)) * (x1 - x0);
  const ativa = FAIXAS.find((f) => f.id === sel);
  const ruido = sel === 'ruido';
  return (
    <MolduraMidia tipo="Gráfico" titulo="Onde a perda começa" instrucao="Frequências em escala logarítmica. Toque numa faixa ou nos pontos da perda por ruído.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
                    {FAIXAS.map((f, i) => {
            const y = yT + i * linha;
            const on = f.id === sel;
            const direita = X(f.de) > larg * 0.5;
            return (
              <G key={f.id} onPress={() => setSel(f.id)}>
                <Rect x={0} y={y} width={larg} height={linha} fill="#FFFFFF" fillOpacity={0.001} />
                <SvgText x={direita ? X(f.ate) : X(f.de)} y={y + 11} fill={on ? Cores.dourado : Cores.textoSuave} fontSize={10} fontFamily={Fonte} textAnchor={direita ? 'end' : 'start'}>{f.nome}</SvgText>
                <Rect x={X(f.de)} y={y + 15} width={X(f.ate) - X(f.de)} height={8} rx={4} fill={on ? Cores.dourado : f.cor} fillOpacity={on ? 1 : 0.8} />
              </G>
            );
          })}
          <G onPress={() => setSel('ruido')}>
            <Rect x={0} y={yRuido} width={larg} height={28} fill="#FFFFFF" fillOpacity={0.001} />
            <Rect x={X(3000) - 6} y={yRuido + 6} width={X(6000) - X(3000) + 12} height={14} rx={7} fill={Cores.erro} fillOpacity={0.15} />
            <SvgText x={X(3000) - 6} y={yRuido + 17} fill={ruido ? Cores.dourado : Cores.erro} fontSize={10} fontFamily={Fonte} textAnchor="end">Perda por ruído</SvgText>
            {PICOS.map(([hz, p]) => (
              <Circle key={hz} cx={X(hz)} cy={yRuido + 13} r={4.5} fill={ruido ? Cores.dourado : Cores.erro} fillOpacity={0.4 + p / 35} stroke={Cores.fundo} strokeWidth={1} />
            ))}
          </G>
          {[[20, '20'], [100, '100'], [500, '500'], [1000, '1k'], [4000, '4k'], [20000, '20k']].map(([hz, r]) => (
            <SvgText key={r as string} x={X(hz as number)} y={yRuido + 38} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={hz === 20 ? 'start' : hz === 20000 ? 'end' : 'middle'}>{r as string}</SvgText>
          ))}
          <SvgText x={(x0 + x1) / 2} y={H - 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">FREQUÊNCIA (Hz)</SvgText>
        </Svg>
      </View>
      <View style={[styles.marca, { borderLeftColor: ruido ? Cores.erro : Cores.dourado }]}>
        <Texto>
          {ruido
            ? 'Em 3.130 pilotos civis brasileiros, a frequência mais atingida foi 4.000 Hz (20,6% no ouvido esquerdo), seguida de 6.000 Hz (16,9%) e 3.000 Hz (10,5%).'
            : ativa?.texto}
        </Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Calculadora de ruído (NR-15 × regra dos 3 dB)
// NR-15, Anexo 1: nível em dB(A) → máxima exposição diária, em minutos.
const NR15: [number, number][] = [
  [85, 480], [86, 420], [87, 360], [88, 300], [89, 270], [90, 240], [91, 210], [92, 180], [93, 160], [94, 135],
  [95, 120], [96, 105], [98, 75], [100, 60], [102, 45], [104, 35], [105, 30], [106, 25], [108, 20], [110, 15],
  [112, 10], [114, 8], [115, 7],
];
const limiteNR15 = (db: number) => (NR15.find(([n]) => n >= db) ?? NR15[NR15.length - 1])[1];
const limite3dB = (db: number) => 480 / Math.pow(2, (db - 85) / 3);
const duracao = (min: number) => {
  if (min >= 60) {
    const h = Math.floor(min / 60), m = Math.round(min - h * 60);
    return m ? `${h} h ${m} min` : `${h} h`;
  }
  return min >= 10 ? `${Math.round(min)} min` : `${fmt(min, 1)} min`;
};

export function CalculadoraRuido() {
  const [db, setDb] = useState(90);
  const [horas, setHoras] = useState(4);
  const [larg, setLarg] = useState(300);
  const tNR = limiteNR15(db);
  const t3 = limite3dB(db);
  const doseNR = (horas * 60) / tNR;
  const dose3 = (horas * 60) / t3;
  const H = 70;
  const x0 = 8, x1 = larg - 8;
  const X = (d: number) => x0 + (Math.min(d, 3) / 3) * (x1 - x0);
  const cor = (d: number) => (d > 1 ? Cores.erro : d > 0.5 ? Cores.dourado : Cores.acerto);
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quanto tempo de ruído o ouvido aguenta" instrucao="Escolha o nível de ruído e as horas expostas no dia, sem proteção. Compare a NR-15 com a regra dos 3 dB do NIOSH.">
      <Deslizante min={85} max={115} passo={1} valor={db} onChange={setDb} rotulo="Nível de ruído em decibéis A" formatar={(v) => `${fmt(v)} dB(A)`} />
      <Deslizante min={0.5} max={12} passo={0.5} valor={horas} onChange={setHoras} rotulo="Horas expostas no dia" formatar={(v) => `${fmt(v, v % 1 ? 1 : 0)} horas`} />
      <View style={styles.leituras}>
        <Leitura rotulo="NR-15 permite" valor={duracao(tNR)} />
        <Leitura rotulo="Regra dos 3 dB" valor={duracao(t3)} cor={Cores.destaque} />
      </View>
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <SvgText x={x0} y={10} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>DOSE DO DIA · NR-15</SvgText>
          <Rect x={x0} y={14} width={x1 - x0} height={10} rx={5} fill={Cores.trilha} />
          <Rect x={x0} y={14} width={Math.max(X(doseNR) - x0, 2)} height={10} rx={5} fill={cor(doseNR)} />
          <SvgText x={x0} y={40} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>DOSE DO DIA · REGRA DOS 3 dB</SvgText>
          <Rect x={x0} y={44} width={x1 - x0} height={10} rx={5} fill={Cores.trilha} />
          <Rect x={x0} y={44} width={Math.max(X(dose3) - x0, 2)} height={10} rx={5} fill={cor(dose3)} />
          <Line x1={X(1)} y1={12} x2={X(1)} y2={26} stroke={Cores.texto} strokeDasharray="3 3" />
          <Line x1={X(1)} y1={42} x2={X(1)} y2={56} stroke={Cores.texto} strokeDasharray="3 3" />
          <SvgText x={X(1)} y={H - 2} fill={Cores.texto} fontSize={9} fontFamily={Fonte} textAnchor="middle">100%</SvgText>
          <SvgText x={x1} y={H - 2} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">300%</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Dose NR-15" valor={`${fmt(doseNR * 100)}%`} cor={cor(doseNR)} />
        <Leitura rotulo="Dose 3 dB" valor={`${fmt(dose3 * 100)}%`} cor={cor(dose3)} />
      </View>
      <View style={[styles.marca, { borderLeftColor: doseNR > 1 ? Cores.erro : cor(dose3) }]}>
        <Texto>
          {db >= 115
            ? 'A 115 dB(A), a NR-15 permite só 7 minutos; acima disso, ninguém pode ficar sem proteção adequada.'
            : doseNR > 1
              ? 'Acima de 100%: passa do limite da NR-15. É preciso proteção auditiva ou menos tempo exposto.'
              : dose3 > 1
                ? 'Dentro da NR-15, mas acima do critério mais rigoroso dos 3 dB, usado pelo NIOSH e pela NHO 01.'
                : 'Dentro dos dois critérios.'}
        </Texto>
      </View>
      <Texto cor={Cores.textoApagado}>Na NR-15, um nível intermediário usa o tempo do nível imediatamente superior.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Dose diária de vibração A(8)
export function VibracaoA8() {
  const [a, setA] = useState(0.5);
  const [horas, setHoras] = useState(6);
  const [larg, setLarg] = useState(300);
  const a8 = a * Math.sqrt(horas / 8);
  const H = 84;
  const x0 = 8, x1 = larg - 8;
  const X = (v: number) => x0 + (Math.min(v, 1.5) / 1.5) * (x1 - x0);
  const cor = a8 > 1.1 ? Cores.erro : a8 >= 0.5 ? Cores.dourado : Cores.acerto;
  const yB = 26;
  return (
    <MolduraMidia tipo="Calculadora" titulo="A dose de vibração de um dia" instrucao="Escolha a vibração medida no assento e as horas de voo no dia. A conta converte para uma jornada de 8 horas, a A(8).">
      <Deslizante min={0.1} max={1.2} passo={0.05} valor={a} onChange={setA} rotulo="Vibração no assento em metros por segundo ao quadrado" formatar={(v) => `${fmt(v, 2)} m/s²`} />
      <Deslizante min={0.5} max={12} passo={0.5} valor={horas} onChange={setHoras} rotulo="Horas de voo no dia" formatar={(v) => `${fmt(v, v % 1 ? 1 : 0)} horas`} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <SvgText x={(X(0.32) + X(0.51)) / 2} y={yB - 6} fill={Cores.destaque} fontSize={9} fontFamily={Fonte} textAnchor="middle">HELICÓPTEROS ESTUDADOS</SvgText>
          <Rect x={x0} y={yB} width={x1 - x0} height={12} rx={6} fill={Cores.trilha} />
          <Rect x={X(0.32)} y={yB} width={X(0.51) - X(0.32)} height={12} fill={Cores.destaque} fillOpacity={0.3} />
          <Rect x={x0} y={yB + 3} width={Math.max(X(a8) - x0, 2)} height={6} rx={3} fill={cor} />
          <Line x1={X(0.5)} y1={yB - 2} x2={X(0.5)} y2={yB + 16} stroke={Cores.dourado} strokeWidth={1.5} />
          <Line x1={X(1.1)} y1={yB - 2} x2={X(1.1)} y2={yB + 16} stroke={Cores.erro} strokeWidth={1.5} />
          {[0, 0.5, 1, 1.5].map((v) => (
            <SvgText key={v} x={X(v)} y={yB + 28} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={v === 0 ? 'start' : v === 1.5 ? 'end' : 'middle'}>{fmt(v, 1)}</SvgText>
          ))}
          <SvgText x={X(0.5)} y={yB + 44} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="middle">AÇÃO 0,5</SvgText>
          <SvgText x={X(1.1)} y={yB + 44} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="middle">LIMITE 1,1</SvgText>
          <SvgText x={x0} y={yB + 56} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>A(8) EM m/s²</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Dose do dia, A(8)" valor={`${fmt(a8, 2)} m/s²`} cor={cor} />
      </View>
      <View style={[styles.marca, { borderLeftColor: cor }]}>
        <Texto>
          {a8 > 1.1
            ? 'Acima de 1,1 m/s²: passa do limite brasileiro (NR-9) e caracteriza insalubridade pela NR-15. Na União Europeia, o limite é 1,15.'
            : a8 >= 0.5
              ? 'A partir de 0,5 m/s²: nível de ação. A empresa precisa adotar medidas para reduzir a exposição.'
              : 'Abaixo do nível de ação de 0,5 m/s².'}
        </Texto>
      </View>
      <Texto cor={Cores.textoApagado}>A norma também avalia o valor da dose de vibração (VDV), que pesa os solavancos.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
