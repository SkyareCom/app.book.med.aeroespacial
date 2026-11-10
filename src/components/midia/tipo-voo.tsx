import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Comparador "Tipo de voo" (pedido do autor, 10/11/2026): cada doença no avião pressurizado, no não pressurizado e no
// helicóptero. Os dados de cada voo ficam aqui, com as fontes no registro do arquivo do capítulo correspondente.
type Aeronave = 'pressurizado' | 'nao' | 'helicoptero';
type Linha = Record<Aeronave, string> & { nome: string };

const AERONAVE: [Aeronave, string][] = [
  ['pressurizado', 'Avião pressurizado'],
  ['nao', 'Avião não pressurizado'],
  ['helicoptero', 'Helicóptero'],
];

function TipoVoo({ titulo, dados }: { titulo: string; dados: Linha[] }) {
  const [d, setD] = useState(0);
  const [a, setA] = useState<Aeronave>('pressurizado');
  return (
    <MolduraMidia tipo="Comparador" titulo={titulo} instrucao="Escolha a doença e o tipo de aeronave.">
      <Opcoes itens={dados.map((x, i) => [i, x.nome] as [number, string])} valor={d} onChange={setD} colunas={1} />
      <Opcoes itens={AERONAVE} valor={a} onChange={setA} colunas={1} />
      <View style={styles.marca}>
        <Texto>{dados[d][a]}</Texto>
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- M2V2 · Coração (registro em coracao.ts)
const CORACAO: Linha[] = [
  { nome: 'Pressão alta controlada', pressurizado: 'Sem restrição; remédios no horário, ajustados ao fuso.', nao: 'A altitude não muda a pressão de forma relevante; atenção à desidratação com diurético.', helicoptero: 'Com um só piloto, a incapacitação súbita pesa mais; a pressão precisa estar estável.' },
  { nome: 'Infarto ou stent recente', pressurizado: 'Cumprir o prazo: stent 1 a 3 dias, infarto sem complicação 7 a 10 dias (passageiro).', nao: 'A falta de oxigênio cresce com a altitude: mais isquemia em quem tem pouca reserva.', helicoptero: 'Voo baixo, mas vibração e esforço de embarque logo depois do evento.' },
  { nome: 'Arritmia ou aparelho implantado', pressurizado: 'Ritmo controlado: voo possível; aparelho não interfere no avião.', nao: 'A falta de oxigênio acelera o coração e, em quem tem pouca reserva, pode piorar a arritmia.', helicoptero: 'Crise de arritmia com um só piloto: ninguém assume o comando.' },
  { nome: 'Insuficiência cardíaca', pressurizado: 'Classe I–II sem restrição; III com oxigênio; descompensada, adiar.', nao: 'Quem precisa de oxigênio no voo comercial não sobe sem ele.', helicoptero: 'Transporte aeromédico com oxigênio e monitor quando necessário.' },
  { nome: 'Trombose', pressurizado: 'Risco do voo longo, acima de 4 horas: andar, panturrilha, corredor.', nao: 'Trechos curtos: risco desprezível abaixo de 4 horas.', helicoptero: 'Trechos curtos: o que pesa é a imobilidade, não a aeronave.' },
];
export function TipoVooCoracao() {
  return <TipoVoo titulo="O coração em cada tipo de voo" dados={CORACAO} />;
}

// ---------------------------------------------------------------- M2V3 · Ouvidos, seios e dentes (registro em ouvidos.ts)
const OUVIDOS: Linha[] = [
  { nome: 'Ouvido entupido ou barotrauma', pressurizado: 'Descida de 8.000 ft: cerca de 195 mmHg sobre o tímpano. Adiar se não equaliza.', nao: 'Descida de 10.000 ft: cerca de 237 mmHg, mais do que na cabine pressurizada.', helicoptero: 'Altitudes menores, mas subidas e descidas repetidas em pouco tempo.' },
  { nome: 'Cirurgia do ouvido', pressurizado: 'Passageiro: ao menos 10 dias, com liberação do otorrino.', nao: 'Mesmo prazo; a variação maior de pressão pede ainda mais cuidado.', helicoptero: 'Mesmo prazo; tripulante após estapedectomia: 1 a 3 meses (ICAO).' },
  { nome: 'Vertigem', pressurizado: 'Passageiro avaliado antes; tripulante não voa até se recuperar.', nao: 'Descida sem equalizar pode provocar vertigem alternobárica.', helicoptero: 'Com um só piloto, ninguém assume o comando numa crise.' },
  { nome: 'Perda auditiva', pressurizado: 'Ruído de cabine menor; avisos também por escrito se preciso.', nao: 'Ruído maior no avião leve: fone e capacete são essenciais.', helicoptero: 'Ruído intenso: proteção auditiva e comunicação pelo fone.' },
  { nome: 'Sinusite ou nariz entupido', pressurizado: 'Não voar resfriado como tripulante; passageiro pensa em adiar.', nao: 'Variação de pressão maior, dor mais forte na descida.', helicoptero: 'Descidas rápidas e repetidas pioram a dor do seio bloqueado.' },
  { nome: 'Dente tratado há pouco', pressurizado: 'Respeitar o prazo: 24 h a 2 semanas, conforme o procedimento.', nao: 'Variações maiores: prazo cumprido com rigor.', helicoptero: 'Variações frequentes: prazo cumprido com rigor.' },
];
export function TipoVooOuvidos() {
  return <TipoVoo titulo="Ouvidos, seios e dentes em cada tipo de voo" dados={OUVIDOS} />;
}

// ---------------------------------------------------------------- M2V4 · Olhos (registro em olhos.ts)
const OLHOS: Linha[] = [
  { nome: 'Óculos ou lente de contato', pressurizado: 'Par de reserva na cabine; lágrima artificial no ar seco.', nao: 'Ar mais seco e vento da janela incomodam a lente de contato.', helicoptero: 'Vibração borra a leitura; óculos firmes sob o capacete.' },
  { nome: 'Visão noturna fraca', pressurizado: 'Hipóxia leve da cabine já reduz a visão noturna.', nao: 'Sem oxigênio, piora acima de 5.000 ft à noite; o fumante piora antes.', helicoptero: 'Óculos de visão noturna estreitam o campo: varredura com a cabeça.' },
  { nome: 'Glaucoma ou perda de campo', pressurizado: 'Controle em dia: colírios na bagagem de mão, no horário.', nao: 'À noite, a hipóxia estreita ainda mais o campo.', helicoptero: 'Voo baixo exige o campo inteiro contra fios e obstáculos.' },
  { nome: 'Visão de um olho só', pressurizado: 'Passageiro sem restrição.', nao: 'Tripulante: 6 meses de adaptação e teste em voo (ICAO).', helicoptero: 'Varredura lateral mais exigente no voo baixo.' },
  { nome: 'Gás no olho após cirurgia de retina', pressurizado: 'Não voar até absorver: cerca de 2 semanas (SF6) ou 6 semanas (C3F8).', nao: 'Cabine mais alta: o gás se expande mais. Não voar.', helicoptero: 'Também proibido; até a subida da serra de carro pode expandir o gás.' },
  { nome: 'Laser ou luz forte', pressurizado: 'Dois pilotos: quem não foi atingido assume.', nao: 'Avião leve com um só piloto: proteger os olhos e manter o controle.', helicoptero: 'Voo baixo e lento perto de cidades: mais tempo ao alcance do laser.' },
];
export function TipoVooOlhos() {
  return <TipoVoo titulo="Os olhos em cada tipo de voo" dados={OLHOS} />;
}

// ---------------------------------------------------------------- M2V5 · Orientação (registro em orientacao.ts)
const ORIENTACAO: Linha[] = [
  { nome: 'Ilusões e desorientação', pressurizado: 'Dois pilotos e piloto automático: quem se sente desorientado passa os comandos.', nao: 'Avião leve, muitas vezes sem habilitação de instrumentos: entrar em nuvem é a situação clássica.', helicoptero: 'Voo baixo, pairado na poeira ou na neve e um só piloto: o risco é maior.' },
  { nome: 'Doença do labirinto', pressurizado: 'Passageiro avaliado antes; tripulante não voa com vertigem.', nao: 'Descida sem equalizar pode provocar vertigem alternobárica.', helicoptero: 'Uma crise sem copiloto não tem quem assuma o comando.' },
  { nome: 'Cinetose', pressurizado: 'Assento perto das asas; o jato cruza acima de parte do mau tempo.', nao: 'Voo mais baixo, mais turbulência e mais enjoo.', helicoptero: 'Vibração e turbulência baixa: enjoo mais comum.' },
  { nome: 'Remédio que dá sono', pressurizado: 'Passageiro pode usar; tripulante espera 5 intervalos de dose.', nao: 'Somado à hipóxia acima de 10.000 ft, piora o julgamento.', helicoptero: 'Proibido em serviço: o voo baixo não perdoa atraso de reação.' },
];
export function TipoVooOrientacao() {
  return <TipoVoo titulo="A orientação em cada tipo de voo" dados={ORIENTACAO} />;
}

// ---------------------------------------------------------------- M2V6 · Cérebro (registro em cerebro.ts)
const CEREBRO: Linha[] = [
  { nome: 'Epilepsia', pressurizado: 'Passageiro controlado voa; doses no horário com o fuso, sono em dia.', nao: 'Hipóxia e cansaço do voo leve baixam o limiar da crise.', helicoptero: 'Luz do sol cortada pelas pás pode piscar na faixa que dispara crises.' },
  { nome: 'Desmaio', pressurizado: 'Desmaio benigno não impede; levantar devagar e beber água.', nao: 'Hipóxia soma-se à queda de pressão.', helicoptero: 'Um só desmaio no comando é incapacitação total.' },
  { nome: 'Enxaqueca', pressurizado: 'Remédio de crise na bagagem de mão, tomado no início.', nao: 'Hipóxia acima de 10.000 ft pode disparar a crise.', helicoptero: 'Ruído, vibração e luz piscando somam gatilhos.' },
  { nome: 'AVC recente', pressurizado: 'Passageiro: não até o 4º dia; do 5º ao 14º, estável e com oxigênio (IATA).', nao: 'Sem oxigênio, a margem do cérebro lesado é menor.', helicoptero: 'Transporte aeromédico com equipe e oxigênio, quando necessário.' },
  { nome: 'Cirurgia do crânio ou ar na cabeça', pressurizado: 'Passageiro: 10 a 14 dias, com avaliação do ar.', nao: 'O ar se expande mais que na cabine pressurizada.', helicoptero: 'Voo baixo expande menos, mas o prazo vale do mesmo jeito.' },
];
export function TipoVooCerebro() {
  return <TipoVoo titulo="O cérebro em cada tipo de voo" dados={CEREBRO} />;
}

// ---------------------------------------------------------------- M2V7 · Mente (registro em mente.ts)
const MENTE: Linha[] = [
  { nome: 'Depressão ou ansiedade', pressurizado: 'ICAO: ISRS estável aceito com restrição a voar com copiloto.', nao: 'Hipóxia acima de 10.000 ft deixa o raciocínio mais lento.', helicoptero: 'Muitas vezes um só piloto: a restrição a voar com copiloto não se cumpre.' },
  { nome: 'Medo de voar', pressurizado: 'Respirar devagar e avisar a tripulação; terapia antes da viagem.', nao: 'Avião pequeno sente mais a turbulência; explique o voo antes.', helicoptero: 'Ruído e vibração altos: fone e explicação antes ajudam.' },
  { nome: 'Bipolar ou psicose', pressurizado: 'Passageiro estável voa, às vezes com acompanhante; em crise, adia.', nao: 'Sem tripulação de cabine para ajudar numa crise.', helicoptero: 'Sem tripulação de cabine; paciente em crise só com equipe médica.' },
  { nome: 'Álcool', pressurizado: 'Dormir depois de beber: saturação abaixo de 90% em 201 de 240 minutos (câmara).', nao: 'Acima de 10.000 ft sem oxigênio, a hipóxia soma-se ao álcool.', helicoptero: 'Mesma regra: 8 horas e 0,04 g/dL; o voo baixo não perdoa reflexo lento.' },
  { nome: 'Remédio que dá sono', pressurizado: 'Passageiro só se já usou antes; tripulante: 8 a 12 h antes.', nao: 'Somado à hipóxia, piora o julgamento.', helicoptero: 'Proibido em serviço: o voo baixo exige reação rápida.' },
];
export function TipoVooMente() {
  return <TipoVoo titulo="A mente em cada tipo de voo" dados={MENTE} />;
}

// ---------------------------------------------------------------- M2V8 · Sono (registro em sono.ts)
const SONO: Linha[] = [
  { nome: 'Jet lag', pressurizado: 'Rotas longas cruzam muitos fusos; para o leste, o ajuste é mais lento.', nao: 'Raramente cruza fusos; o que pesa é a madrugada.', helicoptero: 'Raramente cruza fusos; a escala de madrugada desloca o relógio.' },
  { nome: 'Fadiga', pressurizado: 'Tripulação aumentada e beliche nos voos longos.', nao: 'Acima de 10.000 ft sem oxigênio, a hipóxia soma-se ao cansaço.', helicoptero: 'Muitas vezes um só piloto: ninguém assume se o sono vencer.' },
  { nome: 'Apneia do sono', pressurizado: 'Passageiro leva o CPAP, com aprovação da companhia, e usa no voo noturno.', nao: 'O risco é a sonolência de dia no comando; tratar antes de voar.', helicoptero: 'Sonolência com um só piloto: tratar antes de voar.' },
  { nome: 'Remédio para dormir', pressurizado: 'Passageiro: ação curta, sem álcool; tripulante: 12 a 72 h antes (FAA).', nao: 'Somado à hipóxia, piora o julgamento.', helicoptero: 'Mesmas esperas da FAA: 12 a 72 h.' },
  { nome: 'Narcolepsia', pressurizado: 'Passageiro voa com o remédio no horário.', nao: 'Tripulante: incompatível com o voo (FAA).', helicoptero: 'Tripulante: incompatível com o voo (FAA).' },
];
export function TipoVooSono() {
  return <TipoVoo titulo="O sono em cada tipo de voo" dados={SONO} />;
}

// ---------------------------------------------------------------- M2V9 · Hormônios (registro em hormonios.ts)
const HORMONIOS: Linha[] = [
  { nome: 'Diabetes com insulina', pressurizado: 'Passageiro voa; Reino Unido certifica piloto de linha com copiloto.', nao: 'Subida maior: mais bolhas na bomba; hipóxia acima de 10.000 ft imita a hipoglicemia.', helicoptero: 'Um só piloto: o protocolo com copiloto não se cumpre.' },
  { nome: 'Diabetes sem insulina', pressurizado: 'Medir a cada 4 a 6 horas nos voos longos.', nao: 'Lanche à mão: escalas e atrasos sem serviço de bordo.', helicoptero: 'Prazo de cada remédio novo antes de voar (FAA).' },
  { nome: 'Tireoide', pressurizado: 'Estável: sem restrição; levotiroxina a cada 24 h com o fuso.', nao: 'Descontrolada: a taquicardia tem menos folga na hipóxia.', helicoptero: 'Visão dupla da doença de Graves pesa no voo baixo.' },
  { nome: 'Obesidade', pressurizado: 'Voo longo: trombose; assento do corredor e caminhar.', nao: 'Hipoventilação: mais hipóxia acima de 10.000 ft.', helicoptero: 'Espaço e peso a bordo entram no planejamento.' },
  { nome: 'Cirurgia bariátrica', pressurizado: 'Passageiro: cerca de 10 dias, com o cirurgião.', nao: 'Tripulante: até 3 meses inapto (Reino Unido).', helicoptero: 'Tripulante: até 3 meses inapto (Reino Unido).' },
];
export function TipoVooHormonios() {
  return <TipoVoo titulo="Os hormônios em cada tipo de voo" dados={HORMONIOS} />;
}

const styles = StyleSheet.create({
  marca: { paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
