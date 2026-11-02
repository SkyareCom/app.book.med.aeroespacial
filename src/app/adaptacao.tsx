import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { CartaoImagem, Painel } from '@/components/cartoes';
import { RelacionadosEspecial } from '@/components/especiais';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { TextoCorrente } from '@/components/texto-corrente';
import { ArteAdaptacao } from '@/constants/capas';
import { BordaCapa, Cores, Espaco, TituloDestaque } from '@/constants/theme';
import { fasesAdaptacao } from '@/data/adaptacao';

// Card especial "Adaptação à altitude": a resposta do corpo à falta de oxigênio, dos segundos aos meses.
// Conteúdo e fontes em src/data/adaptacao.ts. O teste fica no final, como nos voos.

export default function Adaptacao() {
  const router = useRouter();
  return (
    <Tela titulo="Adaptação à altitude" rotulo="Missão especial · do minuto aos meses">
      <CartaoImagem imagem={ArteAdaptacao} altura={170} style={BordaCapa}>
        <Texto t="titulo">Como o corpo se adapta</Texto>
        <Texto cor={Cores.textoSuave}>Respiração, coração, vasos, sangue e rins respondem à falta de oxigênio em tempos diferentes: segundos no voo, dias na montanha.</Texto>
      </CartaoImagem>

      {fasesAdaptacao.map((f, i) => (
        <Painel key={f.id} style={styles.fase}>
          <View style={{ gap: 2 }}>
            <Texto t="rotulo" cor={Cores.destaque}>{`Fase ${i + 1}`}</Texto>
            <Texto t="rotulo" cor={Cores.dourado}>{f.periodo}</Texto>
            <Texto t="titulo" style={TituloDestaque}>{f.titulo}</Texto>
            <Texto cor={Cores.textoApagado}>{f.pergunta}</Texto>
          </View>
          <TextoCorrente texto={f.texto} recursos={f.recursos} />
        </Painel>
      ))}

      <BotaoPrincipal rotulo="Teste o conhecimento" onPress={() => router.push({ pathname: '/teste', params: { origem: 'adaptacao', modo: 'quiz' } })} />
      <RelacionadosEspecial id="adaptacao" />
    </Tela>
  );
}

const styles = StyleSheet.create({
  fase: { gap: Espaco.md },
});
