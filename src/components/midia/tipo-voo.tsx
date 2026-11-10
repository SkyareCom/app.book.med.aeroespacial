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

const styles = StyleSheet.create({
  marca: { paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
