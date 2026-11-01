// Tradução automática do que ainda não está nos dicionários (conteúdo novo, textos calculados).
// Junta os textos que faltaram, manda em lote para a função "traduzir" do Supabase (Claude, com termos médicos
// e de aviação) e guarda as respostas no aparelho. Quando a tradução chega, a tela se redesenha.
// Sem conexão ou sem a chave configurada no servidor, o texto continua em português, sem erro na tela.

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SERVIDOR } from '@/constants/servidor';
import type { Idioma } from '@/state/idioma';

type Lingua = Exclude<Idioma, 'pt-BR'>;
const CHAVE = (l: Lingua) => `traducoes:${l}`;

const cache: Record<Lingua, Record<string, string>> = { 'en-US': {}, 'es-ES': {} };
const carregado: Record<Lingua, boolean> = { 'en-US': false, 'es-ES': false };
const fila: Record<Lingua, Set<string>> = { 'en-US': new Set(), 'es-ES': new Set() };
const enviados = new Set<string>();
const ouvintes = new Set<() => void>();
let timer: ReturnType<typeof setTimeout> | null = null;
let falhas = 0;

export function aoTraduzir(f: () => void) {
  ouvintes.add(f);
  return () => {
    ouvintes.delete(f);
  };
}
const avisar = () => ouvintes.forEach((f) => f());

export async function carregarAutomaticas(l: Lingua) {
  if (carregado[l]) return;
  carregado[l] = true;
  try {
    const v = await AsyncStorage.getItem(CHAVE(l));
    if (v) Object.assign(cache[l], JSON.parse(v));
    avisar();
  } catch {}
}

export function automatica(idioma: Idioma, modelo: string) {
  if (idioma === 'pt-BR') return undefined;
  return cache[idioma][modelo];
}

export function pedirTraducao(idioma: Idioma, modelo: string) {
  if (idioma === 'pt-BR' || falhas >= 3) return;
  const id = idioma + '|' + modelo;
  if (enviados.has(id)) return;
  enviados.add(id);
  fila[idioma].add(modelo);
  if (!timer) timer = setTimeout(enviar, 800);
}

async function enviar() {
  timer = null;
  for (const l of Object.keys(fila) as Lingua[]) {
    const textos = [...fila[l]].slice(0, 60);
    textos.forEach((t) => fila[l].delete(t));
    if (!textos.length) continue;
    try {
      const resp = await fetch(`${SERVIDOR.url}/functions/v1/traduzir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: SERVIDOR.chavePublica, Authorization: `Bearer ${SERVIDOR.chavePublica}` },
        body: JSON.stringify({ idioma: l, textos }),
      });
      if (!resp.ok) throw new Error(String(resp.status));
      const dados = (await resp.json()) as { traducoes?: Record<string, string> };
      Object.assign(cache[l], dados.traducoes ?? {});
      AsyncStorage.setItem(CHAVE(l), JSON.stringify(cache[l])).catch(() => {});
      avisar();
    } catch {
      falhas += 1; // depois de 3 falhas seguidas, para de tentar nesta sessão
    }
  }
  if (fila['en-US'].size || fila['es-ES'].size) timer = setTimeout(enviar, 800);
}
