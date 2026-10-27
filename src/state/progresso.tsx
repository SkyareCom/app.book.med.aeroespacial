// Progresso de aprendizado, salvo no aparelho.
// Um capítulo conta como concluído quando o teste é feito com 70% de acertos ou mais.
// Ranking: cada questão respondida guarda o resultado e o XP ganho; com o ranking ativo, ela não pode
// ser respondida de novo até o ranking ser zerado. Com o ranking desativado, tudo pode ser refeito, sem XP.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const CHAVE = 'progresso:v1';
export const NOTA_MINIMA = 0.7;

export interface Resposta {
  certa: boolean;
  xp: number;
  modo: 'quiz' | 'prova';
  em: number; // data (ms)
}

interface Progresso {
  concluidos: string[];
  melhoresNotas: Record<string, number>;
  ultimos: string[]; // episódios abertos recentemente, o mais recente primeiro
  respostas: Record<string, Resposta>; // por id da questão (tópico + enunciado)
  rankingAtivo: boolean;
}

interface ContextoProgresso extends Progresso {
  xp: number;
  carregado: boolean; // true depois de ler o progresso salvo no aparelho
  registrarTeste: (chave: string, acertos: number, total: number) => void;
  registrarVisita: (chave: string) => void;
  // Registra a resposta e devolve o XP ganho (0 se o ranking estiver desativado ou a questão já tiver sido respondida).
  registrarResposta: (id: string, certa: boolean, xp: number, modo: 'quiz' | 'prova') => number;
  zerarRanking: () => void;
  definirRankingAtivo: (ativo: boolean) => void;
}

const vazio: Progresso = { concluidos: [], melhoresNotas: {}, ultimos: [], respostas: {}, rankingAtivo: true };
const Ctx = createContext<ContextoProgresso>({
  ...vazio,
  xp: 0,
  carregado: false,
  registrarTeste: () => {},
  registrarVisita: () => {},
  registrarResposta: () => 0,
  zerarRanking: () => {},
  definirRankingAtivo: () => {},
});

function salvar(p: Progresso) {
  AsyncStorage.setItem(CHAVE, JSON.stringify(p)).catch(() => {});
}

export function ProvedorProgresso({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Progresso>(vazio);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE)
      .then((txt) => txt && setEstado({ ...vazio, ...JSON.parse(txt) }))
      .catch(() => {})
      .finally(() => setCarregado(true));
  }, []);

  function registrarTeste(chave: string, acertos: number, total: number) {
    if (total === 0) return;
    const nota = acertos / total;
    setEstado((atual) => {
      const melhor = Math.max(nota, atual.melhoresNotas[chave] ?? 0);
      const concluido = melhor >= NOTA_MINIMA;
      const novo: Progresso = {
        ...atual,
        melhoresNotas: { ...atual.melhoresNotas, [chave]: melhor },
        concluidos: concluido && !atual.concluidos.includes(chave) ? [...atual.concluidos, chave] : atual.concluidos,
      };
      salvar(novo);
      return novo;
    });
  }

  function registrarVisita(chave: string) {
    setEstado((atual) => {
      if (atual.ultimos[0] === chave) return atual;
      const novo = { ...atual, ultimos: [chave, ...atual.ultimos.filter((c) => c !== chave)].slice(0, 10) };
      salvar(novo);
      return novo;
    });
  }

  function registrarResposta(id: string, certa: boolean, xp: number, modo: 'quiz' | 'prova') {
    if (!estado.rankingAtivo || estado.respostas[id]) return 0;
    const ganho = certa ? xp : 0;
    setEstado((atual) => {
      if (!atual.rankingAtivo || atual.respostas[id]) return atual;
      const novo = { ...atual, respostas: { ...atual.respostas, [id]: { certa, xp: ganho, modo, em: Date.now() } } };
      salvar(novo);
      return novo;
    });
    return ganho;
  }

  function zerarRanking() {
    setEstado((atual) => {
      const novo = { ...atual, respostas: {} };
      salvar(novo);
      return novo;
    });
  }

  function definirRankingAtivo(ativo: boolean) {
    setEstado((atual) => {
      const novo = { ...atual, rankingAtivo: ativo };
      salvar(novo);
      return novo;
    });
  }

  const xp = Object.values(estado.respostas).reduce((n, r) => n + r.xp, 0);

  return (
    <Ctx.Provider value={{ ...estado, xp, carregado, registrarTeste, registrarVisita, registrarResposta, zerarRanking, definirRankingAtivo }}>
      {children}
    </Ctx.Provider>
  );
}

export function useProgresso() {
  return useContext(Ctx);
}

export function nivelPorConcluidos(n: number) {
  if (n >= 50) return 'Astronauta';
  if (n >= 25) return 'Comandante';
  if (n >= 10) return 'Piloto';
  return 'Cadete';
}
