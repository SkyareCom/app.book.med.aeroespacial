import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Deslizante } from '@/components/midia/deslizante';
import { Leitura, MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';

// Interativos do M2V8 · Sono, relógio biológico e fadiga. Fontes no registro de src/data/capitulos/sono.ts: ICAO Doc 8984
// (Part III, Cap. 17) e Doc 9966; FAA AC 120-100 e Guia do AME; CDC Yellow Book (jet lag); Leproult e Van Cauter (2010);
// Lei 13.475/2017. Sem fonte: [confirmar na referência].
const fmt = (n: number) => n.toLocaleString('pt-BR');
const hora = (h: number) => {
  const t = ((h % 24) + 24) % 24;
  const H = Math.floor(t);
  return `${String(H).padStart(2, '0')}:${t - H >= 0.5 ? '30' : '00'}`;
};

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

// ---------------------------------------------------------------- Relógio hormonal: o que o corpo faz a cada hora
// Valores qualitativos (alto, subindo, baixo) a partir das descrições das fontes; o horário é o de quem dorme das 23 às 7 h.
function estadoHora(h: number) {
  const melatonina = h >= 21 || h < 9 ? (h >= 3 && h < 5 ? 'Pico' : h >= 21 ? 'Subindo' : 'Alta') : 'Baixa';
  const cortisol = h >= 6 && h < 10 ? 'Pico' : h >= 3 && h < 6 ? 'Subindo' : h >= 18 || h < 3 ? 'Baixo' : 'Caindo';
  const temperatura = h >= 3 && h < 7 ? 'Mínima' : h >= 15 && h < 21 ? 'Alta' : 'Intermediária';
  const alerta = h >= 2 && h < 6 ? 'Baixa circadiana' : h >= 15 && h < 17 ? 'Queda da tarde' : h >= 19 && h < 23 ? 'Vigília sustentada' : 'Normal';
  return { melatonina, cortisol, temperatura, alerta };
}

export function RelogioHormonal() {
  const [h, setH] = useState(4);
  const e = estadoHora(h);
  const corAlerta = e.alerta === 'Baixa circadiana' ? Cores.erro : e.alerta === 'Queda da tarde' ? Cores.dourado : Cores.acerto;
  const texto =
    e.alerta === 'Baixa circadiana'
      ? 'Melatonina no pico e temperatura no mínimo: é a hora de maior sono e de mais erros. O cortisol já começa a subir para o despertar.'
      : e.alerta === 'Queda da tarde'
        ? 'Segunda queda do dia: bom horário para um cochilo curto.'
        : e.alerta === 'Vigília sustentada'
          ? 'Nas horas antes de deitar, o relógio segura a vigília; a melatonina começa a subir cerca de 2 horas antes de dormir.'
          : h >= 6 && h < 12
            ? 'Cortisol no pico e melatonina caindo com a luz: o corpo está pronto para o dia.'
            : 'Hormônios do dia: a luz mantém a melatonina baixa.';
  return (
    <MolduraMidia tipo="Explorador" titulo="O relógio hormonal ao longo do dia" instrucao="Arraste a hora do relógio do corpo. O exemplo é de quem dorme das 23 às 7 horas.">
      <Controle min={0} max={23} passo={1} valor={h} onChange={setH} rotulo="Hora do relógio do corpo" formatar={(v) => hora(v)} />
      <View style={styles.leituras}>
        <Leitura rotulo="Melatonina" valor={e.melatonina} cor={e.melatonina === 'Baixa' ? Cores.textoSuave : Cores.dourado} />
        <Leitura rotulo="Cortisol" valor={e.cortisol} cor={e.cortisol === 'Pico' ? Cores.dourado : Cores.textoSuave} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Temperatura do corpo" valor={e.temperatura} cor={e.temperatura === 'Mínima' ? Cores.erro : Cores.textoSuave} />
        <Leitura rotulo="Alerta" valor={e.alerta} cor={corAlerta} />
      </View>
      <Marca cor={corAlerta}>{texto}</Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Direção do voo e dias de ajuste
type Direcao = 'leste' | 'oeste';

export function DirecaoJetLag() {
  const [dir, setDir] = useState<Direcao>('leste');
  const [fusos, setFusos] = useState(6);
  const ritmo = dir === 'leste' ? 1 : 1.5;
  const dias = Math.ceil(fusos / ritmo);
  const semJetLag = fusos < 2;
  const cor = semJetLag ? Cores.acerto : dir === 'leste' ? Cores.erro : Cores.dourado;
  return (
    <MolduraMidia tipo="Comparador" titulo="Leste ou oeste: quanto tempo para ajustar" instrucao="Escolha a direção e quantos fusos o voo cruza. O ajuste é uma média; cada pessoa tem o seu ritmo.">
      <Opcoes itens={[['leste', 'Para o leste'], ['oeste', 'Para o oeste']]} valor={dir} onChange={setDir} />
      <Controle min={1} max={12} passo={1} valor={fusos} onChange={setFusos} rotulo="Fusos cruzados" formatar={(v) => (v === 1 ? '1 fuso' : `${fmt(v)} fusos`)} />
      <View style={styles.leituras}>
        <Leitura rotulo="O corpo precisa" valor={semJetLag ? 'Quase nada' : dir === 'leste' ? 'Adiantar o relógio' : 'Atrasar o relógio'} cor={cor} />
        <Leitura rotulo={`Ajuste de ${fmt(ritmo)} h por dia`} valor={semJetLag ? 'Sem jet lag' : `Cerca de ${fmt(dias)} dias`} cor={cor} />
      </View>
      <Marca cor={cor}>
        {semJetLag
          ? 'O jet lag começa a contar a partir de 2 fusos.'
          : dir === 'leste'
            ? 'Para o leste é preciso dormir e acordar mais cedo, o que é mais difícil: o relógio interno tem ciclo um pouco maior que 24 horas.'
            : 'Para o oeste é preciso dormir e acordar mais tarde, o que o relógio interno faz com mais facilidade.'}
      </Marca>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Plano de jet lag
const ANTES: Record<number, string> = { 3: '3 dias antes', 2: '2 dias antes', 1: '1 dia antes' };

export function PlanoJetLag() {
  const [dir, setDir] = useState<Direcao>('leste');
  const [fusos, setFusos] = useState(5);
  const [deitar, setDeitar] = useState(23);
  const [curta, setCurta] = useState(false);
  const sinal = dir === 'leste' ? -1 : 1;
  // 1 hora por dia, por 2 a 3 dias (CDC), sem passar do número de fusos.
  const n = Math.min(3, fusos);
  const dias = Array.from({ length: n }, (_, i) => ({ antes: n - i, deitar: deitar + sinal * (i + 1) }));
  const semJetLag = fusos < 2;
  return (
    <MolduraMidia tipo="Planejador" titulo="Plano para o jet lag" instrucao="Informe a direção, os fusos, a hora em que costuma deitar e se a estadia é curta.">
      <Opcoes itens={[['leste', 'Para o leste'], ['oeste', 'Para o oeste']]} valor={dir} onChange={setDir} />
      <Controle min={1} max={12} passo={1} valor={fusos} onChange={setFusos} rotulo="Fusos cruzados" formatar={(v) => (v === 1 ? '1 fuso' : `${fmt(v)} fusos`)} />
      <Controle min={20} max={26} passo={0.5} valor={deitar} onChange={setDeitar} rotulo="Costumo deitar às" formatar={(v) => hora(v)} />
      <Opcoes itens={[['nao', 'Estadia de vários dias'], ['sim', 'Estadia de menos de 2 dias']]} valor={curta ? 'sim' : 'nao'} onChange={(v) => setCurta(v === 'sim')} />
      {semJetLag ? (
        <Marca cor={Cores.acerto}>Com menos de 2 fusos não há jet lag: cuide só do sono da noite anterior.</Marca>
      ) : curta ? (
        <Marca cor={Cores.dourado}>Estadia curta: mantenha o horário de casa para dormir, comer e se expor à luz. O relógio não teria tempo de se ajustar e voltaria a se desajustar na volta.</Marca>
      ) : (
        <>
          <Texto cor={Cores.textoSuave}>Antes de viajar, desloque o sono 1 hora por dia:</Texto>
          <View style={styles.leituras}>
            {dias.map((d) => (
              <Leitura key={d.antes} rotulo={ANTES[d.antes]} valor={`Deitar ${hora(d.deitar)}`} cor={Cores.dourado} />
            ))}
          </View>
          <Marca cor={Cores.acerto}>
            {dir === 'leste'
              ? 'No destino: luz forte pela manhã e pouca luz à noite, com óculos escuros e cortinas fechadas.'
              : 'No destino: evite luz forte de manhã cedo e aproveite a luz do fim da tarde. Fique acordado até a hora local de dormir.'}
          </Marca>
          <Marca cor={Cores.dourado}>
            {dir === 'leste'
              ? 'Melatonina (passageiro): 0,5 a 1 mg cerca de 90 minutos antes da hora de deitar do destino, por alguns dias.'
              : 'Melatonina (passageiro): atrasa o relógio quando tomada na manhã do relógio do corpo, que ainda está no fuso de casa. Nunca na hora em que ela já está alta, à noite do relógio do corpo.'}
          </Marca>
          <Texto cor={Cores.textoApagado}>A hora exata da luz e da melatonina depende do número de fusos. Em viagens com muitos fusos, use uma calculadora de jet lag ou peça orientação médica.</Texto>
        </>
      )}
      <Texto cor={Cores.textoApagado}>Tripulante: em pernoite de menos de 3 dias, fique no horário de casa. A ICAO não recomenda a melatonina para tripulantes em geral.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Medidor de fadiga
export function MedidorFadiga() {
  const [sono, setSono] = useState(6);
  const [noites, setNoites] = useState(3);
  const [acordado, setAcordado] = useState(14);
  const [madrugada, setMadrugada] = useState(false);
  const divida = Math.max(0, 8 - sono) * noites;
  const pontos = (divida >= 2 ? 1 : 0) + (divida >= 8 ? 1 : 0) + (acordado > 16 ? 1 : 0) + (acordado >= 18 ? 1 : 0) + (madrugada ? 1 : 0);
  const nivel = pontos >= 3 ? 'Alto' : pontos >= 1 ? 'Atenção' : 'Baixo';
  const cor = pontos >= 3 ? Cores.erro : pontos >= 1 ? Cores.dourado : Cores.acerto;
  const motivos: string[] = [];
  if (divida >= 2) motivos.push(`Dívida de cerca de ${fmt(divida)} h de sono.`);
  if (acordado > 16) motivos.push(acordado >= 18 ? 'Mais de 18 h acordado: queda clara do desempenho.' : 'Mais de 16 h acordado: a reação fica mais lenta.');
  if (madrugada) motivos.push('Pouso na janela de baixa circadiana, a hora de mais erros.');
  return (
    <MolduraMidia tipo="Medidor" titulo="Quanto cansaço você leva para o voo?" instrucao="Ajuste o sono das últimas noites e as horas acordado no pouso. A referência é a necessidade de 8 horas por noite usada pela FAA.">
      <Controle min={3} max={9} passo={0.5} valor={sono} onChange={setSono} rotulo="Sono por noite" formatar={(v) => `${fmt(v)} h`} />
      <Controle min={1} max={7} passo={1} valor={noites} onChange={setNoites} rotulo="Noites seguidas assim" formatar={(v) => (v === 1 ? '1 noite' : `${fmt(v)} noites`)} />
      <Controle min={2} max={24} passo={1} valor={acordado} onChange={setAcordado} rotulo="Horas acordado no pouso" formatar={(v) => `${fmt(v)} h`} />
      <Opcoes itens={[['nao', 'Pouso de dia'], ['sim', 'Pouso entre 2 e 6 h']]} valor={madrugada ? 'sim' : 'nao'} onChange={(v) => setMadrugada(v === 'sim')} />
      <View style={styles.leituras}>
        <Leitura rotulo="Dívida de sono" valor={`${fmt(divida)} h`} cor={divida >= 8 ? Cores.erro : divida >= 2 ? Cores.dourado : Cores.acerto} />
        <Leitura rotulo="Risco de fadiga" valor={nivel} cor={cor} />
      </View>
      {motivos.length ? motivos.map((m) => <Marca key={m} cor={cor}>{m}</Marca>) : <Marca cor={cor}>Sono em dia e jornada curta: risco baixo.</Marca>}
      {sono <= 5 && noites >= 4 ? <Marca cor={Cores.erro}>Quatro noites de 5 horas prejudicam tanto quanto 40 horas sem dormir.</Marca> : null}
      <Texto cor={Cores.textoApagado}>Esquema educativo, não substitui o FRMS da empresa. A pessoa cansada costuma subestimar o próprio cansaço.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Lei do Aeronauta: jornada e repouso
type Tripulacao = 'simples' | 'composta' | 'revezamento';
const TRIPULACAO: Record<Tripulacao, { nome: string; voo: number; jornada: number }> = {
  simples: { nome: 'Simples', voo: 8, jornada: 9 },
  composta: { nome: 'Composta', voo: 11, jornada: 12 },
  revezamento: { nome: 'Revezamento', voo: 14, jornada: 16 },
};

export function RepousoAeronauta() {
  const [t, setT] = useState<Tripulacao>('simples');
  const [jornada, setJornada] = useState(9);
  const [fusos, setFusos] = useState(0);
  const lim = TRIPULACAO[t];
  const base = jornada <= 12 ? 12 : jornada <= 15 ? 16 : 24;
  const extra = fusos >= 3 ? fusos * 2 : 0;
  const acima = jornada > lim.jornada;
  return (
    <MolduraMidia tipo="Calculadora" titulo="Jornada e repouso pela Lei do Aeronauta" instrucao="Escolha a tripulação, a duração da jornada e os fusos cruzados num mesmo sentido. Vale para o transporte aéreo regular.">
      <Opcoes itens={(Object.keys(TRIPULACAO) as Tripulacao[]).map((k) => [k, TRIPULACAO[k].nome] as [Tripulacao, string])} valor={t} onChange={setT} />
      <Controle min={1} max={18} passo={0.5} valor={jornada} onChange={setJornada} rotulo="Jornada" formatar={(v) => `${fmt(v)} h`} />
      <Controle min={0} max={12} passo={1} valor={fusos} onChange={setFusos} rotulo="Fusos no mesmo sentido" formatar={(v) => (v === 1 ? '1 fuso' : `${fmt(v)} fusos`)} />
      <View style={styles.leituras}>
        <Leitura rotulo="Limite da jornada" valor={`${fmt(lim.jornada)} h`} cor={acima ? Cores.erro : Cores.acerto} />
        <Leitura rotulo="Horas de voo" valor={`Até ${fmt(lim.voo)} h`} cor={Cores.textoSuave} />
      </View>
      <View style={styles.leituras}>
        <Leitura rotulo="Repouso pela jornada" valor={`${fmt(base)} h`} cor={Cores.dourado} />
        <Leitura rotulo="Acréscimo pelos fusos" valor={extra ? `+${fmt(extra)} h, na base` : 'Nenhum'} cor={extra ? Cores.dourado : Cores.textoSuave} />
      </View>
      <Marca cor={acima ? Cores.erro : Cores.acerto}>
        {acima
          ? `A jornada passa do limite da tripulação ${lim.nome.toLowerCase()}.`
          : extra
            ? `Repouso mínimo de ${fmt(base)} h depois da jornada; ao voltar à base, ${fmt(extra)} h a mais pelos ${fmt(fusos)} fusos.`
            : `Repouso mínimo de ${fmt(base)} h depois da jornada.`}
      </Marca>
      <Texto cor={Cores.textoApagado}>A autoridade pode alterar os limites para a empresa que gerencia o risco de fadiga. Repouso só protege se for usado para dormir.</Texto>
    </MolduraMidia>
  );
}

// ---------------------------------------------------------------- Cochilo e cafeína
export function CochiloCafeina() {
  const [cochilo, setCochilo] = useState(25);
  const [cafe, setCafe] = useState(16);
  const [deitar, setDeitar] = useState(23);
  const inercia = cochilo > 45;
  const corC = inercia ? Cores.erro : cochilo <= 30 ? Cores.acerto : Cores.dourado;
  const intervalo = (((deitar - cafe) % 24) + 24) % 24;
  const corCafe = intervalo < 6 ? Cores.erro : Cores.acerto;
  return (
    <MolduraMidia tipo="Simulador" titulo="Cochilo e cafeína na medida" instrucao="Ajuste a duração do cochilo, a hora do último café e a hora de deitar.">
      <Controle min={5} max={90} passo={5} valor={cochilo} onChange={setCochilo} rotulo="Cochilo" formatar={(v) => `${fmt(v)} min`} />
      <View style={styles.leituras}>
        <Leitura rotulo="Efeito do cochilo" valor={inercia ? 'Inércia do sono' : cochilo <= 30 ? 'Mais alerta' : 'Limite'} cor={corC} />
        <Leitura rotulo="Antes de tarefa de segurança" valor={inercia ? 'Espere 20 min ou mais' : 'Espere 10 a 15 min'} cor={corC} />
      </View>
      <Marca cor={corC}>
        {inercia
          ? 'Cochilos de mais de 45 minutos entram no sono profundo e deixam a pessoa lenta ao acordar.'
          : cochilo <= 30
            ? 'Cochilos de 10 a 30 minutos melhoram a atenção sem atrapalhar a noite.'
            : 'Perto de 45 minutos, o risco de acordar no sono profundo cresce.'}
      </Marca>
      <Controle min={6} max={23} passo={1} valor={cafe} onChange={setCafe} rotulo="Último café" formatar={(v) => hora(v)} />
      <Controle min={20} max={26} passo={0.5} valor={deitar} onChange={setDeitar} rotulo="Hora de deitar" formatar={(v) => hora(v)} />
      <View style={styles.leituras}>
        <Leitura rotulo="Café antes de deitar" valor={`${fmt(intervalo)} h`} cor={corCafe} />
      </View>
      <Marca cor={corCafe}>
        {intervalo < 6
          ? 'A cafeína age por cerca de 5 horas: pare pelo menos 6 horas antes de deitar.'
          : 'Intervalo suficiente. A cafeína começa a agir em 15 a 30 minutos; use-a quando precisar, não por hábito.'}
      </Marca>
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  leituras: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.md },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: Espaco.sm },
});
