# Ronda 133 · «en invierno, que se vean menos hojas aún: más tronco y ramas». Del roble de invierno (ronda 66, copia en tools/retirados/arbol-invierno.r132.webp)
# se quitan las masas claras de la copa (manchas gris-nieve y estelas horizontales: claras y sin color) y se conserva la madera: lo oscuro (ramas, ramillas)
# y, entero, lo que está dentro de una estructura gruesa (tronco y brazos: densidad de oscuro alta alrededor). Bordes suaves.
#   uv run --with pillow --with numpy --with scipy python tools/r133-invierno-desnudo.py
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
src = 'tools/retirados/arbol-invierno.r132.webp'
a = np.asarray(Image.open(src).convert('RGBA')).astype(np.float32)
A = a[..., 3] / 255; c = a[..., :3] / 255
L = c @ np.array([.299, .587, .114], np.float32); s = c.max(2) - c.min(2)
# madera: oscura (rampa 0.30 → 0.44) o parda saturada y no clara
osc = np.clip((0.44 - L) / 0.14, 0, 1)
parda = np.clip((s - 0.10) / 0.08, 0, 1) * np.clip((0.62 - L) / 0.12, 0, 1)
madera = np.maximum(osc, parda) * (A > 0.15)
# estructura gruesa: densidad de madera en ~13 px → dentro del tronco y los brazos se conserva todo (luces y nieve incluidas)
dens = ndi.uniform_filter(madera, 13)
grueso = np.clip((dens - 0.42) / 0.18, 0, 1)
grueso = ndi.gaussian_filter(ndi.grey_dilation(grueso, size=5), 1.5)
keep = np.maximum(madera, grueso)
keep = ndi.gaussian_filter(keep, 0.7)
keep = np.clip(keep * 1.25, 0, 1)
na = A * keep
# motas sueltas (restos de las estelas y del polvo de la copa): fuera las manchas pequeñas aisladas
lab, n = ndi.label(na > 0.08)
tam = ndi.sum(np.ones_like(na), lab, index=np.arange(1, n + 1))
viva = np.concatenate([[0], (tam >= 60).astype(np.float32)])[lab]
na = na * ndi.gaussian_filter(np.maximum(viva, (na <= 0.08) * 0), 0.6).clip(0, 1) ** 0.5 * (ndi.grey_dilation(viva, size=3) > 0)
out = np.dstack([a[..., :3], na * 255]).clip(0, 255).astype(np.uint8)
Image.fromarray(out, 'RGBA').save('public/media/hero/arbol-invierno.webp', quality=92, method=6)
print('cobertura antes', (A > .05).mean().round(3), 'después', (na > .05).mean().round(3))
