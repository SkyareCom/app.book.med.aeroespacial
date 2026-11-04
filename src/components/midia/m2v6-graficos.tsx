import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Rect } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { SvgText } from '@/components/svg-texto';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Interativos do M2V6 · Cérebro e sistema nervoso. Fontes no registro de src/data/capitulos/cerebro.ts:
// ICAO Doc 8984 Part III Cap. 10; RBAC 67.77; FAA Guide for AMEs (Seizure, Epilepsy, Headache/Migraine, Migraine
// Medication 26/08/2026, Stroke-CVA-TIA, Head Injury); UK CAA Neurology; IATA Medical Manual (via Link Airways); AsMA
// Neurology 2014; Peterson et al. 2013. Sem fonte: [confirmar na referência].
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

function Marca({ cor, children }: { cor: string; children: string }) {
  return (
    <View style={[styles.marca, { borderLeftColor: cor }]}>
      <Texto>{children}</Texto>
    </View>
  );
}

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

// ---------------------------------------------------------------- Gatilhos do voo
type Gatilho = 'sono' | 'fuso' | 'hipoxia' | 'jejum' | 'agua' | 'alcool' | 'ruido';
const GATILHOS: Record<Gatilho, { nome: string; afeta: string[]; fazer: string }> = {
  sono: { nome: 'Sono curto', afeta: ['Convulsão', 'Enxaqueca'], fazer: 'Dormir antes do voo; no voo noturno, descansar quando puder' },
  fuso: { nome: 'Fuso horário', afeta: ['Convulsão', 'Enxaqueca'], fazer: 'Ajustar o horário dos remédios ao fuso com o médico' },
  hipoxia: { nome: 'Ar da cabine', afeta: ['Enxaqueca'], fazer: 'Remédio de crise à mão; tomar logo no início' },
  jejum: { nome: 'Refeição pulada', afeta: ['Enxaqueca', 'Desmaio'], fazer: 'Comer antes de embarcar e na hora das refeições' },
  agua: { nome: 'Pouca água e calor', afeta: ['Desmaio'], fazer: 'Beber água; levantar devagar' },
  alcool: { nome: 'Álcool', afeta: ['Enxaqueca', 'Desmaio'], fazer: 'Evitar na véspera e a bordo; o vinho tinto é gatilho clássico' },
  ruido: { nome: 'Ruído', afeta: ['Enxaqueca'], fazer: 'Protetor de ouvido ou fone' },
};

export function GatilhosCerebro() {
  const [g, setG] = useState<Gatilho>('sono');
  const k = GATILHOS[g];
  return (
    <MolduraMidia tipo="Comparador" titulo="Gatilhos do voo para o cérebro" instrucao="Escolha um fator da viagem para ver o que ele pode disparar e como se proteger.">
      <Opcoes itens={(Object.keys(GATILHOS) as Gatilho[]).map((x) => [x, GATILHOS[x].nome] as [Gatilho, string])} valor={g} onChange={setG} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Pode disparar" valor={k.afeta.join(' · ')} cor={Cores.erro} />
      </View>
      <Marca cor={Cores.acerto}>{`Proteção: ${k.fazer}.`}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Quando volta a voar depois de uma convulsão
type Crise = 'febril' | 'provocada' | 'unica' | 'epilepsia';
type Norma = 'faa' | 'icao' | 'anac';
const CRISES: Record<Crise, { nome: string; passageiro: string; norma: Record<Norma, string> }> = {
  febril: {
    nome: 'Febril simples, até 5 anos',
    passageiro: 'Pode voar.',
    norma: { faa: 'O examinador pode emitir, se foi única, sem remédio e sem sequela.', icao: 'Não indica epilepsia no futuro.', anac: 'Examinador avalia; o EEG faz parte do exame inicial.' },
  },
  provocada: {
    nome: 'Provocada, causa corrigida',
    passageiro: 'Depois de 24 horas e da avaliação médica.',
    norma: { faa: 'Adiar para a FAA depois de 1 ano de recuperação.', icao: 'Crise sintomática aguda (hipoglicemia, hipóxia, sódio baixo) permite certificação.', anac: 'Examinador julga com a ANAC.' },
  },
  unica: {
    nome: 'Única, sem causa',
    passageiro: 'Depois de 24 horas e da avaliação médica.',
    norma: { faa: '4 anos de recuperação, os 2 últimos sem anticonvulsivante; decisão da FAA.', icao: '4 anos sem crise e sem remédio, com exames normais.', anac: 'Examinador julga com a ANAC; EEG epileptiforme impede.' },
  },
  epilepsia: {
    nome: 'Epilepsia (duas ou mais)',
    passageiro: 'Controlada: pode voar. Crise no último mês ou não controlada: liberação médica.',
    norma: { faa: '10 anos sem crise, os 3 últimos sem remédio; autorização especial da FAA.', icao: 'Impedimento, em geral permanente; só com remissão garantida.', anac: 'Inapto.' },
  },
};

export function PrazoConvulsao() {
  const [c, setC] = useState<Crise>('unica');
  const [n, setN] = useState<Norma>('faa');
  const k = CRISES[c];
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quando volta a voar depois de uma convulsão" instrucao="Escolha o tipo de crise e a autoridade para ver o prazo do passageiro e do tripulante.">
      <Opcoes itens={(Object.keys(CRISES) as Crise[]).map((x) => [x, CRISES[x].nome] as [Crise, string])} valor={c} onChange={setC} colunas={2} />
      <Opcoes itens={[['faa', 'FAA'], ['icao', 'ICAO'], ['anac', 'ANAC']] as [Norma, string][]} valor={n} onChange={setN} colunas={3} />
      <View style={styles.leituras}>
        <Leitura rotulo="Passageiro" valor={k.passageiro} cor={Cores.dourado} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Tripulante" valor={k.norma[n]} cor={c === 'epilepsia' ? Cores.erro : Cores.destaque} />
      </View>
      <Marca cor={Cores.textoSuave}>Para o passageiro, a CAA britânica pede pelo menos 24 horas depois de qualquer convulsão, com o remédio de emergência à mão.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Desmaio ou convulsão?
type Aspecto = 'postura' | 'aviso' | 'duracao' | 'abalos' | 'depois';
const ASPECTOS: Record<Aspecto, { nome: string; desmaio: string; convulsao: string }> = {
  postura: { nome: 'Posição', desmaio: 'Quase sempre em pé; raro sentado; quase nunca deitado', convulsao: 'Em qualquer posição, inclusive dormindo' },
  aviso: { nome: 'Aviso antes', desmaio: '2 a 5 min: visão escura, enjoo, suor, bocejo', convulsao: 'Às vezes uma aura breve, como déjà-vu' },
  duracao: { nome: 'Duração', desmaio: '10 a 15 segundos', convulsao: 'Rigidez de 15 a 20 s; tudo em 1 a 2 min' },
  abalos: { nome: 'Abalos', desmaio: 'Breves, em 10% dos desmaios', convulsao: 'Rigidez e depois sacudidas ritmadas' },
  depois: { nome: 'Depois', desmaio: 'Pouca ou nenhuma confusão', convulsao: 'Confusão, sono, dor no corpo, língua mordida' },
};

export function DesmaioConvulsao() {
  const [a, setA] = useState<Aspecto>('postura');
  const k = ASPECTOS[a];
  return (
    <MolduraMidia tipo="Comparador" titulo="Desmaio ou convulsão?" instrucao="Escolha um aspecto para comparar o desmaio vasovagal com a convulsão. A história contada por quem viu é o que mais ajuda o médico.">
      <Opcoes itens={(Object.keys(ASPECTOS) as Aspecto[]).map((x) => [x, ASPECTOS[x].nome] as [Aspecto, string])} valor={a} onChange={setA} colunas={3} />
      <View style={styles.leituras}>
        <Leitura rotulo="Desmaio" valor={k.desmaio} cor={Cores.dourado} />
        <Leitura rotulo="Convulsão" valor={k.convulsao} cor={Cores.erro} />
      </View>
      <Marca cor={Cores.textoSuave}>Abalos curtos e perda de urina acontecem em 10% dos desmaios e não bastam para chamar o episódio de convulsão.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Remédios de enxaqueca e prazo para voar (FAA)
type Rem = 'sumatriptano' | 'rizatriptano' | 'eletriptano' | 'rimegepanto' | 'dhe' | 'ondansetrona' | 'metoclopramida' | 'prometazina' | 'topiramato' | 'butalbital';
const REMEDIOS: Record<Rem, { nome: string; horas: number | null; nota: string }> = {
  sumatriptano: { nome: 'Sumatriptano', horas: 24, nota: 'Triptano: só uso ocasional.' },
  rizatriptano: { nome: 'Rizatriptano', horas: 24, nota: 'Triptano: só uso ocasional.' },
  eletriptano: { nome: 'Eletriptano', horas: 48, nota: 'Dura mais no corpo, como o frovatriptano.' },
  rimegepanto: { nome: 'Rimegepanto', horas: 24, nota: 'Gepanto: só uso ocasional.' },
  dhe: { nome: 'DHE nasal', horas: 48, nota: 'Di-hidroergotamina em spray nasal, uso ocasional.' },
  ondansetrona: { nome: 'Ondansetrona', horas: 24, nota: 'Contra o enjoo da crise.' },
  metoclopramida: { nome: 'Metoclopramida', horas: 36, nota: 'Contra o enjoo da crise.' },
  prometazina: { nome: 'Prometazina', horas: 96, nota: 'Dá muito sono.' },
  topiramato: { nome: 'Topiramato', horas: null, nota: 'Preventivo proibido para tripulantes, assim como valproato, tricíclicos e gabapentina.' },
  butalbital: { nome: 'Butalbital', horas: null, nota: 'Proibido, assim como os opioides.' },
};

export function RemediosEnxaqueca() {
  const [r, setR] = useState<Rem>('sumatriptano');
  const [h, setH] = useState(12);
  const k = REMEDIOS[r];
  const pode = k.horas !== null && h >= k.horas;
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 340), x0 = 12, x1 = W - 12, X = (v: number) => x0 + (Math.min(v, 120) / 120) * (x1 - x0);
  return (
    <MolduraMidia tipo="Calculadora" titulo="Remédio de enxaqueca e prazo para voar" instrucao="Para o tripulante, pela FAA: escolha o remédio e quantas horas se passaram desde a dose.">
      <Opcoes itens={(Object.keys(REMEDIOS) as Rem[]).map((x) => [x, REMEDIOS[x].nome] as [Rem, string])} valor={r} onChange={setR} colunas={2} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={56}>
          <Rect x={x0} y={20} width={x1 - x0} height={12} rx={6} fill={Cores.trilha} />
          {k.horas !== null ? <Rect x={x0} y={20} width={X(k.horas) - x0} height={12} rx={6} fill={Cores.erro} fillOpacity={0.45} /> : <Rect x={x0} y={20} width={x1 - x0} height={12} rx={6} fill={Cores.erro} fillOpacity={0.45} />}
          {k.horas !== null ? <Line x1={X(k.horas)} y1={14} x2={X(k.horas)} y2={38} stroke={Cores.erro} strokeWidth={2} /> : null}
          <Circle cx={X(h)} cy={26} r={7} fill={Cores.destaque} />
          <SvgText x={x0} y={50} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="start">DOSE</SvgText>
          <SvgText x={x1} y={50} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">120 H</SvgText>
          {k.horas !== null ? <SvgText x={X(k.horas)} y={10} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor={k.horas > 90 ? 'end' : 'middle'}>{`${k.horas} H`}</SvgText> : null}
        </Svg>
      </View>
      <Controle min={0} max={120} passo={2} valor={h} onChange={setH} rotulo="Horas desde a dose" formatar={(v) => `${fmt(v)} h`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Prazo" valor={k.horas === null ? 'Não aceito' : `${k.horas} horas`} cor={Cores.textoSuave} />
        <Leitura rotulo="Pode voar?" valor={k.horas === null ? 'Não' : pode ? 'Sim' : 'Ainda não'} cor={pode ? Cores.acerto : Cores.erro} />
      </View>
      <Marca cor={k.horas === null ? Cores.erro : Cores.dourado}>{k.nota}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Dias depois do AVC ou do AIT (passageiro)
export function PrazoAvc() {
  const [tipo, setTipo] = useState<'avc' | 'ait'>('avc');
  const [d, setD] = useState(3);
  let txt: string, cor: string;
  if (tipo === 'ait') {
    if (d <= 2) [txt, cor] = ['Ainda não: a IATA e a CAA britânica pedem pelo menos 2 dias e a investigação feita.', Cores.erro];
    else [txt, cor] = ['Pode voar se o AIT foi investigado e não se repetiu. AITs repetidos ou em crescendo impedem o voo.', Cores.acerto];
  } else if (d <= 4) [txt, cor] = ['Não voar: pela IATA, o AVC não é aceito até o 4º dia.', Cores.erro];
  else if (d <= 14) [txt, cor] = ['Só estável, com acompanhante de enfermagem e oxigênio a bordo (IATA). A CAA britânica aconselha esperar 2 semanas.', Cores.dourado];
  else if (d <= 28) [txt, cor] = ['Pode voar se estável, com relatório médico e ajuda se houver fraqueza. A AsMA fala em 2 a 4 semanas de observação, conforme a gravidade.', Cores.acerto];
  else [txt, cor] = ['Pode voar com o relatório médico, se estável. Peça cadeira de rodas se houver fraqueza.', Cores.acerto];
  const [larg, setLarg] = useState(300);
  const max = tipo === 'ait' ? 7 : 30;
  const W = Math.min(larg, 340), x0 = 12, x1 = W - 12, X = (v: number) => x0 + (Math.min(v, max) / max) * (x1 - x0);
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quantos dias depois do AVC dá para voar" instrucao="Para o passageiro: escolha AVC ou AIT e quantos dias se passaram.">
      <Opcoes itens={[['avc', 'AVC'], ['ait', 'AIT']] as ['avc' | 'ait', string][]} valor={tipo} onChange={(v) => { setTipo(v); setD(v === 'ait' ? 1 : 3); }} colunas={2} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={52}>
          {tipo === 'avc' ? (
            <>
              <Rect x={X(0)} y={18} width={X(4.5) - X(0)} height={12} fill={Cores.erro} fillOpacity={0.5} />
              <Rect x={X(4.5)} y={18} width={X(14.5) - X(4.5)} height={12} fill={Cores.dourado} fillOpacity={0.5} />
              <Rect x={X(14.5)} y={18} width={X(30) - X(14.5)} height={12} fill={Cores.acerto} fillOpacity={0.45} />
              <SvgText x={X(4.5)} y={46} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">5º DIA</SvgText>
              <SvgText x={X(14.5)} y={46} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">2 SEMANAS</SvgText>
            </>
          ) : (
            <>
              <Rect x={X(0)} y={18} width={X(2.5) - X(0)} height={12} fill={Cores.erro} fillOpacity={0.5} />
              <Rect x={X(2.5)} y={18} width={X(7) - X(2.5)} height={12} fill={Cores.acerto} fillOpacity={0.45} />
              <SvgText x={X(2.5)} y={46} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">2 DIAS</SvgText>
            </>
          )}
          <Circle cx={X(d)} cy={24} r={7} fill={Cores.destaque} />
        </Svg>
      </View>
      <Controle min={tipo === 'ait' ? 1 : 1} max={max} passo={1} valor={d} onChange={setD} rotulo="Dias desde o evento" formatar={(v) => `${fmt(v)} ${v === 1 ? 'dia' : 'dias'}`} />
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>Tripulante: inapto; a volta é avaliada depois de 1 a 2 anos (ICAO e FAA).</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Gravidade do trauma craniano
export function GravidadeTce() {
  // Escala do deslizante: 0–100 → de minutos a dias (logarítmica).
  const [p, setP] = useState(25);
  const h = Math.round(Math.pow(10, -1.2 + (p / 100) * 3.6) * 100) / 100;
  const [sangue, setSangue] = useState<'nao' | 'sim'>('nao');
  const grave = sangue === 'sim' || h > 24;
  const nivel = grave ? (h > 24 * 7 ? 'Muito grave' : 'Grave') : h > 1 ? 'Moderado' : 'Leve';
  const faa = grave ? '5 anos' : h > 1 ? '12 meses' : '6 meses';
  const icao = grave ? '2 anos ou mais (até 5 nos casos mais graves)' : h > 1 ? 'Conforme as sequelas: déficit focal, 6 meses a 2 anos; hematoma epidural, 1 a 2 anos' : '3 a 6 meses sem sintomas';
  const cor = grave ? Cores.erro : h > 1 ? Cores.dourado : Cores.acerto;
  const rot = (v: number) => (v < 1 ? `${fmt(v * 60)} min` : v < 48 ? `${fmt(v)} h` : `${fmt(v / 24)} dias`);
  return (
    <MolduraMidia tipo="Classificador" titulo="Gravidade do trauma craniano" instrucao="Escolha quanto tempo durou a amnésia depois da pancada (até a memória voltar sem falhas) e se houve sangue no cérebro.">
      <Controle min={0} max={100} passo={1} valor={p} onChange={setP} rotulo="Amnésia pós-traumática" formatar={() => rot(h)} />
      <Opcoes itens={[['nao', 'Sem sangue no cérebro'], ['sim', 'Sangue, contusão ou hematoma']] as ['nao' | 'sim', string][]} valor={sangue} onChange={setSangue} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Classificação" valor={nivel} cor={cor} />
        <Leitura rotulo="FAA" valor={faa} cor={cor} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="ICAO" valor={icao} cor={Cores.textoSuave} />
      </View>
      <Marca cor={Cores.textoSuave}>Prazos para o tripulante, sempre com decisão da autoridade. Das pessoas que terão epilepsia depois do trauma, 50% têm a primeira crise em 6 meses, 75% no primeiro ano e 90% em 2 anos.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Doenças degenerativas e do movimento
type Doenca = 'tremor' | 'parkinson' | 'em' | 'agt' | 'demencia';
const DOENCAS: Record<Doenca, { nome: string; tripulante: string; passageiro: string; remedio: string }> = {
  tremor: { nome: 'Tremor essencial', tripulante: 'Não impede sem prejuízo da função; com tratamento, 3 meses de observação (ICAO)', passageiro: 'Pode voar', remedio: 'Propranolol aceito; primidona não (dá sono)' },
  parkinson: { nome: 'Parkinson', tripulante: 'O diagnóstico não impede por si; reavaliação periódica (ICAO)', passageiro: 'Pode voar; remédios no horário, assistência se precisar', remedio: 'Levodopa pode ser aceita; agonistas dopaminérgicos não' },
  em: { nome: 'Esclerose múltipla', tripulante: 'Impede de início; 3 meses (leve) a 6 a 12 meses de estabilidade depois do surto (ICAO)', passageiro: 'Pode voar; assistência se houver fraqueza', remedio: 'Imunomoduladores não impedem' },
  agt: { nome: 'Amnésia global transitória', tripulante: '1 ano ou mais sem episódio (ICAO)', passageiro: 'Pode voar depois da avaliação', remedio: 'Sem remédio específico' },
  demencia: { nome: 'Demência', tripulante: 'Inapto (ANAC: doença que interfere na função)', passageiro: 'Com acompanhante que conheça a rotina', remedio: 'Remédio de comportamento à mão, se o médico indicar' },
};

export function DoencasProgressivas() {
  const [d, setD] = useState<Doenca>('parkinson');
  const k = DOENCAS[d];
  return (
    <MolduraMidia tipo="Comparador" titulo="Doenças do movimento e da memória" instrucao="Escolha a doença para ver o que muda para o tripulante, para o passageiro e nos remédios.">
      <Opcoes itens={(Object.keys(DOENCAS) as Doenca[]).map((x) => [x, DOENCAS[x].nome] as [Doenca, string])} valor={d} onChange={setD} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Tripulante" valor={k.tripulante} cor={Cores.destaque} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Passageiro" valor={k.passageiro} cor={Cores.acerto} />
        <Leitura rotulo="Remédios" valor={k.remedio} cor={Cores.dourado} />
      </View>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
