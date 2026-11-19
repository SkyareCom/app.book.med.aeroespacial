import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V8 · Toxicologia e higiene da aeronave. Fontes no registro de src/data/capitulos/toxicologia.ts.
// Mesmo padrão de m3v7-graficos.tsx. Os recursos orientam e não substituem o médico, o manual da aeronave nem os
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

// ---------------------------------------------------------------- Níveis de monóxido no sangue
const NIVEIS: Ficha[] = [
  { nome: "Abaixo de 10%", a: "Em geral, nada", b: "Alarme do detector ainda merece resposta" },
  { nome: "10% a 20%", a: "Dor de cabeça leve", b: "Desligar o aquecimento e abrir o ar fresco" },
  { nome: "20% a 30%", a: "Dor de cabeça, respiração rápida, tontura e sono", b: "Oxigênio, se seguro, e pouso assim que possível" },
  { nome: "30% a 40%", a: "Dor forte, julgamento prejudicado, falta de ar e visão turva", b: "Emergência: oxigênio, avisar o controle e pousar" },
  { nome: "40% a 50%", a: "Dor latejante, confusão e muita falta de ar", b: "Quem está assim pode não conseguir agir sozinho" },
  { nome: "Acima de 50%", a: "Perda de consciência e infarto", b: "Socorro imediato com oxigênio a 100%" },
];

export function NiveisCohb() {
  return <Explorador titulo="Níveis de monóxido no sangue" instrucao="Escolha uma faixa de COHb para ver o que o corpo sente e o que fazer." rotulos={["O que se sente", "O que fazer"]} itens={NIVEIS} nota="Faixas da EASA. Os sintomas variam, e o nível no sangue não substitui a avaliação médica." />;
}

// ---------------------------------------------------------------- Cheiro, névoa ou fumaça
const SINAIS: Ficha[] = [
  { nome: "Cheiro estranho", a: "Vapores do suprimento de ar, galley ou fonte externa", b: "Avisar a cabine de comando e informar local e hora" },
  { nome: "Névoa nas saídas de ar", a: "Contaminação do ar ou condensação", b: "Descrever o que se vê, sem presumir a causa" },
  { nome: "Fumaça visível", a: "Possível fogo, mesmo sem chama aparente", b: "Procedimento de fogo, proteção respiratória e pouso" },
  { nome: "Calor em painel", a: "Fogo oculto atrás do revestimento", b: "Avisar logo e não abrir sem preparo" },
  { nome: "Tontura em tripulantes", a: "Vapores, hipóxia ou outra causa", b: "Máscara de oxigênio e divisão das tarefas" },
];

export function SinaisCabine() {
  return <Explorador titulo="Cheiro, névoa ou fumaça" instrucao="Escolha o que foi percebido para ver o que pensar e como agir." rotulos={["O que pode ser", "Como agir"]} itens={SINAIS} colunas={1} nota="Exemplos gerais; a bordo vale sempre o procedimento do fabricante e da empresa." />;
}

// ---------------------------------------------------------------- O ozônio na cabine
const OZONIO: Ficha[] = [
  { nome: "Acima do FL 320", a: "0,25 ppm a qualquer momento", b: "É o teto de pico da norma americana de projeto" },
  { nome: "Acima do FL 270", a: "Média de 0,1 ppm em 3 horas", b: "Controla a exposição que se prolonga" },
  { nome: "Com conversor", a: "Pico médio de 4,7 ppb nos voos medidos", b: "A proteção depende do bom estado do catalisador" },
  { nome: "Sem conversor", a: "Pico médio de 47 ppb; 8 de 46 voos passaram de 100 ppb", b: "A rota e o plano de voo pesam mais" },
  { nome: "Na pele e nas roupas", a: "Reações formam outros compostos", b: "A exposição não se resume ao ozônio medido" },
];

export function OzonioCabine() {
  return <Explorador titulo="O ozônio na cabine" instrucao="Escolha um ponto para ver o número ou o fato e o que ele significa." rotulos={["O dado", "O que significa"]} itens={OZONIO} colunas={1} />;
}

// ---------------------------------------------------------------- Produtos e proteção
const FLUIDOS: Ficha[] = [
  { nome: "Vapor de querosene", a: "Inalação no abastecimento e na manutenção", b: "Sistema nervoso e tempo de reação", c: "Ventilação e menor tempo perto da fonte" },
  { nome: "Querosene na pele", a: "Respingo e roupa encharcada", b: "Vermelhidão, dermatite e mais absorção", c: "Luvas adequadas, troca da roupa e lavagem" },
  { nome: "Querosene na boca", a: "Acidente ou sucção por mangueira", b: "Aspiração e inflamação do pulmão", c: "Nunca aspirar com a boca; sem provocar vômito" },
  { nome: "Fluido hidráulico", a: "Vazamento ou serviço no sistema", b: "Irritação de pele e olhos e possível alergia", c: "Óculos, luvas e 15 minutos de lavagem" },
  { nome: "Gasolina com chumbo", a: "Fumos e partículas em motores a pistão", b: "Chumbo no sangue, pressão, rins e gestação", c: "Ventilação, higiene das mãos e avaliação do médico do trabalho" },
  { nome: "Fluido de degelo", a: "Névoa e respingos na aplicação", b: "Irritação; estudos com propilenoglicol divergem", c: "Óculos, roupa de proteção e distância da névoa" },
  { nome: "Combustível e ruído", a: "Rampa e hangar no mesmo turno", b: "Audição", c: "Protetor auricular e audiometria" },
];

export function FluidosBordo() {
  return <Explorador titulo="Produtos e proteção" instrucao="Escolha uma situação para ver o risco, o corpo atingido e a proteção." rotulos={["Risco", "No corpo", "Proteção"]} itens={FLUIDOS} colunas={1} nota="Cada produto tem sua ficha de segurança; siga a do material em uso." />;
}

// ---------------------------------------------------------------- Os métodos de desinsetização
const METODOS: Ficha[] = [
  { nome: "Blocks away", a: "Tripulação aplica com passageiros a bordo, portas fechadas, antes da decolagem", b: "D-fenotrina a 2%, 35 g por 100 m³" },
  { nome: "Pré-voo", a: "Aplicação antes do embarque, no máximo 1 hora antes de fechar as portas", b: "Permetrina a 2%, 35 g por 100 m³" },
  { nome: "Início da descida", a: "Nova aplicação quando o avião começa a descer", b: "D-fenotrina a 2%" },
  { nome: "Residual", a: "Superfícies internas tratadas sem passageiros, em intervalos de até 8 semanas", b: "Permetrina a 2%, fora das áreas de alimentos" },
];

export function MetodosDesinsetizacao() {
  return <Explorador titulo="Os métodos de desinsetização" instrucao="Escolha um método para ver como ele é feito e o produto usado." rotulos={["Como é feito", "Produto"]} itens={METODOS} colunas={1} nota="Recomendações da OMS; a exigência depende de cada país." />;
}

// ---------------------------------------------------------------- Quando a água ou a comida falham
const AGUA: Ficha[] = [
  { nome: "Coliforme positivo", a: "Desinfetar ou restringir em até 72 horas, ou repetir amostras em até 24 horas", b: "Coliformes indicam possível contaminação do sistema" },
  { nome: "E. coli positivo", a: "Restringir o acesso em até 24 horas, desinfetar e testar de novo", b: "Sugere possível resíduo humano ou animal" },
  { nome: "Aviso de água não potável", a: "Não beber nem escovar os dentes; usar água lacrada e gel", b: "O aviso vale também para preparar bebidas" },
  { nome: "Lesão na mão do cozinheiro", a: "Afastar da manipulação de alimentos", b: "Em 1975, esse caminho levou ao surto no voo" },
  { nome: "Piloto com cólicas", a: "Avisar o outro piloto e avaliar a continuação do voo", b: "A incapacitação pode evoluir rápido" },
];

export function AguaAlimentos() {
  return <Explorador titulo="Quando a água ou a comida falham" instrucao="Escolha uma situação para ver a resposta e o motivo." rotulos={["Resposta", "Por quê"]} itens={AGUA} colunas={1} nota="Prazos da regra americana da EPA; cada país tem suas normas." />;
}
