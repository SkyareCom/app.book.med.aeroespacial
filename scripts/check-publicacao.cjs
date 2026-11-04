// Confere se o app continua pronto para a Google Play e para o PWA (iPhone e venda por link).
// Uso: npm run check:publicacao            → roda no CI a cada push (pendências de cadastro só avisam)
//      npm run check:publicacao -- --loja  → antes de enviar à loja (pendências de cadastro viram erro)
// Ver docs/publicacao.md.
const fs = require('node:fs');
const path = require('node:path');
const { execSync } = require('node:child_process');

const raiz = path.join(__dirname, '..');
const ler = (f) => fs.readFileSync(path.join(raiz, f), 'utf8');
const existe = (f) => fs.existsSync(path.join(raiz, f));
const loja = process.argv.includes('--loja');
const erros = [];
const avisos = [];
const erro = (m) => erros.push(m);
const pendencia = (m) => (loja ? erros : avisos).push(m);

// 1. Configuração nativa
const app = JSON.parse(ler('app.json')).expo;
const pkg = JSON.parse(ler('package.json'));
const PACOTE = 'com.skyare.paposdealtitude';
if (app.android?.package !== PACOTE) erro(`app.json: android.package deve ser ${PACOTE} (permanente na Google Play).`);
if (app.ios?.bundleIdentifier !== PACOTE) erro(`app.json: ios.bundleIdentifier deve ser ${PACOTE}.`);
if (!/^\d+\.\d+\.\d+$/.test(app.version || '')) erro('app.json: version deve ser x.y.z.');
if (app.version !== pkg.version) erro(`Versões diferentes: app.json ${app.version} × package.json ${pkg.version}.`);
for (const f of [app.icon, app.android?.adaptiveIcon?.foregroundImage, app.android?.adaptiveIcon?.backgroundImage, app.android?.adaptiveIcon?.monochromeImage]) {
  if (!f || !existe(f)) erro(`Ícone ausente: ${f}`);
}
if (!app.ios?.privacyManifests) erro('app.json: falta ios.privacyManifests.');
const eas = JSON.parse(ler('eas.json'));
if (eas.cli?.appVersionSource !== 'remote' || !eas.build?.production?.autoIncrement) erro('eas.json: production precisa de appVersionSource remote e autoIncrement.');
if (eas.build?.production?.android?.buildType !== 'app-bundle') erro('eas.json: production Android deve gerar app-bundle (AAB).');
if (!app.extra?.eas?.projectId) pendencia('app.json: sem extra.eas.projectId (rode npx eas-cli@latest init com a conta Expo).');

// 2. Páginas legais públicas
const ROTAS = ['privacidade', 'termos', 'aviso-medico', 'excluir-dados'];
const layout = ler('src/app/_layout.tsx');
for (const r of ROTAS) {
  if (!existe(`src/app/${r}.tsx`)) erro(`Falta a rota src/app/${r}.tsx.`);
  if (!layout.includes(`'/${r}'`)) erro(`A rota /${r} precisa estar em ROTAS_LIVRES (_layout.tsx) para abrir sem login.`);
  if (existe('dist/index.html') && !existe(`dist/${r}.html`)) erro(`O site exportado não tem dist/${r}.html.`);
}
const perfil = ler('src/app/perfil.tsx');
if (!perfil.includes("'/excluir-dados'")) erro('O Perfil precisa ter o link para Apagar meus dados (exigência das lojas).');
if (!ler('src/components/entrar.tsx').includes("'/termos'")) erro('A tela de entrada precisa do aceite dos Termos.');

// 3. Cadastro do responsável
const editora = ler('src/constants/editora.ts');
for (const campo of ['responsavel', 'documento', 'email']) {
  if (new RegExp(`${campo}: PENDENTE`).test(editora)) pendencia(`src/constants/editora.ts: preencher "${campo}".`);
}

// 4. PWA
for (const f of ['public/manifest.webmanifest', 'public/sw.js', 'public/icones/icone-192.png', 'public/icones/icone-512.png', 'public/icones/icone-mascara-512.png', 'public/icones/apple-touch-icon.png']) {
  if (!existe(f)) erro(`PWA: falta ${f}.`);
}
const html = ler('src/app/+html.tsx');
if (!html.includes('manifest.webmanifest') || !html.includes('sw.js') || !html.includes('headNodes') || !html.includes('bodyNodes')) {
  erro('src/app/+html.tsx precisa do manifesto, do service worker e de headNodes/bodyNodes.');
}
const base = app.experiments?.baseUrl || '';
const manifesto = JSON.parse(ler('public/manifest.webmanifest'));
if (manifesto.start_url !== `${base}/` || !html.includes(`'${base}'`)) erro(`PWA: start_url e BASE de +html.tsx devem seguir experiments.baseUrl (${base}).`);

// 5. Ficha da loja e imagens
for (const f of ['docs/loja/icone-512.png', 'docs/loja/destaque-1024x500.png', 'docs/loja/seguranca-dados.md']) {
  if (!existe(f)) erro(`Loja: falta ${f}.`);
}
const capturas = existe('docs/loja/capturas') ? fs.readdirSync(path.join(raiz, 'docs/loja/capturas')).filter((f) => f.startsWith('pt-BR-')) : [];
if (capturas.length < 2) erro('Loja: a Google Play exige pelo menos 2 capturas de tela (python3 tools/loja/capturas.py).');
try {
  execSync('npx tsx --require ./scripts/stub-assets.cjs scripts/gerar-loja.ts --check', { cwd: raiz, stdio: 'pipe' });
} catch (e) {
  erro(`Ficha da loja desatualizada ou fora dos limites:\n${String(e.stderr || e.stdout).trim()}`);
}

// 6. Cobrança
const acesso = ler('src/lib/acesso.ts');
if (/COBRANCA_ATIVA = true/.test(acesso)) {
  if (/linkCompra: PENDENTE/.test(acesso)) erro('Cobrança ligada sem PRODUTO.linkCompra.');
  if (!existe('supabase/migrations/20261104000000_acessos.sql')) erro('Cobrança ligada sem a tabela de acessos.');
} else {
  avisos.push('Cobrança desligada (COBRANCA_ATIVA = false): todo o conteúdo está aberto.');
}

for (const a of avisos) console.log(`AVISO: ${a}`);
if (erros.length) {
  for (const e of erros) console.error(`ERRO: ${e}`);
  process.exit(1);
}
console.log(`Publicação: tudo certo para ${loja ? 'enviar à loja' : 'o CI'} (versão ${app.version}).`);
