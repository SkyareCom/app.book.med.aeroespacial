import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { CartaoImagem, Painel } from '@/components/cartoes';
import { RelacionadosEspecial } from '@/components/especiais';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { TextoCorrente } from '@/components/texto-corrente';
import { ArteDeficiencias } from '@/constants/capas';
import { BordaCapa, Cores, Espaco, TituloDestaque } from '@/constants/theme';
import { fasesDeficiencias } from '@/data/deficiencias';

// Missão especial "Deficiências e o voo" (Home): passageiro e tripulante separados, liberação do CMA.
// Conteúdo e fontes em src/data/deficiencias.ts. O teste fica no final, como nos voos.

export default function Deficiencias() {
  const router = useRouter();
  return (
    <Tela titulo="Deficiências e o voo" rotulo="Missão especial · passageiro e tripulante">
      <CartaoImagem imagem={ArteDeficiencias} altura={170} style={BordaCapa}>
        <Texto t="titulo">Voar com uma deficiência</Texto>
        <Texto cor={Cores.textoSuave}>Para o passageiro, acesso e assistência; para o tripulante, função e certificado médico. Amputações, cadeira de rodas, cegueira e cão-guia, visão monocular, surdez, autismo e deficiências ocultas.</Texto>
      </CartaoImagem>

      {fasesDeficiencias.map((f, i) => (
        <Painel key={f.id} style={styles.fase}>
          <View style={{ gap: 2 }}>
            <Texto t="rotulo" cor={Cores.destaque}>{`Tópico ${i + 1}`}</Texto>
            <Texto t="rotulo" cor={Cores.dourado}>{f.periodo}</Texto>
            <Texto t="titulo" style={TituloDestaque}>{f.titulo}</Texto>
            <Texto cor={Cores.textoApagado}>{f.pergunta}</Texto>
          </View>
          <TextoCorrente texto={f.texto} recursos={f.recursos} />
        </Painel>
      ))}

      <BotaoPrincipal rotulo="Teste o conhecimento" onPress={() => router.push({ pathname: '/teste', params: { origem: 'deficiencias', modo: 'quiz' } })} />
      <RelacionadosEspecial id="deficiencias" />
    </Tela>
  );
}

const styles = StyleSheet.create({
  fase: { gap: Espaco.md },
});
