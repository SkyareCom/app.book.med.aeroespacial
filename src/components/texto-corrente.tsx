import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { FiguraMarcada } from '@/components/figura-marcada';
import { Midia } from '@/components/midia';
import { MolduraMidia } from '@/components/midia/moldura';
import { VideoLaco } from '@/components/midia/video-laco';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import type { Recurso } from '@/data/tipos';
import { useTr } from '@/state/idioma';

// Texto progressivo com recursos por parágrafo, usado nos tópicos dos voos e nos cards especiais.
// Prosa contínua: cada parágrafo pode destacar uma nuance entre **asteriscos duplos**.
// Figuras, tabelas e simuladores entram após o parágrafo indicado, sem divisões por nível de leitura.
export function TextoCorrente({ texto, recursos }: { texto: string; recursos?: Recurso[] }) {
  const tr = useTr();
  // Cada parágrafo é traduzido inteiro, antes de separar os destaques.
  const paragrafos = texto.split(/\n\s*\n/).map((p) => tr(p.trim())).filter(Boolean);
  return (
    <View style={{ gap: Espaco.md }}>
      {paragrafos.map((p, i) => (
        <View key={i} style={{ gap: Espaco.md }}>
          <Texto cor={Cores.textoSuave} semTraducao>
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
  figura: { gap: 6 },
  linhaTabela: { gap: 6, paddingTop: Espaco.sm, borderTopWidth: 1, borderTopColor: Cores.linha },
  figuraImagem: { width: '100%', borderRadius: 10, borderWidth: 1, borderColor: Cores.linha, overflow: 'hidden' },
});
