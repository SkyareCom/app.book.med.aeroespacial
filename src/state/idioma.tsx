// Idioma escolhido na tela de entrada (PT BR, EN US, ES ES), guardado no aparelho.
// Por enquanto traduz a própria tela de entrada; os textos dos voos seguem em português.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Idioma = 'pt-BR' | 'en-US' | 'es-ES';
export const IDIOMAS: [Idioma, string][] = [
  ['pt-BR', 'PT BR'],
  ['en-US', 'EN US'],
  ['es-ES', 'ES ES'],
];

const CHAVE = 'idioma';

const Ctx = createContext<{ idioma: Idioma; escolherIdioma: (i: Idioma) => void }>({ idioma: 'pt-BR', escolherIdioma: () => {} });

export function ProvedorIdioma({ children }: { children: ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>('pt-BR');

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

  return <Ctx.Provider value={{ idioma, escolherIdioma }}>{children}</Ctx.Provider>;
}

export const useIdioma = () => useContext(Ctx);

// Textos da tela de entrada nos três idiomas.
export const TEXTOS_ENTRADA = {
  'pt-BR': {
    credito: 'Seu app-book de',
    titulo: 'Medicina aeroespacial',
    google: 'Continuar com Google',
    apple: 'Continuar com a Apple',
    biometria: 'Entrar com biometria',
    nomeBiometria: { ios: 'Face ID ou Touch ID', android: 'Digital ou reconhecimento facial', outro: 'Face ID, Touch ID ou digital' },
    semConta: 'Continuar sem conta',
    salvo: 'Seu progresso fica salvo neste aparelho',
    idioma: 'Idioma',
  },
  'en-US': {
    credito: 'Your app-book of',
    titulo: 'Aerospace medicine',
    google: 'Continue with Google',
    apple: 'Continue with Apple',
    biometria: 'Sign in with biometrics',
    nomeBiometria: { ios: 'Face ID or Touch ID', android: 'Fingerprint or face unlock', outro: 'Face ID, Touch ID or fingerprint' },
    semConta: 'Continue without an account',
    salvo: 'Your progress is saved on this device',
    idioma: 'Language',
  },
  'es-ES': {
    credito: 'Tu app-book de',
    titulo: 'Medicina aeroespacial',
    google: 'Continuar con Google',
    apple: 'Continuar con Apple',
    biometria: 'Entrar con biometría',
    nomeBiometria: { ios: 'Face ID o Touch ID', android: 'Huella o reconocimiento facial', outro: 'Face ID, Touch ID o huella' },
    semConta: 'Continuar sin cuenta',
    salvo: 'Tu progreso se guarda en este dispositivo',
    idioma: 'Idioma',
  },
} as const;
