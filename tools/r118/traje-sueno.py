# RONDA 118 · el director en TRAJE (la lámina de la ronda 98) con el tratamiento «soñado» de la ronda 86 (copia de tools/r85/director-sueno.py).
# y se deshace en ESTELAS horizontales (como la copa del roble, que se deshacía en estelas): varias copias arrastradas en horizontal por detrás, más largas hacia
# los lados, y el canto se rompe con ruido. El motor (estela.ts, modo árbol) la hunde después en la noche y la trama.
#   uv run --with pillow --with numpy --with scipy python tools/r85/director-sueno.py
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
im = np.asarray(Image.open('public/media/hero/jazz-director.webp').convert('RGBA')).astype(np.float32) / 255
im = np.pad(im, ((24, 24), (300, 300), (0, 0)))  # margen: que las estelas se apaguen antes del canto
rgb, a = im[..., :3], im[..., 3]
pm = rgb * a[..., None]
# menos detalle: un desenfoque suave (la pintura, no la foto)
# pincelado suelto: filtro de mediana (manchas) + desenfoque suave
pm_s = np.dstack([ndi.gaussian_filter(ndi.median_filter(pm[..., k], 7), 1.4) for k in range(3)]); a_s = ndi.gaussian_filter(ndi.median_filter(a, 7), 1.4)
# ESTELAS: arrastres horizontales de distinta longitud, a los dos lados
H, W = a.shape
est_pm = np.zeros_like(pm_s); est_a = np.zeros_like(a_s)
for L, peso in [(70, 0.9), (200, 0.75), (460, 0.6)]:
    k = np.ones(L) / L
    est_pm += np.dstack([ndi.convolve1d(pm_s[..., c], k, axis=1, mode='constant') for c in range(3)]) * peso
    est_a += ndi.convolve1d(a_s, k, axis=1, mode='constant') * peso
# las estelas son más fuertes a media altura y se deshilachan en bandas (ruido por filas)
filas = ndi.gaussian_filter1d(np.random.default_rng(7).random(H), 3)
filas = (filas - filas.min()) / (filas.max() - filas.min())
banda = (0.15 + 1.6 * filas ** 2)[:, None]
est_pm *= banda[..., None]; est_a *= banda[:, 0][:, None]
# el canto de la figura se rompe con ruido (se deshace)
ruido = ndi.gaussian_filter(np.random.default_rng(3).random((H, W)), 2.2)
ruido = (ruido - ruido.min()) / (ruido.max() - ruido.min())
borde = np.clip((a_s - 0.15) / 0.6, 0, 1)
a_f = a_s * np.clip(borde * 1.1 + (ruido - 0.5) * 2.2, 0, 1) ** 0.8
# los atriles (el tercio de abajo, fuera de la figura central) se disuelven más en sus estelas: lo literal, al fondo
yy, xx = np.mgrid[0:H, 0:W]
lados = np.clip((np.abs(xx - W * 0.5) - W * 0.14) / (W * 0.08), 0, 1) * np.clip((yy - H * 0.55) / (H * 0.1), 0, 1)
a_f = a_f * (1 - 0.55 * lados)
pm_f = pm_s * (a_f / np.maximum(a_s, 1e-3))[..., None]
# componer: la figura encima de sus estelas
out_a = a_f + est_a * (1 - a_f)
out_pm = pm_f + est_pm * (1 - a_f)[..., None]
rgb_o = out_pm / np.maximum(out_a, 1e-3)[..., None]
o = np.dstack([np.clip(rgb_o, 0, 1), np.clip(out_a, 0, 1)])
Image.fromarray((o * 255).astype(np.uint8), 'RGBA').save('public/media/hero/director-traje.webp', quality=88)
print('ok', W, H)
