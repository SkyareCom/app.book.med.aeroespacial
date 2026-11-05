import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Line, Rect } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { SvgText } from '@/components/svg-texto';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Interativos do M2V9 · Hormônios e metabolismo. Fontes no registro de src/data/capitulos/hormonios.ts:
// RBAC 67.85; ICAO Anexo 1, Cap. 6; FAA AME Guide (Diabetes Medication Controlled, Acceptable Combinations of Diabetes
// Medications, ITDM, CACI Hypothyroidism, Weight Loss Medications, OSA); UK CAA (Metabolic and endocrinology GM, Thyroid
// Dysfunction); Garden et al. 2020; AsMA 2003; King et al. 2011; BMJ 2006; CDC Yellow Book; TravelHealthPro.
// Sem fonte: [confirmar na referência].
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

// ---------------------------------------------------------------- O voo e os hormônios (abertura)
type Fator = 'oxigenio' | 'gas' | 'ar' | 'imovel' | 'fuso';
const FATORES: Record<Fator, { nome: string; diabetes: string; tireoide: string; obesidade: string }> = {
  oxigenio: { nome: 'Menos oxigênio', diabetes: 'Sinais de hipóxia parecidos com os de açúcar baixo: na dúvida, meça', tireoide: 'Tireoide acelerada: coração com menos folga', obesidade: 'Hipoventilação: oxigênio baixo; teste de hipóxia antes' },
  gas: { nome: 'Gás que expande', diabetes: 'Bomba de insulina: cerca de 1 a 1,4 unidade a mais na subida', tireoide: 'Sem efeito próprio', obesidade: 'Sem efeito próprio' },
  ar: { nome: 'Ar seco', diabetes: 'Açúcar alto e SGLT2 fazem urinar mais: desidratação', tireoide: 'Sem efeito próprio', obesidade: 'Desidratação soma risco de trombose' },
  imovel: { nome: 'Imobilidade', diabetes: 'Pouco efeito direto; ande e beba água', tireoide: 'Sem efeito próprio', obesidade: 'IMC de 30 ou mais: fator de risco de trombose acima de 4 h' },
  fuso: { nome: 'Fuso e refeições', diabetes: 'Mais de 2 h de fuso: a insulina pode precisar de ajuste', tireoide: 'Levotiroxina: manter cerca de 24 h entre as doses', obesidade: 'GLP-1: náusea e pouca comida, mais tontura' },
};

export function HormoniosVoo() {
  const [f, setF] = useState<Fator>('oxigenio');
  const k = FATORES[f];
  return (
    <MolduraMidia tipo="Explorador" titulo="O voo e os hormônios" instrucao="Escolha um fator do voo para ver o que ele muda no diabetes, na tireoide e na obesidade.">
      <Opcoes itens={(Object.keys(FATORES) as Fator[]).map((x) => [x, FATORES[x].nome] as [Fator, string])} valor={f} onChange={setF} colunas={2} />
      <View style={{ gap: Espaco.sm }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Diabetes</Texto>
        <Marca cor={Cores.destaque}>{k.diabetes}</Marca>
        <Texto t="rotulo" cor={Cores.textoApagado}>Tireoide</Texto>
        <Marca cor={Cores.dourado}>{k.tireoide}</Marca>
        <Texto t="rotulo" cor={Cores.textoApagado}>Obesidade</Texto>
        <Marca cor={Cores.acerto}>{k.obesidade}</Marca>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Remédio do diabetes e prazo sem voar (FAA e ANAC)
type Remedio = 'metformina' | 'outros' | 'sulfo' | 'insulina3' | 'insulina12';
const REMEDIOS: Record<Remedio, { nome: string; faa: number; anac: string; risco: string }> = {
  metformina: { nome: 'Metformina sozinha', faa: 14, anac: '60 dias de observação; certificado de até 6 meses', risco: 'Baixo' },
  outros: { nome: 'Gliptina, GLP-1, SGLT2, glitazona ou acarbose', faa: 30, anac: '60 dias de observação; certificado de até 6 meses', risco: 'Baixo sozinho' },
  sulfo: { nome: 'Sulfonilureia ou glinida', faa: 60, anac: '60 dias de observação; certificado de até 6 meses', risco: 'Alto' },
  insulina3: { nome: 'Insulina (3ª classe FAA)', faa: 90, anac: 'Inapto', risco: 'Alto' },
  insulina12: { nome: 'Insulina com sensor (1ª e 2ª classe FAA)', faa: 180, anac: 'Inapto', risco: 'Alto' },
};

export function PrazoDiabetes() {
  const [r, setR] = useState<Remedio>('metformina');
  const [dias, setDias] = useState(10);
  const k = REMEDIOS[r];
  const falta = k.faa - dias;
  const [txt, cor] =
    falta > 0
      ? [
          falta === 1
            ? `Ainda não: a FAA pede ${fmt(k.faa)} dias sem voar ao começar. Falta 1 dia, e a FAA ainda precisa liberar.`
            : `Ainda não: a FAA pede ${fmt(k.faa)} dias sem voar ao começar. Faltam ${fmt(falta)} dias, e a FAA ainda precisa liberar.`,
          Cores.erro,
        ]
      : [`Prazo da FAA cumprido (${fmt(k.faa)} dias). A decisão inicial é da FAA: o examinador não libera sozinho.`, Cores.acerto];
  return (
    <MolduraMidia tipo="Calculadora" titulo="Remédio novo e volta ao voo" instrucao="Para o tripulante: escolha o remédio que começou e há quantos dias.">
      <Opcoes itens={(Object.keys(REMEDIOS) as Remedio[]).map((x) => [x, REMEDIOS[x].nome] as [Remedio, string])} valor={r} onChange={setR} colunas={1} />
      <Controle min={0} max={200} passo={1} valor={dias} onChange={setDias} rotulo="Dias desde o início" formatar={(v) => `${fmt(v)} ${v === 1 ? 'dia' : 'dias'}`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Risco de açúcar baixo" valor={k.risco} cor={k.risco === 'Alto' ? Cores.erro : Cores.acerto} />
        <Leitura rotulo="Prazo da FAA" valor={`${fmt(k.faa)} dias`} cor={Cores.destaque} />
      </View>
      <Marca cor={cor}>{txt}</Marca>
      <Marca cor={k.anac === 'Inapto' ? Cores.erro : Cores.dourado}>{`ANAC: ${k.anac}.`}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Semáforo do açúcar (protocolo britânico)
export function SemaforoGlicemia() {
  const [mgdl, setMg] = useState(120);
  const [larg, setLarg] = useState(300);
  const mmol = mgdl / 18;
  const W = Math.min(larg, 340), x0 = 12, x1 = W - 12, MIN = 40, MAX = 400;
  const X = (v: number) => x0 + ((Math.min(Math.max(v, MIN), MAX) - MIN) / (MAX - MIN)) * (x1 - x0);
  const FAIXAS = [
    { de: MIN, ate: 72, cor: Cores.erro },
    { de: 72, ate: 90, cor: Cores.dourado },
    { de: 90, ate: 270, cor: Cores.acerto },
    { de: 270, ate: 360, cor: Cores.dourado },
    { de: 360, ate: MAX, cor: Cores.erro },
  ];
  const [faixa, txt, cor] =
    mmol < 4
      ? ['Vermelho baixo', 'Passe o comando ao copiloto, coma 10 a 15 g de carboidrato rápido e meça de novo em 15 minutos.', Cores.erro]
      : mmol < 5
        ? ['Âmbar baixo', 'Coma carboidrato e meça de novo antes de continuar.', Cores.dourado]
        : mmol <= 15
          ? ['Verde', 'Faixa segura do protocolo: siga medindo a cada hora e 30 minutos antes do pouso.', Cores.acerto]
          : mmol <= 20
            ? ['Âmbar alto', 'Corrija conforme o plano do médico e meça de novo.', Cores.dourado]
            : ['Vermelho alto', 'Fora da faixa segura: o piloto não segue no comando e procura atendimento.', Cores.erro];
  return (
    <MolduraMidia tipo="Simulador" titulo="O semáforo do açúcar" instrucao="Protocolo britânico para pilotos com insulina, que voam com copiloto. Arraste o valor medido.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={58}>
          {FAIXAS.map((f) => (
            <Rect key={f.de} x={X(f.de)} y={22} width={X(f.ate) - X(f.de)} height={12} fill={f.cor} fillOpacity={0.55} />
          ))}
          {[72, 270].map((v) => (
            <Line key={v} x1={X(v)} y1={16} x2={X(v)} y2={40} stroke={Cores.texto} strokeWidth={1} />
          ))}
          <SvgText x={X(72)} y={12} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">4 MMOL/L</SvgText>
          <SvgText x={X(270)} y={54} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">15 MMOL/L</SvgText>
          <Circle cx={X(mgdl)} cy={28} r={7} fill={Cores.destaque} />
        </Svg>
      </View>
      <Controle min={MIN} max={MAX} passo={2} valor={mgdl} onChange={setMg} rotulo="Açúcar medido" formatar={(v) => `${fmt(v)} mg/dL`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Em mmol/L" valor={fmt(mmol, 1)} cor={Cores.destaque} />
        <Leitura rotulo="Faixa" valor={faixa} cor={cor} />
      </View>
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>Medidas: antes do voo, a cada hora e 30 minutos antes do pouso. No Brasil, a ANAC não certifica tripulantes que usam insulina.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Fuso e insulina (AsMA 2003)
export function FusoInsulina() {
  const [dir, setDir] = useState<'leste' | 'oeste'>('leste');
  const [h, setH] = useState(3);
  const [trat, setTrat] = useState<'insulina' | 'oral'>('insulina');
  let txt: string, cor: string;
  if (trat === 'oral') [txt, cor] = ['Remédio por boca: em geral, não precisa de dose extra. Num dia muito encurtado, o médico pode orientar pular uma dose.', Cores.acerto];
  else if (h <= 2) [txt, cor] = ['Até 2 horas de diferença: em geral, mantenha o esquema no horário local.', Cores.acerto];
  else if (dir === 'leste') [txt, cor] = [`O dia encurta ${fmt(h)} horas: a insulina intermediária ou longa pode precisar diminuir. Combine o plano com o médico antes.`, Cores.dourado];
  else [txt, cor] = [`O dia alonga ${fmt(h)} horas: pode precisar de uma dose extra de insulina rápida com uma refeição. Combine o plano com o médico antes.`, Cores.dourado];
  return (
    <MolduraMidia tipo="Calculadora" titulo="Fuso e insulina" instrucao="Escolha a direção, quantas horas de fuso e o tratamento.">
      <Opcoes itens={[['leste', 'Para o leste'], ['oeste', 'Para o oeste']] as ['leste' | 'oeste', string][]} valor={dir} onChange={setDir} colunas={2} />
      <Controle min={0} max={12} passo={1} valor={h} onChange={setH} rotulo="Horas de fuso" formatar={(v) => `${fmt(v)} h`} />
      <Opcoes itens={[['insulina', 'Insulina'], ['oral', 'Remédio por boca']] as ['insulina' | 'oral', string][]} valor={trat} onChange={setTrat} colunas={2} />
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>No voo, meça antes das refeições, a cada 4 a 6 horas. Nunca mude a dose sem o plano do seu médico.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Tireoide e voo
type Caso = 'hipo' | 'troca' | 'hiper' | 'iodo' | 'cirurgia';
const CASOS: Record<Caso, { nome: string; tripulante: string; passageiro: string; grave: boolean }> = {
  hipo: { nome: 'Hipotireoidismo estável', tripulante: 'FAA: liberado no exame, sem sintomas e com TSH abaixo de 10 no último ano', passageiro: 'Pode voar', grave: false },
  troca: { nome: 'Troca de dose de levotiroxina', tripulante: 'Reino Unido: até 25 µg, sem sintomas, não afasta; com sintomas, inapto até melhorar', passageiro: 'Pode voar', grave: false },
  hiper: { nome: 'Hipertireoidismo', tripulante: 'Inapto até a função normal; 1ª classe: revisão dos olhos (Reino Unido)', passageiro: 'Pode voar se estável', grave: true },
  iodo: { nome: 'Iodo radioativo', tripulante: 'Inapto até o fim do tratamento e a função estável (Reino Unido)', passageiro: 'Pode voar; levar comprovante (alarmes até cerca de 95 dias)', grave: true },
  cirurgia: { nome: 'Cirurgia da tireoide', tripulante: 'Inapto até a recuperação e a função estável (Reino Unido)', passageiro: 'Conforme o cirurgião', grave: true },
};

export function TireoideVoo() {
  const [c, setC] = useState<Caso>('hipo');
  const k = CASOS[c];
  return (
    <MolduraMidia tipo="Comparador" titulo="Tireoide e voo" instrucao="Escolha a situação para ver o que muda para o tripulante e para o passageiro.">
      <Opcoes itens={(Object.keys(CASOS) as Caso[]).map((x) => [x, CASOS[x].nome] as [Caso, string])} valor={c} onChange={setC} colunas={2} />
      <View style={{ gap: 4 }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Tripulante</Texto>
        <Marca cor={k.grave ? Cores.erro : Cores.acerto}>{k.tripulante}</Marca>
      </View>
      <View style={{ gap: 4 }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Passageiro</Texto>
        <Marca cor={Cores.acerto}>{k.passageiro}</Marca>
      </View>
      <Marca cor={Cores.textoSuave}>Ao diagnóstico, o tripulante fica afastado até a função estar normal e estável.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- IMC e voo
export function ImcVoo() {
  const [peso, setPeso] = useState(90);
  const [alt, setAlt] = useState(172);
  const imc = peso / (alt / 100) ** 2;
  const faixa = imc < 18.5 ? 'Abaixo do peso' : imc < 25 ? 'Saudável' : imc < 30 ? 'Sobrepeso' : 'Obesidade';
  const linhas: [string, string][] = [];
  if (imc >= 30) linhas.push(['Trombose', 'IMC de 30 ou mais é fator de risco em voos de mais de 4 h: corredor, andar, água.']);
  if (imc >= 35) linhas.push(['Tripulante na Europa e no Reino Unido', 'Apto só com avaliação de risco: coração e apneia.']);
  if (imc >= 40) linhas.push(['Tripulante no Brasil', 'ANAC: inapto na 1ª classe.'], ['Apneia', 'Mais de 90% das pessoas com IMC de 40 ou mais têm apneia que precisa de tratamento (FAA).']);
  return (
    <MolduraMidia tipo="Calculadora" titulo="IMC e voo" instrucao="Ajuste o peso e a altura para calcular o IMC e ver o que ele muda no voo.">
      <Controle min={40} max={200} passo={1} valor={peso} onChange={setPeso} rotulo="Peso" formatar={(v) => `${fmt(v)} kg`} />
      <Controle min={140} max={210} passo={1} valor={alt} onChange={setAlt} rotulo="Altura" formatar={(v) => `${fmt(v / 100, 2)} m`} />
      <View style={styles.leituras}>
        <Leitura rotulo="IMC" valor={fmt(imc, 1)} cor={Cores.destaque} />
        <Leitura rotulo="Faixa" valor={faixa} cor={imc >= 30 ? Cores.dourado : Cores.acerto} />
      </View>
      {linhas.length ? (
        linhas.map(([t, d]) => (
          <View key={t} style={{ gap: 4 }}>
            <Texto t="rotulo" cor={Cores.textoApagado}>{t}</Texto>
            <Marca cor={t.startsWith('Tripulante no Brasil') ? Cores.erro : Cores.dourado}>{d}</Marca>
          </View>
        ))
      ) : (
        <Marca cor={Cores.acerto}>Sem limite de peso para voar nessa faixa. Água e movimento valem para todos.</Marca>
      )}
      <Texto cor={Cores.textoApagado}>O IMC é uma triagem: a apneia também aparece com peso menor.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Remédios para emagrecer e voo
type Peso = 'glp1' | 'orlistate' | 'fentermina' | 'internet';
const PESO: Record<Peso, { nome: string; faa: string; uk: string; ok: boolean }> = {
  glp1: { nome: 'Semaglutida, liraglutida ou tirzepatida', faa: '1 semana no início; 48 h a cada aumento', uk: '2 semanas no início, com avaliação; 72 h a cada ajuste', ok: true },
  orlistate: { nome: 'Orlistate', faa: '48 h no início', uk: '[confirmar na referência]', ok: true },
  fentermina: { nome: 'Fentermina ou naltrexona com bupropiona', faa: 'Não aceito', uk: '[confirmar na referência]', ok: false },
  internet: { nome: 'Comprado sem receita, pela internet', faa: 'Fora da lista aceita: consultar a FAA', uk: 'Desqualifica', ok: false },
};

export function RemediosPeso() {
  const [p, setP] = useState<Peso>('glp1');
  const k = PESO[p];
  return (
    <MolduraMidia tipo="Comparador" titulo="Remédio para emagrecer e voo" instrucao="Para o tripulante: escolha o remédio para ver o prazo sem voar na FAA e no Reino Unido.">
      <Opcoes itens={(Object.keys(PESO) as Peso[]).map((x) => [x, PESO[x].nome] as [Peso, string])} valor={p} onChange={setP} colunas={1} />
      <View style={{ gap: 4 }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>FAA</Texto>
        <Marca cor={k.ok ? Cores.acerto : Cores.erro}>{k.faa}</Marca>
      </View>
      <View style={{ gap: 4 }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Reino Unido</Texto>
        <Marca cor={k.ok ? Cores.acerto : Cores.erro}>{k.uk}</Marca>
      </View>
      <Marca cor={Cores.textoSuave}>Com náusea, vômito ou tontura, não se voa, qualquer que seja o remédio.</Marca>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
