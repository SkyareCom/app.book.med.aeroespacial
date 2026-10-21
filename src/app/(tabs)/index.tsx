import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Barra, CartaoImagem, Painel } from '@/components/cartoes';
import { NOME_MIDIA } from '@/components/midia';
import { CartaoEpisodio, Destaques, Fileira, GUTTER, rotaEpisodio, type ItemDestaque } from '@/components/streaming';
import { TelaCheia } from '@/components/tela';
import { Texto } from '@/components/texto';
import { ArteEspecialVoo, ArteTemporada, CapaEpisodio } from '@/constants/capas';
import { Imagens } from '@/constants/imagens';
import { Cores, Espaco } from '@/constants/theme';
import { curiosidades } from '@/data/extras';
import { eras } from '@/data/historia';
import { chaveCapitulo, obterCapitulo, obterSecao, secoes, totalCapitulos } from '@/data/secoes';
import type { TipoMidia } from '@/data/tipos';
import { nivelPorConcluidos, useProgresso } from '@/state/progresso';

const LABORATORIO: TipoMidia[] = ['simulador-o2', 'simulador-visao', 'forcas-g', 'leis-gases', 'adaptacao-escuro', 'regua-ruido', 'radiacao-voo', 'risco-aeromedico', 'perda-ossea'];
const IMAGEM_LAB: Partial<Record<TipoMidia, string>> = {
  'simulador-o2': 'fisiologia-3',
  'simulador-visao': 'fisiologia-9',
  'forcas-g': 'fisiologia-6',
  'leis-gases': 'fisiologia-5',
  'adaptacao-escuro': 'fisiologia-9',
  'regua-ruido': 'fisiologia-10',
  'radiacao-voo': 'fisiologia-12',
  'risco-aeromedico': 'clinica-1',
  'perda-ossea': 'espaco-2',
};

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { concluidos, ultimos } = useProgresso();
  const [curiosidade, setCuriosidade] = useState(0);
  const pctGeral = concluidos.length / totalCapitulos;

  const destaques: ItemDestaque[] = [
    { id: 'voo', imagem: ArteEspecialVoo, rotulo: 'Série especial', titulo: 'O Voo e a Medicina', sinopse: 'Dos balões de 1783 ao turismo espacial: como cada conquista do céu revelou um novo limite do corpo humano.', meta: '5 eras · 20 eventos', botao: 'Assistir', onPress: () => router.push('/historia') },
    { id: 'hipoxia', imagem: CapaEpisodio['fisiologia-3'], rotulo: 'Temporada I · Episódio 3', titulo: 'Respiração e hipóxia', sinopse: 'A falta de oxigênio é silenciosa: o cérebro sente antes de você perceber. Com simuladores de visão e da curva do oxigênio.', meta: '25 min · 4 interativos', botao: 'Assistir', onPress: () => router.push(rotaEpisodio('fisiologia', 3)) },
    { id: 'espaco', imagem: ArteTemporada.espaco, rotulo: 'Temporada IV', titulo: 'Espaço', sinopse: obterSecao('espaco')!.sinopse, meta: '8 episódios', botao: 'Ver temporada', onPress: () => router.push('/espaco') },
    { id: 'lab', imagem: CapaEpisodio['fisiologia-6'], rotulo: 'Laboratório aeroespacial', titulo: 'Sinta as forças G', sinopse: 'Puxe G, suba sem oxigênio, veja o gás se expandir e calcule a radiação de um ano de voos.', meta: '11 interativos', botao: 'Abrir', onPress: () => router.push('/laboratorio') },
  ];

  const continuar = ultimos
    .map((ch) => {
      const [sid, n] = ch.split('-');
      const s = obterSecao(sid);
      const c = obterCapitulo(sid, Number(n));
      return s && c ? { s, c } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <TelaCheia>
      <View>
        <Destaques itens={destaques} />
        <LinearGradient colors={['rgba(3,5,10,0.85)', 'rgba(3,5,10,0)']} style={[styles.topo, { paddingTop: insets.top + 10 }]}>
          <Image source={Imagens.logo} style={styles.logo} contentFit="contain" accessibilityLabel="Papos de Altitude" />
          <View style={{ gap: 0 }}>
            <Texto t="item" maiusculo espacado>Papos de Altitude</Texto>
            <Texto t="rotulo" cor={Cores.destaque}>Medicina aeroespacial</Texto>
          </View>
        </LinearGradient>
      </View>

      <Fileira titulo={continuar.length ? 'Continue de onde parou' : 'Comece por aqui'}>
        {(continuar.length ? continuar : [{ s: obterSecao('fisiologia')!, c: obterCapitulo('fisiologia', 3)! }]).map(({ s, c }) => (
          <CartaoEpisodio key={`${s.id}-${c.numero}`} secao={s} capitulo={c} largura={260} />
        ))}
      </Fileira>

      <View style={{ paddingHorizontal: GUTTER }}>
        <Painel>
          <View style={styles.linhaEntre}>
            <Texto t="rotulo" cor={Cores.destaque}>Sua evolução</Texto>
            <Texto t="rotulo" cor={Cores.textoApagado}>Nível · {nivelPorConcluidos(concluidos.length)}</Texto>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: Espaco.md }}>
            <Texto t="titulo">{Math.round(pctGeral * 100)}%</Texto>
            <Texto cor={Cores.textoApagado}>{concluidos.length} de {totalCapitulos} episódios concluídos</Texto>
          </View>
          <Barra valor={pctGeral} />
          <View style={styles.grade}>
            {secoes.map((s) => {
              const feitos = s.capitulos.filter((c) => concluidos.includes(chaveCapitulo(s.id, c.numero))).length;
              return (
                <View key={s.id} style={styles.celula}>
                  <View style={styles.linhaEntre}>
                    <Texto>T{s.numeral === 'I' ? 1 : s.numeral === 'II' ? 2 : s.numeral === 'III' ? 3 : 4} · {s.titulo}</Texto>
                    <Texto cor={Cores.textoApagado}>{feitos}/{s.capitulos.length}</Texto>
                  </View>
                  <Barra valor={feitos / s.capitulos.length} altura={2} />
                </View>
              );
            })}
          </View>
        </Painel>
      </View>

      {secoes.map((s) => (
        <Fileira key={s.id} rotulo={`Temporada ${s.numeral}`} titulo={s.titulo} acao="Ver todos" onAcao={() => router.push(`/${s.id}`)}>
          {s.capitulos.map((c) => (
            <CartaoEpisodio key={c.numero} secao={s} capitulo={c} />
          ))}
        </Fileira>
      ))}

      <Fileira rotulo="Série especial" titulo="O Voo e a Medicina" acao="Abrir" onAcao={() => router.push('/historia')}>
        {eras.map((e, i) => (
          <Pressable key={e.id} accessibilityRole="button" onPress={() => router.push('/historia')} style={{ width: 200, gap: 6 }}>
            <View style={styles.capaEra}>
              <Image source={ArteEspecialVoo} style={[StyleSheet.absoluteFill, { transform: [{ scale: 1.2 + i * 0.12 }] }]} contentFit="cover" />
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill} />
              <View style={{ position: 'absolute', left: 10, bottom: 8 }}>
                <Texto t="rotulo" cor={Cores.dourado}>Era {i + 1} · {e.periodo}</Texto>
              </View>
            </View>
            <Texto t="item" numberOfLines={2}>{e.titulo}</Texto>
          </Pressable>
        ))}
      </Fileira>

      <Fileira rotulo="Laboratório aeroespacial" titulo="Simule o corpo em voo" acao="Abrir" onAcao={() => router.push('/laboratorio')}>
        {LABORATORIO.map((m) => (
          <Pressable key={m} accessibilityRole="button" onPress={() => router.push({ pathname: '/laboratorio', params: { midia: m } })} style={{ width: 170, gap: 6 }}>
            <View style={styles.capaLab}>
              <Image source={CapaEpisodio[IMAGEM_LAB[m] ?? 'fisiologia-1']} style={StyleSheet.absoluteFill} contentFit="cover" />
              <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.75)']} style={StyleSheet.absoluteFill} />
              <View style={{ position: 'absolute', left: 10, top: 8 }}>
                <Texto t="rotulo" cor={Cores.dourado}>Interativo</Texto>
              </View>
            </View>
            <Texto t="item" numberOfLines={2}>{NOME_MIDIA[m]}</Texto>
          </Pressable>
        ))}
      </Fileira>

      <View style={[styles.grade, { paddingHorizontal: GUTTER }]}>
        <CartaoImagem imagem={Imagens.quiz} altura={130} style={styles.celula} onPress={() => router.push({ pathname: '/teste', params: { origem: 'geral', modo: 'quiz' } })} rotuloAcessivel="Abrir modo quiz">
          <Texto t="item">Modo quiz</Texto>
          <Texto cor={Cores.textoSuave}>Treine com explicação a cada resposta</Texto>
        </CartaoImagem>
        <CartaoImagem imagem={Imagens.prova} altura={130} style={styles.celula} onPress={() => router.push({ pathname: '/teste', params: { origem: 'geral', modo: 'prova' } })} rotuloAcessivel="Abrir modo prova">
          <Texto t="item">Modo prova</Texto>
          <Texto cor={Cores.textoSuave}>Simulado cronometrado com nota final</Texto>
        </CartaoImagem>
      </View>

      <Pressable style={{ paddingHorizontal: GUTTER }} accessibilityRole="button" accessibilityLabel="Próxima curiosidade" onPress={() => setCuriosidade((i) => (i + 1) % curiosidades.length)}>
        <CartaoImagem imagem={Imagens.curiosidades} altura={140} direcao="topo">
          <View style={styles.linhaEntre}>
            <Texto t="rotulo" cor={Cores.destaque}>Curiosidades aeronáuticas</Texto>
            <Texto t="rotulo" cor={Cores.textoApagado}>{curiosidade + 1}/{curiosidades.length}</Texto>
          </View>
          <Texto t="item">{curiosidades[curiosidade]}</Texto>
        </CartaoImagem>
      </Pressable>
    </TelaCheia>
  );
}

const styles = StyleSheet.create({
  topo: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: GUTTER, paddingBottom: 30 },
  logo: { width: 44, height: 44 },
  linhaEntre: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  celula: { flexBasis: '45%', flexGrow: 1, gap: 4 },
  capaEra: { height: 112, borderRadius: 10, overflow: 'hidden', backgroundColor: '#000' },
  capaLab: { height: 96, borderRadius: 10, overflow: 'hidden', backgroundColor: '#000' },
});
