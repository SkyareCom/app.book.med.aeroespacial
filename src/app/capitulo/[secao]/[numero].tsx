import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View, type ScrollViewInstance } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Painel } from '@/components/cartoes';
import { IconeAbrir } from '@/components/icones';
import { FiguraMarcada } from '@/components/figura-marcada';
import { Midia } from '@/components/midia';
import { MolduraMidia } from '@/components/midia/moldura';
import { CartaoEpisodio, disponivel, duracao, Fileira, GUTTER } from '@/components/streaming';
import { BotaoVoltarFlutuante, Tela, TelaCheia } from '@/components/tela';
import { Texto } from '@/components/texto';
import { CapaEpisodio } from '@/constants/capas';
import { Cores, Espaco, LarguraMaxima, TituloDestaque } from '@/constants/theme';
import { chaveCapitulo, obterCapitulo, obterSecao, secoes } from '@/data/secoes';
import type { Recurso, Topico } from '@/data/tipos';
import { useProgresso } from '@/state/progresso';
import { useLarguraJanela } from '@/hooks/use-largura-janela';

// Na versão web, gera uma página estática para cada um dos 50 capítulos.
export async function generateStaticParams() {
  return secoes.flatMap((s) => s.capitulos.map((c) => ({ secao: s.id, numero: String(c.numero) })));
}

// Página do episódio: capa de cinema, cenas (tópicos) com os três níveis de leitura, interativos e o teste no final.
export default function TelaCapitulo() {
  const { secao: secaoId, numero, topico: foco } = useLocalSearchParams<{ secao: string; numero: string; topico?: string }>();
  const router = useRouter();
  const width = useLarguraJanela();
  const rolagem = useRef<ScrollViewInstance>(null);
  const { registrarVisita } = useProgresso();
  // Posição de cada tópico na página, para voltar ao topo da gaveta quando ela é fechada lá embaixo.
  const posTopicos = useRef<Record<string, number>>({});
  const secao = obterSecao(secaoId);
  const capitulo = obterCapitulo(secaoId, Number(numero));

  useEffect(() => {
    if (secao && capitulo) registrarVisita(chaveCapitulo(secao.id, capitulo.numero));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secaoId, numero]);

  if (!secao || !capitulo) {
    return (
      <Tela titulo="Voo não encontrado">
        <Texto cor={Cores.textoSuave}>Volte e escolha outro voo.</Texto>
      </Tela>
    );
  }

  const pronto = disponivel(capitulo);
  const nInterativos = (capitulo.laboratorio?.length ?? 0) + capitulo.topicos.reduce((n, t) => n + (t.midias?.length ?? 0), 0);
  const largura = Math.min(width, LarguraMaxima);
  const proximos = secao.capitulos.filter((c) => c.numero > capitulo.numero).slice(0, 4);

  return (
    <View style={{ flex: 1 }}>
      <TelaCheia refRolagem={rolagem}>
        <View style={{ height: largura * 0.5625 + 120 }}>
          <Image source={CapaEpisodio[`${secao.id}-${capitulo.numero}`]} style={{ width: largura, height: largura * 0.5625 + 60 }} contentFit="cover" />
          <LinearGradient colors={['rgba(3,5,10,0.5)', 'rgba(3,5,10,0)', Cores.fundo]} locations={[0, 0.3, 0.92]} style={StyleSheet.absoluteFill} />
          <View style={styles.textoHero}>
            <Texto t="rotulo" cor={Cores.destaque}>Missão {secao.numeral} · Voo {capitulo.numero}</Texto>
            <Texto t="titulo" style={TituloDestaque}>{capitulo.titulo}</Texto>
            <Texto t="rotulo" cor={Cores.textoApagado}>
              {pronto ? `${duracao(capitulo)} min` : 'Em produção'} · {capitulo.topicos.length} tópicos{nInterativos ? ` · ${nInterativos} interativo${nInterativos > 1 ? 's' : ''}` : ''}
            </Texto>
          </View>
        </View>

        <View style={{ paddingHorizontal: GUTTER, gap: Espaco.md }}>
          {capitulo.resumo ? <Texto t="item" cor={Cores.textoSuave}>{capitulo.resumo}</Texto> : null}

          {capitulo.objetivos ? (
            <Painel>
              <Texto t="rotulo" cor={Cores.destaque}>Neste voo você vai</Texto>
              {capitulo.objetivos.map((o) => (
                <Texto key={o} cor={Cores.textoSuave}>· {o}</Texto>
              ))}
            </Painel>
          ) : null}

          {capitulo.laboratorio?.map((m) => (
            <Midia key={m} tipo={m} />
          ))}

          {!pronto ? (
            <Painel>
              <Texto t="rotulo" cor={Cores.destaque}>Em produção</Texto>
              <Texto cor={Cores.textoSuave}>Os textos deste voo estão sendo escritos. Estes são os tópicos que ele vai cobrir:</Texto>
            </Painel>
          ) : null}

          {capitulo.topicos.map((t, i) => (
            <View
              key={t.id}
              onLayout={(e) => {
                posTopicos.current[t.id] = e.nativeEvent.layout.y;
                if (foco === t.id) rolagem.current?.scrollTo({ y: Math.max(0, e.nativeEvent.layout.y + largura * 0.5625), animated: true });
              }}>
              <BlocoTopico
                topico={t}
                codigo={`M${secoes.indexOf(secao) + 1}V${capitulo.numero}`}
                destacado={foco === t.id}
                voltarAoTopo={() => rolagem.current?.scrollTo({ y: Math.max(0, (posTopicos.current[t.id] ?? 0) + largura * 0.5625 + 120 - 12), animated: true })}
              />
            </View>
          ))}

          {capitulo.teste?.length ? (
            <BotaoPrincipal
              rotulo="Teste o conhecimento"
              onPress={() => router.push({ pathname: '/teste', params: { origem: 'capitulo', secao: secao.id, numero: String(capitulo.numero), modo: 'quiz' } })}
            />
          ) : null}
        </View>

        {proximos.length ? (
          <Fileira titulo="Próximos voos" rotulo={`Missão ${secao.numeral}`}>
            {proximos.map((c) => (
              <CartaoEpisodio key={c.numero} secao={secao} capitulo={c} largura={210} />
            ))}
          </Fileira>
        ) : null}
      </TelaCheia>
      <BotaoVoltarFlutuante />
    </View>
  );
}

// Uma cena = um tópico. Três níveis de leitura sempre visíveis, depois os interativos e os pontos-chave.
// Código do tópico: M = missão, V = voo e o número do tópico em romanos (ex.: M1V3 - II).
function romano(n: number) {
  const tabela: [number, string][] = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let r = '';
  for (const [v, s] of tabela) while (n >= v) { r += s; n -= v; }
  return r;
}

// Cada tópico é uma gaveta: fechado mostra código, título e pergunta; ao tocar, abre com os três níveis juntos.
// Tópico ainda sem texto não abre. Um tópico vindo de link direto (busca, teste) já chega aberto.
// O topo do card é o puxador da gaveta: um toque abre, outro fecha, com a seta girando e o conteúdo deslizando.
const NATIVO = Platform.OS !== 'web';
function BlocoTopico({ topico, codigo, destacado, voltarAoTopo }: { topico: Topico; codigo: string; destacado: boolean; voltarAoTopo: () => void }) {
  const c = topico.conteudo;
  const [aberto, setAberto] = useState(destacado);
  const pode = !!c;
  const giro = useRef(new Animated.Value(destacado ? 1 : 0)).current;
  const entrada = useRef(new Animated.Value(destacado ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(giro, { toValue: aberto ? 1 : 0, duration: 240, useNativeDriver: NATIVO }).start();
    if (aberto) {
      entrada.setValue(0);
      Animated.timing(entrada, { toValue: 1, duration: 320, useNativeDriver: NATIVO }).start();
    }
  }, [aberto, giro, entrada]);
  const rotacao = giro.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  return (
    <Painel style={destacado || aberto ? { borderColor: Cores.destaque } : undefined}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: aberto, disabled: !pode }}
        accessibilityLabel={`${codigo} - ${romano(Number(topico.id.split('.').pop()))}: ${topico.titulo}`}
        accessibilityHint={aberto ? 'Toque para fechar o tópico' : 'Toque para abrir o tópico'}
        disabled={!pode}
        onPress={() => setAberto((v) => !v)}
        style={({ pressed }) => [styles.cabecaTopico, pressed && styles.cabecaPressionada]}>
        <View style={{ flex: 1, gap: 2 }}>
          <Texto t="rotulo" cor={Cores.destaque}>{codigo} - {romano(Number(topico.id.split('.').pop()))}</Texto>
          <Texto t="titulo" style={TituloDestaque}>{topico.titulo}</Texto>
          {topico.pergunta ? <Texto cor={Cores.textoApagado}>{topico.pergunta}</Texto> : null}
          {!pode ? <Texto t="rotulo" cor={Cores.textoApagado}>Em produção</Texto> : null}
        </View>
        {pode ? (
          <View style={styles.puxador}>
            <Animated.View style={[styles.seta, aberto && styles.setaAberta, { transform: [{ rotate: rotacao }] }]}>
              <IconeAbrir cor={Cores.destaque} tamanho={20} />
            </Animated.View>
            <Texto t="rodape" cor={Cores.textoApagado}>{aberto ? 'Fechar' : 'Abrir'}</Texto>
          </View>
        ) : null}
      </Pressable>

      {aberto && c ? (
        <Animated.View style={{ gap: Espaco.md, opacity: entrada, transform: [{ translateY: entrada.interpolate({ inputRange: [0, 1], outputRange: [-12, 0] }) }] }}>
          <Nivel rotulo="Essencial" texto={c.essencial} recursos={c.recursos} apos="essencial" />
          <Recursos lista={c.recursos} apos="essencial" />
          <Nivel rotulo="Entenda" texto={c.explicacao} recursos={c.recursos} apos="entenda" />
          <Recursos lista={c.recursos} apos="entenda" />
          <Nivel rotulo="Para profissionais" texto={c.clinico} recursos={c.recursos} apos="profissionais" />
          <Recursos lista={c.recursos} apos="profissionais" />
          {topico.midias?.map((m) => (
            <Midia key={m} tipo={m} />
          ))}
          {c.alerta ? (
            <View style={styles.alerta}>
              <Texto t="rotulo" cor={Cores.dourado}>Atenção</Texto>
              <Texto>{c.alerta}</Texto>
            </View>
          ) : null}
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setAberto(false);
              voltarAoTopo();
            }}
            style={({ pressed }) => [styles.fechar, pressed && { opacity: 0.6 }]}>
            <Texto t="rotulo" cor={Cores.destaque}>Fechar tópico</Texto>
            <View style={{ transform: [{ rotate: '180deg' }] }}>
              <IconeAbrir cor={Cores.destaque} tamanho={16} />
            </View>
          </Pressable>
        </Animated.View>
      ) : null}
    </Painel>
  );
}

// Cada linha em branco no texto vira um parágrafo, para o leitor ter pausas.
// Recursos com `paragrafo` entram entre os parágrafos: o texto nunca corre sem um visual.
function Nivel({ rotulo, texto, recursos, apos }: { rotulo: string; texto: string; recursos?: Recurso[]; apos: Recurso['apos'] }) {
  const paragrafos = texto.split(/\n\s*\n/).map((p) => p.trim());
  const blocos: { inicio: number; fim: number }[] = [];
  let inicio = 0;
  paragrafos.forEach((_, i) => {
    const corte = recursos?.some((r) => r.apos === apos && r.paragrafo === i + 1);
    if (corte || i === paragrafos.length - 1) {
      blocos.push({ inicio, fim: i + 1 });
      inicio = i + 1;
    }
  });
  return (
    <>
      {blocos.map((b, k) => (
        <View key={k} style={{ gap: Espaco.md }}>
          <View style={styles.nivel}>
            {k === 0 ? <Texto t="rotulo" cor={Cores.destaque}>{rotulo}</Texto> : null}
            {paragrafos.slice(b.inicio, b.fim).map((p, i) => (
              <Texto key={i} cor={Cores.textoSuave}>{p}</Texto>
            ))}
          </View>
          {b.fim < paragrafos.length || recursos?.some((r) => r.apos === apos && r.paragrafo === b.fim) ? (
            <Recursos lista={recursos?.filter((r) => r.paragrafo === b.fim)} apos={apos} entre />
          ) : null}
        </View>
      ))}
    </>
  );
}

function Recursos({ lista, apos, entre = false }: { lista?: Recurso[]; apos: Recurso['apos']; entre?: boolean }) {
  // Sem `entre`, só os recursos do fim do nível (sem parágrafo marcado).
  const itens = lista?.filter((r) => r.apos === apos && (entre || !r.paragrafo)) ?? [];
  return (
    <>
      {itens.map((r, i) =>
        r.midia ? (
          <Midia key={`${r.midia}-${i}`} tipo={r.midia} />
        ) : r.tabela ? (
          <MolduraMidia key={`tab-${i}`} tipo="Tabela" titulo={r.tabela.titulo}>
            {r.tabela.linhas.map((l) => (
              <View key={l[0]} style={styles.linhaTabela}>
                <Texto t="item" cor={Cores.destaque}>{l[0]}</Texto>
                {l.slice(1).map((v, k) => (
                  <View key={k} style={{ gap: 1 }}>
                    <Texto t="rotulo" cor={Cores.textoApagado}>{r.tabela!.colunas[k + 1]}</Texto>
                    <Texto cor={Cores.textoSuave}>{v}</Texto>
                  </View>
                ))}
              </View>
            ))}
          </MolduraMidia>
        ) : r.figura?.marcadores ? (
          <FiguraMarcada key={`fig-${i}`} imagem={r.figura.imagem} legenda={r.figura.legenda} proporcao={r.figura.proporcao} marcadores={r.figura.marcadores} />
        ) : r.figura ? (
          <View key={`fig-${i}`} style={styles.figura}>
            <Image source={r.figura.imagem} style={[styles.figuraImagem, { aspectRatio: r.figura.proporcao ?? 16 / 9 }]} contentFit="cover" accessibilityLabel={r.figura.legenda} />
            <Texto cor={Cores.textoApagado}>{r.figura.legenda}</Texto>
          </View>
        ) : null,
      )}
    </>
  );
}

const styles = StyleSheet.create({
  textoHero: { position: 'absolute', left: GUTTER, right: GUTTER, bottom: 6, gap: 6 },
  figura: { gap: 6 },
  linhaTabela: { gap: 6, paddingTop: Espaco.sm, borderTopWidth: 1, borderTopColor: Cores.linha },
  figuraImagem: { width: '100%', borderRadius: 10, borderWidth: 1, borderColor: Cores.linha, overflow: 'hidden' },
  cabecaTopico: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md, marginHorizontal: -8, marginVertical: -6, paddingHorizontal: 8, paddingVertical: 6, borderRadius: 12 },
  cabecaPressionada: { backgroundColor: 'rgba(111,211,255,0.08)' },
  puxador: { alignItems: 'center', gap: 4 },
  setaAberta: { borderColor: Cores.destaque, backgroundColor: 'rgba(111,211,255,0.1)' },
  seta: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
  fechar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, minHeight: 44, borderTopWidth: 1, borderTopColor: Cores.linha },
  nivel: { gap: 8, paddingLeft: Espaco.md, borderLeftWidth: 1, borderLeftColor: Cores.linha },
  alerta: { gap: 4, padding: Espaco.md, borderRadius: 12, backgroundColor: 'rgba(232,196,106,0.1)' },
});
