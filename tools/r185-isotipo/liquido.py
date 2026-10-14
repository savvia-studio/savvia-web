# RONDA 185 (5.ª) · formas definidas y fluidas: campos de distancia (SDF) con uniones suaves (smooth-min), rasterizados a 1600 px
# y vectorizados con potrace a curvas Bézier. Así se dibujan las formas líquidas de las referencias (remates en gota, cuellos que fluyen).
import math, json, numpy as np, potrace
N = 1600; U = N / 96
yy, xx = np.mgrid[0:N, 0:N].astype(np.float32) / U
def catmull(pts, n=40):
    P = [pts[0]] + pts + [pts[-1]]; out = []
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = map(np.array, (P[i-1], P[i], P[i+1], P[i+2]))
        for k in range(n):
            t = k / n
            out.append(0.5 * ((2*p1) + (-p0 + p2)*t + (2*p0 - 5*p1 + 4*p2 - p3)*t*t + (-p0 + 3*p1 - 3*p2 + p3)*t**3))
    out.append(np.array(P[-2])); return out
def trazo(pts, rf, n=40):
    cl = catmull(pts, n); L = [0.0]
    for i in range(1, len(cl)): L.append(L[-1] + float(np.linalg.norm(cl[i] - cl[i-1])))
    d = np.full((N, N), 1e3, np.float32)
    for i in range(len(cl) - 1):
        a, b = cl[i], cl[i+1]; ab = b - a; l2 = float(ab @ ab) or 1e-6
        t = np.clip(((xx - a[0]) * ab[0] + (yy - a[1]) * ab[1]) / l2, 0, 1)
        px, py = a[0] + t * ab[0], a[1] + t * ab[1]
        r = rf((L[i] + t * (L[i+1] - L[i])) / L[-1])
        d = np.minimum(d, np.hypot(xx - px, yy - py) - r)
    return d
def disco(cx, cy, r): return np.hypot(xx - cx, yy - cy) - r
def gota(cx, cy, r, ang=-90, punta=1.9):
    a = math.radians(ang); ux, uy = math.cos(a), math.sin(a)
    tip = (cx + ux * r * punta, cy + uy * r * punta)
    return smin(disco(cx, cy, r), trazo([(cx, cy), tip], lambda t: r * (1 - t) + 0.35 * t, n=8), r * 0.9)
def smin(a, b, k):
    h = np.clip(0.5 + 0.5 * (b - a) / k, 0, 1); return b * (1 - h) + a * h - k * h * (1 - h)
def ruta(d):
    bm = potrace.Bitmap(d >= 0)  # potracer toma False como tinta
    pl = bm.trace(turdsize=20, alphamax=1.1, opticurve=True, opttolerance=0.25)
    s = 1 / U; out = []
    for c in pl:
        st = c.start_point; seg = [f'M{st.x*s:.2f} {st.y*s:.2f}']
        for g in c.segments:
            if g.is_corner: seg.append(f'L{g.c.x*s:.2f} {g.c.y*s:.2f} L{g.end_point.x*s:.2f} {g.end_point.y*s:.2f}')
            else: seg.append(f'C{g.c1.x*s:.2f} {g.c1.y*s:.2f} {g.c2.x*s:.2f} {g.c2.y*s:.2f} {g.end_point.x*s:.2f} {g.end_point.y*s:.2f}')
        out.append(' '.join(seg) + ' Z')
    return ' '.join(out)
T = '#F5F5F7'; S = '#FF616B'
M = {}
def ss(t, a, b): t = min(1, max(0, (t - a) / (b - a))); return t*t*(3-2*t)
# 1 · vi líquida (como la N): gota arriba a la izquierda, la v que adelgaza y el brazo que se recoge en gota; el punto de la i, aparte
v = trazo([(25, 25), (31, 42), (38, 60), (44, 72), (50, 58), (57, 42), (63, 33)], lambda t: 5.2 - 2.4 * np.sin(np.pi * t) ** 2)
v = smin(v, disco(24, 23, 9.5), 6); v = smin(v, disco(64, 31, 7.5), 6)
M['vi-liquida'] = dict(nombre='vi', idea='La v de savvia en savia espesa: arriba se recoge en gotas y, al bajar, adelgaza como un hilo. El punto de la i, aparte, en Coral.',
  capas=[(T, v), (S, disco(76, 18, 6.2))])
# 3 · vv de pincel (como el «.v2»): un golpe grueso que sale fino y acaba en punta; la gota de la i, aparte
cl = [(14, 40), (22, 56), (30, 74), (37, 58), (44, 36), (51, 22), (58, 30), (57, 52), (61, 72), (70, 58), (85, 34)]
vv = trazo(cl, lambda t: 5.2 + 3.6 * np.sin(np.pi * t) - 4.2 * np.clip((t - 0.78) / 0.22, 0, 1) ** 1.5, n=30)
M['vv-pincel'] = dict(nombre='vv de pincel', idea='Las dos v de savvia de un solo golpe, gruesas donde carga el pincel y finas en las puntas; la gota de la i cierra la firma.',
  capas=[(T, vv), (S, gota(87, 19, 5, -125, 1.7))])
# 4 · vi con la gota a punto de soltarse: el brazo de la v se alarga en un cuello finísimo que sostiene la gota de la i
v2 = trazo([(25, 25), (31, 42), (38, 60), (44, 72), (50, 58), (57, 42), (63, 33)], lambda t: 5.2 - 2.4 * np.sin(np.pi * t) ** 2)
v2 = smin(v2, disco(24, 23, 9.5), 6); v2 = smin(v2, disco(64, 31, 7.5), 6)
cuello = trazo([(64, 31), (70.5, 23.5), (77, 16)], lambda t: 2.4 - 1.75 * np.sin(np.pi * t) ** 0.6, n=20)
M['vi-cuello'] = dict(nombre='vi, a punto de caer', idea='La misma vi, pero la gota de la i aún cuelga del brazo de la v por un hilo de savia: el instante justo antes de soltarse.',
  capas=[(T, smin(v2, cuello, 1.0)), (S, disco(77, 16, 6.2))])
# 5 · vvi líquida: las dos v de savvia en un solo trazo espeso, con las tres cimas recogidas en gota
w = trazo([(14, 26), (19, 42), (25, 58), (30, 70), (36, 56), (42, 40), (47, 30), (52, 40), (58, 56), (64, 70), (70, 56), (75, 42), (79, 32)],
          lambda t: 4.4 - 2.3 * np.sin(np.pi * 4 * t) ** 2 * 0 - 2.0 * np.abs(np.sin(np.pi * 2 * t)), n=26)
w = smin(w, disco(14, 24, 7.6), 5); w = smin(w, disco(47, 27, 6.4), 5); w = smin(w, disco(79, 29, 6.4), 5)
M['vvi-liquida'] = dict(nombre='vvi', idea='Las dos v de savvia en un solo trazo de savia espesa: las cimas se recogen en gota, los fondos adelgazan. El punto de la i, en Coral.',
  capas=[(T, w), (S, disco(88, 16, 5.2))])
out = {k: dict(nombre=v['nombre'], idea=v['idea'], inner=''.join(f'<path fill-rule="evenodd" d="{ruta(g)}" fill="{col}"/>' for col, g in v['capas'])) for k, v in M.items()}
json.dump(out, open('figma3.json', 'w'), ensure_ascii=False)
for k, v in out.items(): open(f'L-{k}.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="384" height="384"><rect width="96" height="96" fill="#3B231B"/>{v["inner"]}</svg>')
import os; print({k: len(v['inner']) for k, v in out.items()})
