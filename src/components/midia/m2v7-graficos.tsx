import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Rect } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { SvgText } from '@/components/svg-texto';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte, Raio } from '@/constants/theme';

// Interativos do M2V7 · Saúde mental e comportamento. Fontes no registro de src/data/capitulos/mente.ts:
// ICAO Doc 8984 Part III Cap. 9 e Apêndice 2; RBAC 67.75 e RBAC 120; FAA (14 CFR 91.17, Antidepressant Protocol, HIMS,
// Fit to Fly/IMSAFE); EASA 2018/1042; UK CAA Psychiatric conditions; AsMA 2003. Sem fonte: [confirmar na referência].
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

// ---------------------------------------------------------------- Checklist IMSAFE (FAA)
const IMSAFE: { letra: string; nome: string; pergunta: string }[] = [
  { letra: 'I', nome: 'Doença', pergunta: 'Estou me sentindo doente hoje?' },
  { letra: 'M', nome: 'Remédio', pergunta: 'Tomei algum remédio que possa atrapalhar o voo?' },
  { letra: 'S', nome: 'Estresse', pergunta: 'Estou sob um estresse fora do comum?' },
  { letra: 'A', nome: 'Álcool', pergunta: 'Bebi álcool nas últimas 24 horas?' },
  { letra: 'F', nome: 'Fadiga', pergunta: 'Estou cansado ou vou ficar cansado no voo?' },
  { letra: 'E', nome: 'Alimentação e emoção', pergunta: 'Estou mal alimentado, com sede ou abalado?' },
];

export function Imsafe() {
  const [sim, setSim] = useState<boolean[]>(IMSAFE.map(() => false));
  const n = sim.filter(Boolean).length;
  const alcool = sim[3];
  const cor = n === 0 ? Cores.acerto : alcool || n >= 2 ? Cores.erro : Cores.dourado;
  const txt =
    n === 0
      ? 'Tudo certo nas seis perguntas. Bom voo.'
      : alcool
        ? 'Álcool nas últimas 24 horas: pela FAA, nunca menos de 8 horas e sem nenhum efeito. Se houver dúvida, não voe.'
        : n >= 2
          ? 'Mais de um item marcado: hoje não é um bom dia para voar. Fale com a empresa ou com o colega.'
          : 'Um item marcado: pense se ele atrapalha o voo. Na dúvida, fale com o comandante ou com a empresa.';
  return (
    <MolduraMidia tipo="Checklist" titulo="IMSAFE: o piloto confere a si mesmo" instrucao="Responda às seis perguntas do checklist da FAA antes de voar. Toque em cada uma que for sim.">
      <View style={{ gap: 8 }}>
        {IMSAFE.map((q, i) => (
          <Pressable
            key={q.letra}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: sim[i] }}
            onPress={() => setSim((v) => v.map((x, j) => (j === i ? !x : x)))}
            style={[styles.item, sim[i] && { borderColor: Cores.erro, backgroundColor: 'rgba(255,107,107,0.08)' }]}>
            <View style={[styles.letra, { borderColor: sim[i] ? Cores.erro : Cores.linha }]}>
              <Texto t="item" semTraducao cor={sim[i] ? Cores.erro : Cores.destaque}>{q.letra}</Texto>
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <Texto t="rotulo" cor={Cores.textoApagado}>{q.nome}</Texto>
              <Texto>{q.pergunta}</Texto>
            </View>
            <Texto t="rotulo" cor={sim[i] ? Cores.erro : Cores.textoApagado}>{sim[i] ? 'Sim' : 'Não'}</Texto>
          </Pressable>
        ))}
      </View>
      <Marca cor={cor}>{txt}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Antidepressivo e prazo para voar
type Norma = 'faa' | 'icao' | 'anac';
export function PrazoAntidepressivo() {
  const [n, setN] = useState<Norma>('faa');
  const [sem, setSem] = useState(8);
  const [mudou, setMudou] = useState<'nao' | 'sim'>('nao');
  const meses = sem / 4.345;
  let txt: string, cor: string;
  if (mudou === 'sim') [txt, cor] = ['A dose mudou: o tripulante para de voar até ficar estável de novo. Ao retirar o remédio, fica em solo durante a retirada e mais 2 semanas (ICAO).', Cores.erro];
  else if (n === 'faa') [txt, cor] = meses >= 6 ? ['Pode pedir a autorização especial da FAA: 6 meses estável, com um dos 8 antidepressivos aceitos e sem efeito colateral importante.', Cores.acerto] : [Math.ceil(6 - meses) <= 1 ? 'Ainda não: a FAA pede 6 meses estável na mesma dose. Falta cerca de 1 mês.' : `Ainda não: a FAA pede 6 meses estável na mesma dose. Faltam cerca de ${fmt(Math.ceil(6 - meses))} meses.`, Cores.dourado];
  else if (n === 'icao') [txt, cor] = sem >= 4 ? ['Pela ICAO, a autoridade pode liberar caso a caso: dose estável há 4 semanas, efeitos mínimos, sem pensamento suicida, sono normal, em geral voando com copiloto.', Cores.acerto] : ['Ainda não: a ICAO pede ao menos 4 semanas estável na mesma dose.', Cores.dourado];
  else [txt, cor] = ['A ANAC considera inapto quem trata depressão com antidepressivo, salvo parecer do psiquiatra que avalie o caso (RBAC 67.75(c)).', Cores.dourado];
  return (
    <MolduraMidia tipo="Calculadora" titulo="Antidepressivo e volta ao voo" instrucao="Para o tripulante: escolha a autoridade, há quanto tempo está na mesma dose e se a dose mudou.">
      <Opcoes itens={[['faa', 'FAA'], ['icao', 'ICAO'], ['anac', 'ANAC']] as [Norma, string][]} valor={n} onChange={setN} colunas={3} />
      <Controle min={0} max={40} passo={1} valor={sem} onChange={setSem} rotulo="Tempo na mesma dose" formatar={(v) => (v < 9 ? `${fmt(v)} ${v === 1 ? 'semana' : 'semanas'}` : `${fmt(v / 4.345, 1)} meses`)} />
      <Opcoes itens={[['nao', 'Dose estável'], ['sim', 'Dose mudou']] as ['nao' | 'sim', string][]} valor={mudou} onChange={setMudou} colunas={2} />
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>Aceitos pela FAA: fluoxetina, sertralina, citalopram, escitalopram, bupropiona, desvenlafaxina, duloxetina e venlafaxina, um de cada vez.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Bipolar, psicose e personalidade
type Quadro = 'bipolar' | 'hipomania' | 'esquizo' | 'breve' | 'personalidade';
const QUADROS: Record<Quadro, { nome: string; tripulante: string; passageiro: string }> = {
  bipolar: { nome: 'Bipolar (mania)', tripulante: 'Impedimento de longo prazo (ICAO; ANAC)', passageiro: 'Pode voar estável, com o remédio no horário' },
  hipomania: { nome: 'Hipomania', tripulante: 'Inapto (ICAO)', passageiro: 'Avaliação antes de voar' },
  esquizo: { nome: 'Esquizofrenia ou delírio', tripulante: 'Inapto (ICAO; ANAC)', passageiro: 'Pode voar estável; às vezes com acompanhante' },
  breve: { nome: 'Psicose breve', tripulante: 'Pode ser aceito após 1 ano estável sem antipsicótico (ICAO)', passageiro: 'Pode voar recuperado' },
  personalidade: { nome: 'Personalidade ou impulsos', tripulante: 'Em geral incompatível com a aviação (ICAO)', passageiro: 'Conforme o comportamento; agressividade impede' },
};

export function QuadrosPsiquiatricos() {
  const [q, setQ] = useState<Quadro>('bipolar');
  const k = QUADROS[q];
  return (
    <MolduraMidia tipo="Comparador" titulo="Diagnóstico e voo" instrucao="Escolha o quadro para ver o que muda para o tripulante e para o passageiro.">
      <Opcoes itens={(Object.keys(QUADROS) as Quadro[]).map((x) => [x, QUADROS[x].nome] as [Quadro, string])} valor={q} onChange={setQ} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Tripulante" valor={k.tripulante} cor={Cores.erro} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Passageiro" valor={k.passageiro} cor={Cores.acerto} />
      </View>
      <Marca cor={Cores.textoSuave}>Comportamento imprevisível, agressivo ou perturbador contraindica o voo para qualquer passageiro (CAA britânica).</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Álcool e voo
export function AlcoolVoo() {
  const [h, setH] = useState(6);
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 340), x0 = 12, x1 = W - 12, X = (v: number) => x0 + (Math.min(v, 24) / 24) * (x1 - x0);
  const faa = h >= 8, icao = h >= 12, imsafe = h >= 24;
  const [txt, cor] = !faa
    ? ['Não voe: a FAA proíbe atuar como tripulante até 8 horas depois de qualquer bebida alcoólica.', Cores.erro]
    : !icao
      ? ['Pela FAA, já passou o mínimo de 8 horas, desde que sem nenhum efeito e abaixo de 0,04 g/dL. A ICAO lembra a tradição de 12 horas.', Cores.dourado]
      : !imsafe
        ? ['Passou das 12 horas. O checklist IMSAFE ainda pergunta por álcool nas últimas 24 horas: se bebeu muito, espere mais.', Cores.dourado]
        : ['Mais de 24 horas: dentro de todas as referências do app.', Cores.acerto];
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quantas horas depois de beber" instrucao="Para o tripulante: escolha quantas horas se passaram desde a última bebida alcoólica.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={58}>
          <Rect x={x0} y={22} width={X(8) - x0} height={12} fill={Cores.erro} fillOpacity={0.5} />
          <Rect x={X(8)} y={22} width={X(24) - X(8)} height={12} fill={Cores.dourado} fillOpacity={0.4} />
          {[8, 12, 24].map((v) => (
            <Line key={v} x1={X(v)} y1={16} x2={X(v)} y2={40} stroke={Cores.texto} strokeWidth={1.5} />
          ))}
          <SvgText x={X(8)} y={12} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">FAA 8 H</SvgText>
          <SvgText x={X(12)} y={54} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">ICAO 12 H</SvgText>
          <SvgText x={X(24)} y={12} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">IMSAFE 24 H</SvgText>
          <Circle cx={X(h)} cy={28} r={7} fill={Cores.destaque} />
        </Svg>
      </View>
      <Controle min={0} max={24} passo={1} valor={h} onChange={setH} rotulo="Horas desde a última dose" formatar={(v) => `${fmt(v)} h`} />
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>O prazo não basta: com qualquer efeito do álcool, o tripulante não voa. No Brasil, o RBAC 120 prevê exames aleatórios.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Avaliação psicológica (RBAC 67.75)
type Ocasiao = 'inicial' | 'revalidacao' | 'acidente' | 'pedido';
const OCASIOES: Record<Ocasiao, { nome: string; psicologo: string; psiquiatra: string }> = {
  inicial: { nome: 'Exame inicial', psicologo: 'Sim: personalidade, atenção, memória e raciocínio', psiquiatra: 'Sim: parecer em todo exame inicial' },
  revalidacao: { nome: 'Revalidação', psicologo: 'A cada 5 anos', psiquiatra: 'Quando a ANAC ou um profissional pedir' },
  acidente: { nome: 'Depois de acidente ou incidente grave', psicologo: 'Sim', psiquiatra: 'Sim' },
  pedido: { nome: 'A pedido da ANAC ou de um profissional', psicologo: 'Sim, a qualquer tempo', psiquiatra: 'Sim, a qualquer tempo' },
};

export function AvaliacaoPsicologica() {
  const [o, setO] = useState<Ocasiao>('inicial');
  const k = OCASIOES[o];
  return (
    <MolduraMidia tipo="Comparador" titulo="Quando há avaliação psicológica" instrucao="Escolha a ocasião para ver quando o psicólogo e o psiquiatra entram no exame do tripulante brasileiro.">
      <Opcoes itens={(Object.keys(OCASIOES) as Ocasiao[]).map((x) => [x, OCASIOES[x].nome] as [Ocasiao, string])} valor={o} onChange={setO} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Psicólogo" valor={k.psicologo} cor={Cores.destaque} />
        <Leitura rotulo="Psiquiatra" valor={k.psiquiatra} cor={Cores.dourado} />
      </View>
      <Marca cor={Cores.textoSuave}>Os testes sozinhos não preveem doença mental (ICAO); a conversa honesta com o examinador pesa mais.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Como ajudar um colega
type Sinal = 'humor' | 'isolamento' | 'erros' | 'alcool' | 'desistir' | 'morte';
const SINAIS: Record<Sinal, { nome: string; fazer: string; urgente: boolean }> = {
  humor: { nome: 'Irritação ou tristeza fora do comum', fazer: 'Em particular, diga o que notou e pergunte como ele está. Ouça sem julgar.', urgente: false },
  isolamento: { nome: 'Isolamento e faltas', fazer: 'Convide para conversar; ofereça o programa de apoio por pares.', urgente: false },
  erros: { nome: 'Erros fora do comum no voo', fazer: 'Fale depois do voo, com calma; sugira descanso e avaliação. A segurança vem primeiro.', urgente: false },
  alcool: { nome: 'Cheiro de álcool antes do voo', fazer: 'Fale com o colega antes de embarcar e acione o programa da empresa. Ninguém voa assim.', urgente: true },
  desistir: { nome: 'Fala em desistir de tudo', fazer: 'Pergunte diretamente se ele pensa em se machucar; não deixe para depois.', urgente: true },
  morte: { nome: 'Fala em morrer ou se machucar', fazer: 'Não deixe sozinho. Ajuda imediata: CVV 188 ou SAMU 192, e o programa de apoio.', urgente: true },
};

export function ApoioColega() {
  const [s, setS] = useState<Sinal>('humor');
  const k = SINAIS[s];
  return (
    <MolduraMidia tipo="Classificador" titulo="Como ajudar um colega" instrucao="Escolha o que você notou para ver o que fazer. O apoio por pares é confidencial e não punitivo.">
      <Opcoes itens={(Object.keys(SINAIS) as Sinal[]).map((x) => [x, SINAIS[x].nome] as [Sinal, string])} valor={s} onChange={setS} colunas={1} />
      <Marca cor={k.urgente ? Cores.erro : Cores.acerto}>{k.fazer}</Marca>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
  item: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md, borderWidth: 1, borderColor: Cores.linha, borderRadius: Raio - 4, padding: Espaco.sm },
  letra: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
