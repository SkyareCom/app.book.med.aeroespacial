import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Gráficos do M1V8 · Impacto e ejeção. Fontes no registro de src/data/capitulos/impacto.ts.
// Limites de DRI por eixo (critérios da AFAMRL, relatório PUC_1746_14); 14 CFR 25.562; Taylor et al. DOT/FAA/AM-15/17;
// Zivkovic et al. 2024 (envelope); Crowley 1991 e estudo de 1961 (capacetes).
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

function Barras({ linhas, max, unidade, larg }: { linhas: { nome: string; valor: number; cor: string; texto: string }[]; max: number; unidade: string; larg: number }) {
  const x0 = 8, x1 = larg - 8;
  const X = (v: number) => x0 + (v / max) * (x1 - x0);
  const passo = 38;
  return (
    <Svg width={larg} height={linhas.length * passo + 4}>
      {linhas.map((l, i) => {
        const y = i * passo;
        return (
          <G key={l.nome}>
            <SvgText x={x0} y={y + 11} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>{l.nome.toUpperCase()}</SvgText>
            <SvgText x={x1} y={y + 11} fill={l.cor} fontSize={10} fontFamily={Fonte} textAnchor="end">{l.texto}{unidade}</SvgText>
            <Rect x={x0} y={y + 16} width={x1 - x0} height={12} rx={6} fill={Cores.trilha} />
            <Rect x={x0} y={y + 16} width={Math.max(X(l.valor) - x0, 4)} height={12} rx={6} fill={l.cor} />
          </G>
        );
      })}
    </Svg>
  );
}

// ---------------------------------------------------------------- Limites de impacto por direção
const EIXOS = [
  { id: 'x', nome: 'Frente ou costas', baixo: 28, mod: 35, alto: 46, texto: 'Apoiado no encosto ou nos cintos, a carga se espalha pelo tronco. É a direção que o corpo mais tolera.' },
  { id: 'y', nome: 'De lado', baixo: 14, mod: 17, alto: 22, texto: 'De lado, o tronco e o pescoço dobram e o corpo escapa dos cintos com mais facilidade.' },
  { id: 'zp', nome: 'Na coluna', baixo: 15.2, mod: 18, alto: 22.8, texto: 'Para baixo, as vértebras recebem a carga uma sobre a outra. No risco alto, 50% de chance de fratura da coluna; no moderado, 5%; no baixo, 0,5%. É a direção da ejeção.' },
  { id: 'zm', nome: 'Para cima', baixo: 9, mod: 12, alto: 15, texto: 'Para cima, o corpo é puxado para fora do assento e fica preso só pelos cintos: é a direção menos tolerada.' },
];

export function LimitesImpacto() {
  const [sel, setSel] = useState('zp');
  const [larg, setLarg] = useState(300);
  const e = EIXOS.find((x) => x.id === sel) ?? EIXOS[2];
  return (
    <MolduraMidia tipo="Gráfico" titulo="Quanto G o corpo aguenta num impacto" instrucao="Escolha a direção do impacto. As barras mostram os limites de risco baixo, moderado e alto para a coluna.">
      <Opcoes itens={EIXOS.map((x) => [x.id, x.nome] as [string, string])} valor={sel} onChange={setSel} />
      <View onLayout={(ev) => setLarg(ev.nativeEvent.layout.width)}>
        <Barras
          larg={larg}
          max={50}
          unidade=" G"
          linhas={[
            { nome: 'Risco baixo', valor: e.baixo, cor: Cores.acerto, texto: fmt(e.baixo, e.baixo % 1 ? 1 : 0) },
            { nome: 'Risco moderado', valor: e.mod, cor: Cores.dourado, texto: fmt(e.mod) },
            { nome: 'Risco alto', valor: e.alto, cor: Cores.erro, texto: fmt(e.alto, e.alto % 1 ? 1 : 0) },
          ]}
        />
      </View>
      <View style={styles.marca}>
        <Texto>{e.texto}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Os dois testes do assento
const TESTES = {
  baixo: { nome: 'Teste para baixo', g: 14, vel: 38, ang: -30, texto: 'O avião inclinado 30°, nariz para baixo, bate a cerca de 38 km/h com pico de 14 G em 0,08 s. Testa a coluna: a carga lombar não pode passar de cerca de 680 kg-força.' },
  frente: { nome: 'Teste para frente', g: 16, vel: 48, ang: 0, texto: 'O assento, girado 10°, para a cerca de 48 km/h com pico de 16 G em 0,09 s. Testa a cabeça (HIC até 1.000), o fêmur e se a alça escapa do ombro.' },
} as const;

export function TesteAssento() {
  const [sel, setSel] = useState<keyof typeof TESTES>('frente');
  const [larg, setLarg] = useState(300);
  const t = TESTES[sel];
  const H = 130;
  const cx = larg / 2, cy = 70;
  // Assento esquemático, girado pela atitude do teste; seta da desaceleração.
  const rot = `rotate(${t.ang} ${cx} ${cy})`;
  const dx = sel === 'frente' ? 1 : 0, dy = sel === 'frente' ? 0 : 1;
  return (
    <MolduraMidia tipo="Gráfico" titulo="Como se testa um assento" instrucao="Escolha o teste. O boneco de 77 kg vai preso no assento, sobre um trenó que freia de repente.">
      <Opcoes itens={[['baixo', TESTES.baixo.nome], ['frente', TESTES.frente.nome]]} valor={sel} onChange={(v) => setSel(v as keyof typeof TESTES)} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={H}>
          <Rect x={8} y={H - 18} width={larg - 16} height={6} rx={3} fill={Cores.trilha} />
          <G transform={rot}>
            <Rect x={cx - 34} y={cy + 6} width={60} height={12} rx={4} fill="#3A4A60" />
            <Rect x={cx - 40} y={cy - 46} width={12} height={64} rx={4} fill="#3A4A60" />
            <Circle cx={cx - 18} cy={cy - 40} r={10} fill="#C9D4E0" />
            <Rect x={cx - 26} y={cy - 28} width={16} height={34} rx={6} fill="#C9D4E0" />
            <Path d={`M${cx - 12} ${cy + 2} L${cx + 20} ${cy + 2} L${cx + 22} ${cy + 30}`} stroke="#C9D4E0" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <Line x1={cx - 24} y1={cy - 26} x2={cx - 12} y2={cy + 4} stroke={Cores.dourado} strokeWidth={3} />
            <Line x1={cx - 22} y1={cy + 4} x2={cx - 4} y2={cy + 4} stroke={Cores.dourado} strokeWidth={3} />
          </G>
          <Line x1={cx + 46 - 26 * dx} y1={cy - 20 * dy - 10 + 10 * dx} x2={cx + 46 + 26 * dx} y2={cy + 20 * dy - 10 + 10 * dx} stroke={Cores.erro} strokeWidth={3} />
          <Path d={dx ? `M${cx + 72} ${cy} l-8 -6 l0 12 z` : `M${cx + 46} ${cy + 14} l-6 -8 l12 0 z`} fill={Cores.erro} />
          <SvgText x={8} y={14} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>{sel === 'baixo' ? 'ASSENTO INCLINADO 30°' : 'TRENÓ PARA DE FRENTE'}</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Pico" valor={`${t.g} G`} cor={Cores.erro} />
        <Leitura rotulo="Velocidade" valor={`≈ ${t.vel} km/h`} />
      </View>
      <View style={styles.marca}>
        <Texto>{t.texto}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Posição de impacto
const ENCOSTOS = [
  ['travado', 'Encosto travado'],
  ['tomba', 'Encosto que tomba'],
  ['absorve', 'Absorve energia'],
] as [string, string][];

export function PosicaoImpacto() {
  const [maos, setMaos] = useState<'encosto' | 'pernas'>('encosto');
  const [encosto, setEncosto] = useState('tomba');
  const bom = maos === 'pernas' || encosto === 'travado';
  const texto =
    maos === 'pernas'
      ? 'Mãos para baixo, junto às pernas: o risco na cabeça e no pescoço caiu de forma significativa em todos os tipos de encosto. É a posição que a FAA passou a recomendar.'
      : encosto === 'travado'
        ? 'Com encosto travado, apoiar as mãos e a cabeça nele reduziu o risco na cabeça.'
        : 'O peso dos braços empurra o encosto da frente, que tomba ou cede, e a cabeça bate com mais força. Nesses encostos, a posição antiga piorou a batida da cabeça.';
  return (
    <MolduraMidia tipo="Simulador" titulo="Mãos no encosto ou junto às pernas" instrucao="Resultados de 17 testes da FAA em trenó de impacto. Escolha onde ficam as mãos e o tipo de encosto da frente.">
      <Opcoes itens={[['encosto', 'Mãos no encosto'], ['pernas', 'Mãos nas pernas']]} valor={maos} onChange={(v) => setMaos(v as 'encosto' | 'pernas')} />
      <Opcoes itens={ENCOSTOS} valor={encosto} onChange={setEncosto} />
      <View style={styles.leituras}>
        <Leitura rotulo="Cabeça e pescoço" valor={bom ? 'Risco menor' : 'Batida pior'} cor={bom ? Cores.acerto : Cores.erro} />
      </View>
      <View style={[styles.marca, { borderLeftColor: bom ? Cores.acerto : Cores.erro }]}>
        <Texto>{texto}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Envelope da ejeção
const SITUACOES = [
  { id: 'dentro', nome: 'Dentro do envelope', valor: 95.7, cor: Cores.acerto, texto: 'Altura, velocidade e atitude dentro do que o assento foi feito para fazer: 95,7% sobreviveram, em 232 ejeções com foguete.' },
  { id: 'baixa', nome: 'Abaixo de 150 m', valor: 50, cor: Cores.dourado, texto: 'Perto do chão, sobra pouco tempo para o paraquedas abrir: a sobrevivência caiu para cerca de 50%.' },
  { id: 'fora', nome: 'Fora do envelope', valor: 23.8, cor: Cores.erro, texto: 'Fora do envelope, só 23,8% sobreviveram. Nos assentos ACES II, 23 das 41 mortes foram fora dele: decidir cedo salva.' },
];

export function EnvelopeEjecao() {
  const [sel, setSel] = useState('dentro');
  const [larg, setLarg] = useState(300);
  const s = SITUACOES.find((x) => x.id === sel) ?? SITUACOES[0];
  return (
    <MolduraMidia tipo="Gráfico" titulo="Quando a ejeção salva" instrucao="Sobrevivência conforme as condições no momento da ejeção. Escolha uma situação.">
      <Opcoes itens={SITUACOES.map((x) => ({ valor: x.id, rotulo: x.nome, cor: x.cor }))} valor={sel} onChange={setSel} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Barras larg={larg} max={100} unidade="%" linhas={SITUACOES.map((x) => ({ nome: x.nome, valor: x.valor, cor: x.id === sel ? x.cor : Cores.textoApagado, texto: x.id === 'baixa' ? '≈ 50' : fmt(x.valor, 1) }))} />
      </View>
      <View style={[styles.marca, { borderLeftColor: s.cor }]}>
        <Texto>{s.texto}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Risco sem capacete
const CAPACETES = [
  { nome: 'Com capacete', valor: 1, cor: Cores.acerto, texto: '1 ×' },
  { nome: 'Sem capacete, anos 1950', valor: 2.4, cor: Cores.dourado, texto: '2,4 ×' },
  { nome: 'Sem capacete, estudo de 1991', valor: 6.3, cor: Cores.erro, texto: '6,3 ×' },
  { nome: 'Sem capacete, assentos de trás', valor: 7.5, cor: Cores.erro, texto: '7,5 ×' },
];

export function RiscoCapacete() {
  const [larg, setLarg] = useState(300);
  return (
    <MolduraMidia tipo="Gráfico" titulo="Quanto o capacete protege" instrucao="Risco de lesão fatal na cabeça em acidentes de helicóptero graves, mas sobrevivíveis, comparado a quem usava capacete. Exército dos EUA.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Barras larg={larg} max={8} unidade="" linhas={CAPACETES} />
      </View>
      <Texto cor={Cores.textoApagado}>O estudo de 1991 comparou o capacete SPH-4 com ocupantes sem capacete; o de 1961, o capacete APH-5.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
