import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V6 · Ergonomia e cabine de comando. Fontes no registro de src/data/capitulos/ergonomia.ts: 14 CFR
// 25.777, 25.1302, 25.1322 e 25.1447; Airbus Safety First; FAA "Sunglasses for Pilots"; 14 CFR 121.542; SKYbrary
// (Tenerife); NTSB AAR-91/04 (Avianca 52); ICAO Anexo 1. Os recursos orientam e não substituem o manual do avião.

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

// ---------------------------------------------------------------- Ajuste do assento (Airbus Safety First)
const AJUSTE: Ficha[] = [
  { nome: 'Assento baixo', a: 'O painel superior esconde parte da pista; o segmento visual fica curto.', b: 'Arremeter com neblina por não ver as luzes a tempo e perceber mal a trajetória.', c: 'Subir até alinhar as esferas da referência do olho.' },
  { nome: 'Assento na referência', a: 'Pista, telas e comandos ao alcance, como no projeto.', b: 'Nenhum próprio da posição; o cansaço pode fazer escorregar no voo longo.', c: 'Conferir de novo antes da aproximação.' },
  { nome: 'Assento alto', a: 'O painel esconde a parte de cima das telas.', b: 'Perder informação de voo e não ter o curso completo dos pedais.', c: 'Descer até a referência e reajustar os pedais.' },
  { nome: 'Pedais longe', a: 'O pé não leva o leme nem o freio até o fim.', b: 'Falha de motor na decolagem ou vento cruzado mal controlados.', c: 'Ajustar pela alavanca e testar curso e frenagem totais.' },
  { nome: 'Braço sem apoio', a: 'Punho dobrado e braço solto na turbulência.', b: 'Comandos sem querer e cansaço no braço.', c: 'Regular o apoio para o antebraço descansar com o punho reto.' },
];

export function AjusteCabine() {
  return <Explorador titulo="Sentado do jeito certo" instrucao="Escolha uma situação para ver o que o piloto vê, o risco e a correção." rotulos={['O que acontece', 'Risco', 'Correção']} itens={AJUSTE} nota="Resumo de orientação de fabricante para regulagem do assento." />;
}

// ---------------------------------------------------------------- Princípios de certificação (14 CFR 25.1302)
const PRINCIPIOS: Ficha[] = [
  { nome: 'Claro e sem ambiguidade', a: 'Comandos e informações com precisão adequada à tarefa.', b: 'Falha: duas telas que mostram a mesma coisa de jeitos diferentes.', c: 'Corpo: um piloto cansado lê o que espera, não o que está escrito.' },
  { nome: 'Acessível conforme a urgência', a: 'O que é urgente fica à mão e à vista.', b: 'Falha: comando de emergência escondido em menus.', c: 'Corpo: sob estresse, a atenção estreita e a mão busca o lugar de sempre.' },
  { nome: 'Previsível', a: 'O sistema faz o que o piloto espera e deixa intervir.', b: 'Falha: confusão de modo na automação.', c: 'Corpo: a surpresa sobe a carga de trabalho de uma vez.' },
  { nome: 'Gerenciar erros', a: 'Meios para notar e corrigir o próprio erro.', b: 'Falha: um toque acidental desliga algo crítico sem aviso.', c: 'Corpo: luvas, turbulência e fadiga aumentam o toque errado.' },
];

export function PrincipiosCabine() {
  return <Explorador titulo="O que a certificação exige" instrucao="Escolha um princípio para ver o que ele pede, um exemplo de falha e onde o corpo entra." rotulos={['O que pede', 'Exemplo de falha', 'Onde o corpo entra']} itens={PRINCIPIOS} colunas={1} nota="Resumo da regra de certificação de equipamentos da cabine para uso da tripulação." />;
}

// ---------------------------------------------------------------- Alertas da cabine (14 CFR 25.1322)
const ALERTAS: Ficha[] = [
  { nome: 'Alerta de perigo · vermelho', a: 'Consciência e resposta imediatas.', b: 'Responder já, mesmo que o alerta tenha tocado antes.', c: 'Hipóxia, fadiga e sobrecarga atrasam a percepção.' },
  { nome: 'Cautela · âmbar', a: 'Consciência imediata; resposta pode vir depois.', b: 'Reconhecer, priorizar e abrir o procedimento no momento certo.', c: 'Um alerta subestimado pode esconder um problema maior.' },
  { nome: 'Aviso · outras cores', a: 'Consciência; resposta se necessária.', b: 'Registrar e acompanhar.', c: 'Avisos demais competem com o que importa.' },
  { nome: 'Alerta que toca à toa', a: 'Repetição sem motivo cria acostumação.', b: 'Relatar para a empresa e o fabricante corrigirem.', c: 'O cérebro aprende a ignorar o que se repete.' },
];

export function AlertasCabine() {
  return <Explorador titulo="Hierarquia dos alertas" instrucao="Escolha um tipo de alerta para ver o que ele exige, o que o piloto faz e o cuidado com o corpo." rotulos={['O que exige', 'O que o piloto faz', 'Cuidado com o corpo']} itens={ALERTAS} colunas={1} />;
}

// ---------------------------------------------------------------- Compatibilidade dos equipamentos
const COMPAT: Ficha[] = [
  { nome: 'Óculos e máscara', a: 'A máscara precisa ser posta sem tirar os óculos.', b: 'Hastes grossas levantam a vedação e deixam o ar escapar.', c: 'Armação fina e óculos de reserva à mão.' },
  { nome: 'Óculos e fone', a: 'O fone precisa vedar sobre a haste.', b: 'Ruído entra e o piloto aumenta o volume.', c: 'Hastes finas e almofadas macias.' },
  { nome: 'Óculos de sol e telas', a: 'Lentes polarizadas podem apagar telas com filtro.', b: 'Informação perdida na hora de olhar o instrumento.', c: 'Cinza neutro, não polarizado.' },
  { nome: 'Capacete e pescoço', a: 'Cada grama pesa sob forças G e na ejeção.', b: 'Lesão de pescoço, sobretudo em pilotos mais leves.', c: 'Capacete leve e faixa de peso do assento respeitada.' },
  { nome: 'Aparelho auditivo e fone', a: 'O fone precisa caber sem microfonia nem dor.', b: 'Mensagem mal entendida.', c: 'Teste no avião e orientação do médico examinador.' },
];

export function CompatibilidadeEquipamentos() {
  return <Explorador titulo="Equipamentos que precisam combinar" instrucao="Escolha uma combinação para ver a exigência, o problema quando não combina e a solução." rotulos={['Exigência', 'Quando não combina', 'Solução']} itens={COMPAT} colunas={1} />;
}

// ---------------------------------------------------------------- Fraseologia
const FRASES: Ficha[] = [
  { nome: '"Estamos em decolagem"', a: 'Ambígua: pode ser \"estamos decolando\" ou \"estamos prontos\".', b: 'Ler de volta a autorização exata e esperar a autorização de decolagem.', c: 'Tenerife, 1977.' },
  { nome: '"Precisamos de prioridade"', a: 'Não diz que é emergência.', b: 'Dizer Mayday, Mayday, Mayday ou Pan-Pan, Pan-Pan, Pan-Pan.', c: 'Avianca 52, 1990.' },
  { nome: '"OK"', a: 'Não confirma o que foi entendido.', b: 'Repetir a instrução com o indicativo da aeronave.', c: 'A leitura de volta fecha o ciclo da mensagem.' },
  { nome: 'Frase longa no rádio', a: 'Ocupa a frequência e encobre outras transmissões.', b: 'Mensagens curtas, uma ideia de cada vez.', c: 'Duas transmissões ao mesmo tempo se apagam.' },
];

export function Fraseologia() {
  return <Explorador titulo="Frase fora do padrão, frase padrão" instrucao="Escolha uma frase para ver o problema, o que dizer e a lição por trás." rotulos={['Problema', 'O que dizer', 'Lição']} itens={FRASES} colunas={1} />;
}

const styles = StyleSheet.create({
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});
