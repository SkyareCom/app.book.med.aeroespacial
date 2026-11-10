import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CartaoImagem } from '@/components/cartoes';
import { RelacionadosEspecial } from '@/components/especiais';
import { Midia, NOME_MIDIA } from '@/components/midia';
import { Opcoes } from '@/components/midia/opcoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { ArteAdaptacao, ArteDeficiencias, CapaEpisodio } from '@/constants/capas';
import { BordaCapa, Cores, Espaco, Raio } from '@/constants/theme';
import type { TipoMidia } from '@/data/tipos';
import { obterEspecial } from '@/lib/especiais';
import { catalogoLab } from '@/lib/laboratorio';

// Laboratório aeroespacial: todos os interativos do app (src/lib/laboratorio.ts), por missão, cada um com o voo de
// origem. Um interativo novo num voo aparece aqui sozinho.
export default function Laboratorio() {
  const router = useRouter();
  const { midia } = useLocalSearchParams<{ midia?: string }>();
  const catalogo = useMemo(() => catalogoLab(), []);
  const grupos = useMemo(() => [...new Set(catalogo.map((i) => i.grupo))], [catalogo]);
  const inicial = catalogo.find((i) => i.midia === midia) ?? catalogo[0];
  const [grupo, setGrupo] = useState(inicial.grupo);
  const [ativo, setAtivo] = useState<TipoMidia>(inicial.midia);
  const doGrupo = catalogo.filter((i) => i.grupo === grupo);
  const item = catalogo.find((i) => i.midia === ativo) ?? doGrupo[0];
  const lab = obterEspecial('laboratorio');

  return (
    <Tela titulo="Laboratório aeroespacial" rotulo={lab.meta()}>
      <CartaoImagem imagem={lab.imagem} altura={130} style={BordaCapa}>
        <Texto t="item">{lab.titulo}</Texto>
        <Texto cor={Cores.textoSuave}>{lab.sinopse}</Texto>
      </CartaoImagem>

      <Opcoes
        itens={grupos.map((g) => [g, g] as [string, string])}
        valor={grupo}
        onChange={(g) => {
          setGrupo(g);
          setAtivo(catalogo.find((i) => i.grupo === g)!.midia);
        }}
        colunas={1}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: Espaco.sm }}>
        {doGrupo.map((i) => (
          <Pressable key={i.midia} accessibilityRole="tab" accessibilityState={{ selected: ativo === i.midia }} onPress={() => setAtivo(i.midia)} style={[styles.chip, ativo === i.midia && styles.chipAtivo]}>
            <Texto t="rotulo" cor={ativo === i.midia ? Cores.fundo : Cores.texto}>{NOME_MIDIA[i.midia]}</Texto>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable accessibilityRole="link" onPress={() => router.push(item.rota as never)} style={styles.origem}>
        <Image source={item.capa === 'adaptacao' ? ArteAdaptacao : item.capa === 'deficiencias' ? ArteDeficiencias : CapaEpisodio[item.capa]} style={[styles.miniatura, BordaCapa]} contentFit="cover" />
        <View style={{ flex: 1, gap: 2 }}>
          <Texto t="rotulo" cor={Cores.destaque} semTraducao={item.codigo !== 'Especial'}>{item.codigo === 'Especial' ? 'Missão especial' : item.codigo}</Texto>
          <Texto t="item" numberOfLines={2}>{item.titulo}</Texto>
        </View>
        <Texto t="rotulo" cor={Cores.dourado}>{item.codigo === 'Especial' ? 'Abrir' : 'Ir ao voo'}</Texto>
      </Pressable>

      <View key={item.midia}>
        <Midia tipo={item.midia} />
      </View>

      <RelacionadosEspecial id="laboratorio" />
    </Tela>
  );
}

const styles = StyleSheet.create({
  chip: { minHeight: 40, paddingHorizontal: 14, borderRadius: Raio, borderWidth: 1, borderColor: Cores.linha, justifyContent: 'center', backgroundColor: 'rgba(3,5,10,0.6)' },
  chipAtivo: { backgroundColor: Cores.destaque, borderColor: Cores.destaque },
  origem: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md, padding: 10, borderRadius: 14, borderWidth: 1, borderColor: Cores.linha, backgroundColor: 'rgba(6,10,18,0.6)' },
  miniatura: { width: 96, height: 54, borderRadius: 8, overflow: 'hidden' },
});
