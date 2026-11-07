'use strict';
// M2V11: traduzir o texto renderizado POR PARÁGRAFO, não só o conjunto de 6 partes.
// TextoCorrente usa texto.split(/\n\s*\n/) e busca tr(p.trim()).
// Esse teste bloqueia deploys em que o texto parece traduzido no JSON mas fica em PT na tela.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'src/data/capitulos/sangue-imunidade.ts'), 'utf8');
const blocks = [...src.matchAll(/"texto": "((?:\\.|[^"\\])*)"/g)]
  .map(m => JSON.parse('"' + m[1] + '"'));
if (blocks.length !== 6) throw Error('M2V11 precisa ter 6 tópicos com texto.');
for (const language of ['en-US', 'es-ES']) {
  const dic = JSON.parse(fs.readFileSync(path.join(root, 'src/i18n', language + '.json'), 'utf8'));
  let checked=0;
  for (const text of blocks) {
    const paragraphs = text.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
    if(paragraphs.length!==6) throw Error('Tópico sem 6 parágrafos no M2V11.');
    for (const par of paragraphs) {
      const target=dic[par];
      if(typeof target!=='string'||target.trim().length<par.length*0.25)
        throw Error(language+': tradução ausente/curta para '+par.slice(0,80));
      const sourceMarkers=(par.match(/\*\*/g)||[]).length;
      if((target.match(/\*\*/g)||[]).length!==sourceMarkers)
        throw Error(language+': número de negritos alterado em '+par.slice(0,80));
      for (const code of new Set(par.match(/M[1-4]V\d+/g)||[]))
        if(!target.includes(code))throw Error(language+': referência '+code+' ausente em '+par.slice(0,80));
      checked++;
    }
  }
  console.log(language+': '+checked+' parágrafos traduzidos e com destaques preservados (M2V11).');
}
