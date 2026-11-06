// Integração idempotente de mídias do M2V10, executada SOMENTE depois de copiar os arquivos
// do ZIP para assets/images/topicos e assets/videos. Não modifica Missão Conceitos ou M2V1.
// Uso: node scripts/m2v10-integrar-midias.cjs
const fs = require('node:fs');
const path = require('node:path');

const raiz = path.resolve(__dirname, '..');
const origem = path.join(raiz, 'src/data/capitulos/digestivo.ts');
const media = [
  ['10.1', 1, 'figura', 'm2v10-1-cabine.jpg', 'Na subida, o gás abdominal pode expandir e causar desconforto.'],
  ['10.1', 2, 'video', 'm2v10-gas-cabine.mp4', 'Uma passageira sente desconforto abdominal leve e encontra uma posição confortável.'],
  ['10.1', 5, 'figura', 'm2v10-1-corredor.jpg', 'Caminhar quando permitido ajuda o conforto e a circulação.'],
  ['10.2', 1, 'figura', 'm2v10-2-refeicao.jpg', 'Refeições leves e postura ereta podem aliviar o refluxo.'],
  ['10.2', 4, 'figura', 'm2v10-2-consulta.jpg', 'O médico avalia a causa da dor, o sangramento e a segurança do voo.'],
  ['10.3', 1, 'figura', 'm2v10-3-hidratacao.jpg', 'Com diarreia, a perda de água e sais exige reposição cuidadosa.'],
  ['10.3', 4, 'figura', 'm2v10-3-acompanhamento.jpg', 'O controle da doença inflamatória intestinal precisa de acompanhamento.'],
  ['10.4', 1, 'figura', 'm2v10-4-avaliacao.jpg', 'O exame clínico investiga sinais de doença hepática descompensada.'],
  ['10.4', 4, 'figura', 'm2v10-4-tratamento.jpg', 'O uso de medicamentos depende da função do fígado e dos seus efeitos.'],
  ['10.5', 1, 'figura', 'm2v10-5-vesicula.jpg', 'O quadro biliar exige distinguir cálculo silencioso de inflamação.'],
  ['10.5', 4, 'figura', 'm2v10-5-pancreas.jpg', 'Dor intensa, vômitos e febre precisam de avaliação antes do embarque.'],
  ['10.6', 1, 'figura', 'm2v10-6-recuperacao.jpg', 'A cicatrização e a função intestinal orientam o retorno após cirurgia.'],
  ['10.6', 4, 'figura', 'm2v10-6-reabilitacao.jpg', 'Recuperar a mobilidade é parte da avaliação pós-operatória.'],
];

const arquivos = media.map(([, ,tipo, nome]) =>
  path.join(raiz, 'assets', tipo === 'video' ? 'videos' : 'images/topicos', nome));
const ausentes = arquivos.filter((f) => !fs.existsSync(f));
if (ausentes.length) {
  console.error('Faltam arquivos na pasta assets/; nenhum código foi modificado:');
  for (const f of ausentes) console.error(' - ' + path.relative(raiz, f));
  process.exit(1);
}
const original = fs.readFileSync(origem, 'utf8');
if (original.includes("m2v10-1-cabine.jpg")) {
  console.log('Mídias já incluídas: nada para alterar.');
  process.exit(0);
}
let proximo = original;
const ids = ['10.1', '10.2', '10.3', '10.4', '10.5', '10.6'];
for (const id of ids) {
  const marcador = `"id": "${id}"`;
  const inicio = proximo.indexOf(marcador);
  const seguinte = ids[ids.indexOf(id) + 1];
  const fim = seguinte ? proximo.indexOf(`"id": "${seguinte}"`, inicio + 1) : proximo.indexOf('  "teste": [', inicio + 1);
  const recurso = proximo.indexOf('"recursos": [', inicio);
  if (inicio < 0 || fim <= inicio || recurso <= inicio || recurso >= fim) {
    throw new Error(`Não localizei recursos isolados para ${id}; código original preservado.`);
  }
  const itens = media.filter((m) => m[0] === id).map(([, paragrafo, tipo, nome, legenda]) => {
    const arquivo = tipo === 'video' ? `@/assets/videos/${nome}` : `@/assets/images/topicos/${nome}`;
    const chave = tipo === 'video' ? 'video' : 'figura';
    const campo = tipo === 'video' ? 'fonte' : 'imagem';
    return `          { "paragrafo": ${paragrafo}, "${chave}": { "${campo}": require('${arquivo}'), "legenda": ${JSON.stringify(legenda)} } },`;
  });
  const pos = recurso + '"recursos": ['.length;
  proximo = proximo.slice(0, pos) + '\n' + itens.join('\n') + proximo.slice(pos);
}
if (media.length !== 13 || proximo === original || !proximo.includes('m2v10-3-acompanhamento.jpg')) {
  throw new Error('Falha no mapa: conteúdo original preservado.');
}
fs.writeFileSync(origem, proximo, 'utf8');
console.log('M2V10: 12 fotografias e 1 vídeo adicionados aos seis tópicos.');
console.log('Execute typecheck, auditoria de mídias, traduções e exportação web antes de publicar.');
