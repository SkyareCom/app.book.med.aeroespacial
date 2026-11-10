import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos da missão especial "Deficiências e o voo" e dos formulários MEDIF e FREMEC (página Liberação para voo).
// Fontes nos registros de src/data/deficiencias.ts e src/data/medif.ts. Os recursos orientam e não liberam voo.
const fmt = (n: number) => n.toLocaleString('pt-BR');

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

type Linha = { nome: string; passageiro: string; tripulante: string; grave?: boolean };

function Comparador<K extends string>({ titulo, instrucao, dados, inicial }: { titulo: string; instrucao: string; dados: Record<K, Linha>; inicial: K }) {
  const [k, setK] = useState<K>(inicial);
  const d = dados[k];
  return (
    <MolduraMidia tipo="Comparador" titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={(Object.keys(dados) as K[]).map((x) => [x, dados[x].nome] as [K, string])} valor={k} onChange={setK} colunas={1} />
      <Bloco rotulo="Passageiro" cor={Cores.acerto} texto={d.passageiro} />
      <Bloco rotulo="Tripulante" cor={d.grave ? Cores.erro : Cores.dourado} texto={d.tripulante} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Passageiro ou tripulante?
const PAPEL = {
  fisica: { nome: 'Deficiência física', passageiro: 'Assistência sem custo, cadeira como ajuda técnica e embarque prioritário.', tripulante: 'Avaliação funcional e prova de voo; limitação ao tipo de aeronave.' },
  visual: { nome: 'Deficiência visual', passageiro: 'Assistência, cão-guia na cabine sem custo e demonstração individual.', tripulante: 'Visão monocular: 6 meses de adaptação e teste; cegueira impede pilotar.', grave: true },
  auditiva: { nome: 'Deficiência auditiva', passageiro: 'Informar as ajudas de comunicação e pedir a demonstração individual.', tripulante: 'FAA: surdo voa onde o rádio não é exigido; ANAC: testes de fala.' },
  tea: { nome: 'Autismo', passageiro: 'PNAE; acompanhante se não entender as instruções de segurança.', tripulante: 'Avaliação individual; no Reino Unido, não desqualifica automaticamente.' },
  mental: { nome: 'Intelectual ou psicossocial', passageiro: 'Assistência; acompanhante se não entender as instruções de segurança.', tripulante: 'Avaliação mental e comportamental individual, com o remédio usado.' },
} satisfies Record<string, Linha>;
export function DeficienciaPapel() {
  return <Comparador titulo="Passageiro ou tripulante?" instrucao="Escolha a deficiência para ver o que muda para quem viaja e para quem trabalha a bordo." dados={PAPEL} inicial="fisica" />;
}

// ---------------------------------------------------------------- Amputações
const AMPUTACAO = {
  abaixo: { nome: 'Abaixo do joelho', passageiro: 'Pode voar; leve meias de ajuste: o coto muda de volume na cabine.', tripulante: 'Em geral voa com a prótese, de tornozelo fixo, após prova de voo; FAA: SODA.' },
  acima: { nome: 'Acima do joelho', passageiro: 'Pode voar; assistência e cadeira se precisar.', tripulante: 'Reino Unido: muitas vezes voa sem a prótese, com técnica nos pedais, após prova de voo.' },
  duas: { nome: 'Das duas pernas', passageiro: 'Pode voar como WCHS ou WCHC, conforme a função.', tripulante: 'Em geral só com comando manual aprovado, no Reino Unido só para voo privado.', grave: true },
  braco: { nome: 'De membro superior', passageiro: 'Pode voar; prótese eletrônica carregada, carregador na bagagem de mão.', tripulante: 'Prótese com pinça firme; 1ª classe: pinça do polegar em cada mão.' },
  fantasma: { nome: 'Dor fantasma com remédio', passageiro: 'Pode voar; cuidado com o sono do remédio.', tripulante: 'O remédio tende a ser desqualificante.', grave: true },
} satisfies Record<string, Linha>;
export function AmputacaoVoo() {
  return <Comparador titulo="Amputação: viajar e pilotar" instrucao="Escolha o tipo de amputação." dados={AMPUTACAO} inicial="abaixo" />;
}

// ---------------------------------------------------------------- Categorias de cadeira de rodas (Res. 280/2013)
const CADEIRA = {
  WCHR: { nome: 'WCHR', passageiro: 'Sobe escada e anda até o assento; usa cadeira só nas distâncias longas.', tripulante: 'Embarque por escada ou ponte.' },
  WCHS: { nome: 'WCHS', passageiro: 'Anda até o assento, mas não sobe escada.', tripulante: 'Ponte de embarque ou equipamento de ascenso.' },
  WCHC: { nome: 'WCHC', passageiro: 'Não se desloca sozinho: é levado até o assento.', tripulante: 'Ponte ou equipamento de ascenso; preferência no corredor, junto às portas e sanitários.' },
  STCR: { nome: 'STCR (maca)', passageiro: 'Viaja deitado, com acompanhante obrigatório.', tripulante: 'Ponte ou equipamento de ascenso; MEDIF em geral pedido.', grave: true },
} satisfies Record<string, Linha>;
export function CategoriaCadeira() {
  const [k, setK] = useState<keyof typeof CADEIRA>('WCHR');
  const d: Linha = CADEIRA[k];
  return (
    <MolduraMidia tipo="Explorador" titulo="Qual é a sua categoria?" instrucao="Escolha a categoria de assistência usada pelas companhias.">
      <Opcoes itens={(Object.keys(CADEIRA) as (keyof typeof CADEIRA)[]).map((x) => [x, CADEIRA[x].nome] as [keyof typeof CADEIRA, string])} valor={k} onChange={setK} colunas={2} />
      <Bloco rotulo="Quem é" cor={Cores.destaque} texto={d.passageiro} />
      <Bloco rotulo="Como embarca" cor={d.grave ? Cores.erro : Cores.dourado} texto={d.tripulante} />
      <Texto cor={Cores.textoApagado}>Assento nunca junto à saída de emergência. Cadeira danificada: substituta equivalente na chegada.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Documentos do cão-guia
const DOCS = [
  'Carteira de identificação com foto e plaqueta no pescoço do cão',
  'Carteira de vacinação atualizada: múltipla e antirrábica, assinada por veterinário',
  'Coleira, guia e arreio com alça',
  'Regras sanitárias do país de destino (voo internacional)',
];
export function CaoGuiaDocumentos() {
  const [ok, setOk] = useState<number[]>([]);
  const [intl, setIntl] = useState<'nac' | 'intl'>('nac');
  const lista = intl === 'intl' ? DOCS : DOCS.slice(0, 3);
  const feitos = lista.filter((_, i) => ok.includes(i)).length;
  const pronto = feitos === lista.length;
  return (
    <MolduraMidia tipo="Checklist" titulo="Cão-guia: documentos para voar" instrucao="Marque o que já está pronto.">
      <Opcoes itens={[['nac', 'Voo doméstico'], ['intl', 'Voo internacional']] as ['nac' | 'intl', string][]} valor={intl} onChange={setIntl} colunas={2} />
      {lista.map((t, i) => (
        <Pressable key={t} accessibilityRole="checkbox" accessibilityState={{ checked: ok.includes(i) }} onPress={() => setOk((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))}>
          <Marca cor={ok.includes(i) ? Cores.acerto : Cores.textoApagado}>{t}</Marca>
        </Pressable>
      ))}
      <View style={styles.leituras}>
        <Leitura rotulo="Prontos" valor={`${fmt(feitos)} / ${fmt(lista.length)}`} cor={pronto ? Cores.acerto : Cores.dourado} />
      </View>
      {pronto ? <Marca cor={Cores.acerto}>Documentos prontos. O cão viaja sem custo, no chão da cabine, sem focinheira.</Marca> : null}
      <Texto cor={Cores.textoApagado}>Voo doméstico: a ANAC orientou não exigir atestado de saúde de 10 dias. Cão em treinamento: plaqueta própria, sem arreio.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Visão monocular
export function VisaoDeficiencia() {
  const [meses, setMeses] = useState(3);
  const [exame, setExame] = useState<'inicial' | 'reval'>('inicial');
  const icao = meses >= 6;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Visão monocular e certificado" instrucao="Para o piloto: meses desde a perda da visão de um olho e tipo de exame.">
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Meses de adaptação</Texto>
          <Texto t="item" cor={Cores.destaque}>{fmt(meses)}</Texto>
        </View>
        <Deslizante min={0} max={24} passo={1} valor={meses} onChange={setMeses} rotulo="Meses de adaptação" formatar={(v) => fmt(v)} />
      </View>
      <Opcoes itens={[['inicial', 'Exame inicial'], ['reval', 'Revalidação']] as ['inicial' | 'reval', string][]} valor={exame} onChange={setExame} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="ICAO e FAA" valor={icao ? 'Avaliar' : 'Esperar'} cor={icao ? Cores.acerto : Cores.erro} />
        <Leitura rotulo="ANAC" valor={exame === 'reval' ? 'Pode ser apto' : 'Só após acidente'} cor={exame === 'reval' ? Cores.acerto : Cores.dourado} />
      </View>
      <Marca cor={icao ? Cores.acerto : Cores.erro}>{icao ? 'Adaptação mínima cumprida: teste em voo (ICAO) ou emissão especial (FAA).' : `Faltam ${fmt(6 - meses)} meses para a adaptação mínima de 6 meses.`}</Marca>
      <Texto cor={Cores.textoApagado}>ANAC: monocular aceita na revalidação ou no exame inicial depois de acidente ou incidente grave, com o outro olho normal.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Audição
const AUDICAO = {
  surdez: { nome: 'Surdez', passageiro: 'Informar as ajudas de comunicação; avisos por escrito ou gestos.', tripulante: 'FAA: "não válido onde o uso do rádio é exigido".', grave: true },
  aparelho: { nome: 'Só ouve bem com aparelho', passageiro: 'Pode usar o aparelho a bordo.', tripulante: 'ICAO: em geral não aceito para profissionais; Reino Unido: "só com aparelho".' },
  fala: { nome: 'Falha no audiograma, entende bem a fala', passageiro: 'Pode voar.', tripulante: 'ANAC: pode ser apto pela discriminação da fala e pela voz sussurrada.' },
  unilateral: { nome: 'Perda num ouvido', passageiro: 'Pode voar.', tripulante: 'ANAC: na revalidação, um ouvido pode bastar.' },
} satisfies Record<string, Linha>;
export function AudicaoDeficiencia() {
  return <Comparador titulo="Audição: passageiro e tripulante" instrucao="Escolha a situação." dados={AUDICAO} inicial="surdez" />;
}

// ---------------------------------------------------------------- Autismo: etapas da viagem
const ETAPAS = {
  antes: { nome: 'Antes da viagem', passageiro: 'Fotos e vídeos do aeroporto e do avião; ensaiar o roteiro; pedir assistência com 48 h.', tripulante: 'Avisar sobre acompanhante com 72 h se ele for necessário.' },
  aeroporto: { nome: 'Aeroporto', passageiro: 'Fila prioritária, CIPTEA e cordão de girassóis se quiser; fones com redução de ruído.', tripulante: 'Avisar sobre o toque na revista e pedir explicação antes.' },
  embarque: { nome: 'Embarque', passageiro: 'Prioridade de embarque: entrar antes evita filas e barulho.', tripulante: 'Apresentar-se à tripulação e explicar o que ajuda numa crise.' },
  voo: { nome: 'Durante o voo', passageiro: 'Objetos que acalmam, rotina de lanches e fones; mastigar ou bocejar na descida.', tripulante: 'Turbulência e ruído podem gerar crise: plano combinado antes.' },
} satisfies Record<string, Linha>;
export function AutismoVoo() {
  const [k, setK] = useState<keyof typeof ETAPAS>('antes');
  const d = ETAPAS[k];
  return (
    <MolduraMidia tipo="Explorador" titulo="Autismo: a viagem por etapas" instrucao="Escolha a etapa para ver o que ajuda.">
      <Opcoes itens={(Object.keys(ETAPAS) as (keyof typeof ETAPAS)[]).map((x) => [x, ETAPAS[x].nome] as [keyof typeof ETAPAS, string])} valor={k} onChange={setK} colunas={2} />
      <Bloco rotulo="O que ajuda" cor={Cores.acerto} texto={d.passageiro} />
      <Bloco rotulo="Com a companhia" cor={Cores.dourado} texto={d.tripulante} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Prazos de aviso (Res. 280/2013)
export function PrazoAssistencia() {
  const [h, setH] = useState(60);
  const linhas: [string, number][] = [
    ['Acompanhante ou documento médico (MEDIF)', 72],
    ['Demais assistências', 48],
  ];
  return (
    <MolduraMidia tipo="Calculadora" titulo="Ainda dá tempo de pedir?" instrucao="Ajuste quantas horas faltam para o voo.">
      <View style={{ gap: 4 }}>
        <View style={styles.linha}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Horas até o voo</Texto>
          <Texto t="item" cor={Cores.destaque}>{`${fmt(h)} h`}</Texto>
        </View>
        <Deslizante min={0} max={120} passo={1} valor={h} onChange={setH} rotulo="Horas até o voo" formatar={(v) => `${fmt(v)} h`} />
      </View>
      {linhas.map(([t, p]) => (
        <Bloco key={t} rotulo={t} cor={h >= p ? Cores.acerto : Cores.erro} texto={h >= p ? `No prazo (${fmt(p)} h).` : `Fora do prazo de ${fmt(p)} h: a companhia atende se puder.`} />
      ))}
      <Texto cor={Cores.textoApagado}>Prioridade de embarque e assistência básica valem sempre, sem custo.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Caminho do CMA
const CMA = {
  icao: { nome: 'ICAO', passageiro: 'Conclusão médica acreditada, com habilidade, experiência e operação consideradas.', tripulante: 'Limitação anotada quando a segurança depende dela.' },
  anac: { nome: 'ANAC', passageiro: 'Examinador credenciado; recurso; a ANAC pode exigir teste de proficiência em voo.', tripulante: 'Conforme o julgamento do examinador ou da ANAC.' },
  faa: { nome: 'FAA', passageiro: 'Condição estática: SODA após prova de voo médica; progressiva: emissão especial.', tripulante: 'Ex.: "não válido onde o uso do rádio é exigido".' },
  europa: { nome: 'Europa e Reino Unido', passageiro: 'Examinador ou autoridade, com prova prática quando preciso.', tripulante: 'Códigos: só com copiloto, só com prótese, comandos manuais, só de dia.' },
} satisfies Record<string, Linha>;
export function CaminhoCma() {
  const [k, setK] = useState<keyof typeof CMA>('anac');
  const d = CMA[k];
  return (
    <MolduraMidia tipo="Comparador" titulo="O caminho até o certificado" instrucao="Escolha a autoridade.">
      <Opcoes itens={(Object.keys(CMA) as (keyof typeof CMA)[]).map((x) => [x, CMA[x].nome] as [keyof typeof CMA, string])} valor={k} onChange={setK} colunas={2} />
      <Bloco rotulo="Caminho" cor={Cores.destaque} texto={d.passageiro} />
      <Bloco rotulo="Limitação" cor={Cores.dourado} texto={d.tripulante} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- MEDIF ou FREMEC?
export function MedifFremec() {
  const [cond, setCond] = useState<'temp' | 'perm'>('temp');
  const [extra, setExtra] = useState<'nao' | 'sim'>('nao');
  const [freq, setFreq] = useState<'nao' | 'sim'>('nao');
  const fremec = cond === 'perm' && freq === 'sim' && extra === 'nao';
  const [txt, cor] = fremec
    ? ['FREMEC: peça o cartão ao serviço médico da companhia com o laudo; ele dispensa o MEDIF enquanto nada mudar.', Cores.acerto]
    : extra === 'sim'
      ? ['MEDIF: oxigênio, maca ou equipamento médico pedem o formulário com o médico, com 72 h de antecedência.', Cores.erro]
      : cond === 'temp'
        ? ['MEDIF se a companhia pedir: doença, internação, lesão ou cirurgia recente.', Cores.dourado]
        : ['Condição permanente já informada: a companhia pode dispensar o MEDIF. Se viajar com frequência, peça o FREMEC.', Cores.acerto];
  return (
    <MolduraMidia tipo="Explorador" titulo="MEDIF ou FREMEC?" instrucao="Para o passageiro: responda e veja qual formulário costuma valer.">
      <Opcoes itens={[['temp', 'Condição recente ou que muda'], ['perm', 'Condição permanente e estável']] as ['temp' | 'perm', string][]} valor={cond} onChange={setCond} colunas={1} />
      <Opcoes itens={[['nao', 'Sem oxigênio, maca ou equipamento'], ['sim', 'Oxigênio, maca ou equipamento médico']] as ['nao' | 'sim', string][]} valor={extra} onChange={setExtra} colunas={1} />
      <Opcoes itens={[['nao', 'Viaja de vez em quando'], ['sim', 'Viaja com frequência']] as ['nao' | 'sim', string][]} valor={freq} onChange={setFreq} colunas={2} />
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>Cada companhia tem o seu formulário e os seus prazos: confira antes de comprar.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
