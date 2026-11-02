import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M2V2 · Coração e vasos sanguíneos. Fontes no registro de src/data/capitulos/coracao.ts: RBAC 67.79
// (ANAC), Guia do AME (FAA), Doc 8984 (ICAO), UK CAA (passageiro), CDC Yellow Book (trombose). Sem fonte: [confirmar na
// referência].
const fmt = (n: number) => n.toLocaleString('pt-BR');

function Marca({ cor, children }: { cor: string; children: string }) {
  return (
    <View style={[styles.marca, { borderLeftColor: cor }]}>
      <Texto>{children}</Texto>
    </View>
  );
}

// ---------------------------------------------------------------- Pressão alta: a mesma medida em três normas
export function PressaoNormas() {
  const [pas, setPas] = useState(138);
  const [pad, setPad] = useState(88);
  const anac = pas > 140 || pad > 90;
  const faa = pas > 155 || pad > 95;
  const icao = pas > 160 || pad > 95 ? 'Desqualifica se for consistente' : pas >= 140 || pad >= 90 ? 'Acima da meta: tratar' : 'Dentro da meta';
  const corIcao = pas > 160 || pad > 95 ? Cores.erro : pas >= 140 || pad >= 90 ? Cores.dourado : Cores.acerto;
  return (
    <MolduraMidia tipo="Comparador" titulo="A mesma pressão em três normas" instrucao="Arraste até a pressão medida em repouso. O limite vale para a pressão mantida, em medidas repetidas.">
      <Deslizante min={100} max={200} passo={1} valor={pas} onChange={setPas} rotulo="Sistólica (a maior)" formatar={(v) => `${fmt(v)} mmHg`} />
      <Deslizante min={60} max={130} passo={1} valor={pad} onChange={setPad} rotulo="Diastólica (a menor)" formatar={(v) => `${fmt(v)} mmHg`} />
      <View style={styles.leituras}>
        <Leitura rotulo="ANAC (140 × 90)" valor={anac ? 'Não apto' : 'Dentro'} cor={anac ? Cores.erro : Cores.acerto} />
        <Leitura rotulo="FAA (155/95)" valor={faa ? 'Não emite' : 'Dentro'} cor={faa ? Cores.erro : Cores.acerto} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="ICAO (meta 140/90; 160/95)" valor={icao} cor={corIcao} />
      </View>
      <Marca cor={Cores.dourado}>Passageiro: a norma não fixa número. Pressão tratada e controlada não impede o voo; pressão não controlada impede.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Coronária: prazos de passageiro e tripulante
type EventoCoracao = 'iam' | 'iamComplicado' | 'stent' | 'ponte';
const EVENTOS: Record<EventoCoracao, { nome: string; passageiro: [number, number]; anac: number; faa: number; icao: number; nota: string }> = {
  iam: { nome: 'Infarto sem complicação', passageiro: [7, 10], anac: 365, faa: 90, icao: 180, nota: 'Antes de 7 dias, o voo é contraindicado.' },
  iamComplicado: { nome: 'Infarto com complicação', passageiro: [28, 42], anac: 365, faa: 90, icao: 180, nota: 'Contraindicado nas primeiras 4 a 6 semanas.' },
  stent: { nome: 'Angioplastia com stent', passageiro: [3, 3], anac: 180, faa: 90, icao: 180, nota: 'Sem complicação; avaliação individual.' },
  ponte: { nome: 'Ponte de safena', passageiro: [10, 14], anac: 180, faa: 180, icao: 180, nota: 'Antes de 10 dias, o voo é contraindicado: o ar no tórax precisa ser reabsorvido.' },
};

function Prazo({ rotulo, dias, passados }: { rotulo: string; dias: number; passados: number }) {
  const falta = Math.max(dias - passados, 0);
  return <Leitura rotulo={rotulo} valor={falta === 0 ? 'Prazo cumprido' : `Faltam ${fmt(falta)} dias`} cor={falta === 0 ? Cores.acerto : Cores.erro} />;
}

export function PrazoCoracao() {
  const [ev, setEv] = useState<EventoCoracao>('iam');
  const [passados, setPassados] = useState(14);
  const p = EVENTOS[ev];
  const [min, max] = p.passageiro;
  const corP = passados >= max ? Cores.acerto : passados >= min ? Cores.dourado : Cores.erro;
  const textoP = passados >= max ? 'Prazo cumprido' : passados >= min ? 'Na faixa: avaliação individual' : `Faltam ${fmt(min - passados)} dias`;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quando voltar a voar depois do coração" instrucao="Escolha o evento e quantos dias já passaram. O prazo do tripulante é de meses e muda com a autoridade.">
      <Opcoes itens={(Object.keys(EVENTOS) as EventoCoracao[]).map((k) => [k, EVENTOS[k].nome] as [EventoCoracao, string])} valor={ev} onChange={setEv} />
      <Deslizante min={0} max={400} passo={1} valor={passados} onChange={setPassados} rotulo="Dias desde o evento" formatar={(v) => `${fmt(v)} dias`} />
      <View style={styles.leituras}>
        <Leitura rotulo={min === max ? `Passageiro (${fmt(min)} dias)` : `Passageiro (${fmt(min)} a ${fmt(max)} dias)`} valor={textoP} cor={corP} />
        <Prazo rotulo="Tripulante · ANAC" dias={p.anac} passados={passados} />
        <Prazo rotulo="Tripulante · FAA" dias={p.faa} passados={passados} />
        <Prazo rotulo="Tripulante · ICAO" dias={p.icao} passados={passados} />
      </View>
      <Marca cor={corP}>{p.nota}</Marca>
      <Texto cor={Cores.textoApagado}>Tripulante: o prazo é só o começo. Depois dele vêm os exames e a decisão da autoridade; na ANAC, apto com restrição e validade de até 6 meses.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Prolapso mitral: critérios do RBAC 67.79(a)(13)
const CRITERIOS_PROLAPSO: [string, string][] = [
  ['sintomas', 'Não tem sintomas'],
  ['arritmia', 'Não tem arritmia'],
  ['doenca', 'Não tem outra doença do coração'],
  ['esteira', 'Teste ergométrico máximo sem arritmia nem isquemia'],
  ['holter', 'Holter de 24 horas sem arritmia nem isquemia'],
  ['eco', 'Ecocardiograma sem alteração do fluxo nem degeneração mixomatosa'],
];

export function ProlapsoMitral() {
  const [ok, setOk] = useState<string[]>([]);
  const alternar = (v: string) => setOk((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));
  const todos = ok.length === CRITERIOS_PROLAPSO.length;
  return (
    <MolduraMidia tipo="Verificador" titulo="O prolapso mitral é aceito pela ANAC?" instrucao="Marque o que vale para o candidato. São os critérios do RBAC 67 para o prolapso da valva mitral.">
      <Opcoes itens={CRITERIOS_PROLAPSO} ativos={ok} onChange={alternar} colunas={1} />
      <View style={styles.leituras}>
        <Leitura rotulo="Critérios cumpridos" valor={`${ok.length} de ${CRITERIOS_PROLAPSO.length}`} cor={todos ? Cores.acerto : Cores.dourado} />
      </View>
      <Marca cor={todos ? Cores.acerto : Cores.erro}>
        {todos ? 'Todos os critérios cumpridos: o prolapso não impede o certificado.' : 'Falta critério: o prolapso torna o candidato não apto até a situação mudar.'}
      </Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Insuficiência cardíaca: classe da NYHA e oxigênio
type ClasseNYHA = 'I' | 'II' | 'III' | 'IV';
const NYHA: Record<ClasseNYHA, { texto: string; oxigenio: boolean }> = {
  I: { texto: 'Sem sintomas e sem limitação nas atividades comuns.', oxigenio: false },
  II: { texto: 'Sintomas leves e pouca limitação nas atividades comuns; bem em repouso.', oxigenio: false },
  III: { texto: 'Limitação marcada: sintomas em atividades menores que as comuns; bem só em repouso.', oxigenio: true },
  IV: { texto: 'Sintomas até em repouso.', oxigenio: true },
};

export function NyhaOxigenio() {
  const [c, setC] = useState<ClasseNYHA>('II');
  const [piorou, setPiorou] = useState(false);
  const n = NYHA[c];
  const cor = piorou ? Cores.erro : n.oxigenio ? Cores.dourado : Cores.acerto;
  return (
    <MolduraMidia tipo="Classificador" titulo="A classe da NYHA e o oxigênio no avião" instrucao="Escolha a classe que descreve o dia a dia e diga se houve piora recente.">
      <Opcoes itens={(Object.keys(NYHA) as ClasseNYHA[]).map((k) => [k, `Classe ${k}`] as [ClasseNYHA, string])} valor={c} onChange={setC} />
      <Texto cor={Cores.textoSuave}>{n.texto}</Texto>
      <Opcoes itens={[['nao', 'Estável'], ['sim', 'Piorou nos últimos dias']]} valor={piorou ? 'sim' : 'nao'} onChange={(v) => setPiorou(v === 'sim')} />
      <View style={styles.leituras}>
        <Leitura rotulo="Passageiro" valor={piorou ? 'Não voar' : n.oxigenio ? 'Oxigênio a bordo' : 'Pode voar'} cor={cor} />
      </View>
      <Marca cor={cor}>
        {piorou
          ? 'Insuficiência descompensada impede o voo até estabilizar.'
          : n.oxigenio
            ? 'Classe III ou IV, ou PaO2 abaixo de 70 mmHg no solo: oxigênio a bordo, combinado com a companhia pelo MEDIF.'
            : 'Estável na classe I ou II: pode voar com os remédios na bagagem de mão.'}
      </Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Trombose: risco e prevenção no voo longo
const FATORES: [string, string][] = [
  ['tev', 'Já teve trombose ou embolia'],
  ['cirurgia', 'Cirurgia, internação ou trauma recentes'],
  ['cancer', 'Câncer ativo'],
  ['hormonio', 'Pílula ou reposição com estrogênio'],
  ['gestacao', 'Gestação ou pós-parto'],
  ['obesidade', 'Obesidade (IMC de 30 ou mais)'],
  ['idade', 'Mais de 40 anos'],
  ['imobilidade', 'Pouca mobilidade, gesso na perna'],
  ['trombofilia', 'Trombofilia ou casos na família'],
];

export function RiscoTrombose() {
  const [horas, setHoras] = useState(10);
  const [f, setF] = useState<string[]>([]);
  const alternar = (v: string) => setF((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));
  const longo = horas > 4;
  const alto = longo && f.length > 0;
  const cor = alto ? Cores.dourado : Cores.acerto;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Trombose no voo: o que fazer" instrucao="Escolha a duração do voo e marque os fatores de risco que se aplicam.">
      <Deslizante min={1} max={18} passo={1} valor={horas} onChange={setHoras} rotulo="Duração do voo" formatar={(v) => `${fmt(v)} horas`} />
      <Opcoes itens={FATORES} ativos={f} onChange={alternar} colunas={1} />
      <View style={styles.leituras}>
        <Leitura rotulo="Fatores marcados" valor={fmt(f.length)} />
        <Leitura rotulo="Prevenção" valor={alto ? 'Reforçada' : 'Para todos'} cor={cor} />
      </View>
      <Marca cor={Cores.acerto}>Para todos: caminhar pelo corredor, exercitar a panturrilha e preferir o assento do corredor.</Marca>
      {alto ? <Marca cor={Cores.dourado}>Voo longo com fator de risco: meia de compressão abaixo do joelho, com 15 a 30 mmHg no tornozelo; heparina só se o médico indicar.</Marca> : null}
      <Texto cor={Cores.textoApagado}>Nos voos de mais de 4 horas, a trombose aparece em cerca de 1 a cada 4.656 a 6.000 viagens, quase sempre 1 a 2 semanas depois.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});
