import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState, type RefObject } from 'react';
import { Pressable, StyleSheet, TextInput, View, type ScrollViewInstance } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Barra, CartaoImagem, Painel } from '@/components/cartoes';
import { AnelValidade, Audiograma, EscalaGlicemia, GraficoAcuidade, GraficoPA, GraficoValidade, SERIES_VALIDADE } from '@/components/cma-graficos';
import { Selo } from '@/components/selo';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { BordaCapa, Cores, Espaco, Fonte, Raio, Tamanho } from '@/constants/theme';
import { questoesCMA } from '@/data/cma-questoes';
import { avaliar, CLASSES, EXAMES_1A, NOME_VEREDITO, SISTEMAS, validadeMeses, type Achado, type ClasseCMA, type Resultado, type Valores, type Veredito } from '@/lib/cma';
import { idQuestao } from '@/lib/xp';
import { useProgresso } from '@/state/progresso';

// Exame CMA: página de apoio à decisão do médico examinador.
// Três abas: Avaliação (formulário por sistema com gráficos ao vivo, veredito, validade e justificativa),
// Guia (classes, validade, onde fazer, o que levar, como se preparar) e Simulado (questões do ranking).
// Regras e fontes em src/lib/cma.ts; gráficos em src/components/cma-graficos.tsx.

type Aba = 'avaliacao' | 'guia' | 'simulado';

const IMG = {
  hero: require('@/assets/images/capas/cli-01.jpg'),
  guia: require('@/assets/images/capas/cli-03.jpg'),
  levar: require('@/assets/images/capas/cli-06.jpg'),
  simulado: require('@/assets/images/capas/cli-12.jpg'),
};

const IMG_CLASSE: Record<ClasseCMA, number> = {
  '1': require('@/assets/images/capas/cli-12.jpg'),
  '2': require('@/assets/images/capas/ope-09.jpg'),
  '4': require('@/assets/images/capas/fis-08.jpg'),
  '5': require('@/assets/images/capas/ope-16.jpg'),
};

const IMG_SISTEMA: Record<string, number> = {
  vitais: require('@/assets/images/capas/cli-08.jpg'),
  metabolico: require('@/assets/images/capas/cli-13.jpg'),
  cardio: require('@/assets/images/capas/cli-02.jpg'),
  pneumo: require('@/assets/images/topicos/m1v1-2-corpo.jpg'),
  hemato: require('@/assets/images/capas/cli-10.jpg'),
  neuro: require('@/assets/images/capas/cli-04.jpg'),
  mental: require('@/assets/images/capas/cli-05.jpg'),
  obst: require('@/assets/images/capas/cli-09.jpg'),
  visao: require('@/assets/images/capas/fis-09.jpg'),
  audicao: require('@/assets/images/capas/cli-07.jpg'),
  orl: require('@/assets/images/capas/fis-02.jpg'),
  odonto: require('@/assets/images/capas/cli-11.jpg'),
};

// Nome do sistema nos achados do motor → gaveta do formulário.
const SISTEMA_DO_ACHADO: Record<string, string> = {
  Cardiovascular: 'cardio',
  Metabólico: 'metabolico',
  Respiratório: 'pneumo',
  Hematológico: 'hemato',
  Neurológico: 'neuro',
  Mental: 'mental',
  Obstétrico: 'obst',
  Oftalmológico: 'visao',
  Auditivo: 'audicao',
  ORL: 'orl',
  Odontológico: 'odonto',
};

function idSistema(a: Achado) {
  // PA e IMC são medidos na gaveta de sinais vitais.
  if (a.ref === '67.79(a)' || a.ref === '67.85(a)(2)') return 'vitais';
  return SISTEMA_DO_ACHADO[a.sistema];
}

const CURTO: Record<string, string> = {
  vitais: 'Vitais', metabolico: 'Metabólico', cardio: 'Cardio', pneumo: 'Pulmão', hemato: 'Sangue', neuro: 'Neuro',
  mental: 'Mental', obst: 'Gestação', visao: 'Visão', audicao: 'Audição', orl: 'ORL', odonto: 'Dentes',
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

const TOTAL_CAMPOS = SISTEMAS.reduce((n, s) => n + s.campos.length, 0);

const n = (v: Valores, id: string) => {
  const s = v[id];
  if (typeof s !== 'string' || !s.trim()) return undefined;
  const x = Number(s.replace(',', '.'));
  return Number.isFinite(x) ? x : undefined;
};

export default function ExameCMA() {
  const [aba, setAba] = useState<Aba>('avaliacao');
  const rolagem = useRef<ScrollViewInstance | null>(null);
  return (
    <Tela titulo="Exame CMA" rotulo="Certificado Médico Aeronáutico · RBAC 67" refRolagem={rolagem}>
      <CartaoImagem imagem={IMG.hero} altura={190} style={BordaCapa}>
        <Selo texto="Ferramenta do examinador" cor={Cores.dourado} />
        <Texto t="titulo">Da anamnese ao veredito</Texto>
        <Texto cor={Cores.textoSuave}>Classe, parâmetros por sistema, gráficos ao vivo, validade e a justificativa da decisão.</Texto>
      </CartaoImagem>

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
    </Tela>
  );
}

// ---------- Avaliação ----------

function Avaliacao({ rolagem }: { rolagem: RefObject<ScrollViewInstance | null> }) {
  const [classe, setClasse] = useState<ClasseCMA>('1');
  const [funcao, setFuncao] = useState('pla-multi');
  const [idade, setIdade] = useState('');
  const [publico, setPublico] = useState(true);
  const [inicial, setInicial] = useState(false);
  const [valores, setValores] = useState<Valores>({});
  const [abertos, setAbertos] = useState<Record<string, boolean>>({ vitais: true });
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const rolar = useRef(false);

  const c = CLASSES.find((x) => x.id === classe)!;
  const idadeN = idade.trim() && Number.isFinite(Number(idade)) ? Number(idade) : undefined;
  const previa = idadeN !== undefined ? validadeMeses(funcao, idadeN, publico) : undefined;
  const serie = SERIES_VALIDADE.find((s) => s.funcao === funcao) ?? { funcao, publico, nome: '', cor: Cores.destaque };

  // Análise ao vivo: alimenta o status de cada sistema enquanto o formulário é preenchido.
  const aoVivo = useMemo(() => avaliar(classe, funcao, idadeN, publico, valores), [classe, funcao, idadeN, publico, valores]);
  const preenchidos = Object.values(valores).filter((v) => v !== undefined && v !== '').length;

  function trocarClasse(id: ClasseCMA) {
    setClasse(id);
    setFuncao(CLASSES.find((x) => x.id === id)!.funcoes[0].id);
    setResultado(null);
  }

  function definir(id: string, v: string | boolean | undefined) {
    setValores((atual) => ({ ...atual, [id]: v }));
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
          <Texto t="rotulo" cor={Cores.textoApagado}>{preenchidos} de {TOTAL_CAMPOS} campos</Texto>
        </View>
        <Barra valor={preenchidos / TOTAL_CAMPOS} />
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
        {classe !== '1' ? (
          <Texto cor={Cores.destaque}>
            Limiares específicos da {c.nome}: [confirmar na referência]. A análise usa os critérios da 1ª classe como referência e marca para conferência o que não passar.
          </Texto>
        ) : null}
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
        {funcao === 'pla-multi' ? <LinhaSN rotulo="Atua em transporte aéreo público" valor={publico} onChange={(v) => setPublico(v ?? false)} /> : null}
        <Entrada rotulo="Idade" placeholder="ex.: 42" unidade="anos" valor={idade} onChange={(t) => { setIdade(t); setResultado(null); }} />
        <Texto t="item">Tipo de exame</Texto>
        <View style={styles.chips}>
          <Chip rotulo="Revalidação" ativo={!inicial} onPress={() => setInicial(false)} />
          <Chip rotulo="Inicial" ativo={inicial} onPress={() => setInicial(true)} />
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
        {classe === '1' ? (
          EXAMES_1A.map((e) => (
            <View key={e.exame} style={styles.marca}>
              <Texto t="item">{e.exame}</Texto>
              <Texto cor={Cores.textoSuave}>{e.quando}</Texto>
            </View>
          ))
        ) : (
          <Texto cor={Cores.textoSuave}>Lista de exames da {c.nome}: [confirmar na referência].</Texto>
        )}
        {inicial ? <Texto cor={Cores.textoApagado}>Exame inicial: confira os itens marcados como "no inicial".</Texto> : null}
      </Painel>

      <Etapa numero="4" titulo="Parâmetros por sistema" />
      {SISTEMAS.map((s) => {
        const aberto = !!abertos[s.id];
        const feitos = s.campos.filter((f) => valores[f.id] !== undefined && valores[f.id] !== '').length;
        const status = pior(aoVivo.achados.filter((a) => idSistema(a) === s.id));
        const cor = status ? COR_NIVEL[status] : Cores.linha;
        return (
          <Painel key={s.id} style={{ borderColor: status && status !== 'ok' ? cor : Cores.linha }}>
            <Pressable accessibilityRole="button" accessibilityState={{ expanded: aberto }} onPress={() => setAbertos((a) => ({ ...a, [s.id]: !aberto }))} style={styles.cabSistema}>
              <Image source={IMG_SISTEMA[s.id]} style={[styles.miniatura, BordaCapa]} contentFit="cover" />
              <View style={{ flex: 1, gap: 4 }}>
                <Texto t="item">{s.nome}</Texto>
                <Texto t="rotulo" cor={Cores.textoApagado}>RBAC {s.ref} · {feitos}/{s.campos.length}</Texto>
                <Barra valor={feitos / s.campos.length} altura={2} />
              </View>
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                {status ? <Texto t="rodape" cor={cor}>{NOME_NIVEL[status]}</Texto> : <Texto t="rodape" cor={Cores.textoApagado}>Vazio</Texto>}
                <Texto t="rotulo" cor={Cores.destaque}>{aberto ? 'Fechar' : 'Abrir'}</Texto>
              </View>
            </Pressable>
            {aberto ? (
              <View style={{ gap: Espaco.sm }}>
                {s.id === 'vitais' ? <GraficoPA pas={n(valores, 'pas')} pad={n(valores, 'pad')} /> : null}
                {s.id === 'metabolico' ? <EscalaGlicemia gli={n(valores, 'glicemia')} /> : null}
                {s.id === 'visao' ? <GraficoAcuidade od={n(valores, 'avOD')} oe={n(valores, 'avOE')} bin={n(valores, 'avBin')} /> : null}
                {s.id === 'audicao' ? <Audiograma od={od} oe={oe} /> : null}
                {s.campos.map((f) =>
                  f.tipo === 'num' ? (
                    <Entrada key={f.id} rotulo={f.rotulo} placeholder={f.placeholder} unidade={f.unidade} valor={(valores[f.id] as string) ?? ''} onChange={(t) => definir(f.id, t)} />
                  ) : (
                    <LinhaSN key={f.id} rotulo={f.rotulo} valor={valores[f.id] as boolean | undefined} onChange={(v) => definir(f.id, v)} />
                  ),
                )}
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
        {resultado ? <PainelResultado r={resultado} classe={c.nome} valores={valores} /> : null}
      </View>
    </>
  );
}

function Etapa({ numero, titulo }: { numero: string; titulo: string }) {
  return (
    <View style={styles.etapa}>
      <View style={styles.numero}>
        <Texto t="item" cor={Cores.fundo}>{numero}</Texto>
      </View>
      <Texto t="item">{titulo}</Texto>
    </View>
  );
}

function PainelResultado({ r, classe, valores }: { r: Resultado; classe: string; valores: Valores }) {
  const cor = COR_VEREDITO[r.veredito];
  const achados = [...r.achados].sort((a, b) => ORDEM.indexOf(a.nivel) - ORDEM.indexOf(b.nivel));
  return (
    <View style={{ gap: Espaco.md }}>
      <Etapa numero="5" titulo="Veredito" />
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

      {r.pendentes.length ? (
        <Painel>
          <Texto t="rotulo" cor={Cores.textoApagado}>Faltam preencher</Texto>
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
      <Texto t="rotulo" cor={ativo ? Cores.fundo : Cores.texto}>{rotulo}</Texto>
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
  return (
    <View style={styles.linhaCampo}>
      <Texto style={{ flex: 1 }}>{rotulo}</Texto>
      <View style={styles.entradaCaixa}>
        <TextInput
          value={valor}
          onChangeText={(t) => onChange(t.replace(/[^0-9.,]/g, ''))}
          placeholder={placeholder}
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
  chip: { minHeight: 34, paddingHorizontal: 12, borderRadius: 17, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
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
  resultadoItem: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: Espaco.md, borderRadius: 12, borderWidth: 1, backgroundColor: Cores.painel },
});
