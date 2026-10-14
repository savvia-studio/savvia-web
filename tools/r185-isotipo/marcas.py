# RONDA 185 · exploración de isotipos para savvia: cada marca, un SVG de 96×96 generado desde su geometría
import math, json
C = 48
def P(x, y): return f"{x:.2f} {y:.2f}"
def hoja(bx, by, ang, largo, ancho):
    # una hoja (vesica) desde la base (bx,by) hacia el ángulo `ang` (grados, 0 = derecha, -90 = arriba)
    a = math.radians(ang); ux, uy = math.cos(a), math.sin(a); px, py = -uy, ux
    tx, ty = bx + ux * largo, by + uy * largo
    k1, k2 = 0.28, 0.72
    c1 = (bx + ux * largo * k1 + px * ancho, by + uy * largo * k1 + py * ancho)
    c2 = (bx + ux * largo * k2 + px * ancho, by + uy * largo * k2 + py * ancho)
    c3 = (bx + ux * largo * k2 - px * ancho, by + uy * largo * k2 - py * ancho)
    c4 = (bx + ux * largo * k1 - px * ancho, by + uy * largo * k1 - py * ancho)
    return f"M{P(bx,by)} C{P(*c1)} {P(*c2)} {P(tx,ty)} C{P(*c3)} {P(*c4)} {P(bx,by)} Z"
def gota(cx, cy, r, punta):
    # gota con la punta arriba: círculo de centro (cx,cy) y radio r, tangentes hasta (cx, punta)
    d = cy - punta; t = math.acos(r / d); 
    ax, ay = cx - r * math.sin(t), cy - r * math.cos(t)
    bx_, by_ = cx + r * math.sin(t), cy - r * math.cos(t)
    return f"M{P(cx,punta)} L{P(bx_,by_)} A{r} {r} 0 1 1 {P(ax,ay)} Z"
def arco(cx, cy, r, a0, a1):
    # arco de a0 a a1 (grados, sentido de las agujas del reloj en pantalla)
    x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
    x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
    grande = 1 if (a1 - a0) % 360 > 180 else 0
    return f"M{P(x0,y0)} A{r} {r} 0 {grande} 1 {P(x1,y1)}"

M = {}
T = '#F5F5F7'; S = '#FF616B'
# ── A · BROTE: las «vv» de savvia son dos hojas que nacen juntas (tú + savvia)
M['A1-brote'] = dict(dir='Brote', nombre='Dos cotiledones', idea='La doble v de savvia es una semilla que germina: dos hojas que nacen del mismo punto.',
  capas=[('fill', T, hoja(48, 58, -128, 34, 9.5)), ('fill', T, hoja(48, 58, -52, 34, 9.5)), ('stroke', T, 'M48 58 L48 82', 4)])
M['A2-brote-gota'] = dict(dir='Brote', nombre='Semilla y brote', idea='Una gota de savia (la semilla) de la que salen las dos hojas: lo que alimenta y lo que crece.',
  capas=[('fill', S, gota(48, 68, 12, 47)), ('fill', T, hoja(48, 45, -132, 27, 7.5)), ('fill', T, hoja(48, 45, -48, 27, 7.5))])
M['A3-vv'] = dict(dir='Brote', nombre='vv de trazo', idea='Las dos v dibujadas con un trazo continuo: los extremos se abren en hoja.',
  capas=[('stroke', T, 'M20 30 Q27 52 34 68 Q41 52 48 36 Q55 52 62 68 Q69 52 76 30', 5.5), ('fill', T, hoja(76, 31, -60, 15, 4.5)), ('fill', T, hoja(20, 31, -120, 15, 4.5))])
# ── B · ANILLOS: los anillos del tronco = el criterio que se acumula; la savia los cruza
def anillos_corte(n=4, r0=9, paso=7.5, ang=-55, hueco=2.6, exc=(0, 0)):
    out = []
    for i in range(n):
        r = r0 + i * paso; cx, cy = C + exc[0] * i, C + exc[1] * i
        g = math.degrees(math.asin(min(0.99, hueco / r)))
        out.append(('stroke', T, arco(cx, cy, r, ang + g, ang - g + 360), 3.6))
    return out
M['B1-anillos'] = dict(dir='Anillos', nombre='El corte del tronco', idea='Cuatro anillos (lo que hemos ido creciendo) y la savia que los atraviesa hasta el centro.',
  capas=anillos_corte() + [('stroke', S, 'M48 48 L' + P(48 + 36 * math.cos(math.radians(-55)), 48 + 36 * math.sin(math.radians(-55))), 3.6)])
M['B2-anillos-exc'] = dict(dir='Anillos', nombre='Anillos excéntricos', idea='Como en un roble de verdad, los anillos crecen más hacia un lado: el centro, la savia.',
  capas=[('stroke', T, f"M{P(48+ (2*i)-r,50 - (1.6*i))} a{r} {r} 0 1 0 {2*r} 0 a{r} {r} 0 1 0 {-2*r} 0", 3.4) for i, r in enumerate([8, 15, 22, 29])] + [('fill', S, 'M45 50 a3.4 3.4 0 1 0 6.8 0 a3.4 3.4 0 1 0 -6.8 0')])
def ese(R=14, d=6, cy1=30, w=3.6, a0=-25, a1=155, col=T):
    cy2 = cy1 + 2 * R; out = []
    for k in (-1, 0, 1):
        rt, rb = R + k * d, R - k * d
        # arriba: de a0 (derecha) por encima hasta abajo (90° = sur) · abajo: desde arriba (270°) por la derecha hasta a1
        out.append(('stroke', col, arco(C, cy1, rt, 90, 360 + a0).replace('A', 'A', 1), w))
        out.append(('stroke', col, arco(C, cy2, rb, 270, 270 + 180 + (a1 - 90)), w))
    return out
M['B3-ese'] = dict(dir='Anillos', nombre='La s de anillos', idea='Tres anillos que corren en paralelo y dibujan la s de savvia: la savia que sube por el tronco.',
  capas=ese())
# ── C · SAVIA: la gota
M['C1-gota-s'] = dict(dir='Savia', nombre='Gota con s', idea='Una gota de savia con la s calada por dentro: la marca entera en una sola forma.',
  capas=[('fill', S, gota(48, 58, 22, 12)), ('knock', '#3B231B', 'M56 44 C56 37 40 37 40 44 C40 51 56 51 56 58 C56 66 40 66 40 59', 4.6)])
M['C2-gota-nervio'] = dict(dir='Savia', nombre='Gota y nervio', idea='La gota se abre arriba en el nervio de una hoja: la savia que sube y se reparte.',
  capas=[('fill', T, gota(48, 60, 20, 16)), ('knock', '#3B231B', 'M48 74 L48 26 M48 50 L58 40 M48 60 L38 50 M48 40 L40 33', 3)])
M['R0-actual'] = dict(dir='Referencia', nombre='El anillo-gota de hoy', idea='El isotipo actual (el de Andoni): para medir lo nuevo contra él.', capas=[])

def svg(m, fondo='#3B231B', tam=96):
    partes = []
    for c in m['capas']:
        t, col, d = c[0], c[1], c[2]
        if t == 'fill': partes.append(f'<path d="{d}" fill="{col}"/>')
        elif t == 'stroke': partes.append(f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{c[3]}" stroke-linecap="round" stroke-linejoin="round"/>')
        elif t == 'knock': partes.append(f'<path d="{d}" fill="none" stroke="{fondo}" stroke-width="{c[3]}" stroke-linecap="round" stroke-linejoin="round" data-knock="1"/>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="{tam}" height="{tam}"><rect width="96" height="96" fill="{fondo}"/>' + ''.join(partes) + '</svg>'

json.dump({k: dict(v, svg=svg(v)) for k, v in M.items()}, open('marcas.json', 'w'), ensure_ascii=False, indent=1)
for k, v in M.items():
    if v['capas']: open(f'{k}.svg', 'w').write(svg(v, tam=384))
print(list(M))
