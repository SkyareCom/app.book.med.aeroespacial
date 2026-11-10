import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Line, Rect } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { SvgText } from '@/components/svg-texto';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Interativos do M2V12 · Coluna, ossos e músculos. Fontes no registro de src/data/capitulos/ossos-musculos.ts:
// RBAC 67.95 e 67.135; ICAO Anexo 1, 6.3.2.23; FAA AME Guide Items 42 e 43, SODA, Do Not Issue / Do Not Fly e OTC
// Medications for Pilots; UK CAA Surgical conditions; CDC Yellow Book 2026 (trombose); ANAC Resolução 280/2013;
// Posch et al. 2019; Riches et al. 2019; O'Conor et al. 2020. Os recursos orientam e não liberam voo.
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

// ---------------------------------------------------------------- O voo e o sistema musculoesquelético (abertura)
type Fator = 'gas' | 'parado' | 'vibracao' | 'g' | 'nvg';
const FATORES: Record<Fator, { nome: string; corpo: string; quem: string }> = {
  gas: { nome: 'Gás que expande', corpo: 'O ar da tala pneumática cresce na subida, e o membro lesionado incha dentro do gesso.', quem: 'Gesso recente ou tala pneumática: o membro ainda incha e o gesso não cede.' },
  parado: { nome: 'Horas sentado', corpo: 'Discos e músculos das costas ficam sob carga fixa; as pernas paradas devolvem menos sangue.', quem: 'Perna engessada: sem a panturrilha bombeando, o sangue estagna e o risco de trombose sobe.' },
  vibracao: { nome: 'Vibração', corpo: 'Entre 4 e 8 Hz, a coluna vibra mais que o assento, e os discos absorvem a carga repetida.', quem: 'Pilotos de helicóptero: vibração contínua somada à postura inclinada para frente.' },
  g: { nome: 'Forças G', corpo: 'O pescoço sustenta a cabeça e o capacete multiplicados pelo G.', quem: 'Pilotos de caça: a 9 G a carga no pescoço equivale a cerca de 65 kg.' },
  nvg: { nome: 'Óculos de visão noturna', corpo: 'O peso na frente do capacete puxa a cabeça para frente durante horas.', quem: 'Tripulantes de helicóptero: o uso dos óculos quase dobrou a chance de dor no pescoço.' },
};

export function OssosVoo() {
  const [f, setF] = useState<Fator>('gas');
  const k = FATORES[f];
  return (
    <MolduraMidia tipo="Explorador" titulo="O voo e o sistema musculoesquelético" instrucao="Escolha um fator do voo para ver o que ele muda e quem sofre mais.">
      <Opcoes itens={(Object.keys(FATORES) as Fator[]).map((x) => [x, FATORES[x].nome] as [Fator, string])} valor={f} onChange={setF} colunas={2} />
      <Bloco rotulo="O que acontece" cor={Cores.destaque} texto={k.corpo} />
      <Bloco rotulo="Quem é mais vulnerável" cor={Cores.dourado} texto={k.quem} />
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Remédio para dor e prazo sem voar (FAA)
type Classe = 'comum' | 'pm' | 'relaxante' | 'opioide' | 'corticoide';
const CLASSES: Record<Classe, { nome: string; regra: string; espera: boolean; grave: boolean }> = {
  comum: { nome: 'Paracetamol, ibuprofeno ou naproxeno', regra: 'FAA: aceito, se a doença de base permitir voar. Não precisa de espera.', espera: false, grave: false },
  pm: { nome: 'Analgésico "PM" (com difenidramina)', regra: 'FAA: Do Not Fly. O antialérgico difenidramina dá sono.', espera: true, grave: true },
  relaxante: { nome: 'Relaxante muscular', regra: 'FAA: Do Not Fly. Sono, tontura e reação lenta.', espera: true, grave: true },
  opioide: { nome: 'Opioide, por poucos dias', regra: 'FAA: Do Not Fly no uso passageiro.', espera: true, grave: true },
  corticoide: { nome: 'Corticoide acima de 20 mg/dia de prednisona', regra: 'FAA: Do Not Issue. O examinador não libera; a decisão é da FAA.', espera: false, grave: true },
};

export function RemedioDorEspera() {
  const [c, setC] = useState<Classe>('relaxante');
  const [h, setH] = useState(6);
  const k = CLASSES[c];
  const espera = 5 * h;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Remédio para dor e prazo sem voar" instrucao="Para o tripulante: escolha o remédio e o maior intervalo entre as doses da bula.">
      <Opcoes itens={(Object.keys(CLASSES) as Classe[]).map((x) => [x, CLASSES[x].nome] as [Classe, string])} valor={c} onChange={setC} colunas={1} />
      <Marca cor={k.grave ? Cores.erro : Cores.acerto}>{k.regra}</Marca>
      {k.espera ? (
        <>
          <Controle min={4} max={24} passo={1} valor={h} onChange={setH} rotulo="Maior intervalo entre as doses" formatar={(v) => `${fmt(v)} h`} />
          <View style={styles.leituras}>
            <Leitura rotulo="Espera depois da última dose" valor={`${fmt(espera)} h`} cor={Cores.dourado} />
          </View>
          <Texto cor={Cores.textoApagado}>Regra da FAA: 5 meias-vidas do remédio; sem esse dado, 5 vezes o maior intervalo entre as doses. O uso contínuo de opioide é Do Not Issue.</Texto>
        </>
      ) : null}
      <Texto cor={Cores.textoApagado}>No Brasil, informe o examinador credenciado sobre qualquer remédio de uso recente.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Gesso e prazo para voar (UK CAA, CDC)
export function GessoPrazo() {
  const [horas, setHoras] = useState(20);
  const [voo, setVoo] = useState(3);
  const [perna, setPerna] = useState<'perna' | 'braco'>('perna');
  const prazo = voo < 2 ? 24 : 48;
  const falta = prazo - horas;
  const [txt, cor] =
    falta > 0
      ? [`Ainda não: a maioria das companhias pede ${fmt(prazo)} h depois do gesso para esse voo. Faltam ${fmt(falta)} h. Se for urgente, o médico pode abrir o gesso ao meio.`, Cores.erro]
      : [`Prazo de ${fmt(prazo)} h cumprido. Viaje com o membro apoiado e observe dor, inchaço e dedos frios.`, Cores.acerto];
  return (
    <MolduraMidia tipo="Calculadora" titulo="Gesso e prazo para voar" instrucao="Para o passageiro: ajuste as horas desde o gesso e a duração do voo.">
      <Opcoes itens={[['perna', 'Gesso na perna'], ['braco', 'Gesso no braço']] as ['perna' | 'braco', string][]} valor={perna} onChange={setPerna} colunas={2} />
      <Controle min={0} max={72} passo={1} valor={horas} onChange={setHoras} rotulo="Horas desde o gesso" formatar={(v) => `${fmt(v)} h`} />
      <Controle min={0.5} max={14} passo={0.5} valor={voo} onChange={setVoo} rotulo="Duração do voo" formatar={(v) => `${fmt(v, 1)} h`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Prazo" valor={`${fmt(prazo)} h`} cor={Cores.destaque} />
        <Leitura rotulo="Situação" valor={falta > 0 ? 'Esperar' : 'Pode voar'} cor={cor} />
      </View>
      <Marca cor={cor}>{txt}</Marca>
      {perna === 'perna' && voo > 4 ? (
        <Marca cor={Cores.dourado}>Perna imobilizada em voo de mais de 4 h: risco maior de trombose. Corredor, movimento do que estiver livre e prevenção indicada pelo médico.</Marca>
      ) : null}
      <Texto cor={Cores.textoApagado}>Tala pneumática: solte um pouco de ar antes da subida. O tripulante não exerce função com membro engessado.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Prótese, articulação e certificado
type Caso = 'amputacao' | 'artroplastia' | 'disco' | 'hernia' | 'artrite';
const CASOS: Record<Caso, { nome: string; anac: string; faa: string; passageiro: string; grave: boolean }> = {
  amputacao: { nome: 'Amputação com prótese adaptada', anac: 'Avaliação funcional: não pode haver sequela que afete a segurança', faa: 'Relatório de força, movimento e dor; com SODA, o examinador emite; sem ela, decisão da FAA, com possível prova de voo', passageiro: 'Pode voar; pedir assistência com 48 h', grave: false },
  artroplastia: { nome: 'Prótese de quadril ou joelho', anac: 'Avaliação funcional depois da recuperação', faa: 'Avaliação de força e movimento; limitação que atrapalhe a função vai para decisão da FAA', passageiro: 'Prazo do cirurgião; prevenir trombose', grave: false },
  disco: { nome: 'Cirurgia de disco, recuperado', anac: 'Avaliação pelo examinador', faa: 'Não desqualifica: o examinador emite se sem sintomas, recuperado, sem remédio e sem déficit', passageiro: 'Pode voar', grave: false },
  hernia: { nome: 'Hérnia de disco com dormência ou fraqueza', anac: 'Inapto (hérnia discal com sintomatologia neurológica)', faa: 'Decisão da FAA, com relatório atual', passageiro: 'Avaliação médica antes do voo', grave: true },
  artrite: { nome: 'Artrite em atividade', anac: 'Inapto enquanto houver doença ativa', faa: 'Decisão da FAA', passageiro: 'Pode voar se a dor e o movimento permitirem', grave: true },
};

export function ProteseCertificacao() {
  const [c, setC] = useState<Caso>('amputacao');
  const k = CASOS[c];
  return (
    <MolduraMidia tipo="Comparador" titulo="Prótese, articulação e certificado" instrucao="Escolha a situação para comparar ANAC, FAA e passageiro.">
      <Opcoes itens={(Object.keys(CASOS) as Caso[]).map((x) => [x, CASOS[x].nome] as [Caso, string])} valor={c} onChange={setC} colunas={1} />
      <Bloco rotulo="ANAC" cor={k.grave ? Cores.erro : Cores.dourado} texto={k.anac} />
      <Bloco rotulo="FAA" cor={k.grave ? Cores.erro : Cores.dourado} texto={k.faa} />
      <Bloco rotulo="Passageiro" cor={Cores.acerto} texto={k.passageiro} />
      <Marca cor={Cores.textoSuave}>Para o tripulante, o que decide é a função: força, movimento e coordenação para comandos, pedais e evacuação.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Carga no pescoço sob G (Riches et al. 2019)
// A revisão cita carga axial equivalente a 65 kg a 9 G; aqui a carga é proporcional ao G (65 / 9 por G).
const POR_G = 65 / 9;

export function CargaPescoco() {
  const [g, setG] = useState(5);
  const [cabeca, setCabeca] = useState<'reta' | 'girada'>('reta');
  const [larg, setLarg] = useState(300);
  const kg = POR_G * g;
  const W = Math.min(larg, 340), H = 120, x0 = 16, x1 = W - 16;
  const X = (v: number) => x0 + ((v - 1) / 8) * (x1 - x0);
  const cor = g >= 7 ? Cores.erro : g >= 4 ? Cores.dourado : Cores.acerto;
  return (
    <MolduraMidia tipo="Simulador" titulo="A carga no pescoço sob G" instrucao="Arraste o G e escolha a posição da cabeça. Esquema proporcional a partir de cerca de 65 kg a 9 G.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Rect x={0} y={0} width={W} height={H} rx={8} fill="#0A1626" />
          <Line x1={x0} y1={92} x2={x1} y2={92} stroke={Cores.linha} strokeWidth={2} />
          {[1, 3, 5, 7, 9].map((v) => (
            <G key={v}>
              <Line x1={X(v)} y1={88} x2={X(v)} y2={96} stroke={Cores.textoSuave} strokeWidth={1} />
              <SvgText x={X(v)} y={110} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{`${v} G`}</SvgText>
            </G>
          ))}
          <Rect x={X(g) - 9} y={84 - (kg / 65) * 64} width={18} height={(kg / 65) * 64} rx={3} fill={cor} fillOpacity={0.8} />
          <Circle cx={X(g)} cy={92} r={5} fill={cor} />
          <SvgText x={12} y={18} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>CABEÇA E CAPACETE NO PESCOÇO</SvgText>
        </Svg>
      </View>
      <Controle min={1} max={9} passo={0.5} valor={g} onChange={setG} rotulo="Força G" formatar={(v) => `${fmt(v, 1)} G`} />
      <Opcoes itens={[['reta', 'Cabeça reta, encostada'], ['girada', 'Cabeça girada para trás']] as ['reta' | 'girada', string][]} valor={cabeca} onChange={setCabeca} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Carga aproximada" valor={`${fmt(kg)} kg`} cor={cor} />
      </View>
      <Marca cor={cabeca === 'girada' ? Cores.erro : Cores.acerto}>
        {cabeca === 'girada'
          ? 'Girada para trás, a mesma carga cai sobre um pescoço em posição mais frágil: foi a postura mais ligada à dor nos pilotos.'
          : 'Encostar a cabeça e posicionar o olhar antes de puxar o G reduz o esforço do pescoço.'}
      </Marca>
      <Texto cor={Cores.textoApagado}>Exercício resistido regular aumentou a força do pescoço e reduziu a dor de pilotos. Capacete mais leve também ajuda.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
