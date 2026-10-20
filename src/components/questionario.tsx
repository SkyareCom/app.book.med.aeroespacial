import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Barra, Painel } from '@/components/cartoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Raio } from '@/constants/theme';
import type { Questao } from '@/data/tipos';

export type Modo = 'quiz' | 'prova';

// Modo quiz: mostra se acertou e a explicação a cada resposta.
// Modo prova: cronômetro, sem correção até o fim, nota e revisão no final.
export function Questionario({
  questoes,
  modo,
  onConcluir,
  onRefazer,
  onRevisar,
}: {
  questoes: Questao[];
  modo: Modo;
  onConcluir?: (acertos: number, total: number) => void;
  onRefazer: () => void;
  onRevisar?: (topico: string) => void;
}) {
  const [indice, setIndice] = useState(0);
  const [escolhas, setEscolhas] = useState<(number | null)[]>(() => questoes.map(() => null));
  const [confirmada, setConfirmada] = useState(false);
  const [fim, setFim] = useState(false);
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    if (modo !== 'prova' || fim) return;
    const id = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [modo, fim]);

  const q = questoes[indice];
  const escolha = escolhas[indice];
  const acertos = escolhas.filter((e, i) => e === questoes[i].correta).length;

  function escolher(i: number) {
    if (confirmada) return;
    setEscolhas((atual) => atual.map((e, k) => (k === indice ? i : e)));
  }

  function avancar() {
    if (modo === 'quiz' && !confirmada) {
      setConfirmada(true);
      return;
    }
    setConfirmada(false);
    if (indice + 1 < questoes.length) {
      setIndice(indice + 1);
    } else {
      setFim(true);
      onConcluir?.(acertos, questoes.length);
    }
  }

  if (fim) {
    const pct = Math.round((acertos / questoes.length) * 100);
    const erradas = questoes.filter((qq, i) => escolhas[i] !== qq.correta);
    return (
      <View style={{ gap: Espaco.md }}>
        <Painel>
          <Texto t="rotulo" cor={Cores.destaque}>Resultado</Texto>
          <Texto t="titulo">{acertos} de {questoes.length} · {pct}%</Texto>
          {modo === 'prova' ? <Texto cor={Cores.textoApagado}>Tempo: {formatar(segundos)}</Texto> : null}
          <Barra valor={acertos / questoes.length} />
          <Texto cor={Cores.textoSuave}>
            {pct >= 70 ? 'Aprovado. O capítulo conta como concluído na sua evolução.' : 'Faça de novo para chegar a 70% e concluir.'}
          </Texto>
        </Painel>
        {erradas.length > 0 ? (
          <Painel>
            <Texto t="rotulo" cor={Cores.destaque}>Revise</Texto>
            {erradas.map((qq) => (
              <View key={qq.pergunta} style={{ gap: 4 }}>
                <Texto t="item">{qq.pergunta}</Texto>
                <Texto cor={Cores.acerto}>Resposta: {qq.opcoes[qq.correta]}</Texto>
                <Texto cor={Cores.textoSuave}>{qq.explicacao}</Texto>
                {onRevisar ? (
                  <Pressable accessibilityRole="link" onPress={() => onRevisar(qq.topico)} style={{ paddingVertical: 6 }}>
                    <Texto t="rotulo" cor={Cores.destaque}>Voltar ao tópico {qq.topico}</Texto>
                  </Pressable>
                ) : null}
              </View>
            ))}
          </Painel>
        ) : null}
        <BotaoPrincipal rotulo="Refazer" onPress={onRefazer} secundario />
      </View>
    );
  }

  return (
    <View style={{ gap: Espaco.md }}>
      <View style={styles.topo}>
        <Texto t="rotulo" cor={Cores.textoApagado}>
          Questão {indice + 1} de {questoes.length}
        </Texto>
        {modo === 'prova' ? <Texto t="rotulo" cor={Cores.destaque}>{formatar(segundos)}</Texto> : null}
      </View>
      <Barra valor={indice / questoes.length} altura={2} />
      <Painel>
        <Texto t="item">{q.pergunta}</Texto>
        <View style={{ gap: Espaco.sm }}>
          {q.opcoes.map((opcao, i) => {
            const marcada = escolha === i;
            const certa = confirmada && i === q.correta;
            const errada = confirmada && marcada && i !== q.correta;
            return (
              <Pressable
                key={opcao}
                accessibilityRole="radio"
                accessibilityState={{ checked: marcada }}
                onPress={() => escolher(i)}
                style={[
                  styles.opcao,
                  marcada && { borderColor: Cores.destaque },
                  certa && { borderColor: Cores.acerto, backgroundColor: 'rgba(91,214,155,0.12)' },
                  errada && { borderColor: Cores.erro, backgroundColor: 'rgba(255,122,110,0.12)' },
                ]}>
                <Texto t="rotulo" cor={Cores.textoApagado}>{String.fromCharCode(65 + i)}</Texto>
                <Texto style={{ flex: 1 }}>{opcao}</Texto>
              </Pressable>
            );
          })}
        </View>
        {confirmada ? (
          <View style={{ gap: 4 }}>
            <Texto t="rotulo" cor={escolha === q.correta ? Cores.acerto : Cores.erro}>
              {escolha === q.correta ? 'Correto' : 'Não foi dessa vez'}
            </Texto>
            <Texto cor={Cores.textoSuave}>{q.explicacao}</Texto>
          </View>
        ) : null}
      </Painel>
      {escolha === null ? (
        <Texto cor={Cores.textoApagado} style={{ textAlign: 'center' }}>Escolha uma alternativa para continuar</Texto>
      ) : (
        <BotaoPrincipal
          rotulo={modo === 'quiz' && !confirmada ? 'Confirmar' : indice + 1 < questoes.length ? 'Próxima' : 'Ver resultado'}
          onPress={avancar}
        />
      )}
    </View>
  );
}

function formatar(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  topo: { flexDirection: 'row', justifyContent: 'space-between' },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espaco.md,
    minHeight: 48,
    paddingHorizontal: Espaco.md,
    paddingVertical: Espaco.sm,
    borderRadius: Raio - 4,
    borderWidth: 1,
    borderColor: Cores.linha,
    backgroundColor: 'rgba(3,5,10,0.4)',
  },
});
