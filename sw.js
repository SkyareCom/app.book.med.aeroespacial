// Papos de Altitude · service worker do PWA (Android e iPhone instalados pelo navegador).
// - Páginas: rede primeiro, cópia guardada se estiver sem internet (o conteúdo novo aparece assim que há conexão).
// - Arquivos com hash no nome (JS, fontes, fotos, vídeos de /_expo e /assets): guardados na primeira vez e
//   servidos do aparelho depois, já que um arquivo novo sempre tem nome novo.
// - Nada do servidor do app (Supabase) passa por aqui: exames, tradução e conta vão sempre direto à rede.
const VERSAO = 'papos-v1';
const BASE = new URL(self.registration.scope).pathname;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => !k.startsWith(VERSAO)).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  // Vídeos usam pedidos parciais (Range): deixa a rede responder.
  if (req.headers.has('range')) return;

  const fixo = url.pathname.startsWith(BASE + '_expo/') || url.pathname.startsWith(BASE + 'assets/') || url.pathname.startsWith(BASE + 'icones/');
  if (fixo) {
    e.respondWith(
      caches.open(VERSAO + '-arquivos').then(async (c) => {
        const guardado = await c.match(req);
        if (guardado) return guardado;
        const resp = await fetch(req);
        if (resp.ok) c.put(req, resp.clone());
        return resp;
      }),
    );
    return;
  }

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((resp) => {
          if (resp.ok) caches.open(VERSAO + '-paginas').then((c) => c.put(req, resp.clone()));
          return resp;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match(BASE)) || Response.error()),
    );
  }
});
