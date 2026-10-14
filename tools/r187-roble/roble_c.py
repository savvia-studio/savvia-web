# RONDA 187 (2.ª) · la C «Hoja de roble» elegida: el roble SALE DESDE ABAJO del icono (sin suelo, el tronco se ensancha y corta el canto)
# y la copa en MOSAICO de tonos: cada lóbulo un color de la estación, luz arriba a la izquierda, sombra abajo a la derecha y motas.
import math, json, sys, numpy as np
sys.argv, D = sys.argv[:1], sys.argv[1]
exec(open('roble.py').read().split("SUELO = 55.5")[0])  # funciones comunes (smin, disco, seg, union, ruta, rama)
from PIL import Image, ImageDraw
DY = 2.5  # todo baja un poco: la copa respira arriba y el tronco cae fuera
LOB = [(11, 31, 6), (16.5, 22, 7.2), (25.5, 15, 8.2), (37, 14.5, 8.4), (47.5, 19.5, 7.6), (54.5, 28, 6.6),
       (45, 30, 7.5), (33, 26, 9.5), (21, 30.5, 7.2)]
LOB = [(x, y + DY, r) for x, y, r in LOB]
def senos():
    L = LOB[:6]; out = []
    for (x1, y1, _), (x2, y2, _) in zip(L, L[1:]):
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2; a = math.atan2(my - 27 - DY, mx - 33)
        for t in np.arange(0, 30, 0.1):
            px, py = mx + math.cos(a) * t, my + math.sin(a) * t
            if min(math.hypot(px - x, py - y) - r for x, y, r in L) > 0: break
        out.append((px + math.cos(a) * 1.1, py + math.sin(a) * 1.1))
    return out
SEN = senos()
def copa(ox=0, oy=0):
    d = union([disco(x, y, r, ox, oy) for x, y, r in LOB], 0.8)
    for x, y in SEN: d = np.maximum(d, -disco(x, y, 2.3, ox, oy))
    return d
# racimos interiores que hacen el mosaico (de atrás adelante), cada uno con su índice de tono
# RACIMOS: los propios lóbulos, de atrás adelante; abajo los hondos, arriba los claros; cada uno con su sombra
RAC = [((33, 26, 9.5), 3), ((21, 30.5, 7.2), 4), ((45, 30, 7.5), 3), ((11, 31, 6), 2), ((54.5, 28, 6.6), 2),
       ((16.5, 22, 7.2), 1), ((47.5, 19.5, 7.6), 1), ((25.5, 15, 8.2), 0), ((37, 14.5, 8.4), 0)]
RAC = [((x, y + DY, r), t) for (x, y, r), t in RAC]
MOTAS = [(23, 12 + DY, 1.1), (40, 10.5 + DY, 1.0), (14, 20 + DY, 0.9)]
RAMAS = [([(30, 70), (31.2, 56), (32.2, 46), (34, 37 + DY)], 5.6, 2.6), ([(33, 41 + DY), (26, 35.5 + DY)], 2.1, 1.3), ([(33.4, 40 + DY), (41, 33.5 + DY)], 2.0, 1.3)]
INV = [((34, 37 + DY), -1.6, 9, 2.0), ((26.5, 36 + DY), -2.4, 8, 1.6), ((40.5, 34 + DY), -0.8, 8.5, 1.6), ((34, 37 + DY), -1.15, 8, 1.4)]
EST = {  # fondo · tronco · cinco tonos de hoja (claro → hondo) · luz · motas
    'primavera': ('#3C2B34', '#B07A60', ['#FFF0F4', '#FBCFDB', '#F2A9BF', '#E07FA0', '#A9C968', '#7FA44A'], '#FFF1F5', '#FFFFFF'),
    'verano':    ('#1C3327', '#A97858', ['#E4EE9A', '#C2DB6E', '#93C04F', '#68A03E', '#47803A', '#2F5E2C'], '#EEF5B8', '#F2E36B'),
    'otono':     ('#3D251C', '#B4805E', ['#FFDA85', '#F8B048', '#EC8534', '#D45A2C', '#A9A23E', '#7E7A30'], '#FFE7A8', '#C9502A'),
    'invierno':  ('#F5F5F7', '#5E4A3F', [], '#AFC2D6', '#AFC2D6'),  # en claro, como la web en invierno; la nieve en azul hielo para que se vea
}
def capas(est):
    fo, tr, tonos, luz, mota = EST[est]
    tronco = union([seg(p, r0, r1) for p, r0, r1 in RAMAS], 1.2)
    if est == 'invierno':
        tw = []
        for p, a, l, r in INV: rama(p, a, l, r, 2, tw)
        esq = union([tronco] + [seg(p, r0, r1) for p, r0, r1 in tw], 0.5)
        sube = union([seg([(a[0], a[1] + 1.0) for a in p], r0, r1) for p, r0, r1 in RAMAS + tw], 0.5)
        return [(tr, esq), (luz, np.maximum(esq, -sube))]
    c = copa(); out = [(tr, tronco), (tonos[2], c)]
    for (x, y, r), t in RAC:
        lo = np.maximum(disco(x, y, r), c); out.append((tonos[t], lo))
        out.append((tonos[min(t + 1, 5)], np.maximum(lo, -disco(x, y, r, -1.3, -1.9))))  # su sombra
    out.append((luz, np.maximum(c, -copa(0.8, 1.2))))       # filo de luz arriba a la izquierda
    out.append((tonos[5], np.maximum(c, -copa(-2.0, -3.0))))  # sombra abajo a la derecha
    for x, y, r in MOTAS: out.append((mota, np.maximum(disco(x, y, r), c + 0.6)))
    return out
def raster(cs, fo, tam):
    img = np.zeros((N, N, 3), np.float32); img[:] = [int(fo[i:i+2], 16) for i in (1, 3, 5)]
    for col, d in cs:
        a = np.clip(0.5 - d * U, 0, 1)[..., None]; img = img * (1 - a) + np.array([int(col[i:i+2], 16) for i in (1, 3, 5)], np.float32) * a
    im = Image.fromarray(img.astype(np.uint8)).resize((tam, tam), Image.LANCZOS).convert('RGBA')
    m = Image.new('L', (tam * 4,) * 2, 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, tam * 4 - 1, tam * 4 - 1), radius=int(tam * 4 * 14 / 64), fill=255)
    im.putalpha(m.resize((tam, tam), Image.LANCZOS)); return im
res = {}
for est in EST:
    cs = capas(est); fo = EST[est][0]
    for t in (16, 32, 180): raster(cs, fo, t).save(f'{D}/C2-{est}-{t}.png')
    res[est] = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><clipPath id="t"><rect width="64" height="64" rx="14"/></clipPath></defs><g clip-path="url(#t)">' \
        f'<rect width="64" height="64" fill="{fo}"/>' + ''.join(f'<path fill="{c}" fill-rule="evenodd" d="{ruta(d)}"/>' for c, d in cs) + '</g></svg>'
    open(f'{D}/C2-{est}.svg', 'w').write(res[est])
print('ok')
# exportar: favicon 64 px con el cuadro redondeado y el de iPhone 180 px a sangre (iOS redondea solo)
if len(sys.argv) >= 1 and __import__('os').environ.get('EXPORTAR'):
    P = __import__('os').environ['EXPORTAR']
    for est in EST:
        cs = capas(est); fo = EST[est][0]
        raster(cs, fo, 64).save(f'{P}/favicon-{est}.png', optimize=True)
        im = raster(cs, fo, 180); bg = Image.new('RGBA', im.size, fo); bg.alpha_composite(raster(cs, fo, 180).convert('RGBA'))
        sq = np.zeros((N, N, 3), np.float32); sq[:] = [int(fo[i:i+2], 16) for i in (1, 3, 5)]
        for col, d in cs:
            a = np.clip(0.5 - d * U, 0, 1)[..., None]; sq = sq * (1 - a) + np.array([int(col[i:i+2], 16) for i in (1, 3, 5)], np.float32) * a
        Image.fromarray(sq.astype(np.uint8)).resize((180, 180), Image.LANCZOS).save(f'{P}/apple-touch-icon-{est}.png', optimize=True)
    print('exportado')
