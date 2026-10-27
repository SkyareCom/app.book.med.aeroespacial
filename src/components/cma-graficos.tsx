import { useState, type ReactNode } from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Line, Path, Polyline, Rect, Text as SvgText } from 'react-native-svg';

import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Fonte } from '@/constants/theme';
import { validadeMeses } from '@/lib/cma';

// Gráficos do Exame CMA: atualizam enquanto o examinador preenche o formulário.
// Limites do RBAC 67 (1ª classe): PA 140×90 (67.79(a)); glicemia 67.85(d)–(e); acuidade 67.99(c)(1); audição 67.101(a).

const VERDE = Cores.acerto;
const AMARELO = Cores.dourado;
const VERMELHO = Cores.erro;

function Largura({ altura, children }: { altura: number; children: (w: number) => ReactNode }) {
  const [w, setW] = useState(300);
  return (
    <View onLayout={(e) => setW(e.nativeEvent.layout.width)} style={{ height: altura }}>
      {children(w)}
    </View>
  );
}

const rot = (x: number, y: number, t: string, cor: string = Cores.textoApagado, anchor: 'start' | 'middle' | 'end' = 'middle', tam = 9) => (
  <SvgText x={x} y={y} fill={cor} fontSize={tam} fontFamily={Fonte} textAnchor={anchor}>
    {t}
  </SvgText>
);

// ---------------------------------------------------------------- Pressão arterial
export function GraficoPA({ pas, pad }: { pas?: number; pad?: number }) {
  const H = 190;
  const ok = pas !== undefined && pad !== undefined ? pas <= 140 && pad <= 90 : undefined;
  return (
    <MolduraMidia tipo="Gráfico" titulo="Pressão arterial no limite do RBAC" instrucao="A área verde é a faixa aceita: até 140 de sistólica e 90 de diastólica.">
      <Largura altura={H}>
        {(w) => {
          const x0 = 34, x1 = w - 10, y0 = 10, y1 = H - 24;
          const X = (d: number) => x0 + ((Math.min(Math.max(d, 50), 120) - 50) / 70) * (x1 - x0);
          const Y = (s: number) => y1 - ((Math.min(Math.max(s, 90), 200) - 90) / 110) * (y1 - y0);
          return (
            <Svg width={w} height={H}>
              <Rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={VERMELHO} fillOpacity={0.1} rx={6} />
              <Rect x={x0} y={Y(140)} width={X(90) - x0} height={y1 - Y(140)} fill={VERDE} fillOpacity={0.18} />
              <Line x1={X(90)} y1={y0} x2={X(90)} y2={y1} stroke={AMARELO} strokeDasharray="4 4" />
              <Line x1={x0} y1={Y(140)} x2={x1} y2={Y(140)} stroke={AMARELO} strokeDasharray="4 4" />
              {[100, 140, 180].map((s) => <G key={s}>{rot(x0 - 6, Y(s) + 3, String(s), Cores.textoApagado, 'end')}</G>)}
              {[60, 90, 110].map((d) => <G key={d}>{rot(X(d), H - 10, String(d))}</G>)}
              {rot(x0 + 6, y0 + 14, 'SISTÓLICA', Cores.textoApagado, 'start')}
              {rot(x1, H - 1, 'DIASTÓLICA (mmHg)', Cores.textoApagado, 'end')}
              {ok !== undefined ? (
                <G>
                  <Circle cx={X(pad!)} cy={Y(pas!)} r={11} fill={ok ? VERDE : VERMELHO} fillOpacity={0.25} />
                  <Circle cx={X(pad!)} cy={Y(pas!)} r={5} fill={ok ? VERDE : VERMELHO} />
                </G>
              ) : null}
            </Svg>
          );
        }}
      </Largura>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Leitura rotulo="PA medida" valor={ok === undefined ? '—' : `${pas}×${pad}`} cor={ok === undefined ? Cores.textoApagado : ok ? VERDE : VERMELHO} />
        <Leitura rotulo="Limite" valor="140×90" cor={AMARELO} />
      </View>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Glicemia
const FAIXAS_GLI: [number, number, string][] = [
  [30, 50, VERMELHO],
  [50, 70, AMARELO],
  [70, 115, VERDE],
  [115, 140, AMARELO],
  [140, 200, VERMELHO],
];

export function EscalaGlicemia({ gli }: { gli?: number }) {
  const H = 92;
  const cor = gli === undefined ? Cores.textoApagado : gli < 50 || gli > 140 ? VERMELHO : gli < 70 || gli >= 115 ? AMARELO : VERDE;
  const txt = gli === undefined ? 'Preencha a glicemia de jejum' : cor === VERDE ? 'Normal' : cor === AMARELO ? 'A critério do examinador' : 'Fora de 50–140: confirmar em 2 dosagens';
  return (
    <MolduraMidia tipo="Gráfico" titulo="Glicemia de jejum nas faixas do RBAC" instrucao={txt}>
      <Largura altura={H}>
        {(w) => {
          const x0 = 8, x1 = w - 8, yb = 38;
          const X = (g: number) => x0 + ((Math.min(Math.max(g, 30), 200) - 30) / 170) * (x1 - x0);
          return (
            <Svg width={w} height={H}>
              {FAIXAS_GLI.map(([a, b, c]) => (
                <Rect key={a} x={X(a)} y={yb} width={X(b) - X(a) - 2} height={14} rx={4} fill={c} fillOpacity={0.55} />
              ))}
              {[50, 70, 115, 140].map((g) => <G key={g}>{rot(X(g), yb + 30, String(g))}</G>)}
              {rot(x1, H - 4, 'mg/dl', Cores.textoApagado, 'end')}
              {gli !== undefined ? (
                <G>
                  <Path d={`M${X(gli) - 7} ${yb - 16} L${X(gli) + 7} ${yb - 16} L${X(gli)} ${yb - 4} Z`} fill={cor} />
                  {rot(X(gli), yb - 22, `${gli}`, cor, 'middle', 11)}
                </G>
              ) : null}
            </Svg>
          );
        }}
      </Largura>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Acuidade visual
const LINHAS_SNELLEN = [10, 15, 20, 25, 30, 40, 50, 70, 100, 200];

export function GraficoAcuidade({ od, oe, bin }: { od?: number; oe?: number; bin?: number }) {
  const linhas: { nome: string; v?: number; lim: number }[] = [
    { nome: 'OD', v: od, lim: 30 },
    { nome: 'OE', v: oe, lim: 30 },
    { nome: 'AO', v: bin, lim: 20 },
  ];
  const H = 150;
  return (
    <MolduraMidia tipo="Gráfico" titulo="Acuidade de longe na tabela de Snellen" instrucao="Mínimo de 20/30 em cada olho e 20/20 com os dois olhos. À esquerda da linha dourada, passa.">
      <Largura altura={H}>
        {(w) => {
          const x0 = 34, x1 = w - 10;
          const X = (d: number) => {
            let i = LINHAS_SNELLEN.findIndex((s) => d <= s);
            if (i < 0) i = LINHAS_SNELLEN.length - 1;
            if (i === 0) return x0;
            const a = LINHAS_SNELLEN[i - 1], b = LINHAS_SNELLEN[i];
            const f = (i - 1 + (d - a) / (b - a)) / (LINHAS_SNELLEN.length - 1);
            return x0 + Math.min(f, 1) * (x1 - x0);
          };
          return (
            <Svg width={w} height={H}>
              {linhas.map((l, i) => {
                const y = 14 + i * 38;
                const passa = l.v !== undefined ? l.v <= l.lim : undefined;
                const cor = passa === undefined ? Cores.textoApagado : passa ? VERDE : VERMELHO;
                return (
                  <G key={l.nome}>
                    {rot(x0 - 8, y + 12, l.nome, Cores.texto, 'end', 11)}
                    <Rect x={x0} y={y} width={x1 - x0} height={16} rx={8} fill={Cores.trilha} />
                    <Rect x={x0} y={y} width={X(l.lim) - x0} height={16} rx={8} fill={VERDE} fillOpacity={0.16} />
                    <Line x1={X(l.lim)} y1={y - 4} x2={X(l.lim)} y2={y + 20} stroke={AMARELO} strokeWidth={2} />
                    {l.v !== undefined ? <Circle cx={X(l.v)} cy={y + 8} r={7} fill={cor} /> : null}
                  </G>
                );
              })}
              {[10, 20, 30, 50, 100].map((d) => <G key={d}>{rot(X(d), H - 16, `20/${d}`)}</G>)}
              {rot(x0, H - 2, 'MELHOR', Cores.textoApagado, 'start')}
              {rot(x1, H - 2, 'PIOR', Cores.textoApagado, 'end')}
            </Svg>
          );
        }}
      </Largura>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Audiograma
const FREQ = ['500', '1000', '2000', '3000'];
const LIMITE_DB = [35, 35, 35, 50];

export function Audiograma({ od, oe }: { od: (number | undefined)[]; oe: (number | undefined)[] }) {
  const H = 210;
  return (
    <MolduraMidia tipo="Gráfico" titulo="Audiograma com o limite do RBAC" instrucao="Orelha direita em vermelho (○), esquerda em azul (×). Abaixo da linha dourada, a perda passa do limite.">
      <Largura altura={H}>
        {(w) => {
          const x0 = 34, x1 = w - 16, y0 = 14, y1 = H - 26;
          const X = (i: number) => x0 + (i / 3) * (x1 - x0);
          const Y = (db: number) => y0 + (Math.min(Math.max(db, -10), 90) + 10) / 100 * (y1 - y0);
          const limite = `M${X(0)} ${Y(35)} L${X(2)} ${Y(35)} L${X(3)} ${Y(50)}`;
          const serie = (v: (number | undefined)[]) => v.map((d, i) => (d === undefined ? null : `${X(i)},${Y(d)}`)).filter(Boolean).join(' ');
          return (
            <Svg width={w} height={H}>
              <Path d={`${limite} L${X(3)} ${y1} L${X(0)} ${y1} Z`} fill={VERMELHO} fillOpacity={0.1} />
              {[0, 20, 40, 60, 80].map((d) => (
                <G key={d}>
                  <Line x1={x0} y1={Y(d)} x2={x1} y2={Y(d)} stroke={Cores.trilha} />
                  {rot(x0 - 6, Y(d) + 3, String(d), Cores.textoApagado, 'end')}
                </G>
              ))}
              {FREQ.map((f, i) => (
                <G key={f}>
                  <Line x1={X(i)} y1={y0} x2={X(i)} y2={y1} stroke={Cores.trilha} />
                  {rot(X(i), H - 10, `${Number(f).toLocaleString('pt-BR')} Hz`)}
                </G>
              ))}
              <Path d={limite} stroke={AMARELO} strokeWidth={2} fill="none" strokeDasharray="5 4" />
              {rot(x0 + 4, y0 - 3, 'dB', Cores.textoApagado, 'start')}
              <Polyline points={serie(od)} stroke={VERMELHO} strokeWidth={2} fill="none" />
              <Polyline points={serie(oe)} stroke={Cores.destaque} strokeWidth={2} fill="none" strokeDasharray="2 3" />
              {od.map((d, i) => (d === undefined ? null : <Circle key={`d${i}`} cx={X(i)} cy={Y(d)} r={5.5} stroke={VERMELHO} strokeWidth={2} fill={Cores.fundo} />))}
              {oe.map((d, i) =>
                d === undefined ? null : (
                  <G key={`e${i}`}>
                    <Line x1={X(i) - 5} y1={Y(d) - 5} x2={X(i) + 5} y2={Y(d) + 5} stroke={Cores.destaque} strokeWidth={2.2} />
                    <Line x1={X(i) - 5} y1={Y(d) + 5} x2={X(i) + 5} y2={Y(d) - 5} stroke={Cores.destaque} strokeWidth={2.2} />
                  </G>
                ),
              )}
            </Svg>
          );
        }}
      </Largura>
    </MolduraMidia>
  );
}

export const passaOrelha = (v: (number | undefined)[]) => (v.some((x) => x === undefined) ? undefined : v.every((x, i) => x! <= LIMITE_DB[i]));

// ---------------------------------------------------------------- Validade por idade
export const SERIES_VALIDADE = [
  { funcao: 'pla-multi', publico: true, nome: '1ª classe', cor: Cores.destaque },
  { funcao: 'pla-unico', publico: true, nome: 'Piloto único', cor: '#B48CFF' },
  { funcao: 'pp', publico: false, nome: 'PP, CPA, PPL', cor: AMARELO },
  { funcao: 'comissario', publico: false, nome: 'Comissário', cor: VERDE },
  { funcao: 'rpa', publico: false, nome: 'RPA', cor: '#FF9F6E' },
];

export function GraficoValidade({ series, idade, titulo, instrucao }: { series: typeof SERIES_VALIDADE; idade?: number; titulo: string; instrucao?: string }) {
  const H = 200;
  return (
    <MolduraMidia tipo="Gráfico" titulo={titulo} instrucao={instrucao}>
      <Largura altura={H}>
        {(w) => {
          const x0 = 30, x1 = w - 10, y0 = 12, y1 = H - 26;
          const X = (a: number) => x0 + ((a - 18) / (75 - 18)) * (x1 - x0);
          const Y = (m: number) => y1 - (m / 60) * (y1 - y0);
          return (
            <Svg width={w} height={H}>
              {[6, 12, 24, 48, 60].map((m) => (
                <G key={m}>
                  <Line x1={x0} y1={Y(m)} x2={x1} y2={Y(m)} stroke={Cores.trilha} />
                  {rot(x0 - 5, Y(m) + 3, String(m), Cores.textoApagado, 'end')}
                </G>
              ))}
              {[20, 30, 40, 50, 60, 70].map((a) => <G key={a}>{rot(X(a), H - 10, `${a}`)}</G>)}
              {rot(x1, H - 1, 'IDADE (ANOS)', Cores.textoApagado, 'end')}
              {rot(x0 + 4, y0 - 2, 'MESES', Cores.textoApagado, 'start')}
              {series.map((s, k) => {
                let d = '';
                for (let a = 18; a <= 75; a++) {
                  const m = validadeMeses(s.funcao, a, s.publico).meses;
                  d += `${a === 18 ? 'M' : 'L'}${X(a)} ${Y(m) + k * 1.2}`;
                  if (a < 75) d += ` L${X(a + 1)} ${Y(m) + k * 1.2}`;
                }
                return <Path key={s.nome} d={d} stroke={s.cor} strokeWidth={2.4} fill="none" strokeLinejoin="round" />;
              })}
              {idade !== undefined && idade >= 18 && idade <= 75 ? (
                <G>
                  <Line x1={X(idade)} y1={y0} x2={X(idade)} y2={y1} stroke={Cores.texto} strokeDasharray="3 3" />
                  {series.length === 1 ? <Circle cx={X(idade)} cy={Y(validadeMeses(series[0].funcao, idade, series[0].publico).meses)} r={6} fill={series[0].cor} stroke={Cores.fundo} strokeWidth={2} /> : null}
                </G>
              ) : null}
            </Svg>
          );
        }}
      </Largura>
      {series.length > 1 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {series.map((s) => (
            <View key={s.nome} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={{ width: 14, height: 3, borderRadius: 2, backgroundColor: s.cor }} />
              <Texto t="rotulo" cor={Cores.textoSuave}>{s.nome}</Texto>
            </View>
          ))}
        </View>
      ) : null}
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Anel do veredito
export function AnelValidade({ meses, cor, rotulo }: { meses?: number; cor: string; rotulo: string }) {
  const R = 46, C = 2 * Math.PI * R;
  const f = meses ? Math.min(meses / 60, 1) : 0;
  return (
    <Svg width={116} height={116}>
      <Circle cx={58} cy={58} r={R} stroke={Cores.trilha} strokeWidth={9} fill="none" />
      <Circle cx={58} cy={58} r={R} stroke={cor} strokeWidth={9} fill="none" strokeDasharray={`${C * f} ${C}`} strokeLinecap="round" transform="rotate(-90 58 58)" />
      <SvgText x={58} y={meses ? 60 : 63} fill={cor} fontSize={meses ? 26 : 22} fontFamily={Fonte} textAnchor="middle">
        {meses ? String(meses) : '—'}
      </SvgText>
      <SvgText x={58} y={78} fill={Cores.textoApagado} fontSize={9} fontFamily={Fonte} textAnchor="middle">
        {rotulo}
      </SvgText>
    </Svg>
  );
}
