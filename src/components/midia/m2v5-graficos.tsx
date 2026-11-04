import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Line, Path, Rect } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { SvgText } from '@/components/svg-texto';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Interativos do M2V5 · Labirinto e orientação espacial. Fontes no registro de src/data/capitulos/orientacao.ts:
// ICAO Doc 8984 (Part II 1.7; Part III 12.16–12.17; Part V Cap. 2); FAA (AIM 8-1-5; Airman Education; CAMI
// AM-400-03/1; AC 60-4A; OTC Medications for Pilots); AOPA (estudo de 1954); CDC Yellow Book 2026.
// Somatogravica: inclinação aparente = arctg(aceleração ÷ g). Sem fonte: [confirmar na referência].
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

// Indicador de atitude simples: céu e terra girando com a inclinação e subindo com a arfagem.
function Atitude({ banco, arfagem = 0, tam = 150 }: { banco: number; arfagem?: number; tam?: number }) {
  const r = tam / 2 - 4;
  const c = tam / 2;
  const dy = (arfagem / 30) * r;
  return (
    <Svg width={tam} height={tam}>
      <Defs>
        <ClipPath id="disco">
          <Circle cx={c} cy={c} r={r} />
        </ClipPath>
      </Defs>
      <G clipPath="url(#disco)">
        <G rotation={-banco} origin={`${c}, ${c}`}>
          <Rect x={c - tam} y={c - tam + dy} width={tam * 2} height={tam} fill="#3F7FC9" />
          <Rect x={c - tam} y={c + dy} width={tam * 2} height={tam} fill="#7A5634" />
          <Line x1={c - tam} y1={c + dy} x2={c + tam} y2={c + dy} stroke="#FFFFFF" strokeWidth={2} />
        </G>
      </G>
      <Circle cx={c} cy={c} r={r} fill="none" stroke="#C9D4E0" strokeWidth={2} />
      <Line x1={c - 34} y1={c} x2={c - 10} y2={c} stroke={Cores.dourado} strokeWidth={4} />
      <Line x1={c + 10} y1={c} x2={c + 34} y2={c} stroke={Cores.dourado} strokeWidth={4} />
      <Circle cx={c} cy={c} r={3} fill={Cores.dourado} />
    </Svg>
  );
}

// ---------------------------------------------------------------- Limiar de inclinação
export function LimiarInclinacao() {
  const [taxa, setTaxa] = useState(1);
  const [seg, setSeg] = useState(20);
  const banco = Math.min(60, taxa * seg);
  const sente = taxa >= 2;
  return (
    <MolduraMidia tipo="Simulador" titulo="A inclinação que o corpo não sente" instrucao="Escolha a velocidade com que o avião inclina e por quanto tempo. Abaixo de cerca de 2° por segundo, o labirinto não percebe.">
      <View style={{ alignItems: 'center' }}>
        <Atitude banco={banco} />
      </View>
      <Controle min={0.5} max={5} passo={0.5} valor={taxa} onChange={setTaxa} rotulo="Velocidade de rolagem" formatar={(v) => `${fmt(v, 1)}° por segundo`} />
      <Controle min={1} max={30} passo={1} valor={seg} onChange={setSeg} rotulo="Tempo" formatar={(v) => `${fmt(v)} s`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Inclinação formada" valor={`${fmt(banco)}°`} cor={banco >= 20 ? Cores.erro : Cores.dourado} />
        <Leitura rotulo="O labirinto sente?" valor={sente ? 'Sim' : 'Não'} cor={sente ? Cores.acerto : Cores.erro} />
      </View>
      <Marca cor={sente ? Cores.acerto : Cores.erro}>{sente ? 'O corpo percebe a rolagem. Numa curva constante, porém, depois de 10 a 20 segundos a sensação de girar também some.' : 'O corpo continua sentindo o avião nivelado. Só o indicador de atitude mostra a inclinação.'}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Ilusões do labirinto
type Ilusao = 'leans' | 'espiral' | 'parafuso' | 'coriolis' | 'somatogravica' | 'inversao' | 'elevador';
const ILUSOES: Record<Ilusao, { nome: string; quando: string; sente: string; tende: string; certo: string }> = {
  leans: { nome: 'Inclinação falsa', quando: 'Inclinação lenta, abaixo do limiar, corrigida de uma vez', sente: 'Inclinado para o lado oposto', tende: 'Voltar à inclinação inicial', certo: 'Manter as asas niveladas pelo indicador de atitude' },
  espiral: { nome: 'Espiral da morte', quando: 'Curva coordenada por mais de 20 s, perdendo altura', sente: 'Voo nivelado, descendo', tende: 'Puxar o manche e apertar a curva', certo: 'Nivelar as asas primeiro, depois a altitude' },
  parafuso: { nome: 'Parafuso da morte', quando: 'Recuperação correta de um parafuso', sente: 'Girando para o outro lado', tende: 'Voltar ao parafuso original', certo: 'Confiar no instrumento de curva e no indicador de atitude' },
  coriolis: { nome: 'Coriolis', quando: 'Movimento brusco da cabeça numa curva longa', sente: 'Giro súbito em outro eixo', tende: 'Corrigir um giro que não existe', certo: 'Cabeça parada em curva; nivelar antes de olhar para baixo' },
  somatogravica: { nome: 'Somatográvica', quando: 'Aceleração forte na decolagem ou na arremetida sem visibilidade', sente: 'Nariz alto', tende: 'Empurrar o manche em direção ao chão', certo: 'Seguir atitude e velocidade vertical' },
  inversao: { nome: 'Inversão', quando: 'Passar de subida para voo nivelado de repente', sente: 'Caindo para trás', tende: 'Empurrar o nariz para baixo', certo: 'Confirmar a atitude nos instrumentos antes de mexer' },
  elevador: { nome: 'Elevador', quando: 'Corrente de ar para cima (ou para baixo)', sente: 'Subida (ou descida)', tende: 'Empurrar (ou puxar) o nariz', certo: 'Manter a atitude e aceitar a variação de altitude' },
};

export function IlusoesLabirinto() {
  const [i, setI] = useState<Ilusao>('espiral');
  const k = ILUSOES[i];
  return (
    <MolduraMidia tipo="Comparador" titulo="As ilusões do labirinto" instrucao="Escolha a ilusão para ver quando ela aparece, o que o corpo sente, o erro que provoca e a correção.">
      <Opcoes itens={(Object.keys(ILUSOES) as Ilusao[]).map((x) => [x, ILUSOES[x].nome] as [Ilusao, string])} valor={i} onChange={setI} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Quando aparece" valor={k.quando} cor={Cores.textoSuave} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="O corpo sente" valor={k.sente} cor={Cores.dourado} />
        <Leitura rotulo="O piloto tende a" valor={k.tende} cor={Cores.erro} />
      </View>
      <Marca cor={Cores.acerto}>{`O certo: ${k.certo}.`}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Ilusão somatogravica
export function IlusaoSomatogravica() {
  const [a, setA] = useState(0.3);
  const ang = (Math.atan(a) * 180) / Math.PI;
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 320), H = 150, cx = W / 2, cy = 82;
  const rad = (ang * Math.PI) / 180;
  const L = W * 0.42;
  return (
    <MolduraMidia tipo="Simulador" titulo="A aceleração que parece nariz alto" instrucao="Escolha a aceleração para a frente, em G. Sem horizonte, o labirinto soma a gravidade com a aceleração e sente o avião inclinado.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Rect x={0} y={0} width={W} height={H} rx={8} fill="#0A1626" />
          <Line x1={cx - L} y1={cy} x2={cx + L} y2={cy} stroke="#C9D4E0" strokeWidth={2} />
          <Line x1={cx - L * Math.cos(rad)} y1={cy + L * Math.sin(rad)} x2={cx + L * Math.cos(rad)} y2={cy - L * Math.sin(rad)} stroke={Cores.erro} strokeWidth={2} strokeDasharray="6 4" />
          <Path d={`M ${cx - 26} ${cy} L ${cx + 22} ${cy} L ${cx + 30} ${cy - 4} M ${cx - 26} ${cy} L ${cx - 30} ${cy - 10}`} stroke={Cores.dourado} strokeWidth={3} fill="none" />
          <SvgText x={10} y={18} fill="#C9D4E0" fontSize={9} fontFamily={Fonte}>LINHA CHEIA: ATITUDE REAL</SvgText>
          <SvgText x={10} y={H - 10} fill={Cores.erro} fontSize={9} fontFamily={Fonte}>TRACEJADA: O QUE O CORPO SENTE</SvgText>
        </Svg>
      </View>
      <Controle min={-0.3} max={0.5} passo={0.05} valor={a} onChange={setA} rotulo="Aceleração para a frente" formatar={(v) => `${fmt(v, 2)} G`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Sensação de arfagem" valor={a === 0 ? 'Nivelado' : `${fmt(Math.abs(ang))}° ${a > 0 ? 'nariz alto' : 'nariz baixo'}`} cor={Math.abs(ang) >= 10 ? Cores.erro : Cores.dourado} />
      </View>
      <Marca cor={Cores.erro}>{a > 0 ? 'Sem horizonte, o piloto pode empurrar o manche para corrigir um nariz alto que não existe, em direção ao chão.' : a < 0 ? 'Ao reduzir a potência de repente, o corpo sente nariz baixo e o piloto pode puxar demais.' : 'Sem aceleração, a sensação coincide com a atitude real.'}</Marca>
      <Texto cor={Cores.textoApagado}>A conta é física: a inclinação aparente é o arco cuja tangente é a aceleração dividida pela gravidade.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Ilusões de pista
type Caso = 'estreita' | 'larga' | 'aclive' | 'declive' | 'semDetalhe' | 'chuva' | 'nevoa' | 'nevoeiro' | 'luzes';
const PISTA: Record<Caso, { nome: string; parece: string; erro: string; w: number; topo: number }> = {
  estreita: { nome: 'Pista estreita', parece: 'Mais alto do que está', erro: 'Aproximação baixa', w: 0.55, topo: 0.34 },
  larga: { nome: 'Pista larga', parece: 'Mais baixo do que está', erro: 'Arredondamento alto ou pouso duro', w: 1.5, topo: 0.34 },
  aclive: { nome: 'Pista em aclive', parece: 'Mais alto do que está', erro: 'Aproximação baixa', w: 1, topo: 0.22 },
  declive: { nome: 'Pista em declive', parece: 'Mais baixo do que está', erro: 'Aproximação alta', w: 1, topo: 0.46 },
  semDetalhe: { nome: 'Água, neve ou terreno liso', parece: 'Mais alto do que está', erro: 'Aproximação baixa', w: 1, topo: 0.34 },
  chuva: { nome: 'Chuva no para-brisa', parece: 'Mais alto do que está', erro: 'Aproximação baixa', w: 1, topo: 0.34 },
  nevoa: { nome: 'Névoa', parece: 'Pista mais longe', erro: 'Aproximação baixa', w: 1, topo: 0.34 },
  nevoeiro: { nome: 'Entrar no nevoeiro', parece: 'Nariz subindo', erro: 'Rampa mais íngreme de repente', w: 1, topo: 0.34 },
  luzes: { nome: 'Luzes de aproximação fortes', parece: 'Pista mais perto', erro: 'Aproximação alta', w: 1, topo: 0.34 },
};

export function IlusaoPista() {
  const [c, setC] = useState<Caso>('estreita');
  const k = PISTA[c];
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 320), H = 140;
  const base = 70 * k.w, ponta = 12 * k.w, yt = H * k.topo, yb = H - 14, cx = W / 2;
  const fundo = c === 'semDetalhe' ? '#1C3550' : c === 'nevoa' || c === 'nevoeiro' ? '#6E7B88' : '#2E4A2E';
  return (
    <MolduraMidia tipo="Comparador" titulo="Como a pista engana na aproximação" instrucao="Escolha a situação para ver o que o piloto sente e o erro que costuma provocar.">
      <Opcoes itens={(Object.keys(PISTA) as Caso[]).map((x) => [x, PISTA[x].nome] as [Caso, string])} valor={c} onChange={setC} colunas={2} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Rect x={0} y={0} width={W} height={H} rx={8} fill="#7FA8D8" />
          <Rect x={0} y={H * 0.3} width={W} height={H * 0.7} fill={fundo} />
          <Path d={`M ${cx - base} ${yb} L ${cx + base} ${yb} L ${cx + ponta} ${yt} L ${cx - ponta} ${yt} Z`} fill="#3A3F46" stroke="#E8EDF2" strokeWidth={1.5} />
          <Line x1={cx} y1={yb - 4} x2={cx} y2={yt + 4} stroke="#E8EDF2" strokeWidth={1.5} strokeDasharray="6 6" />
          {c === 'chuva' ? Array.from({ length: 18 }, (_, i) => <Line key={i} x1={((i * 37) % 97) / 97 * W} y1={((i * 53) % 89) / 89 * H} x2={((i * 37) % 97) / 97 * W + 2} y2={((i * 53) % 89) / 89 * H + 8} stroke="#DDE8F2" strokeOpacity={0.7} />) : null}
          {c === 'nevoa' || c === 'nevoeiro' ? <Rect x={0} y={0} width={W} height={H} fill="#C9D4E0" fillOpacity={c === 'nevoeiro' ? 0.55 : 0.35} /> : null}
          {c === 'luzes' ? [1, 2, 3, 4, 5].map((n) => <Circle key={n} cx={cx} cy={yb - n * ((yb - yt) / 7)} r={4} fill="#FFF3C4" />) : null}
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="O piloto sente" valor={k.parece} cor={Cores.dourado} />
        <Leitura rotulo="Erro provável" valor={k.erro} cor={Cores.erro} />
      </View>
      <Marca cor={Cores.acerto}>Proteção: rampa eletrônica ou PAPI, conferir altitude e distância e arremeter na dúvida.</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Tempo na nuvem (estudo de 1954)
export function TempoNuvem() {
  const [t, setT] = useState(60);
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 340), H = 70, x0 = 12, x1 = W - 12;
  const X = (s: number) => x0 + (s / 600) * (x1 - x0);
  const fase = t < 20 ? 0 : t < 178 ? 1 : t < 480 ? 2 : 3;
  const txt = [
    'No estudo, ninguém tinha perdido o controle ainda: o labirinto já começa a mandar sinais errados.',
    'Alguns pilotos já perderam o controle: o mais rápido levou 20 segundos.',
    'Passou da média de 178 segundos: a maioria já entrou em espiral ou montanha-russa.',
    'Passou de 480 segundos: todos os 20 pilotos tinham perdido o controle.',
  ][fase];
  const cor = [Cores.dourado, Cores.dourado, Cores.erro, Cores.erro][fase];
  return (
    <MolduraMidia tipo="Calculadora" titulo="Quanto tempo até perder o controle na nuvem" instrucao="Escolha quantos segundos se passaram desde a entrada na nuvem, para um piloto sem treino de instrumentos. Dados do estudo de 1954 com 20 pilotos.">
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Rect x={x0} y={22} width={x1 - x0} height={12} rx={6} fill={Cores.trilha} />
          <Rect x={X(20)} y={22} width={X(480) - X(20)} height={12} fill={Cores.erro} fillOpacity={0.35} />
          <Line x1={X(178)} y1={16} x2={X(178)} y2={40} stroke={Cores.erro} strokeWidth={2} />
          <Circle cx={X(Math.min(t, 600))} cy={28} r={7} fill={Cores.destaque} />
          <SvgText x={X(20)} y={54} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="start">20 S</SvgText>
          <SvgText x={X(178)} y={12} fill={Cores.erro} fontSize={9} fontFamily={Fonte} textAnchor="middle">MÉDIA 178 S</SvgText>
          <SvgText x={X(480)} y={54} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">480 S</SvgText>
        </Svg>
      </View>
      <Controle min={0} max={600} passo={5} valor={t} onChange={setT} rotulo="Tempo na nuvem" formatar={(v) => (v >= 60 ? `${fmt(v)} s (${fmt(v / 60, 1)} min)` : `${fmt(v)} s`)} />
      <Marca cor={cor}>{txt}</Marca>
      <Texto cor={Cores.textoApagado}>Faixa vermelha: entre o primeiro e o último piloto a perder o controle.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- O que você sente, o que fazer
type Sinal = 'inclinado' | 'narizAlto' | 'giroCabeca' | 'luzMexe' | 'desceCurva' | 'luzPisca';
const SINAIS: Record<Sinal, { nome: string; ilusao: string; fazer: string }> = {
  inclinado: { nome: 'Corpo inclinado, painel nivelado', ilusao: 'Inclinação falsa', fazer: 'Manter as asas pelo indicador de atitude e esperar a sensação passar' },
  narizAlto: { nome: 'Nariz alto ao acelerar sem visibilidade', ilusao: 'Somatográvica', fazer: 'Seguir atitude e velocidade vertical; não empurrar o manche' },
  giroCabeca: { nome: 'Giro forte ao mexer a cabeça em curva', ilusao: 'Coriolis', fazer: 'Cabeça parada; nivelar antes de olhar para baixo' },
  luzMexe: { nome: 'Luz parada parece se mover no escuro', ilusao: 'Autocinese', fazer: 'Não fixar o olhar; varrer o campo e conferir o painel' },
  desceCurva: { nome: 'Altitude caindo numa curva que parece nivelada', ilusao: 'Espiral da morte', fazer: 'Nivelar as asas primeiro, depois corrigir altitude e potência' },
  luzPisca: { nome: 'Enjoo com luz piscando pela hélice', ilusao: 'Vertigem por cintilação', fazer: 'Não olhar pela hélice; variar a rotação' },
};

export function CondutaDesorientacao() {
  const [s, setS] = useState<Sinal>('inclinado');
  const k = SINAIS[s];
  return (
    <MolduraMidia tipo="Classificador" titulo="O que você sente, o que fazer" instrucao="Escolha o que o piloto sente para ver a ilusão provável e a conduta. Com outro piloto a bordo, passe os comandos.">
      <Opcoes itens={(Object.keys(SINAIS) as Sinal[]).map((x) => [x, SINAIS[x].nome] as [Sinal, string])} valor={s} onChange={setS} colunas={1} />
      <View style={styles.leituras}>
        <Leitura rotulo="Ilusão provável" valor={k.ilusao} cor={Cores.dourado} />
      </View>
      <Marca cor={Cores.acerto}>{`O que fazer: ${k.fazer}.`}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Onde sentar para enjoar menos
type Zona = 'frente' | 'asas' | 'fundo';
export function AssentoEnjoo() {
  const [z, setZ] = useState<Zona>('asas');
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 320), H = 120, cy = H / 2;
  const x = (f: number) => 16 + f * (W - 32);
  const cor = (k: Zona) => (z === k ? (k === 'asas' ? Cores.acerto : Cores.dourado) : '#2A4A6A');
  return (
    <MolduraMidia tipo="Mapa" titulo="Onde sentar para enjoar menos" instrucao="Escolha a parte da cabine. Vista de cima, com o nariz à direita.">
      <Opcoes itens={[['frente', 'Frente'], ['asas', 'Perto das asas'], ['fundo', 'Fundo']]} valor={z} onChange={setZ} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Rect x={0} y={0} width={W} height={H} rx={8} fill="#0A1626" />
          <Path d={`M ${x(0.42)} ${cy - 12} L ${x(0.52)} 8 L ${x(0.6)} 8 L ${x(0.6)} ${cy - 12} Z M ${x(0.42)} ${cy + 12} L ${x(0.52)} ${H - 8} L ${x(0.6)} ${H - 8} L ${x(0.6)} ${cy + 12} Z`} fill="#22334A" stroke="#3D6A96" />
          <Path d={`M ${x(0.02)} ${cy - 6} L ${x(0.1)} ${cy - 14} L ${x(0.9)} ${cy - 14} Q ${x(1)} ${cy} ${x(0.9)} ${cy + 14} L ${x(0.1)} ${cy + 14} L ${x(0.02)} ${cy + 6} Z`} fill="#1E2C40" stroke="#C9D4E0" />
          <Rect x={x(0.66)} y={cy - 11} width={x(0.86) - x(0.66)} height={22} rx={4} fill={cor('frente')} fillOpacity={0.8} />
          <Rect x={x(0.4)} y={cy - 11} width={x(0.62) - x(0.4)} height={22} rx={4} fill={cor('asas')} fillOpacity={0.8} />
          <Rect x={x(0.12)} y={cy - 11} width={x(0.36) - x(0.12)} height={22} rx={4} fill={cor('fundo')} fillOpacity={0.8} />
        </Svg>
      </View>
      <Marca cor={z === 'asas' ? Cores.acerto : Cores.dourado}>{z === 'asas' ? 'Perto das asas o movimento é menor: é o lugar recomendado para quem enjoa.' : 'Longe das asas, o movimento na turbulência é maior. Para quem enjoa, prefira as filas perto das asas.'}</Marca>
      <Texto cor={Cores.textoSuave}>Também ajudam: olhar o horizonte pela janela, não ler na turbulência, evitar mexer a cabeça, dormir bem e evitar álcool e cigarro.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
