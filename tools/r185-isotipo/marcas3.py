# RONDA 185 (3.ª) · exploración 2, a partir de las referencias de Andoni (runa de letras · N líquida con remates en gota · gesto de pincel):
# formas que salen de las letras de savvia y de cómo se comporta la savia (viscosa, en gotas, que sube y se reparte)
import math, json
from geo import *
T = '#F5F5F7'; S = '#FF616B'; F = '#3B231B'
M = {}
# ── A · VISCOSA (ref. 2): la savia es espesa: gotas unidas por un cuello que adelgaza
def cuello(t, w0, w1, wm):  # grosor: w0 al empezar, wm en medio (el cuello), w1 al final
    return w0 + (wm - w0) * suave(t, 0, 0.5) + (w1 - wm) * suave(t, 0.5, 1)
clA1 = catmull([(70, 26), (60, 18), (44, 18), (34, 26), (38, 38), (52, 48), (60, 58), (58, 70), (44, 78), (28, 72)], 14)
M['A1'] = dict(dir='Viscosa', nombre='El cuello', idea='La s es savia espesa: gruesa en las curvas y fina en el lomo, como una gota que se estira antes de soltarse.',
  capas=[('fill', T, d(trazo(clA1, lambda t: 13 - 7 * math.exp(-((t - 0.5) / 0.16) ** 2)))), ('fill', T, d(circulo(71, 27, 9))), ('fill', T, d(circulo(27, 71, 9)))])
clA2 = catmull([(20, 26), (27, 46), (35, 68), (43, 50), (48, 34), (53, 50), (61, 68), (69, 46), (76, 26)], 18)
_A2 = dict(dir='Viscosa', nombre='vv de savia', idea='La doble v de savvia en un solo trazo espeso: arriba se recoge en gotas, abajo adelgaza como un hilo de savia.',
  capas=[('fill', T, d(trazo(clA2, lambda t: 12 - 6.5 * (abs(math.sin(math.pi * 2 * t)))))), ('fill', T, d(circulo(20, 25, 8))), ('fill', T, d(circulo(48, 33, 7.2))), ('fill', T, d(circulo(76, 25, 8)))])
clA3 = catmull([(24, 22), (32, 44), (42, 74), (52, 50), (60, 34)], 30)
M['A3'] = dict(dir='Viscosa', nombre='vi', idea='La v y el punto de la i, el corazón de savvia: el brazo de la v se espesa en gota y, encima, la savia en Coral.',
  capas=[('fill', T, d(trazo(clA3, lambda t: 14 - 6 * suave(t, 0.25, 0.5) + 6 * suave(t, 0.75, 1)))), ('fill', T, d(circulo(24, 21, 8.5))), ('fill', S, d(gota(70, 22, 6.5, ang=-125, alargue=1.7)))])
# ── B · GESTO (ref. 3): savvia escrita de un gesto, con la gota del punto de la i
clB1 = catmull([(14, 44), (22, 60), (30, 76), (38, 56), (46, 30), (52, 20), (57, 28), (56, 50), (60, 72), (70, 54), (84, 32)], 14)
M['B1'] = dict(dir='Gesto', nombre='Firma vvi', idea='Las dos v de savvia de un solo golpe de pincel y la gota de la i: la firma del estudio, rápida y con peso.',
  capas=[('fill', T, d(trazo(clB1, lambda t: 3 + 15 * math.sin(math.pi * min(1, t * 1.08)) ** 0.9))), ('fill', S, d(gota(86, 18, 6, ang=-130, alargue=1.75)))])
clB2 = catmull([(64, 28), (54, 20), (38, 22), (33, 34), (44, 44), (58, 52), (62, 64), (52, 76), (34, 74), (28, 66)], 16)
_B2 = dict(dir='Gesto', nombre='s de pincel', idea='La s de savvia escrita deprisa, gruesa en el lomo y fina en las puntas, como una pincelada de savia.',
  capas=[('fill', T, d(trazo(clB2, lambda t: 4 + 12 * math.sin(math.pi * min(1, t * 1.05)) ** 1.4)))])
clB3 = catmull([(20, 62), (30, 46), (40, 40), (44, 50), (40, 64), (52, 70), (62, 50), (70, 30), (78, 22)], 16)
M['B3'] = dict(dir='Gesto', nombre='Hilo que sube', idea='Un único gesto que se enrosca y sube, como la savia por el tronco; el punto de la i, arriba, es la yema.',
  capas=[('fill', T, d(trazo(clB3, lambda t: 6 + 9 * suave(t, 0, 0.45) - 6 * suave(t, 0.6, 1)))), ('fill', S, d(circulo(80, 14, 5)))])
# ── C · RUNA (ref. 1): un signo hecho con las letras de savvia (la i es el tronco, las v son las ramas), cortado a mano
R = 0.7
def barra(p0, p1, w, sem): return d(trazo(catmull([p0, ((p0[0]+p1[0])/2, (p0[1]+p1[1])/2), p1], 8), lambda t: w, ruido=R, semilla=sem))
M['C1'] = dict(dir='Runa', nombre='El árbol de letras', idea='La i es el tronco y las dos v, las ramas que se abren hacia arriba; la gota de la i, la yema. savvia escrita como un árbol.',
  capas=[('fill', T, barra((48, 30), (48, 84), 8, 1)), ('fill', T, barra((26, 34), (48, 56), 8, 2)), ('fill', T, barra((70, 34), (48, 56), 8, 3)),
         ('fill', T, barra((32, 54), (48, 70), 8, 4)), ('fill', T, barra((64, 54), (48, 70), 8, 5)), ('fill', S, d(circulo(48, 18, 6, ruido=R)))])
M['C2'] = dict(dir='Runa', nombre='Copa y raíz', idea='Arriba las v se abren (la copa), abajo se cierran (las raíces): la savia une las dos mitades por el tronco.',
  capas=[('fill', T, barra((48, 16), (48, 80), 8, 6)), ('fill', T, barra((28, 24), (48, 40), 8, 7)), ('fill', T, barra((68, 24), (48, 40), 8, 8)),
         ('fill', T, barra((30, 82), (48, 66), 8, 9)), ('fill', T, barra((66, 82), (48, 66), 8, 10)), ('fill', S, d(circulo(48, 52, 5.2, ruido=R)))])
_C3 = dict(dir='Runa', nombre='vv enfrentadas', idea='Dos v que se miran forman una hoja; la savia la cruza de abajo arriba. Tú y nosotros, una a cada lado.',
  capas=[('fill', T, d(trazo(catmull([(48, 16), (30, 34), (24, 50), (30, 66), (48, 84)], 14), lambda t: 8, ruido=R, semilla=11))),
         ('fill', T, d(trazo(catmull([(48, 16), (66, 34), (72, 50), (66, 66), (48, 84)], 14), lambda t: 8, ruido=R, semilla=12))),
         ('fill', S, barra((48, 30), (48, 72), 6, 13))])
def svg(m, fondo=F, tam=96, tinta=T):
    partes = ''.join(f'<path d="{c[2]}" fill="{tinta if c[1] == T else c[1]}"/>' for c in m['capas'])
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="{tam}" height="{tam}"><rect width="96" height="96" fill="{fondo}"/>' + partes + '</svg>'
import os, glob
for f in glob.glob('X-*.svg'): os.remove(f)
for k, v in M.items(): open(f'X-{k}.svg', 'w').write(svg(v, tam=384))
json.dump({k: dict(dir=v['dir'], nombre=v['nombre'], idea=v['idea'], inner=''.join(f'<path d="{c[2]}" fill="{c[1]}"/>' for c in v['capas'])) for k, v in M.items()}, open('figma2.json', 'w'), ensure_ascii=False)
print(list(M), os.path.getsize('figma2.json'))
