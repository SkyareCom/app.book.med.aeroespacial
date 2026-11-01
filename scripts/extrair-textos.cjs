// Extrai do código-fonte todos os textos que aparecem para o leitor (em português), para os dicionários de tradução.
// Uso: node scripts/extrair-textos.cjs [--json saída.json]
// Strings com ${...} viram modelos: números entram como {0}, {1}...; expressões não numéricas ficam como {x}.
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const IGNORAR = [/src\/i18n\//, /\.d\.ts$/];
const arquivos = [];
(function andar(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) andar(p);
    else if (/\.(ts|tsx)$/.test(f) && !IGNORAR.some((r) => r.test(p))) arquivos.push(p);
  }
})(path.join(RAIZ, 'src'));

// É texto para o leitor? Tem letra e (espaço, acento ou inicial maiúscula), e não parece código.
function exibivel(s) {
  if (!/[A-Za-zÀ-ÿ]/.test(s)) return false;
  if (/^(#|rgba?\(|https?:|@\/|\.\/|\/)/.test(s)) return false;
  if (/^[a-z0-9_:.\-\/]+$/.test(s)) return false; // ids, rotas, estilos
  if (/^[A-Z0-9_]+$/.test(s) && s.length <= 3) return false;
  if (/^[MLQCZHVmlqczhv0-9 .,\-]+$/.test(s) && /\d/.test(s)) return false; // caminhos SVG
  if (/^(application|image)\//.test(s)) return false;
  if (/^[MLQCZHVAmlqczhva0-9 .,\-{}]+$/.test(s)) return false; // caminhos SVG com variáveis
  if (!/[A-Za-zÀ-ÿ]{2}/.test(s.replace(/\{\d+\}/g, ''))) return false;
  if (/^[a-z]+[A-Z][A-Za-z0-9]*$/.test(s) || /^[a-z]+-\{\d+\}$/.test(s) || /^(POST|GET|en-US|es-ES|pt-BR)$/.test(s)) return false; // ids e códigos
  return true;
}

function pularNo(no) {
  const pai = no.parent;
  if (!pai) return false;
  if (ts.isImportDeclaration(pai) || ts.isExportDeclaration(pai)) return true;
  if (ts.isCallExpression(pai) && ['require'].includes(pai.expression.getText())) return true;
  if (ts.isPropertyAssignment(pai) && pai.name === no) return true; // chaves de objeto
  if (ts.isLiteralTypeNode(pai)) return true; // tipos
  if (ts.isElementAccessExpression(pai)) return true;
  if (ts.isCaseClause(pai)) return true;
  if (ts.isBinaryExpression(pai) && ['===', '!==', '==', '!='].includes(pai.operatorToken.getText())) return true;
  if (ts.isJsxAttribute(pai) && ['testID', 'key', 'nativeID', 'fontFamily', 'textAnchor', 'fill', 'stroke', 'd', 'type', 'name'].includes(pai.name.getText())) return true;
  if (ts.isPropertyAssignment(pai) && ['id', 'ref', 'tipo', 'midia', 'topico', 'dificuldade', 'unidade_', 'fonte', 'chave', 'icone', 'cor', 'campo', 'secao'].includes(pai.name.getText())) return true;
  return false;
}

const MARCA = '\u0000';
const numerar = (t) => t.replace(/\d+(?:[.,]\d+)*/g, MARCA);
function renumerar(t) { let i = 0; return t.replace(/\u0000/g, () => `{${i++}}`); }

const textos = new Map(); // texto -> [arquivos]
function guardar(s, arq) {
  s = s.replace(/\s+$/,'');
  if (!s.trim() || !exibivel(s)) return;
  if (!textos.has(s)) textos.set(s, new Set());
  textos.get(s).add(path.relative(RAIZ, arq));
}

for (const arq of arquivos) {
  const fonte = ts.createSourceFile(arq, fs.readFileSync(arq, 'utf8'), ts.ScriptTarget.Latest, true, arq.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  (function visitar(no) {
    if ((ts.isStringLiteral(no) || ts.isNoSubstitutionTemplateLiteral(no)) && !pularNo(no)) guardar(no.text, arq);
    else if (ts.isTemplateExpression(no) && !pularNo(no)) {
      let s = numerar(no.head.text);
      for (const span of no.templateSpans) s += MARCA + numerar(span.literal.text);
      guardar(renumerar(s), arq);
    } else if (ts.isJsxText(no)) {
      const s = no.getText().replace(/\s+/g, ' ').trim();
      if (s) guardar(s, arq);
    }
    // Frase montada em JSX (texto + {valores}), como o componente Texto a junta antes de traduzir.
    if ((ts.isJsxElement(no) || ts.isJsxFragment(no)) && no.children.some(ts.isJsxText) && no.children.some((c) => ts.isJsxExpression(c) && c.expression) && !no.children.some((c) => ts.isJsxElement(c) || ts.isJsxSelfClosingElement(c))) {
      let s = '';
      for (const c of no.children) {
        if (ts.isJsxText(c)) s += numerar(c.text.replace(/\s*\n\s*/g, ''));
        else if (ts.isJsxExpression(c) && c.expression) s += ts.isStringLiteral(c.expression) ? numerar(c.expression.text) : MARCA;
      }
      guardar(renumerar(s.trim()), arq);
    }
    ts.forEachChild(no, visitar);
  })(fonte);
}

const lista = [...textos.keys()].sort();
const saida = process.argv.indexOf('--json');
if (saida > 0) fs.writeFileSync(process.argv[saida + 1], JSON.stringify(Object.fromEntries(lista.map((t) => [t, [...textos.get(t)]])), null, 1));
const chars = lista.reduce((n, t) => n + t.length, 0);
console.log(`${lista.length} textos, ${chars} caracteres`);
