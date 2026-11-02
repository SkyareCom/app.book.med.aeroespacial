import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { CartaoImagem } from '@/components/cartoes';
import { IconeSeta } from '@/components/icones';
import { Selo } from '@/components/selo';
import { CartaoEpisodio, Fileira, GUTTER } from '@/components/streaming';
import { Texto } from '@/components/texto';
import { BordaCapa, Cores, Espaco } from '@/constants/theme';
import { obterSecao } from '@/data/secoes';
import { obterEspecial, RELACIONADOS, voosDoEspecial, type Especial, type IdEspecial } from '@/lib/especiais';

// Card padrão de um especial ou ferramenta: o mesmo em todas as telas (Home, missão, voo e páginas especiais).
export function CartaoEspecial({ e, altura = 170 }: { e: Especial; altura?: number }) {
  const router = useRouter();
  return (
    <CartaoImagem imagem={e.imagem} altura={altura} style={BordaCapa} onPress={() => router.push(e.rota)} rotuloAcessivel={`Abrir ${e.titulo}`}>
      <Selo texto={e.tipo} cor={Cores.dourado} />
      <Texto t="item">{e.titulo}</Texto>
      <Texto cor={Cores.textoSuave} numberOfLines={3}>{e.sinopse}</Texto>
      <View style={styles.linha}>
        <Texto t="rotulo" cor={Cores.textoApagado}>{e.meta()}</Texto>
        <View style={styles.abrir}>
          <Texto t="rotulo" cor={Cores.dourado}>Abrir</Texto>
          <IconeSeta cor={Cores.dourado} tamanho={16} />
        </View>
      </View>
    </CartaoImagem>
  );
}

export function ListaEspeciais({ rotulo, itens }: { rotulo: string; itens: Especial[] }) {
  if (!itens.length) return null;
  return (
    <View style={{ gap: Espaco.md }}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
      {itens.map((e) => (
        <CartaoEspecial key={e.id} e={e} />
      ))}
    </View>
  );
}

// Fileira com os voos ligados (chaves 'secao-numero'), com a mesma capa de episódio do resto do app.
export function VoosLigados({ chaves, titulo = 'Voos ligados' }: { chaves: string[]; titulo?: string }) {
  const itens = chaves
    .map((k) => {
      const [sid, n] = k.split('-');
      const s = obterSecao(sid);
      const c = s?.capitulos.find((x) => x.numero === Number(n));
      return s && c ? { s, c } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);
  if (!itens.length) return null;
  return (
    <View style={{ marginHorizontal: -GUTTER }}>
      <Fileira titulo={titulo}>
        {itens.map(({ s, c }) => (
          <CartaoEpisodio key={`${s.id}-${c.numero}`} secao={s} capitulo={c} largura={200} />
        ))}
      </Fileira>
    </View>
  );
}

// Fim de cada página especial: voos ligados e os outros especiais relacionados.
export function RelacionadosEspecial({ id }: { id: IdEspecial }) {
  const e = obterEspecial(id);
  return (
    <View style={{ gap: Espaco.lg }}>
      <VoosLigados chaves={voosDoEspecial(e)} />
      <ListaEspeciais rotulo="Veja também" itens={(RELACIONADOS[id] ?? []).map(obterEspecial)} />
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  abrir: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
