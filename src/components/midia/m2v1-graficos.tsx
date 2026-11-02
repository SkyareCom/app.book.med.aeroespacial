import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M2V1 · Pulmões, oxigênio e hipóxia (tópicos VI a IX). Fontes no registro de
// src/data/capitulos/hipoxia.ts: BTS 2022 (prazos do passageiro, teste de hipóxia, baterias do CPAP) e FAA, Guia do AME
// (CACI Asma; pneumotórax). Sem fonte: [confirmar na referência].
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

function Marca({ cor, children }: { cor: string; children: string }) {
  return (
    <View style={[styles.marca, { borderLeftColor: cor }]}>
      <Texto>{children}</Texto>
    </View>
  );
}

// ---------------------------------------------------------------- Asma: critérios de controle da FAA (CACI)
const CRITERIOS_ASMA: [string, string][] = [
  ['sintomas', 'Sintomas em até 2 dias por semana'],
  ['consultas', 'Até 2 consultas por crise no último ano'],
  ['corticoide', 'Até 2 cursos de corticoide oral por ano'],
  ['internacao', 'Nenhuma internação no último ano'],
  ['espirometria', 'VEF1 e CVF de 80% ou mais antes do broncodilatador'],
  ['remedios', 'Sem anticorpo monoclonal no tratamento'],
];

export function ControleAsma() {
  const [ok, setOk] = useState<string[]>([]);
  const alternar = (v: string) => setOk((a) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]));
  const todos = ok.length === CRITERIOS_ASMA.length;
  return (
    <MolduraMidia tipo="Verificador" titulo="A asma está controlada para a FAA?" instrucao="Marque o que vale para você. São os critérios do caminho simplificado da FAA para pilotos com asma.">
      <Opcoes itens={CRITERIOS_ASMA} ativos={ok} onChange={alternar} colunas={1} />
      <View style={styles.leituras}>
        <Leitura rotulo="Critérios cumpridos" valor={`${ok.length} de ${CRITERIOS_ASMA.length}`} cor={todos ? Cores.acerto : Cores.dourado} />
      </View>
      <Marca cor={todos ? Cores.acerto : Cores.dourado}>
        {todos
          ? 'FAA: o examinador pode emitir o certificado, com espirometria de até 90 dias. No Brasil, o RBAC 67 trata a asma como não apta na 1ª classe: leve o caso ao médico examinador.'
          : 'FAA: fora do caminho simplificado; a decisão passa a ser da própria FAA. No Brasil, o RBAC 67 trata a asma como não apta na 1ª classe.'}
      </Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Apneia: baterias do CPAP
export function BateriasCPAP() {
  const [viagem, setViagem] = useState(10);
  const [autonomia, setAutonomia] = useState(8);
  const precisa = viagem * 1.5;
  const baterias = Math.ceil(precisa / autonomia);
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quantas baterias levar para o CPAP" instrucao="Escolha a duração da viagem, de porta a porta, e quanto dura uma bateria do seu aparelho.">
      <Deslizante min={1} max={30} passo={1} valor={viagem} onChange={setViagem} rotulo="Duração da viagem" formatar={(v) => `${fmt(v)} horas`} />
      <Deslizante min={2} max={16} passo={1} valor={autonomia} onChange={setAutonomia} rotulo="Duração de uma bateria" formatar={(v) => `${fmt(v)} horas`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Autonomia a levar" valor={`${fmt(precisa, precisa % 1 ? 1 : 0)} horas`} />
        <Leitura rotulo="Baterias" valor={`${fmt(baterias)}`} cor={Cores.dourado} />
      </View>
      <Marca cor={Cores.dourado}>Leve baterias para 1,5 vez a duração da viagem e combine o aparelho e as baterias com a companhia antes de embarcar.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Pulmão: quando o passageiro pode voar
type Evento = 'pneumo' | 'cirurgia' | 'cirurgiaEssencial' | 'biopsia' | 'dpoc' | 'pneumonia' | 'tev';
const PRAZOS: Record<Evento, { nome: string; dias: number; conta: string; tripulante: string }> = {
  pneumo: { nome: 'Pneumotórax', dias: 7, conta: 'Conta-se a partir da resolução completa no raio X.', tripulante: 'Tripulante: pela FAA, espontâneo com decisão da FAA após a resolução e sem bolhas; traumático, 3 meses.' },
  cirurgia: { nome: 'Cirurgia no tórax', dias: 28, conta: 'Conta-se a partir da retirada do dreno.', tripulante: 'Tripulante: a critério do médico examinador [confirmar na referência].' },
  cirurgiaEssencial: { nome: 'Cirurgia, viagem essencial', dias: 14, conta: 'Conta-se a partir da retirada do dreno.', tripulante: 'Tripulante: a critério do médico examinador [confirmar na referência].' },
  biopsia: { nome: 'Biópsia ou broncoscopia', dias: 7, conta: 'Conta-se a partir do procedimento ou, se houve pneumotórax, da resolução.', tripulante: 'Tripulante: [confirmar na referência].' },
  dpoc: { nome: 'Piora da DPOC', dias: 42, conta: 'Conta-se a partir da piora. O prazo é prudente, com poucos dados.', tripulante: 'Tripulante: não voar; nova avaliação do médico examinador.' },
  pneumonia: { nome: 'Pneumonia com saturação abaixo de 94%', dias: 7, conta: 'Conta-se a partir do diagnóstico, para viagem não essencial.', tripulante: 'Tripulante: não apto enquanto a infecção estiver ativa (RBAC 67).' },
  tev: { nome: 'Trombose ou embolia', dias: 14, conta: 'Conta-se a partir do diagnóstico.', tripulante: 'Tripulante: [confirmar na referência].' },
};

export function PrazoVooPulmao() {
  const [ev, setEv] = useState<Evento>('pneumo');
  const [passados, setPassados] = useState(3);
  const p = PRAZOS[ev];
  const faltam = Math.max(p.dias - passados, 0);
  const cor = faltam === 0 ? Cores.acerto : Cores.erro;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quando o passageiro pode voar" instrucao="Escolha o que aconteceu e quantos dias já passaram. Os prazos são da British Thoracic Society.">
      <Opcoes itens={(Object.keys(PRAZOS) as Evento[]).map((k) => [k, PRAZOS[k].nome] as [Evento, string])} valor={ev} onChange={setEv} />
      <Deslizante min={0} max={60} passo={1} valor={passados} onChange={setPassados} rotulo="Dias que já passaram" formatar={(v) => `${fmt(v)} dias`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Prazo do passageiro" valor={`${fmt(p.dias)} dias`} />
        <Leitura rotulo="Faltam" valor={faltam === 0 ? 'Prazo cumprido' : `${fmt(faltam)} dias`} cor={cor} />
      </View>
      <View style={[styles.marca, { borderLeftColor: cor }]}>
        <Texto>{p.conta}</Texto>
        <Texto cor={Cores.textoSuave}>{p.tripulante}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Teste de simulação de altitude
export function TesteHipoxia() {
  const [sat, setSat] = useState(88);
  const precisa = sat < 85;
  const cor = precisa ? Cores.erro : Cores.acerto;
  return (
    <MolduraMidia tipo="Simulação" titulo="O resultado do teste de hipóxia" instrucao="Arraste até a saturação medida respirando a mistura com 15% de oxigênio, que reproduz a cabine a 8.000 ft.">
      <Deslizante min={70} max={99} passo={1} valor={sat} onChange={setSat} rotulo="Saturação no teste" formatar={(v) => `${fmt(v)}%`} />
      <View style={styles.trilha}>
        <View style={[styles.faixa, { flex: 15, backgroundColor: Cores.erro }]} />
        <View style={[styles.faixa, { flex: 14, backgroundColor: Cores.acerto }]} />
      </View>
      <View style={styles.escala}>
        <Texto t="rodape" cor={Cores.textoApagado}>70%</Texto>
        <Texto t="rodape" cor={Cores.textoApagado}>85%</Texto>
        <Texto t="rodape" cor={Cores.textoApagado}>99%</Texto>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Oxigênio a bordo" valor={precisa ? 'Recomendado' : 'Não é necessário'} cor={cor} />
      </View>
      <Marca cor={cor}>
        {precisa
          ? 'Abaixo de 85%: oxigênio recomendado, ajustado para manter a saturação em 85% ou mais. Combine com a companhia, que costuma pedir o MEDIF.'
          : '85% ou mais (ou PaO2 de 6,6 kPa ou mais): o oxigênio a bordo não é necessário.'}
      </Marca>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  trilha: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', opacity: 0.7 },
  faixa: { height: 8 },
  escala: { flexDirection: 'row', justifyContent: 'space-between' },
});
