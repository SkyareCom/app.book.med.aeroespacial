import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { IconeCheck } from '@/components/icones';
import { disponivel, duracao, GUTTER, rotaEpisodio, Selo } from '@/components/streaming';
import { TelaCheia } from '@/components/tela';
import { Texto } from '@/components/texto';
import { ArteTemporada, CapaEpisodio } from '@/constants/capas';
import { Cores, Espaco, TituloDestaque, BordaCapa } from '@/constants/theme';
import { chaveCapitulo, obterSecao } from '@/data/secoes';
import type { SecaoId } from '@/data/tipos';
import { useProgresso } from '@/state/progresso';

// Página da temporada: arte grande, sinopse e a lista de episódios.
export function TelaSecao({ id }: { id: SecaoId }) {
  const secao = obterSecao(id)!;
  const router = useRouter();
  const { concluidos } = useProgresso();
  const prontos = secao.capitulos.filter(disponivel).length;
  const interativos = secao.capitulos.filter((c) => c.laboratorio?.length || c.topicos.some((t) => t.midias?.length)).length;
  const primeiro = secao.capitulos.find(disponivel) ?? secao.capitulos.find((c) => c.laboratorio?.length) ?? secao.capitulos[0];

  return (
    <TelaCheia>
      <View style={{ height: 420 }}>
        <Image source={ArteTemporada[id]} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient colors={['rgba(3,5,10,0.4)', 'rgba(3,5,10,0)', Cores.fundo]} locations={[0, 0.35, 1]} style={StyleSheet.absoluteFill} />
        <View style={styles.textoHero}>
          <Texto t="rotulo" cor={Cores.dourado}>Missão {secao.numeral}</Texto>
          <Texto t="titulo">{secao.titulo}</Texto>
          <Texto cor={Cores.textoSuave}>{secao.sinopse}</Texto>
          <Texto t="rotulo" cor={Cores.textoApagado}>
            {secao.capitulos.length} voos · {prontos} disponível{prontos === 1 ? '' : 'is'} · {interativos} com interativos
          </Texto>
          <Pressable accessibilityRole="button" onPress={() => router.push(rotaEpisodio(id, primeiro.numero))} style={({ pressed }) => [styles.botao, pressed && { opacity: 0.85 }]}>
            <Texto t="item" maiusculo espacado cor={Cores.fundo}>▶  Voo {primeiro.numero}</Texto>
          </Pressable>
        </View>
      </View>

      <View style={{ paddingHorizontal: GUTTER, gap: Espaco.lg }}>
        <Texto t="rotulo" cor={Cores.textoApagado}>Voos</Texto>
        {secao.capitulos.map((c) => {
          const feito = concluidos.includes(chaveCapitulo(id, c.numero));
          const pronto = disponivel(c);
          const lab = !!c.laboratorio?.length || c.topicos.some((t) => t.midias?.length);
          return (
            <Pressable
              key={c.numero}
              accessibilityRole="button"
              accessibilityLabel={`Voo ${c.numero}: ${c.titulo}`}
              onPress={() => router.push(rotaEpisodio(id, c.numero))}
              style={({ pressed }) => [styles.episodio, pressed && { opacity: 0.85 }]}>
              {/* Todos os cartões têm a mesma altura e estrutura, em duas colunas:
                  1) capa; 2) título, duração (ou "em produção") e selo interativo. */}
              <View style={styles.miniatura}>
                <Image source={CapaEpisodio[`${id}-${c.numero}`]} style={StyleSheet.absoluteFill} contentFit="cover" />
                {feito ? <View style={styles.feito}><IconeCheck cor={Cores.fundo} tamanho={14} /></View> : null}
              </View>
              <View style={styles.coluna2}>
                <View style={styles.titulo}>
                  <Texto t="item" style={TituloDestaque} numberOfLines={2}>{c.numero}. {c.titulo}</Texto>
                </View>
                <Texto t="rotulo" cor={pronto ? Cores.destaque : Cores.textoApagado} numberOfLines={1}>{pronto ? `${duracao(c)} min` : 'Em produção'}</Texto>
                <View style={styles.seloLinha}>{lab ? <Selo texto="Interativo" cor={Cores.dourado} /> : null}</View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </TelaCheia>
  );
}

const styles = StyleSheet.create({
  textoHero: { position: 'absolute', left: GUTTER, right: GUTTER, bottom: 10, gap: 8 },
  botao: { alignSelf: 'flex-start', minHeight: 46, paddingHorizontal: 22, borderRadius: 23, backgroundColor: Cores.texto, justifyContent: 'center', marginTop: 4 },
  episodio: { height: 101, alignItems: 'center', flexDirection: 'row', gap: Espaco.md, padding: 10, borderRadius: 14, borderWidth: 1, borderColor: Cores.linha, backgroundColor: 'rgba(6,10,18,0.6)' },
  seloLinha: { height: 20, flexDirection: 'row' },
  coluna2: { flex: 1, height: 79, gap: 4, overflow: 'hidden' },
  titulo: { height: 36 },
  miniatura: { width: 140, height: 79, flexShrink: 0, borderRadius: 8, overflow: 'hidden', backgroundColor: '#000', ...BordaCapa },
  feito: { position: 'absolute', right: 6, bottom: 6, width: 22, height: 22, borderRadius: 11, backgroundColor: Cores.acerto, alignItems: 'center', justifyContent: 'center' },
});
