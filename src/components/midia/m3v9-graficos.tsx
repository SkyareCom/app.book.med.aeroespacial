import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V9 · Saúde do passageiro. Fontes no registro de src/data/capitulos/saude-passageiro.ts.
// Mesmo padrão de m3v8-graficos.tsx. Os recursos orientam e não substituem o médico, o manual da aeronave nem os
// procedimentos da empresa.

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

const styles = StyleSheet.create({
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});

// ---------------------------------------------------------------- Antes de comprar a passagem
const APTIDAO: Ficha[] = [
  { nome: "Doença do coração ou do pulmão estável", a: "Menos oxigênio no sangue na cabine", b: "Avaliação médica e carta com o tratamento", c: "O médico assistente, com a companhia se houver dúvida" },
  { nome: "Cirurgia recente", a: "Ar ou gás residual se expande na subida", b: "Perguntar ao cirurgião o prazo para voar", c: "O cirurgião" },
  { nome: "Gripe ou outra infecção respiratória", a: "Contágio no espaço fechado", b: "Adiar até deixar de transmitir", c: "O médico e o próprio passageiro" },
  { nome: "Precisa de oxigênio", a: "Não se leva cilindro próprio", b: "Combinar o concentrador e enviar o MEDIF", c: "O serviço médico da companhia" },
  { nome: "Viaja de maca ou incubadora", a: "Atenção médica contínua a bordo", b: "MEDIF e acompanhante", c: "O serviço médico da companhia" },
];

export function AptidaoSituacoes() {
  return <Explorador titulo="Antes de comprar a passagem" instrucao="Escolha uma situação para ver o que muda no voo e o que fazer antes de embarcar." rotulos={["No voo", "Antes de embarcar", "Quem decide"]} itens={APTIDAO} colunas={1} nota="Recurso educativo: a decisão é do médico e da companhia aérea." />;
}

// ---------------------------------------------------------------- O bebê pode voar?
const BEBE: Ficha[] = [
  { nome: "Menos de 48 horas de vida", a: "Só em incubadora, com médico", b: "Voo apenas por necessidade médica" },
  { nome: "De 48 horas a 7 dias", a: "Algumas companhias aceitam com atestado", b: "Especialistas desaconselham sem necessidade" },
  { nome: "Prematuro antes da data prevista do parto", a: "Oxigênio disponível a bordo", b: "Falar com o pediatra antes da compra" },
  { nome: "Menos de 1 ano com doença respiratória crônica", a: "Avaliação com pneumologista pediátrico", b: "O teste de hipóxia pode ser indicado" },
  { nome: "Bebê saudável com mais de 7 dias", a: "Aceito pela maioria das companhias", b: "Assento próprio com cadeirinha e mamada na descida" },
];

export function BebeIdadeVoo() {
  return <Explorador titulo="O bebê pode voar?" instrucao="Escolha a situação do bebê para ver a regra comum e o cuidado principal." rotulos={["Regra comum", "Cuidado principal"]} itens={BEBE} colunas={1} nota="A idade mínima é definida por cada companhia aérea." />;
}

// ---------------------------------------------------------------- Onde você está quando o avião sacode?
const ONDE: Ficha[] = [
  { nome: "Sentado com cinto baixo e firme", a: "O corpo fica preso ao assento", b: "Manter o cinto até o fim do voo" },
  { nome: "Sentado sem cinto", a: "O corpo é lançado contra o teto", b: "Afivelar sempre que estiver sentado" },
  { nome: "De pé no corredor", a: "Queda e pancada na cabeça e na coluna", b: "Voltar ao assento quando o aviso acender" },
  { nome: "No banheiro", a: "Sem cinto e sem apoio firme", b: "Segurar-se e voltar logo ao assento" },
  { nome: "Bebê no colo", a: "O adulto pode não conseguir segurá-lo", b: "Assento próprio com cadeirinha aprovada" },
];

export function TurbulenciaOndeEstou() {
  return <Explorador titulo="Onde você está quando o avião sacode?" instrucao="Escolha onde a pessoa está para ver o risco e o que fazer." rotulos={["Risco", "O que fazer"]} itens={ONDE} colunas={1} />;
}

// ---------------------------------------------------------------- Posição de proteção e ajuda
const POSICAO: Ficha[] = [
  { nome: "Adulto em assento comum", a: "Cinto baixo e firme e posição do cartão de segurança", b: "O tipo de encosto muda a melhor posição" },
  { nome: "Adulto com bebê no colo", a: "Apoiar cabeça, pescoço e corpo do bebê e se inclinar sobre ele", b: "Reduz o balanço do bebê no impacto" },
  { nome: "Criança na cadeirinha", a: "Posição indicada pelo fabricante da cadeirinha", b: "A cadeirinha já protege o corpo" },
  { nome: "Criança no assento do avião", a: "A mesma posição do adulto", b: "O cinto do avião serve acima de 18 kg" },
  { nome: "Gestante ou pessoa com deficiência", a: "Pode precisar de outra pessoa para a posição e a saída", b: "Combinar a ajuda antes da decolagem" },
];

export function EvacuacaoPosicao() {
  return <Explorador titulo="Posição de proteção e ajuda" instrucao="Escolha quem está no assento para ver a orientação da FAA." rotulos={["Orientação", "Por quê"]} itens={POSICAO} colunas={1} />;
}
