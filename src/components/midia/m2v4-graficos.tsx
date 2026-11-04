import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, Line, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { SvgText } from '@/components/svg-texto';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte } from '@/constants/theme';

// Interativos do M2V4 · Olhos e visão. Fontes no registro de src/data/capitulos/olhos.ts: ICAO Doc 8984 Part III
// Cap. 11; RBAC 67.99 e 67.139; FAA (Guia do AME, AC 70-2B, JO 7400.2, Airplane Flying Handbook, Sunglasses for
// Pilots); Houston et al. 2012; IATA Medical Manual; UK CAA. PAPI: FAA AIM 2-1-2 b e Fig. 2-1-5 (4 brancas: alto;
// 3 brancas e 1 vermelha: um pouco alto; 2 e 2: na rampa; 1 branca e 3 vermelhas: um pouco baixo; 4 vermelhas: baixo).
// Simulação de cores: matrizes de severidade 1,0 de Machado, Oliveira e Fernandes (IEEE TVCG 2009), em RGB linear.
// Sem fonte: [confirmar na referência].
const fmt = (n: number) => Math.round(n).toLocaleString('pt-BR');

function Marca({ cor, children }: { cor: string; children: string }) {
  return (
    <View style={[styles.marca, { borderLeftColor: cor }]}>
      <Texto>{children}</Texto>
    </View>
  );
}

// Deslizante com o rótulo e o valor visíveis acima da barra.
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

// ---------------------------------------------------------------- UV e luz azul com a altitude
export function UvAltitude() {
  const [ft, setFt] = useState(35000);
  const mais = (ft / 1000) * 5;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Ultravioleta e luz azul com a altitude" instrucao="Escolha a altitude. A conta usa a estimativa da FAA de cerca de 5% a mais de UV a cada 1.000 ft.">
      <Controle min={0} max={41000} passo={1000} valor={ft} onChange={setFt} rotulo="Altitude" formatar={(v) => `${fmt(v)} ft`} />
      <View style={styles.leituras}>
        <Leitura rotulo="UV lá fora, a mais que no nível do mar" valor={`cerca de +${fmt(mais)}%`} cor={mais >= 100 ? Cores.erro : Cores.dourado} />
        <Leitura rotulo="UV dentro da cabine" valor="Quase todo barrado pelas janelas" cor={Cores.acerto} />
      </View>
      <Marca cor={Cores.dourado}>O que atravessa o para-brisa é a luz azul: 50% a 60% passam por um vidro de 3 cm, e ela aumenta com a altitude. Voando para o sol, use óculos de sol cinza neutro.</Marca>
      <Texto cor={Cores.textoApagado}>O risco do UV para os olhos é bem maior na praia do que na cabine.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Acuidade nas normas
type Norma = 'anac1' | 'anac2' | 'icao1' | 'icao2' | 'faa12' | 'faa3';
const NORMAS: Record<Norma, { nome: string; olho: number; bin: number | null; perto: string }> = {
  anac1: { nome: 'ANAC 1ª', olho: 30, bin: 20, perto: 'J1 a 30–50 cm e J6 a 100 cm' },
  anac2: { nome: 'ANAC 2ª', olho: 40, bin: 30, perto: 'J1 a 30–50 cm' },
  icao1: { nome: 'ICAO Classe 1', olho: 30, bin: 20, perto: 'N5 a 30–50 cm e N14 a 100 cm' },
  icao2: { nome: 'ICAO Classe 2', olho: 40, bin: 30, perto: 'N5 a 30–50 cm' },
  faa12: { nome: 'FAA 1ª e 2ª', olho: 20, bin: null, perto: '20/40 a 40 cm; a 80 cm a partir dos 50 anos' },
  faa3: { nome: 'FAA 3ª', olho: 40, bin: null, perto: '20/40 a 40 cm' },
};
const ESCALA = [15, 20, 25, 30, 40, 50, 70, 100, 200];
const snellen = (i: number) => `20/${ESCALA[i]}`;

export function AcuidadeNormas() {
  const [n, setN] = useState<Norma>('anac1');
  const [od, setOd] = useState(1);
  const [oe, setOe] = useState(3);
  const [bi, setBi] = useState(1);
  const k = NORMAS[n];
  const okOd = ESCALA[od] <= k.olho;
  const okOe = ESCALA[oe] <= k.olho;
  const okBi = k.bin === null || ESCALA[bi] <= k.bin;
  const apto = okOd && okOe && okBi;
  return (
    <MolduraMidia tipo="Simulador" titulo="A acuidade de longe nas três normas" instrucao="Escolha a norma e ajuste o que cada olho lê com a correção, se usar. 20/20 é o normal; quanto maior o segundo número, pior.">
      <Opcoes itens={(Object.keys(NORMAS) as Norma[]).map((x) => [x, NORMAS[x].nome] as [Norma, string])} valor={n} onChange={setN} colunas={2} />
      <Controle min={0} max={ESCALA.length - 1} passo={1} valor={od} onChange={setOd} rotulo="Olho direito" formatar={snellen} />
      <Controle min={0} max={ESCALA.length - 1} passo={1} valor={oe} onChange={setOe} rotulo="Olho esquerdo" formatar={snellen} />
      <Controle min={0} max={ESCALA.length - 1} passo={1} valor={bi} onChange={setBi} rotulo="Os dois olhos juntos" formatar={snellen} />
      <View style={styles.leituras}>
        <Leitura rotulo="Mínimo por olho" valor={`20/${k.olho}`} cor={Cores.textoSuave} />
        <Leitura rotulo="Mínimo com os dois" valor={k.bin === null ? 'Sem exigência própria' : `20/${k.bin}`} cor={Cores.textoSuave} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Resultado de longe" valor={apto ? 'Cumpre' : 'Não cumpre'} cor={apto ? Cores.acerto : Cores.erro} />
      </View>
      <Marca cor={Cores.textoSuave}>{`Perto: ${k.perto}. Vale com ou sem correção; quem usa a correção tem de usá-la no voo e levar óculos de reserva.`}</Marca>
      <Texto cor={Cores.textoApagado}>Sem correção pior que 20/200 em algum olho: relatório oftalmológico no primeiro exame e a cada 5 anos (ANAC e ICAO).</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Ponto cego noturno
export function PontoCegoNoturno() {
  const [ang, setAng] = useState(0);
  const [noite, setNoite] = useState(true);
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 360), H = 170, cy = 80;
  const px = W * 0.72;
  const fx = px - (ang / 20) * (W * 0.6);
  const vis = !noite ? 1 : ang < 5 ? 0.06 : ang < 10 ? 0.45 : 1;
  const estado = !noite
    ? 'De dia, os cones do centro veem o ponto nítido e colorido.'
    : ang < 5
      ? 'Some: o centro do olho não tem bastonetes.'
      : ang < 10
        ? 'Aparece fraco: ainda perto do ponto cego noturno.'
        : 'Aparece: os bastonetes de fora do centro captam a luz fraca.';
  return (
    <MolduraMidia tipo="Simulador" titulo="O ponto cego noturno" instrucao="A cruz é para onde você olha; o ponto é uma luz fraca de outro avião. Afaste o olhar e veja quando ela aparece.">
      <Opcoes itens={[['noite', 'Noite'], ['dia', 'Dia']]} valor={noite ? 'noite' : 'dia'} onChange={(v) => setNoite(v === 'noite')} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Rect x={0} y={0} width={W} height={H} rx={8} fill={noite ? '#050B16' : '#4F86C6'} />
          {noite ? Array.from({ length: 24 }, (_, i) => <Circle key={i} cx={((i * 53) % 97) / 97 * W} cy={((i * 29) % 61) / 61 * (H - 40) + 6} r={0.8} fill="#8FA3C0" opacity={0.6} />) : null}
          <Circle cx={fx} cy={cy} r={W * 0.075} fill="none" stroke={noite ? Cores.erro : '#FFFFFF'} strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
          <Line x1={fx - 8} y1={cy} x2={fx + 8} y2={cy} stroke={Cores.dourado} strokeWidth={2} />
          <Line x1={fx} y1={cy - 8} x2={fx} y2={cy + 8} stroke={Cores.dourado} strokeWidth={2} />
          <Circle cx={px} cy={cy} r={4} fill={noite ? '#FFF6D8' : '#FFFFFF'} opacity={vis} />
          <SvgText x={10} y={H - 10} fill={noite ? Cores.textoApagado : '#0A1626'} fontSize={9} fontFamily={Fonte}>{noite ? 'TRACEJADO: CENTRO SEM BASTONETES (5° A 10°)' : 'DE DIA: CONES NO CENTRO'}</SvgText>
        </Svg>
      </View>
      <Controle min={0} max={20} passo={1} valor={ang} onChange={setAng} rotulo="Quanto você desvia o olhar" formatar={(v) => `${fmt(v)}°`} />
      <Marca cor={vis < 0.5 ? Cores.erro : Cores.acerto}>{estado}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Campo visual
type Lado = 'od' | 'oe' | 'ambos';
export function CampoVisual() {
  const [l, setL] = useState<Lado>('ambos');
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 340), H = 190, cx = W / 2, cy = H - 30, r = Math.min(W / 2 - 14, 140);
  // Ângulo 0 = para a frente; positivo para a direita.
  const ponto = (a: number) => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)];
  const setor = (de: number, ate: number) => {
    const [x1, y1] = ponto(de);
    const [x2, y2] = ponto(ate);
    const grande = ate - de > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${grande} 1 ${x2} ${y2} Z`;
  };
  const od: [number, number] = [-60, 95];
  const oe: [number, number] = [-95, 60];
  const total = l === 'ambos' ? '190°, com 120° vistos pelos dois olhos' : '155° com alvo grande; cerca de 140° úteis';
  return (
    <MolduraMidia tipo="Mapa" titulo="O campo de visão de cada olho" instrucao="Vista de cima: a cabeça embaixo e a frente para cima. Os números são os da ICAO para um alvo branco de 3 mm.">
      <Opcoes itens={[['od', 'Olho direito'], ['oe', 'Olho esquerdo'], ['ambos', 'Os dois']]} valor={l} onChange={setL} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Rect x={0} y={0} width={W} height={H} rx={8} fill="#0A1626" />
          {l !== 'oe' ? <Path d={setor(od[0], od[1])} fill="#4A8CFF" opacity={0.35} /> : null}
          {l !== 'od' ? <Path d={setor(oe[0], oe[1])} fill="#F2B84B" opacity={0.35} /> : null}
          <Line x1={cx} y1={cy} x2={cx} y2={cy - r} stroke={Cores.textoApagado} strokeDasharray="3 3" />
          <Circle cx={cx} cy={cy} r={10} fill="#1E2C40" stroke="#C9D4E0" />
          <SvgText x={cx} y={cy - r - 4} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">FRENTE</SvgText>
          <SvgText x={8} y={cy + 20} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>{l === 'od' ? 'NARIZ 60°' : 'FORA 95°'}</SvgText>
          <SvgText x={W - 8} y={cy + 20} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{l === 'oe' ? 'NARIZ 60°' : 'FORA 95°'}</SvgText>
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Na horizontal" valor={total} cor={Cores.destaque} />
        <Leitura rotulo="Na vertical" valor="60° para cima e 75° para baixo" cor={Cores.textoSuave} />
      </View>
      <Marca cor={Cores.textoSuave}>{l === 'ambos' ? 'A área vista pelos dois olhos dá a visão em 3D de perto e tira o "buraco" que o nariz faz no campo de cada olho.' : 'Com um olho só, falta o lado do outro olho e a visão em 3D de perto; a noção de distância ao longe continua.'}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- PAPI e visão de cores
type Rampa = 'alto' | 'poucoAlto' | 'certo' | 'poucoBaixo' | 'baixo';
type Visao = 'normal' | 'protan' | 'deutan';
const RAMPAS: Record<Rampa, { nome: string; brancas: number; leitura: string }> = {
  alto: { nome: 'Alto', brancas: 4, leitura: 'Acima da rampa' },
  poucoAlto: { nome: 'Um pouco alto', brancas: 3, leitura: 'Um pouco acima da rampa' },
  certo: { nome: 'Na rampa', brancas: 2, leitura: 'Na rampa certa' },
  poucoBaixo: { nome: 'Um pouco baixo', brancas: 1, leitura: 'Um pouco abaixo da rampa' },
  baixo: { nome: 'Baixo', brancas: 0, leitura: 'Abaixo da rampa: perigo' },
};
const MATRIZ: Record<Visao, number[][]> = {
  normal: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
};
const lin = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const srgb = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function simular(hex: string, v: Visao, brilho: number) {
  const rgb = [1, 3, 5].map((i) => lin(parseInt(hex.slice(i, i + 2), 16) / 255) * brilho);
  const m = MATRIZ[v];
  const out = m.map((l) => Math.min(1, Math.max(0, l[0] * rgb[0] + l[1] * rgb[1] + l[2] * rgb[2])));
  return `#${out.map((c) => Math.round(srgb(c) * 255).toString(16).padStart(2, '0')).join('')}`;
}

export function PapiCores() {
  const [ra, setRa] = useState<Rampa>('certo');
  const [vi, setVi] = useState<Visao>('normal');
  const [fraco, setFraco] = useState(false);
  const [larg, setLarg] = useState(300);
  const W = Math.min(larg, 340), H = 120;
  const b = fraco ? 0.25 : 1;
  const branca = simular('#FFF3DC', vi, b);
  const vermelha = simular('#FF2B1C', vi, b);
  const n = RAMPAS[ra].brancas;
  return (
    <MolduraMidia tipo="Simulador" titulo="O PAPI visto com e sem defeito de cor" instrucao="Escolha a posição do avião na rampa e o tipo de visão. A simulação mostra como as luzes vermelhas e brancas podem parecer.">
      <Opcoes itens={(Object.keys(RAMPAS) as Rampa[]).map((x) => [x, RAMPAS[x].nome] as [Rampa, string])} valor={ra} onChange={setRa} colunas={3} />
      <Opcoes itens={[['normal', 'Visão normal'], ['protan', 'Sem cone vermelho'], ['deutan', 'Sem cone verde']]} valor={vi} onChange={setVi} />
      <Opcoes itens={[['forte', 'Noite clara'], ['fraco', 'Névoa ou luz fraca']]} valor={fraco ? 'fraco' : 'forte'} onChange={(v) => setFraco(v === 'fraco')} />
      <View onLayout={(e) => setLarg(e.nativeEvent.layout.width)} style={{ alignItems: 'center' }}>
        <Svg width={W} height={H}>
          <Defs>
            <RadialGradient id="brilho" cx="50%" cy="50%" r="50%">
              <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.35} />
              <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Rect x={0} y={0} width={W} height={H} rx={8} fill="#050B16" />
          <Path d={`M ${W * 0.08} ${H - 14} L ${W * 0.92} ${H - 14}`} stroke="#1E2C40" strokeWidth={6} />
          {[0, 1, 2, 3].map((i) => {
            const x = W * (0.2 + i * 0.2);
            const cor = i < n ? branca : vermelha;
            return (
              <G key={i}>
                <Circle cx={x} cy={58} r={26} fill="url(#brilho)" opacity={fraco ? 0.3 : 1} />
                <Circle cx={x} cy={58} r={12} fill={cor} />
              </G>
            );
          })}
        </Svg>
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="O que o PAPI diz" valor={`${n} brancas e ${4 - n} vermelhas: ${RAMPAS[ra].leitura}`} cor={ra === 'certo' ? Cores.acerto : ra === 'baixo' ? Cores.erro : Cores.dourado} />
      </View>
      <Marca cor={vi === 'normal' ? Cores.textoSuave : Cores.erro}>{vi === 'normal' ? 'Com visão normal, o vermelho e o branco se separam bem.' : 'Com defeito vermelho-verde, o vermelho fica escuro e amarronzado e, com pouca luz, se confunde mais com o branco. Foi o que pesou no pouso do FedEx 1448, em 2002.'}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Zonas de proteção contra laser
export function ZonasLaser() {
  const [nm, setNm] = useState(4);
  const [ft, setFt] = useState(3000);
  const zona = nm <= 2 && ft <= 2000 ? 'livre' : nm <= 10 && ft <= 10000 ? 'critica' : 'fora';
  const Z = {
    livre: { nome: 'Zona livre de laser', limite: 'até 50 nW/cm²', regra: 'A luz não pode nem distrair o piloto.', cor: Cores.erro },
    critica: { nome: 'Zona crítica', limite: 'até 5 µW/cm²', regra: 'A luz não pode causar clarão nem pós-imagem.', cor: Cores.dourado },
    fora: { nome: 'Fora das zonas do aeroporto', limite: '100 µW/cm² nas zonas sensíveis', regra: 'A autoridade define zonas sensíveis onde for preciso.', cor: Cores.textoSuave },
  }[zona];
  return (
    <MolduraMidia tipo="Calculadora" titulo="As zonas que protegem o piloto do laser" instrucao="Escolha a distância da pista e a altura. Os limites valem para lasers autorizados, como os de shows; apontar laser para aeronave é crime.">
      <Controle min={0} max={15} passo={0.5} valor={nm} onChange={setNm} rotulo="Distância da pista" formatar={(v) => `${v.toLocaleString('pt-BR')} NM`} />
      <Controle min={0} max={12000} passo={500} valor={ft} onChange={setFt} rotulo="Altura sobre o solo" formatar={(v) => `${fmt(v)} ft`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Zona" valor={Z.nome} cor={Z.cor} />
        <Leitura rotulo="Limite de luz" valor={Z.limite} cor={Z.cor} />
      </View>
      <Marca cor={Z.cor}>{Z.regra}</Marca>
      <Texto cor={Cores.textoApagado}>Zona livre: até 2.000 ft e 2 NM da pista, mais 3 NM no prolongamento de cada cabeceira. Zona crítica: até 10.000 ft e 10 NM do aeroporto.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Colírios e voo
type Colirio = 'pilocarpina' | 'atropina' | 'ciclopentolato' | 'tropicamida' | 'prostaglandina' | 'timolol' | 'dorzolamida' | 'antialergico';
const COLIRIOS: Record<Colirio, { nome: string; efeito: string; faa: string; cor: string }> = {
  pilocarpina: { nome: 'Pilocarpina', efeito: 'Contrai a pupila: visão escura à noite e foco borrado', faa: 'Não aceita (ICAO: mióticos em geral não permitidos)', cor: Cores.erro },
  atropina: { nome: 'Atropina', efeito: 'Dilata a pupila e paralisa o foco', faa: 'Não aceita', cor: Cores.erro },
  ciclopentolato: { nome: 'Ciclopentolato', efeito: 'Dilata a pupila e paralisa o foco por horas', faa: '24 horas sem voar', cor: Cores.dourado },
  tropicamida: { nome: 'Tropicamida ou fenilefrina', efeito: 'Dilata a pupila; a luz incomoda', faa: '8 horas sem voar', cor: Cores.dourado },
  prostaglandina: { nome: 'Latanoprosta', efeito: 'Baixa a pressão do olho com poucos efeitos', faa: 'Aceita (ICAO também)', cor: Cores.acerto },
  timolol: { nome: 'Timolol', efeito: 'Baixa a pressão; pode baixar o pulso e piorar a asma', faa: 'Aceito se não houver efeito no corpo', cor: Cores.acerto },
  dorzolamida: { nome: 'Dorzolamida', efeito: 'Baixa a pressão; o colírio quase não age no corpo', faa: 'Aceita em colírio; a forma oral não', cor: Cores.acerto },
  antialergico: { nome: 'Colírio antialérgico', efeito: 'Borra a visão logo depois de pingar', faa: 'Não pingar logo antes nem durante o voo', cor: Cores.dourado },
};

export function ColiriosVoo() {
  const [c, setC] = useState<Colirio>('pilocarpina');
  const k = COLIRIOS[c];
  return (
    <MolduraMidia tipo="Comparador" titulo="O colírio permite voar?" instrucao="Escolha o colírio para ver o efeito que importa no voo e a regra da FAA para o tripulante. Na ANAC, a decisão é do examinador.">
      <Opcoes itens={(Object.keys(COLIRIOS) as Colirio[]).map((x) => [x, COLIRIOS[x].nome] as [Colirio, string])} valor={c} onChange={setC} colunas={2} />
      <View style={styles.leituras}>
        <Leitura rotulo="Efeito no voo" valor={k.efeito} cor={Cores.textoSuave} />
      </View>
      <Marca cor={k.cor}>{`Tripulante: ${k.faa}.`}</Marca>
      <Texto cor={Cores.textoApagado}>O passageiro pode voar com o colírio que o médico receitou, levando-o na bagagem de mão.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Prazo depois da cirurgia dos olhos
type Cir = 'lasik' | 'prk' | 'catarata' | 'yag' | 'sf6' | 'c3f8' | 'intraocular';
type Quem = 'passageiro' | 'anac' | 'icao' | 'faa';
const CIRURGIAS: Record<Cir, string> = {
  lasik: 'LASIK ou SMILE',
  prk: 'PRK',
  catarata: 'Catarata',
  yag: 'Laser YAG',
  sf6: 'Retina com gás SF6',
  c3f8: 'Retina com C3F8 ou C2F6',
  intraocular: 'Outra cirurgia no olho',
};
function prazo(c: Cir, q: Quem, d: number): { texto: string; cor: string } {
  const exames = { texto: 'Exames adicionais; prazo a critério do examinador', cor: Cores.dourado };
  if (q === 'passageiro') {
    if (c === 'lasik' || c === 'prk' || c === 'catarata') return { texto: '24 horas, com a liberação do cirurgião', cor: Cores.acerto };
    if (c === 'sf6') return { texto: 'Cerca de 2 semanas, até o gás ser absorvido', cor: Cores.erro };
    if (c === 'c3f8') return { texto: 'Cerca de 6 semanas, até o gás ser absorvido', cor: Cores.erro };
    if (c === 'intraocular') return { texto: 'Pelo menos 7 dias', cor: Cores.dourado };
    return { texto: 'Conforme o cirurgião', cor: Cores.textoSuave };
  }
  if (q === 'anac') return c === 'lasik' || c === 'prk' ? { texto: 'Mais de 6 meses; testes de ofuscamento e contraste normais, se pedidos', cor: Cores.erro } : exames;
  if (q === 'icao') {
    if (c === 'lasik') return { texto: `${d > 10 ? 6 : 3} meses depois de parar o colírio`, cor: Cores.erro };
    if (c === 'prk') return { texto: `${d > 6 ? 6 : 3} meses depois de parar o colírio`, cor: Cores.erro };
    if (c === 'catarata') return { texto: 'Lente monofocal; grau estável em 6 a 8 semanas', cor: Cores.dourado };
    if (c === 'yag') return { texto: 'Volta rápida: o tratamento leva minutos', cor: Cores.acerto };
    return { texto: 'Inapto até avaliação especializada', cor: Cores.erro };
  }
  if (c === 'lasik' || c === 'prk' || c === 'catarata') return { texto: '3 meses recuperado, sem remédio e sem sintomas; antes, só com o relatório do oftalmologista', cor: Cores.dourado };
  if (c === 'sf6' || c === 'c3f8') return { texto: 'Descolamento corrigido pode ser aceito com avaliação especializada', cor: Cores.dourado };
  return { texto: 'Relatório do oftalmologista [confirmar na referência]', cor: Cores.textoSuave };
}

export function PrazoCirurgiaOlho() {
  const [c, setC] = useState<Cir>('lasik');
  const [q, setQ] = useState<Quem>('anac');
  const [d, setD] = useState(4);
  const r = prazo(c, q, d);
  const usaGrau = q === 'icao' && (c === 'lasik' || c === 'prk');
  return (
    <MolduraMidia tipo="Comparador" titulo="Quando voar depois de operar os olhos" instrucao="Escolha a cirurgia e quem vai voar. Vale só sem complicação; a palavra final é do cirurgião e, para o tripulante, do examinador.">
      <Opcoes itens={(Object.keys(CIRURGIAS) as Cir[]).map((x) => [x, CIRURGIAS[x]] as [Cir, string])} valor={c} onChange={setC} colunas={2} />
      <Opcoes itens={[['passageiro', 'Passageiro'], ['anac', 'ANAC'], ['icao', 'ICAO'], ['faa', 'FAA']]} valor={q} onChange={setQ} />
      {usaGrau ? <Controle min={1} max={12} passo={1} valor={d} onChange={setD} rotulo="Grau antes da cirurgia" formatar={(v) => `${fmt(v)} dioptrias`} /> : null}
      <Marca cor={r.cor}>{r.texto}</Marca>
      <Texto cor={Cores.textoApagado}>Com gás no olho, não se voa: o gás se expande na cabine e pode tirar a visão.</Texto>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
