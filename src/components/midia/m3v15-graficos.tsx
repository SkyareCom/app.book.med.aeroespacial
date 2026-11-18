import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V15 · Investigação e perícia. Fontes no registro de src/data/capitulos/investigacao.ts:
// ICAO Anexo 13; Lei 12.970/2014 (CBA); STF, ADI 5.667; NTSB SR-01-01; 14 CFR 25.803; INTERPOL (DVI); FAA DOT/FAA/AM-92/24 e
// AM-15/13; Código de Processo Penal; Lei 8.213/1991; Código de Processo Civil, art. 473. Os recursos orientam e não
// substituem a autoridade de investigação, o perito nem o advogado.

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

// ---------------------------------------------------------------- Etapas da investigação (ICAO e SIPAER)
const ETAPAS: Ficha[] = [
  { nome: 'Local e notificação', a: 'Isolar e preservar o local; destroços só se movem para salvar vidas ou evitar novo perigo.', b: 'A polícia isola o local, e o SIPAER tem precedência no acesso e na guarda.' },
  { nome: 'Coleta', a: 'Destroços, gravadores de voo, documentos, depoimentos e dados médicos.', b: 'O SIPAER pode requisitar com prioridade laudos, exames e necropsias.' },
  { nome: 'Corpo e medicina', a: 'Necropsia completa dos tripulantes mortos e exame médico dos sobreviventes.', b: 'Doença prévia, toxicologia e padrão das lesões entram na análise.' },
  { nome: 'Análise', a: 'Reconstrução dos fatos e busca dos fatores contribuintes, inclusive humanos.', b: 'Fala de fatores, nunca de culpados; as fontes ficam protegidas.' },
  { nome: 'Relatório preliminar', a: 'Enviado em até 30 dias.', b: 'Registra os fatos iniciais, sem conclusões.' },
  { nome: 'Relatório final', a: 'Público, em até 12 meses quando possível; se demorar, declaração provisória a cada aniversário.', b: 'Aponta os fatores contribuintes e faz recomendações de segurança.' },
  { nome: 'Recomendações', a: 'Quem recebe responde em até 90 dias o que fará.', b: 'É aqui que a investigação vira prevenção.' },
];

export function EtapasInvestigacao() {
  return <Explorador titulo="As etapas da investigação" instrucao="Escolha uma etapa para ver o que se faz e o que a regra garante." rotulos={['O que se faz', 'O que a regra garante']} itens={ETAPAS} nota="Resumo do Anexo 13 da ICAO e do Código Brasileiro de Aeronáutica." />;
}

// ---------------------------------------------------------------- Fatores de sobrevivência
const SOBREV: Ficha[] = [
  { nome: 'Estrutura da fuselagem', a: 'Mantém um espaço para os ocupantes depois do impacto.', b: 'Sem espaço, nenhum cinto salva: o corpo é esmagado.', c: 'Projeto e certificação da aeronave.' },
  { nome: 'Cintos', a: 'Prendem o corpo ao assento e passam a carga pela pelve.', b: 'Cinto frouxo deixa o corpo ganhar velocidade antes de parar.', c: 'Baixo e firme sobre a pelve, sempre que sentado.' },
  { nome: 'Assentos', a: 'Absorvem energia e ficam presos ao piso.', b: 'A coluna lombar e a cabeça têm limites testados em trenó.', c: 'Assentos certificados e posição de impacto recomendada.' },
  { nome: 'Fogo', a: 'Materiais que retardam o fogo dão tempo para sair.', b: 'Fumaça e calor atingem as vias aéreas em segundos.', c: 'Sair sem bagagem e manter-se baixo na fumaça.' },
  { nome: 'Saídas e evacuação', a: 'A certificação exige saída de todos em até 90 segundos.', b: 'Saídas bloqueadas e confusão consomem esse tempo.', c: 'Contar as fileiras até as duas saídas mais próximas.' },
];

export function SobrevivenciaFatores() {
  return <Explorador titulo="O que decide a sobrevivência" instrucao="Escolha um fator para ver o que ele faz, o que acontece com o corpo quando falha e o que protege." rotulos={['O que faz', 'Quando falha', 'O que protege']} itens={SOBREV} />;
}

// ---------------------------------------------------------------- Fases da identificação de vítimas (INTERPOL)
const DVI: Ficha[] = [
  { nome: 'Local', a: 'Exame do local, com registro de onde estava cada corpo e cada objeto.', b: 'Preservar a posição ajuda a reconstruir o acidente e a identificar.' },
  { nome: 'Post mortem', a: 'Necropsia, impressões digitais, exame dos dentes, amostras de DNA e registro de tatuagens, cicatrizes e implantes.', b: 'Cada achado do corpo vira um dado comparável.' },
  { nome: 'Ante mortem', a: 'Dados reunidos com as famílias: prontuários médicos e odontológicos, radiografias, DNA de parentes.', b: 'Quanto mais completo o registro em vida, mais rápida a resposta.' },
  { nome: 'Reconciliação', a: 'Comparação entre os dados post mortem e ante mortem por especialistas.', b: 'A identificação conclusiva costuma exigir digital, arcada ou DNA; o reconhecimento visual não basta.' },
];

export function DviFases() {
  return <Explorador titulo="Identificação de vítimas, fase a fase" instrucao="Escolha uma fase para ver o que se faz e por que ela importa." rotulos={['O que se faz', 'Por que importa']} itens={DVI} nota="Resumo do padrão da INTERPOL para identificação de vítimas de desastres." />;
}

// ---------------------------------------------------------------- Álcool depois da morte
const ALCOOL: Ficha[] = [
  { nome: 'Álcool coerente em sangue, urina e humor vítreo', a: 'Aponta para álcool bebido em vida.', b: 'Somar o tempo do voo, a concentração e o que a tarefa exigia antes de concluir.' },
  { nome: 'Álcool no sangue, ausente na urina e no humor vítreo', a: 'Sugere produção depois da morte.', b: 'Bactérias e fungos nos tecidos produzem álcool; o número do sangue sozinho engana.' },
  { nome: 'Outros voláteis presentes', a: 'Não basta para afirmar produção depois da morte.', b: 'O estudo da FAA achou casos com álcool sem outros voláteis e o contrário.' },
  { nome: 'Só há sangue para análise', a: 'A conclusão fica limitada.', b: 'Quase metade dos casos do estudo não pôde ser atribuída: colher várias amostras cedo.' },
];

export function AlcoolPosMorte() {
  return <Explorador titulo="Bebido ou produzido depois da morte?" instrucao="Escolha um achado para ver o que ele sugere e o cuidado na interpretação." rotulos={['O que sugere', 'Cuidado']} itens={ALCOOL} colunas={1} />;
}

// ---------------------------------------------------------------- Duas investigações: perguntas frequentes
const DUAS: Ficha[] = [
  { nome: 'Quem fica com os destroços?', a: 'O SIPAER tem precedência no acesso e na guarda; a polícia isola e preserva o local.', b: 'O acesso dos outros órgãos é feito em coordenação com o SIPAER.' },
  { nome: 'O relatório do SIPAER vale como prova?', a: 'Não, salvo decisão do juiz depois de ouvir a autoridade do SIPAER em 72 horas.', b: 'O Supremo Tribunal Federal manteve a regra em 2024.' },
  { nome: 'Quem pode pedir necropsia?', a: 'O SIPAER pode requisitar laudos e necropsias com prioridade; a perícia criminal faz o exame de corpo de delito.', b: 'A necropsia é feita ao menos 6 horas depois da morte, salvo sinais evidentes.' },
  { nome: 'Quem investigou para o SIPAER pode ser perito no processo?', a: 'Não. Quem participa de uma investigação não atua na outra.', b: 'O SIPAER pode ceder outros peritos à polícia ou à Justiça.' },
  { nome: 'E se aparecer indício de crime?', a: 'O SIPAER comunica a polícia.', b: 'As duas investigações seguem, cada uma com o seu objetivo.' },
];

export function DuasInvestigacoes() {
  return <Explorador titulo="SIPAER e polícia: quem faz o quê" instrucao="Escolha uma pergunta para ver a resposta da lei." rotulos={['Resposta', 'Detalhe']} itens={DUAS} colunas={1} nota="Resumo do Código Brasileiro de Aeronáutica (Lei 12.970/2014) e do Código de Processo Penal." />;
}

// ---------------------------------------------------------------- As partes do laudo
const LAUDO: Ficha[] = [
  { nome: 'Objeto', a: 'O que foi examinado e por quê.', b: 'Ex.: avaliar se a perda auditiva do comissário tem relação com o trabalho a bordo.' },
  { nome: 'Análise', a: 'O exame técnico ou científico feito pelo perito.', b: 'Ex.: audiometrias ao longo dos anos, exposição ao ruído e outras causas possíveis.' },
  { nome: 'Método', a: 'Como foi feito, mostrando que é aceito pelos especialistas.', b: 'Ex.: critérios reconhecidos para perda auditiva ligada ao ruído.' },
  { nome: 'Quesitos', a: 'Resposta conclusiva a todas as perguntas do juiz e das partes.', b: 'Ex.: há nexo com o trabalho? Há redução da capacidade? Desde quando?' },
  { nome: 'Linguagem', a: 'Simples e coerente, sem ir além do exame técnico nem opinião pessoal.', b: 'Ex.: explicar o achado de forma que o juiz entenda sem ser médico.' },
];

export function LaudoPartes() {
  return <Explorador titulo="As partes de um laudo" instrucao="Escolha uma parte para ver o que ela contém e um exemplo num caso da aviação." rotulos={['O que contém', 'Exemplo']} itens={LAUDO} nota="Resumo do art. 473 do Código de Processo Civil." />;
}

const styles = StyleSheet.create({
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});
