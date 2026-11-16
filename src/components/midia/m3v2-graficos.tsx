import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V2 · Farmacologia aeroespacial. Fontes no registro de src/data/capitulos/farmacologia.ts:
// FAA (AIM 8-1-1 e 8-1-2, OTC Medications for Pilots, Guide for AMEs: Sleep Aids e Erectile Dysfunction, 14 CFR 91.17);
// UK CAA (medicação para pilotos, v2.0, 2026); CASA; IFALPA (2019); NTSB SS-14/01; ANAC RBAC 91 e RBAC 120.
// Os recursos orientam e não substituem o médico, o examinador nem a autoridade.
const fmt = (n: number, c = 0) => n.toLocaleString('pt-BR', { minimumFractionDigits: c, maximumFractionDigits: c });

function Marca({ cor, children }: { cor: string; children: string }) {
  return (
    <View style={[styles.marca, { borderLeftColor: cor }]}>
      <Texto>{children}</Texto>
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

// ---------------------------------------------------------------- O remédio no corpo que voa (abertura)
type Classe = { nome: string; corpo: string; cabine: string; fazer: string };
const CLASSES: Classe[] = [
  { nome: 'Antialérgico antigo', corpo: 'Atravessa para o cérebro e bloqueia a histamina, que ajuda a mantê-lo acordado.', cabine: 'Com menos oxigênio, o sono e a lentidão pesam mais.', fazer: 'Preferir os antialérgicos que não dão sono, testados no solo.' },
  { nome: 'Remédio para dormir', corpo: 'Deprime o sistema nervoso para induzir o sono.', cabine: 'No passageiro idoso, soma confusão, quedas e horas imóvel.', fazer: 'Tripulante: uso ocasional, com o prazo inteiro antes do voo.' },
  { nome: 'Remédio de pressão', corpo: 'Relaxa os vasos ou tira água do corpo.', cabine: 'O ar seco e as horas sentado somam a queda ao levantar.', fazer: 'Beber água, levantar devagar e cumprir o afastamento inicial.' },
  { nome: 'Opioide', corpo: 'Deprime o sistema nervoso e o centro da respiração.', cabine: 'A respiração mais fraca soma com a hipóxia da cabine.', fazer: 'Tripulante: fora do voo durante o uso e o prazo de espera.' },
  { nome: 'Remédio contra enjoo', corpo: 'Os mais comuns são antialérgicos que agem no cérebro.', cabine: 'Dão sono, e o sono continua depois do pouso.', fazer: 'Passageiro: testar em casa e não dirigir enquanto durar o sono.' },
  { nome: 'Descongestionante', corpo: 'Estimula o sistema simpático e contrai os vasos.', cabine: 'Coração acelerado e pressão alta, piores com café.', fazer: 'Preferir soro ou corticoide no nariz.' },
];

export function RemedioVoo() {
  const [i, setI] = useState(0);
  const k = CLASSES[i];
  return (
    <MolduraMidia tipo="Explorador" titulo="O remédio no corpo que voa" instrucao="Escolha um tipo de remédio para ver o mecanismo, o que a cabine soma e o que fazer.">
      <Opcoes itens={CLASSES.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} />
      <Bloco rotulo="No corpo" cor={Cores.destaque} texto={k.corpo} />
      <Bloco rotulo="Na cabine" cor={Cores.erro} texto={k.cabine} />
      <Bloco rotulo="O que fazer" cor={Cores.acerto} texto={k.fazer} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Semáforo dos remédios (tripulante)
type Item = { nome: string; sinal: 'sim' | 'cuidado' | 'nao'; texto: string };
const ITENS: Item[] = [
  { nome: 'Loratadina ou fexofenadina', sinal: 'sim', texto: 'Antialérgico que não dá sono: em geral aceito depois de 48 horas de teste no solo.' },
  { nome: 'Difenidramina', sinal: 'nao', texto: 'Antialérgico que dá sono: não voar e esperar 60 horas depois da última dose.' },
  { nome: 'Paracetamol ou ibuprofeno', sinal: 'sim', texto: 'Aceito se a doença de base permite voar.' },
  { nome: 'Codeína', sinal: 'nao', texto: 'Opioide: não aceito durante o uso nem no prazo de espera, mesmo com receita.' },
  { nome: 'Corticoide nasal', sinal: 'sim', texto: 'Ação local no nariz: em geral aceito.' },
  { nome: 'Descongestionante oral', sinal: 'cuidado', texto: 'Acelera o coração e sobe a pressão: cuidado, sobretudo com café e doença do coração.' },
  { nome: 'Zolpidem', sinal: 'cuidado', texto: 'Uso ocasional, nunca todas as noites: 24 horas de espera para a forma comum.' },
  { nome: 'Mefloquina', sinal: 'nao', texto: 'Não aceita pela autoridade britânica: desorientação espacial e mudança de humor.' },
  { nome: 'Sildenafila', sinal: 'cuidado', texto: 'Aceita sem efeito colateral: 8 horas de espera depois da dose.' },
  { nome: 'Bombinha de asma', sinal: 'sim', texto: 'Corticoide inalatório e broncodilatador aceitos; corticoide oral e teofilina não.' },
];
const SINAL = { sim: ['Em geral aceito', Cores.acerto], cuidado: ['Aceito com prazo ou cuidado', Cores.dourado], nao: ['Não voar', Cores.erro] } as const;

export function SemaforoRemedio() {
  const [i, setI] = useState(0);
  const k = ITENS[i];
  const [rotulo, cor] = SINAL[k.sinal];
  return (
    <MolduraMidia tipo="Simulador" titulo="Semáforo dos remédios do tripulante" instrucao="Escolha um remédio para ver se ele costuma ser aceito para o tripulante e com que prazo.">
      <Opcoes itens={ITENS.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={2} />
      <Bloco rotulo={rotulo} cor={cor} texto={k.texto} />
      <Texto cor={Cores.textoApagado}>Resumo das orientações da FAA e da autoridade britânica. O examinador decide cada caso.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Calculadora do prazo de espera
type Base = 'intervalo' | 'meia';
export function EsperaRemedio() {
  const [base, setBase] = useState<Base>('intervalo');
  const [horas, setHoras] = useState(8);
  const espera = horas * 5;
  const dias = espera / 24;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quanto esperar depois da última dose" instrucao="Escolha a base do cálculo e mova o tempo para ver a espera de cinco vezes recomendada pela FAA.">
      <Opcoes itens={[['intervalo', 'Intervalo entre as doses'], ['meia', 'Meia-vida máxima']] as [Base, string][]} valor={base} onChange={setBase} />
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>{base === 'intervalo' ? 'Intervalo entre as doses' : 'Meia-vida máxima'}</Texto>
          <Texto t="item" cor={Cores.destaque}>{`${fmt(horas)} h`}</Texto>
        </View>
        <Deslizante min={2} max={48} passo={1} valor={horas} onChange={setHoras} rotulo="Horas" />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Espera mínima" valor={`${fmt(espera)} h`} cor={espera >= 60 ? Cores.erro : Cores.dourado} />
        <Leitura rotulo="Em dias" valor={fmt(dias, 1)} cor={Cores.textoSuave} />
        <Leitura rotulo="Restante no sangue" valor="≈ 3%" cor={Cores.acerto} />
      </View>
      <Marca cor={Cores.dourado}>Exemplos da FAA: dose a cada 4 a 6 horas, 30 horas; a cada 8, 40 horas; a cada 12, 60 horas. Difenidramina e doxilamina, 60 horas; clorfeniramina e clemastina, 5 dias.</Marca>
      <Texto cor={Cores.textoApagado}>No Brasil, além do prazo, o RBAC 91 não aceita nenhuma concentração de álcool no organismo.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Combinações perigosas
type Comb = { nome: string; corpo: string; fazer: string };
const COMBS: Comb[] = [
  { nome: 'Remédio para dormir e álcool', corpo: 'Os dois deprimem o cérebro e a respiração: mais sono e reflexo mais lento.', fazer: 'Nunca juntar e respeitar o prazo de cada um.' },
  { nome: 'Bloqueador alfa e remédio para disfunção erétil', corpo: 'Os dois dilatam os vasos: a pressão pode cair ao levantar.', fazer: 'Confirmar no solo que não há queda de pressão antes de voar.' },
  { nome: 'Dois antigripais "noturnos"', corpo: 'O mesmo antialérgico entra duas vezes: dose dobrada e mais sono.', fazer: 'Ler a composição e usar um só produto.' },
  { nome: 'Descongestionante e café', corpo: 'Os dois estimulam o coração e sobem a pressão.', fazer: 'Reduzir o café e preferir soro ou corticoide no nariz.' },
  { nome: 'Calmante e hipóxia da cabine', corpo: 'O cérebro fica mais sensível à falta de oxigênio.', fazer: 'Tripulante: não voar no prazo de espera.' },
  { nome: 'Melatonina e fuso', corpo: 'Na hora errada, empurra o relógio para o lado errado e dá sono de dia.', fazer: 'Só com receita e horário combinado com o médico.' },
];

export function CombinaRemedio() {
  const [i, setI] = useState(0);
  const k = COMBS[i];
  return (
    <MolduraMidia tipo="Explorador" titulo="Combinações que pesam no voo" instrucao="Escolha uma combinação para ver o que acontece no corpo e o que fazer.">
      <Opcoes itens={COMBS.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={1} />
      <Bloco rotulo="No corpo" cor={Cores.erro} texto={k.corpo} />
      <Bloco rotulo="O que fazer" cor={Cores.acerto} texto={k.fazer} />
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
