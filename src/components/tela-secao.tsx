import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { CartaoImagem } from '@/components/cartoes';
import { IconeCheck, IconeSeta } from '@/components/icones';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { ImagemSecao } from '@/constants/imagens';
import { Cores, Espaco, Raio } from '@/constants/theme';
import { chaveCapitulo, obterSecao } from '@/data/secoes';
import type { SecaoId } from '@/data/tipos';
import { useProgresso } from '@/state/progresso';

export function TelaSecao({ id }: { id: SecaoId }) {
  const secao = obterSecao(id)!;
  const router = useRouter();
  const { concluidos } = useProgresso();

  return (
    <Tela>
      <CartaoImagem imagem={ImagemSecao[id]} altura={220}>
        <Texto t="rotulo" cor={Cores.destaque}>Seção {secao.numeral}</Texto>
        <Texto t="titulo">{secao.titulo}</Texto>
        <Texto cor={Cores.textoSuave}>{secao.subtitulo} · {secao.capitulos.length} capítulos</Texto>
      </CartaoImagem>

      <View style={{ gap: Espaco.sm }}>
        {secao.capitulos.map((c) => {
          const feito = concluidos.includes(chaveCapitulo(id, c.numero));
          const pronto = c.topicos.some((t) => t.conteudo);
          return (
            <Pressable
              key={c.numero}
              accessibilityRole="button"
              accessibilityLabel={`Capítulo ${c.numero}: ${c.titulo}`}
              onPress={() => router.push({ pathname: '/capitulo/[secao]/[numero]', params: { secao: id, numero: String(c.numero) } })}
              style={({ pressed }) => [styles.linha, pressed && { opacity: 0.85 }]}>
              <View style={[styles.numero, feito && { backgroundColor: Cores.destaque, borderColor: Cores.destaque }]}>
                {feito ? <IconeCheck cor={Cores.fundo} tamanho={16} /> : <Texto t="item">{String(c.numero).padStart(2, '0')}</Texto>}
              </View>
              <View style={{ flex: 1, gap: 2 }}>
                <Texto t="item">{c.titulo}</Texto>
                <Texto cor={pronto ? Cores.destaque : Cores.textoApagado}>
                  {c.topicos.length} tópicos · {pronto ? `${c.tempoLeituraMin ?? 20} min de leitura` : 'em produção'}
                </Texto>
              </View>
              <IconeSeta cor={Cores.textoApagado} tamanho={18} />
            </Pressable>
          );
        })}
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espaco.md,
    minHeight: 64,
    padding: Espaco.md,
    borderRadius: Raio,
    borderWidth: 1,
    borderColor: Cores.linha,
    backgroundColor: Cores.painel,
  },
  numero: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: Cores.linha, alignItems: 'center', justifyContent: 'center' },
});
