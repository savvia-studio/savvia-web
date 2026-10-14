# Geometría para la exploración 2: trazos de grosor variable, remates en gota y bordes «cortados a mano»
import math, random
def catmull(pts, n=24, cerrado=False):
    out = []; P = pts[:]
    if not cerrado: P = [P[0]] + P + [P[-1]]
    for i in range(1, len(P) - 2):
        p0, p1, p2, p3 = P[i-1], P[i], P[i+1], P[i+2]
        for k in range(n):
            t = k / n; t2, t3 = t*t, t*t*t
            out.append(tuple(0.5 * ((2*p1[j]) + (-p0[j] + p2[j]) * t + (2*p0[j] - 5*p1[j] + 4*p2[j] - p3[j]) * t2 + (-p0[j] + 3*p1[j] - 3*p2[j] + p3[j]) * t3) for j in (0, 1)))
    out.append(P[-2]); return out
def trazo(cl, wf, cap=True, ruido=0.0, semilla=1):
    # contorno de un trazo de centro `cl` (puntos densos) y grosor wf(t) (t de 0 a 1); remates redondos
    rnd = random.Random(semilla)
    n = len(cl); L = [0]
    for i in range(1, n): L.append(L[-1] + math.dist(cl[i-1], cl[i]))
    izq, der = [], []
    def lento(k):  # ruido de baja frecuencia: aleatorio suavizado (borde «cortado a mano», no deshilachado)
        v = [rnd.uniform(-1, 1) for _ in range(n + 2 * k)]
        return [ruido * 2.2 * sum(v[i:i + 2 * k + 1]) / (2 * k + 1) for i in range(n)]
    J1, J2 = lento(5), lento(5)
    for i in range(n):
        a = cl[max(0, i-1)]; b = cl[min(n-1, i+1)]
        dx, dy = b[0]-a[0], b[1]-a[1]; m = math.hypot(dx, dy) or 1; nx, ny = -dy/m, dx/m
        w = wf(L[i] / L[-1]) / 2
        j1 = J1[i]; j2 = J2[i]
        izq.append((cl[i][0] + nx*(w+j1), cl[i][1] + ny*(w+j1))); der.append((cl[i][0] - nx*(w+j2), cl[i][1] - ny*(w+j2)))
    def tapa(c, d, w, sgn):
        # media circunferencia de remate en c, mirando hacia d
        ang = math.atan2(d[1], d[0]); pts = []
        for k in range(1, 12):
            a = ang + sgn * (math.pi/2 - math.pi * k / 12)
            r = w + rnd.uniform(-ruido, ruido) * 0.4
            pts.append((c[0] + r*math.cos(a), c[1] + r*math.sin(a)))
        return pts
    pol = izq[:]
    if cap:
        d = (cl[-1][0]-cl[-2][0], cl[-1][1]-cl[-2][1]); pol += tapa(cl[-1], d, wf(1)/2, 1)
    pol += der[::-1]
    if cap:
        d = (cl[0][0]-cl[1][0], cl[0][1]-cl[1][1]); pol += tapa(cl[0], d, wf(0)/2, 1)
    return pol
def circulo(cx, cy, r, n=40, ruido=0.0, semilla=2, punta=None):
    rnd = random.Random(semilla); fase = rnd.uniform(0, 6.28)
    pts = []
    for k in range(n):
        a = 2*math.pi*k/n; rr = r + ruido * 0.8 * math.sin(3*a + fase)
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return pts
def gota(cx, cy, r, ang=-90, alargue=1.9, n=48):
    # gota: círculo de radio r estirado en punta hacia `ang` (grados)
    a0 = math.radians(ang); pts = []
    for k in range(n):
        a = 2*math.pi*k/n; c = math.cos(a - a0)
        rr = r * (1 + (alargue - 1) * max(0, c) ** 6)
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return pts
def d(pol): return 'M' + ' L'.join(f'{x:.2f} {y:.2f}' for x, y in pol) + ' Z'
def suave(t, a, b): t = min(1, max(0, (t - a) / (b - a))); return t*t*(3-2*t)
