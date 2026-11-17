import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V4 · Fatores humanos e CRM. Fontes no registro de src/data/capitulos/fatores-humanos.ts:
// ICAO Doc 9683 (SHELL) e Doc 9803 (LOSA); Reason (1990); FAA DOT/FAA/AM-05/24 (HFACS) e DOT/FAA/AM-97/13 (consciência
// situacional); Helmreich et al. (1999); ANAC IS 00-010 Rev. B (2025); PARC/CAST (2013); BEA (AF 447) e NTSB (United 173 e
// Asiana 214). Os recursos orientam e não substituem o treinamento nem a norma.

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

type Ficha = { nome: string; a: string; b: string; c: string };
function Explorador({ titulo, instrucao, rotulos, itens, colunas }: { titulo: string; instrucao: string; rotulos: [string, string, string]; itens: Ficha[]; colunas?: number }) {
  const [i, setI] = useState(0);
  const k = itens[i];
  return (
    <MolduraMidia tipo="Explorador" titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={itens.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={colunas} />
      <Bloco rotulo={rotulos[0]} cor={Cores.destaque} texto={k.a} />
      <Bloco rotulo={rotulos[1]} cor={Cores.dourado} texto={k.b} />
      <Bloco rotulo={rotulos[2]} cor={Cores.acerto} texto={k.c} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- HFACS: os quatro níveis
const HFACS: Ficha[] = [
  { nome: 'Influências organizacionais', a: 'Pressão por pontualidade, escala apertada e falta de programa de apoio.', b: 'Ninguém dorme o suficiente, e quem sofre não procura ajuda.', c: 'Escala que respeita o descanso, programa de apoio e cultura de relato.' },
  { nome: 'Supervisão insegura', a: 'Tripulação pouco experiente escalada junta para uma noite de tempo ruim.', b: 'Fadiga e pouca experiência se somam no mesmo voo.', c: 'Planejar a escala pelo risco, não só pela disponibilidade.' },
  { nome: 'Precondições', a: 'Piloto com sono curto, gripado e com antialérgico que dá sono.', b: 'Estados fisiológicos adversos: atenção, memória e reflexo mais lentos.', c: 'Conferir o próprio estado antes do voo e não voar com remédio que dá sono.' },
  { nome: 'Atos inseguros', a: 'Item do checklist esquecido na aproximação.', b: 'É a falha ativa, a última camada: aparece na cabine, mas nasceu antes.', c: 'Checklist em voz alta, monitoramento cruzado e relato depois do voo.' },
];

export function HfacsNiveis() {
  return <Explorador titulo="Os quatro níveis do HFACS" instrucao="Escolha um nível para ver um exemplo no voo, onde o corpo entra e como fechar o furo." rotulos={['Exemplo no voo', 'Onde o corpo entra', 'Como fechar o furo']} itens={HFACS} colunas={1} />;
}

// ---------------------------------------------------------------- O corpo e a consciência situacional
const CORPO: Ficha[] = [
  { nome: 'Hipóxia', a: 'Compreender: a crítica some antes do mal-estar.', b: 'O córtex do cérebro consome muito oxigênio e falha primeiro.', c: 'Máscara primeiro ao primeiro sinal da sua assinatura.' },
  { nome: 'Fadiga', a: 'Perceber: o dado está na tela e não é visto.', b: 'Sono curto e madrugada deixam atenção e memória mais lentas.', c: 'Sono protegido e briefing com o cansaço como ameaça.' },
  { nome: 'Álcool e remédios', a: 'Perceber e compreender: o cérebro processa mais devagar.', b: 'Deprimem o sistema nervoso e somam com a hipóxia da cabine.', c: 'Respeitar o prazo de cada um antes de voar.' },
  { nome: 'Susto', a: 'Projetar: o foco se fecha e o futuro some.', b: 'A reação involuntária e o medo reduzem a capacidade de pensar.', c: 'UPRT, briefing das ameaças e divisão de tarefas.' },
  { nome: 'Desorientação', a: 'Compreender: o labirinto conta uma história falsa.', b: 'Sem referência visual, o ouvido interno confunde aceleração com inclinação.', c: 'Confiar nos instrumentos e passar os comandos ao colega.' },
];

export function CorpoConsciencia() {
  return <Explorador titulo="O corpo e a consciência situacional" instrucao="Escolha um fator do corpo para ver que nível da consciência ele derruba primeiro, por quê e a defesa." rotulos={['Nível que cai primeiro', 'Por quê', 'Defesa']} itens={CORPO} />;
}

// ---------------------------------------------------------------- Ameaça, erro ou estado indesejado?
type Evento = { nome: string; tipo: 'Ameaça' | 'Erro' | 'Estado indesejado'; porque: string; resposta: string };
const EVENTOS: Evento[] = [
  { nome: 'Trovoada na rota', tipo: 'Ameaça', porque: 'Vem de fora e exige atenção da tripulação.', resposta: 'Desviar com antecedência e combinar o plano no briefing.' },
  { nome: 'Pista trocada pelo controle na descida', tipo: 'Ameaça', porque: 'Vem de fora e aumenta a carga de trabalho na hora crítica.', resposta: 'Refazer o briefing da aproximação e, se faltar tempo, pedir mais.' },
  { nome: 'Cansaço depois da madrugada', tipo: 'Ameaça', porque: 'O corpo no limite também é uma condição que exige atenção.', resposta: 'Dizer no briefing e redistribuir as tarefas.' },
  { nome: 'Item do checklist esquecido', tipo: 'Erro', porque: 'É uma omissão da tripulação que desvia do esperado.', resposta: 'Checklist em voz alta e conferência cruzada.' },
  { nome: 'Modo errado no piloto automático', tipo: 'Erro', porque: 'É uma ação da tripulação que desvia do esperado.', resposta: 'Anunciar e conferir cada mudança de modo.' },
  { nome: 'Aproximação instável', tipo: 'Estado indesejado', porque: 'O avião já está numa situação que reduz a margem de segurança.', resposta: 'Arremeter: a margem já foi consumida.' },
  { nome: 'Velocidade abaixo da prevista na final', tipo: 'Estado indesejado', porque: 'É a consequência de um erro, e a margem está diminuindo.', resposta: 'Corrigir já ou arremeter.' },
];

export function TemClassifica() {
  const [i, setI] = useState(0);
  const k = EVENTOS[i];
  const cor = k.tipo === 'Ameaça' ? Cores.dourado : k.tipo === 'Erro' ? Cores.destaque : Cores.erro;
  return (
    <MolduraMidia tipo="Explorador" titulo="Ameaça, erro ou estado indesejado?" instrucao="Escolha um evento para ver como o TEM o classifica e qual é a resposta da tripulação.">
      <Opcoes itens={EVENTOS.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={1} />
      <Bloco rotulo="Classificação" cor={cor} texto={k.tipo} />
      <Bloco rotulo="Por quê" cor={Cores.textoSuave} texto={k.porque} />
      <Bloco rotulo="Resposta" cor={Cores.acerto} texto={k.resposta} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Níveis de automação
const NIVEIS: Ficha[] = [
  { nome: 'Piloto automático', a: 'Programa, monitora e confere os modos.', b: 'Atenção sustentada sem ação; a fadiga e a madrugada a enfraquecem.', c: 'Quando a automação surpreende ou faz algo que não se entende: descer um nível.' },
  { nome: 'Diretor de voo', a: 'Pilota à mão seguindo as barras do diretor.', b: 'Mãos e olhos juntos, com menos carga que no voo manual.', c: 'Quando as barras não fazem sentido: desligar e voar pelos instrumentos básicos.' },
  { nome: 'Voo manual', a: 'Pilota e gerencia a energia: atitude, potência e velocidade.', b: 'Coordenação e prática; sem treino, a reação é lenta.', c: 'Quando a carga sobe demais: religar a automação certa e dividir as tarefas.' },
];

export function NivelAutomacao() {
  return <Explorador titulo="Descer um nível" instrucao="Escolha o nível de automação para ver o que o piloto faz, o que o corpo exige e quando mudar." rotulos={['O que o piloto faz', 'O que o corpo exige', 'Quando mudar']} itens={NIVEIS} />;
}

const styles = StyleSheet.create({
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});
