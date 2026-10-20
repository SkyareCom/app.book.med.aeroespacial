import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, View, type ScrollViewInstance } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Painel } from '@/components/cartoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import { obterCapitulo, obterSecao, secoes } from '@/data/secoes';
import type { Topico } from '@/data/tipos';

// Na versão web, gera uma página estática para cada um dos 50 capítulos.
export async function generateStaticParams() {
  return secoes.flatMap((s) => s.capitulos.map((c) => ({ secao: s.id, numero: String(c.numero) })));
}

export default function TelaCapitulo() {
  const { secao: secaoId, numero, topico: foco } = useLocalSearchParams<{ secao: string; numero: string; topico?: string }>();
  const router = useRouter();
  const rolagem = useRef<ScrollViewInstance>(null);
  const secao = obterSecao(secaoId);
  const capitulo = obterCapitulo(secaoId, Number(numero));

  if (!secao || !capitulo) {
    return (
      <Tela titulo="Capítulo não encontrado">
        <Texto cor={Cores.textoSuave}>Volte e escolha outro capítulo.</Texto>
      </Tela>
    );
  }

  const temConteudo = capitulo.topicos.some((t) => t.conteudo);

  return (
    <Tela titulo={capitulo.titulo} rotulo={`${secao.titulo} · Capítulo ${capitulo.numero}`} refRolagem={rolagem}>
      {capitulo.resumo ? <Texto t="item" cor={Cores.textoSuave}>{capitulo.resumo}</Texto> : null}

      {capitulo.objetivos ? (
        <Painel>
          <Texto t="rotulo" cor={Cores.destaque}>Objetivos</Texto>
          {capitulo.objetivos.map((o) => (
            <Texto key={o} cor={Cores.textoSuave}>· {o}</Texto>
          ))}
        </Painel>
      ) : null}

      {capitulo.topicos.map((t) => (
        <View
          key={t.id}
          onLayout={(e) => {
            if (foco === t.id) rolagem.current?.scrollTo({ y: Math.max(0, e.nativeEvent.layout.y), animated: true });
          }}>
          <BlocoTopico topico={t} destacado={foco === t.id} />
        </View>
      ))}

      {!temConteudo ? (
        <Painel>
          <Texto t="rotulo" cor={Cores.destaque}>Em produção</Texto>
          <Texto cor={Cores.textoSuave}>Os textos deste capítulo estão sendo escritos. Os tópicos acima mostram o que ele vai cobrir.</Texto>
        </Painel>
      ) : null}

      {capitulo.teste?.length ? (
        <BotaoPrincipal
          rotulo="Teste o conhecimento"
          onPress={() => router.push({ pathname: '/teste', params: { origem: 'capitulo', secao: secao.id, numero: String(capitulo.numero), modo: 'quiz' } })}
        />
      ) : null}
    </Tela>
  );
}

// Três níveis de leitura, sempre visíveis e em sequência, sem "ler mais".
function BlocoTopico({ topico, destacado }: { topico: Topico; destacado: boolean }) {
  const c = topico.conteudo;
  return (
    <Painel style={destacado ? { borderColor: Cores.destaque } : undefined}>
      <View style={{ gap: 2 }}>
        <Texto t="rotulo" cor={Cores.destaque}>Tópico {topico.id}</Texto>
        <Texto t="titulo">{topico.titulo}</Texto>
        {topico.pergunta ? <Texto cor={Cores.textoApagado}>{topico.pergunta}</Texto> : null}
      </View>

      {c ? (
        <>
          <Nivel rotulo="Essencial" texto={c.essencial} />
          <Nivel rotulo="Entenda" texto={c.explicacao} />
          <Nivel rotulo="Para profissionais" texto={c.clinico} />
          {c.alerta ? (
            <View style={styles.alerta}>
              <Texto t="rotulo" cor={Cores.dourado}>Atenção</Texto>
              <Texto>{c.alerta}</Texto>
            </View>
          ) : null}
          {c.pontosChave?.length ? (
            <View style={{ gap: 4 }}>
              <Texto t="rotulo" cor={Cores.textoApagado}>Pontos-chave</Texto>
              {c.pontosChave.map((p) => (
                <Texto key={p}>· {p}</Texto>
              ))}
            </View>
          ) : null}
        </>
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
  nivel: { gap: 4, paddingLeft: Espaco.md, borderLeftWidth: 1, borderLeftColor: Cores.linha },
  alerta: { gap: 4, padding: Espaco.md, borderRadius: 12, backgroundColor: 'rgba(232,196,106,0.1)' },
});
