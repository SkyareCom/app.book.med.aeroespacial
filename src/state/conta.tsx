// Como a pessoa entrou no app (Google, Apple, biometria ou sem conta), salvo no aparelho.
// Enquanto ninguém escolheu, a tela de entrada aparece depois da abertura.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const CHAVE = 'conta:v1';

export type ModoEntrada = 'google' | 'apple' | 'biometria' | 'convidado';

interface ContextoConta {
  carregado: boolean;
  modo: ModoEntrada | null;
  entrar: (modo: ModoEntrada) => void;
  sair: () => void;
}

const Ctx = createContext<ContextoConta>({ carregado: false, modo: null, entrar: () => {}, sair: () => {} });

export function ProvedorConta({ children }: { children: ReactNode }) {
  const [carregado, setCarregado] = useState(false);
  const [modo, setModo] = useState<ModoEntrada | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE)
      .then((txt) => {
        if (txt) setModo((JSON.parse(txt) as { modo: ModoEntrada }).modo);
      })
      .catch(() => {})
      .finally(() => setCarregado(true));
  }, []);

  function entrar(novo: ModoEntrada) {
    setModo(novo);
    AsyncStorage.setItem(CHAVE, JSON.stringify({ modo: novo })).catch(() => {});
  }

  function sair() {
    setModo(null);
    AsyncStorage.removeItem(CHAVE).catch(() => {});
  }

  return <Ctx.Provider value={{ carregado, modo, entrar, sair }}>{children}</Ctx.Provider>;
}

export const useConta = () => useContext(Ctx);
