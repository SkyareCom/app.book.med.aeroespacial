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

const styles = StyleSheet.create({
  marca: { paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
});
