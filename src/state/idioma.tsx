// Idioma escolhido na tela de entrada (PT BR, EN US, ES ES), guardado no aparelho. O app inteiro segue a escolha:
// o componente Texto e os textos dos gráficos passam por traduzir() (src/i18n).

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { aoTraduzir, carregarAutomaticas } from '@/i18n/automatico';
import { traduzir } from '@/i18n';

export type Idioma = 'pt-BR' | 'en-US' | 'es-ES';
export const IDIOMAS: [Idioma, string][] = [
  ['pt-BR', 'PT BR'],
  ['en-US', 'EN US'],
  ['es-ES', 'ES ES'],
];

const CHAVE = 'idioma';

const Ctx = createContext<{ idioma: Idioma; escolherIdioma: (i: Idioma) => void; versao: number }>({ idioma: 'pt-BR', escolherIdioma: () => {}, versao: 0 });

export function ProvedorIdioma({ children }: { children: ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>('pt-BR');
  // Sobe quando chega uma tradução automática, para a tela se redesenhar com ela.
  const [versao, setVersao] = useState(0);
  useEffect(() => aoTraduzir(() => setVersao((v) => v + 1)), []);
  useEffect(() => {
    if (idioma !== 'pt-BR') carregarAutomaticas(idioma);
    if (typeof document !== 'undefined') document.documentElement.lang = idioma;
  }, [idioma]);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE)
      .then((v) => {
        if (v === 'pt-BR' || v === 'en-US' || v === 'es-ES') setIdioma(v);
      })
      .catch(() => {});
  }, []);

  function escolherIdioma(i: Idioma) {
    setIdioma(i);
    AsyncStorage.setItem(CHAVE, i).catch(() => {});
  }

  return <Ctx.Provider value={{ idioma, escolherIdioma, versao }}>{children}</Ctx.Provider>;
}

export const useIdioma = () => useContext(Ctx);

// Função de tradução para textos fora do componente Texto (rótulos de acessibilidade, campos, gráficos).
export function useTr() {
  const { idioma, versao } = useContext(Ctx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((texto: string, estrito = false) => traduzir(texto, idioma, estrito), [idioma, versao]);
}
