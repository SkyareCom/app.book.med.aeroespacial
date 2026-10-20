import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, zoom
import os, sys

OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)


def fbm(w, h, seed, octaves=7, base=3, persistence=0.55, stretch=(1, 1)):
    rng = np.random.default_rng(seed)
    acc = np.zeros((h, w))
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        gx = max(2, int(base * 2 ** o * stretch[0]))
        gy = max(2, int(base * 2 ** o * stretch[1] * h / w))
        g = rng.random((gy + 3, gx + 3))
        z = zoom(g, ((h + 1) / gy, (w + 1) / gx), order=3)
        acc += amp * z[:h, :w]
        tot += amp
        amp *= persistence
    acc /= tot
    return (acc - acc.min()) / (acc.max() - acc.min() + 1e-9)


def stars(w, h, seed, n=None, big=None):
    big = big if big is not None else max(1, int(w * h / 90000))
    rng = np.random.default_rng(seed + 99)
    n = n or int(w * h / 900)
    img = np.zeros((h, w, 3))
    xs, ys = rng.integers(0, w, n), rng.integers(0, h, n)
    br = rng.random(n) ** 6
    tint = np.stack([0.85 + 0.15 * rng.random(n), 0.9 + 0.1 * rng.random(n), np.ones(n)], 1)
    for x, y, b, t in zip(xs, ys, br, tint):
        img[y, x] += t * (0.25 + 0.75 * b)
    soft = gaussian_filter(img, (0.6, 0.6, 0))
    img = np.maximum(img * 0.8, soft * 2.2)
    for _ in range(big):
        x, y = rng.integers(0, w), rng.integers(0, h)
        g = np.zeros((h, w))
        g[y, x] = 1
        hs = max(2.0, w / 260)
        halo = gaussian_filter(g, hs) * 25 * hs * hs + gaussian_filter(g, 1.2) * 40
        img += halo[..., None] * np.array([0.9, 0.95, 1.0]) * rng.uniform(0.2, 0.5)
        spike = np.zeros((h, w))
        L = int(rng.integers(6, 14) * hs / 3)
        spike[max(0, y - L):y + L, x] = 1
        spike[y, max(0, x - L):x + L] = 1
        img += gaussian_filter(spike, 0.6)[..., None] * 0.18
    return img


def nebula(w, h, seed, c1, c2, c3, strength=1.0, stretch=(1, 1), center=None):
    n = fbm(w, h, seed, stretch=stretch)
    m = fbm(w, h, seed + 7, octaves=4, base=2)
    d = fbm(w, h, seed + 13, octaves=8, base=5)
    yy, xx = np.mgrid[0:h, 0:w]
    cx, cy = center or (w * 0.6, h * 0.45)
    r = np.sqrt(((xx - cx) / w) ** 2 + ((yy - cy) / h) ** 2)
    falloff = np.clip(1.2 - r * 1.9, 0, 1)
    dens = np.clip((n * 0.7 + m * 0.5 - 0.45) * 2.2, 0, 1) * falloff
    dust = np.clip((d - 0.55) * 3, 0, 1)
    col = (np.array(c1)[None, None] * (1 - n[..., None]) + np.array(c2)[None, None] * n[..., None])
    col = col * dens[..., None] ** 1.6 * strength
    core = np.clip(dens - 0.55, 0, 1) ** 2 * 3
    col += np.array(c3)[None, None] * core[..., None]
    col *= (1 - dust[..., None] * 0.75)
    return col


def planet(img, cx, cy, R, seed, base, dark, atm, light=(-0.6, -0.5), band=False):
    h, w, _ = img.shape
    yy, xx = np.mgrid[0:h, 0:w]
    dx, dy = (xx - cx) / R, (yy - cy) / R
    rr = dx ** 2 + dy ** 2
    inside = rr <= 1
    dz = np.sqrt(np.clip(1 - rr, 0, 1))
    lx, ly = light
    lz = np.sqrt(max(0, 1 - lx * lx - ly * ly))
    lam = np.clip(dx * lx + dy * ly + dz * lz, 0, 1)
    tex = fbm(w, h, seed, octaves=8, base=6, stretch=(1, 3) if band else (1, 1))
    surf = np.array(dark)[None, None] * (1 - tex[..., None]) + np.array(base)[None, None] * tex[..., None]
    shaded = surf * (0.04 + 1.1 * lam[..., None] ** 0.9)
    edge = np.clip(1 - dz, 0, 1) ** 3
    shaded += np.array(atm)[None, None] * edge[..., None] * (0.3 + lam[..., None]) * 0.9
    img[inside] = shaded[inside]
    rim = np.clip(1 - np.abs(np.sqrt(rr) - 1) * R / 3, 0, 1) * (np.sqrt(rr) > 0.98)
    lit = np.clip((dx * lx + dy * ly) / np.sqrt(rr + 1e-9) + 0.35, 0, 1)
    glow = gaussian_filter(rim * lit, R * 0.03) * 5.0 + gaussian_filter(rim * lit, R * 0.01) * 3
    img += np.array(atm)[None, None] * glow[..., None]
    return img


def sun(img, x, y, size, color=(1.0, 0.85, 0.6)):
    h, w, _ = img.shape
    g = np.zeros((h, w))
    g[int(np.clip(y, 0, h - 1)), int(np.clip(x, 0, w - 1))] = 1
    core = gaussian_filter(g, size * 0.15) * (size ** 2) * 2.5
    halo = gaussian_filter(g, size) * (size ** 2) * 6
    img += core[..., None] * np.array([1, 1, 1]) + halo[..., None] * np.array(color)
    xx = np.arange(w)
    fall = np.exp(-((xx - x) / (size * 7.0)) ** 2)
    streak = np.zeros((h, w))
    streak[int(np.clip(y, 0, h - 1)), :] = fall
    img += gaussian_filter(streak, (1.0, 2))[..., None] * np.array(color) * 0.9
    return img


def finish(img, name, grade=(1.0, 1.0, 1.0), vignette=0.5, grain=0.02, seed=0):
    h, w, _ = img.shape
    img = img * np.array(grade)
    img = 1 - np.exp(-img * 1.4)
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / w) ** 2 + ((yy - h / 2) / h) ** 2)
    img *= (1 - vignette * r[..., None] ** 2 * 1.8)
    rng = np.random.default_rng(seed + 5)
    img += rng.normal(0, grain, (h, w, 1))
    img = np.clip(img, 0, 1) ** 1.05
    Image.fromarray((img * 255).astype(np.uint8)).save(os.path.join(OUT, name), quality=88)


def base_space(w, h, seed, neb=None, neb_strength=1.0):
    img = stars(w, h, seed) * 0.9
    if neb:
        img += nebula(w, h, seed, *neb, strength=neb_strength)
    return img


# 1. App background (deep starfield, faint nebula)
W, H = 780, 3600
img = stars(W, H, 1, n=int(W * H / 700), big=10) * 0.8
img += nebula(W, H, 11, (0.05, 0.08, 0.25), (0.15, 0.25, 0.55), (0.3, 0.45, 0.9), strength=0.35, center=(W * 0.8, H * 0.18))
img += nebula(W, H, 12, (0.18, 0.04, 0.12), (0.35, 0.1, 0.3), (0.6, 0.3, 0.5), strength=0.25, center=(W * 0.2, H * 0.65))
finish(img, 'bg.jpg', vignette=0.2, grain=0.01)

# 2. Hero: Earth limb sunrise from orbit
W, H = 716, 560
img = stars(W, H, 2) * 0.7
img = planet(img, W * 0.42, H * 2.05, H * 1.55, 21, (0.12, 0.32, 0.55), (0.02, 0.06, 0.14), (0.35, 0.65, 1.2), light=(0.25, -0.95))
img = sun(img, W * 0.74, H * 0.53, 26)
finish(img, 'hero.jpg', grade=(1.0, 1.0, 1.05), vignette=0.45, seed=2)

# 3. O Voo e a Medicina: golden dawn over a hazy limb
W, H = 716, 260
img = stars(W, H, 3) * 0.5
img += nebula(W, H, 31, (0.25, 0.12, 0.03), (0.6, 0.38, 0.12), (1.0, 0.8, 0.45), strength=0.8, stretch=(1, 0.4), center=(W * 0.75, H * 0.6))
img = planet(img, W * 0.7, H * 3.2, H * 2.55, 32, (0.5, 0.36, 0.2), (0.08, 0.05, 0.02), (1.1, 0.75, 0.35), light=(0.1, -0.99))
img = sun(img, W * 0.8, H * 0.7, 16, color=(1.0, 0.75, 0.4))
finish(img, 'voo.jpg', grade=(1.05, 0.95, 0.8), seed=3)

# 4. Sections
W, H = 340, 300
img = base_space(W, H, 41, ((0.25, 0.02, 0.03), (0.75, 0.15, 0.08), (1.0, 0.6, 0.4)), 1.2)
finish(img, 'fisiologia.jpg', seed=41)

img = base_space(W, H, 42, ((0.0, 0.12, 0.14), (0.05, 0.5, 0.5), (0.5, 1.0, 0.9)), 1.1)
img = sun(img, W * 0.62, H * 0.4, 10, color=(0.5, 1.0, 0.9))
finish(img, 'clinica.jpg', seed=42)

img = stars(W, H, 43) * 0.6
img = planet(img, W * 0.5, H * 1.9, H * 1.3, 43, (0.45, 0.3, 0.18), (0.05, 0.03, 0.02), (1.1, 0.6, 0.25), light=(-0.2, -0.98))
img = sun(img, W * 0.3, H * 0.6, 12, color=(1.0, 0.7, 0.35))
finish(img, 'operacao.jpg', seed=43)

img = stars(W, H, 44) * 0.8
img = planet(img, W * 0.62, H * 0.5, H * 0.32, 44, (0.25, 0.45, 0.75), (0.03, 0.06, 0.15), (0.4, 0.7, 1.2), light=(-0.7, -0.4), band=True)
img = planet(img, W * 0.2, H * 0.22, H * 0.06, 45, (0.6, 0.58, 0.55), (0.1, 0.1, 0.1), (0.4, 0.4, 0.45), light=(-0.7, -0.4))
finish(img, 'espaco.jpg', seed=44)

# 5. Lab (purple nebula)
W, H = 716, 300
img = base_space(W, H, 51, ((0.12, 0.03, 0.22), (0.5, 0.15, 0.7), (0.9, 0.6, 1.0)), 1.1)
finish(img, 'lab.jpg', seed=51)

# 6. Quiz / Prova
W, H = 340, 260
img = base_space(W, H, 61, ((0.02, 0.08, 0.25), (0.15, 0.4, 0.9), (0.6, 0.85, 1.0)), 1.1)
img = sun(img, W * 0.7, H * 0.35, 9, color=(0.6, 0.8, 1.0))
finish(img, 'quiz.jpg', seed=61)

img = base_space(W, H, 62, ((0.22, 0.08, 0.02), (0.75, 0.4, 0.08), (1.0, 0.85, 0.5)), 1.1)
img = sun(img, W * 0.68, H * 0.38, 9, color=(1.0, 0.8, 0.4))
finish(img, 'prova.jpg', seed=62)

# 7. Curiosidades: aurora seen from orbit over a night limb
W, H = 716, 260
img = stars(W, H, 71) * 0.7
img = planet(img, W * 0.5, H * 3.4, H * 2.9, 71, (0.03, 0.05, 0.08), (0.0, 0.01, 0.02), (0.15, 0.3, 0.5), light=(0.0, -1.0))
yy, xx = np.mgrid[0:H, 0:W]
a = fbm(W, H, 72, octaves=6, base=3, stretch=(2, 0.3))
curtain = np.exp(-((yy - (H * 0.62 - 25 * np.sin(xx / 70.0))) / 26.0) ** 2)
streaks = fbm(W, H, 73, octaves=5, base=12, stretch=(3, 0.05))
aur = curtain * (0.4 + a) * (0.5 + streaks)
img += aur[..., None] * np.array([0.15, 1.0, 0.55]) * 0.9 + gaussian_filter(aur, 8)[..., None] * np.array([0.3, 0.2, 0.6]) * 0.6
finish(img, 'curiosidades.jpg', seed=71)
print('done', sorted(os.listdir(OUT)))
