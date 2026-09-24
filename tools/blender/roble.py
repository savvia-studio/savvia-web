# Savvia · ronda 11 · EL ROBLE EN 3D (Blender 5.2, Cycles), con sus raíces, al estilo de la referencia de Andoni:
# roble pedunculado de tronco corto, grueso y retorcido con musgo, copa ancha de hoja lobulada verde oliva; debajo de la línea,
# terrón de tierra y raíces finas y fractales colgando. UNA sola toma ortográfica (árbol + raíces) con fondo transparente:
# la web la parte por la línea de suelo (z = 0) en dos imágenes. Uso:
#   Blender -b -P tools/blender/roble.py -- <salida.png> [ancho_px] [muestras]
# Imprime al final «SUELO <fracción desde arriba>» y «EJE <fracción desde la izquierda>» para colocar la línea y centrar el tronco.
import bpy, sys, math, random, os
from mathutils import Vector, Matrix
argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
OUT = os.path.abspath(argv[0] if argv else 'roble3d.png'); RESX = int(argv[1]) if len(argv) > 1 else 1500; SAMPLES = int(argv[2]) if len(argv) > 2 else 48
random.seed(7)
bpy.ops.wm.read_factory_settings(use_empty=True); scn = bpy.context.scene
R = random.uniform

WOOD = {0: [], 1: [], 2: [], 3: [], 4: []}; LEAVES = []; ROOTS = {0: [], 1: [], 2: [], 3: []}

# ---------------- ramas: tortuosas y tendidas (el roble abre la copa en horizontal) ----------------
def rama(p, d, length, r0, depth):
    steps = max(7, int(length / .06)); pts = []; d = d.normalized(); seg = length / steps
    giro = Vector((R(-1, 1), R(-1, 1), R(-.4, .4)))
    for i in range(steps + 1):
        t = i / steps; pts.append((p.copy(), r0 * (1 - .66 * t ** .85)))
        tort = .16 + .05 * depth                                   # tortuosidad: el roble quiebra la rama
        d = (d + giro * .06 + Vector((R(-1, 1), R(-1, 1), R(-.7, .7))) * tort + Vector((0, 0, .05 if depth < 2 else .015))).normalized()
        if depth >= 1 and d.z > .55: d = (d + Vector((0, 0, -.12))).normalized()   # tendidas, no verticales
        # envolvente de la copa: elipsoide ancho y bajo; lo que se sale, vuelve
        c = Vector((.12, 0, 1.95)); q = Vector(((p.x - c.x) / 2.05, (p.y - c.y) / 1.1, (p.z - c.z) / 1.12))
        if q.length > 1: d = (d + (c - p).normalized() * .35 * (q.length - 1 + .3)).normalized()
        if depth >= 1 and p.z < 1.05: d = (d + Vector((0, 0, .1))).normalized()      # nada cuelga por debajo de la copa
        p = p + d * seg
    WOOD[min(depth, 4)].append(pts)
    if depth < 4:
        n = {0: 0, 1: 7, 2: 6, 3: 5}[depth]; t0 = .18
        for k in range(n):
            t = t0 + (1 - t0) * (k + R(.15, .85)) / n; i = min(steps - 1, int(t * steps)); q, rq = pts[i]; dd = (pts[i + 1][0] - q).normalized()
            side = dd.orthogonal().normalized(); side.rotate(Matrix.Rotation(k * 2.4 + R(-.6, .6), 3, dd))
            ang = math.radians(R(34, 62)); nd = (dd * math.cos(ang) + side * math.sin(ang)).normalized()
            rama(q.copy(), nd, length * R(.5, .7) * (1 - .2 * t), rq * R(.52, .66), depth + 1)
    if depth >= 3:
        n = int(length / .0088)
        for k in range(n):
            t = .08 + .92 * (k + random.random()) / n; i = min(steps - 1, int(t * steps)); q = pts[i][0].lerp(pts[i + 1][0], t * steps - i)
            LEAVES.append((q, (pts[i + 1][0] - pts[i][0]).normalized()))

# tronco: corto, grueso, en S (se retuerce) y con el cuello muy ensanchado
tr = []; p = Vector((0, 0, -.03)); steps = 22
for i in range(steps + 1):
    t = i / steps
    x = .17 * math.sin(t * 3.3) - .05 * t; y = .06 * math.sin(t * 2.2 + 1)
    rad = .2 * (1 - .34 * t) * (1 + .75 * math.exp(-max(0, t - .18) * 11)) * (1 + .06 * math.sin(t * 19))
    tr.append((Vector((x * max(0, (t - .18) / .82), y, -.24 + t * 1.24)), rad))
WOOD[0].append(tr)
top, rtop = tr[-1]
# tres brazos principales que abren la copa, más uno bajo (como en la referencia)
for ang_h, elev, largo, rr in [(195, 38, 1.6, .62), (340, 34, 1.7, .66), (85, 62, 1.35, .56), (265, 66, 1.3, .52), (165, 14, 1.25, .42), (15, 12, 1.3, .42), (300, 48, 1.4, .5)]:
    a = math.radians(ang_h); e = math.radians(elev)
    base = top if elev > 20 else tr[int(steps * .78)][0]
    rama(base.copy(), Vector((math.cos(a) * math.cos(e), math.sin(a) * math.cos(e) * .55, math.sin(e))), largo, rtop * rr, 1)
ZMAX = max(q[0].z for q in LEAVES); XS = [q[0].x for q in LEAVES]
print('ramas', {k: len(v) for k, v in WOOD.items()}, 'hojas', len(LEAVES), 'alto', round(ZMAX, 2), 'ancho', round(min(XS), 2), round(max(XS), 2))

# ---------------- raíces: muchas, finas, fractales, colgando; abren poco y buscan la vertical ----------------
def raiz(p, d, length, r0, depth):
    steps = max(7, int(length / .05)); pts = []; d = d.normalized(); seg = length / steps
    for i in range(steps + 1):
        t = i / steps; pts.append((p.copy(), max(.0016, r0 * (1 - .9 * t ** .8))))
        d = (d + Vector((R(-1, 1), R(-1, 1) * .5, R(-.3, .3))) * (.2 + .05 * depth) + Vector((0, 0, -.05 - .05 * t))).normalized()
        p = p + d * seg
    ROOTS[depth].append(pts)
    if depth < 3:
        n = {0: 6, 1: 5, 2: 3}[depth]
        for k in range(n):
            t = .12 + .85 * (k + R(.1, .9)) / n; i = min(steps - 1, int(t * steps)); q, rq = pts[i]; dd = (pts[i + 1][0] - q).normalized()
            side = dd.orthogonal().normalized(); side.rotate(Matrix.Rotation(k * 2.4 + R(-.8, .8), 3, dd))
            ang = math.radians(R(28, 58)); nd = (dd * math.cos(ang) + side * math.sin(ang)).normalized()
            raiz(q.copy(), nd, length * R(.4, .56), max(.0026, rq * R(.5, .66)), depth + 1)
for k in range(12):
    a = k / 12 * math.tau + R(-.2, .2); spread = R(.35, 1.5)
    raiz(Vector((math.cos(a) * .15, math.sin(a) * .09, -.02)), Vector((math.cos(a) * spread, math.sin(a) * spread * .4, -1)), R(.95, 1.45) * (1.2 - .28 * spread), R(.06, .11), 0)
raiz(Vector((0, 0, -.05)), Vector((.05, 0, -1)), 1.85, .1, 0)   # la pivotante
ZMIN = min(pt[0].z for lv in ROOTS.values() for pts in lv for pt in pts)

def curva(name, splines, mat, res=4):
    cu = bpy.data.curves.new(name, 'CURVE'); cu.dimensions = '3D'; cu.bevel_depth = 1.0; cu.bevel_resolution = res; cu.resolution_u = 2; cu.use_fill_caps = True
    for pts in splines:
        sp = cu.splines.new('POLY'); sp.points.add(len(pts) - 1)
        for pt, (co, rad) in zip(sp.points, pts): pt.co = (co.x, co.y, co.z, 1); pt.radius = rad
    ob = bpy.data.objects.new(name, cu); scn.collection.objects.link(ob); ob.data.materials.append(mat); return ob

# hoja de roble: lámina LOBULADA (perfil con entrantes), plegada por el nervio y algo combada
PERFIL = [(0, 0), (.1, .2), (.2, .34), (.28, .24), (.38, .46), (.47, .32), (.58, .5), (.68, .34), (.8, .4), (.9, .22), (1, 0)]
def hojas(name, items, mat):
    V, F, UV = [], [], []
    for (o, bd) in items:
        size = R(.05, .082); up = Vector((0, 0, 1)); out = bd.cross(up)
        if out.length < .1: out = Vector((1, 0, 0))
        out.normalize(); out.rotate(Matrix.Rotation(R(-math.pi, math.pi), 3, bd)); ax = (out * .9 + bd * .3 + Vector((0, 0, R(-.4, .25)))).normalized()
        side = ax.cross(up).normalized() if abs(ax.dot(up)) < .95 else Vector((1, 0, 0)); nrm = side.cross(ax).normalized(); roll = R(-.9, .9)
        side = (side * math.cos(roll) + nrm * math.sin(roll)).normalized(); nrm = side.cross(ax).normalized(); b0 = len(V)
        for (t, w) in PERFIL:
            c = o + ax * (size * (.2 + t)) - nrm * (size * .2 * t * t)
            for s in (-1, 0, 1): V.append(c + side * (s * w * size * .5) + nrm * (abs(s) * w * size * .14)); UV.append((.5 + s * .5, t))
        for i in range(len(PERFIL) - 1):
            a = b0 + i * 3; F.append((a, a + 1, a + 4, a + 3)); F.append((a + 1, a + 2, a + 5, a + 4))
    me = bpy.data.meshes.new(name); me.from_pydata([tuple(v) for v in V], [], F); me.update()
    uvl = me.uv_layers.new(name='UVMap')
    for poly in me.polygons:
        for li in poly.loop_indices: uvl.data[li].uv = UV[me.loops[li].vertex_index]
    col = me.color_attributes.new('tint', 'FLOAT_COLOR', 'POINT'); nv = len(PERFIL) * 3
    for i in range(0, len(V), nv):
        c = random.random()
        for j in range(i, min(i + nv, len(V))): col.data[j].color = (c, c, c, 1)
    for pl in me.polygons: pl.use_smooth = True
    ob = bpy.data.objects.new(name, me); scn.collection.objects.link(ob); ob.data.materials.append(mat); return ob

# ---------------- materiales ----------------
def nodos(name):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; return m, nt, nt.nodes['Principled BSDF'], nt.links
def corteza():
    m, nt, b, L = nodos('corteza'); b.inputs['Roughness'].default_value = .9
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1, 1, .16)   # surcos verticales
    n1 = nt.nodes.new('ShaderNodeTexNoise'); n1.inputs['Scale'].default_value = 26; n1.inputs['Detail'].default_value = 10; n1.inputs['Roughness'].default_value = .68
    rp = nt.nodes.new('ShaderNodeValToRGB'); e = rp.color_ramp.elements; e[0].color = (.028, .022, .018, 1); e[1].color = (.36, .33, .29, 1); e[0].position = .32; e[1].position = .74
    # musgo: verde en la cara que mira arriba y hacia el norte, a manchas
    n2 = nt.nodes.new('ShaderNodeTexNoise'); n2.inputs['Scale'].default_value = 3.2; n2.inputs['Detail'].default_value = 6
    geo = nt.nodes.new('ShaderNodeNewGeometry'); sx = nt.nodes.new('ShaderNodeSeparateXYZ')
    mm = nt.nodes.new('ShaderNodeMath'); mm.operation = 'MULTIPLY_ADD'; mm.inputs[1].default_value = .9; mm.inputs[2].default_value = -.34
    ad = nt.nodes.new('ShaderNodeMath'); ad.operation = 'ADD'; cl = nt.nodes.new('ShaderNodeMapRange'); cl.inputs['From Min'].default_value = .5; cl.inputs['From Max'].default_value = .78; cl.inputs['To Max'].default_value = .75
    mix = nt.nodes.new('ShaderNodeMixRGB'); mix.inputs['Color2'].default_value = (.07, .105, .028, 1)
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 1.0; bp.inputs['Distance'].default_value = .03
    L.new(tc.outputs['Object'], mp.inputs['Vector']); L.new(mp.outputs['Vector'], n1.inputs['Vector']); L.new(n1.outputs['Fac'], rp.inputs['Fac'])
    L.new(tc.outputs['Object'], n2.inputs['Vector']); L.new(geo.outputs['Normal'], sx.inputs['Vector']); L.new(n2.outputs['Fac'], mm.inputs[0])
    L.new(mm.outputs[0], ad.inputs[0]); L.new(sx.outputs['Z'], ad.inputs[1]); L.new(ad.outputs[0], cl.inputs['Value'])
    L.new(cl.outputs['Result'], mix.inputs['Fac']); L.new(rp.outputs['Color'], mix.inputs['Color1']); L.new(mix.outputs['Color'], b.inputs['Base Color'])
    L.new(n1.outputs['Fac'], bp.inputs['Height']); L.new(bp.outputs['Normal'], b.inputs['Normal']); return m
def hoja():
    m, nt, b, L = nodos('hoja'); out = nt.nodes['Material Output']; b.inputs['Roughness'].default_value = .5
    at = nt.nodes.new('ShaderNodeAttribute'); at.attribute_name = 'tint'; rp = nt.nodes.new('ShaderNodeValToRGB'); e = rp.color_ramp.elements
    e[0].color = (.05, .1, .018, 1); e[1].color = (.36, .42, .08, 1); e.new(.5).color = (.15, .24, .04, 1)     # verde oliva, con puntas amarillentas
    trl = nt.nodes.new('ShaderNodeBsdfTranslucent'); ms = nt.nodes.new('ShaderNodeMixShader'); ms.inputs['Fac'].default_value = .4
    L.new(at.outputs['Fac'], rp.inputs['Fac']); L.new(rp.outputs['Color'], b.inputs['Base Color']); L.new(rp.outputs['Color'], trl.inputs['Color'])
    L.new(b.outputs['BSDF'], ms.inputs[1]); L.new(trl.outputs['BSDF'], ms.inputs[2]); L.new(ms.outputs['Shader'], out.inputs['Surface']); return m
def raizmat():
    m, nt, b, L = nodos('raiz'); b.inputs['Roughness'].default_value = .95
    n1 = nt.nodes.new('ShaderNodeTexNoise'); n1.inputs['Scale'].default_value = 30; n1.inputs['Detail'].default_value = 8
    rp = nt.nodes.new('ShaderNodeValToRGB'); e = rp.color_ramp.elements; e[0].color = (.03, .02, .014, 1); e[1].color = (.2, .14, .095, 1)
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = .8; bp.inputs['Distance'].default_value = .015
    L.new(n1.outputs['Fac'], rp.inputs['Fac']); L.new(rp.outputs['Color'], b.inputs['Base Color']); L.new(n1.outputs['Fac'], bp.inputs['Height']); L.new(bp.outputs['Normal'], b.inputs['Normal']); return m
def tierra():
    m, nt, b, L = nodos('tierra'); b.inputs['Roughness'].default_value = 1
    n1 = nt.nodes.new('ShaderNodeTexNoise'); n1.inputs['Scale'].default_value = 22; n1.inputs['Detail'].default_value = 10
    rp = nt.nodes.new('ShaderNodeValToRGB'); e = rp.color_ramp.elements; e[0].color = (.018, .012, .009, 1); e[1].color = (.13, .09, .065, 1)
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = 1; bp.inputs['Distance'].default_value = .05
    L.new(n1.outputs['Fac'], rp.inputs['Fac']); L.new(rp.outputs['Color'], b.inputs['Base Color']); L.new(n1.outputs['Fac'], bp.inputs['Height']); L.new(bp.outputs['Normal'], b.inputs['Normal']); return m
BK, LF, RZ, TI = corteza(), hoja(), raizmat(), tierra()
for k, v in WOOD.items():
    if v: curva('madera%d' % k, v, BK, 5 if k < 2 else 3)
for k, v in ROOTS.items():
    if v: curva('raiz%d' % k, v, RZ, 4 if k < 2 else 2)
hojas('hojas', LEAVES, LF)

# terrón: media elipse irregular bajo la línea, cortada plana en z = 0, + migas sueltas
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=5, radius=1); te = bpy.context.object; te.scale = (.84, .42, .22); te.location = (0, 0, .02)
bpy.ops.object.transform_apply(scale=True, location=True)
tex = bpy.data.textures.new('t', 'CLOUDS'); tex.noise_scale = .32; tex.noise_depth = 4
md = te.modifiers.new('d', 'DISPLACE'); md.texture = tex; md.strength = .42
tex2 = bpy.data.textures.new('t2', 'CLOUDS'); tex2.noise_scale = .07; md2 = te.modifiers.new('d2', 'DISPLACE'); md2.texture = tex2; md2.strength = .07
bpy.ops.object.modifier_apply(modifier='d'); bpy.ops.object.modifier_apply(modifier='d2')
for v in te.data.vertices:
    if v.co.z > 0: v.co.z = 0
    v.co.z *= (1 + .5 * max(0, 1 - abs(v.co.x)))          # más hondo en el centro
te.data.materials.append(TI); bpy.ops.object.shade_smooth()
for k in range(110):
    a = R(0, math.tau); rr = R(.5, 1.1); s = R(.004, .013)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=s, location=(math.cos(a) * rr, math.sin(a) * rr * .35, -R(.02, .42) * (1.35 - rr * .5)))
    bpy.context.object.data.materials.append(TI)
# hierba corta al pie del tronco
for k in range(260):
    a = R(0, math.tau); rr = R(.12, .62) ** .8; x, y = math.cos(a) * rr, math.sin(a) * rr * .45; h = R(.03, .085) * (1.2 - rr)
    WOOD.setdefault('g', []).append([(Vector((x, y, 0)), .004), (Vector((x + R(-.02, .02), y, h * .6)), .003), (Vector((x + R(-.04, .04), y, h)), .0008)])
gm, gnt, gb, gL = nodos('hierba'); gb.inputs['Base Color'].default_value = (.12, .2, .035, 1); gb.inputs['Roughness'].default_value = .6
curva('hierba', WOOD['g'], gm, 1)

# ---------------- luz de estudio, suave; cámara ORTOGRÁFICA de frente ----------------
w = bpy.data.worlds.new('w'); scn.world = w; w.use_nodes = True; bg = w.node_tree.nodes['Background']; bg.inputs['Color'].default_value = (1, .98, .95, 1); bg.inputs['Strength'].default_value = .9
sun = bpy.data.lights.new('sol', 'SUN'); sun.energy = 3.0; sun.angle = math.radians(18); sun.color = (1, .95, .86); so = bpy.data.objects.new('sol', sun); scn.collection.objects.link(so); so.rotation_euler = (math.radians(48), math.radians(6), math.radians(-32))
X0, X1 = min(XS) - .25, max(XS) + .25; Z0, Z1 = ZMIN - .12, ZMAX + .2
ancho, alto = X1 - X0, Z1 - Z0
cam = bpy.data.cameras.new('cam'); cam.type = 'ORTHO'; co = bpy.data.objects.new('cam', cam); scn.collection.objects.link(co); scn.camera = co
co.location = ((X0 + X1) / 2, -12, (Z0 + Z1) / 2); co.rotation_euler = (math.radians(90), 0, 0)
scn.render.resolution_x = RESX; scn.render.resolution_y = int(RESX * alto / ancho); cam.ortho_scale = max(ancho, alto * 1.0) if ancho >= alto else alto
cam.sensor_fit = 'HORIZONTAL' if ancho >= alto else 'VERTICAL'
scn.render.engine = 'CYCLES'; scn.render.film_transparent = True; scn.render.image_settings.file_format = 'PNG'; scn.render.image_settings.color_mode = 'RGBA'
try:
    pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
    for d in pr.devices: d.use = True
    scn.cycles.device = 'GPU'
except Exception as ex: print('GPU no disponible:', ex)
scn.cycles.samples = SAMPLES; scn.cycles.use_denoising = True; scn.cycles.max_bounces = 5; scn.cycles.transparent_max_bounces = 8
try: scn.view_settings.view_transform = 'AgX'; scn.view_settings.look = 'AgX - Medium High Contrast'
except Exception as ex: print('vista:', ex)
scn.render.filepath = OUT; bpy.ops.render.render(write_still=True)
print('SUELO', round((Z1 - 0) / alto, 5)); print('EJE', round((0 - X0) / ancho, 5)); print('PX', scn.render.resolution_x, scn.render.resolution_y)
