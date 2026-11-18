import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M3V7 · Medicina ocupacional. Fontes no registro de src/data/capitulos/medicina-ocupacional.ts: NTSB
// (turbulência, 2021); NR-1, NR-7, NR-15 e NR-16; CLT, arts. 192 e 193; TST, Súmula 447; RBAC 120; RBAC 67.15; Lei
// 8.213/1991. Os recursos orientam e não substituem o médico do trabalho, a perícia nem o advogado.

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

// ---------------------------------------------------------------- Riscos por função
const FUNCOES: Ficha[] = [
  { nome: 'Piloto', a: 'Fadiga, fuso, radiação cósmica, ruído e horas sentado.', b: 'Sono, audição, coração e peso, além do exame aeromédico.', c: 'Escalas avaliadas, fone com volume baixo e atividade física fora do voo.' },
  { nome: 'Comissário', a: 'Turbulência, carrinhos pesados, trabalho em pé, radiação e gestação.', b: 'Coluna, ombros, pés e acompanhamento da gestação.', c: 'Sentar no aviso de turbulência e técnica para carga.' },
  { nome: 'Mecânico', a: 'Ruído de motor, combustível, fluidos, solventes, altura e posturas forçadas.', b: 'Audiometria, pele, pulmões e coluna.', c: 'Protetor auricular, luvas, ventilação e trabalho em altura com proteção.' },
  { nome: 'Agente de rampa', a: 'Carga manual em porão baixo, calor, frio, ruído e veículos.', b: 'Coluna, audição e efeitos do calor.', c: 'Equipamentos de carga, pausas, hidratação e protetor auricular.' },
  { nome: 'Abastecedor', a: 'Inflamáveis e vapores de combustível.', b: 'Pele, pulmões e exposição química conforme o PGR.', c: 'Procedimentos de abastecimento e proteção individual.' },
  { nome: 'Controlador', a: 'Turno noturno, atenção constante e estresse.', b: 'Sono, saúde mental e audição.', c: 'Escalas com descanso e apoio psicológico.' },
];

export function RiscosFuncao() {
  return <Explorador titulo="Riscos por função" instrucao="Escolha uma função para ver os riscos, o que o médico do trabalho acompanha e como proteger." rotulos={['Riscos', 'O que o médico acompanha', 'Proteção']} itens={FUNCOES} />;
}

// ---------------------------------------------------------------- Exames da NR-7
const EXAMES: Ficha[] = [
  { nome: 'Admissional', a: 'Antes de começar a trabalhar.', b: 'Serve de base para comparar os exames seguintes, como a primeira audiometria.' },
  { nome: 'Periódico', a: 'Todo ano para expostos aos riscos do PGR; a cada 2 anos para os demais.', b: 'Mostra mudanças cedo, antes que virem doença.' },
  { nome: 'Retorno ao trabalho', a: 'Depois de 30 dias ou mais de afastamento por doença ou acidente.', b: 'Avalia se a pessoa pode reassumir a função e se a volta deve ser gradual.' },
  { nome: 'Mudança de risco', a: 'Antes de trocar de função ou de exposição.', b: 'Os exames passam a seguir o novo risco, como sair do escritório para a rampa.' },
  { nome: 'Demissional', a: 'Até 10 dias depois do fim do contrato.', b: 'Registra a saúde na saída; dispensado se o último exame for recente.' },
];

export function ExamesPcmso() {
  return <Explorador titulo="Os exames da NR-7" instrucao="Escolha um exame para ver quando ele é feito e para que serve." rotulos={['Quando', 'Para que serve']} itens={EXAMES} colunas={1} nota="Todo exame termina num ASO, que diz se a pessoa está apta ou inapta para a função." />;
}

// ---------------------------------------------------------------- Insalubridade e periculosidade na aviação
const ADICIONAIS: Ficha[] = [
  { nome: 'Abastecedor na área de operação', a: 'Periculosidade: 30% do salário.', b: 'A NR-16 considera toda a área de operação do abastecimento como área de risco.' },
  { nome: 'Tripulante a bordo no abastecimento', a: 'Sem adicional de periculosidade.', b: 'A Súmula 447 do TST diz que estar a bordo não é operar na área de abastecimento.' },
  { nome: 'Agente de rampa no ruído', a: 'Insalubridade, se a perícia achar exposição acima do limite sem proteção eficaz.', b: 'O limite da NR-15 é 85 dB(A) em 8 horas; o protetor certo pode tirar da faixa de risco.' },
  { nome: 'Mecânico com ruído e combustível', a: 'Depende da perícia; se couberem os dois, o trabalhador escolhe um.', b: 'Os adicionais de insalubridade e de periculosidade não se somam.' },
];

export function AdicionaisAviacao() {
  return <Explorador titulo="Quem recebe o quê" instrucao="Escolha uma situação para ver o adicional e o motivo." rotulos={['Adicional', 'Por quê']} itens={ADICIONAIS} colunas={1} nota="Cada caso depende de perícia no local de trabalho." />;
}

// ---------------------------------------------------------------- Testes do RBAC 120
const TESTES: Ficha[] = [
  { nome: 'Prévio', a: 'Antes de começar numa atividade de risco.', b: 'Quem entra na função já começa testado.' },
  { nome: 'Aleatório', a: 'Sorteio ao longo do ano; ao menos 50% por ano em empresas com até 500 pessoas na atividade.', b: 'Ninguém sabe quando será chamado, o que desestimula o uso.' },
  { nome: 'Pós-acidente', a: 'Álcool em até 8 horas; outras substâncias em até 32 horas.', b: 'Ajuda a separar o que o corpo trazia do que aconteceu no acidente.' },
  { nome: 'Suspeita justificada', a: 'Quando um supervisor treinado vê sinais de uso.', b: 'Protege o voo sem esperar o sorteio.' },
  { nome: 'Retorno', a: 'Depois que o especialista confirma que a indicação foi cumprida.', b: 'Precisa ser negativo para voltar à atividade de risco.' },
  { nome: 'Acompanhamento', a: 'Ao menos 6 testes sem aviso nos primeiros 12 meses, por até 60 meses.', b: 'Sustenta a recuperação nos meses de maior risco de recaída.' },
];

export function TestesRbac120() {
  return <Explorador titulo="Os seis testes do RBAC 120" instrucao="Escolha um tipo de teste para ver quando ele acontece e para que serve." rotulos={['Quando', 'Para que serve']} itens={TESTES} />;
}

// ---------------------------------------------------------------- Retorno ao voo por situação
const RETORNOS: Ficha[] = [
  { nome: 'Gripe de poucos dias', a: 'Voltar quando os sintomas e o remédio que dá sono tiverem passado.', b: 'Seios da face e ouvidos livres antes de voar.', c: 'Sem exame de retorno da NR-7 se o afastamento for menor que 30 dias.' },
  { nome: 'Cirurgia ortopédica', a: 'Força e movimento completos para todos os comandos e a evacuação.', b: 'Remédio para dor compatível com o voo.', c: 'Exame de retorno e, se preciso, volta gradual.' },
  { nome: 'Evento do coração', a: 'Avaliação cardiológica e decisão da autoridade aeromédica.', b: 'Exames específicos e, às vezes, restrição de voar com outro piloto.', c: 'Exame de retorno da NR-7 e CMA válido.' },
  { nome: 'Saúde mental ou dependência', a: 'Tratamento, programa de apoio e acompanhamento.', b: 'Testes de acompanhamento quando houver substância envolvida.', c: 'Volta combinada entre examinador, médico do trabalho e especialista.' },
  { nome: 'Pós-parto', a: 'Recuperação do parto e avaliação da amamentação.', b: 'Sono, anemia e remédios em uso.', c: 'Exame de retorno da NR-7 e conversa com o examinador.' },
];

export function RetornoSituacoes() {
  return <Explorador titulo="Voltar a voar, caso a caso" instrucao="Escolha uma situação para ver o que precisa estar resolvido, o que avaliar e o papel do trabalho." rotulos={['O que precisa estar resolvido', 'O que avaliar', 'No trabalho']} itens={RETORNOS} colunas={1} nota="Exemplos gerais; cada caso é decidido pelo médico examinador e pelo médico do trabalho." />;
}

const styles = StyleSheet.create({
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});
