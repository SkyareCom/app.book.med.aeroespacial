import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V10 · Emergências médicas a bordo. Fontes no registro de src/data/capitulos/emergencias-bordo.ts.
// Mesmo padrão de m3v9-graficos.tsx. Os recursos orientam e não substituem o médico, o manual da aeronave nem os
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

// ---------------------------------------------------------------- O que mais acontece a bordo
const FREQ: Ficha[] = [
  { nome: "Desmaio ou quase desmaio", a: "37,4%", b: "Deitar, elevar as pernas e medir pulso e pressão" },
  { nome: "Sintomas respiratórios", a: "12,1%", b: "Sentar ereto, oferecer oxigênio e medir a saturação" },
  { nome: "Náusea ou vômito", a: "9,5%", b: "Saco, líquidos e observar sinais de desidratação" },
  { nome: "Sintomas cardíacos", a: "7,7%", b: "Sinais vitais, kit e consulta com o solo" },
  { nome: "Convulsão", a: "5,8%", b: "Proteger a cabeça e virar de lado" },
  { nome: "Parada cardíaca", a: "0,3%", b: "Massagem cardíaca e DEA imediatamente" },
];

export function EmergenciasFrequentes() {
  return <Explorador titulo="O que mais acontece a bordo" instrucao="Escolha um quadro para ver quanto ele pesa e o primeiro passo." rotulos={["Parcela das emergências", "Primeiro passo"]} itens={FREQ} colunas={1} nota="Proporções de Peterson e colegas, 2013." />;
}

// ---------------------------------------------------------------- Os conjuntos de bordo no Brasil
const KITS: Ficha[] = [
  { nome: "Conjunto de Primeiros Socorros", a: "Um para cada 100 passageiros", b: "Ferimentos e mal-estar simples; inclui o AMBU" },
  { nome: "Conjunto de Precaução Universal", a: "Nos aviões que exigem comissário", b: "Lidar com sangue, vômito e secreções com segurança" },
  { nome: "Conjunto Médico de Emergência", a: "Mais de 100 passageiros em trechos de mais de 2 horas", b: "Remédios e equipamentos para uso por profissional de saúde" },
  { nome: "Oxigênio de primeiros socorros", a: "Previsto no RBAC 121", b: "Oferecer oxigênio a quem passa mal" },
];

export function KitsBordo() {
  return <Explorador titulo="Os conjuntos de bordo no Brasil" instrucao="Escolha um conjunto para ver quando é exigido e para que serve." rotulos={["Quando é exigido", "Para que serve"]} itens={KITS} colunas={1} nota="Conteúdo de cada conjunto: Apêndice A do RBAC 121." />;
}

// ---------------------------------------------------------------- Ligação com o médico de solo
const SOLO: Ficha[] = [
  { nome: "Primeiro contato", a: "Idade, sexo, queixa e início", b: "Orienta a primeira avaliação" },
  { nome: "Depois da avaliação", a: "Sinais vitais, doenças, remédios e alergias", b: "Autoriza itens do kit e sugere tratamento" },
  { nome: "Depois do tratamento", a: "Resposta, horários e doses", b: "Decide se recomenda seguir ou desviar" },
  { nome: "Se houver desvio", a: "Estado atual do passageiro", b: "Avisa a equipe de resgate do aeroporto" },
];

export function ConsultaSolo() {
  return <Explorador titulo="Ligação com o médico de solo" instrucao="Escolha a fase do atendimento para ver o que passar e o que esperar do solo." rotulos={["O que passar", "O que o solo faz"]} itens={SOLO} colunas={1} />;
}

// ---------------------------------------------------------------- O que fazer em cada quadro
const PROT: Ficha[] = [
  { nome: "Desmaio", a: "Deitar, elevar as pernas e medir a pressão", b: "Oxigênio de primeiros socorros" },
  { nome: "Hipoglicemia", a: "Açúcar pela boca se estiver acordado", b: "Glicose a 50% na veia" },
  { nome: "Alergia grave", a: "Avaliar respiração e pressão", b: "Adrenalina 0,3 mg e difenidramina 50 mg no músculo (adulto)" },
  { nome: "Crise de asma", a: "Sentar ereto e oferecer oxigênio", b: "Broncodilatador inalatório" },
  { nome: "Dor no peito", a: "Sinais vitais e consulta com o solo", b: "Ácido acetilsalicílico e nitroglicerina, se não houver contraindicação" },
  { nome: "Convulsão", a: "Proteger a cabeça e virar de lado", b: "O kit mínimo não tem anticonvulsivante" },
  { nome: "Parada cardíaca", a: "Massagem cardíaca no chão", b: "DEA o quanto antes" },
];

export function ProtocoloBordo() {
  return <Explorador titulo="O que fazer em cada quadro" instrucao="Escolha um quadro para ver o primeiro passo e o que o kit oferece." rotulos={["Primeiro passo", "Do kit"]} itens={PROT} colunas={1} nota="Recurso educativo: o tratamento segue a competência de quem atende e a orientação do médico de solo." />;
}

// ---------------------------------------------------------------- Atender é obrigatório?
const DEVER: Ficha[] = [
  { nome: "Companhia brasileira, voo doméstico", a: "Ética médica e Código Penal, art. 135", b: "Atuar dentro da competência e registrar" },
  { nome: "Companhia americana", a: "Sem obrigação legal", b: "Lei de 1998, salvo negligência grave ou dolo" },
  { nome: "Austrália e alguns países europeus", a: "A lei exige que o profissional atenda", b: "Regras locais de cada país" },
  { nome: "Voo internacional de outra bandeira", a: "Depende do país da companhia, da rota e do local", b: "Regras do país e direito internacional" },
  { nome: "Médico sob efeito de álcool ou remédio", a: "Avisar que não está em condições", b: "Não atender é a conduta ética" },
];

export function DeverSocorro() {
  return <Explorador titulo="Atender é obrigatório?" instrucao="Escolha onde o voo está para ver o dever e a proteção de quem atende." rotulos={["Dever", "Proteção"]} itens={DEVER} colunas={1} nota="Recurso educativo: não substitui orientação jurídica." />;
}

// ---------------------------------------------------------------- Pousar ou seguir?
const DESVIO: Ficha[] = [
  { nome: "Desmaio que melhora deitado", a: "Seguir viagem", b: "Quadro comum que se resolve a bordo" },
  { nome: "Sinais de AVC no meio do oceano", a: "Pousar no aeroporto adequado mais próximo", b: "O tratamento depende do tempo" },
  { nome: "Parada cardíaca com retorno do pulso", a: "Pousar", b: "Precisa de hospital o quanto antes" },
  { nome: "Dor no peito a 30 minutos do destino", a: "Pode ser mais rápido seguir", b: "Desvio também leva tempo" },
  { nome: "Trabalho de parto", a: "Pousar, conforme o tempo restante", b: "O kit mínimo não tem material de parto" },
];

export function DesvioDecisao() {
  return <Explorador titulo="Pousar ou seguir?" instrucao="Escolha um cenário para ver a tendência da decisão e quem decide." rotulos={["Tendência", "Por quê"]} itens={DESVIO} colunas={1} nota="Em todos os casos, quem decide é o comandante." />;
}
