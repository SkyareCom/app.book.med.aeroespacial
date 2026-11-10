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

// ---------------------------------------------------------------- M2V11 · Sangue, câncer e infecções (registro em sangue-imunidade.ts)
const SANGUE: Linha[] = [
  { nome: 'Anemia', pressurizado: 'Hemoglobina abaixo de 8,5 g/dL: adiar, salvo anemia crônica estável avaliada.', nao: 'Acima de 10.000 ft sem oxigênio, a reserva acaba mais rápido.', helicoptero: 'Quem sangra viaja em transporte aeromédico, com equipe e oxigênio.' },
  { nome: 'Doença falciforme', pressurizado: 'Crise nos 9 dias anteriores: adiar.', nao: 'Sem oxigênio acima de 10.000 ft: menos folga.', helicoptero: 'Crise a bordo pede equipe e oxigênio.' },
  { nome: 'Trombose ou embolia', pressurizado: 'Perna: anticoagulante estável; embolia: 5 dias (IATA) a 2 semanas (BTS).', nao: 'Trechos curtos; o que pesa é o oxigênio depois da embolia.', helicoptero: 'Trechos curtos; mesmos prazos.' },
  { nome: 'Câncer operado', pressurizado: 'Abdome cerca de 10 dias; tórax 4 semanas após o dreno; crânio 10 a 14 dias.', nao: 'O ar que ficou no corpo se expande mais.', helicoptero: 'Voo baixo expande menos, mas o prazo vale.' },
  { nome: 'Infecção transmissível', pressurizado: 'Filtros ajudam, mas não protegem quem senta perto.', nao: 'Cabine pequena, ocupantes muito próximos.', helicoptero: 'Cabine pequena; transporte de paciente com equipe protegida.' },
  { nome: 'HIV', pressurizado: 'Controlado: sem restrição; doses ajustadas ao fuso.', nao: 'Mesmas regras de remédio e de sintomas.', helicoptero: 'Mesmas regras de remédio e de sintomas.' },
];
export function TipoVooSangue() {
  return <TipoVoo titulo="Sangue, câncer e infecções em cada tipo de voo" dados={SANGUE} />;
}

// ---------------------------------------------------------------- M2V10 · Digestivo (registro em digestivo.ts)
const DIGESTIVO: Linha[] = [
  { nome: 'Gás e distensão', pressurizado: 'A 8.000 ft, o gás do intestino cresce cerca de 38%.', nao: 'A 10.000 ft, cerca de 50%; mais alto, ainda mais.', helicoptero: 'Voo baixo expande menos; subidas e descidas repetidas.' },
  { nome: 'Úlcera ou sangramento', pressurizado: 'Passageiro só estável e com hemoglobina adequada.', nao: 'Sem oxigênio acima de 10.000 ft: menos folga para a anemia.', helicoptero: 'Quem sangra viaja em transporte aeromédico.' },
  { nome: 'Diarreia ou doença inflamatória', pressurizado: 'Há banheiro; reidratar e levar remédios na bagagem de mão.', nao: 'Quase nunca há banheiro: crise vira pouso de urgência.', helicoptero: 'Sem banheiro: voar só sem crise.' },
  { nome: 'Cirurgia por vídeo ou colonoscopia', pressurizado: 'Passageiro: cerca de 24 horas (UK CAA).', nao: 'O gás residual cresce mais: respeitar o prazo.', helicoptero: 'Expande menos, mas a vibração pesa na ferida.' },
  { nome: 'Cirurgia abdominal aberta', pressurizado: 'Passageiro: 10 dias (UK CAA).', nao: 'Mesmo prazo, com mais expansão do gás.', helicoptero: 'Mesmo prazo; tripulante após hérnia: 3 a 4 semanas (Reino Unido).' },
];
export function TipoVooDigestivo() {
  return <TipoVoo titulo="O aparelho digestivo em cada tipo de voo" dados={DIGESTIVO} />;
}

// ---------------------------------------------------------------- M2V1 · Pulmões e hipóxia (registro em hipoxia.ts)
const PULMAO: Linha[] = [
  { nome: 'Asma ou DPOC', pressurizado: 'Cabine até 8.000 ft; quem precisa de oxigênio combina o concentrador com a companhia.', nao: 'Acima de 10.000 ft sem oxigênio, a saturação da DPOC cai mais depressa.', helicoptero: 'Voo baixo; ar frio e poeira do rotor podem disparar crise de asma.' },
  { nome: 'Apneia do sono', pressurizado: 'CPAP a bordo nos voos noturnos, com aprovação da companhia.', nao: 'Voos curtos e diurnos; sonolência soma-se à hipóxia acima de 10.000 ft.', helicoptero: 'Um só piloto: tratar antes de voar.' },
  { nome: 'Pneumotórax', pressurizado: 'O ar preso cresce cerca de 38% a 8.000 ft; 7 dias após a resolução.', nao: 'Cerca de 50% a 10.000 ft: mesmo prazo, mais expansão.', helicoptero: 'Expande menos; transporte aeromédico costuma pedir dreno antes.' },
  { nome: 'Monóxido de carbono', pressurizado: 'Raro na cabine pressurizada.', nao: 'Aquecimento pelo escapamento pode vazar monóxido: detector na cabine.', helicoptero: 'Gases do motor perto do solo e no pairado: atenção ao cheiro e à dor de cabeça.' },
  { nome: 'Cirurgia do tórax', pressurizado: 'Passageiro: 4 semanas após retirar o dreno (2 se essencial).', nao: 'Mesmo prazo, com mais expansão do ar residual.', helicoptero: 'Mesmo prazo; tripulante depende da autoridade.' },
];
export function TipoVooPulmao() {
  return <TipoVoo titulo="Os pulmões em cada tipo de voo" dados={PULMAO} />;
}

// ---------------------------------------------------------------- M1V1 · Os gases do corpo em cada tipo de voo (registro em atmosfera.ts)
const GASES: Linha[] = [
  { nome: 'Ouvido e seios', pressurizado: 'Descida de 8.000 ft: adiar se não equaliza (Veja M2V3).', nao: 'Variações maiores: o barotrauma é mais provável.', helicoptero: 'Subidas e descidas repetidas no mesmo voo.' },
  { nome: 'Gás preso no corpo', pressurizado: 'Cresce 1,4 vez a 8.000 ft.', nao: 'Cerca de 1,5 vez a 10.000 ft e 2,1 vezes a 18.000 ft.', helicoptero: 'Altitudes menores: expande menos.' },
  { nome: 'Bolhas de nitrogênio', pressurizado: 'Só na descompressão da cabine.', nao: 'Risco em todo voo acima de 18.000 ft.', helicoptero: 'Raro; mergulhador doente viaja o mais baixo possível.' },
  { nome: 'Ar seco', pressurizado: 'Umidade de 10% a 20% no cruzeiro longo.', nao: 'Voos curtos; pesa o calor da cabine ao sol.', helicoptero: 'Voos curtos; pesa o calor da cabine ao sol.' },
];
export function TipoVooGases() {
  return <TipoVoo titulo="Os gases do corpo em cada tipo de voo" dados={GASES} />;
}

// ---------------------------------------------------------------- M1V2 · A altitude de cabine em cada tipo de voo (registro em pressurizacao.ts)
const CABINE: Linha[] = [
  { nome: 'Pessoa saudável', pressurizado: 'Cabine até 8.000 ft: sem efeito relevante.', nao: 'A cabine é a própria altitude: oxigênio a partir de 12.500 ft (FAA).', helicoptero: 'Voo baixo: sem efeito, salvo na montanha.' },
  { nome: 'DPOC, coração ou anemia', pressurizado: 'Oxigênio a bordo combinado pelo MEDIF, se indicado.', nao: 'Sem oxigênio, evitar altitudes acima de 8.000 ft.', helicoptero: 'Transporte aeromédico com oxigênio.' },
  { nome: 'Gás preso no corpo', pressurizado: 'Respeitar os prazos de cada cirurgia.', nao: 'Mesmos prazos, com mais expansão.', helicoptero: 'Expande menos, mas o prazo vale.' },
];
export function TipoVooCabine() {
  return <TipoVoo titulo="A altitude de cabine em cada tipo de voo" dados={CABINE} />;
}

// ---------------------------------------------------------------- M1V3 · A descompressão em cada tipo de voo (registro em descompressao.ts)
const DESCOMPRESSAO: Linha[] = [
  { nome: 'Doença descompressiva', pressurizado: 'Só na perda de pressurização; oxigênio e pouso.', nao: 'Risco em todo voo acima de 18.000 ft.', helicoptero: 'Raro pela altitude; cuidado com mergulhadores.' },
  { nome: 'Depois de mergulhar', pressurizado: '12 h (sem parada) ou 24 h (com parada) até 8.000 ft.', nao: 'Acima de 8.000 ft: 24 h depois de qualquer mergulho.', helicoptero: 'Mesmos prazos; voar o mais baixo possível.' },
  { nome: 'Depois da câmara hiperbárica', pressurizado: 'Em geral 72 h; até 6 semanas, conforme o médico.', nao: 'Mesmo prazo.', helicoptero: 'Mesmo prazo.' },
];
export function TipoVooDescompressao() {
  return <TipoVoo titulo="A descompressão em cada tipo de voo" dados={DESCOMPRESSAO} />;
}

// ---------------------------------------------------------------- M1V4 · Calor e frio em cada tipo de voo (registro em temperatura.ts)
const TEMPERATURA: Linha[] = [
  { nome: 'Calor e desidratação', pressurizado: 'Risco no solo, com a cabine parada ao sol.', nao: 'Cabine envidraçada esquenta como estufa.', helicoptero: 'Capacete e macacão retêm calor; o voo baixo não refresca.' },
  { nome: 'Insolação', pressurizado: 'Voltar só depois da recuperação e da avaliação.', nao: 'Mesmo critério.', helicoptero: 'Mesmo critério.' },
  { nome: 'Hipotermia e congelamento', pressurizado: 'Risco no pouso forçado em região fria.', nao: 'Aquecimento fraco no avião leve.', helicoptero: 'Resgate: vítima deitada, aquecida e sem movimentos bruscos.' },
];
export function TipoVooTemperatura() {
  return <TipoVoo titulo="Calor e frio em cada tipo de voo" dados={TEMPERATURA} />;
}

// ---------------------------------------------------------------- M1V5 · A radiação em cada tipo de voo (registro em radiacao.ts)
const RADIACAO: Linha[] = [
  { nome: 'Dose cósmica', pressurizado: 'Maior nas rotas altas, longas e polares.', nao: 'Voo baixo: dose muito menor.', helicoptero: 'Voo baixo: dose muito menor.' },
  { nome: 'Gestação', pressurizado: 'Comunicar cedo e ajustar a escala: feto até 1 mSv.', nao: 'Dose baixa; outros riscos do voo pesam mais.', helicoptero: 'Dose baixa; vibração e esforço pesam mais.' },
  { nome: 'Ultravioleta e pele', pressurizado: 'Para-brisa filtra parte; vigiar a pele.', nao: 'Janelas grandes e voo diurno: proteção solar.', helicoptero: 'Bolha de vidro: proteção solar.' },
];
export function TipoVooRadiacao() {
  return <TipoVoo titulo="A radiação em cada tipo de voo" dados={RADIACAO} />;
}

// ---------------------------------------------------------------- M1V6 · O ruído em cada tipo de voo (registro em ruido.ts)
const RUIDO: Linha[] = [
  { nome: 'Perda auditiva por ruído', pressurizado: 'Cabine mais silenciosa; fone na cabine de comando.', nao: 'Ruído acima de 90 dB: fone com proteção.', helicoptero: 'Ruído intenso: capacete ou fone com proteção.' },
  { nome: 'Surdez súbita', pressurizado: 'Não voar até a avaliação (Veja M2V3).', nao: 'Mesmo critério.', helicoptero: 'Mesmo critério.' },
  { nome: 'Dor lombar por vibração', pressurizado: 'Vibração baixa.', nao: 'Motor a pistão vibra mais.', helicoptero: 'Pás na faixa que cansa a coluna: assento e postura.' },
];
export function TipoVooRuido() {
  return <TipoVoo titulo="O ruído em cada tipo de voo" dados={RUIDO} />;
}

// ---------------------------------------------------------------- M1V7 · As forças G em cada tipo de voo (registro em forcasg.ts)
const FORCAS_G: Linha[] = [
  { nome: 'G-LOC', pressurizado: 'Não acontece no voo de transporte.', nao: 'Acrobacia sem traje anti-G: manobra e limite próprio.', helicoptero: 'G baixo.' },
  { nome: 'Pressão baixa ou desidratação', pressurizado: 'Levantar devagar; beber água.', nao: 'Tolerância ao G cai: hidratar antes.', helicoptero: 'Pouco efeito do G.' },
  { nome: 'Dor no pescoço e na coluna', pressurizado: 'Pouco efeito.', nao: 'Acrobacia: fortalecer e não virar a cabeça sob carga.', helicoptero: 'Vibração e postura pesam mais que o G.' },
];
export function TipoVooG() {
  return <TipoVoo titulo="As forças G em cada tipo de voo" dados={FORCAS_G} />;
}

// ---------------------------------------------------------------- M1V8 · O impacto em cada tipo de voo (registro em impacto.ts)
const IMPACTO: Linha[] = [
  { nome: 'Fratura da coluna', pressurizado: 'Cinto abdominal sobre a pelve e posição de impacto.', nao: 'Cinto de ombro bem ajustado.', helicoptero: 'Impacto vertical: assentos que absorvem energia.' },
  { nome: 'Trauma de crânio', pressurizado: 'Mãos para baixo, junto às pernas, na posição de impacto.', nao: 'Cinto de ombro evita bater no painel.', helicoptero: 'Capacete (Veja M1V8 - IV).' },
  { nome: 'Volta ao voo', pressurizado: 'Depois da consolidação e da avaliação.', nao: 'Mesmo critério.', helicoptero: 'Mesmo critério; ejetável: 3 a 4 meses na fratura em cunha.' },
];
export function TipoVooImpacto() {
  return <TipoVoo titulo="O impacto em cada tipo de voo" dados={IMPACTO} />;
}

const styles = StyleSheet.create({
  marca: { paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
