import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MolduraMidia } from '@/components/midia/moldura';
import { Opcoes } from '@/components/midia/opcoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import { COMANDO } from '@/data/comando-sistemas';

// Explorador "Comando nervoso e hormonal na altitude", um por voo de Sistemas (inclusão autorizada pelo autor em
// 16/11/2026). Os textos vêm de src/data/comando-sistemas.ts, os mesmos da tabela do tópico de abertura de cada voo.
// Fisiologia: Guyton & Hall, Tratado de Fisiologia Médica; West, Fisiologia Respiratória; Ernsting's Aviation and Space Medicine.

function Bloco({ rotulo, cor, texto }: { rotulo: string; cor: string; texto: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Texto t="rotulo" cor={Cores.textoApagado}>{rotulo}</Texto>
      <View style={[styles.marca, { borderLeftColor: cor }]}>
        <Texto>{texto}</Texto>
      </View>
    </View>
  );
}

export function ComandoSistema({ chave }: { chave: string }) {
  const dado = COMANDO[chave];
  const [i, setI] = useState(0);
  if (!dado) return null;
  const [, onde, efeito] = dado.linhas[i];
  return (
    <MolduraMidia tipo="Explorador" titulo={dado.titulo} instrucao="Escolha o comando para ver onde ele nasce, como chega ao órgão e o que a hipóxia e a baixa pressão fazem com ele.">
      <Opcoes itens={dado.linhas.map((l, j) => [j, l[0]] as [number, string])} valor={i} onChange={setI} />
      <Bloco rotulo="Onde nasce e como chega" cor={Cores.destaque} texto={onde} />
      <Bloco rotulo="O que a hipóxia e a baixa pressão fazem" cor={Cores.dourado} texto={efeito} />
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  marca: { gap: 2, paddingLeft: Espaco.sm, borderLeftWidth: 2 },
});
