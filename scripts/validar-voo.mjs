/**
 * Validação editorial por etapa (Missão Sistemas) sem alterar arquivos do app.
 * npm exec -- tsx --require ./scripts/stub-assets.cjs scripts/validar-voo.ts M2V10 conteudo
 * npm exec -- tsx --require ./scripts/stub-assets.cjs scripts/validar-voo.ts M2V10 publicar
 * Fonte: docs/modelo-sistemas.md e docs/padrao-midias.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { secoes } from '../src/data/secoes.ts';

const raiz = process.cwd();
const codigo = (process.argv[2] ?? '').toUpperCase();
const fase = process.argv[3] ?? 'conteudo';
const match = /^M([1-4])V([1-9]\d*)$/.exec(codigo);
if (!match || !['conteudo', 'publicar'].includes(fase)) {
  console.error('Uso: validar-voo.ts M2V10 conteudo|publicar');
  process.exit(2);
}
const missao = Number(match[1]), voo = Number(match[2]);
const cap = secoes[missao - 1]?.capitulos[voo - 1];
const erros = [];
const observacoes = [];
const exigir = (condicao, mensagem) => { if (!condicao) erros.push(mensagem); };
if (!cap) {
  console.error('O voo não consta do catálogo: ' + codigo);
  process.exit(1);
}
const topicos = cap.topicos;
const todos = topicos.filter(t => t.conteudo?.texto?.trim());
exigir(topicos.length >= 2, 'Devem existir abertura e desenvolvimento.');
exigir(todos.length === topicos.length, 'Há tópicos sem conteúdo.');
const formatos = new Set();
const temTabela = (recursos, nome) =>
  (recursos ?? []).some(r => r.tabela?.titulo.startsWith(nome));
for (let i = 0; i < todos.length; i++) {
  const t = todos[i], c = t.conteudo;
  const prefixo = codigo + ' ' + t.id + ' ' + t.titulo + ': ';
  const ps = c.texto.split('\n\n').filter(Boolean);
  const recursos = c.recursos ?? [];
  exigir(ps.length >= 6, prefixo + 'texto precisa de seis parágrafos progressivos.');
  exigir(c.texto.includes('**Como prevenir e amenizar.**'), prefixo + 'falta orientação prática final.');
  exigir(temTabela(recursos, 'Como prevenir e amenizar'), prefixo + 'falta tabela prática.');
  exigir(recursos.length > 0, prefixo + 'não há mídias didáticas.');
  for (const r of recursos) {
    exigir(Number.isInteger(r.paragrafo) && (r.paragrafo ?? 0) >= 1 && (r.paragrafo ?? 0) <= ps.length,
      prefixo + 'recurso posicionado fora dos parágrafos.');
    if (r.figura) formatos.add('foto');
    if (r.video) formatos.add('vídeo');
    if (r.midia) formatos.add(r.midia.startsWith('animacao') ? 'animação' : 'interativo');
    if (r.tabela) {
      formatos.add('tabela');
      exigir(r.tabela.colunas.length >= 2 && r.tabela.linhas.length > 0 &&
        r.tabela.linhas.every(l => l.length === r.tabela.colunas.length),
        prefixo + 'tabela com tamanho inconsistente: ' + r.tabela.titulo);
    }
  }
  const interativos = recursos.filter(r => r.midia && !r.midia.startsWith('animacao')).length;
  exigir(interativos >= 1, prefixo + 'falta um interativo.');
  if (missao === 2) {
    if (i === 0) {
      exigir(temTabela(recursos, 'O que muda em altitude'), prefixo + 'falta tabela de altitude.');
    } else {
      exigir(temTabela(recursos, 'Liberação para voo'), prefixo + 'falta tabela de liberação para voo.');
      exigir(temTabela(recursos, 'Remédios e voo'), prefixo + 'falta tabela sobre remédios.');
    }
  }
  const fotos = recursos.filter(r => !!r.figura).length;
  if (fase === 'publicar') {
    exigir(fotos >= 2, prefixo + 'faltam 2 fotos reais.');
    exigir(recursos.some(r => (r.paragrafo ?? ps.length) <= 2 &&
      (r.figura || r.midia?.startsWith('animacao'))), prefixo + 'abertura sem foto ou animação.');
    const pos = new Set(recursos.map(r => r.paragrafo));
    let consecutivos = 0, maior = 0;
    for (let j = 1; j <= ps.length; j++) {
      consecutivos = pos.has(j) ? 0 : consecutivos + 1;
      maior = Math.max(maior, consecutivos);
    }
    exigir(maior <= 1, prefixo + 'mais de um parágrafo consecutivo sem mídia.');
  } else if (fotos < 2) {
    observacoes.push(t.id + ': aguarda ' + (2 - fotos) + ' fotografia(s).');
  }
  console.log(t.id + ' ' + t.titulo + ': ' + ps.length + ' parágrafos, ' + fotos +
    ' fotos, ' + interativos + ' interativo(s), ' + recursos.filter(r => r.tabela).length + ' tabela(s).');
}
exigir(temTabela(todos[todos.length - 1]?.conteudo?.recursos, 'Sistemas do corpo mais atingidos'),
  'Falta a tabela final Sistemas do corpo mais atingidos.');
exigir((cap.teste?.length ?? 0) >= 10, 'Teste do conhecimento: mínimo de dez questões.');
for (const q of cap.teste ?? []) {
  exigir(q.opcoes.length === 4 && q.correta >= 0 && q.correta < 4 && !!q.explicacao.trim() &&
    todos.some(t => t.id === q.topico), 'Teste com questão incompleta ou tópico inválido.');
}
if (missao === 2) {
  exigir((cap.liberacao?.length ?? 0) >= 1, 'Falta o formulário de liberação do sistema.');
  for (const q of cap.liberacao ?? []) {
    exigir(q.opcoes.length >= 2 && q.opcoes.every(o =>
      o.rotulo && o.passageiro?.nivel && o.tripulante?.nivel &&
      ['liberado', 'cuidados', 'avaliar', 'nao-voar'].includes(o.passageiro.nivel) &&
      ['liberado', 'cuidados', 'avaliar', 'nao-voar'].includes(o.tripulante.nivel)),
      'Formulário sem alternativas completas para passageiro e tripulante: ' + q.id);
  }
  // Cada tópico do voo entra no formulário Liberação para voo seguro com ao menos uma pergunta.
  const topicoDe = (q) => q.topico || q.opcoes.map(o => o.passageiro?.topico || o.tripulante?.topico).find(Boolean);
  for (const t of todos) exigir((cap.liberacao ?? []).some(q => topicoDe(q) === t.id),
    'Tópico sem pergunta no formulário de liberação: ' + t.id + ' ' + t.titulo);
}
for (const formato of ['interativo', 'animação', 'tabela']) exigir(formatos.has(formato),
  'Falta o formato obrigatório ' + formato + '.');
// Inspeção ISO-BMFF nativa: dispensa ffprobe e não usa rede nem instalações extras.
function examinarMP4(b) {
  function atoms(start,end) {
    const all=[];
    for (let p=start;p+8<=end;) {
      const raw=b.readUInt32BE(p),type=b.toString('ascii',p+4,p+8);
      let len=raw,header=8;
      if(raw===1) {if(p+16>end)break;len=Number(b.readBigUInt64BE(p+8));header=16;}
      else if(raw===0)len=end-p;
      if(len<header||p+len>end)break;
      all.push({type,start:p+header,end:p+len});
      p+=len;
    }
    return all;
  }
  const child=(parent,type)=>atoms(parent.start,parent.end).find(x=>x.type===type);
  const moov=atoms(0,b.length).find(x=>x.type==='moov');
  if(!moov)throw new Error('Estrutura moov não encontrada');
  const mvhd=child(moov,'mvhd');
  if(!mvhd)throw new Error('Duração ausente');
  const v1=b[mvhd.start]===1;
  const scale=b.readUInt32BE(mvhd.start+(v1?20:12));
  const units=v1?Number(b.readBigUInt64BE(mvhd.start+24)):b.readUInt32BE(mvhd.start+16);
  if(!scale||!units)throw new Error('Duração inválida');
  let codec='',width=0,height=0,audio=false;
  for(const track of atoms(moov.start,moov.end).filter(x=>x.type==='trak')) {
    const mdia=child(track,'mdia');if(!mdia)continue;
    const hdlr=child(mdia,'hdlr');if(!hdlr)continue;
    const handler=b.toString('ascii',hdlr.start+8,hdlr.start+12);
    if(handler==='soun')audio=true;
    if(handler!=='vide')continue;
    const minf=child(mdia,'minf');
    const stbl=minf&&child(minf,'stbl');
    const stsd=stbl&&child(stbl,'stsd');
    if(!stsd)continue;
    for(const entry of atoms(stsd.start+8,stsd.end)) {
      if(entry.type==='avc1'||entry.type==='avc3') {
        codec=entry.type;
        const p=entry.start-8;
        width=b.readUInt16BE(p+32);
        height=b.readUInt16BE(p+34);
      }
    }
  }
  return {codec,width,height,duration:units/scale,audio};
}

if (fase === 'publicar') {
  exigir(formatos.has('foto') && formatos.has('vídeo'), 'Falta foto ou vídeo no voo.');
  const slug = codigo.toLowerCase();
  const dir = path.join(raiz, 'src/data/capitulos');
  const capitulos = fs.readdirSync(dir).filter(n => n.endsWith('.ts')).map(n =>
    fs.readFileSync(path.join(dir, n), 'utf8'));
  const fonte = capitulos.find(s => s.includes(slug + '-') && s.includes('require(')) ?? '';
  exigir(fonte.length > 0, 'Não há referências aos arquivos reais nas fontes: ' + codigo);
  const arquivos = Array.from(fonte.matchAll(/require\(['"]@\/assets\/(images\/topicos|videos)\/([^'"]+)['"]\)/g),
    m => ({ pasta: m[1], nome: m[2] })).filter(a => a.nome.startsWith(slug + '-'));
  const recursos = todos.flatMap(t => t.conteudo?.recursos ?? []);
  exigir(arquivos.filter(a => a.nome.endsWith('.jpg')).length === recursos.filter(r => !!r.figura).length,
    'As fotos na fonte não correspondem às fotos cadastradas.');
  exigir(arquivos.filter(a => a.nome.endsWith('.mp4')).length === recursos.filter(r => !!r.video).length,
    'Os vídeos na fonte não correspondem aos vídeos cadastrados.');
  const hashes = new Set();
  for (const a of arquivos) {
    const local = path.join(raiz, 'assets', a.pasta, a.nome);
    if (!fs.existsSync(local)) { erros.push('Arquivo ausente: ' + a.nome); continue; }
    const buf = fs.readFileSync(local);
    if (a.nome.endsWith('.jpg')) {
      exigir(buf.length > 15000 && buf[0] === 255 && buf[1] === 216, 'JPEG inválido: ' + a.nome);
      let off = 2, largura = 0, altura = 0;
      while (off + 9 < buf.length) {
        if (buf[off++] !== 255) continue;
        let marca = buf[off++];
        while (marca === 255) marca = buf[off++];
        if ([216, 217, 1, 208, 209, 210, 211, 212, 213, 214, 215].includes(marca)) continue;
        if (marca === 218) break;
        const tamanho = buf.readUInt16BE(off);
        if (tamanho < 2 || off + tamanho > buf.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(marca)) {
          altura = buf.readUInt16BE(off + 3);
          largura = buf.readUInt16BE(off + 5);
          break;
        }
        off += tamanho;
      }
      exigir(largura >= 1280 && altura >= 700 && Math.abs(largura / altura - 16 / 9) < 0.04,
        'Foto fora do padrão: ' + a.nome + ' (' + largura + ' x ' + altura + ').');
      const hash = crypto.createHash('sha256').update(buf).digest('hex');
      exigir(!hashes.has(hash), 'Foto repetida: ' + a.nome);
      hashes.add(hash);
    } else if (a.nome.endsWith('.mp4')) {
      try {
        const info = examinarMP4(buf);
        exigir(info.codec === 'avc1' && info.width >= 1280 &&
          Math.abs(info.width / info.height - 16 / 9) < 0.04 &&
          info.duration >= 2 && info.duration <= 8.5 && !info.audio,
          'MP4 deve ser H.264, 16:9, 2–8,5 segundos, sem som: ' + a.nome);
      } catch (e) { erros.push('Não foi possível validar o MP4 ' + a.nome + ': ' + String(e)); }
    }
  }
} else if (!formatos.has('foto') || !formatos.has('vídeo')) {
  observacoes.push('Fotografias e vídeo são a única etapa de mídia que pode permanecer pendente.');
}
if (erros.length) {
  for (const erro of erros) console.error('ERRO ' + erro);
  process.exit(1);
}
for (const nota of observacoes) console.log('MÍDIA PENDENTE ' + nota);
console.log(codigo + ' · validação ' + fase.toUpperCase() + ' APROVADA.');
