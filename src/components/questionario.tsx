import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Barra, Painel } from '@/components/cartoes';
import { Texto } from '@/components/texto';
import { Cores, Espaco, Raio } from '@/constants/theme';
import type { Questao } from '@/data/tipos';
import { dificuldadeDe, NOME_DIFICULDADE, PESO_PROVA, xpDaQuestao } from '@/lib/xp';

export type Modo = 'quiz' | 'prova';

// Modo quiz: mostra se acertou e a explicação a cada resposta.
// Modo prova: cronômetro, sem correção até o fim, nota e revisão no final.
export function Questionario({
  questoes,
  modo,
  onConcluir,
  onRefazer,
  onRevisar,
  aoResponder,
  rankingAtivo = false,
  podeRefazer = true,
}: {
  questoes: Questao[];
  modo: Modo;
  onConcluir?: (acertos: number, total: number) => void;
  onRefazer: () => void;
  onRevisar?: (topico: string) => void;
  // Registra a resposta no ranking e devolve o XP ganho.
  aoResponder?: (q: Questao, certa: boolean) => number;
  rankingAtivo?: boolean;
  podeRefazer?: boolean;
}) {
  const [indice, setIndice] = useState(0);
  const [escolhas, setEscolhas] = useState<(number | null)[]>(() => questoes.map(() => null));
  const [confirmada, setConfirmada] = useState(false);
  const [fim, setFim] = useState(false);
  const [segundos, setSegundos] = useState(0);
  const [ganhos, setGanhos] = useState<number[]>(() => questoes.map(() => 0));

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
      const ganho = aoResponder?.(q, escolha === q.correta) ?? 0;
      setGanhos((g) => g.map((v, k) => (k === indice ? ganho : v)));
      return;
    }
    setConfirmada(false);
    if (indice + 1 < questoes.length) {
      setIndice(indice + 1);
    } else {
      setFim(true);
      // No Modo prova, a correção (e o XP) só acontece no fim.
      if (modo === 'prova') setGanhos(questoes.map((qq, k) => aoResponder?.(qq, escolhas[k] === qq.correta) ?? 0));
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
          {rankingAtivo ? (
            <View style={styles.xp}>
              <Texto t="titulo" cor={Cores.dourado}>+{ganhos.reduce((a, b) => a + b, 0)} XP</Texto>
              {modo === 'prova' ? <Texto t="rotulo" cor={Cores.dourado}>Peso {PESO_PROVA} no Modo prova</Texto> : null}
            </View>
          ) : (
            <Texto t="rotulo" cor={Cores.textoApagado}>Ranking desativado: sem XP</Texto>
          )}
          <Texto cor={Cores.textoSuave}>
            {pct >= 70 ? 'Aprovado. O capítulo conta como concluído na sua evolução.' : rankingAtivo ? 'Revise os tópicos abaixo: cada questão só pontua uma vez.' : 'Faça de novo para chegar a 70% e concluir.'}
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
        {podeRefazer ? <BotaoPrincipal rotulo={rankingAtivo ? 'Mais questões' : 'Refazer'} onPress={onRefazer} secundario /> : null}
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
        <View style={styles.selos}>
          <Texto t="rotulo" cor={Cores.textoApagado}>{NOME_DIFICULDADE[dificuldadeDe(q)]}</Texto>
          {rankingAtivo ? <Texto t="rotulo" cor={Cores.dourado}>{xpDaQuestao(q, modo)} XP</Texto> : null}
        </View>
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
              {rankingAtivo ? `  ·  +${ganhos[indice]} XP` : ''}
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
  selos: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  xp: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: Espaco.sm },
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
