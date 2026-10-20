"""Gera as capas cinematográficas do Papos de Altitude.

Cada episódio (capítulo) recebe uma cena 16:9; cada temporada (seção), uma arte vertical.
As cenas combinam céus, a Terra vista da órbita, silhuetas, linhas de luz e macros,
com brilho (bloom), vinheta, granulação e gradação de cor de cinema.

Uso: python3 capas.py <pasta-de-saida> [nome-da-capa ...]
"""
import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import gaussian_filter, zoom

W, H = 960, 540


# ---------------------------------------------------------------- ruído e base

def fbm(w, h, seed, octaves=6, base=3, persistence=0.55, sx=1.0, sy=1.0):
    rng = np.random.default_rng(seed)
    acc = np.zeros((h, w))
    amp = tot = 0.0
    amp = 1.0
    for o in range(octaves):
        gx = max(2, int(base * 2 ** o * sx))
        gy = max(2, int(base * 2 ** o * sy * h / w))
        g = rng.random((gy + 3, gx + 3))
        acc += amp * zoom(g, ((h + 1) / gy, (w + 1) / gx), order=3)[:h, :w]
        tot += amp
        amp *= persistence
    acc /= tot
    return (acc - acc.min()) / (acc.max() - acc.min() + 1e-9)


def ceu(w, h, paradas):
    y = np.linspace(0, 1, h)[:, None]
    img = np.zeros((h, w, 3))
    for (p0, c0), (p1, c1) in zip(paradas, paradas[1:]):
        t = np.clip((y - p0) / max(p1 - p0, 1e-6), 0, 1)
        m = (y >= p0) & (y <= p1)
        cor = np.array(c0)[None, None] * (1 - t[..., None]) + np.array(c1)[None, None] * t[..., None]
        img = np.where(m[..., None].repeat(w, 1), cor.repeat(w, 1), img)
    return img


def estrelas(img, seed, densidade=1.0, brilho=1.0):
    h, w, _ = img.shape
    rng = np.random.default_rng(seed)
    n = int(w * h / 700 * densidade)
    camada = np.zeros((h, w))
    xs, ys = rng.integers(0, w, n), rng.integers(0, h, n)
    camada[ys, xs] = rng.random(n) ** 5 * 1.6 + 0.12
    camada = np.maximum(camada, gaussian_filter(camada, 0.7) * 2.5)
    for _ in range(max(1, int(4 * densidade))):
        g = np.zeros((h, w))
        g[rng.integers(0, h), rng.integers(0, w)] = 1
        camada += gaussian_filter(g, 3) * 140 * rng.uniform(0.3, 1)
    img += camada[..., None] * np.array([0.9, 0.95, 1.0]) * brilho
    return img


def nebulosa(img, seed, c1, c2, forca=1.0, centro=(0.6, 0.4)):
    h, w, _ = img.shape
    n = fbm(w, h, seed)
    m = fbm(w, h, seed + 7, octaves=4, base=2)
    d = fbm(w, h, seed + 13, octaves=7, base=5)
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx / w - centro[0])) ** 2 + ((yy / h - centro[1]) * 0.8) ** 2)
    dens = np.clip((n * 0.7 + m * 0.5 - 0.45) * 2.2, 0, 1) * np.clip(1.1 - r * 1.8, 0, 1)
    cor = np.array(c1)[None, None] * (1 - n[..., None]) + np.array(c2)[None, None] * n[..., None]
    img += cor * dens[..., None] ** 1.5 * forca * (1 - np.clip((d - 0.55) * 3, 0, 1)[..., None] * 0.7)
    return img


def sol(img, x, y, tam, cor=(1.0, 0.82, 0.55), raio_h=True):
    h, w, _ = img.shape
    g = np.zeros((h, w))
    g[int(np.clip(y, 0, h - 1)), int(np.clip(x, 0, w - 1))] = 1
    img += gaussian_filter(g, tam * 0.18)[..., None] * tam ** 2 * 3 * np.ones(3)
    img += gaussian_filter(g, tam)[..., None] * tam ** 2 * 7 * np.array(cor)
    if raio_h:
        xx = np.arange(w)
        faixa = np.zeros((h, w))
        faixa[int(np.clip(y, 0, h - 1)), :] = np.exp(-((xx - x) / (tam * 9.0)) ** 2)
        img += gaussian_filter(faixa, (1.2, 2))[..., None] * np.array(cor) * 1.2
    return img


def terra(img, cx, cy, R, seed, luz=(0.3, -0.95), noite=False, cor_atm=(0.35, 0.65, 1.25)):
    """Terra com oceano, continentes, nuvens, atmosfera e, no lado escuro, luzes de cidades."""
    h, w, _ = img.shape
    yy, xx = np.mgrid[0:h, 0:w]
    dx, dy = (xx - cx) / R, (yy - cy) / R
    rr = dx ** 2 + dy ** 2
    dentro = rr <= 1
    dz = np.sqrt(np.clip(1 - rr, 0, 1))
    lx, ly = luz
    lz = math.sqrt(max(0.0, 1 - lx * lx - ly * ly))
    lam = np.clip(dx * lx + dy * ly + dz * lz, 0, 1)
    # Coordenadas "esféricas" para a textura acompanhar a curvatura.
    u = dx / (dz + 0.25)
    v = dy / (dz + 0.25)
    tx = fbm(w, h, seed, octaves=7, base=4)
    terra_m = np.clip((tx - 0.52) * 6, 0, 1)
    nuv = fbm(w, h, seed + 3, octaves=7, base=6, sy=0.6)
    nuv = np.clip((nuv - 0.5) * 3.2, 0, 1) * (0.6 + 0.4 * np.abs(np.sin(v * 3 + u)))
    oceano = np.array([0.02, 0.08, 0.2])
    solo = np.array([0.09, 0.13, 0.06]) * (1 - tx[..., None]) + np.array([0.24, 0.2, 0.12]) * tx[..., None]
    sup = oceano * (1 - terra_m[..., None]) + solo * terra_m[..., None]
    sup = sup * (1 - nuv[..., None]) + np.array([0.95, 0.96, 1.0]) * nuv[..., None]
    sombreado = sup * (0.02 + 1.25 * lam[..., None] ** 0.85)
    # Reflexo do sol no oceano.
    esp = np.clip(dx * lx + dy * ly + dz * lz, 0, 1) ** 40 * (1 - terra_m) * (1 - nuv)
    sombreado += esp[..., None] * np.array([1.0, 0.9, 0.7]) * 0.8
    if noite:
        rng = np.random.default_rng(seed + 9)
        cidades = (rng.random((h, w)) < 0.02) * terra_m * (lam < 0.08) * (fbm(w, h, seed + 11, octaves=5, base=8) > 0.55)
        luzes = gaussian_filter(cidades.astype(float), 0.8) * 4
        sombreado += luzes[..., None] * np.array([1.0, 0.75, 0.4])
    borda = np.clip(1 - dz, 0, 1) ** 3
    sombreado += np.array(cor_atm) * borda[..., None] * (0.25 + lam[..., None]) * 0.9
    img[dentro] = sombreado[dentro]
    r = np.sqrt(rr)
    aro = np.clip(1 - np.abs(r - 1) * R / 2.5, 0, 1) * (r > 0.985)
    lado = np.clip((dx * lx + dy * ly) / (r + 1e-9) + 0.45, 0, 1)
    brilho = gaussian_filter(aro * lado, R * 0.03) * 6 + gaussian_filter(aro * lado, R * 0.008) * 4
    img += np.array(cor_atm)[None, None] * brilho[..., None]
    return img


def planeta(img, cx, cy, R, seed, base, escuro, atm, luz=(-0.6, -0.5), faixas=False):
    h, w, _ = img.shape
    yy, xx = np.mgrid[0:h, 0:w]
    dx, dy = (xx - cx) / R, (yy - cy) / R
    rr = dx ** 2 + dy ** 2
    dentro = rr <= 1
    dz = np.sqrt(np.clip(1 - rr, 0, 1))
    lx, ly = luz
    lz = math.sqrt(max(0.0, 1 - lx * lx - ly * ly))
    lam = np.clip(dx * lx + dy * ly + dz * lz, 0, 1)
    tx = fbm(w, h, seed, octaves=8, base=6, sx=1, sy=3 if faixas else 1)
    cr = fbm(w, h, seed + 5, octaves=6, base=14)
    sup = np.array(escuro)[None, None] * (1 - tx[..., None]) + np.array(base)[None, None] * tx[..., None]
    sup *= (0.85 + 0.3 * cr[..., None])
    som = sup * (0.03 + 1.15 * lam[..., None])
    som += np.array(atm) * (np.clip(1 - dz, 0, 1) ** 3)[..., None] * (0.3 + lam[..., None]) * 0.7
    img[dentro] = som[dentro]
    r = np.sqrt(rr)
    aro = np.clip(1 - np.abs(r - 1) * R / 2.5, 0, 1) * (r > 0.985)
    lado = np.clip((dx * lx + dy * ly) / (r + 1e-9) + 0.35, 0, 1)
    img += np.array(atm)[None, None] * (gaussian_filter(aro * lado, R * 0.03) * 4)[..., None]
    return img


def nuvens_baixas(img, seed, topo, cor_luz, cor_sombra, densidade=1.0):
    h, w, _ = img.shape
    n = fbm(w, h, seed, octaves=7, base=5, sy=0.45)
    yy = np.arange(h)[:, None] / h
    altura = np.clip((yy - topo) / (1 - topo + 1e-6), 0, 1)
    m = np.clip((n - 0.62 + altura * 0.75 * densidade) * 4, 0, 1)
    sombra = gaussian_filter(n, 4)
    cor = np.array(cor_sombra)[None, None] * (1 - sombra[..., None]) + np.array(cor_luz)[None, None] * sombra[..., None]
    return img * (1 - m[..., None]) + cor * m[..., None]


def montanhas(img, seed, base_y, altura, cor, rug=1.0):
    h, w, _ = img.shape
    rng = np.random.default_rng(seed)
    x = np.arange(w)
    perfil = np.zeros(w)
    for k in range(1, 7):
        perfil += np.sin(x / w * math.pi * (k * 1.7) + rng.uniform(0, 6)) / k * rug
    perfil = base_y - (perfil - perfil.min()) / (np.ptp(perfil) + 1e-9) * altura
    yy = np.arange(h)[:, None]
    m = (yy >= perfil[None, :]).astype(float)
    m = gaussian_filter(m, 0.6)
    return img * (1 - m[..., None]) + np.array(cor) * m[..., None]


# ---------------------------------------------------------------- desenho vetorial suavizado

def mascara(desenhar, escala=3):
    """Desenha em resolução maior e reduz, para bordas suaves."""
    grande = Image.new('L', (W * escala, H * escala), 0)
    d = ImageDraw.Draw(grande)
    desenhar(d, escala)
    return np.asarray(grande.resize((W, H), Image.LANCZOS), dtype=float) / 255


def silhueta(img, m, cor=(0.01, 0.012, 0.02), aro=None, dir_aro=(0, -1)):
    """Recorta a silhueta escura; com "aro", acende a borda voltada para a luz (luz de recorte)."""
    saida = img * (1 - m[..., None]) + np.array(cor) * m[..., None]
    if aro is not None:
        dx, dy = dir_aro
        vizinho = np.roll(np.roll(m, -int(round(dy * 2)), 0), -int(round(dx * 2)), 1)
        borda = np.clip(m - vizinho, 0, 1)
        saida += np.array(aro) * (borda * 1.6 + gaussian_filter(borda, 1.5) * 2.5)[..., None]
    return saida


def brilho_linha(img, pontos, cor, largura=2, intensidade=1.0, fechar=False):
    def des(d, e):
        pts = [(x * e, y * e) for x, y in pontos]
        if fechar:
            pts = pts + [pts[0]]
        d.line(pts, fill=255, width=max(1, int(largura * e)), joint='curve')
    m = mascara(des)
    luz = m * 1.6 + gaussian_filter(m, 3) * 3 + gaussian_filter(m, 10) * 4 + gaussian_filter(m, 28) * 4
    img += np.array(cor) * luz[..., None] * intensidade
    return img


def bokeh(img, seed, n, cor, tam=(6, 30), area=(0, 0, 1, 1), alfa=0.35):
    rng = np.random.default_rng(seed)
    def des(d, e):
        for _ in range(n):
            r = rng.uniform(*tam) * e
            x = rng.uniform(area[0], area[2]) * W * e
            y = rng.uniform(area[1], area[3]) * H * e
            d.ellipse([x - r, y - r, x + r, y + r], fill=int(255 * rng.uniform(0.3, 1)))
    m = gaussian_filter(mascara(des), 1.5)
    img += np.array(cor) * m[..., None] * alfa
    return img


def rot(pts, cx, cy, s, ang=0.0):
    c, sn = math.cos(ang), math.sin(ang)
    return [(cx + (x * c - y * sn) * s, cy + (x * sn + y * c) * s) for x, y in pts]


# Silhuetas em coordenadas normalizadas (x para a direita, y para baixo).
AVIAO = {
    'fuselagem': [(-1.0, -0.05), (0.82, -0.06), (0.95, -0.03), (1.0, 0.0), (0.95, 0.04), (0.8, 0.06), (-0.85, 0.06), (-1.0, 0.0)],
    'deriva': [(-0.62, -0.05), (-0.86, -0.42), (-0.97, -0.42), (-0.92, -0.04)],
    'estab': [(-0.75, 0.0), (-0.98, 0.1), (-1.02, 0.08), (-0.9, -0.01)],
    'asa': [(0.18, 0.04), (-0.22, 0.2), (-0.33, 0.2), (-0.06, 0.04)],
    'motor': [(0.02, 0.1), (0.2, 0.09), (0.22, 0.14), (0.04, 0.16)],
}
CACA = {
    'corpo': [(1.0, 0.0), (0.55, -0.06), (0.1, -0.08), (-0.75, -0.06), (-0.95, -0.02), (-0.95, 0.04), (-0.4, 0.07), (0.6, 0.05)],
    'asa': [(0.25, 0.02), (-0.45, 0.32), (-0.62, 0.32), (-0.45, 0.04)],
    'deriva': [(-0.55, -0.06), (-0.85, -0.42), (-0.97, -0.42), (-0.9, -0.05)],
    'cabine': [(0.55, -0.06), (0.32, -0.15), (0.12, -0.12), (0.1, -0.08)],
}
HELI = {
    'corpo': [(0.55, 0.0), (0.45, -0.18), (0.1, -0.24), (-0.25, -0.18), (-0.3, 0.12), (0.35, 0.16)],
    'cauda': [(-0.25, -0.12), (-1.0, -0.08), (-1.0, -0.03), (-0.25, 0.05)],
    'deriva': [(-0.88, -0.07), (-1.0, -0.3), (-1.05, -0.3), (-1.02, -0.03)],
    'mastro': [(0.02, -0.24), (0.06, -0.24), (0.06, -0.32), (0.02, -0.32)],
    'esqui': [(-0.25, 0.24), (0.5, 0.24), (0.55, 0.21), (0.5, 0.27), (-0.25, 0.27)],
}
CABECA = [(0.0, -1.0), (0.32, -0.95), (0.55, -0.75), (0.62, -0.5), (0.62, -0.3), (0.74, -0.08), (0.62, 0.0), (0.66, 0.12), (0.6, 0.2), (0.62, 0.32),
          (0.5, 0.42), (0.42, 0.6), (0.2, 0.62), (0.15, 0.85), (0.2, 1.1), (-0.6, 1.1), (-0.55, 0.7), (-0.62, 0.3), (-0.65, -0.3), (-0.5, -0.75), (-0.28, -0.95)]


def poligonos(img, partes, cx, cy, s, ang=0.0, cor=(0.01, 0.012, 0.02), aro=None, dir_aro=(0, -1), extras=None):
    def des(d, e):
        for pts in partes:
            d.polygon([(x * e, y * e) for x, y in rot(pts, cx, cy, s, ang)], fill=255)
        if extras:
            extras(d, e)
    return silhueta(img, mascara(des), cor, aro, dir_aro)


def aviao(img, cx, cy, s, ang=0.0, aro=None, dir_aro=(0, -1)):
    return poligonos(img, AVIAO.values(), cx, cy, s, ang, aro=aro, dir_aro=dir_aro)


def caca(img, cx, cy, s, ang=0.0, aro=None, dir_aro=(0, -1)):
    return poligonos(img, CACA.values(), cx, cy, s, ang, aro=aro, dir_aro=dir_aro)


def helicoptero(img, cx, cy, s, ang=0.0, aro=None):
    def rotor(d, e):
        p = rot([(-0.95, -0.33), (1.0, -0.31)], cx, cy, s, ang)
        d.line([(x * e, y * e) for x, y in p], fill=255, width=int(3 * e))
    return poligonos(img, HELI.values(), cx, cy, s, ang, aro=aro, extras=rotor)


def cabeca(img, cx, cy, s, aro=None, dir_aro=(1, 0), espelhar=False):
    pts = [(-x, y) for x, y in CABECA] if espelhar else CABECA
    return poligonos(img, [pts], cx, cy, s, aro=aro, dir_aro=dir_aro)


def astronauta(img, cx, cy, s, ang=0.0, aro=(0.45, 0.7, 1.2), dir_aro=(0, 1), visor=(1.0, 0.72, 0.3)):
    """Astronauta em silhueta, recortado pela luz da Terra, com o visor dourado refletindo o Sol."""
    def des(d, e):
        def P(pts):
            return [(x * e, y * e) for x, y in rot(pts, cx, cy, s, ang)]
        def membro(a, b, larg):
            (x1, y1), (x2, y2) = P([a, b])
            r = larg * s * e / 2
            d.line([(x1, y1), (x2, y2)], fill=255, width=int(2 * r))
            for x, y in ((x1, y1), (x2, y2)):
                d.ellipse([x - r, y - r, x + r, y + r], fill=255)
        d.rounded_rectangle([min(p[0] for p in P([(-0.34, -0.22), (0.34, 0.42)])), min(p[1] for p in P([(-0.34, -0.22), (0.34, 0.42)])),
                             max(p[0] for p in P([(-0.34, -0.22), (0.34, 0.42)])), max(p[1] for p in P([(-0.34, -0.22), (0.34, 0.42)]))], radius=int(0.14 * s * e), fill=255)
        d.rounded_rectangle([min(p[0] for p in P([(-0.52, -0.3), (-0.26, 0.32)])), min(p[1] for p in P([(-0.52, -0.3), (-0.26, 0.32)])),
                             max(p[0] for p in P([(-0.52, -0.3), (-0.26, 0.32)])), max(p[1] for p in P([(-0.52, -0.3), (-0.26, 0.32)]))], radius=int(0.08 * s * e), fill=255)
        membro((-0.28, -0.12), (-0.62, 0.12), 0.2)
        membro((-0.62, 0.12), (-0.72, 0.38), 0.17)
        membro((0.28, -0.12), (0.6, -0.28), 0.2)
        membro((0.6, -0.28), (0.78, -0.52), 0.17)
        membro((-0.16, 0.4), (-0.24, 0.78), 0.23)
        membro((-0.24, 0.78), (-0.2, 1.08), 0.2)
        membro((0.16, 0.4), (0.3, 0.74), 0.23)
        membro((0.3, 0.74), (0.42, 1.02), 0.2)
        (hx, hy), = P([(0.0, -0.46)])
        r = 0.3 * s * e
        d.ellipse([hx - r, hy - r, hx + r, hy + r], fill=255)
    m = mascara(des)
    img = silhueta(img, m, (0.025, 0.028, 0.035), aro, dir_aro)
    (vx, vy), = rot([(0.06, -0.47)], cx, cy, s, ang)
    def dv(d, e):
        r = 0.19 * s
        d.ellipse([(vx - r) * e, (vy - r * 0.78) * e, (vx + r) * e, (vy + r * 0.78) * e], fill=255)
    v = mascara(dv)
    yy = np.linspace(0, 1, H)[:, None, None]
    reflexo = np.array(visor) * (0.35 + 0.9 * (1 - yy))
    img = img * (1 - v[..., None]) + reflexo * v[..., None]
    img += np.array(visor) * gaussian_filter(v, 3)[..., None] * 0.5
    return img


def balao(img, cx, cy, s, cor=(0.02, 0.015, 0.01), aro=None):
    def des(d, e):
        d.ellipse([(cx - 0.6 * s) * e, (cy - 0.8 * s) * e, (cx + 0.6 * s) * e, (cy + 0.5 * s) * e], fill=255)
        d.polygon([((cx - 0.5 * s) * e, (cy + 0.2 * s) * e), ((cx + 0.5 * s) * e, (cy + 0.2 * s) * e), ((cx + 0.15 * s) * e, (cy + 0.75 * s) * e), ((cx - 0.15 * s) * e, (cy + 0.75 * s) * e)], fill=255)
        d.rectangle([(cx - 0.12 * s) * e, (cy + 0.85 * s) * e, (cx + 0.12 * s) * e, (cy + 1.0 * s) * e], fill=255)
        for k in (-0.12, 0.12):
            d.line([((cx + k * 1.2 * s) * e, (cy + 0.72 * s) * e), ((cx + k * s) * e, (cy + 0.86 * s) * e)], fill=255, width=int(2 * e))
    return silhueta(img, mascara(des), cor, aro)


def paraquedas(img, cx, cy, s, aro=None):
    def des(d, e):
        d.chord([(cx - s) * e, (cy - 0.6 * s) * e, (cx + s) * e, (cy + 0.4 * s) * e], 180, 360, fill=255)
        for k in (-0.95, -0.5, 0, 0.5, 0.95):
            d.line([((cx + k * s) * e, (cy - 0.1 * s) * e), (cx * e, (cy + 0.75 * s) * e)], fill=255, width=int(1.2 * e))
        d.ellipse([(cx - 0.07 * s) * e, (cy + 0.72 * s) * e, (cx + 0.07 * s) * e, (cy + 0.86 * s) * e], fill=255)
        d.line([(cx * e, (cy + 0.85 * s) * e), (cx * e, (cy + 1.1 * s) * e)], fill=255, width=int(0.08 * s * e))
    return silhueta(img, mascara(des), aro=aro)


def foguete(img, cx, cy, s):
    def des(d, e):
        d.polygon([(cx * e, (cy - 1.0 * s) * e), ((cx + 0.12 * s) * e, (cy - 0.7 * s) * e), ((cx + 0.12 * s) * e, (cy + 0.5 * s) * e),
                   ((cx + 0.3 * s) * e, (cy + 0.75 * s) * e), ((cx - 0.3 * s) * e, (cy + 0.75 * s) * e), ((cx - 0.12 * s) * e, (cy + 0.5 * s) * e),
                   ((cx - 0.12 * s) * e, (cy - 0.7 * s) * e)], fill=255)
    m = mascara(des)
    img = img * (1 - m[..., None]) + m[..., None] * np.array([0.78, 0.8, 0.86]) * (0.4 + 0.6 * np.clip(np.linspace(1, 0, W)[None, :] * 0 + gaussian_filter(m, 2), 0, 1)[..., None])
    def chama(d, e):
        d.polygon([((cx - 0.12 * s) * e, (cy + 0.75 * s) * e), ((cx + 0.12 * s) * e, (cy + 0.75 * s) * e), (cx * e, (cy + 2.2 * s) * e)], fill=255)
    f = gaussian_filter(mascara(chama), 3)
    img += f[..., None] * np.array([1.0, 0.7, 0.3]) * 3 + gaussian_filter(f, 18)[..., None] * np.array([1.0, 0.55, 0.2]) * 3
    return img


def estacao(img, cx, cy, s, ang=-0.12):
    def des(d, e):
        def P(pts):
            return [(x * e, y * e) for x, y in rot(pts, cx, cy, s, ang)]
        d.polygon(P([(-1, -0.02), (1, -0.02), (1, 0.02), (-1, 0.02)]), fill=255)
        for x0 in (-0.95, -0.6, 0.45, 0.8):
            d.polygon(P([(x0, -0.5), (x0 + 0.15, -0.5), (x0 + 0.15, -0.05), (x0, -0.05)]), fill=150)
            d.polygon(P([(x0, 0.05), (x0 + 0.15, 0.05), (x0 + 0.15, 0.5), (x0, 0.5)]), fill=150)
        d.polygon(P([(-0.25, -0.06), (0.3, -0.06), (0.3, 0.06), (-0.25, 0.06)]), fill=255)
        d.polygon(P([(-0.05, 0.06), (0.05, 0.06), (0.05, 0.3), (-0.05, 0.3)]), fill=255)
    m = mascara(des)
    img = img * (1 - m[..., None]) + m[..., None] * np.array([0.55, 0.5, 0.35]) * (0.5 + gaussian_filter(m, 1.5)[..., None])
    return img


def ecg(cx0, cy, largura, amp, batidas=3):
    pts = []
    passo = largura / (batidas * 10)
    x = cx0
    for _ in range(batidas):
        for dy in (0, 0, -0.08, 0, 0, 0.15, -1.0, 0.45, 0, 0):
            pts.append((x, cy + dy * amp))
            x += passo
    pts.append((x, cy))
    return pts


def iris(img, cx, cy, R, seed, cor1, cor2):
    h, w, _ = img.shape
    yy, xx = np.mgrid[0:h, 0:w]
    dx, dy = xx - cx, yy - cy
    r = np.sqrt(dx ** 2 + dy ** 2) / R
    a = np.arctan2(dy, dx)
    rng = np.random.default_rng(seed)
    fibras = np.zeros_like(r)
    for k in range(1, 9):
        fibras += np.sin(a * (40 * k + rng.integers(0, 9)) + rng.uniform(0, 6) + r * rng.uniform(3, 9)) / k
    fibras = (fibras - fibras.min()) / np.ptp(fibras)
    radial = 0.5 + 0.5 * np.cos(r * 18 + fibras * 3)
    tex = fibras * 0.6 + radial * 0.4
    cor = np.array(cor1)[None, None] * (1 - r[..., None]) + np.array(cor2)[None, None] * r[..., None]
    corpo = cor * (0.3 + 0.9 * tex[..., None]) * np.clip(1.15 - r, 0, 1)[..., None]
    no_iris = (r < 1) & (r > 0.32)
    img[no_iris] = corpo[no_iris]
    img[r <= 0.32] = 0.005
    anel = np.exp(-((r - 1) / 0.04) ** 2)
    img *= (1 - anel[..., None] * 0.8)
    def refl(d, e):
        d.ellipse([(cx - 0.45 * R) * e, (cy - 0.55 * R) * e, (cx - 0.25 * R) * e, (cy - 0.35 * R) * e], fill=255)
    m = gaussian_filter(mascara(refl), 1.5)
    img += m[..., None] * 2.2
    esclera = (r >= 1) & (r < 1.9)
    img[esclera] = (np.array([0.75, 0.7, 0.68]) * np.clip(1.9 - r, 0, 1)[..., None] ** 0.6)[esclera] * 0.6
    return img


def hemacias(img, seed, n, area=(0, 0, 1, 1), escala=1.0):
    rng = np.random.default_rng(seed)
    h, w, _ = img.shape
    yy, xx = np.mgrid[0:h, 0:w]
    for _ in range(n):
        R = rng.uniform(26, 70) * escala
        cx = rng.uniform(area[0], area[2]) * w
        cy = rng.uniform(area[1], area[3]) * h
        sy = rng.uniform(0.55, 1)
        r = np.sqrt(((xx - cx) / R) ** 2 + ((yy - cy) / (R * sy)) ** 2)
        disco = np.clip(1 - r, 0, 1) > 0
        sombreado = 0.5 + 0.7 * np.exp(-((r - 0.75) / 0.2) ** 2) - 0.35 * np.exp(-(r / 0.35) ** 2)
        cor = np.array([0.75, 0.06, 0.05]) * sombreado[..., None]
        foco = rng.uniform(0.4, 1)
        mix = disco[..., None] * foco
        img = img * (1 - mix) + cor * mix
    return img


def arvore(pts, x, y, ang, comp, nivel, rng):
    if nivel == 0 or comp < 3:
        return
    x2, y2 = x + math.cos(ang) * comp, y + math.sin(ang) * comp
    pts.append(((x, y), (x2, y2), nivel))
    for d in (-1, 1):
        arvore(pts, x2, y2, ang + d * rng.uniform(0.3, 0.6), comp * rng.uniform(0.68, 0.8), nivel - 1, rng)


def ondas(img, cx, cy, raios, cor, ang0=-0.8, ang1=0.8, largura=2):
    for k, r in enumerate(raios):
        pts = [(cx + math.cos(a) * r, cy + math.sin(a) * r) for a in np.linspace(ang0, ang1, 40)]
        img = brilho_linha(img, pts, cor, largura, intensidade=1.0 - k * 0.12)
    return img


def tracos(img, seed, n, cor, comp=(80, 260), ang=(0.3, 0.6)):
    rng = np.random.default_rng(seed)
    def des(d, e):
        for _ in range(n):
            x, y = rng.uniform(-0.1, 1) * W, rng.uniform(-0.1, 0.9) * H
            a = rng.uniform(*ang)
            L = rng.uniform(*comp)
            d.line([(x * e, y * e), ((x + math.cos(a) * L) * e, (y + math.sin(a) * L) * e)], fill=int(255 * rng.uniform(0.4, 1)), width=int(1.4 * e))
    m = mascara(des)
    img += np.array(cor) * (m * 1.4 + gaussian_filter(m, 4) * 3)[..., None]
    return img


def luzes_pista(img, cor=(1.0, 0.85, 0.55), fuga=(0.5, 0.52), linhas=7):
    fx, fy = fuga[0] * W, fuga[1] * H
    def des(d, e):
        for lado in (-1, 1):
            for k in range(1, 26):
                t = (k / 25) ** 2
                x = fx + lado * t * W * 0.55
                y = fy + t * H * 0.5
                r = 0.6 + t * 4
                d.ellipse([(x - r) * e, (y - r) * e, (x + r) * e, (y + r) * e], fill=255)
        for k in range(1, linhas * 3):
            t = (k / (linhas * 3)) ** 2
            y = fy + t * H * 0.5
            r = 0.5 + t * 3
            d.ellipse([(fx - r) * e, (y - r) * e, (fx + r) * e, (y + r) * e], fill=200)
    m = mascara(des)
    img += np.array(cor) * (m * 2 + gaussian_filter(m, 3) * 3 + gaussian_filter(m, 12) * 2)[..., None]
    return img


def cidade(img, seed, topo=0.55, cor=(1.0, 0.72, 0.38)):
    h, w, _ = img.shape
    rng = np.random.default_rng(seed)
    dens = fbm(w, h, seed, octaves=5, base=6)
    yy = np.arange(h)[:, None] / h
    perto = np.clip((yy - topo) / (1 - topo), 0, 1)
    pts = (rng.random((h, w)) < 0.05 * perto ** 1.2) * (dens > 0.45)
    luz = gaussian_filter(pts.astype(float), 0.7) * 3 + gaussian_filter(pts.astype(float), 6) * 6
    img += np.array(cor) * luz[..., None] * (perto[..., None] > 0)
    return img


def neuronios(img, seed, n, cor):
    rng = np.random.default_rng(seed)
    nos = [(rng.uniform(0.05, 0.95) * W, rng.uniform(0.05, 0.95) * H) for _ in range(n)]
    for i, (x, y) in enumerate(nos):
        viz = sorted(nos, key=lambda p: (p[0] - x) ** 2 + (p[1] - y) ** 2)[1:4]
        for vx, vy in viz:
            mx, my = (x + vx) / 2 + rng.uniform(-30, 30), (y + vy) / 2 + rng.uniform(-30, 30)
            curva = [((1 - t) ** 2 * x + 2 * (1 - t) * t * mx + t * t * vx, (1 - t) ** 2 * y + 2 * (1 - t) * t * my + t * t * vy) for t in np.linspace(0, 1, 12)]
            img = brilho_linha(img, curva, cor, 1, intensidade=0.25)
    def des(d, e):
        for x, y in nos:
            r = rng.uniform(2, 6)
            d.ellipse([(x - r) * e, (y - r) * e, (x + r) * e, (y + r) * e], fill=255)
    m = mascara(des)
    img += np.array(cor) * (m * 2 + gaussian_filter(m, 6) * 4)[..., None]
    return img


def capsulas(img, seed, n, cores):
    rng = np.random.default_rng(seed)
    for _ in range(n):
        cx, cy = rng.uniform(0.05, 0.95) * W, rng.uniform(0.1, 0.9) * H
        L, R, a = rng.uniform(60, 120), rng.uniform(18, 30), rng.uniform(0, math.pi)
        c1, c2 = cores[rng.integers(0, len(cores))], cores[rng.integers(0, len(cores))]
        for metade, cor in ((-1, c1), (1, c2)):
            def des(d, e, metade=metade):
                p0 = (cx, cy)
                p1 = (cx + metade * math.cos(a) * L / 2, cy + metade * math.sin(a) * L / 2)
                d.line([(p0[0] * e, p0[1] * e), (p1[0] * e, p1[1] * e)], fill=255, width=int(2 * R * e))
                d.ellipse([(p1[0] - R) * e, (p1[1] - R) * e, (p1[0] + R) * e, (p1[1] + R) * e], fill=255)
            m = mascara(des)
            foco = rng.uniform(0.5, 1)
            som = 0.35 + 0.9 * gaussian_filter(m, 6)
            img = img * (1 - m[..., None] * foco) + np.array(cor) * (m * som)[..., None] * foco
        def brilho(d, e):
            d.line([((cx - math.cos(a) * L * 0.35) * e, (cy - math.sin(a) * L * 0.35 - R * 0.45) * e), ((cx + math.cos(a) * L * 0.35) * e, (cy + math.sin(a) * L * 0.35 - R * 0.45) * e)], fill=255, width=int(R * 0.25 * e))
        img += gaussian_filter(mascara(brilho), 2)[..., None] * 0.5
    return img


def janela(img, cx, cy, lw, lh):
    """Moldura da janela do avião: escurece tudo fora do oval."""
    def des(d, e):
        d.rounded_rectangle([(cx - lw / 2) * e, (cy - lh / 2) * e, (cx + lw / 2) * e, (cy + lh / 2) * e], radius=int(lw * 0.48 * e), fill=255)
    m = gaussian_filter(mascara(des), 2)
    fora = 1 - m
    moldura = np.array([0.05, 0.05, 0.06]) * (0.6 + 0.8 * gaussian_filter(fora, 30)[..., None])
    return img * m[..., None] + moldura * fora[..., None]


def finalizar(img, nome, pasta, grade=(1, 1, 1), vinheta=0.55, grao=0.025, bloom=0.35, seed=0, tam=None):
    h, w, _ = img.shape
    claro = np.clip(img - 0.7, 0, None)
    img = img + (gaussian_filter(claro, (6, 6, 0)) + gaussian_filter(claro, (22, 22, 0))) * bloom
    img = img * np.array(grade)
    img = 1 - np.exp(-img * 1.35)
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / w) ** 2 + ((yy - h / 2) / h) ** 2)
    img *= (1 - vinheta * r[..., None] ** 2 * 1.9)
    img += np.random.default_rng(seed + 77).normal(0, grao, (h, w, 1))
    img = np.clip(img, 0, 1)
    im = Image.fromarray((img * 255).astype(np.uint8))
    if tam:
        im = im.resize(tam, Image.LANCZOS)
    im.save(os.path.join(pasta, nome + '.jpg'), quality=84, optimize=True, progressive=True)


# ---------------------------------------------------------------- céus prontos

ESPACO = [(0, (0.0, 0.0, 0.01)), (1, (0.0, 0.005, 0.02))]
AURORA = [(0, (0.01, 0.02, 0.06)), (0.55, (0.04, 0.09, 0.22)), (0.7, (0.6, 0.35, 0.18)), (0.78, (0.9, 0.55, 0.25)), (1, (0.08, 0.06, 0.08))]
ENTARDECER = [(0, (0.02, 0.03, 0.09)), (0.45, (0.12, 0.12, 0.25)), (0.62, (0.75, 0.35, 0.15)), (0.7, (1.0, 0.6, 0.25)), (1, (0.15, 0.08, 0.06))]
NOITE = [(0, (0.0, 0.005, 0.02)), (0.6, (0.02, 0.04, 0.1)), (1, (0.04, 0.05, 0.1))]
ESTRATOSFERA = [(0, (0.0, 0.01, 0.05)), (0.5, (0.02, 0.08, 0.28)), (0.78, (0.2, 0.45, 0.85)), (1, (0.6, 0.75, 0.95))]
ESTUDIO_TEAL = [(0, (0.0, 0.03, 0.04)), (1, (0.0, 0.07, 0.08))]
ESTUDIO_ESCURO = [(0, (0.01, 0.01, 0.02)), (1, (0.03, 0.03, 0.05))]


def base(paradas, seed=0, est=0.0):
    img = ceu(W, H, paradas)
    if est:
        img = estrelas(img, seed, est)
    return img


# ---------------------------------------------------------------- cenas por episódio

def cena(nome, s):
    """Monta a cena pelo nome. s = semente."""
    if nome == 'fis-01':  # atmosfera
        img = base(ESPACO, s, 0.8)
        img = terra(img, W * 0.5, H * 2.2, H * 1.75, s, luz=(0.1, -0.99))
        return img, (1, 1, 1.05)
    if nome == 'fis-02':  # cardiovascular
        img = base(ESTUDIO_ESCURO)
        img = hemacias(img, s, 14, escala=0.9)
        img *= 0.45
        img = brilho_linha(img, ecg(-20, H * 0.52, W + 40, 150, 3), (1.0, 0.25, 0.2), 3)
        return img, (1.05, 0.95, 0.95)
    if nome == 'fis-03':  # hipóxia
        img = base(ESTRATOSFERA, s, 0.5)
        img = terra(img, W * 0.5, H * 2.6, H * 2.1, s, luz=(0.0, -1.0))
        img = cabeca(img, W * 0.3, H * 0.52, H * 0.42, aro=(0.4, 0.7, 1.2), dir_aro=(1, 0))
        img = bokeh(img, s, 40, (0.5, 0.8, 1.2), (3, 14), area=(0.4, 0.1, 1, 0.7), alfa=0.25)
        return img, (0.95, 1.0, 1.1)
    if nome == 'fis-04':  # pressurização
        img = base(NOITE, s, 1.0)
        img = nuvens_baixas(img, s, 0.62, (0.35, 0.4, 0.55), (0.03, 0.04, 0.08))
        img = sol(img, W * 0.8, H * 0.22, 14, (0.8, 0.85, 1.0), raio_h=False)
        img = aviao(img, W * 0.46, H * 0.42, W * 0.3, -0.03, aro=(0.6, 0.7, 1.0), dir_aro=(1, -1))
        return img, (0.95, 1.0, 1.1)
    if nome == 'fis-05':  # descompressão: bolhas no azul profundo
        img = base([(0, (0.0, 0.08, 0.16)), (1, (0.0, 0.01, 0.04))])
        img = bokeh(img, s, 90, (0.6, 0.85, 1.0), (2, 22), alfa=0.6)
        img = bokeh(img, s + 1, 20, (0.8, 0.95, 1.0), (20, 50), alfa=0.25)
        img = sol(img, W * 0.5, -10, 40, (0.4, 0.7, 1.0), raio_h=False)
        return img, (0.9, 1.0, 1.1)
    if nome == 'fis-06':  # forças G
        img = base(ENTARDECER, s)
        img = nuvens_baixas(img, s, 0.72, (0.9, 0.5, 0.25), (0.12, 0.06, 0.06))
        img = sol(img, W * 0.75, H * 0.66, 22)
        img = tracos(img, s, 6, (0.8, 0.8, 0.9), (200, 420), (2.6, 2.75))
        img = caca(img, W * 0.42, H * 0.38, W * 0.22, -0.35, aro=(1.0, 0.6, 0.3), dir_aro=(1, 0))
        return img, (1.05, 0.98, 0.9)
    if nome == 'fis-07':  # impacto, ejeção
        img = base(AURORA, s, 0.6)
        img = nuvens_baixas(img, s, 0.7, (0.7, 0.45, 0.3), (0.06, 0.05, 0.08))
        img = paraquedas(img, W * 0.62, H * 0.32, H * 0.2, aro=(1, 0.6, 0.3))
        img = caca(img, W * 0.22, H * 0.6, W * 0.12, 0.25)
        return img, (1.0, 0.98, 0.95)
    if nome == 'fis-08':  # desorientação: horizonte inclinado
        img = base(NOITE, s, 1.2)
        lin = Image.new('L', (W * 2, H * 2), 0)
        d = ImageDraw.Draw(lin)
        d.rectangle([0, H, W * 2, H * 2], fill=255)
        lin = lin.rotate(-22, resample=Image.BICUBIC, center=(W, H)).crop((W // 2, H // 2, W // 2 + W, H // 2 + H))
        m = gaussian_filter(np.asarray(lin, float) / 255, 2)
        chao = cidade(np.zeros((H, W, 3)), s, 0.0, (1.0, 0.7, 0.35)) + np.array([0.02, 0.025, 0.04])
        img = img * (1 - m[..., None]) + chao * m[..., None]
        return img, (1.0, 1.0, 1.05)
    if nome == 'fis-09':  # visão
        img = base(ESTUDIO_ESCURO)
        img = iris(img, W * 0.5, H * 0.5, H * 0.36, s, (0.9, 0.6, 0.2), (0.1, 0.35, 0.55))
        return img, (1.0, 1.0, 1.0)
    if nome == 'fis-10':  # ruído
        img = base(NOITE, s, 0.6)
        img = ondas(img, W * 0.3, H * 0.5, [80, 140, 210, 290, 380], (0.4, 0.8, 1.0), -0.9, 0.9)
        img = helicoptero(img, W * 0.28, H * 0.5, W * 0.13, aro=(0.4, 0.8, 1.0))
        return img, (0.95, 1.0, 1.08)
    if nome == 'fis-11':  # térmico e sobrevivência
        img = base([(0, (0.02, 0.04, 0.12)), (0.55, (0.3, 0.4, 0.6)), (0.7, (0.95, 0.6, 0.35)), (1, (0.2, 0.15, 0.15))], s, 0.3)
        img = sol(img, W * 0.3, H * 0.62, 20)
        img = montanhas(img, s, H * 0.72, H * 0.3, (0.05, 0.06, 0.1))
        img = montanhas(img, s + 1, H * 0.9, H * 0.25, (0.015, 0.02, 0.035))
        return img, (1.0, 1.0, 1.05)
    if nome == 'fis-12':  # radiação cósmica
        img = base(ESPACO, s, 1.0)
        img = terra(img, W * 0.55, H * 2.0, H * 1.5, s, luz=(-0.4, -0.9), noite=True)
        img = tracos(img, s, 14, (0.6, 0.5, 1.0), (60, 220), (0.9, 1.3))
        return img, (1.0, 0.98, 1.1)
    if nome == 'fis-13':  # sono e ritmos circadianos
        img = base(NOITE, s, 1.0)
        img = cidade(img, s, 0.62)
        img = sol(img, W * 0.78, H * 0.2, 10, (0.85, 0.9, 1.0), raio_h=False)
        img = ondas(img, W * 0.78, H * 0.2, [60, 95], (0.5, 0.65, 1.0), 0, 2 * math.pi, 1)
        return img, (0.95, 1.0, 1.1)

    if nome == 'cli-01':  # certificação: aproximação à pista
        img = base(ENTARDECER, s, 0.3)
        img = montanhas(img, s, H * 0.55, H * 0.06, (0.03, 0.03, 0.05), 0.3)
        img = luzes_pista(img, fuga=(0.5, 0.55))
        img = img * np.concatenate([np.ones((int(H * 0.55), W, 3)), np.ones((H - int(H * 0.55), W, 3)) * 0.6])
        return img, (0.95, 1.05, 1.05)
    if nome == 'cli-02':  # cardiologia
        img = base(ESTUDIO_TEAL)
        img = brilho_linha(img, ecg(-20, H * 0.55, W + 40, 170, 2), (0.3, 1.0, 0.85), 3)
        img = bokeh(img, s, 25, (0.2, 0.8, 0.7), (4, 18), alfa=0.2)
        return img, (0.95, 1.05, 1.0)
    if nome == 'cli-03':  # pneumologia: árvore brônquica
        img = base(ESTUDIO_ESCURO)
        rng = np.random.default_rng(s)
        segs = []
        arvore(segs, W * 0.5, H * 0.02, math.pi / 2, H * 0.22, 9, rng)
        def des(d, e):
            for (a, b, n) in segs:
                d.line([(a[0] * e, a[1] * e), (b[0] * e, b[1] * e)], fill=255, width=int(max(1, n * 1.1) * e))
        m = mascara(des)
        img += np.array([0.4, 0.7, 1.0]) * (m * 1.2 + gaussian_filter(m, 4) * 2 + gaussian_filter(m, 18) * 2)[..., None]
        return img, (0.95, 1.0, 1.1)
    if nome == 'cli-04':  # neurologia
        img = base(ESTUDIO_ESCURO)
        img = neuronios(img, s, 40, (0.5, 0.6, 1.0))
        return img, (1.0, 1.0, 1.1)
    if nome == 'cli-05':  # saúde mental
        img = base(AURORA, s, 0.8)
        img = cabeca(img, W * 0.5, H * 0.56, H * 0.42, aro=(1.0, 0.65, 0.35), dir_aro=(0, -1))
        img = bokeh(img, s, 30, (1.0, 0.75, 0.4), (3, 10), area=(0.3, 0.05, 0.7, 0.45), alfa=0.35)
        return img, (1.0, 0.98, 0.95)
    if nome == 'cli-06':  # oftalmologia
        img = base(ESTUDIO_ESCURO)
        img = iris(img, W * 0.5, H * 0.5, H * 0.38, s, (0.2, 0.55, 0.45), (0.05, 0.2, 0.35))
        return img, (1.0, 1.02, 1.0)
    if nome == 'cli-07':  # ORL e odontologia
        img = base(ESTUDIO_ESCURO)
        img = ondas(img, W * 0.2, H * 0.5, [70, 130, 200, 280, 370, 470], (1.0, 0.8, 0.45), -0.7, 0.7)
        return img, (1.0, 1.0, 0.95)
    if nome == 'cli-08':  # endocrinologia: moléculas
        img = base(ESTUDIO_TEAL)
        rng = np.random.default_rng(s)
        for _ in range(9):
            cx, cy, r = rng.uniform(0.05, 0.95) * W, rng.uniform(0.1, 0.9) * H, rng.uniform(20, 60)
            hexa = [(cx + r * math.cos(a), cy + r * math.sin(a)) for a in np.linspace(0, 2 * math.pi, 7)]
            img = brilho_linha(img, hexa, (0.3, 0.9, 0.8), 2, rng.uniform(0.3, 1))
        return img, (0.95, 1.05, 1.0)
    if nome == 'cli-09':  # digestivo e renal: fluxos orgânicos
        img = base(ESTUDIO_ESCURO)
        img = nebulosa(img, s, (0.25, 0.08, 0.03), (0.9, 0.45, 0.2), 1.3, (0.5, 0.5))
        return img, (1.05, 0.98, 0.9)
    if nome == 'cli-10':  # hematologia
        img = base([(0, (0.05, 0.0, 0.0)), (1, (0.02, 0.0, 0.0))])
        img = hemacias(img, s, 26)
        return img, (1.05, 0.95, 0.95)
    if nome == 'cli-11':  # coluna
        img = base(ESTUDIO_ESCURO)
        def des(d, e):
            for k in range(11):
                y = H * 0.08 + k * H * 0.08
                x = W * 0.5 + math.sin(k / 10 * math.pi) * 40
                d.rounded_rectangle([(x - 55) * e, y * e, (x + 55) * e, (y + H * 0.055) * e], radius=int(14 * e), fill=255)
        m = mascara(des)
        img += np.array([0.45, 0.75, 1.0]) * (m * 0.5 + gaussian_filter(m, 3) * 1.2 + gaussian_filter(m, 20) * 1.5)[..., None]
        return img, (0.95, 1.0, 1.1)
    if nome == 'cli-12':  # saúde da mulher, gestação, envelhecimento
        img = base([(0, (0.03, 0.03, 0.1)), (0.6, (0.45, 0.3, 0.45)), (0.75, (1.0, 0.7, 0.5)), (1, (0.25, 0.2, 0.25))], s, 0.3)
        img = sol(img, W * 0.5, H * 0.74, 26, (1.0, 0.75, 0.6))
        img = nuvens_baixas(img, s, 0.78, (0.9, 0.6, 0.55), (0.15, 0.1, 0.15))
        img = aviao(img, W * 0.3, H * 0.3, W * 0.09, -0.08)
        return img, (1.03, 0.98, 1.0)
    if nome == 'cli-13':  # farmacologia
        img = base(ESTUDIO_ESCURO)
        img = capsulas(img, s, 9, [(0.9, 0.9, 0.92), (0.2, 0.5, 0.9), (0.95, 0.6, 0.2), (0.85, 0.2, 0.25)])
        return img, (1.0, 1.0, 1.0)

    if nome == 'ope-01':  # fatores humanos e CRM
        img = base([(0, (0.0, 0.02, 0.05)), (1, (0.0, 0.06, 0.12))])
        img = bokeh(img, s, 30, (0.3, 0.7, 1.0), (4, 30), area=(0.2, 0.5, 0.8, 1.0), alfa=0.5)
        img = cabeca(img, W * 0.28, H * 0.6, H * 0.38, aro=(0.3, 0.7, 1.0), dir_aro=(1, 0))
        img = cabeca(img, W * 0.72, H * 0.6, H * 0.38, aro=(0.3, 0.7, 1.0), dir_aro=(-1, 0), espelhar=True)
        return img, (0.95, 1.0, 1.1)
    if nome == 'ope-02':  # segurança de voo
        img = base(ENTARDECER, s, 0.2)
        img = luzes_pista(img, fuga=(0.5, 0.6))
        img = aviao(img, W * 0.55, H * 0.35, W * 0.2, 0.06, aro=(1.0, 0.6, 0.3))
        return img, (1.0, 1.0, 1.0)
    if nome == 'ope-03':  # seleção e treinamento: centrífuga
        img = base(ESTUDIO_ESCURO)
        pts = [(W * 0.5 + math.cos(a) * W * 0.32, H * 0.5 + math.sin(a) * H * 0.3) for a in np.linspace(0, 2 * math.pi * 0.85, 120)]
        img = brilho_linha(img, pts, (1.0, 0.6, 0.25), 3)
        img = brilho_linha(img, [(W * 0.5, H * 0.5), pts[-1]], (0.6, 0.6, 0.7), 4, 0.6)
        return img, (1.0, 1.0, 1.0)
    if nome == 'ope-04':  # cabine de comando
        img = painel(s)
        return img, (1.0, 1.0, 1.0)
    if nome == 'ope-05':  # fadiga
        img = base(NOITE, s, 1.0)
        img = sol(img, W * 0.2, H * 0.18, 9, (0.85, 0.9, 1.0), raio_h=False)
        yy, xx = np.mgrid[0:H, 0:W]
        mar = yy > H * 0.66
        ondas = fbm(W, H, s, octaves=6, base=10, sx=1.0, sy=4.0)
        faixa = np.exp(-((xx - W * 0.2) / (W * 0.06 + (yy - H * 0.66) * 0.5)) ** 2)
        brilho_mar = (ondas > 0.62) * faixa * 0.9
        cor_mar = np.array([0.008, 0.012, 0.03]) + brilho_mar[..., None] * np.array([0.7, 0.75, 0.9])
        img = np.where(mar[..., None], cor_mar, img)
        img = aviao(img, W * 0.62, H * 0.38, W * 0.12, 0.0, aro=(0.6, 0.7, 1.0), dir_aro=(-1, -1))
        return img, (0.95, 1.0, 1.1)
    if nome == 'ope-06':  # medicina ocupacional: sinalizador no pátio
        img = base(NOITE, s, 0.5)
        img = bokeh(img, s, 40, (1.0, 0.7, 0.35), (2, 12), area=(0, 0.45, 1, 0.75), alfa=0.6)
        img = aviao(img, W * 0.3, H * 0.5, W * 0.35, 0.0)
        def corpo(d, e):
            x, y = W * 0.72, H * 0.62
            d.ellipse([(x - 14) * e, (y - 95) * e, (x + 14) * e, (y - 67) * e], fill=255)
            d.polygon([((x - 24) * e, (y - 65) * e), ((x + 24) * e, (y - 65) * e), ((x + 18) * e, (y + 10) * e), ((x - 18) * e, (y + 10) * e)], fill=255)
            for k in (-10, 10):
                d.line([((x + k) * e, (y + 5) * e), ((x + k * 1.4) * e, (y + 90) * e)], fill=255, width=int(14 * e))
        img = silhueta(img, mascara(corpo))
        x, y = W * 0.72, H * 0.62
        img = brilho_linha(img, [(x - 22, y - 60), (x - 70, y - 120)], (1.0, 0.45, 0.1), 5)
        img = brilho_linha(img, [(x + 22, y - 60), (x + 70, y - 120)], (1.0, 0.45, 0.1), 5)
        return img, (1.0, 1.0, 1.0)
    if nome == 'ope-07':  # toxicologia: fumaça
        img = base(ESTUDIO_ESCURO)
        n = fbm(W, H, s, octaves=7, base=3, sx=0.6, sy=1.4)
        fum = np.clip((n - 0.45) * 2.5, 0, 1) ** 1.5
        img += np.array([0.6, 0.45, 0.25]) * fum[..., None]
        img = sol(img, W * 0.5, H * 1.05, 40, (1.0, 0.6, 0.25), raio_h=False)
        return img, (1.0, 0.98, 0.9)
    if nome == 'ope-08':  # passageiro: janela do avião
        img = base(ENTARDECER, s)
        img = nuvens_baixas(img, s, 0.66, (1.0, 0.6, 0.35), (0.25, 0.12, 0.12))
        img = sol(img, W * 0.55, H * 0.62, 20)
        img = poligonos(img, [[(0.0, 0.0), (1.0, 0.2), (1.0, 0.27), (0.0, 0.12)]], W * 0.18, H * 0.66, W * 0.6, 0.0)
        img = janela(img, W * 0.5, H * 0.5, W * 0.46, H * 0.8)
        return img, (1.0, 1.0, 1.0)
    if nome == 'ope-09':  # emergência a bordo
        img = base([(0, (0.03, 0.0, 0.0)), (1, (0.08, 0.02, 0.02))])
        img = bokeh(img, s, 30, (1.0, 0.8, 0.6), (3, 14), area=(0, 0, 1, 0.5), alfa=0.25)
        img = brilho_linha(img, ecg(-20, H * 0.58, W + 40, 160, 3), (1.0, 0.3, 0.25), 3)
        return img, (1.05, 0.95, 0.95)
    if nome == 'ope-10':  # transporte aeromédico
        img = base(NOITE, s, 0.8)
        img = cidade(img, s, 0.7)
        def feixe(d, e):
            x, y = W * 0.45, H * 0.42
            d.polygon([(x * e, y * e), ((x - 120) * e, H * e), ((x + 60) * e, H * e)], fill=255)
        f = gaussian_filter(mascara(feixe), 8)
        img += f[..., None] * np.array([0.9, 0.95, 1.0]) * 0.35
        img = helicoptero(img, W * 0.45, H * 0.36, W * 0.14, aro=(0.8, 0.85, 1.0))
        return img, (0.95, 1.0, 1.08)
    if nome == 'ope-11':  # aviação militar: formação
        img = base(ENTARDECER, s)
        img = sol(img, W * 0.2, H * 0.66, 22)
        img = nuvens_baixas(img, s, 0.74, (1.0, 0.55, 0.25), (0.12, 0.06, 0.06))
        for k, (x, y) in enumerate([(0.55, 0.32), (0.68, 0.4), (0.42, 0.42)]):
            img = caca(img, W * x, H * y, W * 0.11, -0.05, aro=(1.0, 0.6, 0.3), dir_aro=(-1, 0))
        return img, (1.05, 0.98, 0.9)
    if nome == 'ope-12':  # aeronaves e ambientes especiais
        img = base(ESTRATOSFERA, s)
        img = nuvens_baixas(img, s, 0.65, (0.95, 0.95, 1.0), (0.35, 0.45, 0.6))
        img = paraquedas(img, W * 0.3, H * 0.28, H * 0.13)
        img = balao(img, W * 0.72, H * 0.36, H * 0.16)
        return img, (1.0, 1.0, 1.05)
    if nome == 'ope-13':  # saúde pública: rotas sobre a Terra
        img = base(ESPACO, s, 0.8)
        img = terra(img, W * 0.5, H * 1.35, H * 0.95, s, luz=(-0.7, -0.6), noite=True)
        rng = np.random.default_rng(s)
        for _ in range(7):
            x1, x2 = rng.uniform(0.15, 0.45) * W, rng.uniform(0.55, 0.85) * W
            y1, y2 = rng.uniform(0.55, 0.8) * H, rng.uniform(0.55, 0.8) * H
            arco = [((1 - t) * x1 + t * x2, (1 - t) * y1 + t * y2 - math.sin(t * math.pi) * rng.uniform(60, 140)) for t in np.linspace(0, 1, 50)]
            img = brilho_linha(img, arco, (1.0, 0.75, 0.4), 1.4, 0.7)
        return img, (1.0, 1.0, 1.05)
    if nome == 'ope-14':  # investigação: gravador de voo
        img = base(ESTUDIO_ESCURO)
        def caixa(d, e):
            d.rounded_rectangle([W * 0.34 * e, H * 0.3 * e, W * 0.66 * e, H * 0.72 * e], radius=int(18 * e), fill=255)
        m = mascara(caixa)
        som = 0.35 + 0.9 * gaussian_filter(m, 12)
        img = img * (1 - m[..., None]) + np.array([0.95, 0.38, 0.05]) * (m * som)[..., None]
        def faixa(d, e):
            for k in range(6):
                x = W * 0.36 + k * W * 0.055
                d.polygon([(x * e, H * 0.62 * e), ((x + 18) * e, H * 0.62 * e), ((x + 4) * e, H * 0.7 * e), ((x - 14) * e, H * 0.7 * e)], fill=255)
        fm = mascara(faixa) * m
        img = img * (1 - fm[..., None]) + np.array([0.9, 0.9, 0.85]) * fm[..., None] * 0.8
        img = sol(img, W * 0.35, H * 0.22, 30, (1.0, 0.85, 0.7), raio_h=False)
        return img, (1.0, 1.0, 0.98)
    if nome == 'ope-15':  # perícias: lupa
        img = base(ESTUDIO_ESCURO)
        def grade(d, e):
            for k in range(0, W, 40):
                d.line([(k * e, 0), (k * e, H * e)], fill=60, width=int(e))
            for k in range(0, H, 40):
                d.line([(0, k * e), (W * e, k * e)], fill=60, width=int(e))
        g = mascara(grade)
        img += g[..., None] * np.array([0.4, 0.55, 0.7]) * 0.5
        img = brilho_linha(img, [(W * 0.5 + math.cos(a) * 130, H * 0.45 + math.sin(a) * 130) for a in np.linspace(0, 2 * math.pi, 80)], (0.9, 0.8, 0.6), 6, 0.8)
        img = brilho_linha(img, [(W * 0.5 + 92, H * 0.45 + 92), (W * 0.5 + 230, H * 0.45 + 230)], (0.9, 0.8, 0.6), 18, 0.5)
        return img, (1.0, 1.0, 1.0)
    if nome == 'ope-16':  # drones e eVTOL
        img = base(NOITE, s, 0.6)
        img = cidade(img, s, 0.55)
        rng = np.random.default_rng(s)
        for k in range(4):
            x, y, r = rng.uniform(0.2, 0.8) * W, rng.uniform(0.15, 0.45) * H, rng.uniform(14, 26)
            def drone(d, e, x=x, y=y, r=r):
                d.line([((x - 2.2 * r) * e, y * e), ((x + 2.2 * r) * e, y * e)], fill=255, width=int(0.3 * r * e))
                d.rectangle([(x - 0.6 * r) * e, (y - 0.25 * r) * e, (x + 0.6 * r) * e, (y + 0.35 * r) * e], fill=255)
                for dx in (-2.2, 2.2):
                    d.ellipse([(x + dx * r - r) * e, (y - 0.5 * r) * e, (x + dx * r + r) * e, (y - 0.25 * r) * e], fill=255)
            img = silhueta(img, mascara(drone))
            img = brilho_linha(img, [(x - 2.2 * r, y + 2), (x - 2.2 * r + 1, y + 2)], (0.3, 1.0, 0.5), 3, 0.6)
            img = brilho_linha(img, [(x + 2.2 * r, y + 2), (x + 2.2 * r + 1, y + 2)], (1.0, 0.25, 0.2), 3, 0.6)
        return img, (0.95, 1.0, 1.08)

    if nome == 'esp-01':  # fundamentos
        img = base(ESPACO, s, 1.0)
        img = terra(img, W * 0.42, H * 1.95, H * 1.5, s, luz=(0.45, -0.85))
        img = sol(img, W * 0.86, H * 0.36, 26)
        return img, (1.0, 1.0, 1.05)
    if nome == 'esp-02':  # microgravidade
        img = base(ESPACO, s, 0.9)
        img = terra(img, W * 0.5, H * 1.9, H * 1.3, s, luz=(-0.5, -0.8))
        img = astronauta(img, W * 0.62, H * 0.36, H * 0.22, 0.4)
        return img, (1.0, 1.0, 1.05)
    if nome == 'esp-03':  # radiação espacial: o Sol
        img = base(ESPACO, s, 0.8)
        img = planeta(img, W * 0.32, H * 0.5, H * 0.32, s, (1.0, 0.55, 0.15), (0.6, 0.15, 0.02), (1.0, 0.6, 0.2), luz=(0, 0))
        img = sol(img, W * 0.32, H * 0.5, 50, (1.0, 0.55, 0.2), raio_h=False)
        img = tracos(img, s, 18, (1.0, 0.7, 0.4), (60, 200), (-0.15, 0.15))
        return img, (1.05, 0.98, 0.9)
    if nome == 'esp-04':  # EVA
        img = base(ESPACO, s, 0.7)
        img = terra(img, W * 0.2, H * 1.6, H * 1.1, s, luz=(0.6, -0.7))
        img = astronauta(img, W * 0.6, H * 0.5, H * 0.36, -0.2)
        return img, (1.0, 1.0, 1.05)
    if nome == 'esp-05':  # cuidado médico em missão: estação
        img = base(ESPACO, s, 0.8)
        img = terra(img, W * 0.5, H * 2.0, H * 1.45, s, luz=(0.2, -0.95))
        img = estacao(img, W * 0.5, H * 0.34, W * 0.28)
        return img, (1.0, 1.0, 1.05)
    if nome == 'esp-06':  # acidentes no voo espacial: lançamento
        img = base(NOITE, s, 0.8)
        img = montanhas(img, s, H * 0.94, H * 0.08, (0.01, 0.01, 0.02), 0.4)
        trilha = [(W * 0.42 + (t ** 1.8) * W * 0.2, H * 0.95 - t * H * 0.85) for t in np.linspace(0, 1, 60)]
        img = brilho_linha(img, trilha, (1.0, 0.65, 0.3), 3)
        img = sol(img, trilha[-1][0], trilha[-1][1], 12, (1.0, 0.7, 0.4), raio_h=False)
        return img, (1.0, 0.98, 0.95)
    if nome == 'esp-07':  # turismo espacial
        img = base(ESPACO, s, 0.8)
        img = terra(img, W * 0.5, H * 1.75, H * 1.15, s, luz=(0.0, -1.0))
        img = foguete(img, W * 0.5, H * 0.32, H * 0.2)
        return img, (1.0, 1.0, 1.05)
    if nome == 'esp-08':  # Lua e Marte
        img = base(ESPACO, s, 1.0)
        img = planeta(img, W * 0.64, H * 0.55, H * 0.4, s, (0.75, 0.38, 0.2), (0.25, 0.08, 0.04), (0.9, 0.55, 0.4), luz=(-0.7, -0.4))
        img = planeta(img, W * 0.2, H * 0.24, H * 0.07, s + 1, (0.7, 0.68, 0.65), (0.15, 0.15, 0.15), (0.3, 0.3, 0.32), luz=(-0.7, -0.4))
        return img, (1.03, 1.0, 0.98)
    raise KeyError(nome)


def painel(s):
    """Painel de voo primário (PFD) em vidro escuro: horizonte artificial e fitas."""
    img = base(ESTUDIO_ESCURO)
    x0, y0, x1, y1 = W * 0.2, H * 0.1, W * 0.8, H * 0.9
    tela = Image.new('RGB', (int(x1 - x0) * 2, int(y1 - y0) * 2), (6, 8, 12))
    d = ImageDraw.Draw(tela)
    tw, th = tela.size
    horiz = Image.new('RGB', (tw * 2, th * 2))
    dh = ImageDraw.Draw(horiz)
    dh.rectangle([0, 0, tw * 2, th], fill=(40, 110, 205))
    dh.rectangle([0, th, tw * 2, th * 2], fill=(120, 70, 30))
    dh.line([0, th, tw * 2, th], fill=(255, 255, 255), width=4)
    for k in range(-3, 4):
        if k:
            dh.line([tw - 60, th - k * 70, tw + 60, th - k * 70], fill=(255, 255, 255), width=3)
    horiz = horiz.rotate(-12, center=(tw, th)).crop((tw // 2, th // 2 + 40, tw // 2 + tw, th // 2 + th + 40))
    tela.paste(horiz.crop((int(tw * 0.18), 0, int(tw * 0.82), th)), (int(tw * 0.18), 0))
    d = ImageDraw.Draw(tela)
    for xa in (0, int(tw * 0.82)):
        d.rectangle([xa, 0, xa + int(tw * 0.18), th], fill=(20, 22, 30))
        for k in range(12):
            y = 20 + k * th / 12
            d.line([xa + (int(tw * 0.18) - 30 if xa else 0), y, xa + (int(tw * 0.18) if xa else 30), y], fill=(230, 230, 230), width=3)
    d.rectangle([0, th // 2 - 30, int(tw * 0.17), th // 2 + 30], outline=(255, 255, 255), width=4, fill=(0, 0, 0))
    d.rectangle([int(tw * 0.83), th // 2 - 30, tw, th // 2 + 30], outline=(255, 255, 255), width=4, fill=(0, 0, 0))
    d.polygon([(tw // 2 - 130, th // 2), (tw // 2 - 40, th // 2), (tw // 2 - 40, th // 2 + 20)], fill=(255, 210, 0))
    d.polygon([(tw // 2 + 130, th // 2), (tw // 2 + 40, th // 2), (tw // 2 + 40, th // 2 + 20)], fill=(255, 210, 0))
    d.rectangle([tw // 2 - 8, th // 2 - 8, tw // 2 + 8, th // 2 + 8], fill=(255, 210, 0))
    tela = tela.resize((int(x1 - x0), int(y1 - y0)), Image.LANCZOS)
    arr = np.asarray(tela, float) / 255 * 1.4
    img[int(y0):int(y0) + arr.shape[0], int(x0):int(x0) + arr.shape[1]] = arr
    reflexo = np.zeros((H, W))
    reflexo[int(y0):int(y1), int(x0):int(x1)] = np.linspace(0.12, 0, int(y1) - int(y0))[:, None]
    img += reflexo[..., None]
    claro = np.zeros((H, W))
    claro[int(y0):int(y1), int(x0):int(x1)] = 1
    img += gaussian_filter(claro, 40)[..., None] * np.array([0.1, 0.2, 0.35])
    return img


CAPAS = (
    [f'fis-{i:02d}' for i in range(1, 14)]
    + [f'cli-{i:02d}' for i in range(1, 14)]
    + [f'ope-{i:02d}' for i in range(1, 17)]
    + [f'esp-{i:02d}' for i in range(1, 9)]
)


def temporada(nome, s):
    """Arte vertical de cada temporada (seção), reaproveitando a cena-símbolo."""
    simbolo = {'temporada-fisiologia': 'fis-03', 'temporada-clinica': 'cli-02', 'temporada-operacao': 'ope-02', 'temporada-espaco': 'esp-02', 'especial-voo': None}[nome]
    if simbolo is None:
        img = base([(0, (0.02, 0.015, 0.01)), (0.55, (0.35, 0.22, 0.1)), (0.72, (0.95, 0.68, 0.35)), (1, (0.25, 0.16, 0.08))], s, 0.2)
        img = sol(img, W * 0.62, H * 0.7, 26, (1.0, 0.75, 0.4))
        img = nuvens_baixas(img, s, 0.74, (0.95, 0.7, 0.4), (0.2, 0.12, 0.07))
        img = balao(img, W * 0.36, H * 0.38, H * 0.26, aro=(1.0, 0.7, 0.35))
        return img, (1.05, 0.98, 0.85)
    return cena(simbolo, s + 100)


def principal():
    pasta = sys.argv[1]
    os.makedirs(pasta, exist_ok=True)
    filtro = set(sys.argv[2:])
    for i, nome in enumerate(CAPAS):
        if filtro and nome not in filtro:
            continue
        img, grade = cena(nome, 1000 + i)
        finalizar(np.maximum(img, 0), nome, pasta, grade=grade, seed=i, tam=(720, 405))
        print('capa', nome)
    for i, nome in enumerate(['temporada-fisiologia', 'temporada-clinica', 'temporada-operacao', 'temporada-espaco', 'especial-voo']):
        if filtro and nome not in filtro:
            continue
        img, grade = temporada(nome, 2000 + i)
        finalizar(np.maximum(img, 0), nome, pasta, grade=grade, seed=50 + i, tam=(960, 540))
        print('arte', nome)


if __name__ == '__main__':
    principal()
