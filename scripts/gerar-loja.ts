// Ficha da loja (Google Play) gerada a partir do conteúdo do app, em PT, EN e ES.
// Uso: npm run loja:ficha            → grava docs/loja/ficha-pt-BR.md, ficha-en-US.md, ficha-es-ES.md
//      npm run loja:ficha -- --check  → falha (CI) se a ficha gravada não bater com o conteúdo atual
// A cada voo publicado, os números e a lista de voos prontos mudam: rode o script e faça o commit junto.
// Limites da Google Play: título 30, descrição curta 80, descrição completa 4.000 caracteres.
import { secoes } from '../src/data/secoes';

// Sem @types/node no projeto: as poucas funções do Node usadas aqui, declaradas à mão.
declare const require: (m: string) => any;
declare const __dirname: string;
declare const process: { argv: string[]; exit: (c: number) => never };
const { readFileSync, writeFileSync } = require('node:fs') as { readFileSync: (f: string, e: string) => string; writeFileSync: (f: string, d: string) => void };
const { join } = require('node:path') as { join: (...p: string[]) => string };

type Lingua = 'pt-BR' | 'en-US' | 'es-ES';
const raiz = join(__dirname, '..');
const dic: Record<Lingua, Record<string, string>> = {
  'pt-BR': {},
  'en-US': JSON.parse(readFileSync(join(raiz, 'src/i18n/en-US.json'), 'utf8')),
  'es-ES': JSON.parse(readFileSync(join(raiz, 'src/i18n/es-ES.json'), 'utf8')),
};
const tr = (l: Lingua, s: string) => dic[l][s] ?? s;

// Números do conteúdo pronto.
const prontos = secoes.flatMap((s, is) =>
  s.capitulos
    .map((c, ic) => ({ s, c, codigo: `M${is + 1}V${ic + 1}` }))
    .filter(({ c }) => c.topicos.some((t) => t.conteudo)),
);
let topicos = 0, interativos = 0, fotos = 0, videos = 0, questoes = 0;
for (const { c } of prontos) {
  for (const t of c.topicos) {
    if (!t.conteudo) continue;
    topicos++;
    const r = t.conteudo.recursos ?? [];
    interativos += r.filter((x) => x.midia).length;
    fotos += r.filter((x) => x.figura).length;
    videos += r.filter((x) => x.video).length;
  }
  interativos += c.laboratorio?.length ?? 0;
  questoes += (c as { teste?: unknown[] }).teste?.length ?? 0;
}

const TEXTOS: Record<Lingua, { titulo: string; curta: string; abre: string; numeros: string; temas: string; publico: string; aviso: string; missao: string; atualiza: string }> = {
  'pt-BR': {
    titulo: 'Papos de Altitude',
    curta: 'Medicina aeroespacial: o corpo humano na altitude, na aviação e no espaço.',
    abre: 'O Papos de Altitude é um app-book de medicina aeroespacial. Ele explica, do jeito mais claro possível, o que acontece com o corpo humano quando ele sobe: na cabine de um avião, no cockpit de um caça, numa montanha ou numa nave espacial.',
    numeros: 'Hoje são {voos} voos prontos, com {topicos} tópicos, {interativos} simuladores, calculadoras e gráficos interativos, {fotos} fotos, {videos} vídeos e {questoes} questões de teste.',
    temas: 'Cada voo junta texto progressivo, fotos, animações, tabelas práticas e um teste no final. Nos voos de sistemas do corpo, você encontra o que muda em altitude, como prevenir, quando dá para voar como passageiro ou tripulante e quais remédios combinam com o voo.',
    publico: 'Feito para pilotos, comissários, médicos, estudantes, passageiros e curiosos. O app tem também o Exame CMA, para se preparar para o exame médico aeronáutico, a Liberação para voo, o Laboratório com todos os interativos e um ranking de conhecimento. Disponível em português, inglês e espanhol.',
    aviso: 'O app é educativo e não substitui o médico nem o médico examinador credenciado pela autoridade de aviação.',
    missao: 'Voos prontos',
    atualiza: 'Novos voos entram com frequência, sem custo extra para quem já tem o acesso completo.',
  },
  'en-US': {
    titulo: 'Papos de Altitude',
    curta: 'Aerospace medicine: the human body at altitude, in aviation and in space.',
    abre: 'Papos de Altitude is an aerospace medicine app-book. It explains, as clearly as possible, what happens to the human body when it goes up: in an airliner cabin, in a fighter cockpit, on a mountain or in a spacecraft.',
    numeros: 'There are now {voos} flights ready, with {topicos} topics, {interativos} interactive simulators, calculators and charts, {fotos} photos, {videos} videos and {questoes} test questions.',
    temas: 'Each flight combines progressive text, photos, animations, practical tables and a final test. In the body-systems flights you will find what changes at altitude, how to prevent problems, when it is fine to fly as a passenger or crew member and which medicines are compatible with flying.',
    publico: 'Made for pilots, flight attendants, physicians, students, passengers and the curious. The app also includes the CMA exam, to prepare for the aviation medical exam, Flight clearance, the Lab with every interactive, and a knowledge ranking. Available in Portuguese, English and Spanish.',
    aviso: 'The app is educational and does not replace your physician or an aviation medical examiner designated by the aviation authority.',
    missao: 'Ready flights',
    atualiza: 'New flights are added often, at no extra cost for those who already have full access.',
  },
  'es-ES': {
    titulo: 'Papos de Altitude',
    curta: 'Medicina aeroespacial: el cuerpo humano en altitud, en aviación y en el espacio.',
    abre: 'Papos de Altitude es un app-book de medicina aeroespacial. Explica, de la forma más clara posible, lo que le ocurre al cuerpo humano cuando sube: en la cabina de un avión, en el cockpit de un caza, en una montaña o en una nave espacial.',
    numeros: 'Hoy hay {voos} vuelos listos, con {topicos} temas, {interativos} simuladores, calculadoras y gráficos interactivos, {fotos} fotos, {videos} vídeos y {questoes} preguntas de test.',
    temas: 'Cada vuelo combina texto progresivo, fotos, animaciones, tablas prácticas y un test final. En los vuelos de sistemas del cuerpo encontrarás qué cambia en altitud, cómo prevenir, cuándo se puede volar como pasajero o tripulante y qué medicamentos son compatibles con el vuelo.',
    publico: 'Hecho para pilotos, tripulantes de cabina, médicos, estudiantes, pasajeros y curiosos. La app incluye también el Examen CMA, para prepararse para el reconocimiento médico aeronáutico, la Autorización para volar, el Laboratorio con todos los interactivos y un ranking de conocimiento. Disponible en portugués, inglés y español.',
    aviso: 'La app es educativa y no sustituye al médico ni al médico examinador aéreo designado por la autoridad de aviación.',
    missao: 'Vuelos listos',
    atualiza: 'Se añaden vuelos nuevos con frecuencia, sin coste adicional para quien ya tiene el acceso completo.',
  },
};

function ficha(l: Lingua) {
  const t = TEXTOS[l];
  const numeros = t.numeros
    .replace('{voos}', String(prontos.length))
    .replace('{topicos}', String(topicos))
    .replace('{interativos}', String(interativos))
    .replace('{fotos}', String(fotos))
    .replace('{videos}', String(videos))
    .replace('{questoes}', String(questoes));
  const lista = secoes
    .map((s) => {
      const v = prontos.filter((p) => p.s.id === s.id);
      if (!v.length) return '';
      return `${tr(l, s.titulo)}: ${v.map((p) => tr(l, p.c.titulo)).join(' · ')}`;
    })
    .filter(Boolean)
    .join('\n');
  const longa = [t.abre, numeros, t.temas, `${t.missao}\n${lista}`, t.publico, t.atualiza, t.aviso].join('\n\n');
  const erros: string[] = [];
  if (t.titulo.length > 30) erros.push(`título com ${t.titulo.length} caracteres (máx. 30)`);
  if (t.curta.length > 80) erros.push(`descrição curta com ${t.curta.length} caracteres (máx. 80)`);
  if (longa.length > 4000) erros.push(`descrição completa com ${longa.length} caracteres (máx. 4.000)`);
  const md = `<!-- Gerado por scripts/gerar-loja.ts. Não edite à mão: rode npm run loja:ficha. -->
# Ficha da loja · ${l}

## Título (${t.titulo.length}/30)
${t.titulo}

## Descrição curta (${t.curta.length}/80)
${t.curta}

## Descrição completa (${longa.length}/4000)
${longa}
`;
  return { md, erros };
}

const conferir = process.argv.includes('--check');
let falhou = false;
for (const l of ['pt-BR', 'en-US', 'es-ES'] as Lingua[]) {
  const { md, erros } = ficha(l);
  const arq = join(raiz, `docs/loja/ficha-${l}.md`);
  for (const e of erros) {
    console.error(`ERRO ${l}: ${e}`);
    falhou = true;
  }
  if (conferir) {
    let atual = '';
    try {
      atual = readFileSync(arq, 'utf8');
    } catch {}
    if (atual !== md) {
      console.error(`ERRO: docs/loja/ficha-${l}.md está desatualizada. Rode npm run loja:ficha e faça o commit.`);
      falhou = true;
    }
  } else {
    writeFileSync(arq, md);
  }
}
console.log(`${prontos.length} voos prontos · ${topicos} tópicos · ${interativos} interativos · ${fotos} fotos · ${videos} vídeos · ${questoes} questões`);
if (falhou) process.exit(1);
