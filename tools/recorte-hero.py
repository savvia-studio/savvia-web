# Ronda 13 · la acuarela del roble (fondo HUESO, no blanco) → dos láminas con alfa para vivir sobre Cacao, partidas por la línea de suelo.
#   uv run --with pillow --with numpy --with scipy python tools/recorte-hero.py
# Igual que recorte.py pero: el fondo se mide (esquinas), NO se tira nada por «masa principal» (las estelas y salpicaduras son la
# gracia de la lámina) y el color de la zona translúcida sale de la tinta opaca vecina (sin halo hueso sobre oscuro).
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
im = np.asarray(Image.open('tools/fuente-hero-r13.webp').convert('RGB')).astype(np.float32)
bg = np.median(np.concatenate([im[:12, :12].reshape(-1, 3), im[-12:, -12:].reshape(-1, 3), im[:12, -12:].reshape(-1, 3)]), 0)
d = np.max(bg - im, 2)                        # cuánto se aparta del hueso (la tinta siempre oscurece)
a = np.clip((d - 9.0) / 70.0, 0, 1) ** 0.9
a = ndi.gaussian_filter(a, 0.5)
aa = np.maximum(a, 1e-3)[..., None]
c = np.clip((im - (1 - aa) * bg) / aa, 0, 255)
o = (a > 0.85).astype(np.float32)
num = np.dstack([ndi.gaussian_filter(c[..., k] * o, 5) for k in range(3)])
den = ndi.gaussian_filter(o, 5)[..., None] + 1e-4
w = np.clip((0.85 - a) / 0.5, 0, 1)[..., None] * (den > 0.01)
c = c * (1 - w) + (num / den) * w
out = np.dstack([c, a * 255]).astype(np.uint8)
SUELO = 583
X0, X1 = 188, 1448   # recorte horizontal CENTRADO en el eje del tronco (818 px, medido a 520–565 px de alto)
out = out[:, X0:X1]
for nombre, trozo in (('hero-arbol', out[:SUELO]), ('hero-raices', out[SUELO - 3:])):
    ys, xs = np.where(trozo[..., 3] > 6)
    print(nombre, 'caja x', xs.min(), xs.max(), 'y', ys.min(), ys.max(), 'tam', trozo.shape[1], trozo.shape[0])
    Image.fromarray(trozo, 'RGBA').save(f'public/media/{nombre}.webp', quality=90, method=6)
# vista previa sobre Cacao
cac = np.array([0x30, 0x20, 0x18], np.float32)
al = out[..., 3:4] / 255.0
prev = out[..., :3] * al + cac * (1 - al)
Image.fromarray(prev.astype(np.uint8)).save('tools/shots/_hero-cacao.jpg', quality=88)
