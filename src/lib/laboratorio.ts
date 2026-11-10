// Catálogo do Laboratório aeroespacial: todos os interativos do app, cada um com o voo (ou card especial) onde aparece.
// Gerado a partir dos dados: um interativo novo num voo entra no laboratório sem lista manual.

import { fasesAdaptacao } from '@/data/adaptacao';
import { fasesDeficiencias } from '@/data/deficiencias';
import { recursosFormularios } from '@/data/medif';
import { chaveCapitulo, secoes } from '@/data/secoes';
import type { TipoMidia } from '@/data/tipos';

export interface ItemLab {
  midia: TipoMidia;
  grupo: string; // 'Missão 1 · Conceitos', 'Missões especiais'...
  codigo: string; // 'M1V7' ou nome do card
  titulo: string; // título do voo ou do card
  capa: string; // chave em CapaEpisodio ou 'adaptacao'
  rota: { pathname: string; params?: Record<string, string> };
}

export function catalogoLab(): ItemLab[] {
  const itens: ItemLab[] = [];
  const vistos = new Set<TipoMidia>();
  const add = (m: TipoMidia, i: Omit<ItemLab, 'midia'>) => {
    if (vistos.has(m) || m.startsWith('animacao')) return;
    vistos.add(m);
    itens.push({ midia: m, ...i });
  };
  secoes.forEach((s, is) => {
    s.capitulos.forEach((c) => {
      const base = {
        grupo: `Missão ${s.numeral} · ${s.titulo}`,
        codigo: `M${is + 1}V${c.numero}`,
        titulo: c.titulo,
        capa: chaveCapitulo(s.id, c.numero),
        rota: { pathname: '/capitulo/[secao]/[numero]', params: { secao: s.id, numero: String(c.numero) } },
      };
      for (const t of c.topicos) {
        for (const r of t.conteudo?.recursos ?? []) if (r.midia) add(r.midia, base);
        for (const m of t.midias ?? []) add(m, base);
      }
      for (const m of c.laboratorio ?? []) add(m, base);
    });
  });
  for (const f of fasesAdaptacao) {
    for (const r of f.recursos ?? []) {
      if (r.midia) add(r.midia, { grupo: 'Missões especiais', codigo: 'Especial', titulo: 'Adaptação à altitude', capa: 'adaptacao', rota: { pathname: '/adaptacao' } });
    }
  }
  for (const f of fasesDeficiencias) {
    for (const r of f.recursos ?? []) {
      if (r.midia) add(r.midia, { grupo: 'Missões especiais', codigo: 'Especial', titulo: 'Deficiências e o voo', capa: 'deficiencias', rota: { pathname: '/deficiencias' } });
    }
  }
  for (const r of recursosFormularios) {
    if (r.midia) add(r.midia, { grupo: 'Missões especiais', codigo: 'Especial', titulo: 'Liberação para voo', capa: 'deficiencias', rota: { pathname: '/liberacao-voo' } });
  }
  return itens;
}
