# RONDA 187 · el roble del favicon por estación (idea de Eric) redibujado como ICONO: silueta propia de roble, 80 % del cuadro,
# dos tonos con corte limpio, mismo dibujo en las cuatro estaciones. SDF + uniones suaves → potrace (Bézier).
import math, json, sys, numpy as np, potrace
from PIL import Image
N = 1024; U = N / 64
yy, xx = np.mgrid[0:N, 0:N].astype(np.float32) / U
def smin(a, b, k):
    h = np.clip(0.5 + 0.5 * (b - a) / k, 0, 1); return b * (1 - h) + a * h - k * h * (1 - h)
def disco(cx, cy, r, ox=0, oy=0): return np.hypot(xx - cx - ox, yy - cy - oy) - r
def seg(pts, r0, r1, ox=0, oy=0):
    d = np.full((N, N), 1e3, np.float32); L = len(pts) - 1
    for i in range(L):
        a, b = np.array(pts[i], np.float32) + (ox, oy), np.array(pts[i+1], np.float32) + (ox, oy); ab = b - a; l2 = float(ab @ ab) or 1e-6
        t = np.clip(((xx - a[0]) * ab[0] + (yy - a[1]) * ab[1]) / l2, 0, 1)
        r = r0 + (r1 - r0) * (i + t) / L
        d = np.minimum(d, np.hypot(xx - a[0] - t * ab[0], yy - a[1] - t * ab[1]) - r)
    return d
def union(ds, k):
    d = ds[0]
    for e in ds[1:]: d = smin(d, e, k)
    return d
def ruta(d):
    pl = potrace.Bitmap(d >= 0).trace(turdsize=8, alphamax=1.1, opticurve=True, opttolerance=1.2)
    s = 1 / U; out = []
    for c in pl:
        st = c.start_point; p = [f'M{st.x*s:.1f} {st.y*s:.1f}']
        for g in c.segments:
            if g.is_corner: p.append(f'L{g.c.x*s:.1f} {g.c.y*s:.1f} {g.end_point.x*s:.1f} {g.end_point.y*s:.1f}')
            else: p.append(f'C{g.c1.x*s:.1f} {g.c1.y*s:.1f} {g.c2.x*s:.1f} {g.c2.y*s:.1f} {g.end_point.x*s:.1f} {g.end_point.y*s:.1f}')
        out.append(' '.join(p) + ' Z')
    return ' '.join(out)
def rama(p, ang, largo, r, nivel, out):  # ramitas del invierno, deterministas
    q = (p[0] + math.cos(ang) * largo, p[1] + math.sin(ang) * largo); out.append(([p, q], r, r * 0.62))
    if nivel > 0:
        for da in (-0.5, 0.42): rama(q, ang + da, largo * 0.66, r * 0.62, nivel - 1, out)

SUELO = 55.5
# --- las tres siluetas: copa (función de un desplazamiento) + ramas principales visibles ---
def A_copa(ox=0, oy=0):  # «Cúpula»: copa ancha y baja de lóbulos redondos, base festoneada
    L = [(12, 30, 7.2), (19, 21.5, 8.2), (29, 15.5, 9), (40, 16.5, 8.8), (49, 22.5, 7.8), (54, 30.5, 6.6),
         (44, 31, 8), (32, 28, 9.5), (20, 31.5, 7.6)]
    return union([disco(x, y, r, ox, oy) for x, y, r in L], 2.2)
A_ramas = [([(32, SUELO), (32.5, 44), (31.5, 38)], 3.9, 2.6), ([(31.5, 40), (25, 34)], 2.2, 1.4), ([(32, 41), (39.5, 34.5)], 2.0, 1.3)]
A_inv = [((31.5, 38), -1.75, 9, 2.1), ((26, 35), -2.45, 8, 1.6), ((39, 35), -0.75, 8.5, 1.6), ((31.5, 38), -1.2, 8, 1.5)]

def B_copa(ox=0, oy=0):  # «Tres masas»: el porte abierto del roble, ramas a la vista entre las nubes de hoja
    m1 = union([disco(x, y, r, ox, oy) for x, y, r in [(10.5, 31, 5.6), (16, 26, 6.6), (21.5, 30.5, 5.4)]], 2)
    m2 = union([disco(x, y, r, ox, oy) for x, y, r in [(24.5, 18, 6.4), (32, 13, 7.6), (39.5, 17.5, 6.6), (32, 20.5, 6)]], 2)
    m3 = union([disco(x, y, r, ox, oy) for x, y, r in [(43, 28.5, 5.6), (49, 24, 6.6), (54.5, 29.5, 5.4)]], 2)
    return np.minimum(np.minimum(m1, m2), m3)
B_ramas = [([(32, SUELO), (31.5, 46), (32.5, 40)], 4.0, 2.8), ([(32.5, 41), (25, 37), (17.5, 31)], 2.4, 1.3),
           ([(32.5, 41), (40, 36.5), (47.5, 28.5)], 2.3, 1.3), ([(32.3, 41), (31.5, 31), (32, 21)], 2.3, 1.4)]
B_inv = [((17.5, 31), -2.3, 7, 1.3), ((47.5, 28.5), -0.8, 7, 1.3), ((32, 21), -1.6, 7, 1.4), ((24, 36.5), -2.0, 6, 1.1), ((41, 36), -1.1, 6, 1.1)]

def _senos():  # entre lóbulos vecinos del borde: se busca el borde en el rayo desde el centro y se muerde ahí
    L = [(11, 31, 6), (16.5, 22, 7.2), (25.5, 15, 8.2), (37, 14.5, 8.4), (47.5, 19.5, 7.6), (54.5, 28, 6.6)]
    out = []
    for (x1, y1, _), (x2, y2, _) in zip(L, L[1:]):
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2; a = math.atan2(my - 27, mx - 33)
        for t in np.arange(0, 30, 0.1):
            px, py = mx + math.cos(a) * t, my + math.sin(a) * t
            if min(math.hypot(px - x, py - y) - r for x, y, r in L) > 0: break
        out.append((px + math.cos(a) * 1.1, py + math.sin(a) * 1.1))
    return out
C_SENOS = _senos()
def C_copa(ox=0, oy=0):  # «Hoja de roble»: la copa recortada con los senos de la hoja, algo asimétrica (viento)
    L = [(11, 31, 6), (16.5, 22, 7.2), (25.5, 15, 8.2), (37, 14.5, 8.4), (47.5, 19.5, 7.6), (54.5, 28, 6.6),
         (45, 30, 7.5), (33, 26, 9.5), (21, 30.5, 7.2)]
    d = union([disco(x, y, r, ox, oy) for x, y, r in L], 0.8)
    for x, y in C_SENOS: d = np.maximum(d, -(disco(x, y, 2.3, ox, oy)))  # los senos de la hoja, en el borde
    return d
C_ramas = [([(31, SUELO), (32, 45), (34, 37)], 3.9, 2.6), ([(33, 41), (26, 35.5)], 2.1, 1.3), ([(33.4, 40), (41, 33.5)], 2.0, 1.3)]
C_inv = [((34, 37), -1.6, 9, 2.0), ((26.5, 36), -2.4, 8, 1.6), ((40.5, 34), -0.8, 8.5, 1.6), ((34, 37), -1.15, 8, 1.4)]

VAR = {'A': ('Cúpula', A_copa, A_ramas, A_inv), 'B': ('Tres masas', B_copa, B_ramas, B_inv), 'C': ('Hoja de roble', C_copa, C_ramas, C_inv)}
EST = {  # fondo · luz · sombra · tronco
    'primavera': ('#3C2B34', '#F7C6D3', '#D9789B', '#B07A60'),
    'verano':    ('#1C3327', '#B9D46C', '#5E9038', '#A97858'),
    'otono':     ('#3D251C', '#F6AA44', '#CB552C', '#B4805E'),
    'invierno':  ('#262C36', '#FFFFFF', '#FFFFFF', '#9E8B80'),
}
suelo = lambda: seg([(14, SUELO + 1.2), (50, SUELO + 1.2)], 0.9, 0.9)
def capas(k, est):
    nom, copa, ramas, inv = VAR[k]; fo, luz, som, tr = EST[est]
    tronco = union([seg(p, r0, r1) for p, r0, r1 in ramas], 1.2)
    if est != 'invierno':
        c = copa(); sh = np.maximum(c, -copa(-2.2, -3.2))  # sombra: lo de la copa que no cubre la copa movida arriba-izquierda
        return [(tr, smin(tronco, suelo(), 0.6)), (luz, c), (som, sh)]
    tw = []
    for p, a, l, r in inv: rama(p, a, l, r, 2, tw)
    esq = union([tronco] + [seg(p, r0, r1) for p, r0, r1 in tw], 0.5)
    sube = union([seg([(a[0], a[1] + 1.0) for a in p], r0, r1) for p, r0, r1 in ramas] + [seg([(a[0], a[1] + 1.0) for a in p], r0, r1) for p, r0, r1 in tw], 0.5)
    nieve = np.maximum(esq, -sube) ; nieve = np.maximum(nieve, -(-esq - 0.05))  # filo superior de cada rama
    nieve = np.maximum(esq + 0.0, -sube)
    suelo_n = seg([(12, SUELO + 1.2), (52, SUELO + 1.2)], 1.3, 1.3)
    return [(tr, esq), (luz, nieve), (luz, suelo_n)]

def raster(cs, fo, tam):
    img = np.zeros((N, N, 3), np.float32); img[:] = np.array([int(fo[i:i+2], 16) for i in (1, 3, 5)], np.float32)
    for col, d in cs:
        a = np.clip(0.5 - d * U, 0, 1)[..., None]; c = np.array([int(col[i:i+2], 16) for i in (1, 3, 5)], np.float32)
        img = img * (1 - a) + c * a
    im = Image.fromarray(img.astype(np.uint8)).resize((tam, tam), Image.LANCZOS)
    m = Image.new('L', (tam * 4, tam * 4), 0); from PIL import ImageDraw
    ImageDraw.Draw(m).rounded_rectangle((0, 0, tam * 4 - 1, tam * 4 - 1), radius=int(tam * 4 * 14 / 64), fill=255)
    im = im.convert('RGBA'); im.putalpha(m.resize((tam, tam), Image.LANCZOS)); return im

out = {}
for k in VAR:
    for est in EST:
        cs = capas(k, est); fo = EST[est][0]
        out[f'{k}-{est}'] = dict(variante=VAR[k][0], fondo=fo, capas=[(c, ruta(d)) for c, d in cs])
        for t in (16, 32, 180): raster(cs, fo, t).save(f'{sys.argv[1]}/{k}-{est}-{t}.png')
json.dump(out, open(f'{sys.argv[1]}/rutas.json', 'w'))
print('ok', len(out))
