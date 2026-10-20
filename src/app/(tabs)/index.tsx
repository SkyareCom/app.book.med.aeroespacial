import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Barra, CartaoImagem, Painel } from '@/components/cartoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { ImagemSecao, Imagens } from '@/constants/imagens';
import { Cores, Espaco } from '@/constants/theme';
import { curiosidades, simuladores } from '@/data/extras';
import { chaveCapitulo, secoes, totalCapitulos } from '@/data/secoes';
import { nivelPorConcluidos, useProgresso } from '@/state/progresso';

export default function Home() {
  const router = useRouter();
  const { concluidos } = useProgresso();
  const [curiosidade, setCuriosidade] = useState(0);

  const pctGeral = concluidos.length / totalCapitulos;

  return (
    <Tela>
      <View style={styles.topo}>
        <View style={{ gap: 2 }}>
          <Texto t="rotulo" cor={Cores.destaque}>App-book · Medicina Aeroespacial</Texto>
          <Texto t="titulo">Bom voo</Texto>
        </View>
      </View>

      <CartaoImagem imagem={Imagens.hero} altura={250}>
        <Texto t="rotulo" cor={Cores.destaque}>Bem-vindo a bordo</Texto>
        <Texto t="titulo">O corpo humano além do chão</Texto>
        <Texto cor={Cores.textoSuave}>Da atmosfera à órbita: fisiologia, clínica, operação e espaço em um só lugar.</Texto>
      </CartaoImagem>

      <CartaoImagem imagem={Imagens.voo} altura={112} direcao="esquerda" onPress={() => router.push('/historia')} rotuloAcessivel="Abrir O Voo e a Medicina">
        <Texto t="rotulo" cor={Cores.dourado}>Especial · 1783 → hoje</Texto>
        <Texto t="titulo">O Voo e a Medicina</Texto>
        <Texto cor={Cores.textoSuave}>20 eventos que mudaram a história</Texto>
      </CartaoImagem>

      <Painel>
        <View style={styles.linhaEntre}>
          <Texto t="rotulo" cor={Cores.destaque}>Sua evolução</Texto>
          <Texto t="rotulo" cor={Cores.textoApagado}>Nível · {nivelPorConcluidos(concluidos.length)}</Texto>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: Espaco.md }}>
          <Texto t="titulo">{Math.round(pctGeral * 100)}%</Texto>
          <Texto cor={Cores.textoApagado}>{concluidos.length} de {totalCapitulos} capítulos concluídos</Texto>
        </View>
        <Barra valor={pctGeral} />
        <View style={styles.grade}>
          {secoes.map((s) => {
            const feitos = s.capitulos.filter((c) => concluidos.includes(chaveCapitulo(s.id, c.numero))).length;
            const pct = feitos / s.capitulos.length;
            return (
              <View key={s.id} style={styles.celula}>
                <View style={styles.linhaEntre}>
                  <Texto>{s.titulo}</Texto>
                  <Texto cor={Cores.textoApagado}>{Math.round(pct * 100)}%</Texto>
                </View>
                <Barra valor={pct} altura={2} />
              </View>
            );
          })}
        </View>
      </Painel>

      <View style={styles.grade}>
        {secoes.map((s) => (
          <CartaoImagem
            key={s.id}
            imagem={ImagemSecao[s.id]}
            altura={150}
            style={styles.celula}
            onPress={() => router.push(`/${s.id}`)}
            rotuloAcessivel={`Abrir seção ${s.titulo}`}>
            <Texto t="rotulo" cor={Cores.destaque}>Seção {s.numeral}</Texto>
            <Texto t="item">{s.titulo}</Texto>
            <Texto cor={Cores.textoSuave}>{s.capitulos.length} capítulos</Texto>
          </CartaoImagem>
        ))}
      </View>

      <CartaoImagem imagem={Imagens.lab} altura={140} direcao="topo" onPress={() => router.push('/laboratorio')} rotuloAcessivel="Abrir Laboratório Aeroespacial">
        <Texto t="rotulo" cor={Cores.destaque}>Laboratório aeroespacial</Texto>
        <Texto t="titulo">Simule o corpo em voo</Texto>
        <View style={styles.chips}>
          {simuladores.slice(0, 3).map((sim) => (
            <View key={sim.id} style={styles.chip}>
              <Texto t="rotulo">{sim.curto}</Texto>
            </View>
          ))}
        </View>
      </CartaoImagem>

      <View style={styles.grade}>
        <CartaoImagem imagem={Imagens.quiz} altura={130} style={styles.celula} onPress={() => router.push({ pathname: '/teste', params: { origem: 'geral', modo: 'quiz' } })} rotuloAcessivel="Abrir modo quiz">
          <Texto t="item">Modo quiz</Texto>
          <Texto cor={Cores.textoSuave}>Treine com explicação a cada resposta</Texto>
        </CartaoImagem>
        <CartaoImagem imagem={Imagens.prova} altura={130} style={styles.celula} onPress={() => router.push({ pathname: '/teste', params: { origem: 'geral', modo: 'prova' } })} rotuloAcessivel="Abrir modo prova">
          <Texto t="item">Modo prova</Texto>
          <Texto cor={Cores.textoSuave}>Simulado cronometrado com nota final</Texto>
        </CartaoImagem>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Próxima curiosidade" onPress={() => setCuriosidade((i) => (i + 1) % curiosidades.length)}>
        <CartaoImagem imagem={Imagens.curiosidades} altura={140} direcao="topo">
          <View style={styles.linhaEntre}>
            <Texto t="rotulo" cor={Cores.destaque}>Curiosidades aeronáuticas</Texto>
            <Texto t="rotulo" cor={Cores.textoApagado}>{curiosidade + 1}/{curiosidades.length}</Texto>
          </View>
          <Texto t="item">{curiosidades[curiosidade]}</Texto>
        </CartaoImagem>
      </Pressable>
    </Tela>
  );
}

const styles = StyleSheet.create({
  topo: { minHeight: 44, justifyContent: 'center' },
  linhaEntre: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  celula: { flexBasis: '45%', flexGrow: 1, gap: 4 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 'auto' },
  chip: { paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, borderWidth: 1, borderColor: Cores.linha, backgroundColor: 'rgba(3,5,10,0.5)' },
});
