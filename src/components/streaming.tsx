// Peças da navegação em estilo série: fileiras horizontais, capas de episódio e destaques rotativos.

import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type ScrollViewInstance } from 'react-native';

import { IconeCheck } from '@/components/icones';
import { Texto } from '@/components/texto';
import { CapaEpisodio } from '@/constants/capas';
import { Cores, Espaco, LarguraMaxima, TituloDestaque, BordaCapa } from '@/constants/theme';
import { chaveCapitulo } from '@/data/secoes';
import type { Capitulo, Secao } from '@/data/tipos';
import { useProgresso } from '@/state/progresso';
import { useLarguraJanela } from '@/hooks/use-largura-janela';

export const GUTTER = Espaco.lg;

export function duracao(c: Capitulo) {
  return c.tempoLeituraMin ?? c.topicos.length * 5;
}

export function disponivel(c: Capitulo) {
  return c.topicos.some((t) => t.conteudo);
}

export function rotaEpisodio(secao: string, numero: number) {
  return { pathname: '/capitulo/[secao]/[numero]' as const, params: { secao, numero: String(numero) } };
}

// Fileira horizontal com título, como as fileiras de um catálogo de séries.
export function Fileira({ titulo, rotulo, acao, onAcao, children }: { titulo: string; rotulo?: string; acao?: string; onAcao?: () => void; children: ReactNode }) {
  return (
    <View style={{ gap: Espaco.sm }}>
      <View style={styles.cabecalhoFileira}>
        <View style={{ flex: 1, gap: 2 }}>
          {rotulo ? <Texto t="rotulo" cor={Cores.destaque}>{rotulo}</Texto> : null}
          <Texto t="titulo">{titulo}</Texto>
        </View>
        {acao && onAcao ? (
          <Pressable accessibilityRole="button" onPress={onAcao} style={styles.acao}>
            <Texto t="rotulo" cor={Cores.textoApagado}>{acao}</Texto>
          </Pressable>
        ) : null}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: GUTTER, gap: 10 }}>
        {children}
      </ScrollView>
    </View>
  );
}

export function CartaoEpisodio({ secao, capitulo, largura = 230 }: { secao: Secao; capitulo: Capitulo; largura?: number }) {
  const router = useRouter();
  const { concluidos } = useProgresso();
  const feito = concluidos.includes(chaveCapitulo(secao.id, capitulo.numero));
  const pronto = disponivel(capitulo);
  const temLab = !!capitulo.laboratorio?.length || capitulo.topicos.some((t) => t.midias?.length);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Temporada ${secao.numeral}, episódio ${capitulo.numero}: ${capitulo.titulo}`}
      onPress={() => router.push(rotaEpisodio(secao.id, capitulo.numero))}
      style={({ pressed }) => [{ width: largura, gap: 6 }, pressed && { opacity: 0.85 }]}>
      <View style={[styles.capa, { height: largura * 0.5625 }]}>
        <Image source={CapaEpisodio[`${secao.id}-${capitulo.numero}`]} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']} start={{ x: 0, y: 0.45 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill} />
        <View style={styles.selos}>
          {pronto ? <Selo texto="Disponível" cor={Cores.destaque} /> : null}
          {temLab ? <Selo texto="Interativo" cor={Cores.dourado} /> : null}
        </View>
        <View style={styles.rodapeCapa}>
          <Texto t="rotulo" cor={Cores.texto}>Ep {String(capitulo.numero).padStart(2, '0')}</Texto>
          {feito ? <IconeCheck cor={Cores.acerto} tamanho={16} /> : null}
        </View>
        {feito ? <View style={styles.progresso} /> : null}
      </View>
      <Texto t="item" numberOfLines={2} style={TituloDestaque}>{capitulo.titulo}</Texto>
      <Texto cor={Cores.textoApagado}>{pronto ? `${duracao(capitulo)} min` : 'Em produção'}</Texto>
    </Pressable>
  );
}

export function Selo({ texto, cor }: { texto: string; cor: string }) {
  return (
    <View style={[styles.selo, { borderColor: cor }]}>
      <Texto t="rotulo" cor={cor}>{texto}</Texto>
    </View>
  );
}

export interface ItemDestaque {
  id: string;
  imagem: number;
  rotulo: string;
  titulo: string;
  sinopse: string;
  meta: string;
  botao: string;
  onPress: () => void;
}

// Destaques rotativos no topo da Home, com troca automática a cada 7 segundos.
export function Destaques({ itens, altura = 460 }: { itens: ItemDestaque[]; altura?: number }) {
  const width = useLarguraJanela();
  const larg = Math.min(width, LarguraMaxima);
  const [ativo, setAtivo] = useState(0);
  const ref = useRef<ScrollViewInstance>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setAtivo((a) => {
        const prox = (a + 1) % itens.length;
        ref.current?.scrollTo({ x: prox * larg, animated: true });
        return prox;
      });
    }, 7000);
    return () => clearInterval(id);
  }, [itens.length, larg]);

  return (
    <View style={{ height: altura, width: larg, alignSelf: 'center' }}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setAtivo(Math.round(e.nativeEvent.contentOffset.x / larg))}>
        {itens.map((it) => (
          <View key={it.id} style={{ width: larg, height: altura }}>
            <Image source={it.imagem} style={StyleSheet.absoluteFill} contentFit="cover" transition={300} />
            <LinearGradient colors={['rgba(3,5,10,0.55)', 'rgba(3,5,10,0)', 'rgba(3,5,10,0.15)', Cores.fundo]} locations={[0, 0.25, 0.55, 1]} style={StyleSheet.absoluteFill} />
            <View style={styles.textoDestaque}>
              <Texto t="rotulo" cor={Cores.dourado}>{it.rotulo}</Texto>
              <Texto t="titulo" style={{ textShadowColor: 'rgba(0,0,0,0.7)', textShadowRadius: 12 }}>{it.titulo}</Texto>
              <Texto cor={Cores.textoSuave} numberOfLines={3}>{it.sinopse}</Texto>
              <Texto t="rotulo" cor={Cores.textoApagado}>{it.meta}</Texto>
              <Pressable accessibilityRole="button" onPress={it.onPress} style={({ pressed }) => [styles.botaoDestaque, pressed && { opacity: 0.85 }]}>
                <Texto t="item" maiusculo espacado cor={Cores.fundo}>▶  {it.botao}</Texto>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pontos}>
        {itens.map((it, i) => (
          <View key={it.id} style={[styles.ponto, i === ativo && styles.pontoAtivo]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalhoFileira: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: GUTTER, gap: Espaco.md },
  acao: { minHeight: 44, justifyContent: 'flex-end', paddingBottom: 2 },
  capa: { borderRadius: 10, overflow: 'hidden', backgroundColor: '#000', ...BordaCapa },
  selos: { position: 'absolute', top: 8, left: 8, flexDirection: 'row', gap: 6 },
  selo: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 6, borderWidth: 1, backgroundColor: 'rgba(3,5,10,0.65)' },
  rodapeCapa: { position: 'absolute', left: 10, right: 10, bottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progresso: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, backgroundColor: Cores.acerto },
  textoDestaque: { position: 'absolute', left: GUTTER, right: GUTTER, bottom: 34, gap: 8 },
  botaoDestaque: { alignSelf: 'flex-start', minHeight: 46, paddingHorizontal: 22, borderRadius: 23, backgroundColor: Cores.texto, justifyContent: 'center', marginTop: 4 },
  pontos: { position: 'absolute', bottom: 12, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 6 },
  ponto: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)' },
  pontoAtivo: { width: 18, backgroundColor: Cores.destaque },
});
