import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { SvgText } from '@/components/svg-texto';

import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Fonte } from '@/constants/theme';

// Animações da Missão Aviação, em arquivo próprio: animacoes.tsx está congelado (docs/modelo-sistemas.md, seção 7).
// Mesmo padrão das demais: laço em SVG, leve, que pausa ao toque. useCiclo e Quadro repetem os de animacoes.tsx.

function useCiclo(periodo: number) {
  const [fase, setFase] = useState(0);
  const [tocando, setTocando] = useState(true);
  const inicio = useRef<number | null>(null);
  const acumulado = useRef(0);
  useEffect(() => {
    if (!tocando) return;
    let quadro = 0;
    inicio.current = null;
    const passo = (agora: number) => {
      if (inicio.current === null) inicio.current = agora - acumulado.current;
      acumulado.current = agora - inicio.current;
      setFase((acumulado.current % periodo) / periodo);
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [tocando, periodo]);
  return { fase, tocando, alternar: () => setTocando((v) => !v) };
}

function Quadro({ titulo, instrucao, ciclo, altura, children }: { titulo: string; instrucao: string; ciclo: ReturnType<typeof useCiclo>; altura: number; children: (w: number) => ReactNode }) {
  const [larg, setLarg] = useState(300);
  return (
    <MolduraMidia tipo="Animação" titulo={titulo} instrucao={instrucao}>
      <Pressable accessibilityRole="button" accessibilityLabel={ciclo.tocando ? 'Pausar animação' : 'Tocar animação'} onPress={ciclo.alternar} onLayout={(e) => setLarg(e.nativeEvent.layout.width)}>
        <Svg width={larg} height={altura}>{children(larg)}</Svg>
        <View style={styles.pausa}>
          <Texto t="rodape" cor={Cores.textoApagado}>{ciclo.tocando ? 'TOQUE PARA PAUSAR' : 'PAUSADO · TOQUE PARA TOCAR'}</Texto>
        </View>
      </Pressable>
    </MolduraMidia>
  );
}

// M3V1 · A regra do 1%: risco de cada piloto (1 incapacitação em 1 milhão de horas, cerca de 1% ao ano) × 10% de fase
// crítica × 1 em 100 que o outro piloto não recupera = 1 acidente em 1 bilhão de horas. Fonte: A. Evans (ICAO), Lima,
// 2009; registro de src/data/capitulos/certificacao.ts. Esquema, sem escala.
export function AnimacaoRegra1() {
  const c = useCiclo(13500);
  const t = c.fase;
  const etapa = t < 0.34 ? 0 : t < 0.67 ? 1 : 2;
  const u = etapa === 0 ? t / 0.34 : etapa === 1 ? (t - 0.34) / 0.33 : (t - 0.67) / 0.33;
  const linha1 = etapa === 0 ? 'CADA PILOTO: ATÉ 1 INCAPACITAÇÃO' : etapa === 1 ? 'SÓ 10% DO VOO É FASE CRÍTICA' : 'O OUTRO PILOTO ASSUME EM 99 DE 100';
  const linha2 = etapa === 0 ? 'EM 1 MILHÃO DE HORAS (CERCA DE 1% AO ANO)' : etapa === 1 ? 'NA FASE CRÍTICA: 1 EM 10 MILHÕES DE HORAS' : 'ACIDENTE: 1 EM 1 BILHÃO DE HORAS';
  const cor = etapa === 2 ? Cores.acerto : etapa === 1 ? Cores.dourado : Cores.destaque;
  const H = 214;
  return (
    <Quadro titulo="A regra do 1%" instrucao="Esquema: o risco de cada piloto, a fração do voo em fase crítica e o segundo piloto que assume levam à meta de 1 acidente em 1 bilhão de horas." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 16, x1 = w - 16, solo = 178, cruzeiro = 104;
        const xs = x0 + (x1 - x0) * 0.22, xd = x0 + (x1 - x0) * 0.78;
        const crit = (x1 - x0) * 0.05;
        // posição do avião ao longo do perfil
        const x = x0 + (x1 - x0) * u;
        const y = x < xs ? solo - ((x - x0) / (xs - x0)) * (solo - cruzeiro) : x > xd ? cruzeiro + ((x - xd) / (x1 - xd)) * (solo - cruzeiro) : cruzeiro;
        const naFase = x < x0 + crit || x > x1 - crit;
        const falhou = etapa === 0 ? u > 0.45 && u < 0.7 : naFase;
        const p1 = falhou ? Cores.erro : Cores.textoSuave;
        const p2 = etapa === 2 && falhou ? Cores.acerto : Cores.textoSuave;
        const pulso = falhou ? 1 + 0.25 * Math.sin(t * 120) : 1;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={20} fill={cor} fontSize={10} fontFamily={Fonte}>{linha1}</SvgText>
            <SvgText x={10} y={36} fill={cor} fontSize={10} fontFamily={Fonte}>{linha2}</SvgText>
            <Rect x={x0} y={92} width={crit} height={solo - 92} fill={Cores.dourado} fillOpacity={etapa === 0 ? 0.08 : 0.28} />
            <Rect x={x1 - crit} y={92} width={crit} height={solo - 92} fill={Cores.dourado} fillOpacity={etapa === 0 ? 0.08 : 0.28} />
            <Path d={`M ${x0} ${solo} L ${xs} ${cruzeiro} L ${xd} ${cruzeiro} L ${x1} ${solo}`} stroke="#9CCBEA" strokeOpacity={0.6} strokeWidth={2} fill="none" strokeDasharray="5 4" />
            <Rect x={x0} y={solo} width={x1 - x0} height={2} fill={Cores.textoApagado} />
            <Circle cx={x} cy={y} r={6} fill="#F3EEDC" stroke={naFase && etapa > 0 ? Cores.dourado : '#9CCBEA'} strokeWidth={2} />
            <SvgText x={x0} y={solo + 16} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>DECOLAGEM</SvgText>
            <SvgText x={x1} y={solo + 16} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">POUSO</SvgText>
            <SvgText x={w / 2} y={cruzeiro + 18} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">CRUZEIRO</SvgText>
            <Circle cx={w / 2 - 22} cy={64} r={9 * (falhou ? pulso : 1)} fill={p1} fillOpacity={0.85} />
            <Circle cx={w / 2 + 22} cy={64} r={9} fill={p2} fillOpacity={etapa === 2 ? 0.95 : 0.35} />
            <SvgText x={w / 2 - 22} y={86} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">PILOTO 1</SvgText>
            <SvgText x={w / 2 + 22} y={86} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">PILOTO 2</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

const styles = StyleSheet.create({
  pausa: { alignItems: 'flex-end', marginTop: 2 },
});

// M3V1 congelado em 15/11/2026; M3V2 e M3V3 em 17/11/2026 (autorização do autor: "Congele"). O marcador do fim do
// congelamento fica no fim das animações do M3V3.

// M3V2 · A meia-vida: a cada meia-vida a quantidade de remédio no sangue cai pela metade; depois de cinco, resta cerca de
// 3% (0,5^5), base da espera de 5 meias-vidas da FAA. Registro em src/data/capitulos/farmacologia.ts. Esquema, sem escala de tempo.
export function AnimacaoMeiaVida() {
  const c = useCiclo(12000);
  const t = c.fase;
  const n = Math.min(5, Math.floor(t * 6.5));
  const frac = Math.min(1, t * 6.5 - n);
  const H = 214;
  const rotulos = ['DOSE: 100%', '1 MEIA-VIDA: 50%', '2 MEIAS-VIDAS: 25%', '3 MEIAS-VIDAS: 12,5%', '4 MEIAS-VIDAS: 6,25%', '5 MEIAS-VIDAS: CERCA DE 3%'];
  const cor = n >= 5 ? Cores.acerto : n >= 3 ? Cores.dourado : Cores.erro;
  return (
    <Quadro titulo="A meia-vida do remédio" instrucao="Esquema: a cada meia-vida, metade do remédio sai do sangue; depois de cinco, resta cerca de 3%, e a FAA libera o voo." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 28, base = H - 30, alto = 130, passo = (w - x0 - 16) / 6;
        const nivel = (k: number) => base - alto * Math.pow(0.5, k);
        let d = `M ${x0} ${nivel(0)}`;
        const fim = n + frac;
        for (let s = 1; s <= Math.floor(fim * 10); s++) {
          const k = s / 10;
          d += ` L ${x0 + k * passo} ${nivel(k)}`;
        }
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={20} fill={cor} fontSize={10} fontFamily={Fonte}>{rotulos[n]}</SvgText>
            <Rect x={x0} y={base} width={w - x0 - 16} height={1.5} fill={Cores.textoApagado} />
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <G key={k}>
                <Rect x={x0 + k * passo - 9} y={nivel(k)} width={18} height={base - nivel(k)} rx={3} fill={k <= n ? cor : Cores.linha} fillOpacity={k <= n ? 0.35 : 0.15} />
                <SvgText x={x0 + k * passo} y={base + 14} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">{String(k)}</SvgText>
              </G>
            ))}
            <Path d={d} stroke="#E8D27A" strokeWidth={2} fill="none" />
            <Circle cx={x0 + fim * passo} cy={nivel(fim)} r={5} fill="#F3EEDC" />
            <SvgText x={w - 16} y={base + 26} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">MEIAS-VIDAS</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M3V3 · O voo na câmara: perfil do curso de fisiologia de 1 dia do CAMI (FAA, AC 61-107B): subida com oxigênio,
// descompressão rápida de 8.000 para 18.000 ft e demonstração de hipóxia a 25.000 ft sem máscara, com a máscara de volta
// ao primeiro sinal. Registro em src/data/capitulos/selecao.ts. Esquema, sem escala de tempo.
export function AnimacaoCamara() {
  const c = useCiclo(15000);
  const t = c.fase;
  const H = 214;
  // perfil (fase → altitude em ft)
  const pontos: [number, number][] = [[0, 0], [0.14, 8000], [0.22, 8000], [0.25, 18000], [0.36, 18000], [0.46, 25000], [0.82, 25000], [1, 0]];
  const altDe = (f: number) => {
    for (let k = 1; k < pontos.length; k++) {
      const [f0, a0] = pontos[k - 1];
      const [f1, a1] = pontos[k];
      if (f <= f1) return a0 + ((a1 - a0) * (f - f0)) / (f1 - f0);
    }
    return 0;
  };
  const semMascara = t >= 0.52 && t < 0.74;
  const etapa = t < 0.22 ? 0 : t < 0.36 ? 1 : t < 0.52 ? 2 : t < 0.74 ? 3 : t < 0.82 ? 4 : 5;
  const linha1 = ['SUBIDA COM OXIGÊNIO ATÉ 8.000 FT', 'DESCOMPRESSÃO RÁPIDA: 8.000 → 18.000 FT', 'SUBIDA A 25.000 FT COM MÁSCARA', 'HIPÓXIA A 25.000 FT: MÁSCARA FORA', 'PRIMEIRO SINAL: MÁSCARA DE VOLTA', 'DESCIDA E FIM DO TREINO'][etapa];
  const linha2 = ['O AR DA CÂMARA É RETIRADO AOS POUCOS', 'O AR PRESO NO CORPO SE EXPANDE DE UMA VEZ', 'OXIGÊNIO A 100% PELA MÁSCARA', 'OBSERVE OS PRIMEIROS SINAIS: A SUA ASSINATURA', 'O DESEMPENHO VOLTA EM SEGUNDOS', 'OUVIDOS: ENGOLIR E COMPENSAR NA DESCIDA'][etapa];
  const cor = semMascara ? Cores.erro : etapa === 1 ? Cores.dourado : Cores.acerto;
  return (
    <Quadro titulo="O voo na câmara" instrucao="Esquema do curso de fisiologia da FAA: descompressão rápida de 8.000 para 18.000 ft e hipóxia a 25.000 ft, com a máscara de volta ao primeiro sinal." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 46, x1 = w - 14, topo = 52, base = H - 26;
        const y = (a: number) => base - ((base - topo) * a) / 25000;
        const x = (f: number) => x0 + (x1 - x0) * f;
        let d = `M ${x(0)} ${y(0)}`;
        for (let s = 1; s <= Math.floor(t * 100); s++) d += ` L ${x(s / 100)} ${y(altDe(s / 100))}`;
        let guia = `M ${x(0)} ${y(0)}`;
        for (let s = 1; s <= 100; s++) guia += ` L ${x(s / 100)} ${y(altDe(s / 100))}`;
        const pulso = semMascara ? 1 + 0.2 * Math.sin(t * 160) : 1;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={20} fill={cor} fontSize={10} fontFamily={Fonte}>{linha1}</SvgText>
            <SvgText x={10} y={36} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>{linha2}</SvgText>
            {[8000, 18000, 25000].map((a) => (
              <G key={a}>
                <Rect x={x0} y={y(a)} width={x1 - x0} height={1} fill={Cores.linha} fillOpacity={0.5} />
                <SvgText x={x0 - 4} y={y(a) + 3} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="end">{a === 8000 ? '8.000' : a === 18000 ? '18.000' : '25.000'}</SvgText>
              </G>
            ))}
            <Rect x={x(0.52)} y={y(25000) - 4} width={x(0.74) - x(0.52)} height={8} rx={3} fill={Cores.erro} fillOpacity={0.25} />
            <Path d={guia} stroke="#9CCBEA" strokeOpacity={0.35} strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
            <Path d={d} stroke="#E8D27A" strokeWidth={2} fill="none" />
            <Circle cx={x(t)} cy={y(altDe(t))} r={6 * pulso} fill={semMascara ? Cores.erro : '#F3EEDC'} />
            <Rect x={x0} y={base} width={x1 - x0} height={1.5} fill={Cores.textoApagado} />
            <SvgText x={x0 - 4} y={base + 3} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="end">FT</SvgText>
            <SvgText x={x1} y={base + 16} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="end">{semMascara ? 'SEM MÁSCARA' : 'COM OXIGÊNIO'}</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M3V3 · Os degraus da carreira: horas mínimas do Anexo 1 da ICAO e do RBAC 61 (piloto privado 40 h, comercial 200 h,
// linha aérea 1.500 h; MPL de 240 h em curso, caminho paralelo). Registro em src/data/capitulos/selecao.ts. Escala não
// linear (raiz quadrada das horas), para que os primeiros degraus caibam na tela.
export function AnimacaoCarreira() {
  const c = useCiclo(13000);
  const t = c.fase;
  const H = 214;
  const total = 1500;
  const horas = Math.min(total, total * Math.pow(Math.min(1, t / 0.88), 2));
  const marcos: { h: number; nome: string; cma: string }[] = [
    { h: 40, nome: 'PRIVADO', cma: '2ª CLASSE' },
    { h: 200, nome: 'COMERCIAL', cma: '1ª CLASSE' },
    { h: 1500, nome: 'LINHA AÉREA', cma: '1ª CLASSE' },
  ];
  const atual = horas < 40 ? -1 : horas < 200 ? 0 : horas < 1500 ? 1 : 2;
  const linha1 = atual < 0 ? 'ALUNO: VOO SOLO COM CMA DE 2ª CLASSE' : atual === 0 ? 'PRIVADO: 40 H (35 EM CURSO)' : atual === 1 ? 'COMERCIAL: 200 H (150 EM CURSO)' : 'LINHA AÉREA: 1.500 H, 21 ANOS';
  const cor = atual < 0 ? Cores.textoSuave : atual === 0 ? Cores.destaque : atual === 1 ? Cores.dourado : Cores.acerto;
  return (
    <Quadro titulo="Os degraus da carreira" instrucao="Esquema das horas mínimas da ICAO e da ANAC: privado, comercial e linha aérea; a MPL é um caminho paralelo, em curso de 240 horas." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 16, x1 = w - 16, yb = 120;
        const pos = (h: number) => x0 + (x1 - x0) * Math.sqrt(h / total);
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={20} fill={cor} fontSize={10} fontFamily={Fonte}>{linha1}</SvgText>
            <SvgText x={10} y={36} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>{Math.round(horas).toLocaleString('pt-BR')} H DE VOO</SvgText>
            <Rect x={x0} y={yb - 4} width={x1 - x0} height={8} rx={4} fill={Cores.linha} fillOpacity={0.4} />
            <Rect x={x0} y={yb - 4} width={Math.max(0, pos(horas) - x0)} height={8} rx={4} fill={cor} fillOpacity={0.8} />
            {marcos.map((m, k) => (
              <G key={m.nome}>
                <Rect x={pos(m.h) - 1} y={yb - (k === 1 ? 36 : 22)} width={2} height={k === 1 ? 44 : 30} fill={k <= atual ? cor : Cores.textoApagado} />
                <SvgText x={pos(m.h)} y={yb - (k === 1 ? 42 : 28)} fill={k <= atual ? Cores.texto : Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor={k === 2 ? 'end' : 'middle'}>{m.nome}</SvgText>
                <SvgText x={pos(m.h)} y={yb + 22} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor={k === 2 ? 'end' : 'middle'}>{m.h.toLocaleString('pt-BR')} H</SvgText>
                <SvgText x={pos(m.h)} y={yb + 34} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor={k === 2 ? 'end' : 'middle'}>{m.cma}</SvgText>
              </G>
            ))}
            <Circle cx={pos(horas)} cy={yb} r={6} fill="#F3EEDC" />
            <SvgText x={10} y={H - 28} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte}>MPL: CAMINHO PARALELO, 240 H EM CURSO</SvgText>
            <SvgText x={10} y={H - 14} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte}>ESCALA NÃO LINEAR</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// FIM DO CONGELAMENTO M3V3 (17/11/2026). Animações de voos novos da Missão Aviação entram abaixo desta linha; tudo acima
// está congelado (scripts/check-congelados.cjs) e só muda com autorização explícita do autor.

// M3V4 · O queijo suíço de Reason: quatro camadas de defesa (organização, supervisão, precondições e atos inseguros),
// cada uma com furos que se movem; o perigo só vira acidente quando os furos se alinham. Registro em
// src/data/capitulos/fatores-humanos.ts (Reason, 1990; HFACS, DOT/FAA/AM-05/24). Esquema, sem escala.
export function AnimacaoQueijo() {
  const c = useCiclo(16000);
  const t = c.fase;
  const H = 214;
  // furos: posição vertical (0 a 1) de cada camada ao longo do ciclo; no fim do ciclo, todos se alinham no centro
  const alinha = t > 0.7 && t < 0.92;
  const furo = (k: number) => (alinha ? 0.5 : 0.5 + 0.32 * Math.sin(2 * Math.PI * (t * (1 + k * 0.37) + k * 0.23)));
  const passou = alinha ? 4 : (() => { for (let k = 0; k < 4; k++) if (Math.abs(furo(k) - 0.5) > 0.12) return k; return 4; })();
  const segurou = ['A ORGANIZAÇÃO SEGUROU O PERIGO', 'A SUPERVISÃO SEGUROU O PERIGO', 'AS PRECONDIÇÕES SEGURARAM O PERIGO', 'A ÚLTIMA DEFESA SEGUROU O PERIGO', 'OS FUROS SE ALINHARAM: ACIDENTE'];
  const linha1 = alinha ? 'OS FUROS SE ALINHARAM: ACIDENTE' : segurou[passou];
  const linha2 = alinha ? 'FALHAS LATENTES + FALHA ATIVA NA CABINE' : 'CADA CAMADA TEM FUROS QUE MUDAM COM O TEMPO';
  const cor = alinha ? Cores.erro : Cores.acerto;
  return (
    <Quadro titulo="O queijo suíço" instrucao="Esquema do modelo de Reason: cada camada de defesa tem furos; o perigo só chega ao acidente quando todos se alinham." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 26, x1 = w - 26, topo = 50, base = H - 30, alto = base - topo;
        const xs = [0, 1, 2, 3].map((k) => x0 + 34 + ((x1 - x0 - 68) * k) / 3);
        const yc = topo + alto * 0.5;
        const limite = passou >= 4 ? x1 : xs[passou] - 8;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={20} fill={cor} fontSize={10} fontFamily={Fonte}>{linha1}</SvgText>
            <SvgText x={10} y={36} fill={Cores.textoSuave} fontSize={9} fontFamily={Fonte}>{linha2}</SvgText>
            {xs.map((x, k) => (
              <G key={k}>
                <Rect x={x - 7} y={topo} width={14} height={alto} rx={5} fill="#E8D27A" fillOpacity={0.85} />
                <Rect x={x - 7} y={topo + alto * furo(k) - 11} width={14} height={22} rx={7} fill="#0A1626" />
                <SvgText x={x} y={base + 14} fill={Cores.textoApagado} fontSize={7} fontFamily={Fonte} textAnchor="middle">{String(k + 1)}</SvgText>
              </G>
            ))}
            <Path d={`M ${x0 - 14} ${yc} L ${limite} ${yc}`} stroke={cor} strokeWidth={2.5} strokeDasharray="6 4" />
            <Circle cx={limite} cy={yc} r={5} fill={cor} />
            <SvgText x={x0 - 18} y={yc - 8} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte}>PERIGO</SvgText>
            <SvgText x={w / 2} y={base + 26} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">1 ORGANIZAÇÃO · 2 SUPERVISÃO · 3 PRECONDIÇÕES · 4 ATOS</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M3V15 · Duas investigações: o mesmo acidente abre a investigação do SIPAER (prevenção) e a da polícia e da Justiça
// (responsabilidade), independentes; os dados do SIPAER só viram prova com decisão do juiz. Registro em
// src/data/capitulos/investigacao.ts (Lei 12.970/2014; STF, ADI 5.667). Esquema, sem escala de tempo.
export function AnimacaoDuasInvestigacoes() {
  const c = useCiclo(14000);
  const t = c.fase;
  const H = 236;
  const cima = ['LOCAL', 'ANÁLISE', 'RELATÓRIO', 'RECOMENDAÇÕES'];
  const baixo = ['LOCAL', 'PERÍCIA', 'INQUÉRITO', 'PROCESSO'];
  const passo = Math.min(3, Math.floor(t * 4.4));
  const linhas = t < 0.25 ? ['O MESMO ACIDENTE', 'ABRE DUAS INVESTIGAÇÕES'] : t < 0.6 ? ['INDEPENDENTES: QUEM ATUA', 'EM UMA NÃO ATUA NA OUTRA'] : ['DADOS DO SIPAER SÓ VIRAM', 'PROVA COM DECISÃO DO JUIZ'];
  return (
    <Quadro titulo="Duas investigações" instrucao="Esquema: a investigação do SIPAER busca prevenir; a da polícia e da Justiça busca responsabilizar. Elas correm separadas." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 16, x1 = w - 22, yc = 82, yb = 182, ym = (yc + yb) / 2;
        const xs = [0, 1, 2, 3].map((k) => x0 + 34 + ((x1 - x0 - 34) * k) / 3);
        const u = Math.min(1, t * 1.15);
        const xp = xs[0] + (xs[3] - xs[0]) * u;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={18} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{linhas[0]}</SvgText>
            <SvgText x={10} y={30} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{linhas[1]}</SvgText>
            <Circle cx={x0} cy={ym} r={7} fill={Cores.erro} />
            <Path d={`M ${x0} ${ym} L ${xs[0]} ${yc}`} stroke={Cores.textoApagado} strokeWidth={1.5} />
            <Path d={`M ${x0} ${ym} L ${xs[0]} ${yb}`} stroke={Cores.textoApagado} strokeWidth={1.5} />
            <Rect x={xs[0]} y={ym - 1} width={xs[3] - xs[0]} height={2} fill={Cores.textoApagado} fillOpacity={0.6} />
            <SvgText x={xs[0]} y={yc - 14} fill={Cores.acerto} fontSize={9} fontFamily={Fonte}>SIPAER · PREVENIR</SvgText>
            <SvgText x={xs[0]} y={yb + 26} fill={Cores.destaque} fontSize={9} fontFamily={Fonte}>POLÍCIA E JUSTIÇA · RESPONSABILIZAR</SvgText>
            {xs.map((x, k) => {
              const ax = k === 0 ? 'start' : k === 3 ? 'end' : 'middle';
              const lx = k === 0 ? x - 5 : k === 3 ? x + 5 : x;
              return (
              <G key={k}>
                <Circle cx={x} cy={yc} r={5} fill={k <= passo ? Cores.acerto : Cores.linha} />
                <Circle cx={x} cy={yb} r={5} fill={k <= passo ? Cores.destaque : Cores.linha} />
                <SvgText x={lx} y={yc + (k % 2 ? 27 : 16)} fill={Cores.textoApagado} fontSize={7.5} fontFamily={Fonte} textAnchor={ax}>{cima[k]}</SvgText>
                <SvgText x={lx} y={yb - (k % 2 ? 20 : 9)} fill={Cores.textoApagado} fontSize={7.5} fontFamily={Fonte} textAnchor={ax}>{baixo[k]}</SvgText>
              </G>
              );
            })}
            <Rect x={xs[0]} y={yc - 2} width={Math.max(0, xp - xs[0])} height={4} rx={2} fill={Cores.acerto} fillOpacity={0.7} />
            <Rect x={xs[0]} y={yb - 2} width={Math.max(0, xp - xs[0])} height={4} rx={2} fill={Cores.destaque} fillOpacity={0.7} />
            <SvgText x={(xs[1] + xs[2]) / 2} y={ym - 5} fill={Cores.textoApagado} fontSize={7.5} fontFamily={Fonte} textAnchor="middle">SEPARADAS</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M3V5 · Regra das duas chamadas: na aproximação, o comandante deixa de responder a duas chamadas seguidas e o copiloto
// assume. Registro em src/data/capitulos/seguranca-voo.ts (Transport Canada, TP 11629). Esquema, sem escala de tempo.
export function AnimacaoDuasChamadas() {
  const c = useCiclo(13000);
  const t = c.fase;
  const H = 230;
  const etapa = t < 0.18 ? 0 : t < 0.38 ? 1 : t < 0.58 ? 2 : t < 0.78 ? 3 : 4;
  const topo = [
    ['APROXIMAÇÃO: O COPILOTO', 'FAZ AS CHAMADAS'],
    ['PRIMEIRA CHAMADA:', 'O COMANDANTE RESPONDE'],
    ['SEGUNDA CHAMADA:', 'SEM RESPOSTA'],
    ['TERCEIRA CHAMADA:', 'DE NOVO SEM RESPOSTA'],
    ['DUAS CHAMADAS SEM RESPOSTA:', 'SUSPEITE DE INCAPACITAÇÃO E AJA'],
  ][etapa];
  const fala = ['', '1.000 PÉS', '500 PÉS', 'MÍNIMOS', 'ASSUMO OS COMANDOS'][etapa];
  const resposta = ['', 'CHECADO', '...', '...', ''][etapa];
  return (
    <Quadro titulo="Regra das duas chamadas" instrucao="Esquema: na aproximação, o comandante para de responder às chamadas e o copiloto assume." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 18, x1 = w - 18, y0 = 54, y1 = 120;
        const u = Math.min(1, t * 1.1);
        const xp = x0 + (x1 - x0) * u;
        const yp = y0 + (y1 - y0) * u;
        const xc = w * 0.3, xf = w * 0.7, yh = 176;
        const cmtCor = etapa >= 2 ? Cores.erro : Cores.textoSuave;
        const copCor = etapa === 4 ? Cores.acerto : Cores.destaque;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={18} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{topo[0]}</SvgText>
            <SvgText x={10} y={30} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{topo[1]}</SvgText>
            <Path d={`M ${x0} ${y0} L ${x1} ${y1}`} stroke={Cores.textoApagado} strokeWidth={1} strokeDasharray="4 4" />
            <Rect x={x1 - 26} y={y1 + 2} width={30} height={3} fill={Cores.textoApagado} />
            <Circle cx={xp} cy={yp} r={5} fill={Cores.destaque} />
            <Circle cx={xc} cy={yh - 18} r={10} fill={cmtCor} fillOpacity={etapa >= 2 ? 0.5 : 0.9} />
            <Rect x={xc - 14} y={yh - 6} width={28} height={22} rx={6} fill={cmtCor} fillOpacity={etapa >= 2 ? 0.5 : 0.9} />
            <Circle cx={xf} cy={yh - 18} r={10} fill={copCor} />
            <Rect x={xf - 14} y={yh - 6} width={28} height={22} rx={6} fill={copCor} />
            <SvgText x={xc} y={yh + 30} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">COMANDANTE</SvgText>
            <SvgText x={xf} y={yh + 30} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="middle">COPILOTO</SvgText>
            {fala ? <SvgText x={xf} y={yh - 36} fill={copCor} fontSize={9} fontFamily={Fonte} textAnchor="middle">{fala}</SvgText> : null}
            {resposta ? <SvgText x={xc} y={yh - 36} fill={etapa >= 2 ? Cores.erro : Cores.acerto} fontSize={9} fontFamily={Fonte} textAnchor="middle">{resposta}</SvgText> : null}
          </G>
        );
      }}
    </Quadro>
  );
}

// M3V6 · Segmento visual: com o olho abaixo da referência, a borda do painel corta a visão para baixo e o trecho de pista
// visível antes da neblina encurta. Registro em src/data/capitulos/ergonomia.ts (Airbus Safety First). Esquema, sem escala.
export function AnimacaoSegmentoVisual() {
  const c = useCiclo(9000);
  const t = c.fase;
  const H = 210;
  const baixo = t > 0.5;
  const s = baixo ? Math.min(1, (t - 0.5) * 6) : Math.max(0, 1 - t * 6);
  const topo = baixo ? ['OLHO ABAIXO DA REFERÊNCIA:', 'O SEGMENTO VISUAL ENCURTA'] : ['OLHO NA REFERÊNCIA:', 'MAIS PISTA À VISTA'];
  return (
    <Quadro titulo="Segmento visual" instrucao="Esquema: compare quanto da pista o piloto vê com o olho na referência e abaixo dela." ciclo={c} altura={H}>
      {(w) => {
        const ex = 26, ey = 70 + 16 * s, gx = 66, gy = 104, chao = 176, fog = w - 18;
        const xi = ex + ((gx - ex) * (chao - ey)) / (gy - ey);
        const ini = Math.min(xi, fog);
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={18} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{topo[0]}</SvgText>
            <SvgText x={10} y={30} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{topo[1]}</SvgText>
            <Rect x={0} y={chao} width={w} height={H - chao} fill="#13233A" />
            <Rect x={fog} y={40} width={w - fog} height={chao - 40} fill={Cores.textoApagado} fillOpacity={0.35} />
            <SvgText x={fog - 4} y={52} fill={Cores.textoApagado} fontSize={8} fontFamily={Fonte} textAnchor="end">NEBLINA</SvgText>
            <Path d={`M ${gx - 22} ${gy} L ${gx} ${gy} L ${gx} ${gy + 26}`} stroke={Cores.textoSuave} strokeWidth={3} fill="none" />
            <SvgText x={gx + 4} y={gy + 22} fill={Cores.textoApagado} fontSize={7.5} fontFamily={Fonte}>PAINEL</SvgText>
            <Circle cx={ex} cy={ey} r={5} fill={baixo ? Cores.erro : Cores.acerto} />
            <Path d={`M ${ex} ${ey} L ${ini} ${chao}`} stroke={Cores.destaque} strokeWidth={1.2} strokeDasharray="4 3" />
            <Rect x={ini} y={chao - 3} width={Math.max(0, fog - ini)} height={6} rx={2} fill={Cores.destaque} />
            <SvgText x={(ini + fog) / 2} y={chao + 18} fill={Cores.destaque} fontSize={8.5} fontFamily={Fonte} textAnchor="middle">SEGMENTO VISUAL</SvgText>
          </G>
        );
      }}
    </Quadro>
  );
}

// M3V7 · Caminho do retorno: do afastamento ao voo, com a empresa nos primeiros 15 dias, o INSS depois, o exame de
// retorno da NR-7 a partir de 30 dias, a aptidão do RBAC 67 e a volta gradual. Registro em
// src/data/capitulos/medicina-ocupacional.ts. Esquema, sem escala de tempo.
export function AnimacaoRetorno() {
  const c = useCiclo(14000);
  const t = c.fase;
  const H = 220;
  const passos = ['AFASTAMENTO', 'ATÉ 15 DIAS', 'INSS', 'EXAME DE RETORNO', 'APTIDÃO', 'VOLTA GRADUAL'];
  const notas = [
    ['A APTIDÃO DIMINUIU:', 'PARAR DE VOAR E AVISAR'],
    ['OS PRIMEIROS 15 DIAS', 'FICAM COM A EMPRESA'],
    ['DEPOIS, O BENEFÍCIO', 'VEM DO INSS'],
    ['30 DIAS OU MAIS AFASTADO:', 'EXAME DE RETORNO DA NR-7'],
    ['CMA VÁLIDO E APTIDÃO', 'RECUPERADA PELO RBAC 67'],
    ['SIMULADOR OU VOO DE', 'READAPTAÇÃO ANTES DA ESCALA'],
  ];
  const k = Math.min(5, Math.floor(t * 6.2));
  return (
    <Quadro titulo="O caminho de volta" instrucao="Esquema: as etapas entre o afastamento e a volta ao voo, na ordem." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 22, x1 = w - 22, y = 112;
        const xs = passos.map((_, i) => x0 + ((x1 - x0) * i) / (passos.length - 1));
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={18} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{notas[k][0]}</SvgText>
            <SvgText x={10} y={30} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{notas[k][1]}</SvgText>
            <Rect x={x0} y={y - 2} width={x1 - x0} height={4} rx={2} fill={Cores.linha} />
            <Rect x={x0} y={y - 2} width={Math.max(0, xs[k] - x0)} height={4} rx={2} fill={Cores.acerto} />
            {xs.map((x, i) => (
              <G key={i}>
                <Circle cx={x} cy={y} r={i === k ? 8 : 6} fill={i <= k ? (i === 0 ? Cores.erro : i === 5 ? Cores.acerto : Cores.destaque) : Cores.linha} />
                <SvgText x={x} y={i === 3 ? y + 48 : i % 2 ? y + 30 : y - 18} fill={i === k ? Cores.texto : Cores.textoApagado} fontSize={7.5} fontFamily={Fonte} textAnchor={i === 0 ? 'start' : i === 5 ? 'end' : 'middle'}>{passos[i]}</SvgText>
              </G>
            ))}
          </G>
        );
      }}
    </Quadro>
  );
}

// M3V8 · Do escapamento ao sangue: o monóxido sai por uma trinca, contamina o ar do aquecimento, chega à cabine e
// ocupa a hemoglobina. Registro em src/data/capitulos/toxicologia.ts. Esquema, sem escala.
export function AnimacaoMonoxido() {
  const c = useCiclo(12000);
  const t = c.fase;
  const H = 220;
  const passos = ['ESCAPAMENTO', 'AQUECIMENTO', 'CABINE', 'SANGUE'];
  const notas = [
    ['TRINCA NO ESCAPAMENTO:', 'O GÁS ESCAPA SEM CHEIRO'],
    ['O AR DO AQUECIMENTO', 'RECEBE O MONÓXIDO'],
    ['O GÁS CHEGA À CABINE:', 'SÓ O DETECTOR AVISA'],
    ['O CO OCUPA A HEMOGLOBINA:', 'MENOS OXIGÊNIO NOS TECIDOS'],
  ];
  const k = Math.min(3, Math.floor(t * 4));
  const ocupados = k < 3 ? 0 : Math.min(3, 1 + Math.floor((t - 0.75) * 12));
  const sitios = [0, 1, 2, 3];
  const particulas = [0, 1, 2, 3, 4];
  return (
    <Quadro titulo="Do escapamento ao sangue" instrucao="Esquema, sem escala: o caminho do monóxido até a hemoglobina." ciclo={c} altura={H}>
      {(w) => {
        const x0 = 24, x1 = w - 24, y = 78;
        const xs = passos.map((_, i) => x0 + ((x1 - x0) * i) / (passos.length - 1));
        const cx = w / 2, yh = 168;
        return (
          <G>
            <Rect x={0} y={0} width={w} height={H} rx={8} fill="#0A1626" />
            <SvgText x={10} y={18} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{notas[k][0]}</SvgText>
            <SvgText x={10} y={30} fill={Cores.dourado} fontSize={9} fontFamily={Fonte}>{notas[k][1]}</SvgText>
            <Rect x={x0} y={y - 2} width={x1 - x0} height={4} rx={2} fill={Cores.linha} />
            {particulas.map((i) => {
              const f = ((t * 8 + i / particulas.length) % 1);
              return <Circle key={i} cx={x0 + (xs[k] - x0) * f} cy={y + Math.sin(f * 12 + i) * 4} r={2.6} fill={Cores.erro} fillOpacity={k === 0 && f < 0.05 ? 0 : 0.85} />;
            })}
            {xs.map((x, i) => (
              <G key={i}>
                <Circle cx={x} cy={y} r={i === k ? 8 : 6} fill={i <= k ? (i === 3 ? Cores.erro : Cores.destaque) : Cores.linha} />
                <SvgText x={x} y={i % 2 ? y + 24 : y - 14} fill={i === k ? Cores.texto : Cores.textoApagado} fontSize={7.5} fontFamily={Fonte} textAnchor={i === 0 ? 'start' : i === 3 ? 'end' : 'middle'}>{passos[i]}</SvgText>
              </G>
            ))}
            <SvgText x={cx} y={yh - 26} fill={Cores.textoSuave} fontSize={8} fontFamily={Fonte} textAnchor="middle">HEMOGLOBINA</SvgText>
            {sitios.map((i) => {
              const co = i < ocupados;
              const sx = cx + (i - 1.5) * 38;
              return (
                <G key={i}>
                  <Circle cx={sx} cy={yh} r={15} fill={co ? Cores.erro : Cores.acerto} fillOpacity={0.9} />
                  <SvgText x={sx} y={yh + 3.5} fill={Cores.fundo} fontSize={9.5} fontFamily={Fonte} textAnchor="middle">{co ? 'CO' : 'O2'}</SvgText>
                </G>
              );
            })}
          </G>
        );
      }}
    </Quadro>
  );
}
