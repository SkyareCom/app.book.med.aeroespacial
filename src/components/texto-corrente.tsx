import { Image } from 'expo-image';
import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { FiguraMarcada } from '@/components/figura-marcada';
import { Midia } from '@/components/midia';
import { MolduraMidia } from '@/components/midia/moldura';
import { VideoLaco } from '@/components/midia/video-laco';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import type { Recurso } from '@/data/tipos';
import { useIdioma, useTr } from '@/state/idioma';
import { useNarracao } from '@/state/narracao';

// Texto progressivo com recursos por parágrafo, usado nos tópicos dos voos e nos cards especiais.
// Prosa contínua: cada parágrafo pode destacar uma nuance entre **asteriscos duplos**.
// Figuras, tabelas e simuladores entram após o parágrafo indicado, sem divisões por nível de leitura.
export function TextoCorrente({ texto, recursos }: { texto: string; recursos?: Recurso[] }) {
  const tr = useTr();
  const { idioma } = useIdioma();
  // Cada parágrafo é traduzido inteiro, antes de separar os destaques.
  const paragrafos = useMemo(() => texto.split(/\n\s*\n/).map((p) => tr(p.trim())).filter(Boolean), [texto, tr]);
  const narra = useNarracao(paragrafos, idioma);
  return (
    <View style={{ gap: Espaco.md }}>
      <BarraNarracao narra={narra} total={paragrafos.length} />
      {paragrafos.map((p, i) => (
        <View key={i} style={{ gap: Espaco.md }}>
          <Texto cor={Cores.textoSuave} semTraducao style={narra.ativo && narra.indice === i ? styles.falando : undefined}>
            {p.split(/(\*\*[^*]+\*\*)/g).map((parte, j) =>
              parte.startsWith('**') && parte.endsWith('**')
                ? <Texto key={j} cor={Cores.destaque} semTraducao>{parte.slice(2, -2)}</Texto>
                : parte,
            )}
          </Texto>
          <Recursos lista={recursos?.filter((r) => r.paragrafo === i + 1)} />
        </View>
      ))}
      <Recursos lista={recursos?.filter((r) => !r.paragrafo)} />
    </View>
  );
}

// Narração (18/11/2026): ouvir o texto corrido do tópico na voz do aparelho, no idioma do app.
function BarraNarracao({ narra, total }: { narra: ReturnType<typeof useNarracao>; total: number }) {
  const tr = useTr();
  const rotulo = narra.tocando ? 'Pausar' : narra.ativo ? 'Continuar' : 'Ouvir';
  return (
    <View style={styles.barra}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={tr(rotulo)}
        onPress={narra.tocando ? narra.pausar : narra.tocar}
        style={({ pressed }) => [styles.botaoNarrar, pressed && { opacity: 0.7 }]}>
        <Svg width={14} height={14} viewBox="0 0 24 24">
          {narra.tocando ? (
            <>
              <Rect x={6} y={5} width={4} height={14} rx={1} fill={Cores.fundo} />
              <Rect x={14} y={5} width={4} height={14} rx={1} fill={Cores.fundo} />
            </>
          ) : (
            <Path d="M7 4.5v15l12-7.5z" fill={Cores.fundo} />
          )}
        </Svg>
        <Texto t="rotulo" cor={Cores.fundo}>{rotulo}</Texto>
      </Pressable>
      {narra.ativo ? (
        <>
          <Texto t="rotulo" cor={Cores.textoApagado} semTraducao style={{ flex: 1 }}>
            {tr('Parágrafo {0} de {1}').replace('{0}', String(Math.min(narra.indice + 1, total))).replace('{1}', String(total))}
          </Texto>
          <Pressable accessibilityRole="button" accessibilityLabel={tr('Parar')} onPress={narra.parar} hitSlop={8} style={({ pressed }) => [styles.botaoParar, pressed && { opacity: 0.6 }]}>
            <Texto t="rotulo" cor={Cores.destaque}>Parar</Texto>
          </Pressable>
        </>
      ) : (
        <Texto t="rotulo" cor={Cores.textoApagado} style={{ flex: 1 }}>Narração do tópico</Texto>
      )}
    </View>
  );
}

export function Recursos({ lista }: { lista?: Recurso[] }) {
  const itens = lista ?? [];
  return (
    <>
      {itens.map((r, i) =>
        r.midia ? (
          <Midia key={`${r.midia}-${i}`} tipo={r.midia} />
        ) : r.video ? (
          <VideoLaco key={`vid-${i}`} fonte={r.video.fonte} legenda={r.video.legenda} proporcao={r.video.proporcao} />
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
  barra: { flexDirection: 'row', alignItems: 'center', gap: Espaco.sm },
  botaoNarrar: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Cores.destaque, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 },
  botaoParar: { paddingVertical: 6, paddingHorizontal: 4 },
  falando: { borderLeftWidth: 2, borderLeftColor: Cores.destaque, paddingLeft: Espaco.sm },
  figura: { gap: 6 },
  linhaTabela: { gap: 6, paddingTop: Espaco.sm, borderTopWidth: 1, borderTopColor: Cores.linha },
  figuraImagem: { width: '100%', borderRadius: 10, borderWidth: 1, borderColor: Cores.linha, overflow: 'hidden' },
});
