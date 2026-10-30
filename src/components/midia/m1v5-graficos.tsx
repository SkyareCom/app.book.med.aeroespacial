import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Gráficos e calculadoras do M1V5 · Radiação cósmica.
// Voos: FAA AC 120-61B (2014), Tabela 2 — dose efetiva (ICRP 103) calculada com o CARI-7 para 27 voos sem escala,
// atividade solar média de referência da ICRU (jan. 2000) e Sol calmo. Taxa = dose ÷ tempo no ar (média do voo
// inteiro, com subida e descida; o nível de voo é o máximo do voo).
// Riscos: FAA CAMI, What Aircrews Should Know About Their Occupational Exposure to Ionizing Radiation (ed. 2026),
// pp. 9, 11 e 12: câncer induzido 12 e câncer fatal 4 em 100.000 por mSv (adulto em idade de trabalho);
// gestação: 1 mSv até o fim da gravidez e no máximo 0,5 mSv por mês.
// Limites: ICRP (20 mSv/ano em média de 5 anos, máx. 50); ICRP 132 (nível de referência de 5 a 10 mSv/ano);
// Diretiva 2013/59/Euratom, art. 35(3) (1 mSv: avaliar, escalar, informar; 6 mSv: regras do capítulo).
// CNEN NN 3.01 (Res. 323/24), arts. 146 a 148: nível de referência de 5 mSv/ano para tripulantes (SNA; ABRAPAC).
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

export interface VooRadiacao {
  id: string;
  rota: string;
  fl: number; // nível de voo máximo (centenas de pés)
  horas: number; // tempo no ar
  usv: number; // dose efetiva E103, µSv
}

export const VOOS_FAA: VooRadiacao[] = [
  { id: 'hou-aus', rota: 'Houston–Austin', fl: 200, horas: 0.5, usv: 0.19 },
  { id: 'mia-tpa', rota: 'Miami–Tampa', fl: 240, horas: 0.6, usv: 0.41 },
  { id: 'stl-tul', rota: 'St. Louis–Tulsa', fl: 350, horas: 0.9, usv: 1.41 },
  { id: 'tpa-stl', rota: 'Tampa–St. Louis', fl: 310, horas: 2.0, usv: 4.06 },
  { id: 'msy-sat', rota: 'Nova Orleans–San Antonio', fl: 390, horas: 1.2, usv: 2.71 },
  { id: 'lax-hnl', rota: 'Los Angeles–Honolulu', fl: 350, horas: 5.2, usv: 12.2 },
  { id: 'nyc-sju', rota: 'Nova York–San Juan', fl: 370, horas: 3.0, usv: 8.12 },
  { id: 'hnl-lax', rota: 'Honolulu–Los Angeles', fl: 400, horas: 5.1, usv: 13.5 },
  { id: 'lax-tyo', rota: 'Los Angeles–Tóquio', fl: 400, horas: 11.7, usv: 35.1 },
  { id: 'tyo-lax', rota: 'Tóquio–Los Angeles', fl: 370, horas: 8.8, usv: 26.9 },
  { id: 'was-lax', rota: 'Washington–Los Angeles', fl: 350, horas: 4.7, usv: 15.1 },
  { id: 'nyc-chi', rota: 'Nova York–Chicago', fl: 390, horas: 1.8, usv: 6.6 },
  { id: 'lis-nyc', rota: 'Lisboa–Nova York', fl: 390, horas: 6.5, usv: 22.4 },
  { id: 'lon-dfw', rota: 'Londres–Dallas', fl: 390, horas: 9.7, usv: 33.2 },
  { id: 'sea-was', rota: 'Seattle–Washington', fl: 370, horas: 4.1, usv: 16.4 },
  { id: 'dfw-lon', rota: 'Dallas–Londres', fl: 370, horas: 8.5, usv: 29.7 },
  { id: 'chi-sfo', rota: 'Chicago–São Francisco', fl: 390, horas: 3.8, usv: 14.7 },
  { id: 'sea-anc', rota: 'Seattle–Anchorage', fl: 350, horas: 3.4, usv: 12.4 },
  { id: 'sfo-chi', rota: 'São Francisco–Chicago', fl: 410, horas: 3.8, usv: 15.6 },
  { id: 'nyc-sea', rota: 'Nova York–Seattle', fl: 390, horas: 4.9, usv: 20.2 },
  { id: 'lon-nyc', rota: 'Londres–Nova York', fl: 370, horas: 6.8, usv: 27.3 },
  { id: 'nyc-tyo', rota: 'Nova York–Tóquio', fl: 430, horas: 13.0, usv: 55.1 },
  { id: 'tyo-nyc', rota: 'Tóquio–Nova York', fl: 410, horas: 12.2, usv: 50.7 },
  { id: 'lon-lax', rota: 'Londres–Los Angeles', fl: 390, horas: 10.5, usv: 44.6 },
  { id: 'chi-lon', rota: 'Chicago–Londres', fl: 370, horas: 7.3, usv: 30.8 },
  { id: 'lon-chi', rota: 'Londres–Chicago', fl: 390, horas: 7.8, usv: 34.0 },
  { id: 'ath-nyc', rota: 'Atenas–Nova York', fl: 410, horas: 9.4, usv: 44.6 },
];

export const taxa = (v: VooRadiacao) => v.usv / v.horas; // µSv por hora no ar
const voo = (id: string) => VOOS_FAA.find((v) => v.id === id) ?? VOOS_FAA[0];

// Rotas oferecidas nas calculadoras: do voo curto e baixo ao longo e alto, perto do polo.
const ROTAS_CALC = ['mia-tpa', 'nyc-sju', 'lax-hnl', 'was-lax', 'lon-nyc', 'nyc-tyo'];

function Escolhas({ opcoes, valor, onChange }: { opcoes: string[]; valor: string; onChange: (v: string) => void }) {
  return (
    <View style={styles.escolhas}>
      {opcoes.map((id) => (
        <Pressable key={id} accessibilityRole="radio" accessibilityState={{ checked: valor === id }} onPress={() => onChange(id)} style={[styles.escolha, valor === id && styles.escolhaAtiva]}>
          <Texto t="rotulo" cor={valor === id ? Cores.fundo : Cores.texto}>{voo(id).rota}</Texto>
        </Pressable>
      ))}
    </View>
  );
}

// ---------------------------------------------------------------- Taxa de dose por voo
export function GraficoDosePorRota() {
  const [sel, setSel] = useState('nyc-tyo');
  const [larg, setLarg] = useState(300);
  const v = voo(sel);
  const H = 200;
  const x0 = 34, x1 = larg - 10, yT = 12, yB = H - 32;
  const X = (fl: number) => x0 + ((fl - 180) / (440 - 180)) * (x1 - x0);
  const Y = (t: number) => yB - (t / 5) * (yB - yT);
  return (
    <MolduraMidia tipo="Gráfico" titulo="Quanto cada hora de voo soma" instrucao="27 voos de linha calculados pela FAA. Cada ponto é um voo: altitude máxima × dose média por hora no ar. Toque num ponto.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {[0, 1, 2, 3, 4, 5].map((t) => (
            <G key={t}>
              <Line x1={x0} y1={Y(t)} x2={x1} y2={Y(t)} stroke={Cores.linha} />
              <SvgText x={x0 - 6} y={Y(t) + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{t}</SvgText>
            </G>
          ))}
          {[200, 250, 300, 350, 400].map((fl) => (
            <SvgText key={fl} x={X(fl)} y={yB + 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{fl / 10}k</SvgText>
          ))}
          <SvgText x={(x0 + x1) / 2} y={H - 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ALTITUDE MÁX. (PÉS) × µSv POR HORA</SvgText>
          {VOOS_FAA.map((p) => (
            <G key={p.id} onPress={() => setSel(p.id)}>
              <Circle cx={X(p.fl)} cy={Y(taxa(p))} r={11} fill="#FFFFFF" fillOpacity={0.001} />
              <Circle cx={X(p.fl)} cy={Y(taxa(p))} r={p.id === sel ? 7 : 4.5} fill={p.id === sel ? Cores.dourado : Cores.destaque} fillOpacity={p.id === sel ? 1 : 0.7} stroke={Cores.fundo} strokeWidth={1.5} />
            </G>
          ))}
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Voo" valor={v.rota} cor={Cores.dourado} />
        <Leitura rotulo="Altitude máxima" valor={`${fmt(v.fl * 100)} ft`} />
        <Leitura rotulo="Tempo no ar" valor={`${fmt(v.horas, 1)} h`} />
        <Leitura rotulo="Dose do voo" valor={`${fmt(v.usv, v.usv < 10 ? 2 : 1)} µSv`} />
        <Leitura rotulo="Por hora" valor={`${fmt(taxa(v), 1)} µSv`} cor={Cores.destaque} />
      </View>
      <Texto cor={Cores.textoApagado}>Atividade solar média e Sol calmo. A taxa é a média do voo inteiro, com subida e descida.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Risco ao longo da carreira
export function RiscoCarreira() {
  const [dose, setDose] = useState(3);
  const [anos, setAnos] = useState(30);
  const [larg, setLarg] = useState(300);
  const total = dose * anos;
  const induzido = (total * 12) / 1000; // % (12 em 100.000 por mSv)
  const fatal = (total * 4) / 1000; // % (4 em 100.000 por mSv)
  const H = 170;
  const x0 = 34, x1 = larg - 10, yT = 14, yB = H - 30;
  const maxPct = 3.5;
  const X = (a: number) => x0 + (a / 40) * (x1 - x0);
  const Y = (p: number) => yB - (Math.min(p, maxPct) / maxPct) * (yB - yT);
  const linha = (k: number) => `M${X(0)} ${Y(0)}L${X(40)} ${Y((dose * 40 * k) / 1000)}`;
  return (
    <MolduraMidia tipo="Gráfico" titulo="O risco que se soma na carreira" instrucao="Estimativa da FAA para adultos em idade de trabalho. Arraste a dose anual e os anos de voo.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          {[0, 1, 2, 3].map((p) => (
            <G key={p}>
              <Line x1={x0} y1={Y(p)} x2={x1} y2={Y(p)} stroke={Cores.linha} />
              <SvgText x={x0 - 6} y={Y(p) + 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{p}%</SvgText>
            </G>
          ))}
          {[0, 10, 20, 30, 40].map((a) => (
            <SvgText key={a} x={X(a)} y={yB + 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={a === 0 ? 'start' : a === 40 ? 'end' : 'middle'}>{a}</SvgText>
          ))}
          <SvgText x={(x0 + x1) / 2} y={H - 3} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ANOS DE VOO</SvgText>
          <Path d={linha(12)} stroke={Cores.dourado} strokeWidth={2.4} fill="none" />
          <Path d={linha(4)} stroke={Cores.erro} strokeWidth={2.4} fill="none" />
          <Line x1={X(anos)} y1={yT} x2={X(anos)} y2={yB} stroke={Cores.texto} strokeDasharray="3 3" />
          <Circle cx={X(anos)} cy={Y(induzido)} r={5} fill={Cores.dourado} stroke={Cores.fundo} strokeWidth={1.5} />
          <Circle cx={X(anos)} cy={Y(fatal)} r={5} fill={Cores.erro} stroke={Cores.fundo} strokeWidth={1.5} />
        </Svg>
      </View>
      <View style={styles.legenda}>
        <View style={styles.itemLegenda}><View style={[styles.traco, { backgroundColor: Cores.dourado }]} /><Texto t="rotulo" cor={Cores.textoSuave}>Câncer induzido</Texto></View>
        <View style={styles.itemLegenda}><View style={[styles.traco, { backgroundColor: Cores.erro }]} /><Texto t="rotulo" cor={Cores.textoSuave}>Câncer fatal</Texto></View>
      </View>
      <Deslizante min={0.5} max={7} passo={0.5} valor={dose} onChange={setDose} rotulo="Dose por ano em milissieverts" formatar={(v) => `${fmt(v, 1)} milissieverts por ano`} />
      <Deslizante min={1} max={40} passo={1} valor={anos} onChange={setAnos} rotulo="Anos de voo" formatar={(v) => `${fmt(v)} anos`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Dose acumulada" valor={`${fmt(total, total % 1 ? 1 : 0)} mSv`} />
        <Leitura rotulo="Câncer induzido" valor={`${fmt(induzido, 2)}%`} cor={Cores.dourado} />
        <Leitura rotulo="Câncer fatal" valor={`${fmt(fatal, 2)}%`} cor={Cores.erro} />
      </View>
      <Texto cor={Cores.textoApagado}>Risco adicional ao da população geral. Abaixo de 100 mSv, os dados são incertos.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Gestação
export function GestacaoRadiacao() {
  const [rota, setRota] = useState('lon-nyc');
  const [horas, setHoras] = useState(70);
  const [larg, setLarg] = useState(300);
  const v = voo(rota);
  const mes = (taxa(v) * horas) / 1000; // mSv por mês
  const meses = mes > 0 ? 1 / mes : Infinity;
  const horasMax = 500 / taxa(v); // horas por mês para 0,5 mSv
  const passou = mes > 0.5;
  const H = 116;
  const x0 = 10, x1 = larg - 10;
  const base = 94; // pé das barras
  const altMax = 58; // altura que representa 2 mSv
  const X = (m: number) => x0 + (m / 9) * (x1 - x0);
  // Dose acumulada mês a mês até o 9º, comparada ao limite de 1 mSv.
  const A = (d: number) => (Math.min(d, 2) / 2) * altMax;
  const bw = (x1 - x0) / 9 - 6;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Gestação: quando o feto chega a 1 mSv" instrucao="Escolha a rota e as horas de voo por mês, contadas a partir da comunicação da gravidez.">
      <Escolhas opcoes={ROTAS_CALC} valor={rota} onChange={setRota} />
      <Deslizante min={0} max={100} passo={5} valor={horas} onChange={setHoras} rotulo="Horas de voo por mês" formatar={(h) => `${fmt(h)} horas por mês`} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <SvgText x={x0} y={10} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>DOSE ACUMULADA, MÊS A MÊS</SvgText>
          <SvgText x={x1} y={24} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="end">TRACEJADO: 1 mSv</SvgText>
          {Array.from({ length: 9 }, (_, i) => {
            const d = mes * (i + 1);
            const cor = d > 1 ? Cores.erro : d > 0.75 ? Cores.dourado : Cores.destaque;
            return (
              <G key={i}>
                <Rect x={X(i) + 3} y={base - A(d)} width={bw} height={Math.max(A(d), 1)} rx={3} fill={cor} fillOpacity={0.85} />
                <SvgText x={X(i) + 3 + bw / 2} y={H - 4} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{i + 1}º</SvgText>
              </G>
            );
          })}
          <Line x1={x0} y1={base - A(1)} x2={x1} y2={base - A(1)} stroke={Cores.erro} strokeDasharray="5 4" />
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Dose por mês" valor={`${fmt(mes, 2)} mSv`} cor={passou ? Cores.erro : Cores.texto} />
        <Leitura rotulo="Chega a 1 mSv em" valor={meses === Infinity ? '—' : meses > 9 ? 'mais de 9 meses' : `${fmt(meses, 1)} meses`} cor={meses < 9 ? Cores.dourado : Cores.acerto} />
        <Leitura rotulo="Teto de 0,5 mSv no mês" valor={`até ${fmt(Math.floor(horasMax))} h`} />
      </View>
      <View style={[styles.marca, { borderLeftColor: passou ? Cores.erro : Cores.dourado }]}>
        <Texto>{passou ? 'Acima de 0,5 mSv num mês: passa do teto mensal recomendado para o feto.' : 'Dentro do teto mensal; o total da gestação não deve passar de 1 mSv.'}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Um ano de voos (laboratório)
export function RadiacaoAnual() {
  const [rota, setRota] = useState('lon-nyc');
  const [horas, setHoras] = useState(700);
  const [larg, setLarg] = useState(300);
  const v = voo(rota);
  const msv = (taxa(v) * horas) / 1000;
  const H = 74;
  const x0 = 12, x1 = larg - 12;
  const X = (d: number) => x0 + (Math.min(d, 20) / 20) * (x1 - x0);
  const cor = msv > 5 ? Cores.erro : msv > 1 ? Cores.dourado : Cores.acerto;
  const situacao = msv > 6
    ? 'Acima de 6 mSv: passa do nível de referência da CNEN e, na União Europeia, a empresa segue todas as regras de trabalhador exposto.'
    : msv > 5
      ? 'Acima de 5 mSv: passa do nível de referência da CNEN para tripulantes no Brasil.'
      : msv > 1
      ? 'Acima de 1 mSv: na União Europeia, a empresa precisa avaliar a dose, considerá-la na escala e informar o tripulante.'
      : 'Até 1 mSv por ano: na faixa de dose do público em geral.';
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quanta radiação um ano de voos soma" instrucao="Escolha uma rota calculada pela FAA e as horas no ar por ano. Atividade solar média e Sol calmo.">
      <Escolhas opcoes={ROTAS_CALC} valor={rota} onChange={setRota} />
      <Deslizante min={0} max={1000} passo={10} valor={horas} onChange={setHoras} rotulo="Horas de voo por ano" formatar={(h) => `${fmt(h)} horas por ano`} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Rect x={x0} y={18} width={x1 - x0} height={14} rx={7} fill={Cores.trilha} />
          <Rect x={X(5)} y={18} width={X(10) - X(5)} height={14} fill={Cores.dourado} fillOpacity={0.25} />
          <Rect x={x0} y={18} width={Math.max(X(msv) - x0, 2)} height={14} rx={7} fill={cor} fillOpacity={0.85} />
          {[0, 5, 10, 15, 20].map((d) => (
            <SvgText key={d} x={X(d)} y={50} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={d === 0 ? 'start' : d === 20 ? 'end' : 'middle'}>{d}</SvgText>
          ))}
          <SvgText x={x0} y={12} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>mSv POR ANO</SvgText>
          <SvgText x={(X(5) + X(10)) / 2} y={66} fill={Cores.dourado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ICRP: 5 A 10</SvgText>
          <SvgText x={x1} y={66} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">LIMITE: 20</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Dose por hora" valor={`${fmt(taxa(v), 1)} µSv`} />
        <Leitura rotulo="Dose no ano" valor={`${fmt(msv, 1)} mSv`} cor={cor} />
      </View>
      <View style={[styles.marca, { borderLeftColor: cor }]}>
        <Texto>{situacao}</Texto>
      </View>
      <View style={{ gap: 4 }}>
        <Comparar rotulo="Radiação natural média nos EUA, por ano" valor="3,11 mSv" />
        <Comparar rotulo="Média dos tripulantes (UNSCEAR)" valor="cerca de 3 mSv" />
        <Comparar rotulo="Nível de referência da CNEN (Brasil) para tripulantes" valor="5 mSv" />
        <Comparar rotulo="Nível de referência da ICRP para tripulantes" valor="5 a 10 mSv" />
        <Comparar rotulo="Limite ocupacional (média em 5 anos)" valor="20 mSv" />
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

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Espaco.sm },
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  escolhas: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  escolha: { minHeight: 34, paddingHorizontal: 12, borderRadius: 17, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
  escolhaAtiva: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  legenda: { flexDirection: 'row', gap: Espaco.lg },
  itemLegenda: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  traco: { width: 18, height: 3, borderRadius: 2 },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
