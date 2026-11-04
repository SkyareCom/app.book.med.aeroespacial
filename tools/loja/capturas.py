# Capturas de tela para a ficha da Google Play (e para divulgar o PWA), geradas do site exportado.
# Uso: npm run export:web && python3 tools/loja/capturas.py
# Grava docs/loja/capturas/<idioma>-<n>-<tela>.jpg em 1080x1920 (9:16, celular), nos três idiomas.
# Rode de novo quando um voo novo mudar o que as telas mostram.
import asyncio, functools, http.server, os, threading
from pathlib import Path

from playwright.async_api import async_playwright

RAIZ = Path(__file__).resolve().parents[2]
DIST = RAIZ / 'dist'
SAIDA = RAIZ / 'docs/loja/capturas'
BASE = '/app.book.med.aeroespacial'
PORTA = 8799

TELAS = [
    ('inicio', '/'),
    ('voo', '/capitulo/sistemas/5'),
    ('laboratorio', '/laboratorio'),
    ('liberacao', '/liberacao-voo'),
    ('exame-cma', '/exame-cma'),
    ('sistemas', '/sistemas'),
]
IDIOMAS = {'pt-BR': 'PT BR', 'en-US': 'EN US', 'es-ES': 'ES ES'}


class Servidor(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if path.startswith(BASE):
            path = path[len(BASE):] or '/'
        p = super().translate_path(path)
        if not os.path.exists(p) and os.path.exists(p + '.html'):
            return p + '.html'
        return p

    def log_message(self, *a):
        pass


async def main():
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', PORTA), functools.partial(Servidor, directory=str(DIST)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    SAIDA.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for lingua, rotulo in IDIOMAS.items():
            pg = await b.new_page(viewport={'width': 360, 'height': 640}, device_scale_factor=3)
            await pg.goto(f'http://127.0.0.1:{PORTA}{BASE}/')
            await pg.wait_for_timeout(2500)
            botao = pg.get_by_text(rotulo, exact=True)
            if await botao.count():
                await botao.first.click(force=True)
                await pg.wait_for_timeout(800)
            for i, (nome, rota) in enumerate(TELAS, 1):
                await pg.goto(f'http://127.0.0.1:{PORTA}{BASE}{rota}')
                await pg.wait_for_timeout(2500)
                sem = pg.get_by_text('Continuar sem conta').or_(pg.get_by_text('Continue without an account')).or_(pg.get_by_text('Continuar sin cuenta'))
                if await sem.count():
                    await sem.first.click(force=True)
                    await pg.wait_for_timeout(2500)
                await pg.screenshot(path=str(SAIDA / f'{lingua}-{i}-{nome}.jpg'), type='jpeg', quality=85)
            await pg.close()
        await b.close()
    srv.shutdown()


asyncio.run(main())
