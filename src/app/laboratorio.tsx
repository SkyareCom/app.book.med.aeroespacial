import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { CartaoImagem, Painel } from '@/components/cartoes';
import { IconeCadeado } from '@/components/icones';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Imagens } from '@/constants/imagens';
import { Cores, Espaco, Raio } from '@/constants/theme';
import { simuladores, tabelaTUC } from '@/data/extras';

export default function Laboratorio() {
  const [altitude, setAltitude] = useState(35000);
  const linha = tabelaTUC.find((l) => l.altitudePes === altitude)!;

  return (
    <Tela titulo="Laboratório aeroespacial" rotulo="Simuladores e calculadoras">
      <CartaoImagem imagem={Imagens.lab} altura={140}>
        <Texto t="item">Experimente o que acontece com o corpo em cada condição de voo.</Texto>
      </CartaoImagem>

      <Painel>
        <Texto t="rotulo" cor={Cores.destaque}>Tempo de consciência útil</Texto>
        <Texto cor={Cores.textoSuave}>Escolha a altitude. O valor mostra quanto tempo, em média, uma pessoa em repouso consegue agir após perder o oxigênio.</Texto>
        <View style={styles.grade}>
          {tabelaTUC.map((l) => {
            const ativo = l.altitudePes === altitude;
            return (
              <Pressable
                key={l.altitudePes}
                accessibilityRole="radio"
                accessibilityState={{ checked: ativo }}
                onPress={() => setAltitude(l.altitudePes)}
                style={[styles.altitude, ativo && { borderColor: Cores.destaque, backgroundColor: 'rgba(111,211,255,0.12)' }]}>
                <Texto cor={ativo ? Cores.destaque : Cores.texto}>{l.altitudePes.toLocaleString('pt-BR')} ft</Texto>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.resultado}>
          <Texto t="rotulo" cor={Cores.textoApagado}>{altitude.toLocaleString('pt-BR')} pés · cerca de {(Math.round((altitude * 0.3048) / 100) * 100).toLocaleString('pt-BR')} m</Texto>
          <Texto t="titulo">{linha.tempo}</Texto>
          <Texto cor={Cores.textoApagado}>Em descompressão rápida, o tempo pode cair para cerca da metade. Fonte: FAA, AC 61-107.</Texto>
        </View>
      </Painel>

      {simuladores
        .filter((s) => !s.disponivel)
        .map((s) => (
          <Painel key={s.id} style={styles.bloqueado}>
            <IconeCadeado cor={Cores.textoApagado} />
            <View style={{ flex: 1, gap: 2 }}>
              <Texto t="item">{s.titulo}</Texto>
              <Texto cor={Cores.textoApagado}>{s.descricao}</Texto>
            </View>
            <Texto t="rotulo" cor={Cores.textoApagado}>Em breve</Texto>
          </Painel>
        ))}
    </Tela>
  );
}

const styles = StyleSheet.create({
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.sm },
  altitude: { flexBasis: '22%', flexGrow: 1, minHeight: 44, alignItems: 'center', justifyContent: 'center', borderRadius: Raio - 6, borderWidth: 1, borderColor: Cores.linha },
  resultado: { gap: 4, paddingTop: Espaco.sm, borderTopWidth: 1, borderTopColor: Cores.linha },
  bloqueado: { flexDirection: 'row', alignItems: 'center', gap: Espaco.md },
});
