# RONDA 185 (4.ª) · las marcas de la exploración 2 como UN solo trazado limpio (shapely): el pincel se estampa como cápsulas
# cónicas unidas (sin los picos del contorno desplazado) y el borde «a mano» se aplica después, en baja frecuencia.
import math, json, random
from shapely.geometry import Point, Polygon, MultiPolygon
from shapely.ops import unary_union
from geo import catmull, suave
T = '#F5F5F7'; S = '#FF616B'; F = '#3B231B'
def pincel(cl, wf):
    n = len(cl); L = [0]
    for i in range(1, n): L.append(L[-1] + math.dist(cl[i-1], cl[i]))
    rs = [max(0.4, wf(L[i] / L[-1]) / 2) for i in range(n)]
    piezas = [Point(cl[i]).buffer(rs[i], 24).union(Point(cl[i+1]).buffer(rs[i+1], 24)).convex_hull for i in range(n - 1)]
    return unary_union(piezas)
def disco(cx, cy, r): return Point(cx, cy).buffer(r, 48)
def gota(cx, cy, r, ang=-90, alargue=1.8):
    a0 = math.radians(ang); pts = []
    for k in range(96):
        a = 2*math.pi*k/96; c = math.cos(a - a0); rr = r * (1 + (alargue - 1) * max(0, c) ** 5)
        pts.append((cx + rr*math.cos(a), cy + rr*math.sin(a)))
    return Polygon(pts)
def a_mano(g, amp=0.7, sem=1, onda=9):
    # desplaza el contorno hacia fuera/dentro con ruido suave a lo largo del perímetro
    rnd = random.Random(sem)
    def anillo(coords):
        P = list(coords)[:-1]; n = len(P); L = [0]
        for i in range(1, n): L.append(L[-1] + math.dist(P[i-1], P[i]))
        tot = L[-1] + math.dist(P[-1], P[0]); K = max(3, int(tot / onda)); v = [rnd.uniform(-1, 1) for _ in range(K)]
        out = []
        for i in range(n):
            u = L[i] / tot * K; k0 = int(u) % K; f = u - int(u); f = f*f*(3-2*f); dz = amp * (v[k0] * (1-f) + v[(k0+1) % K] * f)
            a, b = P[i-1], P[(i+1) % n]; dx, dy = b[0]-a[0], b[1]-a[1]; m = math.hypot(dx, dy) or 1
            out.append((P[i][0] + dy/m*dz, P[i][1] - dx/m*dz))
        return out
    polys = g.geoms if isinstance(g, MultiPolygon) else [g]
    return unary_union([Polygon(anillo(p.exterior.coords), [anillo(h.coords) for h in p.interiors]).buffer(0) for p in polys])
def ruta(g):
    g = g.simplify(0.04)
    polys = g.geoms if isinstance(g, MultiPolygon) else [g]
    out = []
    for p in polys:
        for r in [p.exterior] + list(p.interiors):
            c = list(r.coords); out.append('M' + ' L'.join(f'{x:.2f} {y:.2f}' for x, y in c[:-1]) + ' Z')
    return ' '.join(out)
def barra(p0, p1, w): return pincel([p0, p1], lambda t: w)
M = {}
# 01 · VISCOSA
cl = catmull([(24, 22), (32, 44), (42, 74), (52, 50), (60, 34)], 30)
M['vi'] = dict(dir=0, nombre='vi', idea='La v y el punto de la i, el corazón de savvia. El brazo de la v se espesa en gota; encima, la savia en Coral, a punto de caer.',
  capas=[(T, unary_union([pincel(cl, lambda t: 14 - 6 * suave(t, 0.25, 0.5) + 6 * suave(t, 0.75, 1)), disco(24, 21, 8.5)])), (S, gota(70, 22, 6.5, -125, 1.7))])
cl = catmull([(36, 14), (40, 26), (48, 40), (56, 52), (58, 62)], 30)
M['cuello'] = dict(dir=0, nombre='El cuello', idea='Un hilo de savia que se adelgaza hasta soltar la gota: el instante que dibuja la carga de la web, convertido en signo.',
  capas=[(T, unary_union([pincel(cl, lambda t: 11 - 8.5 * suave(t, 0.35, 1)), disco(36, 13, 7.5)])), (S, gota(60, 74, 9, -115, 1.65))])
# 02 · GESTO
cl = catmull([(14, 44), (22, 60), (30, 76), (38, 56), (46, 30), (52, 20), (57, 28), (56, 50), (60, 72), (70, 54), (82, 32)], 16)
M['firma'] = dict(dir=1, nombre='Firma vvi', idea='Las dos v de savvia de un solo golpe de pincel y la gota de la i: la firma del estudio, rápida y con peso.',
  capas=[(T, pincel(cl, lambda t: 2.5 + 14 * math.sin(math.pi * min(1, t * 1.06)) ** 0.85)), (S, gota(86, 18, 6, -130, 1.75))])
cl = catmull([(20, 64), (30, 46), (40, 40), (45, 50), (40, 64), (52, 70), (62, 50), (70, 30), (78, 22)], 16)
M['yema'] = dict(dir=1, nombre='Yema', idea='Un gesto que se enrosca y sube, como la savia por el tronco; arriba, la yema que está por abrirse.',
  capas=[(T, pincel(cl, lambda t: 3 + 12 * suave(t, 0, 0.42) - 9 * suave(t, 0.6, 1))), (S, gota(81, 15, 5.5, -135, 1.6))])
# 03 · RUNA
M['arbol'] = dict(dir=2, nombre='El árbol de letras', idea='La i es el tronco y las dos v, las ramas que se abren; la gota de la i, la yema. savvia escrita como un árbol.',
  capas=[(T, a_mano(unary_union([barra((48, 32), (48, 84), 8.5), barra((26, 36), (48, 58), 8.5), barra((70, 36), (48, 58), 8.5), barra((32, 56), (48, 72), 8.5), barra((64, 56), (48, 72), 8.5)]), 0.75, 3)),
         (S, a_mano(gota(48, 18, 6, -90, 1.5), 0.4, 4))])
M['copa'] = dict(dir=2, nombre='Copa y raíz', idea='Arriba las v se abren (la copa) y abajo se cierran (las raíces). La savia, en el centro, une las dos mitades.',
  capas=[(T, a_mano(unary_union([barra((48, 16), (48, 80), 8.5), barra((28, 24), (48, 42), 8.5), barra((68, 24), (48, 42), 8.5), barra((30, 82), (48, 64), 8.5), barra((66, 82), (48, 64), 8.5)]), 0.75, 5)),
         (S, a_mano(disco(48, 53, 5.6), 0.4, 6))])
out = {k: dict(dir=v['dir'], nombre=v['nombre'], idea=v['idea'], inner=''.join(f'<path fill-rule="evenodd" d="{ruta(g)}" fill="{c}"/>' for c, g in v['capas'])) for k, v in M.items()}
json.dump(out, open('figma2.json', 'w'), ensure_ascii=False)
import glob, os
for f in glob.glob('X-*.svg'): os.remove(f)
for k, v in out.items(): open(f'X-{k}.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="384" height="384"><rect width="96" height="96" fill="{F}"/>{v["inner"]}</svg>')
print(os.path.getsize('figma2.json'))
