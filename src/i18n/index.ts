// Tradução do app (PT BR → EN US, ES ES).
// O texto em português é a chave. A busca segue esta ordem, parando no primeiro acerto:
//   1. frase exata no dicionário;
//   2. modelo com os números trocados por {0}, {1}... ("12 metros" → "{0} metros");
//   3. as mesmas buscas em CAIXA ALTA, para rótulos que o código põe em maiúsculas;
//   4. modelos com partes variáveis ("Faltam {0} XP para {1}."), traduzindo cada parte;
//   5. a frase dividida nos separadores (" · ", ": ", "1. "), traduzindo cada pedaço;
//   6. a tradução automática guardada no aparelho (src/i18n/automatico.ts).
// Se nada servir, mostra o português e pede a tradução automática.
// Dicionários: src/i18n/en-US.json e src/i18n/es-ES.json (scripts/extrair-textos.cjs e scripts/traduzir.cjs).

import enUS from './en-US.json';
import esES from './es-ES.json';
import { aoTraduzir, automatica, pedirTraducao } from './automatico';
import type { Idioma } from '@/state/idioma';

type Lingua = Exclude<Idioma, 'pt-BR'>;
const BRUTOS: Record<Lingua, Record<string, string>> = { 'en-US': enUS as Record<string, string>, 'es-ES': esES as Record<string, string> };

const NUMERO = /\d+(?:[.,]\d+)*/g;
const LETRAS = /[A-Za-zÀ-ÿ]{2}/;

// "12,5 metros" → { modelo: "{0} metros", numeros: ["12,5"] }
export function modeloDe(texto: string) {
  const numeros: string[] = [];
  const modelo = texto.replace(NUMERO, (n) => `{${numeros.push(n) - 1}}`);
  return { modelo, numeros };
}

// Valor numérico de um número escrito no formato do idioma.
function valor(n: string, idioma: Idioma) {
  const s = idioma === 'en-US' ? n.replace(/,/g, '') : n.replace(/\./g, (m, i, t) => (/^\d{3}(\D|$)/.test(t.slice(i + 1)) ? '' : m)).replace(',', '.');
  return parseFloat(s);
}

// Número no formato do idioma: em inglês, vírgula decimal vira ponto e ponto de milhar vira vírgula.
function formatarNumero(n: string, idioma: Idioma) {
  if (idioma !== 'en-US') return n;
  if (/^\d{1,3}(\.\d{3})*,\d+$/.test(n)) return n.replace(/\./g, '').replace(',', '.');
  if (/^\d{1,3}(\.\d{3})+$/.test(n)) return n.replace(/\./g, ',');
  if (/^\d+,\d+$/.test(n)) return n.replace(',', '.');
  return n;
}

function preencher(modelo: string, numeros: string[], idioma: Idioma) {
  return modelo.replace(/\{(\d+)\}/g, (m, i) => (numeros[+i] !== undefined ? formatarNumero(numeros[+i], idioma) : m));
}

// Índices montados uma vez por idioma.
interface Indice {
  exato: Map<string, string>;
  modelo: Map<string, string>; // chaves com {n}, inclusive as derivadas das frases com números
  maiusculo: Map<string, string>;
  variaveis: { re: RegExp; ordem: number[]; valor: string; peso: number }[];
}
const indices: Partial<Record<Lingua, Indice>> = {};

function indice(l: Lingua): Indice {
  const pronto = indices[l];
  if (pronto) return pronto;
  const exato = new Map<string, string>();
  const modelo = new Map<string, string>();
  const maiusculo = new Map<string, string>();
  const variaveis: Indice['variaveis'] = [];
  for (const [k, v] of Object.entries(BRUTOS[l])) {
    exato.set(k, v);
    if (/\{\d+\}/.test(k)) modelo.set(k, v);
    else if (/\d/.test(k)) {
      // Frase com números ("8 voos" → "8 flights") vira também modelo ("{0} voos" → "{0} flights"),
      // se cada número da tradução tiver o mesmo valor de um número do original.
      const { modelo: m, numeros } = modeloDe(k);
      const vals = numeros.map((n) => valor(n, 'pt-BR'));
      let ok = true;
      const usados = new Set<number>();
      const vm = v.replace(NUMERO, (n) => {
        const x = valor(n, l);
        const i = vals.findIndex((y, j) => y === x && !usados.has(j));
        if (i < 0) {
          ok = false;
          return n;
        }
        usados.add(i);
        return `{${i}}`;
      });
      if (ok && usados.size === numeros.length && !modelo.has(m)) modelo.set(m, vm);
    }
  }
  for (const [k, v] of modelo) if (!exato.has(k)) exato.set(k, v);
  for (const [k, v] of exato) {
    const K = k.toLocaleUpperCase('pt-BR');
    if (!maiusculo.has(K)) maiusculo.set(K, v.toLocaleUpperCase(l));
  }
  // Modelos com partes variáveis: viram expressões regulares; o texto fixo precisa ter letras.
  for (const [k, v] of modelo) {
    const fixo = k.replace(/\{\d+\}/g, '');
    if (!LETRAS.test(fixo)) continue;
    const ordem: number[] = [];
    const fonte = k
      .split(/(\{\d+\})/)
      .map((p) => {
        const m = p.match(/^\{(\d+)\}$/);
        if (m) {
          ordem.push(+m[1]);
          return '(.+?)';
        }
        return p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      })
      .join('');
    variaveis.push({ re: new RegExp('^' + fonte + '$'), ordem, valor: v, peso: fixo.length });
  }
  variaveis.sort((a, b) => b.peso - a.peso);
  return (indices[l] = { exato, modelo, maiusculo, variaveis });
}

// Busca direta: exata, por modelo numérico e em caixa alta.
function direta(nucleo: string, l: Lingua): string | undefined {
  const ix = indice(l);
  const e = ix.exato.get(nucleo);
  if (e !== undefined) return e;
  const { modelo, numeros } = modeloDe(nucleo);
  const m = ix.modelo.get(modelo);
  if (m !== undefined) return preencher(m, numeros, l);
  if (nucleo === nucleo.toLocaleUpperCase('pt-BR') && /[A-ZÀ-Ý]/.test(nucleo)) {
    const u = ix.maiusculo.get(nucleo) ?? ix.maiusculo.get(modelo);
    if (u !== undefined) return ix.maiusculo.has(nucleo) ? u : preencher(u, numeros, l);
  }
  const a = automatica(l, modelo);
  if (a !== undefined) return preencher(a, numeros, l);
  return undefined;
}

// Modelos com partes variáveis: "Faltam 100 XP para Aluno-piloto." casa com "Faltam {0} XP para {1}.".
function porModeloVariavel(nucleo: string, l: Lingua, prof: number): string | undefined {
  for (const t of indice(l).variaveis) {
    const m = nucleo.match(t.re);
    if (!m) continue;
    const partes: string[] = [];
    t.ordem.forEach((n, i) => {
      const p = m[i + 1];
      partes[n] = /^\d+(?:[.,]\d+)*$/.test(p) ? formatarNumero(p, l) : resolver(p, l, prof + 1) ?? p;
    });
    return t.valor.replace(/\{(\d+)\}/g, (x, i) => partes[+i] ?? x);
  }
  return undefined;
}

// Frase montada com separadores: traduz cada pedaço.
const SEPARADOR = /( · |: | — | – |\s+\(|\)(?=\s|$)|\. (?=[A-ZÀ-Ý(]))/;
function porPartes(nucleo: string, l: Lingua, prof: number): string | undefined {
  const pref = nucleo.match(/^(\d+\.\s+|▶\s+|·\s+)(.+)$/);
  if (pref) {
    const resto = resolver(pref[2], l, prof + 1);
    return resto === undefined ? undefined : pref[1] + resto;
  }
  const partes = nucleo.split(SEPARADOR);
  if (partes.length < 3) return undefined;
  let algum = false;
  const saida = partes.map((p, i) => {
    if (i % 2 === 1 || !LETRAS.test(p)) return p;
    const t = resolver(p.trim(), l, prof + 1);
    if (t === undefined) return p;
    algum = true;
    return p.replace(p.trim(), t);
  });
  return algum ? saida.join('') : undefined;
}

function porLista(nucleo: string, l: Lingua, prof: number): string | undefined {
  // Lista de achados separada por "; " (justificativa do Exame CMA): cada item é "texto sem ponto (RBAC ref)".
  if (nucleo.includes('; ')) {
    // Só vale se todos os itens forem traduzidos; senão a frase segue para os modelos com partes variáveis.
    const saida = nucleo.split('; ').map((p) => itemDeLista(p, l));
    if (saida.every((t) => t !== undefined)) return saida.join('; ');
  }
  return undefined;
}

function itemDeLista(p: string, l: Lingua): string | undefined {
  const m = p.match(/^(.*?)( \((?:RBAC |Anexo |14 CFR )?[\w.()/, -]*\d[\w.()]*\))?([.:]?)$/);
  const base = m ? m[1] : p;
  const ref = m?.[2] ?? '';
  const fim = m?.[3] ?? '';
  // O texto original do achado termina em ponto: essa forma é a chave do dicionário.
  // Só a busca direta: um item que precise de partes variáveis não é item de lista, é frase montada.
  const comPonto = direta(base + '.', l);
  if (comPonto !== undefined) return comPonto.replace(/\.$/, '') + ref + fim;
  const direto = direta(base, l);
  if (direto !== undefined) return direto + ref + fim;
  return undefined;
}

function resolver(nucleo: string, l: Lingua, prof = 0): string | undefined {
  if (!nucleo || !LETRAS.test(nucleo)) return nucleo;
  const d = direta(nucleo, l);
  if (d !== undefined) return d;
  if (prof > 3) return undefined;
  return porLista(nucleo, l, prof) ?? porModeloVariavel(nucleo, l, prof) ?? porPartes(nucleo, l, prof);
}

// Resultados já calculados; zerados quando chega uma tradução automática.
const memoria: Record<Lingua, Map<string, string>> = { 'en-US': new Map(), 'es-ES': new Map() };
aoTraduzir(() => {
  memoria['en-US'].clear();
  memoria['es-ES'].clear();
});

// estrito: só a busca direta, sem pedir tradução automática (usado para testar uma frase montada de pedaços).
export function traduzir(texto: string, idioma: Idioma, estrito = false): string {
  if (idioma === 'pt-BR' || !texto || !LETRAS.test(texto)) return texto;
  const l = idioma;
  const inicio = texto.match(/^\s*/)![0];
  const fim = texto.match(/\s*$/)![0];
  const nucleo = texto.trim();
  if (estrito) {
    const d = direta(nucleo, l);
    return d === undefined ? texto : inicio + d + fim;
  }
  const lembrado = memoria[l].get(nucleo);
  if (lembrado !== undefined) return inicio + lembrado + fim;
  const r = resolver(nucleo, l);
  if (r !== undefined) {
    memoria[l].set(nucleo, r);
    return inicio + r + fim;
  }
  // Sem tradução: só pede a automática se houver palavra de verdade (não só siglas e unidades).
  if (/[a-zà-ÿ]{3,}/.test(nucleo)) {
    registrarFalta(nucleo);
    pedirTraducao(l, modeloDe(nucleo).modelo);
  }
  return texto;
}

// Em desenvolvimento e nos testes, guarda o que faltou traduzir (lido pela varredura de traduções).
const faltas = new Set<string>();
function registrarFalta(texto: string) {
  if (faltas.has(texto)) return;
  faltas.add(texto);
  const g = globalThis as { __faltasTraducao?: string[] };
  (g.__faltasTraducao ??= []).push(texto);
}
