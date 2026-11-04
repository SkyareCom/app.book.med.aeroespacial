import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Barra, CartaoImagem, Painel } from '@/components/cartoes';
import { ListaEspeciais } from '@/components/especiais';
import { NOME_MIDIA } from '@/components/midia';
import { ResumoRanking } from '@/components/ranking';
import { Selo } from '@/components/selo';
import { CartaoEpisodio, Destaques, duracao, Fileira, GUTTER, rotaEpisodio, type ItemDestaque } from '@/components/streaming';
import { TelaCheia } from '@/components/tela';
import { InstalarApp } from '@/components/instalar-app';
import { Texto } from '@/components/texto';
import { ArteAdaptacao, ArteEspecialVoo, ArteTemporada, CapaEpisodio } from '@/constants/capas';
import { Imagens } from '@/constants/imagens';
import { BordaCapa, Cores, Espaco } from '@/constants/theme';
import { eras } from '@/data/historia';
import { fasesAdaptacao } from '@/data/adaptacao';
import { chaveCapitulo, interativosDe, obterCapitulo, obterSecao, secoes, totalCapitulos } from '@/data/secoes';
import { obterEspecial } from '@/lib/especiais';
import { catalogoLab } from '@/lib/laboratorio';
import { useProgresso } from '@/state/progresso';

// Fileira do laboratório na Home: um interativo de cada voo (ou card especial), com a capa de onde ele vem.
function amostraLab() {
  const vistos = new Set<string>();
  return catalogoLab().filter((i) => (vistos.has(i.codigo + i.titulo) ? false : (vistos.add(i.codigo + i.titulo), true)));
}

export default function Home() {
  const router = useRouter();
  const { concluidos, ultimos } = useProgresso();
  const pctGeral = concluidos.length / totalCapitulos;

  // Destaques: textos e números vêm dos mesmos dados dos cards (src/lib/especiais.ts e src/data/secoes.ts).
  const destaques: ItemDestaque[] = useMemo(() => {
    const hist = obterEspecial('historia');
    const adap = obterEspecial('adaptacao');
    const lab = obterEspecial('laboratorio');
    const m2v1 = obterCapitulo('sistemas', 1)!;
    const espaco = obterSecao('espaco')!;
    return [
      { id: 'voo', imagem: hist.imagem, rotulo: hist.tipo, titulo: hist.titulo, sinopse: hist.sinopse, meta: hist.meta(), botao: 'Decolar', onPress: () => router.push(hist.rota) },
      { id: 'hipoxia', imagem: CapaEpisodio['sistemas-1'], rotulo: 'Missão 2 · Voo 1', titulo: m2v1.titulo, sinopse: 'A falta de oxigênio é silenciosa: o cérebro sente antes de você perceber. Com simuladores, prazos para voltar a voar e o formulário de liberação no fim da missão.', meta: `${duracao(m2v1)} min · ${interativosDe(m2v1)} interativos`, botao: 'Decolar', onPress: () => router.push(rotaEpisodio('sistemas', 1)) },
      { id: 'adaptacao', imagem: adap.imagem, rotulo: adap.tipo, titulo: adap.titulo, sinopse: adap.sinopse, meta: adap.meta(), botao: 'Abrir', onPress: () => router.push(adap.rota) },
      { id: 'espaco', imagem: ArteTemporada.espaco, rotulo: `Missão ${espaco.numeral}`, titulo: espaco.titulo, sinopse: espaco.sinopse, meta: `${espaco.capitulos.length} voos`, botao: 'Ver missão', onPress: () => router.push('/espaco') },
      { id: 'lab', imagem: lab.imagem, rotulo: lab.tipo, titulo: lab.titulo, sinopse: lab.sinopse, meta: lab.meta(), botao: 'Abrir', onPress: () => router.push(lab.rota) },
    ];
  }, [router]);


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
      </View>

      <InstalarApp margem={GUTTER} />

      <Fileira titulo={continuar.length ? 'Continue de onde parou' : 'Comece por aqui'}>
        {(continuar.length ? continuar : [{ s: obterSecao('conceitos')!, c: obterCapitulo('conceitos', 1)! }]).map(({ s, c }) => (
          <CartaoEpisodio key={`${s.id}-${c.numero}`} secao={s} capitulo={c} largura={260} />
        ))}
      </Fileira>

      <View style={{ paddingHorizontal: GUTTER }}>
        <Painel>
          <View style={styles.linhaEntre}>
            <Texto t="rotulo" cor={Cores.destaque}>Sua evolução</Texto>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: Espaco.md }}>
            <Texto t="titulo">{Math.round(pctGeral * 100)}%</Texto>
            <Texto cor={Cores.textoApagado}>{concluidos.length} de {totalCapitulos} voos concluídos</Texto>
          </View>
          <Barra valor={pctGeral} />
          <Link href="/perfil" asChild>
            <Pressable accessibilityRole="link" accessibilityLabel="Ver ranking de conhecimento">
              <ResumoRanking />
            </Pressable>
          </Link>
          <View style={styles.grade}>
            {secoes.map((s) => {
              const feitos = s.capitulos.filter((c) => concluidos.includes(chaveCapitulo(s.id, c.numero))).length;
              return (
                <View key={s.id} style={styles.celula}>
                  <View style={styles.linhaEntre}>
                    <Texto>Missão {s.numeral} · {s.titulo}</Texto>
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
        <Fileira key={s.id} rotulo={`Missão ${s.numeral}`} titulo={s.titulo} acao="Ver todos" onAcao={() => router.push(`/${s.id}`)}>
          {s.capitulos.map((c) => (
            <CartaoEpisodio key={c.numero} secao={s} capitulo={c} />
          ))}
        </Fileira>
      ))}

      <Fileira rotulo="Missão especial" titulo="O Voo e a Medicina" acao="Abrir" onAcao={() => router.push('/historia')}>
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

      <Fileira rotulo="Missão especial" titulo="Adaptação à altitude" acao="Abrir" onAcao={() => router.push('/adaptacao')}>
        {fasesAdaptacao.map((f, i) => (
          <Pressable key={f.id} accessibilityRole="button" onPress={() => router.push('/adaptacao')} style={{ width: 200, gap: 6 }}>
            <View style={styles.capaEra}>
              <Image source={ArteAdaptacao} style={[StyleSheet.absoluteFill, { transform: [{ scale: 1.2 + i * 0.12 }] }]} contentFit="cover" />
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill} />
              <View style={{ position: 'absolute', left: 10, bottom: 8 }}>
                <Texto t="rotulo" cor={Cores.dourado}>{f.periodo}</Texto>
              </View>
            </View>
            <Texto t="item" numberOfLines={2}>{f.titulo}</Texto>
          </Pressable>
        ))}
      </Fileira>

      <Fileira rotulo={obterEspecial('laboratorio').tipo} titulo={obterEspecial('laboratorio').titulo} acao="Abrir" onAcao={() => router.push('/laboratorio')}>
        {amostraLab().map((m) => (
          <Pressable key={m.midia} accessibilityRole="button" onPress={() => router.push({ pathname: '/laboratorio', params: { midia: m.midia } })} style={{ width: 170, gap: 6 }}>
            <View style={styles.capaLab}>
              <Image source={m.capa === 'adaptacao' ? ArteAdaptacao : CapaEpisodio[m.capa]} style={StyleSheet.absoluteFill} contentFit="cover" />
              <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.75)']} style={StyleSheet.absoluteFill} />
              <View style={{ position: 'absolute', left: 10, top: 8 }}>
                <Selo texto="Interativo" cor={Cores.dourado} />
              </View>
              <View style={{ position: 'absolute', left: 10, bottom: 6 }}>
                <Texto t="rotulo" cor={Cores.texto} semTraducao>{m.codigo === 'Especial' ? '' : m.codigo}</Texto>
              </View>
            </View>
            <Texto t="item" numberOfLines={2}>{NOME_MIDIA[m.midia]}</Texto>
          </Pressable>
        ))}
      </Fileira>

      <View style={[styles.grade, { paddingHorizontal: GUTTER }]}>
        <CartaoImagem imagem={Imagens.quiz} altura={130} style={styles.celula} onPress={() => router.push({ pathname: '/teste', params: { origem: 'geral', modo: 'quiz' } })} rotuloAcessivel="Abrir modo quiz">
          <Texto t="item">Modo quiz</Texto>
          <Texto cor={Cores.textoSuave}>Explicação a cada resposta e XP por dificuldade</Texto>
        </CartaoImagem>
        <CartaoImagem imagem={Imagens.prova} altura={130} style={styles.celula} onPress={() => router.push({ pathname: '/teste', params: { origem: 'geral', modo: 'prova' } })} rotuloAcessivel="Abrir modo prova">
          <Texto t="item">Modo prova</Texto>
          <Texto cor={Cores.textoSuave}>Simulado cronometrado: cada acerto vale XP em dobro</Texto>
        </CartaoImagem>
      </View>

      {/* Ferramentas e extras: os mesmos cards das páginas das missões e dos voos (src/lib/especiais.ts). */}
      <View style={{ paddingHorizontal: GUTTER }}>
        <ListaEspeciais rotulo="Ferramentas e extras" itens={(['exame-cma', 'liberacao-voo', 'curiosidades', 'referencias'] as const).map(obterEspecial)} />
      </View>
    </TelaCheia>
  );
}

const styles = StyleSheet.create({
  linhaEntre: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  celula: { flexBasis: '45%', flexGrow: 1, gap: 4 },
  capaEra: { height: 112, borderRadius: 10, overflow: 'hidden', backgroundColor: '#000', ...BordaCapa },
  capaLab: { height: 96, borderRadius: 10, overflow: 'hidden', backgroundColor: '#000', ...BordaCapa },
});
