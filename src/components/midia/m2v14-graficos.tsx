import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M2V14 · Rins e vias urinárias. Fontes no registro de src/data/capitulos/rins.ts: RBAC 67 Emenda 05
// (67.89 e 67.129); FAA AME Guide (Kidney Stones Disposition Table; CKD; Renal Transplant; Renal Cancer; Prostate e
// CACI Prostate Cancer; DNI/DNF); AMAS (Prostatic Hypertrophy); UK CAA Genitourinary GM, AMC1/AMC2 MED.B.035 e
// Medication for BPH e Bladder instability; CAA NZ MIS 021; Flight Safety Foundation (2001); Kidney Care UK; NKF.
// Os recursos orientam e não liberam voo.
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

function Bloco({ rotulo, cor, texto }: { rotulo: string; cor: string; texto: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
      <Marca cor={cor}>{texto}</Marca>
    </View>
  );
}

type Item = { nome: string; corpo: string; fazer: string };
function Explorador({ titulo, instrucao, itens, rotulo1, rotulo2 }: { titulo: string; instrucao: string; itens: Item[]; rotulo1: string; rotulo2: string }) {
  const [i, setI] = useState(0);
  const k = itens[i];
  return (
    <MolduraMidia tipo="Explorador" titulo={titulo} instrucao={instrucao}>
      <Opcoes itens={itens.map((x, j) => [j, x.nome] as [number, string])} valor={i} onChange={setI} colunas={2} />
      <Bloco rotulo={rotulo1} cor={Cores.destaque} texto={k.corpo} />
      <Bloco rotulo={rotulo2} cor={Cores.dourado} texto={k.fazer} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Os rins no voo (abertura)
const FATORES: Item[] = [
  { nome: 'Ar seco', corpo: 'A água sai pela respiração e pela pele sem que se perceba; a sede só aparece com perda perto de 1,5 litro.', fazer: 'Beber em goles antes da sede e usar a urina clara como guia.' },
  { nome: 'Pouca água para evitar o banheiro', corpo: 'O rim guarda água e a urina concentra: é o terreno da pedra nos rins.', fazer: 'Garrafa à vista que permita medir o que bebe, e banheiro quando o aviso permitir.' },
  { nome: 'Menos oxigênio', corpo: 'O rim saudável não sente; na doença renal, a anemia faz o pouco oxigênio pesar mais.', fazer: 'Conferir a hemoglobina com o nefrologista antes do voo.' },
  { nome: 'Horas sentado', corpo: 'A bexiga fica cheia por mais tempo; com a próstata aumentada, álcool e remédios que dão sono podem travar a urina.', fazer: 'Corredor, banheiro antes do embarque e da descida, nada de antialérgico que dá sono.' },
  { nome: 'Fuso horário', corpo: 'Diurético, remédio de pressão e imunossupressor têm hora certa; o atraso do imunossupressor abre espaço para rejeição.', fazer: 'Até 3 fusos, em geral no horário de casa; acima, plano combinado com a equipe.' },
];

export function RinsVoo() {
  return <Explorador titulo="Os rins no voo" instrucao="Escolha um fator do voo para ver o que muda nos rins e na bexiga e o que fazer." itens={FATORES} rotulo1="O que muda" rotulo2="O que fazer" />;
}

// ---------------------------------------------------------------- Pedra nos rins: tabela da FAA
type Caso = 'antigo' | 'unica' | 'retidas' | 'complicada' | 'colica';
const CASOS: Record<Caso, { nome: string; faa: string; europa: string; cor: string; situacao: string }> = {
  antigo: { nome: 'Último episódio há 5 anos ou mais', faa: 'Emite (A): sem sintomas, função normal e sem tratamento ou vigilância.', europa: 'Apto após tratamento bem-sucedido.', cor: Cores.acerto, situacao: 'Emite' },
  unica: { nome: 'Uma pedra eliminada há menos de 5 anos', faa: 'Emite (B), se a imagem confirma que não ficou pedra retida.', europa: 'Apto após tratamento bem-sucedido.', cor: Cores.acerto, situacao: 'Emite' },
  retidas: { nome: 'Pedras retidas sem sintomas', faa: 'CACI (C): segue a ficha de pedras retidas.', europa: 'Pedra residual no rim: 1ª classe com outro piloto a bordo (OML).', cor: Cores.dourado, situacao: 'CACI' },
  complicada: { nome: 'Complicação, 3 ou mais procedimentos em 5 anos ou causa metabólica', faa: 'Decisão da FAA (D): nota do urologista de até 90 dias.', europa: 'Investigação; apto após tratamento bem-sucedido.', cor: Cores.erro, situacao: 'Decisão da FAA' },
  colica: { nome: 'Cólica agora ou pedra em tratamento', faa: 'Não voar até o tratamento e a imagem sem pedra.', europa: 'Inapto até a investigação; aguardando tratamento, OML (1ª) ou OSL (2ª).', cor: Cores.erro, situacao: 'Não voar' },
};

export function CalculoFaa() {
  const [c, setC] = useState<Caso>('unica');
  const k = CASOS[c];
  return (
    <MolduraMidia tipo="Classificador" titulo="Pedra nos rins e certificado" instrucao="Escolha a situação do piloto para ver a decisão da FAA e da Europa.">
      <Opcoes itens={(Object.keys(CASOS) as Caso[]).map((x) => [x, CASOS[x].nome] as [Caso, string])} valor={c} onChange={setC} colunas={1} />
      <View style={styles.leituras}>
        <Leitura rotulo="FAA" valor={k.situacao} cor={k.cor} />
      </View>
      <Bloco rotulo="FAA" cor={k.cor} texto={k.faa} />
      <Bloco rotulo="Europa" cor={Cores.destaque} texto={k.europa} />
      <Texto cor={Cores.textoApagado}>ANAC: a urolitíase deixa não apto, salvo investigação médica e julgamento de que não afeta a segurança do voo.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- TFG e voo (FAA CKD)
export function TfgVoo() {
  const [tfg, setTfg] = useState(50);
  const [unico, setUnico] = useState(false);
  const [terapia, setTerapia] = useState<'nenhuma' | 'dialise' | 'transplante'>('nenhuma');
  let situacao = 'Emite', cor = Cores.acerto, txt = 'Estágio A: TFG de 45 a 59, sem sintomas nem complicações. O examinador emite e resume o histórico.';
  if (terapia === 'dialise') { situacao = 'Decisão da FAA'; cor = Cores.erro; txt = 'Diálise: doença renal terminal, decisão da FAA. Na Europa, inapto. Na ANAC, a insuficiência renal deixa não apto.'; }
  else if (terapia === 'transplante') { situacao = 'Decisão da FAA'; cor = Cores.dourado; txt = 'Transplante: depois de 6 meses de recuperação, a FAA decide. Na Europa, a partir de 12 meses, 1ª classe com OML. Na ANAC, apto em consulta à agência.'; }
  else if (tfg <= 34 || (unico && tfg <= 44)) { situacao = 'Decisão da FAA'; cor = Cores.erro; txt = unico && tfg > 34 ? 'Rim único com TFG de 44 ou menos: decisão da FAA, com exames de até 90 dias.' : 'Estágio C: TFG de 34 ou menos. Decisão da FAA, com exames de até 90 dias.'; }
  else if (tfg <= 44) { situacao = 'CACI'; cor = Cores.dourado; txt = 'Estágio B: TFG de 35 a 44. O examinador segue a ficha do CACI.'; }
  else if (tfg >= 60) { situacao = 'Emite'; cor = Cores.acerto; txt = 'TFG de 60 ou mais: fora da tabela de doença renal crônica da FAA, se não houver outra alteração.'; }
  return (
    <MolduraMidia tipo="Calculadora" titulo="TFG e certificado" instrucao="Mova a TFG (eGFR) do exame e indique rim único, diálise ou transplante.">
      <Controle min={10} max={90} passo={1} valor={tfg} onChange={setTfg} rotulo="TFG (eGFR)" formatar={(v) => `${fmt(v)} mL/min`} />
      <Opcoes itens={[[false, 'Dois rins'], [true, 'Rim único']] as [boolean, string][]} valor={unico} onChange={setUnico} colunas={2} />
      <Opcoes itens={[['nenhuma', 'Sem diálise'], ['dialise', 'Diálise'], ['transplante', 'Transplante']] as ['nenhuma' | 'dialise' | 'transplante', string][]} valor={terapia} onChange={setTerapia} colunas={3} />
      <View style={styles.leituras}>
        <Leitura rotulo="FAA" valor={situacao} cor={cor} />
      </View>
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>Sintomas, proteinúria de 2+ ou mais e anemia com hemoglobina abaixo de 10 g/dL também levam à decisão da FAA.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Remédios de próstata e bexiga
type Rem = 'alfa' | 'cinco' | 'antim' | 'beta3' | 'antibiotico';
const REMEDIOS: Record<Rem, { nome: string; efeito: string; uk: string; faa: string; cor: string }> = {
  alfa: { nome: 'Alfabloqueador (tansulosina)', efeito: 'A pressão cai ao levantar: tontura, palpitação e visão turva.', uk: 'No solo por pelo menos 2 semanas após início ou aumento de dose, com pressão deitado e em pé.', faa: 'Aceito depois que a dose final está estável, sem efeitos.', cor: Cores.dourado },
  cinco: { nome: 'Finasterida ou dutasterida', efeito: 'Poucos efeitos no voo; raramente alergia ou dor no testículo.', uk: '48 horas após a primeira dose.', faa: 'Cerca de 2 dias sem efeitos.', cor: Cores.acerto },
  antim: { nome: 'Oxibutinina, tolterodina, solifenacina', efeito: 'Boca seca, visão turva e sonolência.', uk: '4 semanas no solo; na 1ª classe, OML até 4 meses.', faa: 'Do Not Issue: o examinador não emite sem a FAA.', cor: Cores.erro },
  beta3: { nome: 'Mirabegrona ou vibegrona', efeito: 'Dor de cabeça, palpitação e pressão mais alta.', uk: '4 semanas no solo, com pressão, pulso e ritmo conferidos.', faa: 'Não consta da lista Do Not Issue da FAA; o examinador avalia o efeito.', cor: Cores.dourado },
  antibiotico: { nome: 'Antibiótico da infecção urinária', efeito: 'Resolve a cistite em poucos dias; alguns dão enjoo ou diarreia.', uk: 'Volta sem sintomas da infecção e sem efeitos do remédio.', faa: 'Volta sem sintomas da infecção e sem efeitos do remédio.', cor: Cores.acerto },
};

export function ProstataRemedios() {
  const [r, setR] = useState<Rem>('alfa');
  const k = REMEDIOS[r];
  return (
    <MolduraMidia tipo="Explorador" titulo="Remédios de próstata e bexiga" instrucao="Escolha o remédio para ver o efeito que importa no voo e o prazo de cada autoridade.">
      <Opcoes itens={(Object.keys(REMEDIOS) as Rem[]).map((x) => [x, REMEDIOS[x].nome] as [Rem, string])} valor={r} onChange={setR} colunas={1} />
      <Bloco rotulo="Efeito no voo" cor={Cores.destaque} texto={k.efeito} />
      <Bloco rotulo="Reino Unido" cor={k.cor} texto={k.uk} />
      <Bloco rotulo="FAA" cor={k.cor} texto={k.faa} />
      <Texto cor={Cores.textoApagado}>O passageiro usa o remédio normalmente; o tripulante começa ou muda a dose fora da escala.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Câncer urológico e certificado (FAA)
export function CancerUroFaa() {
  const [tipo, setTipo] = useState<'rim' | 'prostata'>('prostata');
  const [anos, setAnos] = useState(2);
  const [meta, setMeta] = useState(false);
  const [prostatectomia, setProstatectomia] = useState(true);
  const [psa, setPsa] = useState(0.1);
  let situacao = 'Emite', cor = Cores.acerto, txt = 'Sem metástase e tratamento concluído há 5 anos ou mais, sem recidiva: o examinador emite.';
  const limite = prostatectomia ? 0.2 : 20;
  if (meta) { situacao = 'Decisão da FAA'; cor = Cores.erro; txt = 'Metástase ou recidiva, mesmo só no PSA depois da prostatectomia: decisão da FAA, com relatório do oncologista.'; }
  else if (anos < 5) {
    if (tipo === 'prostata' && psa > limite) { situacao = 'Decisão da FAA'; cor = Cores.erro; txt = `PSA acima de ${fmt(limite, limite < 1 ? 1 : 0)}: fora do CACI, decisão da FAA.`; }
    else { situacao = 'CACI'; cor = Cores.dourado; txt = tipo === 'prostata' ? 'Menos de 5 anos: CACI, com tratamento ativo concluído, vigilância ativa ou braquiterapia, sem sintomas e sem analgésico.' : 'Menos de 5 anos: CACI do câncer de rim.'; }
  }
  return (
    <MolduraMidia tipo="Calculadora" titulo="Câncer do rim e da próstata e certificado" instrucao="Escolha o tipo, os anos desde o fim do tratamento e, na próstata, a cirurgia e o PSA.">
      <Opcoes itens={[['prostata', 'Próstata'], ['rim', 'Rim']] as ['rim' | 'prostata', string][]} valor={tipo} onChange={setTipo} colunas={2} />
      <Controle min={0} max={10} passo={1} valor={anos} onChange={setAnos} rotulo="Anos desde o fim do tratamento" formatar={(v) => `${fmt(v)} anos`} />
      <Opcoes itens={[[false, 'Sem metástase'], [true, 'Metástase ou recidiva']] as [boolean, string][]} valor={meta} onChange={setMeta} colunas={2} />
      {tipo === 'prostata' ? (
        <>
          <Opcoes itens={[[true, 'Com prostatectomia'], [false, 'Sem prostatectomia']] as [boolean, string][]} valor={prostatectomia} onChange={(v) => { setProstatectomia(v); setPsa(v ? 0.1 : 4); }} colunas={2} />
          <Controle min={0} max={prostatectomia ? 1 : 30} passo={prostatectomia ? 0.05 : 0.5} valor={psa} onChange={setPsa} rotulo="PSA dos últimos 6 meses" formatar={(v) => `${fmt(v, prostatectomia ? 2 : 1)} ng/mL`} />
        </>
      ) : null}
      <View style={styles.leituras}>
        <Leitura rotulo="FAA" valor={situacao} cor={cor} />
      </View>
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>Em quimioterapia ou radioterapia, o tratamento precisa terminar antes da certificação.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
