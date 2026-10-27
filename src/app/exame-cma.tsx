import { useRouter } from 'expo-router';
import { useMemo, useRef, useState, type RefObject } from 'react';
import { Pressable, StyleSheet, TextInput, View, type ScrollViewInstance } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Barra, Painel } from '@/components/cartoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Fonte, Raio, Tamanho } from '@/constants/theme';
import { questoesCMA } from '@/data/cma-questoes';
import { avaliar, CLASSES, EXAMES_1A, NOME_VEREDITO, SISTEMAS, validadeMeses, type Achado, type ClasseCMA, type Resultado, type Valores, type Veredito } from '@/lib/cma';
import { idQuestao } from '@/lib/xp';
import { useProgresso } from '@/state/progresso';

// Exame CMA: página de apoio à decisão do médico examinador.
// Três abas: Avaliação (formulário por sistema, veredito, validade e justificativa), Guia (classes, validade,
// onde fazer, o que levar, exames) e Simulado (questões do ranking). Regras e fontes em src/lib/cma.ts.

type Aba = 'avaliacao' | 'guia' | 'simulado';

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

export default function ExameCMA() {
  const [aba, setAba] = useState<Aba>('avaliacao');
  const rolagem = useRef<ScrollViewInstance | null>(null);
  return (
    <Tela titulo="Exame CMA" rotulo="Certificado Médico Aeronáutico · RBAC 67" refRolagem={rolagem}>
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
  const idadeN = idade.trim() ? Number(idade) : undefined;
  const previa = idadeN !== undefined && Number.isFinite(idadeN) ? validadeMeses(funcao, idadeN, publico) : undefined;

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
    setResultado(avaliar(classe, funcao, idadeN !== undefined && Number.isFinite(idadeN) ? idadeN : undefined, publico, valores));
    rolar.current = true;
  }

  function limpar() {
    setValores({});
    setIdade('');
    setResultado(null);
  }

  return (
    <>
      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>1 · Classe do CMA</Texto>
        <View style={styles.chips}>
          {CLASSES.map((x) => (
            <Chip key={x.id} rotulo={x.nome} ativo={classe === x.id} onPress={() => trocarClasse(x.id)} />
          ))}
        </View>
        <Texto cor={Cores.textoSuave}>{c.quem}</Texto>
        {classe !== '1' ? (
          <Texto cor={Cores.destaque}>
            Limiares específicos da {c.nome}: [confirmar na referência]. A análise usa os critérios da 1ª classe como referência e marca para conferência o que não passar.
          </Texto>
        ) : null}
        <Texto cor={Cores.textoApagado}>A 3ª classe (controle de tráfego aéreo) não é regida pela ANAC.</Texto>
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>2 · Candidato</Texto>
        <Texto t="item">Função</Texto>
        <View style={styles.chips}>
          {c.funcoes.map((f) => (
            <Chip key={f.id} rotulo={f.nome} ativo={funcao === f.id} onPress={() => { setFuncao(f.id); setResultado(null); }} />
          ))}
        </View>
        {funcao === 'pla-multi' ? (
          <LinhaSN rotulo="Atua em transporte aéreo público" valor={publico} onChange={(v) => setPublico(v ?? false)} />
        ) : null}
        <Entrada rotulo="Idade" placeholder="ex.: 42" unidade="anos" valor={idade} onChange={(t) => { setIdade(t); setResultado(null); }} />
        <Texto t="item">Tipo de exame</Texto>
        <View style={styles.chips}>
          <Chip rotulo="Revalidação" ativo={!inicial} onPress={() => setInicial(false)} />
          <Chip rotulo="Inicial" ativo={inicial} onPress={() => setInicial(true)} />
        </View>
        {previa ? <Texto cor={Cores.dourado}>Validade prevista se apto: {previa.meses} meses. {previa.regra}</Texto> : null}
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>3 · Exames exigidos</Texto>
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

      <Texto t="rotulo" cor={Cores.destaque} style={{ marginTop: Espaco.sm }}>4 · Parâmetros por sistema</Texto>
      {SISTEMAS.map((s) => {
        const aberto = !!abertos[s.id];
        const preenchidos = s.campos.filter((f) => valores[f.id] !== undefined && valores[f.id] !== '').length;
        return (
          <Painel key={s.id}>
            <Pressable accessibilityRole="button" onPress={() => setAbertos((a) => ({ ...a, [s.id]: !aberto }))} style={styles.cabSistema}>
              <View style={{ flex: 1, gap: 2 }}>
                <Texto t="item">{s.nome}</Texto>
                <Texto t="rotulo" cor={Cores.textoApagado}>RBAC {s.ref} · {preenchidos}/{s.campos.length} preenchidos</Texto>
              </View>
              <Texto t="rotulo" cor={Cores.destaque}>{aberto ? 'Fechar' : 'Abrir'}</Texto>
            </Pressable>
            {aberto ? (
              <View style={{ gap: Espaco.sm }}>
                {s.campos.map((f) =>
                  f.tipo === 'num' ? (
                    <Entrada key={f.id} rotulo={f.rotulo} placeholder={f.placeholder} unidade={f.unidade} valor={(valores[f.id] as string) ?? ''} onChange={(t) => definir(f.id, t)} />
                  ) : (
                    <LinhaSN key={f.id} rotulo={f.rotulo} valor={valores[f.id] as boolean | undefined} onChange={(v) => definir(f.id, v)} />
                  ),
                )}
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
          rolagem.current?.scrollTo({ y: e.nativeEvent.layout.y, animated: true });
        }}>
        {resultado ? <PainelResultado r={resultado} classe={c.nome} /> : null}
      </View>
    </>
  );
}

function PainelResultado({ r, classe }: { r: Resultado; classe: string }) {
  const cor = COR_VEREDITO[r.veredito];
  const ordem: Achado['nivel'][] = ['inapto', 'restricao', 'confirmar', 'julgamento', 'ok'];
  const achados = [...r.achados].sort((a, b) => ordem.indexOf(a.nivel) - ordem.indexOf(b.nivel));
  return (
    <View style={{ gap: Espaco.md }}>
      <Painel style={{ borderColor: cor }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Veredito · {classe}</Texto>
        <Texto t="titulo" cor={cor}>{NOME_VEREDITO[r.veredito]}</Texto>
        {r.validade ? (
          <>
            <Texto t="item" cor={Cores.dourado}>Validade: {r.validade.meses} meses · até {r.validade.data}</Texto>
            <Texto cor={Cores.textoSuave}>{r.validade.regra}</Texto>
          </>
        ) : r.veredito === 'inapto' ? (
          <Texto cor={Cores.textoSuave}>Sem validade: o CMA não é emitido. O candidato pode recorrer à ANAC (RBAC 67.71(g)).</Texto>
        ) : null}
        {r.restricoes.length ? (
          <View style={styles.marca}>
            <Texto t="rotulo" cor={Cores.dourado}>Restrições</Texto>
            {r.restricoes.map((x) => (
              <Texto key={x}>{x}</Texto>
            ))}
          </View>
        ) : null}
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

      <Painel>
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
      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Classes</Texto>
        {CLASSES.map((c) => (
          <View key={c.id} style={styles.marca}>
            <Texto t="item">{c.nome}</Texto>
            <Texto cor={Cores.textoSuave}>{c.quem}</Texto>
          </View>
        ))}
        <View style={styles.marca}>
          <Texto t="item">3ª classe</Texto>
          <Texto cor={Cores.textoSuave}>Controlador de tráfego aéreo. Não é regida pela ANAC.</Texto>
        </View>
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Validade</Texto>
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

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Onde fazer</Texto>
        <Texto cor={Cores.textoSuave}>
          Clínica credenciada (CLC): todas as classes. Médico credenciado (MC): 2ª, 4ª e 5ª classes. Médico cadastrado (MCad): 4ª classe. Também emitem as entidades conveniadas com a ANAC.
        </Texto>
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>O que levar</Texto>
        {['Documento de identidade com foto.', 'Exames anteriores e relatórios médicos.', 'Óculos ou lentes em uso, e um par reserva.', 'Lista de condições de saúde e medicamentos em uso, para declarar ao examinador.'].map((x) => (
          <View key={x} style={styles.marca}>
            <Texto>{x}</Texto>
          </View>
        ))}
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Como se preparar</Texto>
        <Texto cor={Cores.textoSuave}>
          Faça a coleta de glicemia em jejum. Leve a correção óptica que usa em voo, porque a acuidade é medida com ela. Declare tudo: omitir condição ou medicamento compromete o certificado. Se houver infarto, revascularização, diabetes em tratamento ou cirurgia refrativa, leve os exames e relatórios que mostram o tempo e o controle exigidos.
        </Texto>
      </Painel>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Resultado</Texto>
        <Texto cor={Cores.textoSuave}>
          Três julgamentos possíveis: apto, apto com restrição e não apto. Quem é julgado não apto recebe a justificativa e pode recorrer à ANAC.
        </Texto>
      </Painel>
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
    <Painel>
      <Texto t="rotulo" cor={Cores.destaque}>Simulado CMA</Texto>
      <Texto t="item">{questoesCMA.length} questões sobre classes, validade e requisitos do RBAC 67</Texto>
      <Texto cor={Cores.textoSuave}>Valem XP no ranking, como as demais: fácil 10, média 20, difícil 30. Cada questão pontua uma vez.</Texto>
      <Barra valor={feitas.length / questoesCMA.length} />
      <Texto cor={Cores.textoApagado}>
        {feitas.length} de {questoesCMA.length} respondidas · {certas} certas{rankingAtivo ? '' : ' · ranking desativado'}
      </Texto>
      <View style={{ gap: Espaco.sm }}>
        <BotaoPrincipal rotulo="Começar no Modo quiz" onPress={() => router.push({ pathname: '/teste', params: { origem: 'cma', modo: 'quiz' } })} />
        <BotaoPrincipal rotulo="Começar no Modo prova" secundario onPress={() => router.push({ pathname: '/teste', params: { origem: 'cma', modo: 'prova' } })} />
      </View>
    </Painel>
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
          style={styles.entrada}
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
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  chip: { minHeight: 34, paddingHorizontal: 12, borderRadius: 17, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
  chipAtivo: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2, borderLeftColor: Cores.dourado },
  cabSistema: { flexDirection: 'row', alignItems: 'center', gap: Espaco.sm, minHeight: 44 },
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
  achado: { flexDirection: 'row', gap: Espaco.sm, alignItems: 'flex-start' },
  ponto: { width: 8, height: 8, borderRadius: 4, marginTop: 4 },
  linhaTabela: { flexDirection: 'row', gap: Espaco.sm, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: Cores.trilha },
});
