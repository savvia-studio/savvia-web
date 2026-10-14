# RONDA 185 (2.ª) · tras la autocrítica: fuera lo genérico (brote de clip-art, diana, «w», gotas con dibujo dentro). Tres direcciones con dueño.
import math, json, re
exec(open('marcas.py').read().split("M = {}")[0])  # funciones: hoja, gota, arco, P
T = '#F5F5F7'; S = '#FF616B'; F = '#3B231B'
s_d = open('s-family.txt').read()
def s_fam(h=58, cx=48, top=17, col=T):
    k = h / 482; w = 341 * k
    return ('raw', f'<path transform="translate({cx - w/2 + 3*k:.2f} {top + 472*k:.2f}) scale({k:.4f})" fill="{col}" d="{s_d}"/>')
def gota_abajo(cx, cy, r, punta, col):
    # gota con la punta ABAJO (la bellota)
    d = punta - cy; t = math.acos(r / d)
    ax, ay = cx - r * math.sin(t), cy + r * math.cos(t)
    bx, by = cx + r * math.sin(t), cy + r * math.cos(t)
    return ('fill', col, f"M{P(cx,punta)} L{P(ax,ay)} A{r} {r} 0 1 1 {P(bx,by)} Z")
def capucha(cx, top, ancho, alto, col, filas=2):
    # la cúpula de la bellota: media elipse arriba, borde inferior festoneado (escamas)
    x0, x1 = cx - ancho/2, cx + ancho/2; yb = top + alto
    n = 6; paso = ancho / n; d = f"M{P(x0,yb)} A{ancho/2} {alto} 0 0 1 {P(x1,yb)}"
    for i in range(n):  # festón: arcos pequeños de derecha a izquierda
        xa = x1 - i*paso; xb = xa - paso
        d += f" A{paso/2} {paso/2*0.9} 0 0 1 {P(xb,yb)}"
    return ('fill', col, d + ' Z')
M = {}
# ── 1 · LA S QUE GOTEA (tipográfica): la s de nuestra palabra, de la que cae una gota de savia
M['S1-s-gota'] = dict(dir='La s de savia', nombre='La s que gotea', idea='La s de nuestro logotipo (Family) y, de su remate, una gota de savia a punto de caer: la marca y la carga de la web en una sola imagen.',
  capas=[s_fam(54, 48, 10), ('fill', S, gota(31.5, 79.5, 5.6, 66.5))])
M['S2-s-disco'] = dict(dir='La s de savia', nombre='La s en su anillo', idea='La s dentro de un disco de savia: el círculo de nuestra etapa como treseiscero, ahora lleno.',
  capas=[('fill', S, 'M48 10 a38 38 0 1 0 0.01 0 Z'), s_fam(46, 48, 25, F)])
M['S3-s-sola'] = dict(dir='La s de savia', nombre='La s, sin más', idea='Para medir: solo la s de Family. Lo tipográfico es lo que más une isotipo y logotipo.',
  capas=[s_fam(60, 48, 18)])
# ── 2 · BELLOTA: la gota de savia, al revés, es la semilla del roble
NUEZ = 'M34 50 C33.5 69 39.5 84 48 86.5 C56.5 84 62.5 69 62 50 Z'
CUP = 'M27 53 C27 39 37 30 48 30 C59 30 69 39 69 53 C62 56.5 34 56.5 27 53 Z'
escamas = [('fill', F, f'M{x-1.5:.1f} {y:.1f} l1.5 -1.5 l1.5 1.5 l-1.5 1.5 Z') for y, xs in ((40, (37, 43, 48, 53, 59)), (46.5, (33, 40, 48, 56, 63))) for x in xs]
M['B1-bellota'] = dict(dir='Bellota', nombre='Gota al revés', idea='Una bellota es una gota boca abajo con su cúpula: la savia que cae se hace semilla. De ahí sale el roble de la web.',
  capas=[('fill', S, NUEZ), ('fill', T, CUP)] + escamas + [('stroke', T, 'M48 31 C48 26 49.5 22.5 52 20', 3.6)])
M['B2-bellota-linea'] = dict(dir='Bellota', nombre='Bellota de un trazo', idea='La misma bellota dibujada a línea, con el trazo del isotipo de hoy: la cúpula en claro y la gota en savia.',
  capas=[('stroke', S, 'M35 56 C35 71 40.5 83.5 48 85.5 C55.5 83.5 61 71 61 56', 3.8), ('stroke', T, CUP, 3.8), ('stroke', T, 'M48 31 C48 26 49.5 22.5 52 20', 3.8)])
# ── 3 · ANILLOS: la s hecha de anillos de crecimiento; el de dentro, la savia
def ese(R=14, d=6, cy1=30, w=3.8, a0=-25, a1=155, cols=(T, S, T)):
    cy2 = cy1 + 2 * R; out = []
    for k, col in zip((-1, 0, 1), cols):
        rt, rb = R + k * d, R - k * d
        out.append(('stroke', col, arco(48, cy1, rt, 90, 360 + a0), w))
        out.append(('stroke', col, arco(48, cy2, rb, 270, 270 + 180 + (a1 - 90)), w))
    return out
M['R1-ese-anillos'] = dict(dir='Anillos', nombre='La s de anillos', idea='Tres anillos de crecimiento que corren juntos y dibujan la s; el del centro es la savia.', capas=ese())
M['R2-ese-dos'] = dict(dir='Anillos', nombre='Tú + savvia', idea='Dos líneas que suben juntas y forman la s: la tuya y la nuestra.', capas=ese(R=13, d=4.2, cy1=32, w=5, cols=(T, S, S))[0:2] + ese(R=13, d=4.2, cy1=32, w=5, cols=(T, T, S))[4:6])

def svg(m, fondo=F, tam=96):
    partes = []
    for c in m['capas']:
        t = c[0]
        if t == 'raw': partes.append(c[1])
        elif t == 'fill': partes.append(f'<path d="{c[2]}" fill="{c[1]}"/>')
        elif t == 'stroke': partes.append(f'<path d="{c[2]}" fill="none" stroke="{c[1]}" stroke-width="{c[3]}" stroke-linecap="round" stroke-linejoin="round"/>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="{tam}" height="{tam}"><rect width="96" height="96" fill="{fondo}"/>' + ''.join(partes) + '</svg>'
import os
for f in os.listdir('.'):
    if f.endswith('.svg'): os.remove(f)
json.dump({k: dict(dir=v['dir'], nombre=v['nombre'], idea=v['idea'], svg=svg(v)) for k, v in M.items()}, open('marcas2.json', 'w'), ensure_ascii=False, indent=1)
for k, v in M.items(): open(f'{k}.svg', 'w').write(svg(v, tam=384))
print(list(M))
