import { View } from 'react-native';

import { CartaoImagem, Painel } from '@/components/cartoes';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Imagens } from '@/constants/imagens';
import { Cores } from '@/constants/theme';
import { curiosidades } from '@/data/extras';

// Curiosidades aeronáuticas: a lista completa fica aqui, fora da Home. Novos conteúdos entram em src/data/extras.ts.
export default function Curiosidades() {
  return (
    <Tela titulo="Curiosidades aeronáuticas" rotulo="Fatos sobre o corpo no céu e no espaço">
      <CartaoImagem imagem={Imagens.curiosidades} altura={140}>
        <Texto t="item">Números, recordes e fenômenos que mostram até onde o corpo humano vai quando sai do chão.</Texto>
      </CartaoImagem>
      {curiosidades.map((c, i) => (
        <Painel key={i}>
          <View style={{ gap: 4 }}>
            <Texto t="rotulo" cor={Cores.dourado}>Curiosidade {String(i + 1).padStart(2, '0')}</Texto>
            <Texto t="item">{c}</Texto>
          </View>
        </Painel>
      ))}
    </Tela>
  );
}
