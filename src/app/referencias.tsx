import { View } from 'react-native';

import { Painel } from '@/components/cartoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores } from '@/constants/theme';
import { diretrizes, normas, obras, type Referencia } from '@/data/referencias';
import { RelacionadosEspecial } from '@/components/especiais';

// Referências: lista única das obras e normas usadas em todo o app.
export default function Referencias() {
  return (
    <Tela titulo="Referências" rotulo="Obras e normas usadas no app">
      <Texto cor={Cores.textoSuave}>Todo o conteúdo do Papos de Altitude é baseado nestas obras e normas.</Texto>
      <Lista rotulo="Obras de referência" itens={obras} />
      <Lista rotulo="Normas e autoridades" itens={normas} />
      <Lista rotulo="Diretrizes para passageiros e viajantes" itens={diretrizes} />
      <RelacionadosEspecial id="referencias" />
    </Tela>
  );
}

function Lista({ rotulo, itens }: { rotulo: string; itens: Referencia[] }) {
  return (
    <Painel>
      <Texto t="rotulo" cor={Cores.destaque}>{rotulo}</Texto>
      {itens.map((r) => (
        <View key={r.titulo} style={{ gap: 2 }}>
          <Texto t="item">{r.titulo}</Texto>
          <Texto cor={Cores.textoApagado}>{r.detalhe}</Texto>
        </View>
      ))}
    </Painel>
  );
}
