import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { StyleSheet, View, type ScrollViewInstance } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Painel } from '@/components/cartoes';
import { Midia } from '@/components/midia';
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
                if (foco === t.id) rolagem.current?.scrollTo({ y: Math.max(0, e.nativeEvent.layout.y + largura * 0.5625), animated: true });
              }}>
              <BlocoTopico topico={t} codigo={`M${secoes.indexOf(secao) + 1}V${capitulo.numero}`} destacado={foco === t.id} />
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

function BlocoTopico({ topico, codigo, destacado }: { topico: Topico; codigo: string; destacado: boolean }) {
  const c = topico.conteudo;
  return (
    <Painel style={destacado ? { borderColor: Cores.destaque } : undefined}>
      <View style={{ gap: 2 }}>
        <Texto t="rotulo" cor={Cores.destaque}>{codigo} - {romano(Number(topico.id.split('.').pop()))}</Texto>
        <Texto t="titulo" style={TituloDestaque}>{topico.titulo}</Texto>
        {topico.pergunta ? <Texto cor={Cores.textoApagado}>{topico.pergunta}</Texto> : null}
      </View>

      {c ? (
        <>
          <Nivel rotulo="Essencial" texto={c.essencial} />
          <Recursos lista={c.recursos} apos="essencial" />
          <Nivel rotulo="Entenda" texto={c.explicacao} />
          <Recursos lista={c.recursos} apos="entenda" />
          <Nivel rotulo="Para profissionais" texto={c.clinico} />
          <Recursos lista={c.recursos} apos="profissionais" />
        </>
      ) : null}

      {topico.midias?.map((m) => (
        <Midia key={m} tipo={m} />
      ))}

      {c?.alerta ? (
        <View style={styles.alerta}>
          <Texto t="rotulo" cor={Cores.dourado}>Atenção</Texto>
          <Texto>{c.alerta}</Texto>
        </View>
      ) : null}
      {c?.pontosChave?.length ? (
        <View style={{ gap: 4 }}>
          <Texto t="rotulo" cor={Cores.textoApagado}>Pontos-chave</Texto>
          {c.pontosChave.map((p) => (
            <Texto key={p}>· {p}</Texto>
          ))}
        </View>
      ) : null}
    </Painel>
  );
}

// Cada linha em branco no texto vira um parágrafo, para o leitor ter pausas.
function Nivel({ rotulo, texto }: { rotulo: string; texto: string }) {
  return (
    <View style={styles.nivel}>
      <Texto t="rotulo" cor={Cores.destaque}>{rotulo}</Texto>
      {texto.split(/\n\s*\n/).map((p, i) => (
        <Texto key={i} cor={Cores.textoSuave}>{p.trim()}</Texto>
      ))}
    </View>
  );
}

function Recursos({ lista, apos }: { lista?: Recurso[]; apos: Recurso['apos'] }) {
  const itens = lista?.filter((r) => r.apos === apos) ?? [];
  return (
    <>
      {itens.map((r, i) =>
        r.midia ? (
          <Midia key={`${r.midia}-${i}`} tipo={r.midia} />
        ) : r.figura ? (
          <View key={`fig-${i}`} style={styles.figura}>
            <Image source={r.figura.imagem} style={styles.figuraImagem} contentFit="cover" accessibilityLabel={r.figura.legenda} />
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
  figuraImagem: { width: '100%', aspectRatio: 16 / 9, borderRadius: 10, borderWidth: 1, borderColor: Cores.linha },
  nivel: { gap: 8, paddingLeft: Espaco.md, borderLeftWidth: 1, borderLeftColor: Cores.linha },
  alerta: { gap: 4, padding: Espaco.md, borderRadius: 12, backgroundColor: 'rgba(232,196,106,0.1)' },
});
