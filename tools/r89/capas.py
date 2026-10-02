# RONDA 89 · «quiero que las diferentes partes del hero estén en diferentes capas: el director primero, luego atriles y luego fondo».
# La lámina de Andoni (director-andoni.webp) se parte con la máscara de persona de rembg (u2net_human_seg → mascara-director.png) más la batuta
# (un segmento de la mano a la punta, medido), y cada capa pasa por el mismo «sueño» de la ronda 86 (pincelado + estelas + canto roto).
# Las dos capas comparten caja (1490 × 1105): el motor las pinta en el mismo sitio y las mismas coordenadas valen para las dos.
#   uv run --with pillow --with numpy --with scipy python tools/r89/capas.py
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
im = np.asarray(Image.open('public/media/hero/director-andoni.webp').convert('RGBA')).astype(np.float32) / 255
H, W = im.shape[:2]
m = np.asarray(Image.open('tools/r89/mascara-director.png').convert('L').resize((W, H))).astype(np.float32) / 255
m = np.clip((m - 0.35) / 0.3, 0, 1)
yy, xx = np.mgrid[0:H, 0:W]
# la batuta: de la punta (0,632 · 0,02) a la mano (0,728 · 0,128)
p0, p1 = np.array([0.632 * W, 0.02 * H]), np.array([0.735 * W, 0.135 * H])
d = p1 - p0; t = np.clip(((xx - p0[0]) * d[0] + (yy - p0[1]) * d[1]) / (d @ d), 0, 1)
dist = np.hypot(xx - (p0[0] + t * d[0]), yy - (p0[1] + t * d[1]))
m = np.maximum(m, np.clip((16 - dist) / 6, 0, 1))
# lo que queda por encima de los atriles (y < 0,5) es todo director
m = np.where(yy < 0.5 * H, np.maximum(m, (im[..., 3] > 0.02).astype(np.float32)), m)
# las piernas, abajo en el centro (la máscara de persona las pierde bajo la capa)
m = np.where((yy > 0.84 * H) & (xx > 0.33 * W) & (xx < 0.64 * W), np.maximum(m, (im[..., 3] > 0.02).astype(np.float32)), m)
rgb, a = im[..., :3], im[..., 3]
def sueno(a, rgb, estelas, disolver_lados, semilla, nombre):
    pm = rgb * a[..., None]
    pm_s = np.dstack([ndi.gaussian_filter(ndi.median_filter(pm[..., k], 7), 1.4) for k in range(3)]); a_s = ndi.gaussian_filter(ndi.median_filter(a, 7), 1.4)
    est_pm = np.zeros_like(pm_s); est_a = np.zeros_like(a_s)
    for L, peso in estelas:
        k = np.ones(L) / L
        est_pm += np.dstack([ndi.convolve1d(pm_s[..., c], k, axis=1, mode='constant') for c in range(3)]) * peso
        est_a += ndi.convolve1d(a_s, k, axis=1, mode='constant') * peso
    filas = ndi.gaussian_filter1d(np.random.default_rng(semilla).random(H), 3)
    filas = (filas - filas.min()) / (filas.max() - filas.min())
    banda = (0.15 + 1.6 * filas ** 2)[:, None]
    est_pm *= banda[..., None]; est_a *= banda
    ruido = ndi.gaussian_filter(np.random.default_rng(semilla + 1).random((H, W)), 2.2)
    ruido = (ruido - ruido.min()) / (ruido.max() - ruido.min())
    borde = np.clip((a_s - 0.15) / 0.6, 0, 1)
    a_f = a_s * np.clip(borde * 1.1 + (ruido - 0.5) * 2.2, 0, 1) ** 0.8
    a_f = a_f * (1 - disolver_lados)
    pm_f = pm_s * (a_f / np.maximum(a_s, 1e-3))[..., None]
    out_a = a_f + est_a * (1 - a_f)
    out_pm = pm_f + est_pm * (1 - a_f)[..., None]
    o = np.dstack([np.clip(out_pm / np.maximum(out_a, 1e-3)[..., None], 0, 1), np.clip(out_a, 0, 1)])
    Image.fromarray((o * 255).astype(np.uint8), 'RGBA').save(f'public/media/hero/{nombre}.webp', quality=88)
    print('ok', nombre)
# RONDA 91 · para el estilo papel: las capas NÍTIDAS (la lámina tal cual, solo recortada), que el collage necesita detalle (manos, batuta, cabeza)
for nombre, al in [('director-nitido', a * m), ('atriles-nitido', a * (1 - m))]:
    Image.fromarray((np.dstack([rgb, al]) * 255).astype(np.uint8), 'RGBA').save(f'public/media/hero/{nombre}.webp', quality=90)
    print('ok', nombre)
sueno(a * m, rgb, [(70, 0.9), (200, 0.75), (460, 0.6)], 0, 7, 'director')
# los atriles: menos estela (la magia los tiene que encontrar) y nada disuelto
sueno(a * (1 - m), rgb, [(50, 0.55), (160, 0.4)], 0, 11, 'atriles')
