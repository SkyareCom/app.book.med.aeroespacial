import { View } from 'react-native';

import { Painel } from '@/components/cartoes';
import { RelacionadosEspecial } from '@/components/especiais';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores } from '@/constants/theme';
import { REFERENCIAS } from '@/data/referencias';

// Referências: lista única das obras, normas e estudos usados em todo o app, no estilo Vancouver, numerada em sequência.
export default function Referencias() {
  let n = 0;
  return (
    <Tela titulo="Referências" rotulo="Obras e normas usadas no app">
      <Texto cor={Cores.textoSuave}>Todo o conteúdo do Papos de Altitude é baseado nestas obras e normas.</Texto>
      <Texto cor={Cores.textoApagado}>Referências no estilo Vancouver.</Texto>
      {REFERENCIAS.map((g) => (
        <Painel key={g.rotulo}>
          <Texto t="rotulo" cor={Cores.destaque}>{g.rotulo}</Texto>
          {g.itens.map((r) => {
            n += 1;
            return (
              <View key={r} style={{ flexDirection: 'row', gap: 8 }}>
                <Texto cor={Cores.textoApagado} semTraducao style={{ minWidth: 28 }}>{`${n}.`}</Texto>
                <Texto cor={Cores.textoSuave} style={{ flex: 1 }}>{r}</Texto>
              </View>
            );
          })}
        </Painel>
      ))}
      <RelacionadosEspecial id="referencias" />
    </Tela>
  );
}
