import * as Speech from 'expo-speech';
import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { Platform } from 'react-native';

import type { Idioma } from '@/state/idioma';

// Narração do app-book (pedido do autor em 18/11/2026: "app book narrado nos 3 idiomas"). Usa a síntese de voz do
// próprio aparelho ou do navegador (expo-speech), no idioma escolhido no app, e lê o texto corrido dos tópicos.
// Um narrador por vez: ao tocar um tópico, o que estava tocando para. Cada parágrafo é falado frase a frase, porque
// alguns navegadores cortam falas longas. As referências cruzadas "(Veja ...)" não são lidas.

type Estado = { dono: number | null; indice: number; tocando: boolean };
let estado: Estado = { dono: null, indice: 0, tocando: false };
const ouvintes = new Set<() => void>();
const definir = (p: Partial<Estado>) => {
  estado = { ...estado, ...p };
  ouvintes.forEach((f) => f());
};
const assinar = (f: () => void) => {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
};
const ler = () => estado;

let sequencia = 0;
let geracao = 0;
const vozes = new Map<string, string | undefined>();

async function vozPara(idioma: Idioma): Promise<string | undefined> {
  // No navegador, o próprio navegador escolhe a voz do idioma.
  if (Platform.OS === 'web') return undefined;
  if (vozes.has(idioma)) return vozes.get(idioma);
  let escolhida: string | undefined;
  try {
    const lista = await Speech.getAvailableVoicesAsync();
    const norm = (l: string) => l.replace('_', '-').toLowerCase();
    const exatas = lista.filter((v) => norm(v.language) === idioma.toLowerCase());
    const mesmas = exatas.length ? exatas : lista.filter((v) => norm(v.language).startsWith(idioma.slice(0, 2)));
    const melhor = mesmas.find((v) => v.quality === Speech.VoiceQuality.Enhanced) ?? mesmas[0];
    escolhida = melhor?.identifier;
  } catch {
    escolhida = undefined;
  }
  vozes.set(idioma, escolhida);
  return escolhida;
}

// Texto falado: sem os marcadores de destaque e sem as referências cruzadas entre voos.
export function textoFalado(paragrafo: string): string {
  return paragrafo
    .replace(/\*\*/g, '')
    .replace(/\s*\((?:Veja|See|Ver) [^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function frases(paragrafo: string): string[] {
  return textoFalado(paragrafo).split(/(?<=[.!?])\s+/).filter(Boolean);
}

async function tocarDe(dono: number, paragrafos: string[], inicio: number, idioma: Idioma) {
  geracao += 1;
  const g = geracao;
  Speech.stop();
  definir({ dono, indice: inicio, tocando: true });
  const voz = await vozPara(idioma);
  const falar = (p: number, f: number) => {
    if (g !== geracao) return;
    if (p >= paragrafos.length) {
      definir({ dono: null, indice: 0, tocando: false });
      return;
    }
    const lista = frases(paragrafos[p]);
    if (f >= lista.length) {
      definir({ indice: p + 1 });
      falar(p + 1, 0);
      return;
    }
    Speech.speak(lista[f], {
      language: idioma,
      voice: voz,
      onDone: () => falar(p, f + 1),
      onError: () => {
        if (g === geracao) definir({ tocando: false });
      },
    });
  };
  falar(inicio, 0);
}

function interromper(limpar: boolean) {
  geracao += 1;
  Speech.stop();
  definir(limpar ? { dono: null, indice: 0, tocando: false } : { tocando: false });
}

export function useNarracao(paragrafos: string[], idioma: Idioma) {
  const id = useRef(0);
  if (id.current === 0) id.current = ++sequencia;
  const atual = useSyncExternalStore(assinar, ler, ler);
  const meu = atual.dono === id.current;

  // Ao fechar o tópico ou trocar de tela, a narração deste texto para.
  useEffect(() => () => {
    if (estado.dono === id.current) interromper(true);
  }, []);
  // Ao trocar o idioma do app, a narração em curso para; o leitor toca de novo no idioma novo.
  useEffect(() => {
    if (estado.dono === id.current) interromper(true);
  }, [idioma]);

  const tocar = useCallback(() => {
    const inicio = meu && atual.indice < paragrafos.length ? atual.indice : 0;
    tocarDe(id.current, paragrafos, inicio, idioma);
  }, [meu, atual.indice, paragrafos, idioma]);
  const tocarDesde = useCallback((i: number) => tocarDe(id.current, paragrafos, i, idioma), [paragrafos, idioma]);
  const pausar = useCallback(() => interromper(false), []);
  const parar = useCallback(() => interromper(true), []);

  return {
    ativo: meu,
    tocando: meu && atual.tocando,
    indice: meu ? atual.indice : -1,
    tocar,
    tocarDesde,
    pausar,
    parar,
  };
}
