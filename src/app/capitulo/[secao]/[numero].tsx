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
import type { Topico } from '@/data/tipos';
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
      <Tela titulo="Episódio não encontrado">
        <Texto cor={Cores.textoSuave}>Volte e escolha outro episódio.</Texto>
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
            <Texto t="rotulo" cor={Cores.destaque}>Temporada {secao.numeral} · Episódio {capitulo.numero}</Texto>
            <Texto t="titulo" style={TituloDestaque}>{capitulo.titulo}</Texto>
            <Texto t="rotulo" cor={Cores.textoApagado}>
              {pronto ? `${duracao(capitulo)} min` : 'Em produção'} · {capitulo.topicos.length} cenas{nInterativos ? ` · ${nInterativos} interativo${nInterativos > 1 ? 's' : ''}` : ''}
            </Texto>
          </View>
        </View>

        <View style={{ paddingHorizontal: GUTTER, gap: Espaco.md }}>
          {capitulo.resumo ? <Texto t="item" cor={Cores.textoSuave}>{capitulo.resumo}</Texto> : null}

          {capitulo.objetivos ? (
            <Painel>
              <Texto t="rotulo" cor={Cores.destaque}>Neste episódio você vai</Texto>
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
              <Texto cor={Cores.textoSuave}>Os textos deste episódio estão sendo escritos. Estas são as cenas que ele vai cobrir:</Texto>
            </Painel>
          ) : null}

          {capitulo.topicos.map((t, i) => (
            <View
              key={t.id}
              onLayout={(e) => {
                if (foco === t.id) rolagem.current?.scrollTo({ y: Math.max(0, e.nativeEvent.layout.y + largura * 0.5625), animated: true });
              }}>
              <BlocoTopico topico={t} cena={i + 1} destacado={foco === t.id} />
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
          <Fileira titulo="Próximos episódios" rotulo={`Temporada ${secao.numeral}`}>
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
function BlocoTopico({ topico, cena, destacado }: { topico: Topico; cena: number; destacado: boolean }) {
  const c = topico.conteudo;
  return (
    <Painel style={destacado ? { borderColor: Cores.destaque } : undefined}>
      <View style={{ gap: 2 }}>
        <Texto t="rotulo" cor={Cores.destaque}>Cena {cena} · Tópico {topico.id}</Texto>
        <Texto t="titulo" style={TituloDestaque}>{topico.titulo}</Texto>
        {topico.pergunta ? <Texto cor={Cores.textoApagado}>{topico.pergunta}</Texto> : null}
      </View>

      {c ? (
        <>
          <Nivel rotulo="Essencial" texto={c.essencial} />
          <Nivel rotulo="Entenda" texto={c.explicacao} />
          <Nivel rotulo="Para profissionais" texto={c.clinico} />
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

function Nivel({ rotulo, texto }: { rotulo: string; texto: string }) {
  return (
    <View style={styles.nivel}>
      <Texto t="rotulo" cor={Cores.destaque}>{rotulo}</Texto>
      <Texto cor={Cores.textoSuave}>{texto}</Texto>
    </View>
  );
}

const styles = StyleSheet.create({
  textoHero: { position: 'absolute', left: GUTTER, right: GUTTER, bottom: 6, gap: 6 },
  nivel: { gap: 4, paddingLeft: Espaco.md, borderLeftWidth: 1, borderLeftColor: Cores.linha },
  alerta: { gap: 4, padding: Espaco.md, borderRadius: 12, backgroundColor: 'rgba(232,196,106,0.1)' },
});
