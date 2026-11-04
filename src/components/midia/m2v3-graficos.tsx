import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { SvgText } from '@/components/svg-texto';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';
import { pressaoBarometrica } from '@/lib/fisiologia';

// Interativos do M2V3 · Ouvidos, seios da face e dentes. Fontes no registro de src/data/capitulos/ouvidos.ts: ICAO Doc
// 8984 (Part II Cap. 1 e Part III Cap. 12); RBAC 67.97, 67.101 e 67.103; FAA 14 CFR 67.105, Guia do AME Item 30 e
// AIM 8-1-2; Felkai et al., Br Dent J 2023; Topbaş et al., PeerJ 2024. Sem fonte: [confirmar na referência].
const fmt = (n: number) => Math.round(n).toLocaleString('pt-BR');

function Marca({ cor, children }: { cor: string; children: string }) {
  return (
    <View style={[styles.marca, { borderLeftColor: cor }]}>
      <Texto>{children}</Texto>
    </View>
  );
}

// Deslizante com o rótulo e o valor visíveis acima da barra.
function Controle(p: Parameters<typeof Deslizante>[0]) {
  return (
    <View style={{ gap: 4 }}>
      <View style={styles.linha}>
        <Texto t="rotulo" cor={Cores.textoApagado}>{p.rotulo}</Texto>
        <Texto t="item" cor={Cores.destaque}>{p.formatar ? p.formatar(p.valor) : fmt(p.valor)}</Texto>
      </View>
      <Deslizante {...p} />
    </View>
  );
}

// ---------------------------------------------------------------- Diferença de pressão na descida
export function PressaoDescida() {
  const [de, setDe] = useState(8000);
  const [para, setPara] = useState(0);
  // Arredondado para baixo, como na Tabela III-12-1 da ICAO (564 mmHg a 8.000 ft).
  const p1 = Math.floor(pressaoBarometrica(de));
  const p2 = Math.floor(pressaoBarometrica(Math.min(para, de)));
  const dif = p2 - p1;
  const cor = dif >= 200 ? Cores.erro : dif >= 100 ? Cores.dourado : Cores.acerto;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quanta pressão chega ao tímpano na descida" instrucao="Escolha a altitude da cabine no início da descida e a do aeroporto. O número é a diferença sobre o tímpano se a tuba não abrir nenhuma vez.">
      <Controle min={1000} max={10000} passo={500} valor={de} onChange={setDe} rotulo="Cabine no início da descida" formatar={(v) => `${fmt(v)} ft`} />
      <Controle min={0} max={6000} passo={500} valor={para} onChange={setPara} rotulo="Altitude do aeroporto" formatar={(v) => `${fmt(v)} ft`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Pressão no início" valor={`${fmt(p1)} mmHg`} cor={Cores.textoSuave} />
        <Leitura rotulo="Pressão no pouso" valor={`${fmt(p2)} mmHg`} cor={Cores.textoSuave} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Diferença sobre o tímpano" valor={`${fmt(Math.max(dif, 0))} mmHg`} cor={cor} />
      </View>
      <Marca cor={cor}>
        {dif >= 200
          ? 'Na faixa em que o tímpano pode romper (200 a 500 mmHg). Na vida real a tuba abre algumas vezes, mas um nariz entupido pode deixá-la fechada.'
          : dif >= 100
            ? 'Diferença grande: descer de 6.500 ft ao nível do mar já dá cerca de 150 mmHg. Equalize cedo e repita.'
            : 'Diferença menor, mas que ainda pede manobras se o nariz estiver entupido.'}
      </Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Escala de Teed
const TEED: [string, string][] = [
  ['0', 'Sintomas sem sinais no tímpano'],
  ['1', 'Tímpano vermelho e retraído'],
  ['2', 'Pequena hemorragia e retração do tímpano'],
  ['3', 'Hemorragia grande e retração do tímpano'],
  ['4', 'Sangue ou líquido no ouvido médio'],
  ['5', 'Perfuração do tímpano'],
];

export function EscalaTeed() {
  const [g, setG] = useState('2');
  const desc = TEED.find((t) => t[0] === g)![1];
  const cor = Number(g) >= 4 ? Cores.erro : Cores.dourado;
  return (
    <MolduraMidia tipo="Classificador" titulo="Escala de Teed do barotrauma do ouvido" instrucao="Escolha o grau para ver o que o médico encontra no tímpano.">
      <Opcoes itens={TEED.map(([k]) => [k, `Grau ${k}`] as [string, string])} valor={g} onChange={setG} />
      <View style={styles.leituras}>
        <Leitura rotulo={`Grau ${g}`} valor={desc} cor={cor} />
      </View>
      <Marca cor={Cores.erro}>Tripulante: sinais e sintomas de barotrauma do ouvido não são compatíveis com o voo, em qualquer grau. Volta depois de o processo passar por completo e o tímpano estar normal.</Marca>
      <Texto cor={Cores.textoApagado}>Na versão de 5 graus, os graus 2 e 3 se juntam.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Tímpano, cirurgias e vertigem
type Caso = 'perfuracao' | 'resolvida' | 'estribo' | 'timpanoplastia' | 'vertigemTransitoria' | 'vertigemPermanente';
const CASOS: Record<Caso, { nome: string; icao: string; anac: string; faa: string; cor: string }> = {
  perfuracao: { nome: 'Perfuração única e seca', icao: 'Não torna inapto', anac: 'Não torna inapto se cumprir a audição (67.101)', faa: 'Com patologia associada, decisão da FAA', cor: Cores.dourado },
  resolvida: { nome: 'Perfuração resolvida', icao: 'Apto com o tímpano íntegro', anac: 'Apto com o tímpano íntegro', faa: 'Sem sintomas: emitir', cor: Cores.acerto },
  estribo: { nome: 'Estapedectomia', icao: '1 a 3 meses sem voar; depois 2 anos com tripulação múltipla', anac: 'A critério do examinador', faa: 'Decisão da FAA com o relatório do cirurgião', cor: Cores.erro },
  timpanoplastia: { nome: 'Timpanoplastia', icao: 'Sem restrição com tímpano íntegro, sem vertigem e audição normal', anac: 'A critério do examinador', faa: 'Decisão da FAA com o relatório do cirurgião', cor: Cores.dourado },
  vertigemTransitoria: { nome: 'Vertigem transitória', icao: 'Sem distúrbio vestibular para voar', anac: 'Não apto até a condição se restabelecer', faa: 'Pode não desqualificar após a recuperação completa', cor: Cores.dourado },
  vertigemPermanente: { nome: 'Vertigem permanente', icao: 'Distúrbio vestibular: inapto', anac: 'Transtorno vestibular permanente: não apto', faa: 'Avaliação cuidadosa da FAA', cor: Cores.erro },
};

export function PrazoOuvido() {
  const [c, setC] = useState<Caso>('estribo');
  const k = CASOS[c];
  return (
    <MolduraMidia tipo="Comparador" titulo="Tímpano, cirurgia e vertigem nas três normas" instrucao="Escolha a situação do tripulante. O passageiro segue a orientação do próprio cirurgião ou médico.">
      <Opcoes itens={(Object.keys(CASOS) as Caso[]).map((x) => [x, CASOS[x].nome] as [Caso, string])} valor={c} onChange={setC} colunas={2} />
      <Marca cor={k.cor}>{`ICAO: ${k.icao}.`}</Marca>
      <Marca cor={k.cor}>{`ANAC: ${k.anac}.`}</Marca>
      <Marca cor={k.cor}>{`FAA: ${k.faa}.`}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Audiometria nas três normas
const FREQ = [500, 1000, 2000, 3000];
const FAA_MELHOR = [35, 30, 30, 40];
const FAA_PIOR = [35, 50, 50, 60];
const dentroIcao = (o: number[]) => o[0] <= 35 && o[1] <= 35 && o[2] <= 35 && o[3] <= 50;

export function AudiometriaNormas() {
  const [lado, setLado] = useState<'od' | 'oe'>('od');
  const [od, setOd] = useState([15, 15, 20, 30]);
  const [oe, setOe] = useState([20, 25, 40, 55]);
  const atual = lado === 'od' ? od : oe;
  const muda = (i: number, v: number) => (lado === 'od' ? setOd : setOe)((a) => a.map((x, j) => (j === i ? v : x)));
  const okOd = dentroIcao(od);
  const okOe = dentroIcao(oe);
  const media = (o: number[]) => o.reduce((s, x) => s + x, 0);
  const [melhor, pior] = media(od) <= media(oe) ? [od, oe] : [oe, od];
  const okFaa = melhor.every((x, i) => x <= FAA_MELHOR[i]) && pior.every((x, i) => x <= FAA_PIOR[i]);
  const anac = okOd && okOe ? 'Apto' : okOd || okOe ? 'Revalidação: um ouvido basta' : 'Teste de fala no ruído';
  const corAnac = okOd && okOe ? Cores.acerto : okOd || okOe ? Cores.dourado : Cores.erro;
  return (
    <MolduraMidia tipo="Simulador" titulo="A audiometria nas três normas" instrucao="Escolha o ouvido e ajuste a perda em cada frequência, em decibéis. Valores menores são audição melhor.">
      <Opcoes itens={[['od', 'Ouvido direito'], ['oe', 'Ouvido esquerdo']]} valor={lado} onChange={setLado} />
      {FREQ.map((f, i) => (
        <Controle key={`${lado}${f}`} min={0} max={80} passo={5} valor={atual[i]} onChange={(v) => muda(i, v)} rotulo={`${fmt(f)} Hz`} formatar={(v) => `${fmt(v)} dB`} />
      ))}
      <View style={styles.leituras}>
        <Leitura rotulo="Direito (ICAO e ANAC)" valor={okOd ? 'Dentro' : 'Acima'} cor={okOd ? Cores.acerto : Cores.erro} />
        <Leitura rotulo="Esquerdo (ICAO e ANAC)" valor={okOe ? 'Dentro' : 'Acima'} cor={okOe ? Cores.acerto : Cores.erro} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="ANAC" valor={anac} cor={corAnac} />
        <Leitura rotulo="FAA (melhor e pior ouvido)" valor={okFaa ? 'Dentro' : 'Voz a 1,8 m ou fala ≥ 70%'} cor={okFaa ? Cores.acerto : Cores.dourado} />
      </View>
      <Marca cor={Cores.textoSuave}>ICAO e ANAC: até 35 dB em 500, 1.000 e 2.000 Hz e até 50 dB em 3.000 Hz, em cada ouvido. FAA: melhor ouvido 35/30/30/40 dB e pior ouvido 35/50/50/60 dB.</Marca>
      <Texto cor={Cores.textoApagado}>Quem passa do limite ainda pode ser apto se entender a fala com o ruído da cabine. Na ANAC, sem nenhum ouvido dentro, a restrição é não usar rádio nem atuar como comissário.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Mapa dos seios da face
type Seio = 'frontal' | 'maxilar' | 'etmoidal' | 'esfenoidal';
const SEIOS: Record<Seio, { nome: string; onde: string; dor: string }> = {
  frontal: { nome: 'Frontais', onde: 'Na testa, acima dos olhos', dor: 'Dor na testa, sobre o seio' },
  maxilar: { nome: 'Maxilares', onde: 'Nas bochechas, abaixo dos olhos', dor: 'Dor na bochecha; pode doer nos dentes de cima' },
  etmoidal: { nome: 'Etmoidais', onde: 'Entre os olhos', dor: 'Dor perto do seio, entre os olhos' },
  esfenoidal: { nome: 'Esfenoidais', onde: 'No fundo do nariz', dor: 'Dor na parte de trás da cabeça, a nuca' },
};

export function MapaSeios() {
  const [s, setS] = useState<Seio>('maxilar');
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 320), H = 220, cx = W / 2;
  const ativo = (k: Seio) => (s === k ? Cores.erro : '#2A4A6A');
  return (
    <MolduraMidia tipo="Mapa" titulo="Onde ficam os seios da face" instrucao="Toque no nome do seio para ver onde ele fica e onde dói a aerossinusite.">
      <Opcoes itens={(Object.keys(SEIOS) as Seio[]).map((k) => [k, SEIOS[k].nome] as [Seio, string])} valor={s} onChange={setS} colunas={2} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Rect x={0} y={0} width={W} height={H} rx={8} fill="#0A1626" />
          <Ellipse cx={cx} cy={112} rx={78} ry={98} fill="#132438" stroke="#3D6A96" strokeWidth={1.5} />
          <Ellipse cx={cx - 22} cy={45} rx={18} ry={12} fill={ativo('frontal')} />
          <Ellipse cx={cx + 22} cy={45} rx={18} ry={12} fill={ativo('frontal')} />
          <Ellipse cx={cx - 30} cy={82} rx={13} ry={7} fill="none" stroke="#C9D4E0" strokeWidth={1.5} />
          <Ellipse cx={cx + 30} cy={82} rx={13} ry={7} fill="none" stroke="#C9D4E0" strokeWidth={1.5} />
          <Rect x={cx - 7} y={72} width={14} height={30} rx={4} fill={ativo('etmoidal')} />
          <Circle cx={cx} cy={112} r={9} fill="none" stroke={ativo('esfenoidal')} strokeWidth={3} strokeDasharray="3 3" />
          <Path d={`M ${cx - 46} ${100} Q ${cx - 30} ${96} ${cx - 16} ${108} L ${cx - 18} ${138} Q ${cx - 36} ${142} ${cx - 50} ${130} Z`} fill={ativo('maxilar')} />
          <Path d={`M ${cx + 46} ${100} Q ${cx + 30} ${96} ${cx + 16} ${108} L ${cx + 18} ${138} Q ${cx + 36} ${142} ${cx + 50} ${130} Z`} fill={ativo('maxilar')} />
          <Path d={`M ${cx} ${92} L ${cx - 8} ${130} L ${cx + 8} ${130} Z`} fill="none" stroke="#C9D4E0" strokeWidth={1.2} />
          <Path d={`M ${cx - 24} ${168} Q ${cx} ${180} ${cx + 24} ${168}`} fill="none" stroke="#C9D4E0" strokeWidth={1.5} />
          <G>
            <SvgText x={cx} y={H - 8} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ESQUEMA DE FRENTE · ESFENOIDE NO FUNDO, TRACEJADO</SvgText>
          </G>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Onde fica" valor={SEIOS[s].onde} cor={Cores.textoSuave} />
      </View>
      <Marca cor={Cores.erro}>{SEIOS[s].dor}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Classes de barodontalgia
type Quando = 'subida' | 'descida' | 'ambas';
type Tipo = 'aguda' | 'surda' | 'forte';
function classe(q: Quando, t: Tipo) {
  if (q === 'ambas' || t === 'forte') return { c: 'IV', causa: 'Lesão na raiz (periapical)', cor: Cores.erro };
  if (q === 'descida') return { c: 'III', causa: 'Polpa necrótica', cor: Cores.erro };
  if (t === 'aguda') return { c: 'I', causa: 'Pulpite irreversível', cor: Cores.dourado };
  return { c: 'II', causa: 'Pulpite reversível', cor: Cores.dourado };
}

export function ClassesBarodontalgia() {
  const [q, setQ] = useState<Quando>('subida');
  const [t, setT] = useState<Tipo>('aguda');
  const r = classe(q, t);
  return (
    <MolduraMidia tipo="Classificador" titulo="Que dente dói no voo?" instrucao="Diga quando a dor aparece e como ela é. A classificação é a de Ferjentsik e Aker; o diagnóstico é do dentista.">
      <Opcoes itens={[['subida', 'Na subida'], ['descida', 'Na descida'], ['ambas', 'Nas duas']]} valor={q} onChange={setQ} />
      <Opcoes itens={[['aguda', 'Aguda e breve'], ['surda', 'Surda e latejante'], ['forte', 'Forte e persistente']]} valor={t} onChange={setT} />
      <View style={styles.leituras}>
        <Leitura rotulo="Classe" valor={r.c} cor={r.cor} />
        <Leitura rotulo="Causa provável" valor={r.causa} cor={r.cor} />
      </View>
      <Marca cor={Cores.textoSuave}>Dor nos dentes de cima que só aparece no voo pode vir do seio maxilar, e não do dente.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Prazo depois do dentista
type Proc = 'restauracao' | 'extracao' | 'implante' | 'cirurgica' | 'canal' | 'seio';
const PROCS: Record<Proc, { nome: string; horas: number; ideal?: number }> = {
  restauracao: { nome: 'Restauração', horas: 24, ideal: 168 },
  extracao: { nome: 'Extração simples', horas: 48 },
  implante: { nome: 'Implante sem complicação', horas: 72 },
  cirurgica: { nome: 'Extração cirúrgica', horas: 72 },
  canal: { nome: 'Tratamento de canal', horas: 72 },
  seio: { nome: 'Levantamento do seio ou enxerto', horas: 336 },
};

export function PrazoDentista() {
  const [p, setP] = useState<Proc>('canal');
  const [h, setH] = useState(24);
  const x = PROCS[p];
  const pronto = h >= x.horas;
  const cor = pronto ? (x.ideal && h < x.ideal ? Cores.dourado : Cores.acerto) : Cores.erro;
  const prazo = x.horas >= 336 ? 'Pelo menos 2 semanas' : p === 'extracao' ? '24 a 48 h' : `${fmt(x.horas)} h`;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quando voar depois do dentista" instrucao="Escolha o procedimento e quanto tempo passou. Vale só sem dor, inchaço nem sangramento.">
      <Opcoes itens={(Object.keys(PROCS) as Proc[]).map((k) => [k, PROCS[k].nome] as [Proc, string])} valor={p} onChange={setP} colunas={2} />
      <Controle min={0} max={360} passo={6} valor={h} onChange={setH} rotulo="Horas desde o procedimento" formatar={(v) => (v >= 48 ? `${fmt(v)} h (${fmt(v / 24)} dias)` : `${fmt(v)} h`)} />
      <View style={styles.leituras}>
        <Leitura rotulo="Prazo" valor={prazo} cor={Cores.textoSuave} />
        <Leitura rotulo="Pode voar?" valor={pronto ? 'Sim' : `Faltam ${fmt(x.horas - h)} h`} cor={cor} />
      </View>
      <Marca cor={cor}>
        {pronto && x.ideal && h < x.ideal
          ? 'Prazo mínimo cumprido; depois de restauração, o recomendado é esperar 1 semana.'
          : pronto
            ? 'Prazo cumprido, se não houver dor, inchaço nem sangramento.'
            : p === 'seio'
              ? 'Depois do levantamento do seio, prefira voltar por terra ou mar; se voar, espere ao menos 2 semanas sem sintomas no seio.'
              : 'Ainda não. Tripulante também não voa com curativo dentário nem com canal em curso.'}
      </Marca>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
