// Auditoria do padrão de mídias de cada voo (docs/padrao-midias.md).
// Uso: npm run auditar:midias. Lista, por tópico, fotos, interativos, tabelas, vídeos e o maior trecho de texto sem mídia.
import { secoes } from '../src/data/secoes';

const MIN_FOTOS = 2;
const MAX_SEM_MIDIA = 1;
// Voos em que o vídeo foi trocado por foto, por decisão do autor (gerador de vídeo indisponível).
const VIDEO_DISPENSADO = new Set(['M2V1']);
let pendencias = 0;
for (const s of secoes) {
  s.capitulos.forEach((c, ic) => {
    const comTexto = c.topicos.filter((t) => t.conteudo);
    if (!comTexto.length) return;
    const tipos = new Set<string>();
    const codigo = `M${secoes.indexOf(s) + 1}V${ic + 1}`;
    console.log(`\n${codigo} · ${c.titulo}`);
    for (const t of comTexto) {
      const n = t.conteudo!.texto.split('\n\n').length;
      const r = t.conteudo!.recursos ?? [];
      const fotos = r.filter((x) => x.figura).length;
      const interativos = r.filter((x) => x.midia).length;
      const animacoes = r.filter((x) => x.midia?.startsWith('animacao')).length;
      const tabelas = r.filter((x) => x.tabela).length;
      const videos = r.filter((x) => x.video).length;
      if (fotos) tipos.add('foto');
      if (interativos - animacoes) tipos.add('interativo');
      if (animacoes) tipos.add('animação');
      if (tabelas) tipos.add('tabela');
      if (videos) tipos.add('vídeo');
      const pos = new Set(r.map((x) => x.paragrafo ?? n));
      let seq = 0, max = 0;
      for (let i = 1; i <= n; i++) { seq = pos.has(i) ? 0 : seq + 1; max = Math.max(max, seq); }
      const falhas = [fotos < MIN_FOTOS && `faltam ${MIN_FOTOS - fotos} foto(s)`, !interativos && 'sem interativo', max > MAX_SEM_MIDIA && `${max} parágrafos seguidos sem mídia`].filter(Boolean);
      pendencias += falhas.length;
      console.log(`  ${t.titulo.padEnd(28)} fotos ${fotos} · interativos ${interativos} · tabelas ${tabelas} · vídeos ${videos}${falhas.length ? '  ⚠ ' + falhas.join('; ') : '  ✓'}`);
    }
    if (VIDEO_DISPENSADO.has(codigo)) tipos.add('vídeo');
    const faltam = ['foto', 'interativo', 'animação', 'tabela', 'vídeo'].filter((x) => !tipos.has(x));
    if (faltam.length) console.log(`  Formatos ausentes no voo: ${faltam.join(', ')}`);
  });
}
console.log(`\n${pendencias} pendência(s) de mídia por tópico.`);
