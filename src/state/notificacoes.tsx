// Guarda no aparelho qual versão das novidades a pessoa já viu, para acender o ponto no sino.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { VERSAO_NOTIFICACOES } from '@/data/notificacoes';

const CHAVE = 'notificacoes:vistas';

const Ctx = createContext<{ naoLidas: boolean; marcarLidas: () => void }>({ naoLidas: false, marcarLidas: () => {} });

export function ProvedorNotificacoes({ children }: { children: ReactNode }) {
  const [vista, setVista] = useState<number | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE)
      .then((v) => setVista(v ? Number(v) : 0))
      .catch(() => setVista(0));
  }, []);

  function marcarLidas() {
    setVista(VERSAO_NOTIFICACOES);
    AsyncStorage.setItem(CHAVE, String(VERSAO_NOTIFICACOES)).catch(() => {});
  }

  return <Ctx.Provider value={{ naoLidas: vista !== null && vista < VERSAO_NOTIFICACOES, marcarLidas }}>{children}</Ctx.Provider>;
}

export const useNotificacoes = () => useContext(Ctx);
