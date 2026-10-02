# RONDA 96 · «en el hero quiero probar otro estilo, el de los retratos de los testimonios»: las láminas nuevas de Andoni (director de espaldas con sus
# atriles, 1672 × 941, y el de perfil para el pie, 1024 × 1536). El dibujo lo hace src/scripts/retrato.ts; aquí solo se separan las capas (máscara de
# persona de rembg + la batuta + todo lo de arriba) y se rompe el canto con ruido (el carboncillo que se deshace en el papel), con el alfa ENTERO
# de la lámina para que el corte entre director y atriles no deje costura.
#   uv run --with pillow --with numpy --with scipy python tools/r96/capas.py
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

def canto(a, semilla):
    H, W = a.shape
    ab = ndi.gaussian_filter(a, 7)
    ruido = ndi.gaussian_filter(np.random.default_rng(semilla).random((H, W)), 2.4)
    ruido = (ruido - ruido.min()) / (ruido.max() - ruido.min())
    return np.clip((ab - 0.1) / 0.32 + (ruido - 0.5) * 0.7, 0, 1) ** 0.85

def guardar(rgb, al, nombre):
    Image.fromarray((np.dstack([rgb, np.clip(al, 0, 1)]) * 255).astype(np.uint8), 'RGBA').save(f'public/media/{nombre}.webp', quality=90, alpha_quality=100)
    print('ok', nombre)

im = np.asarray(Image.open('tools/r96/director-atriles.webp').convert('RGBA')).astype(np.float32) / 255
H, W = im.shape[:2]
rgb, a = im[..., :3], im[..., 3]
m = np.asarray(Image.open('tools/r96/mascara-director.png').convert('L')).astype(np.float32) / 255
m = np.clip((m - 0.35) / 0.3, 0, 1)
yy, xx = np.mgrid[0:H, 0:W]
m = np.where((xx < 0.33 * W) & (yy > 0.6 * H), 0, m)          # el pie del primer atril, que la máscara cogía como persona
m = np.where(yy < 0.49 * H, np.maximum(m, (a > 0.02).astype(np.float32)), m)  # por encima de los atriles, todo es director (brazos, batuta)
# la batuta: de la punta a la mano
p0, p1 = np.array([0.583 * W, 0.015 * H]), np.array([0.672 * W, 0.15 * H])
d = p1 - p0; t = np.clip(((xx - p0[0]) * d[0] + (yy - p0[1]) * d[1]) / (d @ d), 0, 1)
bat = np.clip((10 - np.hypot(xx - (p0[0] + t * d[0]), yy - (p0[1] + t * d[1]))) / 4, 0, 1)
m = np.maximum(m, bat)
m = ndi.gaussian_filter(m, 1.2)
c = np.maximum(canto(a, 5), bat * (a > 0.05))
guardar(rgb, a * c * m, 'hero/retrato-director')
# RONDA 96 (2.ª) · «los ordenadores se tienen que ver más pequeños»: cada atril se encoge sobre su propia BASE (el centro de su pie), así no se
# juntan ni se meten bajo la capa. Se imprimen sus pantallas nuevas (para la magia del hero)
ESC = 0.74
aa = a * c * (1 - m)
lab, nl = ndi.label(aa > 0.04)
tam = ndi.sum(np.ones_like(aa), lab, range(1, nl + 1))
grandes = [i + 1 for i in np.argsort(tam)[::-1][:4]]
out = np.zeros((H, W, 4), np.float32)
bases = []
PANT0 = [[0.069, 0.51, 0.227, 0.68], [0.26, 0.535, 0.4, 0.68], [0.62, 0.535, 0.727, 0.68], [0.777, 0.51, 0.918, 0.685]]
for k in sorted(grandes, key=lambda k: ndi.center_of_mass(lab == k)[1]):
    sel = ndi.binary_dilation(lab == k, iterations=6)
    ys, xs = np.nonzero(sel)
    bx, by = (xs.min() + xs.max()) / 2, 0.955 * H  # todos sobre el mismo suelo (el tercero asoma tras la capa: su pie no se ve)
    pieza = np.dstack([rgb, aa]) * sel[..., None]
    img = Image.fromarray((pieza * 255).astype(np.uint8), 'RGBA')
    # afín inversa: destino (x, y) ← origen bx + (x − bx)/ESC
    img = img.transform((W, H), Image.AFFINE, (1 / ESC, 0, bx - bx / ESC, 0, 1 / ESC, by - by / ESC), resample=Image.BICUBIC)
    q = np.asarray(img).astype(np.float32) / 255
    out[..., :3] = q[..., :3] * q[..., 3:] + out[..., :3] * (1 - q[..., 3:])
    out[..., 3] = q[..., 3] + out[..., 3] * (1 - q[..., 3])
    bases.append((bx / W, by / H))
out[..., :3] = out[..., :3] / np.maximum(out[..., 3:], 1e-3)
for (bx, by), pa in zip(bases, PANT0):
    f = lambda x, y: (round(bx + (x - bx) * ESC, 3), round(by + (y - by) * ESC, 3))
    x0, y0 = f(pa[0], pa[1]); x1, y1 = f(pa[2], pa[3]); print('pantalla', [x0, y0, x1, y1], 'centro', [round((x0 + x1) / 2, 3), round((y0 + y1) / 2, 3)])
Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8), 'RGBA').save('public/media/hero/retrato-atriles.webp', quality=90, alpha_quality=100)
print('ok hero/retrato-atriles (pequeños)')

im = np.asarray(Image.open('tools/r96/director-perfil.webp').convert('RGBA')).astype(np.float32) / 255
H, W = im.shape[:2]
rgb, a = im[..., :3], im[..., 3]
yy, xx = np.mgrid[0:H, 0:W]
p0, p1 = np.array([0.967 * W, 0.01 * H]), np.array([0.83 * W, 0.115 * H])
d = p1 - p0; t = np.clip(((xx - p0[0]) * d[0] + (yy - p0[1]) * d[1]) / (d @ d), 0, 1)
bat = np.clip((8 - np.hypot(xx - (p0[0] + t * d[0]), yy - (p0[1] + t * d[1]))) / 3, 0, 1)
guardar(rgb, a * np.maximum(canto(a, 9), bat * (a > 0.05)), 'pie/retrato-perfil')
