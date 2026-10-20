"""Corrige o acento circunflexo da fonte Acme, que vem desenhado de cabeça para baixo.

Nos glifos â ê ô Â Ê Ô (e no ˆ isolado), o contorno do acento é espelhado na
vertical em torno do próprio centro. Como a licença SIL OFL reserva o nome "Acme",
a versão modificada recebe outro nome de família: "AppBook Display".

Uso: python3 corrigir_circunflexo.py <Acme_400Regular.ttf> <saida.ttf>
"""
import sys

from fontTools.ttLib import TTFont
from fontTools.ttLib.tables._g_l_y_f import GlyphCoordinates

ALVOS = {
    'acircumflex': 'a', 'ecircumflex': 'e', 'ocircumflex': 'o',
    'Acircumflex': 'A', 'Ecircumflex': 'E', 'Ocircumflex': 'O',
}
NOVO_NOME = 'AppBook Display'


def contornos(glifo):
    inicio = 0
    for fim in glifo.endPtsOfContours:
        yield inicio, fim
        inicio = fim + 1


def espelhar(glifo, faixas):
    coords = list(glifo.coordinates)
    flags = list(glifo.flags)
    for ini, fim in faixas:
        ys = [coords[i][1] for i in range(ini, fim + 1)]
        soma = min(ys) + max(ys)
        trecho = [(x, soma - y) for x, y in coords[ini:fim + 1]]
        # Espelhar inverte o sentido do contorno; invertemos a ordem dos pontos para manter o preenchimento.
        coords[ini:fim + 1] = [trecho[0]] + trecho[1:][::-1]
        trecho_flags = flags[ini:fim + 1]
        flags[ini:fim + 1] = [trecho_flags[0]] + trecho_flags[1:][::-1]
    glifo.coordinates = GlyphCoordinates(coords)
    glifo.flags = bytearray(flags)


def main(origem, destino):
    fonte = TTFont(origem)
    glyf = fonte['glyf']
    for nome, base in ALVOS.items():
        g, b = glyf[nome], glyf[base]
        b.recalcBounds(glyf)
        topo_base = b.yMax
        # O acento é o contorno que fica inteiro acima do topo da letra-base.
        faixas = [(i, f) for i, f in contornos(g) if min(g.coordinates[k][1] for k in range(i, f + 1)) >= topo_base - 5]
        if len(faixas) != 1:
            raise SystemExit(f'{nome}: esperado 1 contorno de acento, achei {len(faixas)}')
        espelhar(g, faixas)
        g.recalcBounds(glyf)
    if 'circumflex' in glyf.keys():
        g = glyf['circumflex']
        espelhar(g, list(contornos(g)))
        g.recalcBounds(glyf)

    nomes = fonte['name']
    for registro in nomes.names:
        texto = registro.toUnicode()
        if registro.nameID in (1, 4, 16):
            registro.string = texto.replace('Acme', NOVO_NOME)
        elif registro.nameID in (3, 6):
            registro.string = texto.replace('Acme', NOVO_NOME.replace(' ', ''))
    nomes.setName(
        'Baseada em Acme (Juan Pablo del Peral), com o acento circunflexo corrigido. Licença SIL OFL 1.1.',
        10, 3, 1, 0x409,
    )
    fonte.save(destino)
    print('ok:', destino)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
