import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V5 · Segurança de voo. Fontes no registro de src/data/capitulos/seguranca-voo.ts: ICAO Anexo 19 e
// Doc 9859 (matriz de risco, 4ª ed.); Reason (1997); Regulamento (UE) 376/2014; UK CAA CAP 739; filosofia SIPAER;
// Transport Canada TP 11629. Os recursos orientam e não substituem o SMS da empresa, a autoridade nem o treinamento.

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

type Ficha = { nome: string; a: string; b: string; c?: string };
function Explorador({ titulo, instrucao, rotulos, itens, colunas, nota }: { titulo: string; instrucao: string; rotulos: [string, string] | [string, string, string]; itens: Ficha[]; colunas?: number; nota?: string }) {
  const [i, setI] = useState(0);
  const k = itens[i];
  return (
    <MolduraMidia tipo="Explorador" titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={itens.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={colunas} />
      <Bloco rotulo={rotulos[0]} cor={Cores.destaque} texto={k.a} />
      <Bloco rotulo={rotulos[1]} cor={Cores.dourado} texto={k.b} />
      {rotulos[2] && k.c ? <Bloco rotulo={rotulos[2]} cor={Cores.acerto} texto={k.c} /> : null}
      {nota ? <Texto cor={Cores.textoApagado}>{nota}</Texto> : null}
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Matriz de risco (ICAO Doc 9859, 4ª ed.)
const PROB: [number, string][] = [[5, '5 · Frequente'], [4, '4 · Ocasional'], [3, '3 · Remota'], [2, '2 · Improvável'], [1, '1 · Extremamente improvável']];
const SEV: [string, string][] = [['A', 'A · Catastrófica'], ['B', 'B · Perigosa'], ['C', 'C · Grave'], ['D', 'D · Menor'], ['E', 'E · Insignificante']];
const INTOLERAVEL = ['5A', '5B', '5C', '4A', '4B', '3A'];
const ACEITAVEL = ['3E', '2D', '2E', '1B', '1C', '1D', '1E'];
type Regiao = 'intoleravel' | 'toleravel' | 'aceitavel';
const regiao = (c: string): Regiao => (INTOLERAVEL.includes(c) ? 'intoleravel' : ACEITAVEL.includes(c) ? 'aceitavel' : 'toleravel');
const COR: Record<Regiao, string> = { intoleravel: Cores.erro, toleravel: Cores.dourado, aceitavel: Cores.acerto };
const REGIAO: Record<Regiao, { nome: string; acao: string }> = {
  intoleravel: { nome: 'Intolerável', acao: 'Agir já ou parar a atividade até reduzir o risco.' },
  toleravel: { nome: 'Tolerável com mitigação', acao: 'Pode seguir com medidas de redução, aceitas pela direção.' },
  aceitavel: { nome: 'Aceitável', acao: 'Pode seguir como está, com acompanhamento.' },
};
const EXEMPLO: Record<string, string> = {
  '4B': 'Ex.: piloto com sono acumulado em escala noturna repetida, sem descanso adequado.',
  '2A': 'Ex.: incapacitação súbita de um piloto na decolagem, com outro piloto treinado a bordo.',
  '3C': 'Ex.: comissário que trabalha com gripe e congestão, com risco de barotrauma.',
  '5D': 'Ex.: desidratação leve da tripulação em voos longos sem água à vista.',
};

export function MatrizRisco() {
  const [p, setP] = useState(4);
  const [s, setS] = useState('B');
  const celula = `${p}${s}`;
  const r = regiao(celula);
  return (
    <MolduraMidia tipo="Explorador" titulo="Matriz de risco" instrucao="Escolha a probabilidade e a severidade para ver em que região o risco cai e o que a empresa deve fazer.">
      <Texto t="rotulo" cor={Cores.textoApagado}>Probabilidade</Texto>
      <Opcoes itens={PROB} valor={p} onChange={setP} colunas={1} />
      <Texto t="rotulo" cor={Cores.textoApagado}>Severidade</Texto>
      <Opcoes itens={SEV} valor={s} onChange={setS} colunas={1} />
      <View style={styles.grade}>
        {PROB.map(([pp]) => (
          <View key={pp} style={styles.linha}>
            {SEV.map(([ss]) => {
              const c = `${pp}${ss}`;
              const on = c === celula;
              return (
                <View key={c} style={[styles.celula, { backgroundColor: COR[regiao(c)], opacity: on ? 1 : 0.35 }, on && styles.celulaOn]}>
                  <Texto t="rotulo" cor="#0A1626">{c}</Texto>
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <Bloco rotulo={`Risco ${celula}`} cor={COR[r]} texto={REGIAO[r].nome} />
      <Bloco rotulo="O que fazer" cor={Cores.destaque} texto={REGIAO[r].acao} />
      {EXEMPLO[celula] ? <Texto cor={Cores.textoApagado}>{EXEMPLO[celula]}</Texto> : null}
      <Texto cor={Cores.textoApagado}>Matriz do manual de gerenciamento da segurança da ICAO. Cada empresa calibra a sua.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Árvore de culpabilidade (Reason, 1997)
type No = { pergunta: string; sim: string; nao: string } | { resultado: string; cor: string };
const ARVORE: Record<string, No> = {
  q1: { pergunta: 'Havia intenção de causar dano?', sim: 'r1', nao: 'q2' },
  q2: { pergunta: 'Havia álcool, droga ou doença envolvida?', sim: 'r2', nao: 'q3' },
  q3: { pergunta: 'A regra foi violada de propósito?', sim: 'q3b', nao: 'q4' },
  q3b: { pergunta: 'A regra era clara, possível de cumprir e seguida pelos colegas?', sim: 'r3', nao: 'r4' },
  q4: { pergunta: 'Outra pessoa com o mesmo treino, no mesmo lugar, faria o mesmo?', sim: 'r5', nao: 'q5' },
  q5: { pergunta: 'A mesma pessoa já teve erros parecidos antes?', sim: 'r6', nao: 'r7' },
  r1: { resultado: 'Ato destrutivo: não se tolera e sai da cultura justa.', cor: Cores.erro },
  r2: { resultado: 'Separar o abuso de substância, que responde pela conduta, da doença, que pede tratamento e apoio.', cor: Cores.erro },
  r3: { resultado: 'Violação consciente: a pessoa responde pela conduta, dentro da linha publicada antes.', cor: Cores.erro },
  r4: { resultado: 'Regra ruim ou impossível: o sistema precisa mudar a regra.', cor: Cores.dourado },
  r5: { resultado: 'Erro do sistema: sem culpa; corrigir o procedimento, a tela ou o treinamento.', cor: Cores.acerto },
  r6: { resultado: 'Treino e acompanhamento, sem castigo automático.', cor: Cores.dourado },
  r7: { resultado: 'Erro honesto: sem culpa; apoio e aprendizado para todos.', cor: Cores.acerto },
};

export function ArvoreCulpa() {
  const [caminho, setCaminho] = useState<{ id: string; resp: 'sim' | 'nao' }[]>([]);
  const atual = caminho.length ? (ARVORE[caminho[caminho.length - 1].id] as { sim: string; nao: string })[caminho[caminho.length - 1].resp] : 'q1';
  const no = ARVORE[atual];
  const responder = (v: string) => {
    if (v === 'recomecar') return setCaminho([]);
    setCaminho([...caminho, { id: atual, resp: v as 'sim' | 'nao' }]);
  };
  return (
    <MolduraMidia tipo="Explorador" titulo="Erro, violação ou sistema?" instrucao="Responda às perguntas de Reason, em ordem, para ver a resposta justa a um ato inseguro.">
      {caminho.map((c) => (
        <View key={c.id} style={[styles.marca, { borderLeftColor: c.resp === 'sim' ? Cores.dourado : Cores.textoApagado }]}>
          <Texto cor={Cores.textoSuave}>{(ARVORE[c.id] as { pergunta: string }).pergunta}</Texto>
          <Texto t="rotulo" cor={c.resp === 'sim' ? Cores.dourado : Cores.textoApagado}>{c.resp === 'sim' ? 'Sim' : 'Não'}</Texto>
        </View>
      ))}
      {'pergunta' in no ? (
        <>
          <Bloco rotulo="Pergunta" cor={Cores.destaque} texto={no.pergunta} />
          <Opcoes itens={[['sim', 'Sim'], ['nao', 'Não']]} onChange={responder} />
        </>
      ) : (
        <>
          <Bloco rotulo="Resposta justa" cor={no.cor} texto={no.resultado} />
          <Opcoes itens={[['recomecar', 'Recomeçar']]} onChange={responder} />
        </>
      )}
      <Texto cor={Cores.textoApagado}>Resumo da árvore de decisão de James Reason. Cada empresa publica a sua linha antes do erro.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Eventos nos dados de voo (UK CAA CAP 739)
const EVENTOS: Ficha[] = [
  { nome: 'Aproximação não estabilizada', a: 'Avião fora da velocidade, da rampa ou da configuração previstas perto do solo.', b: 'Fadiga e carga de trabalho alta no fim da jornada.', c: 'Briefing do aeroporto, regra de arremeter e revisão da escala.' },
  { nome: 'Pouso duro', a: 'Aceleração vertical acima do limite no toque.', b: 'Ilusão visual na pista e cansaço.', c: 'Revisão da técnica e inspeção do avião.' },
  { nome: 'Alerta de estol', a: 'Velocidade baixa ou ângulo alto, com aviso de perda de sustentação.', b: 'Atenção dividida e consciência situacional reduzida.', c: 'Treino de recuperação e de monitoramento da velocidade.' },
  { nome: 'Alerta de proximidade do solo', a: 'Trajetória perigosamente perto do terreno.', b: 'Desorientação e erro de percepção à noite.', c: 'Procedimentos de aproximação e treino noturno.' },
  { nome: 'Razão de descida alta', a: 'Descida mais rápida que o limite na fase final.', b: 'Correção tardia por sono, remédio ou sobrecarga.', c: 'Planejamento antecipado da descida e conferência cruzada.' },
];

export function EventosFdm() {
  return <Explorador titulo="O que os dados de voo mostram" instrucao="Escolha um evento para ver o que ele registra, onde o corpo pode entrar e o que a empresa faz." rotulos={['O que registra', 'Onde o corpo pode entrar', 'O que a empresa faz']} itens={EVENTOS} colunas={1} nota="Eventos citados no guia de monitoramento de dados de voo da autoridade britânica." />;
}

// ---------------------------------------------------------------- Fatores contribuintes do SIPAER
const FATORES: Ficha[] = [
  { nome: 'Humano · fisiológico', a: 'O corpo de quem voa: hipóxia, fadiga, doença, remédio, álcool, alimentação.', b: 'Ex.: piloto que voou resfriado e com remédio que dá sono.', c: 'Exame aeromédico, prontuário e necropsia entram aqui.' },
  { nome: 'Humano · psicológico', a: 'Atenção, percepção, estresse, motivação, relações na equipe.', b: 'Ex.: pressa para cumprir a escala e problemas pessoais distraindo a tripulação.', c: 'Avaliação psicológica e apoio por pares entram aqui.' },
  { nome: 'Material', a: 'A aeronave: projeto, fabricação, manuseio e armazenamento.', b: 'Ex.: alerta classificado como cautela quando pedia mais urgência.', c: 'A ergonomia do alerta mexe com a percepção do piloto.' },
  { nome: 'Operacional', a: 'O desempenho no voo: instrução, manutenção, coordenação, julgamento, planejamento e supervisão.', b: 'Ex.: seguir para uma área de gelo severo previsto sem medidas de mitigação.', c: 'Fadiga e carga de trabalho pesam no julgamento e no planejamento.' },
];

export function FatoresSipaer() {
  return <Explorador titulo="Os fatores contribuintes" instrucao="Escolha uma área para ver o que ela inclui, um exemplo e onde a medicina entra." rotulos={['O que inclui', 'Exemplo', 'Onde a medicina entra']} itens={FATORES} colunas={1} nota="Áreas usadas pelo SIPAER nas investigações." />;
}

// ---------------------------------------------------------------- Incapacitação: CHASE (Transport Canada)
const CHASE: Ficha[] = [
  { nome: 'C · Controlar', a: 'Assumir os comandos e manter altitude e trajetória seguras.', b: 'O avião vem primeiro: um piloto caído sobre os comandos pode atrapalhar o voo.' },
  { nome: 'H · Pedir ajuda', a: 'Declarar emergência assim que der e chamar os comissários.', b: 'O controle abre espaço e os comissários cuidam do colega.' },
  { nome: 'A · Avaliar', a: 'Conferir combustível, tempo e o melhor aeroporto.', b: 'O destino passa a ser o aeródromo adequado mais próximo.' },
  { nome: 'S · Prender', a: 'Travar o colega com os cintos de ombro e afastar o assento dele para trás.', b: 'Evita que o corpo empurre os comandos numa convulsão ou desmaio.' },
  { nome: 'E · Explicar', a: 'Dizer o plano ao controle e à tripulação.', b: 'Todos trabalham com a mesma imagem do voo.' },
];

export function IncapacitacaoChase() {
  return <Explorador titulo="Quando o colega para de responder" instrucao="Escolha cada passo para ver o que o piloto que ficou sozinho faz e por quê." rotulos={['O que fazer', 'Por quê']} itens={CHASE} colunas={1} nota="Sequência resumida pela autoridade de aviação do Canadá." />;
}

const styles = StyleSheet.create({
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  grade: { gap: 3, alignSelf: 'center' },
  linha: { flexDirection: 'row', gap: 3 },
  celula: { width: 40, height: 28, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  celulaOn: { borderWidth: 2, borderColor: '#FFFFFF' },
});
