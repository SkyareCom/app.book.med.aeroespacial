import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState, type RefObject } from 'react';
import { Pressable, StyleSheet, TextInput, View, type ScrollViewInstance } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { AnaliseIA } from '@/components/cma-ia';
import { Barra, CartaoImagem, Painel } from '@/components/cartoes';
import { AnelValidade, Audiograma, EscalaGlicemia, GraficoAcuidade, GraficoPA, GraficoValidade, SERIES_VALIDADE } from '@/components/cma-graficos';
import { RelacionadosEspecial } from '@/components/especiais';
import { Selo } from '@/components/selo';
import { rotaEpisodio } from '@/components/streaming';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { ArteExameCMA, CapaEpisodio } from '@/constants/capas';
import { BordaCapa, Cores, Espaco, Fonte, Raio, Tamanho } from '@/constants/theme';
import { questoesCMA } from '@/data/cma-questoes';
import { avaliar, CLASSES, EXAMES, INFLUENCIA, NOTA_CLASSE, refClasse, NOME_VEREDITO, SISTEMAS, validadeMeses, visivel, type Achado, type Campo, type ClasseCMA, type Resultado, type Valores, type Veredito } from '@/lib/cma';
import { avaliarFAA, avaliarICAO, REGRAS_INT, type ResultadoInt } from '@/lib/cma-internacional';
import { idQuestao } from '@/lib/xp';
import { useTr } from '@/state/idioma';
import { useProgresso } from '@/state/progresso';

// Exame CMA: página de apoio à decisão do médico examinador.
// Três abas: Avaliação (formulário por sistema, uma condição por pergunta, a resposta do RBAC 67 sob cada campo,
// gráficos ao vivo, veredito, validade e justificativa),
// Guia (classes, validade, onde fazer, o que levar, como se preparar) e Simulado (questões do ranking).
// Regras e fontes em src/lib/cma.ts; gráficos em src/components/cma-graficos.tsx.

type Aba = 'avaliacao' | 'guia' | 'simulado';

const IMG = {
  hero: ArteExameCMA,
  guia: require('@/assets/images/capas/cli-01.jpg'),
  levar: require('@/assets/images/capas/cli-06.jpg'),
  simulado: require('@/assets/images/capas/cli-12.jpg'),
};

const IMG_CLASSE: Record<ClasseCMA, number> = {
  '1': require('@/assets/images/capas/cli-12.jpg'),
  '2': require('@/assets/images/capas/ope-09.jpg'),
  '4': require('@/assets/images/capas/fis-08.jpg'),
  '5': require('@/assets/images/capas/ope-16.jpg'),
};

// Cada sistema do formulário usa a capa do voo da Missão Sistemas (ou Aviação) que trata dele, e leva a esse voo.
// Sinais vitais não têm voo próprio: usam a arte do monitor cardíaco (cli-02).
const VOO_SISTEMA: Record<string, [string, number]> = {
  medicamentos: ['aviacao', 2],
  metabolico: ['sistemas', 9],
  cardio: ['sistemas', 2],
  pneumo: ['sistemas', 1],
  digestivo: ['sistemas', 10],
  renal: ['sistemas', 14],
  hemato: ['sistemas', 11],
  neuro: ['sistemas', 6],
  mental: ['sistemas', 7],
  obst: ['sistemas', 13],
  osteo: ['sistemas', 12],
  visao: ['sistemas', 4],
  audicao: ['sistemas', 3],
  orl: ['sistemas', 3],
  odonto: ['sistemas', 3],
};
const IMG_SISTEMA: Record<string, number> = {
  vitais: require('@/assets/images/capas/cli-02.jpg'),
  ...Object.fromEntries(Object.entries(VOO_SISTEMA).map(([id, [sec, n]]) => [id, CapaEpisodio[`${sec}-${n}`]])),
};

// Cada achado aponta as perguntas que o geraram; o sistema é o da primeira delas.
const SISTEMA_DO_CAMPO: Record<string, string> = Object.fromEntries(SISTEMAS.flatMap((s) => s.campos.map((c) => [c.id, s.id])));
function idSistema(a: Achado) {
  return SISTEMA_DO_CAMPO[a.campos[0]];
}

const CURTO: Record<string, string> = {
  medicamentos: 'Remédios',
  vitais: 'Vitais', metabolico: 'Metabólico', cardio: 'Cardio', pneumo: 'Pulmão', digestivo: 'Digestivo', renal: 'Rins', hemato: 'Sangue',
  neuro: 'Neuro', mental: 'Mental', obst: 'Gestação', osteo: 'Ossos', visao: 'Visão', audicao: 'Audição', orl: 'ORL', odonto: 'Dentes',
};

const ORDEM: Achado['nivel'][] = ['inapto', 'restricao', 'confirmar', 'julgamento', 'ok'];

function pior(achados: Achado[]): Achado['nivel'] | undefined {
  return achados.map((a) => a.nivel).sort((a, b) => ORDEM.indexOf(a) - ORDEM.indexOf(b))[0];
}

const COR_VEREDITO: Record<Veredito, string> = {
  apto: Cores.acerto,
  restricao: Cores.dourado,
  inapto: Cores.erro,
  incompleto: Cores.textoApagado,
  confirmar: Cores.destaque,
};

const COR_NIVEL: Record<Achado['nivel'], string> = {
  inapto: Cores.erro,
  restricao: Cores.dourado,
  julgamento: Cores.destaque,
  confirmar: Cores.destaque,
  ok: Cores.acerto,
};

const NOME_NIVEL: Record<Achado['nivel'], string> = {
  inapto: 'Não apto',
  restricao: 'Restrição',
  julgamento: 'Julgamento',
  confirmar: 'Confirmar',
  ok: 'Dentro do limite',
};

const n = (v: Valores, id: string) => {
  const s = v[id];
  if (typeof s !== 'string' || !s.trim()) return undefined;
  const x = Number(s.replace(',', '.'));
  return Number.isFinite(x) ? x : undefined;
};

export default function ExameCMA() {
  const [aba, setAba] = useState<Aba>('avaliacao');
  const router = useRouter();
  const rolagem = useRef<ScrollViewInstance | null>(null);
  return (
    <Tela titulo="Exame CMA" rotulo="Complemento · Missão 3 · Voo 1" refRolagem={rolagem}>
      <CartaoImagem imagem={IMG.hero} altura={190} style={BordaCapa}>
        <Selo texto="Ferramenta do examinador" cor={Cores.dourado} />
        <Texto t="titulo">Da anamnese ao veredito</Texto>
        <Texto cor={Cores.textoSuave}>Formulário por sistema, uma condição por pergunta, com a regra do RBAC 67 sob cada resposta, o que muda na FAA e na ICAO, os remédios em uso e o que eles mudam nos exames, e os vereditos no final.</Texto>
      </CartaoImagem>

      <Pressable accessibilityRole="link" onPress={() => router.push({ pathname: '/capitulo/[secao]/[numero]', params: { secao: 'aviacao', numero: '1' } })} style={styles.voo}>
        <View style={{ flex: 1, gap: 2 }}>
          <Texto t="rotulo" cor={Cores.destaque}>Missão 3 · Voo 1</Texto>
          <Texto t="item">Certificação e risco aeromédico</Texto>
        </View>
        <Texto t="rotulo" cor={Cores.dourado}>Ir ao voo</Texto>
      </Pressable>

      <View style={styles.abas}>
        {(
          [
            ['avaliacao', 'Avaliação'],
            ['guia', 'Guia'],
            ['simulado', 'Simulado'],
          ] as [Aba, string][]
        ).map(([id, nome]) => (
          <Pressable key={id} accessibilityRole="tab" accessibilityState={{ selected: aba === id }} onPress={() => setAba(id)} style={[styles.aba, aba === id && styles.abaAtiva]}>
            <Texto t="item" cor={aba === id ? Cores.fundo : Cores.texto}>{nome}</Texto>
          </Pressable>
        ))}
      </View>
      {aba === 'avaliacao' ? <Avaliacao rolagem={rolagem} /> : aba === 'guia' ? <Guia /> : <Simulado />}
      <Painel>
        <Texto t="rotulo" cor={Cores.textoApagado}>Aviso</Texto>
        <Texto cor={Cores.textoApagado}>
          Ferramenta de apoio à decisão. Não substitui o exame clínico nem o julgamento do médico ou da clínica credenciada, e a palavra final é da ANAC. Limiares sem fonte consultada aparecem como [confirmar na referência].
        </Texto>
      </Painel>
      <RelacionadosEspecial id="exame-cma" />
    </Tela>
  );
}

// ---------- Avaliação: formulário por sistema ----------

const respondido = (v: Valores, id: string) => v[id] !== undefined && v[id] !== '';

function Avaliacao({ rolagem }: { rolagem: RefObject<ScrollViewInstance | null> }) {
  const router = useRouter();
  const [classe, setClasse] = useState<ClasseCMA>('1');
  const [funcao, setFuncao] = useState('pla-multi');
  const [idade, setIdade] = useState('');
  const [publico, setPublico] = useState(true);
  const [inicial, setInicial] = useState(false);
  const [valores, setValores] = useState<Valores>({});
  const [abertos, setAbertos] = useState<Record<string, boolean>>({ medicamentos: true, vitais: true });
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const rolar = useRef(false);

  const c = CLASSES.find((x) => x.id === classe)!;
  const idadeN = idade.trim() && Number.isFinite(Number(idade)) ? Number(idade) : undefined;
  const previa = idadeN !== undefined ? validadeMeses(funcao, idadeN, publico) : undefined;
  const serie = SERIES_VALIDADE.find((s) => s.funcao === funcao) ?? { funcao, publico, nome: '', cor: Cores.destaque };

  // Análise ao vivo: alimenta a resposta de cada pergunta e o status de cada sistema.
  const aoVivo = useMemo(() => avaliar(classe, funcao, idadeN, publico, valores, { inicial, classe, funcao }), [classe, funcao, idadeN, publico, valores, inicial]);
  // As perguntas de detalhe só aparecem quando a resposta anterior pede.
  const visiveis = useMemo(() => SISTEMAS.map((s) => ({ s, campos: s.campos.filter((f) => visivel(f, valores, { inicial, classe, funcao })) })), [valores, inicial, classe, funcao]);
  const total = visiveis.reduce((k, x) => k + x.campos.length, 0);
  // Cada achado aparece uma vez, sob a última pergunta visível que o gerou.
  const porCampo = useMemo(() => {
    const vis = new Set(visiveis.flatMap((x) => x.campos.map((f) => f.id)));
    const m: Record<string, Achado[]> = {};
    for (const a of aoVivo.achados) {
      const alvo = [...a.campos].reverse().find((id) => vis.has(id) && respondido(valores, id)) ?? a.campos[0];
      (m[alvo] ??= []).push(a);
    }
    return m;
  }, [aoVivo, visiveis, valores]);
  const preenchidos = visiveis.reduce((k, x) => k + x.campos.filter((f) => respondido(valores, f.id)).length, 0);

  function trocarClasse(id: ClasseCMA) {
    setClasse(id);
    setFuncao(CLASSES.find((x) => x.id === id)!.funcoes[0].id);
    setResultado(null);
  }
  function definir(id: string, v: string | boolean | undefined) {
    setValores((atual) => ({ ...atual, [id]: v }));
    setResultado(null);
  }
  // Valores lidos pela IA e aprovados pelo examinador: entram no formulário e abrem as gavetas correspondentes.
  function aplicarIA(v: Valores) {
    setValores((atual) => ({ ...atual, ...v }));
    const ids = new Set(Object.keys(v));
    setAbertos((a) => ({ ...a, ...Object.fromEntries(SISTEMAS.filter((s) => s.campos.some((c) => ids.has(c.id))).map((s) => [s.id, true])) }));
    setResultado(null);
  }
  function analisar() {
    setResultado(aoVivo);
    rolar.current = true;
  }
  function limpar() {
    setValores({});
    setIdade('');
    setResultado(null);
  }

  const od = ['500', '1000', '2000', '3000'].map((f) => n(valores, `od${f}`));
  const oe = ['500', '1000', '2000', '3000'].map((f) => n(valores, `oe${f}`));

  return (
    <>
      <Painel>
        <View style={styles.entre}>
          <Texto t="rotulo" cor={Cores.destaque}>Formulário</Texto>
          <Texto t="rotulo" cor={Cores.textoApagado}>{preenchidos} de {total} perguntas</Texto>
        </View>
        <Barra valor={total ? preenchidos / total : 0} />
        <View style={styles.entre}>
          <Texto cor={Cores.textoSuave}>Prévia ao vivo</Texto>
          <View style={[styles.pilula, { borderColor: COR_VEREDITO[aoVivo.veredito] }]}>
            <View style={[styles.ponto, { backgroundColor: COR_VEREDITO[aoVivo.veredito], marginTop: 0 }]} />
            <Texto t="rotulo" cor={COR_VEREDITO[aoVivo.veredito]}>{NOME_VEREDITO[aoVivo.veredito]}</Texto>
          </View>
        </View>
      </Painel>

      <Etapa numero="1" titulo="Classe do CMA" />
      <View style={styles.grade}>
        {CLASSES.map((x) => (
          <CartaoImagem
            key={x.id}
            imagem={IMG_CLASSE[x.id]}
            altura={96}
            onPress={() => trocarClasse(x.id)}
            rotuloAcessivel={`Selecionar ${x.nome}`}
            style={{ ...styles.celula, ...BordaCapa, ...(classe === x.id ? styles.celulaAtiva : null) }}>
            <Texto t="item" cor={classe === x.id ? Cores.destaque : Cores.texto}>{x.nome}</Texto>
            <Texto t="rotulo" cor={Cores.textoSuave} numberOfLines={1}>{x.funcoes.map((f) => f.nome.split(',')[0]).join(' · ')}</Texto>
          </CartaoImagem>
        ))}
      </View>
      <Painel>
        <Texto cor={Cores.textoSuave}>{c.quem}</Texto>
        {NOTA_CLASSE[classe] ? <Texto cor={Cores.destaque}>{NOTA_CLASSE[classe]}</Texto> : null}
        <Texto cor={Cores.textoApagado}>A 3ª classe (controle de tráfego aéreo) não é regida pela ANAC.</Texto>
      </Painel>

      <Etapa numero="2" titulo="Candidato" />
      <Painel>
        <Texto t="item">Função</Texto>
        <View style={styles.chips}>
          {c.funcoes.map((f) => (
            <Chip key={f.id} rotulo={f.nome} ativo={funcao === f.id} onPress={() => { setFuncao(f.id); setResultado(null); }} />
          ))}
        </View>
        {funcao === 'pla-multi' ? <LinhaSN rotulo="Atua em transporte aéreo público?" valor={publico} onChange={(v) => setPublico(v ?? false)} /> : null}
        <Entrada rotulo="Idade" placeholder="ex.: 42" unidade="anos" valor={idade} onChange={(t) => { setIdade(t); setResultado(null); }} />
        <Texto t="item">Tipo de exame</Texto>
        <View style={styles.chips}>
          <Chip rotulo="Revalidação" ativo={!inicial} onPress={() => { setInicial(false); setResultado(null); }} />
          <Chip rotulo="Inicial" ativo={inicial} onPress={() => { setInicial(true); setResultado(null); }} />
        </View>
        <GraficoValidade
          series={[{ ...serie, publico }]}
          idade={idadeN}
          titulo={previa ? `Validade prevista: ${previa.meses} meses` : 'Validade por idade'}
          instrucao={previa ? previa.regra : 'Informe a idade para marcar o candidato na curva.'}
        />
      </Painel>

      <Etapa numero="3" titulo="Exames exigidos" />
      <Painel>
        {EXAMES[classe].map((e) => (
          <View key={e.exame} style={styles.marca}>
            <Texto t="item">{e.exame}</Texto>
            <Texto cor={Cores.textoSuave}>{e.quando}</Texto>
          </View>
        ))}
        {inicial ? <Texto cor={Cores.textoApagado}>Exame inicial: confira os itens marcados como "no inicial".</Texto> : null}
      </Painel>

      <Etapa numero="4" titulo="Exames por IA" />
      <AnaliseIA aplicar={aplicarIA} />

      <Etapa numero="5" titulo="Perguntas por sistema" />
      <Texto cor={Cores.textoSuave}>Cada pergunta trata de uma só condição. Algumas só aparecem quando a resposta anterior pede detalhe.</Texto>
      {visiveis.map(({ s, campos }) => {
        if (!campos.length) return null;
        const aberto = !!abertos[s.id];
        const feitos = campos.filter((f) => respondido(valores, f.id)).length;
        const status = pior(aoVivo.achados.filter((a) => idSistema(a) === s.id));
        const cor = status ? COR_NIVEL[status] : Cores.linha;
        return (
          <Painel key={s.id} style={{ borderColor: status && status !== 'ok' ? cor : Cores.linha }}>
            <Pressable accessibilityRole="button" accessibilityState={{ expanded: aberto }} onPress={() => setAbertos((a) => ({ ...a, [s.id]: !aberto }))} style={styles.cabSistema}>
              <Image source={IMG_SISTEMA[s.id]} style={[styles.miniatura, BordaCapa]} contentFit="cover" />
              <View style={{ flex: 1, gap: 4 }}>
                <Texto t="item">{s.nome}</Texto>
                <Texto t="rotulo" cor={Cores.textoApagado}>RBAC {refClasse(s.ref, classe)} · {feitos}/{campos.length}</Texto>
                <Barra valor={feitos / campos.length} altura={2} />
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                {status ? <Texto t="rodape" cor={cor}>{NOME_NIVEL[status]}</Texto> : <Texto t="rodape" cor={Cores.textoApagado}>Vazio</Texto>}
                <Texto t="rotulo" cor={Cores.destaque}>{aberto ? 'Fechar' : 'Abrir'}</Texto>
              </View>
            </Pressable>
            {aberto ? (
              <View style={{ gap: Espaco.sm }}>
                {VOO_SISTEMA[s.id] ? (
                  <Pressable accessibilityRole="link" onPress={() => router.push(rotaEpisodio(VOO_SISTEMA[s.id][0], VOO_SISTEMA[s.id][1]))} style={styles.vooSistema}>
                    <Texto t="rotulo" cor={Cores.textoApagado}>{`Missão ${VOO_SISTEMA[s.id][0] === 'aviacao' ? 3 : 2} · Voo ${VOO_SISTEMA[s.id][1]}`}</Texto>
                    <Texto t="rotulo" cor={Cores.dourado}>Ir ao voo</Texto>
                  </Pressable>
                ) : null}
                {s.id === 'vitais' ? <GraficoPA pas={n(valores, 'pas')} pad={n(valores, 'pad')} /> : null}
                {s.id === 'metabolico' ? <EscalaGlicemia gli={n(valores, 'glicemia')} /> : null}
                {s.id === 'visao' ? <GraficoAcuidade od={n(valores, 'avOD')} oe={n(valores, 'avOE')} bin={n(valores, 'avBin')} /> : null}
                {s.id === 'audicao' ? <Audiograma od={od} oe={oe} /> : null}
                {campos.map((f) => (
                  <CampoForm key={f.id} campo={f} valores={valores} definir={definir} achados={porCampo[f.id] ?? []} />
                ))}
                {s.id === 'vitais' && n(valores, 'peso') && n(valores, 'altura') ? (
                  <Texto cor={Cores.dourado}>IMC {(n(valores, 'peso')! / (n(valores, 'altura')! / 100) ** 2).toFixed(1).replace('.', ',')} kg/m² · limite: menor que 40</Texto>
                ) : null}
              </View>
            ) : null}
          </Painel>
        );
      })}

      <View style={{ gap: Espaco.sm }}>
        <BotaoPrincipal rotulo="Gerar veredito" onPress={analisar} />
        <BotaoPrincipal rotulo="Limpar formulário" secundario onPress={limpar} />
      </View>

      <View
        onLayout={(e) => {
          // Depois de gerar o veredito, a tela desce até o resultado.
          if (!rolar.current) return;
          rolar.current = false;
          rolagem.current?.scrollTo({ y: e.nativeEvent.layout.y + 200, animated: true });
        }}>
        {resultado ? <PainelResultado r={resultado} classe={c.nome} valores={valores} internacional={[avaliarFAA(funcao, idadeN, valores, resultado), avaliarICAO(funcao, idadeN, publico, valores, resultado)]} mesesAnac={previa?.meses} /> : null}
      </View>
    </>
  );
}

// Uma pergunta do formulário: a pergunta, a resposta e, logo abaixo, o que o RBAC 67 diz sobre ela.
function CampoForm({ campo, valores, definir, achados }: { campo: Campo; valores: Valores; definir: (id: string, v: string | boolean | undefined) => void; achados: Achado[] }) {
  const x = campo.tipo === 'num' ? n(valores, campo.id) : undefined;
  const foraDaFaixa = campo.tipo === 'num' && campo.faixa && x !== undefined && (x < campo.faixa[0] || x > campo.faixa[1]);
  return (
    <View style={styles.campo}>
      {campo.tipo === 'num' ? (
        <Entrada rotulo={campo.rotulo} placeholder={campo.placeholder} unidade={campo.unidade} valor={(valores[campo.id] as string) ?? ''} onChange={(t) => definir(campo.id, t)} />
      ) : campo.tipo === 'opcao' ? (
        <View style={styles.linhaCampo}>
          <Texto style={{ flex: 1 }}>{campo.rotulo}</Texto>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {campo.opcoes.map((o) => (
              <Chip key={o.id} rotulo={o.nome} ativo={valores[campo.id] === o.id} onPress={() => definir(campo.id, valores[campo.id] === o.id ? undefined : o.id)} />
            ))}
          </View>
        </View>
      ) : (
        <LinhaSN rotulo={campo.rotulo} valor={valores[campo.id] as boolean | undefined} onChange={(v) => definir(campo.id, v)} />
      )}
      {campo.ajuda ? <Texto cor={Cores.textoApagado}>{campo.ajuda}</Texto> : null}
      {foraDaFaixa ? <Texto cor={Cores.dourado}>Valor fora do esperado ({campo.faixa![0]} a {campo.faixa![1]}). Confira a medida.</Texto> : null}
      {INFLUENCIA[campo.id] ? <Texto t="rodape" cor={Cores.textoApagado} maiusculo={false} espacado={false}>Nos exames ({INFLUENCIA[campo.id].exames}): {INFLUENCIA[campo.id].texto}</Texto> : null}
      {REGRAS_INT[campo.id]?.faa ? <Texto t="rodape" cor={Cores.textoApagado} maiusculo={false} espacado={false}>FAA: {REGRAS_INT[campo.id].faa}</Texto> : null}
      {REGRAS_INT[campo.id]?.icao ? <Texto t="rodape" cor={Cores.textoApagado} maiusculo={false} espacado={false}>ICAO: {REGRAS_INT[campo.id].icao}</Texto> : null}
      {achados.map((a, k) => (
        <View key={k} style={styles.respostaLinha}>
          <View style={[styles.ponto, { backgroundColor: COR_NIVEL[a.nivel] }]} />
          <Texto cor={COR_NIVEL[a.nivel]} style={{ flex: 1 }}>{NOME_NIVEL[a.nivel]}: {a.texto} (RBAC {a.ref})</Texto>
        </View>
      ))}
    </View>
  );
}

function Etapa({ numero, titulo }: { numero: string; titulo: string }) {
  return (
    <View style={styles.etapa}>
      <View style={styles.numero}>
        <Texto t="item" cor={Cores.fundo}>{numero}</Texto>
      </View>
      <Texto t="item" style={{ flex: 1 }}>{titulo}</Texto>
    </View>
  );
}

function PainelResultado({ r, classe, valores, internacional, mesesAnac }: { r: Resultado; classe: string; valores: Valores; internacional: ResultadoInt[]; mesesAnac?: number }) {
  const cor = COR_VEREDITO[r.veredito];
  const achados = [...r.achados].sort((a, b) => ORDEM.indexOf(a.nivel) - ORDEM.indexOf(b.nivel));
  return (
    <View style={{ gap: Espaco.md }}>
      <Etapa numero="6" titulo="Veredito" />
      <Painel style={{ borderColor: cor, borderWidth: 1.5 }}>
        <View style={styles.veredito}>
          <AnelValidade meses={r.validade?.meses} cor={cor} rotulo={r.validade ? 'MESES' : 'SEM VALIDADE'} />
          <View style={{ flex: 1, gap: 4 }}>
            <Texto t="rotulo" cor={Cores.textoApagado}>{classe}</Texto>
            <Texto t="titulo" cor={cor}>{NOME_VEREDITO[r.veredito]}</Texto>
            {r.validade ? (
              <Texto t="item" cor={Cores.dourado}>Válido até {r.validade.data}</Texto>
            ) : r.veredito === 'inapto' ? (
              <Texto cor={Cores.textoSuave}>CMA não emitido. Cabe recurso à ANAC (RBAC 67.71(g)).</Texto>
            ) : null}
          </View>
        </View>
        {r.validade ? <Texto cor={Cores.textoSuave}>{r.validade.regra}</Texto> : null}
        {r.restricoes.length ? (
          <View style={styles.marca}>
            <Texto t="rotulo" cor={Cores.dourado}>Restrições</Texto>
            {r.restricoes.map((x) => (
              <Texto key={x}>{x}</Texto>
            ))}
          </View>
        ) : null}
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Mapa dos sistemas</Texto>
        <View style={styles.mapa}>
          {SISTEMAS.map((s) => {
            const achou = pior(r.achados.filter((a) => idSistema(a) === s.id));
            // Sem achados, mas com campos respondidos: nada a registrar nesse sistema.
            const respondido = s.campos.some((f) => valores[f.id] !== undefined && valores[f.id] !== '');
            const st = achou ?? (respondido ? 'ok' : undefined);
            const c = st ? COR_NIVEL[st] : Cores.textoApagado;
            return (
              <View key={s.id} style={[styles.tile, { borderColor: st ? c : Cores.linha }]}>
                <Image source={IMG_SISTEMA[s.id]} style={StyleSheet.absoluteFill} contentFit="cover" />
                <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(3,5,10,0.62)' }]} />
                <View style={[styles.ponto, { backgroundColor: c, marginTop: 0 }]} />
                <Texto t="rotulo" cor={Cores.texto} numberOfLines={1}>{CURTO[s.id]}</Texto>
                <Texto t="rodape" cor={c}>{achou ? NOME_NIVEL[achou] : respondido ? 'Sem alterações' : 'Sem dados'}</Texto>
              </View>
            );
          })}
        </View>
      </Painel>

      {achados.length ? (
        <Painel>
          <Texto t="rotulo" cor={Cores.destaque}>Análise dos parâmetros</Texto>
          {achados.map((a, i) => (
            <View key={i} style={styles.achado}>
              <View style={[styles.ponto, { backgroundColor: COR_NIVEL[a.nivel] }]} />
              <View style={{ flex: 1, gap: 2 }}>
                <Texto t="rotulo" cor={COR_NIVEL[a.nivel]}>{a.sistema} · {NOME_NIVEL[a.nivel]} · RBAC {a.ref}</Texto>
                <Texto cor={Cores.textoSuave}>{a.texto}</Texto>
              </View>
            </View>
          ))}
        </Painel>
      ) : null}

      <RemediosExames valores={valores} />

      <Comparacao anac={r} classe={classe} internacional={internacional} mesesAnac={mesesAnac} />

      {r.pendentes.length ? (
        <Painel>
          <Texto t="rotulo" cor={Cores.textoApagado}>Falta preencher</Texto>
          <Texto cor={Cores.textoSuave}>{r.pendentes.join(' · ')}</Texto>
        </Painel>
      ) : null}

      <Painel style={{ borderLeftWidth: 3, borderLeftColor: cor }}>
        <Texto t="rotulo" cor={Cores.destaque}>Justificativa da decisão</Texto>
        {r.comentario.split('\n\n').map((p, i) => (
          <Texto key={i}>{p}</Texto>
        ))}
      </Painel>
    </View>
  );
}

// Remédios em uso e o que cada um muda na leitura dos exames.
function RemediosExames({ valores }: { valores: Valores }) {
  const itens = Object.entries(INFLUENCIA).filter(([id]) => valores[id] === true);
  if (!itens.length) return null;
  const controlada = valores.medControlada;
  return (
    <Painel>
      <Texto t="rotulo" cor={Cores.destaque}>Remédios e exames</Texto>
      <Texto cor={Cores.textoSuave}>Exame feito em uso de remédio mostra a doença tratada, não ausente. O julgamento considera a doença, o tratamento e o prognóstico.</Texto>
      {controlada === false ? <Texto cor={Cores.dourado}>A doença tratada não está controlada com o remédio atual.</Texto> : null}
      {itens.map(([id, x]) => (
        <View key={id} style={[styles.marca, { gap: 2 }]}>
          <Texto t="item">{x.nome}</Texto>
          <Texto t="rotulo" cor={Cores.textoApagado}>{x.exames}</Texto>
          <Texto cor={Cores.textoSuave}>{x.texto}</Texto>
        </View>
      ))}
    </Painel>
  );
}

// ANAC, FAA e ICAO lado a lado: classe equivalente, veredito, validade e o que muda em cada norma.
function Comparacao({ anac, classe, internacional, mesesAnac }: { anac: Resultado; classe: string; internacional: ResultadoInt[]; mesesAnac?: number }) {
  const linhas = [
    { nome: 'ANAC', norma: 'RBAC 67', classe, veredito: anac.veredito, validade: anac.validade ? `${anac.validade.meses} meses` : mesesAnac ? `${mesesAnac} meses, se apto` : '—', notas: [] as string[], achados: [] as Achado[], aplica: true },
    ...internacional.map((x) => ({
      nome: x.autoridade === 'faa' ? 'FAA' : 'ICAO',
      norma: x.norma,
      classe: x.eq.classe,
      veredito: x.veredito,
      validade: x.eq.aplica && x.eq.validade && (x.veredito === 'apto' || x.veredito === 'restricao') ? `${x.eq.validade.meses} meses` : x.eq.validade ? `${x.eq.validade.meses} meses, se apto` : '—',
      notas: [x.eq.aplica ? x.eq.validade?.regra : undefined, x.eq.nota].filter((t): t is string => !!t),
      achados: x.achados,
      aplica: x.eq.aplica,
    })),
  ];
  return (
    <Painel>
      <Texto t="rotulo" cor={Cores.destaque}>ANAC, FAA e ICAO</Texto>
      <Texto cor={Cores.textoSuave}>As mesmas respostas, julgadas pelas três normas. O CMA brasileiro segue a ANAC; FAA e ICAO servem para comparar e para quem voa fora do Brasil.</Texto>
      {linhas.map((l) => {
        const cor = l.aplica ? COR_VEREDITO[l.veredito] : Cores.textoApagado;
        return (
          <View key={l.nome} style={[styles.marca, { borderLeftColor: cor, gap: 4 }]}>
            <View style={styles.entre}>
              <Texto t="item">{l.nome} · {l.norma}</Texto>
              <Texto t="rotulo" cor={cor}>{l.aplica ? NOME_VEREDITO[l.veredito] : 'Não se aplica'}</Texto>
            </View>
            <Texto cor={Cores.textoSuave}>{l.classe} · {l.validade}</Texto>
            {l.notas.map((t) => (
              <Texto key={t} t="rodape" cor={Cores.textoApagado} maiusculo={false} espacado={false}>{t}</Texto>
            ))}
            {l.achados.map((a, i) => (
              <View key={i} style={styles.respostaLinha}>
                <View style={[styles.ponto, { backgroundColor: COR_NIVEL[a.nivel] }]} />
                <Texto cor={COR_NIVEL[a.nivel]} style={{ flex: 1 }}>{NOME_NIVEL[a.nivel]}: {a.texto} ({a.ref})</Texto>
              </View>
            ))}
          </View>
        );
      })}
    </Painel>
  );
}

// ---------- Guia ----------

function Guia() {
  return (
    <>
      <CartaoImagem imagem={IMG.guia} altura={170} style={BordaCapa}>
        <Selo texto="Guia do candidato" cor={Cores.dourado} />
        <Texto t="titulo">Antes de marcar o exame</Texto>
        <Texto cor={Cores.textoSuave}>Qual classe, quanto tempo vale, onde fazer e o que levar.</Texto>
      </CartaoImagem>

      <Etapa numero="1" titulo="Classes" />
      <View style={styles.grade}>
        {CLASSES.map((c) => (
          <CartaoImagem key={c.id} imagem={IMG_CLASSE[c.id]} altura={176} style={{ ...styles.celula, ...BordaCapa }}>
            <Texto t="item" cor={Cores.destaque}>{c.nome}</Texto>
            <Texto cor={Cores.textoSuave}>{c.quem}</Texto>
          </CartaoImagem>
        ))}
      </View>
      <Texto cor={Cores.textoApagado}>3ª classe: controlador de tráfego aéreo, fora da regulação da ANAC.</Texto>

      <Etapa numero="2" titulo="Validade" />
      <GraficoValidade series={SERIES_VALIDADE} titulo="Quanto tempo o CMA vale, por idade" instrucao="Cada linha é uma função. Os degraus mostram onde a idade encurta a validade." />
      <Painel>
        {[
          ['1ª classe (PLA, PC, PTM)', '12 meses. 6 meses no transporte público a partir dos 60 anos, e a partir dos 40 para piloto único com passageiros.'],
          ['PP, PP-IFR, balão, aluno, CPA, PPL', '60 meses até 39 anos · 24 meses de 40 a 49 · 12 meses a partir dos 50.'],
          ['Comissário', '60 meses até 59 anos · 24 meses a partir dos 60.'],
          ['Mecânico de voo', '12 meses.'],
          ['Piloto remoto (RPA)', '48 meses.'],
        ].map(([q, v]) => (
          <View key={q} style={styles.linhaTabela}>
            <Texto t="item" style={{ flex: 1 }}>{q}</Texto>
            <Texto cor={Cores.textoSuave} style={{ flex: 1.4 }}>{v}</Texto>
          </View>
        ))}
        <Texto cor={Cores.textoApagado}>O examinador ou a ANAC podem reduzir a validade por razão clínica.</Texto>
      </Painel>

      <Etapa numero="3" titulo="Onde fazer" />
      <View style={styles.grade}>
        {[
          ['CLC', 'Clínica credenciada', 'Todas as classes'],
          ['MC', 'Médico credenciado', '2ª, 4ª e 5ª classes'],
          ['MCad', 'Médico cadastrado', '4ª classe'],
          ['Convênio', 'Entidade conveniada', 'Conforme o convênio com a ANAC'],
        ].map(([sigla, nome, classes]) => (
          <Painel key={sigla} style={styles.celula}>
            <Texto t="titulo" cor={Cores.dourado}>{sigla}</Texto>
            <Texto t="item">{nome}</Texto>
            <Texto cor={Cores.textoSuave}>{classes}</Texto>
          </Painel>
        ))}
      </View>

      <Etapa numero="4" titulo="O que levar" />
      <CartaoImagem imagem={IMG.levar} altura={240} style={BordaCapa}>
        {['Documento de identidade com foto.', 'Exames anteriores e relatórios médicos.', 'Óculos ou lentes em uso, e um par reserva.', 'Lista de condições de saúde e medicamentos em uso.'].map((x) => (
          <View key={x} style={styles.marca}>
            <Texto>{x}</Texto>
          </View>
        ))}
      </CartaoImagem>

      <Etapa numero="5" titulo="Como se preparar" />
      <Painel>
        <Texto cor={Cores.textoSuave}>
          Faça a coleta de glicemia em jejum. Leve a correção óptica que usa em voo, porque a acuidade é medida com ela. Declare tudo: omitir condição ou medicamento compromete o certificado. Se houver infarto, revascularização, diabetes em tratamento ou cirurgia refrativa, leve os exames e relatórios que mostram o tempo e o controle exigidos.
        </Texto>
      </Painel>

      <Etapa numero="6" titulo="Resultado" />
      <View style={styles.resultados}>
        {(['apto', 'restricao', 'inapto'] as Veredito[]).map((v) => (
          <View key={v} style={[styles.resultadoItem, { borderColor: COR_VEREDITO[v] }]}>
            <View style={[styles.ponto, { backgroundColor: COR_VEREDITO[v], marginTop: 0 }]} />
            <Texto t="rotulo" cor={COR_VEREDITO[v]} style={{ textAlign: 'center' }}>{NOME_VEREDITO[v]}</Texto>
          </View>
        ))}
      </View>
      <Texto cor={Cores.textoSuave}>Quem é julgado não apto recebe a justificativa e pode recorrer à ANAC.</Texto>
    </>
  );
}

// ---------- Simulado ----------

function Simulado() {
  const router = useRouter();
  const { respostas, rankingAtivo } = useProgresso();
  const feitas = useMemo(() => questoesCMA.filter((q) => respostas[idQuestao(q)]), [respostas]);
  const certas = feitas.filter((q) => respostas[idQuestao(q)]?.certa).length;
  return (
    <>
      <CartaoImagem imagem={IMG.simulado} altura={200} style={BordaCapa}>
        <Selo texto={`${questoesCMA.length} questões · vale XP`} cor={Cores.dourado} />
        <Texto t="titulo">Simulado CMA</Texto>
        <Texto cor={Cores.textoSuave}>Classes, validade e requisitos do RBAC 67.</Texto>
        <Barra valor={feitas.length / questoesCMA.length} />
        <Texto t="rotulo" cor={Cores.textoApagado}>
          {feitas.length} de {questoesCMA.length} respondidas · {certas} certas{rankingAtivo ? '' : ' · ranking desativado'}
        </Texto>
      </CartaoImagem>
      <Painel>
        <Texto cor={Cores.textoSuave}>Fácil 10 XP · Média 20 XP · Difícil 30 XP. No Modo prova, cada acerto vale o dobro. Cada questão pontua uma vez.</Texto>
        <View style={{ gap: Espaco.sm }}>
          <BotaoPrincipal rotulo="Começar no Modo quiz" onPress={() => router.push({ pathname: '/teste', params: { origem: 'cma', modo: 'quiz' } })} />
          <BotaoPrincipal rotulo="Começar no Modo prova" secundario onPress={() => router.push({ pathname: '/teste', params: { origem: 'cma', modo: 'prova' } })} />
        </View>
      </Painel>
    </>
  );
}

// ---------- Peças do formulário ----------

function Chip({ rotulo, ativo, onPress }: { rotulo: string; ativo: boolean; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="radio" accessibilityState={{ checked: ativo }} onPress={onPress} style={[styles.chip, ativo && styles.chipAtivo]}>
      <Texto t="item" cor={ativo ? Cores.fundo : Cores.texto} style={{ flexShrink: 1, textAlign: 'center' }}>{rotulo}</Texto>
    </Pressable>
  );
}

function LinhaSN({ rotulo, valor, onChange }: { rotulo: string; valor: boolean | undefined; onChange: (v: boolean | undefined) => void }) {
  return (
    <View style={styles.linhaCampo}>
      <Texto style={{ flex: 1 }}>{rotulo}</Texto>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <Chip rotulo="Não" ativo={valor === false} onPress={() => onChange(valor === false ? undefined : false)} />
        <Chip rotulo="Sim" ativo={valor === true} onPress={() => onChange(valor === true ? undefined : true)} />
      </View>
    </View>
  );
}

function Entrada({ rotulo, placeholder, unidade, valor, onChange }: { rotulo: string; placeholder: string; unidade?: string; valor: string; onChange: (t: string) => void }) {
  const tr = useTr();
  return (
    <View style={styles.linhaCampo}>
      <Texto style={{ flex: 1 }}>{rotulo}</Texto>
      <View style={styles.entradaCaixa}>
        <TextInput
          value={valor}
          onChangeText={(t) => onChange(t.replace(/[^0-9.,-]/g, ''))}
          placeholder={tr(placeholder)}
          placeholderTextColor={Cores.textoApagado}
          keyboardType="decimal-pad"
          accessibilityLabel={rotulo}
          style={[styles.entrada, valor ? { borderColor: Cores.destaque } : null]}
        />
        {unidade ? <Texto t="rotulo" cor={Cores.textoApagado}>{unidade}</Texto> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vooSistema: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Cores.linha },
  voo: { flexDirection: 'row', alignItems: 'center', gap: Espaco.sm, padding: Espaco.md, borderRadius: Raio, borderWidth: 1, borderColor: Cores.linha, backgroundColor: Cores.painel },
  abas: { flexDirection: 'row', gap: 6, padding: 4, borderRadius: Raio, borderWidth: 1, borderColor: Cores.linha, backgroundColor: Cores.painel },
  aba: { flex: 1, minHeight: 40, borderRadius: Raio - 4, alignItems: 'center', justifyContent: 'center' },
  abaAtiva: { backgroundColor: Cores.destaque },
  entre: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: Espaco.sm },
  pilula: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1, backgroundColor: 'rgba(3,5,10,0.6)' },
  etapa: { flexDirection: 'row', alignItems: 'center', gap: Espaco.sm, marginTop: Espaco.sm },
  numero: { width: 26, height: 26, borderRadius: 13, backgroundColor: Cores.dourado, alignItems: 'center', justifyContent: 'center' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.sm },
  celula: { flexBasis: '47%', flexGrow: 1 },
  celulaAtiva: { borderColor: Cores.destaque, borderWidth: 2 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { minHeight: 40, minWidth: 64, maxWidth: '100%', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: Cores.linha, backgroundColor: 'rgba(255,255,255,0.03)', alignItems: 'center', justifyContent: 'center' },
  chipAtivo: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
  cabSistema: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md, minHeight: 56 },
  miniatura: { width: 56, height: 56, borderRadius: 12 },
  linhaCampo: { flexDirection: 'row', alignItems: 'center', gap: Espaco.sm, flexWrap: 'wrap' },
  entradaCaixa: { flexDirection: 'row', alignItems: 'center', gap: 6, minWidth: 150 },
  entrada: {
    width: 104,
    minHeight: 38,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Cores.linha,
    backgroundColor: 'rgba(3,5,10,0.5)',
    color: Cores.texto,
    fontFamily: Fonte,
    fontSize: Tamanho.corpo,
  },
  veredito: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md },
  mapa: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tile: { flexBasis: '31%', flexGrow: 1, height: 74, borderRadius: 10, borderWidth: 1.5, overflow: 'hidden', padding: 8, gap: 3, justifyContent: 'flex-end' },
  achado: { flexDirection: 'row', gap: Espaco.sm, alignItems: 'flex-start' },
  ponto: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  linhaTabela: { flexDirection: 'row', gap: Espaco.sm, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Cores.trilha },
  resultados: { flexDirection: 'row', gap: Espaco.sm },
  campo: { gap: 4, paddingBottom: 6, borderBottomWidth: 1, borderBottomColor: Cores.trilha },
  respostaLinha: { flexDirection: 'row', gap: 6, alignItems: 'flex-start' },
  resultadoItem: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: Espaco.md, borderRadius: 12, borderWidth: 1, backgroundColor: Cores.painel },
});
