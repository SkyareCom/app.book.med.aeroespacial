import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { BotaoPrincipal } from '@/components/botao';
import { Painel } from '@/components/cartoes';
import { Questionario, type Modo } from '@/components/questionario';
import { Tela } from '@/components/tela';
import { Texto } from '@/components/texto';
import { Cores, Espaco } from '@/constants/theme';
import { eras } from '@/data/historia';
import { catalogo } from '@/data/questoes';
import { chaveCapitulo, obterCapitulo, obterSecao } from '@/data/secoes';
import type { Questao } from '@/data/tipos';
import { idQuestao, PESO_PROVA, xpDaQuestao } from '@/lib/xp';
import { useProgresso } from '@/state/progresso';

// Uma única tela de teste para três origens:
// capitulo (fim do capítulo), era (card O Voo e a Medicina) e geral (Modo quiz / Modo prova da Home).
// Com o ranking ativo, cada questão só pode ser respondida uma vez: as já respondidas ficam de fora.
export default function TelaTeste() {
  const p = useLocalSearchParams<{ origem?: string; secao?: string; numero?: string; era?: string; modo?: string }>();
  const router = useRouter();
  const { registrarTeste, registrarResposta, respostas, rankingAtivo, carregado } = useProgresso();
  const [rodada, setRodada] = useState(0);
  const modo: Modo = p.modo === 'prova' ? 'prova' : 'quiz';

  const { todas, titulo, rotulo, chave } = useMemo(() => {
    if (p.origem === 'capitulo' && p.secao && p.numero) {
      const c = obterCapitulo(p.secao, Number(p.numero));
      return { todas: c?.teste ?? [], titulo: c?.titulo ?? '', rotulo: `Teste · ${obterSecao(p.secao)?.titulo ?? ''}`, chave: chaveCapitulo(p.secao, Number(p.numero)) };
    }
    if (p.origem === 'era' && p.era) {
      const e = eras.find((x) => x.id === p.era);
      return { todas: e?.teste ?? [], titulo: e?.titulo ?? '', rotulo: 'Teste · O Voo e a Medicina', chave: undefined };
    }
    return {
      todas: catalogo.map((i) => i.q),
      titulo: modo === 'prova' ? 'Modo prova' : 'Modo quiz',
      rotulo: modo === 'prova' ? `Questões de todo o app · peso ${PESO_PROVA}` : 'Questões de todo o app',
      chave: undefined,
    };
  }, [p.origem, p.secao, p.numero, p.era, modo]);

  // A lista da rodada é fixada quando a rodada começa, para não mudar enquanto a pessoa responde.
  const questoes = useMemo(() => {
    const livres = rankingAtivo ? todas.filter((q) => !respostas[idQuestao(q)]) : todas;
    if (p.origem === 'capitulo' || p.origem === 'era') return livres;
    return embaralhar(livres).slice(0, modo === 'prova' ? 10 : 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todas, rodada, rankingAtivo, carregado]);

  // Espera o progresso salvo carregar, para saber quais questões já foram respondidas.
  if (!carregado) return <Tela titulo={titulo} rotulo={rotulo}>{null}</Tela>;

  if (!todas.length) {
    return (
      <Tela titulo="Teste indisponível">
        <Texto cor={Cores.textoSuave}>Este teste ainda está em produção.</Texto>
      </Tela>
    );
  }

  if (!questoes.length) {
    const feitas = todas.filter((q) => respostas[idQuestao(q)]);
    const certas = feitas.filter((q) => respostas[idQuestao(q)]?.certa).length;
    const xp = feitas.reduce((n, q) => n + (respostas[idQuestao(q)]?.xp ?? 0), 0);
    return (
      <Tela titulo={titulo} rotulo={rotulo}>
        <Painel>
          <Texto t="rotulo" cor={Cores.destaque}>Questões já respondidas</Texto>
          <Texto t="titulo">{certas} de {feitas.length} certas</Texto>
          <Texto t="titulo" cor={Cores.dourado}>{xp} XP</Texto>
          <Texto cor={Cores.textoSuave}>
            Com o ranking ativo, cada questão só vale uma vez. Para responder de novo, zere o ranking ou desative-o no Perfil.
          </Texto>
        </Painel>
        <View style={{ gap: Espaco.sm }}>
          <BotaoPrincipal rotulo="Ver meu ranking" onPress={() => router.push('/perfil')} />
          <BotaoPrincipal rotulo="Voltar" secundario onPress={() => router.back()} />
        </View>
      </Tela>
    );
  }

  return (
    <Tela titulo={titulo} rotulo={rotulo}>
      <Questionario
        key={rodada}
        questoes={questoes}
        modo={modo}
        rankingAtivo={rankingAtivo}
        aoResponder={(q: Questao, certa: boolean) => registrarResposta(idQuestao(q), certa, xpDaQuestao(q, modo), modo)}
        podeRefazer={!rankingAtivo || (p.origem !== 'capitulo' && p.origem !== 'era')}
        onConcluir={(acertos, total) => {
          if (!chave) return;
          // Com o ranking ativo, a nota do capítulo junta as respostas anteriores às desta rodada.
          if (rankingAtivo) {
            const sessao = new Set(questoes.map(idQuestao));
            const anteriores = todas.filter((q) => !sessao.has(idQuestao(q)) && respostas[idQuestao(q)]);
            const certasAntes = anteriores.filter((q) => respostas[idQuestao(q)]?.certa).length;
            registrarTeste(chave, acertos + certasAntes, total + anteriores.length);
          } else {
            registrarTeste(chave, acertos, total);
          }
        }}
        onRefazer={() => setRodada((r) => r + 1)}
        onRevisar={
          p.origem === 'capitulo' && p.secao && p.numero
            ? (topico) => router.replace({ pathname: '/capitulo/[secao]/[numero]', params: { secao: p.secao!, numero: p.numero!, topico } })
            : p.origem === 'era'
              ? () => router.back()
              : undefined
        }
      />
    </Tela>
  );
}

function embaralhar<T>(lista: T[]) {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
