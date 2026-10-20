import sys, numpy as np
from PIL import Image
sys.path.insert(0, '.')
from spacelib import stars, planet, fbm
from scipy.ndimage import gaussian_filter
A = sys.argv[1]
def tone(img): return np.clip(1 - np.exp(-img * 1.4), 0, 1)
N = 1024
img = stars(N, N, 7, n=900) * 0.7
img = planet(img, N * 0.5, N * 0.5, N * 0.3, 44, (0.25, 0.45, 0.75), (0.03, 0.06, 0.15), (0.4, 0.75, 1.25), light=(-0.6, -0.55), band=True)
Image.fromarray((tone(img) * 255).astype(np.uint8)).save(f'{A}/icon.png')
Image.fromarray((tone(img) * 255).astype(np.uint8)).resize((48, 48), Image.LANCZOS).save(f'{A}/favicon.png')
# android background: starfield only
bg = stars(N, N, 8, n=900) * 0.7
Image.fromarray((tone(bg) * 255).astype(np.uint8)).save(f'{A}/android-icon-background.png')
# foreground + splash: planet on transparent
fg = np.zeros((N, N, 3)); fg = planet(fg, N * 0.5, N * 0.5, N * 0.22, 44, (0.25, 0.45, 0.75), (0.03, 0.06, 0.15), (0.4, 0.75, 1.25), light=(-0.6, -0.55), band=True)
rgb = tone(fg); yy, xx = np.mgrid[0:N, 0:N]; r = np.hypot(xx - N/2, yy - N/2) / (N * 0.22)
alpha = np.clip(np.maximum((r <= 1.0) * 1.0, rgb.max(2) * 1.6), 0, 1)
rgba = np.dstack([rgb, alpha]); Image.fromarray((rgba * 255).astype(np.uint8), 'RGBA').save(f'{A}/android-icon-foreground.png')
Image.fromarray((rgba * 255).astype(np.uint8), 'RGBA').save(f'{A}/splash-icon.png')
mono = np.dstack([np.ones((N, N, 3)), (r <= 1.0) * 1.0]); Image.fromarray((mono * 255).astype(np.uint8), 'RGBA').save(f'{A}/android-icon-monochrome.png')
print('icons ok')
