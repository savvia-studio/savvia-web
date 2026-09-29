# Ronda 66 · los cuatro robles de Andoni (SAVVIA-roble-cuatro-estaciones-v02) → árbol y raíces por estación, con el MISMO recorte que el de la ronda 13
# (tools/recorte-hero.py): fondo claro medido en las esquinas, alfa por distancia al fondo, color de lo translúcido desde la tinta vecina, partido por el suelo.
#   uv run --with pillow --with numpy --with scipy python tools/r66-robles.py
import numpy as np, os
from PIL import Image
from scipy import ndimage as ndi
SUELO, X0, X1 = 583, 188, 1448
os.makedirs('public/media/hero', exist_ok=True)
for est in ('otono', 'invierno', 'primavera', 'verano'):
    im = np.asarray(Image.open(f'tools/r66/SAVVIA-roble-cuatro-estaciones-v02/savvia-roble-{est}.png').convert('RGB')).astype(np.float32)
    bg = np.median(np.concatenate([im[:12, :12].reshape(-1, 3), im[-12:, -12:].reshape(-1, 3), im[:12, -12:].reshape(-1, 3)]), 0)
    d = np.max(bg - im, 2)
    a = np.clip((d - 9.0) / 70.0, 0, 1) ** 0.9
    a = ndi.gaussian_filter(a, 0.5)
    aa = np.maximum(a, 1e-3)[..., None]
    c = np.clip((im - (1 - aa) * bg) / aa, 0, 255)
    o = (a > 0.85).astype(np.float32)
    num = np.dstack([ndi.gaussian_filter(c[..., k] * o, 5) for k in range(3)])
    den = ndi.gaussian_filter(o, 5)[..., None] + 1e-4
    w = np.clip((0.85 - a) / 0.5, 0, 1)[..., None] * (den > 0.01)
    c = c * (1 - w) + (num / den) * w
    out = np.dstack([c, a * 255]).astype(np.uint8)[:, X0:X1]
    for nombre, trozo in (('arbol', out[:SUELO]), ('raices', out[SUELO - 3:])):
        ys, xs = np.where(trozo[..., 3] > 6)
        print(est, nombre, 'x', xs.min(), xs.max(), 'y', ys.min(), ys.max(), 'fondo', bg.astype(int))
        Image.fromarray(trozo, 'RGBA').save(f'public/media/hero/{nombre}-{est}.webp', quality=90, method=6)
    cac = np.array([0x30, 0x20, 0x18], np.float32); al = out[..., 3:4] / 255.0
    Image.fromarray((out[..., :3] * al + cac * (1 - al)).astype(np.uint8)).save(f'tools/shots/r66-roble-{est}.jpg', quality=85)
