import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M2V13 · Saúde da mulher. Fontes no registro de src/data/capitulos/mulher.ts: RBAC 67 Emenda 05
// (67.13, 67.93, 67.133, 67.213, 67.85); ICAO Anexo 1, 6.3.2.21; EASA MED.B.045; UK CAA Obstetrics and Gynaecology GM;
// FAA AME Guide (Pregnancy; Contraceptives and HRT); CDC Yellow Book; IATA Medical Manual; FSRH; NICE NG23.
// Os recursos orientam e não liberam voo.
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

function Bloco({ rotulo, cor, texto }: { rotulo: string; cor: string; texto: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
      <Marca cor={cor}>{texto}</Marca>
    </View>
  );
}

// Explorador genérico: escolher um item e ler o que acontece e o que fazer.
type Item = { nome: string; corpo: string; fazer: string };
function Explorador({ titulo, instrucao, itens, rotulo1, rotulo2 }: { titulo: string; instrucao: string; itens: Item[]; rotulo1: string; rotulo2: string }) {
  const [i, setI] = useState(0);
  const k = itens[i];
  return (
    <MolduraMidia tipo="Explorador" titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={itens.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={2} />
      <Bloco rotulo={rotulo1} cor={Cores.destaque} texto={k.corpo} />
      <Bloco rotulo={rotulo2} cor={Cores.dourado} texto={k.fazer} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- A mulher no voo (abertura)
const FASES: Item[] = [
  { nome: 'Ciclo menstrual', corpo: 'Cólica e sangramento intenso distraem; a anemia soma tontura à cabine a 8.000 ft.', fazer: 'Analgésico de costume, ferro se faltar e hemoglobina conferida antes do voo.' },
  { nome: 'Pílula combinada', corpo: 'O estrogênio aumenta a coagulação; no voo de mais de 4 h, a trombose fica mais provável.', fazer: 'Caminhar, mexer as panturrilhas, beber água e manter a pílula no horário de casa.' },
  { nome: 'Gestação', corpo: 'O feto tolera a cabine, mas o risco de trombose é pelo menos 5 vezes maior e a complicação fica longe de ajuda.', fazer: 'Respeitar o limite de semanas, usar o cinto abaixo da barriga e levar o atestado.' },
  { nome: 'Pós-parto', corpo: 'O sangue coagula ainda mais nas primeiras semanas, e a anemia e o cansaço pesam.', fazer: 'Voos curtos, pernas em movimento e, para a tripulante, novo exame de revalidação.' },
  { nome: 'Menopausa', corpo: 'Ondas de calor e sono ruim derrubam a atenção; a terapia hormonal oral aumenta a coagulação.', fazer: 'Roupa em camadas, sono protegido e via pela pele se o médico indicar.' },
];

export function MulherVoo() {
  return <Explorador titulo="A mulher no voo" instrucao="Escolha uma fase da vida para ver o que muda na cabine e o que fazer." itens={FASES} rotulo1="O que muda no voo" rotulo2="O que fazer" />;
}

// ---------------------------------------------------------------- Semanas de gestação e voo
type Quem = 'passageira' | 'anac' | 'easa' | 'faa';
export function GestacaoSemanas() {
  const [sem, setSem] = useState(24);
  const [multipla, setMultipla] = useState(false);
  const [quem, setQuem] = useState<Quem>('passageira');
  const limite = multipla ? 32 : 36;
  let txt = '', cor = Cores.acerto, situacao = 'Pode voar';
  if (quem === 'passageira') {
    if (sem >= limite) { txt = `Acima de ${limite} semanas: a maioria das companhias não aceita, e o parto pode começar a bordo.`; cor = Cores.erro; situacao = 'Não voar'; }
    else if (sem >= 28) { txt = 'Pode voar com atestado da data provável do parto e da gravidez sem complicação, se a companhia pedir.'; cor = Cores.dourado; situacao = 'Com atestado'; }
    else { txt = 'Pode voar se a gestação está sem complicação. Confira a semana também na data da volta.'; }
  } else if (quem === 'anac') {
    txt = 'RBAC 67: na 1ª e na 2ª classes, a tripulante é julgada não apta desde a confirmação da gravidez e informa o examinador ou a ANAC. Na 4ª classe, a gestação de baixo risco pode ser apta da 12ª à 26ª semana.'; cor = Cores.erro; situacao = 'Não voar';
  } else if (quem === 'easa') {
    if (sem > 26) { txt = 'Depois da 26ª semana, a piloto deixa de voar.'; cor = Cores.erro; situacao = 'Não voar'; }
    else { txt = 'Até o fim da 26ª semana, com avaliação obstétrica; na 1ª classe, só com outro piloto a bordo (OML).'; cor = Cores.dourado; situacao = 'Com limitação'; }
  } else {
    txt = 'FAA: a gravidez normal não desqualifica. O examinador aconselha sobre o terceiro trimestre e o uso do cinto.'; cor = sem >= 28 ? Cores.dourado : Cores.acerto; situacao = sem >= 28 ? 'Com orientação' : 'Pode voar';
  }
  return (
    <MolduraMidia tipo="Calculadora" titulo="Semanas de gestação e voo" instrucao="Escolha quem vai voar, o tipo de gestação e a semana na data do voo de volta.">
      <Opcoes itens={[['passageira', 'Passageira'], ['anac', 'Tripulante · ANAC'], ['easa', 'Tripulante · EASA'], ['faa', 'Tripulante · FAA']] as [Quem, string][]} valor={quem} onChange={setQuem} colunas={2} />
      <Opcoes itens={[[false, 'Gestação única'], [true, 'Gêmeos ou mais']] as [boolean, string][]} valor={multipla} onChange={setMultipla} colunas={2} />
      <Controle min={4} max={40} passo={1} valor={sem} onChange={setSem} rotulo="Semana da gestação" formatar={(v) => `${fmt(v)} sem`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Situação" valor={situacao} cor={cor} />
      </View>
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>Sangramento, contrações, perda de líquido ou pré-eclâmpsia impedem o voo em qualquer semana.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Parto, perda e voo
const EVENTOS: Item[] = [
  { nome: 'Parto normal', corpo: 'Passageira: decide o obstetra, com sangramento, pressão e hemoglobina estáveis. Tripulante: novo exame de revalidação.', fazer: 'Voos curtos, corredor e pernas em movimento nas primeiras semanas.' },
  { nome: 'Cesárea', corpo: 'É uma cirurgia abdominal: o gás e a ferida precisam se resolver. O prazo é do obstetra.', fazer: 'Analgésico que não dá sono e liberação do obstetra antes do voo.' },
  { nome: 'Aborto espontâneo', corpo: 'IATA: pode voar estável, sem sangramento e sem dor há pelo menos 24 h. Tripulante: relatório de recuperação completa.', fazer: 'Absorventes na bagagem de mão e atenção a febre ou sangramento que volta.' },
  { nome: 'Dor ou sangramento no começo da gravidez', corpo: 'Pode ser gravidez ectópica, cuja ruptura sangra por dentro.', fazer: 'Não voar: procurar atendimento antes do diagnóstico.' },
  { nome: 'Amamentação', corpo: 'Paracetamol e ibuprofeno são compatíveis. Engolir na subida e na descida abre o ouvido do bebê.', fazer: 'Oferecer o peito ou a mamadeira na subida e na descida; levar a bomba de leite.' },
];

export function PosPartoVoo() {
  return <Explorador titulo="Parto, perda e voo" instrucao="Escolha a situação para ver a regra e o que fazer." itens={EVENTOS} rotulo1="Quando pode voar" rotulo2="O que fazer" />;
}

// ---------------------------------------------------------------- Pílula e fuso horário (FSRH)
type Pilula = 'combinada' | 'tradicional' | 'desogestrel';
const JANELA: Record<Pilula, { nome: string; horas: number; base: number }> = {
  combinada: { nome: 'Combinada', horas: 24, base: 24 },
  tradicional: { nome: 'Só progestágeno tradicional', horas: 3, base: 24 },
  desogestrel: { nome: 'Desogestrel', horas: 12, base: 24 },
};

export function PilulaFuso() {
  const [p, setP] = useState<Pilula>('tradicional');
  const [fuso, setFuso] = useState(5);
  const [regra, setRegra] = useState<'local' | 'casa'>('local');
  const k = JANELA[p];
  // Tomar no novo horário local logo na chegada para o oeste alonga o intervalo em "fuso" horas.
  const atraso = regra === 'casa' ? 0 : Math.max(0, fuso);
  const ok = atraso <= k.horas;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Pílula e fuso horário" instrucao="Viajando para o oeste, o relógio volta. Escolha a pílula, as horas de fuso e quando tomar a próxima dose.">
      <Opcoes itens={(Object.keys(JANELA) as Pilula[]).map((x) => [x, JANELA[x].nome] as [Pilula, string])} valor={p} onChange={setP} colunas={1} />
      <Controle min={0} max={12} passo={1} valor={fuso} onChange={setFuso} rotulo="Horas de fuso para o oeste" formatar={(v) => `${fmt(v)} h`} />
      <Opcoes itens={[['local', 'No mesmo horário do relógio local'], ['casa', 'No horário de casa']] as ['local' | 'casa', string][]} valor={regra} onChange={setRegra} colunas={1} />
      <View style={styles.leituras}>
        <Leitura rotulo="Atraso da dose" valor={`${fmt(atraso)} h`} cor={ok ? Cores.acerto : Cores.erro} />
        <Leitura rotulo="Janela da pílula" valor={`${fmt(k.horas)} h`} cor={Cores.destaque} />
      </View>
      <Marca cor={ok ? Cores.acerto : Cores.erro}>
        {ok ? 'Dentro da janela: a proteção continua.' : 'Fora da janela: a dose conta como esquecida. Siga a bula para pílula esquecida e use preservativo até voltar a proteger.'}
      </Marca>
      <Texto cor={Cores.textoApagado}>Manter o horário de casa, ou adiantar as doses aos poucos, evita que o intervalo passe da janela.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Menopausa no voo
const SINTOMAS: Item[] = [
  { nome: 'Ondas de calor', corpo: 'Na cabine de comando quente, com fone e uniforme, o calor súbito incomoda e distrai.', fazer: 'Roupa em camadas, ventilação aberta, água e tratamento se forem frequentes.' },
  { nome: 'Sono ruim', corpo: 'Somado às noites de jornada e ao fuso, aumenta a fadiga e os erros.', fazer: 'Proteger o sono, usar o cochilo planejado e não assumir a função com sonolência.' },
  { nome: 'Terapia hormonal oral', corpo: 'O estrogênio oral aumenta a coagulação, e o voo longo soma imobilidade.', fazer: 'Caminhar e mexer as panturrilhas; perguntar ao médico sobre a via pela pele.' },
  { nome: 'Osso mais fraco', corpo: 'Sem estrogênio, o osso perde massa e quebra com mais facilidade na turbulência ou na evacuação.', fazer: 'Cálcio, vitamina D, exercício com carga e cinto afivelado.' },
  { nome: 'Remédio novo para os sintomas', corpo: 'Antidepressivos e gabapentina podem dar sono nas primeiras semanas.', fazer: 'Conferir com o examinador antes de voar; a FAA aceita só os ISRS do programa.' },
];

export function MenopausaVoo() {
  return <Explorador titulo="A menopausa no voo" instrucao="Escolha um sintoma ou tratamento para ver o efeito no voo e o que fazer." itens={SINTOMAS} rotulo1="O que acontece no voo" rotulo2="O que fazer" />;
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
