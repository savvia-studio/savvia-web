# Recorta una lámina de naturaleza sobre BLANCO puro a PNG/WebP con alfa, para usarla sobre Cacao.
#   uv run --with pillow --with numpy --with scipy python tools/recorte.py <entrada.png> <salida.webp>
# Método: alfa por distancia al blanco (el interior queda opaco, solo el borde y las estelas son translúcidos),
# color des-mezclado del blanco en la zona translúcida, y se conserva solo la masa principal
# (las láminas vienen recortadas de una hoja y traen trozos de las vecinas en los bordes).
import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi
src, dst = sys.argv[1], sys.argv[2]
T = float(sys.argv[3]) if len(sys.argv) > 3 else 64.0
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
d = 255.0 - im.min(2)                       # distancia al blanco
a = np.clip((d - 10.0) / T, 0, 1)      # los 10 primeros niveles son ruido del blanco: si no, queda un rectángulo fantasma
# masa principal: componente conexa mayor de lo «con algo de tinta», dilatada para no comerse las estelas
m = ndi.binary_dilation(a > 0.06, iterations=6)
lab, n = ndi.label(m)
if n > 1:
    sizes = ndi.sum(m, lab, range(1, n + 1)); keep = 1 + int(np.argmax(sizes))
    a = a * (lab == keep)
a = ndi.gaussian_filter(a, 0.6)
aa = np.maximum(a, 1e-3)[..., None]
c = np.clip((im - (1 - aa) * 255.0) / aa, 0, 255)   # quitar el blanco mezclado
# Sobre oscuro, el borde pálido se lee como un halo de pegatina: en la zona translúcida el color se toma
# de la tinta opaca más cercana (difusión del color opaco hacia fuera), no de la mezcla con el papel.
o = (a > 0.92).astype(np.float32)
num = np.dstack([ndi.gaussian_filter(c[..., k] * o, 7) for k in range(3)])
den = ndi.gaussian_filter(o, 7)[..., None] + 1e-4
relleno = num / den
w = np.clip((0.92 - a) / 0.5, 0, 1)[..., None] * (den > 0.02)
c = c * (1 - w) + relleno * w
out = np.dstack([c, a * 255]).astype(np.uint8)
ys, xs = np.where(a > 0.02)
out = out[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
Image.fromarray(out, 'RGBA').save(dst, quality=88, method=6)
print(dst, out.shape[1], 'x', out.shape[0], 'alfa medio %.2f' % (out[..., 3].mean() / 255))
