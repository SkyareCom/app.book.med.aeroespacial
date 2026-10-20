import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { MolduraMidia } from '@/components/midia/moldura';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Raio } from '@/constants/theme';

export interface Caso {
  texto: string;
  resposta: string;
  explicacao: string;
}

// Atividade rápida: ler um caso e escolher a categoria certa. Serve para qualquer capítulo.
export function AtividadeClassificar({ titulo, categorias, casos }: { titulo: string; categorias: string[]; casos: Caso[] }) {
  const [i, setI] = useState(0);
  const [escolha, setEscolha] = useState<string | null>(null);
  const [acertos, setAcertos] = useState(0);
  const fim = i >= casos.length;

  function escolher(c: string) {
    if (escolha) return;
    setEscolha(c);
    if (c === casos[i].resposta) setAcertos((a) => a + 1);
  }

  if (fim) {
    return (
      <MolduraMidia tipo="Atividade" titulo={titulo}>
        <Texto t="titulo">{acertos} de {casos.length} casos certos</Texto>
        <BotaoPrincipal rotulo="Jogar de novo" secundario onPress={() => { setI(0); setEscolha(null); setAcertos(0); }} />
      </MolduraMidia>
    );
  }

  const caso = casos[i];
  return (
    <MolduraMidia tipo="Atividade" titulo={titulo} instrucao={`Caso ${i + 1} de ${casos.length}. Toque na categoria certa.`}>
      <View style={styles.caso}>
        <Texto t="item">{caso.texto}</Texto>
      </View>
      <View style={styles.grade}>
        {categorias.map((c) => {
          const certa = escolha && c === caso.resposta;
          const errada = escolha === c && c !== caso.resposta;
          return (
            <Pressable
              key={c}
              accessibilityRole="button"
              onPress={() => escolher(c)}
              style={[styles.opcao, certa && { borderColor: Cores.acerto, backgroundColor: 'rgba(91,214,155,0.14)' }, errada && { borderColor: Cores.erro, backgroundColor: 'rgba(255,122,110,0.14)' }]}>
              <Texto>{c}</Texto>
            </Pressable>
          );
        })}
      </View>
      {escolha ? (
        <View style={{ gap: Espaco.sm }}>
          <Texto t="rotulo" cor={escolha === caso.resposta ? Cores.acerto : Cores.erro}>{escolha === caso.resposta ? 'Correto' : `Resposta: ${caso.resposta}`}</Texto>
          <Texto cor={Cores.textoSuave}>{caso.explicacao}</Texto>
          <BotaoPrincipal rotulo={i + 1 < casos.length ? 'Próximo caso' : 'Ver resultado'} onPress={() => { setI(i + 1); setEscolha(null); }} />
        </View>
      ) : null}
    </MolduraMidia>
  );
}

const styles = StyleSheet.create({
  caso: { padding: Espaco.md, borderRadius: Raio - 6, backgroundColor: 'rgba(111,211,255,0.08)' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: Espaco.sm },
  opcao: { flexBasis: '45%', flexGrow: 1, minHeight: 46, alignItems: 'center', justifyContent: 'center', borderRadius: Raio - 6, borderWidth: 1, borderColor: Cores.linha, paddingHorizontal: 8 },
});
