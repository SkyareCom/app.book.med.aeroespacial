// Progresso de aprendizado, salvo no aparelho.
// Um capítulo conta como concluído quando o teste é feito com 70% de acertos ou mais.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const CHAVE = 'progresso:v1';
export const NOTA_MINIMA = 0.7;

interface Progresso {
  concluidos: string[];
  melhoresNotas: Record<string, number>;
}

interface ContextoProgresso extends Progresso {
  registrarTeste: (chave: string, acertos: number, total: number) => void;
}

const vazio: Progresso = { concluidos: [], melhoresNotas: {} };
const Ctx = createContext<ContextoProgresso>({ ...vazio, registrarTeste: () => {} });

export function ProvedorProgresso({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Progresso>(vazio);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE)
      .then((txt) => txt && setEstado({ ...vazio, ...JSON.parse(txt) }))
      .catch(() => {});
  }, []);

  function registrarTeste(chave: string, acertos: number, total: number) {
    if (total === 0) return;
    const nota = acertos / total;
    setEstado((atual) => {
      const melhor = Math.max(nota, atual.melhoresNotas[chave] ?? 0);
      const concluido = melhor >= NOTA_MINIMA;
      const novo: Progresso = {
        melhoresNotas: { ...atual.melhoresNotas, [chave]: melhor },
        concluidos: concluido && !atual.concluidos.includes(chave) ? [...atual.concluidos, chave] : atual.concluidos,
      };
      AsyncStorage.setItem(CHAVE, JSON.stringify(novo)).catch(() => {});
      return novo;
    });
  }

  return <Ctx.Provider value={{ ...estado, registrarTeste }}>{children}</Ctx.Provider>;
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
