# RONDA 265 · «iconos 3D realistas con su color y todo»: las seis aficiones de Eric y Andoni modeladas por script y renderizadas en Cycles,
# una por imagen, en 3/4 desde arriba a la izquierda (la luz de la web), con fondo transparente y su sombra de contacto (captador de sombras).
#   /Applications/Blender.app/Contents/MacOS/Blender -b -P tools/blender/aficiones.py -- [nombre]
import bpy, bmesh, math, os, sys
from mathutils import Vector

# RONDA 267 · PINTADO=1 → la versión «lámina pintada» (referencia de Andoni: ilustración retro a gouache, bandas de luz y sombra duras, brillos en trazo
# blanco, pincelada, sin contorno): mismos modelos, materiales de dibujo en EEVEE (Shader to RGB + rampas constantes) y paleta retro.
PINTADO = os.environ.get('PINTADO') == '1'
OUT = os.path.join(os.path.dirname(__file__), 'out', 'aficiones-pintado' if PINTADO else 'aficiones')
os.makedirs(OUT, exist_ok=True)
SOLO = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []


def escena():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'
    sc.cycles.samples = 128
    sc.cycles.use_denoising = True
    sc.render.film_transparent = True
    sc.render.resolution_x = sc.render.resolution_y = 900
    sc.view_settings.view_transform = 'AgX'
    sc.view_settings.look = 'AgX - Punchy'
    w = bpy.data.worlds.new('mundo'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.05, 0.035, 0.03, 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.6
    # luz: llave cálida arriba a la izquierda, recorte frío detrás a la derecha, relleno suave delante
    def luz(nombre, loc, energia, color, tam):
        d = bpy.data.lights.new(nombre, 'AREA'); d.energy = energia; d.color = color; d.size = tam
        o = bpy.data.objects.new(nombre, d); sc.collection.objects.link(o); o.location = loc
        o.rotation_euler = (Vector((0, 0, 0)) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    luz('llave', (-3.2, -2.6, 4.2), 420, (1.0, 0.9, 0.78), 2.4)
    luz('recorte', (3.0, 3.2, 2.6), 300, (0.78, 0.86, 1.0), 1.6)
    luz('relleno', (1.5, -4.5, 1.2), 70, (1.0, 0.95, 0.9), 4.0)
    # suelo que solo recoge la sombra
    bpy.ops.mesh.primitive_plane_add(size=20, location=(0, 0, 0))
    bpy.context.object.is_shadow_catcher = True
    cam = bpy.data.cameras.new('cam'); cam.lens = 70
    c = bpy.data.objects.new('cam', cam); sc.collection.objects.link(c); sc.camera = c
    c.location = (-3.4, -5.6, 3.6)
    c.rotation_euler = (Vector((0, 0, 0.9)) - c.location).to_track_quat('-Z', 'Y').to_euler()
    return sc


def mat(nombre, color, rough=0.5, metal=0.0, coat=0.0, ss=0.0):
    m = bpy.data.materials.new(nombre); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if coat: b.inputs['Coat Weight'].default_value = coat
    if ss: b.inputs['Subsurface Weight'].default_value = ss
    return m


def rugoso(m, escala, fuerza):
    """relieve fino (granulado del cuero, poro de la cerámica)"""
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    ns = nt.nodes.new('ShaderNodeTexNoise'); ns.inputs['Scale'].default_value = escala; ns.inputs['Detail'].default_value = 4
    bp = nt.nodes.new('ShaderNodeBump'); bp.inputs['Strength'].default_value = fuerza; bp.inputs['Distance'].default_value = 0.02
    nt.links.new(ns.outputs['Fac'], bp.inputs['Height']); nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    return m


def liso(o, sub=2):
    md = o.modifiers.new('sub', 'SUBSURF'); md.levels = md.render_levels = sub
    bpy.ops.object.shade_smooth()
    return o


def poner(o, m):
    o.data.materials.clear(); o.data.materials.append(m); return o


# ── 1 · balón de baloncesto: naranja granulado y las costuras negras en relieve
def balon():
    M = rugoso(mat('cuero', (0.55, 0.12, 0.02), 0.6), 900, 0.35)
    N = mat('costura', (0.012, 0.01, 0.01), 0.6)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, segments=96, ring_count=48, location=(0, 0, 1)); poner(bpy.context.object, M); bpy.ops.object.shade_smooth()
    piezas = [bpy.context.object]
    def aro(R, loc, rot):
        bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=0.013, major_segments=192, minor_segments=12, location=loc, rotation=rot)
        t = bpy.context.object; poner(t, N); bpy.ops.object.shade_smooth(); piezas.append(t)
    aro(1.003, (0, 0, 1), (0, 0, 0))                    # ecuador
    aro(1.003, (0, 0, 1), (math.pi / 2, 0, 0))          # meridiano
    r = math.sqrt(1 - 0.62 ** 2) + 0.003
    aro(r, (0.62, 0, 1), (0, math.pi / 2, 0)); aro(r, (-0.62, 0, 1), (0, math.pi / 2, 0))   # las dos curvas laterales
    v = bpy.data.objects.new('balon', None); bpy.context.scene.collection.objects.link(v); v.location = (0, 0, 1)
    for o in piezas: o.parent = v; o.location.z -= 1
    v.rotation_euler = (math.radians(14), math.radians(-18), math.radians(32))
    return 1.0


# ── 2 · mando: cuerpo de metabolas (se funden como el plástico inyectado), cruceta, cuatro botones y dos palancas
def mando():
    P = rugoso(mat('plastico', (0.035, 0.035, 0.04), 0.42, coat=0.2), 400, 0.05)
    B = [mat('a', (0.05, 0.45, 0.12), 0.25, coat=0.6), mat('b', (0.6, 0.03, 0.03), 0.25, coat=0.6), mat('x', (0.04, 0.16, 0.6), 0.25, coat=0.6), mat('y', (0.75, 0.55, 0.04), 0.25, coat=0.6)]
    G = mat('goma', (0.015, 0.015, 0.016), 0.7)
    partes = []
    for co, esc in [((0, 0, 0), (1.2, 0.62, 0.32)), ((-0.95, -0.45, -0.02), (0.38, 0.62, 0.3)), ((0.95, -0.45, -0.02), (0.38, 0.62, 0.3))]:
        bpy.ops.mesh.primitive_uv_sphere_add(radius=1, segments=48, ring_count=24, location=co); e = bpy.context.object; e.scale = esc; partes.append(e)
    bpy.ops.object.select_all(action='DESELECT')
    for e in partes: e.select_set(True)
    bpy.context.view_layer.objects.active = partes[0]; bpy.ops.object.join(); o = bpy.context.object
    md = o.modifiers.new('rm', 'REMESH'); md.mode = 'VOXEL'; md.voxel_size = 0.025
    md = o.modifiers.new('sm', 'CORRECTIVE_SMOOTH'); md.iterations = 12
    bpy.ops.object.modifier_apply(modifier='rm'); bpy.ops.object.modifier_apply(modifier='sm')
    poner(o, P); bpy.ops.object.shade_smooth()
    zt = 0.24
    for k, (x, y) in enumerate([(0.78, 0.3), (1.0, 0.1), (0.56, 0.1), (0.78, -0.1)]):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.11, depth=0.12, location=(x, y + 0.04, zt)); liso(poner(bpy.context.object, B[k]), 1)
    for dx, dy, sx, sy in [(0, 0, 0.33, 0.11), (0, 0, 0.11, 0.33)]:
        bpy.ops.mesh.primitive_cube_add(size=1, location=(-0.78, 0.1, zt)); c = bpy.context.object; c.scale = (sx * 0.8, sy * 0.8, 0.1)
        md = c.modifiers.new('b', 'BEVEL'); md.width = 0.03; md.segments = 3; poner(c, G); bpy.ops.object.shade_smooth()
    for x in (-0.42, 0.42):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.11, depth=0.2, location=(x, -0.3, zt)); poner(bpy.context.object, G)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.17, location=(x, -0.3, zt + 0.12)); c = bpy.context.object; c.scale = (1, 1, 0.38); liso(poner(c, G), 1)
    for o2 in bpy.context.scene.objects:
        if o2.type == 'MESH' and not o2.is_shadow_catcher:
            o2.location.z += 0.5
    grupo = [o for o in bpy.context.scene.objects if o.type == 'MESH' and not o.is_shadow_catcher]
    v = bpy.data.objects.new('mando', None); bpy.context.scene.collection.objects.link(v); v.location = (0, 0, 0.6)
    for o in grupo: o.parent = v; o.location.z -= 0.6
    v.rotation_euler = (math.radians(38), 0, math.radians(-12)); v.scale = (0.78, 0.78, 0.78)
    return 1.2


# ── 3 · café en casa: taza de cerámica esmaltada con el café y su crema
def cafe():
    C = rugoso(mat('ceramica', (0.86, 0.83, 0.78), 0.12, coat=0.4, ss=0.05), 1200, 0.02)
    F = mat('cafe', (0.06, 0.025, 0.012), 0.05)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.62, depth=1.15, vertices=96, location=(0, 0, 0.6)); t = bpy.context.object
    bm = bmesh.new(); bm.from_mesh(t.data)
    arriba = [f for f in bm.faces if f.normal.z > 0.9]; bmesh.ops.delete(bm, geom=arriba, context='FACES'); bm.to_mesh(t.data); bm.free()
    md = t.modifiers.new('grosor', 'SOLIDIFY'); md.thickness = 0.06; md.offset = -1
    md = t.modifiers.new('b', 'BEVEL'); md.width = 0.025; md.segments = 4; md.limit_method = 'ANGLE'
    liso(poner(t, C), 2)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.3, minor_radius=0.07, location=(0.66, 0, 0.62)); a = bpy.context.object
    a.rotation_euler = (math.pi / 2, 0, 0); a.scale = (1, 1.2, 1); liso(poner(a, C), 1)
    bpy.ops.mesh.primitive_cylinder_add(radius=0.55, depth=0.02, vertices=96, location=(0, 0, 1.06)); poner(bpy.context.object, F)
    # crema: un anillo más claro de espuma
    cr = rugoso(mat('crema', (0.32, 0.17, 0.08), 0.35), 300, 0.2)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.46, minor_radius=0.08, location=(0, 0, 1.065)); c = bpy.context.object; c.scale = (1, 1, 0.12); liso(poner(c, cr), 1)
    return 1.2


# ── 4 · balón de fútbol: icosaedro truncado (12 pentágonos negros, 20 hexágonos blancos), costuras hundidas, inflado a esfera
def futbol():
    Bl = rugoso(mat('blanco', (0.85, 0.84, 0.82), 0.32, coat=0.3), 700, 0.08)
    Ne = rugoso(mat('negro', (0.015, 0.015, 0.017), 0.5, coat=0.08), 700, 0.08)
    S = mat('costura', (0.25, 0.24, 0.23), 0.7)
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1, location=(0, 0, 1)); o = bpy.context.object
    o.data.materials.append(Bl); o.data.materials.append(Ne); o.data.materials.append(S)
    bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.bevel(bm, geom=list(bm.verts), offset=33.333, offset_type='PERCENT', affect='VERTICES', segments=1)
    for f in bm.faces: f.material_index = 1 if len(f.verts) == 5 else 0
    res = bmesh.ops.inset_individual(bm, faces=list(bm.faces), thickness=0.022, depth=0.0)
    for f in bm.faces:
        if f not in set(res.get('faces', [])) and len(f.verts) == 4: f.material_index = 2
    bmesh.ops.poke(bm, faces=list(bm.faces))
    bmesh.ops.subdivide_edges(bm, edges=list(bm.edges), cuts=7, use_grid_fill=True)
    for v in bm.verts: v.co = v.co.normalized()
    # las costuras, hundidas
    for f in bm.faces:
        if f.material_index == 2:
            for v in f.verts: v.co = v.co.normalized() * 0.985
    bm.to_mesh(o.data); bm.free()
    liso(o, 1)
    return 1.0


# ── 5 · azada: mango de fresno y hoja de acero forjado, algo gastada
def azada():
    Ma = rugoso(mat('fresno', (0.42, 0.26, 0.13), 0.55), 60, 0.25)
    nt = Ma.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (40, 40, 1.5)
    wv = nt.nodes.new('ShaderNodeTexWave'); wv.inputs['Scale'].default_value = 2; wv.inputs['Distortion'].default_value = 6
    rp = nt.nodes.new('ShaderNodeValToRGB'); rp.color_ramp.elements[0].color = (0.28, 0.15, 0.06, 1); rp.color_ramp.elements[1].color = (0.55, 0.36, 0.19, 1)
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], wv.inputs['Vector'])
    nt.links.new(wv.outputs['Fac'], rp.inputs['Fac']); nt.links.new(rp.outputs['Color'], b.inputs['Base Color'])
    Ac = rugoso(mat('acero', (0.32, 0.31, 0.3), 0.38, metal=1.0), 120, 0.4)
    # el mango tumbado en diagonal, la hoja apoyada abajo a la derecha
    # ronda 267 · la hoja, perpendicular al mango y colgando de su punta (en el plano del mango parecía una bandera); el mango, con los cantos redondeados
    bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=2.6, vertices=32, location=(0, 0, 0)); m = bpy.context.object
    md = m.modifiers.new('b', 'BEVEL'); md.width = 0.05; md.segments = 4; poner(m, Ma); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_cylinder_add(radius=0.11, depth=0.3, vertices=32, location=(0, 0, 1.22)); poner(bpy.context.object, Ac); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.42, 1.3)); h = bpy.context.object; h.scale = (1.0, 0.85, 0.06)
    bm = bmesh.new(); bm.from_mesh(h.data)
    for v in bm.verts:   # se ensancha hacia el filo
        if v.co.y > 0: v.co.x *= 1.3
    bm.to_mesh(h.data); bm.free()
    md = h.modifiers.new('b', 'BEVEL'); md.width = 0.012; md.segments = 2; poner(h, Ac)
    grupo = [o for o in bpy.context.scene.objects if o.type == 'MESH' and not o.is_shadow_catcher]
    vacio = bpy.data.objects.new('azada', None); bpy.context.scene.collection.objects.link(vacio)
    for o in grupo: o.parent = vacio
    vacio.rotation_euler = (math.radians(-20), math.radians(58), math.radians(28)); vacio.location = (0, 0, 0.9)
    return 1.6


# ── 6 · AirPods: los dos auriculares, blancos y brillantes, con su rejilla y la punta metálica
def airpods():
    Bl = mat('blanco', (0.9, 0.9, 0.88), 0.18, coat=0.6, ss=0.05)
    Rj = mat('rejilla', (0.02, 0.02, 0.022), 0.6)
    Me = mat('punta', (0.75, 0.75, 0.74), 0.25, metal=1.0)
    def uno(x, giro, inclina):
        # ronda 267 · un solo cuerpo (cabeza en judía + palito) fundido por remallado: separados parecían piruletas
        partes = []
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.36, segments=48, ring_count=24, location=(0, 0, 0)); c = bpy.context.object; c.scale = (1.15, 0.82, 0.9); c.rotation_euler = (0, math.radians(-30), 0); partes.append(c)
        bpy.ops.mesh.primitive_cylinder_add(radius=0.125, depth=1.0, vertices=32, location=(0.12, 0.0, -0.55)); t = bpy.context.object; t.scale = (1, 0.85, 1); t.rotation_euler = (0, math.radians(-10), 0); partes.append(t)
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.125, location=(0.205, 0.0, -1.04)); e = bpy.context.object; e.scale = (1, 0.85, 0.6); partes.append(e)
        bpy.ops.object.select_all(action='DESELECT')
        for o in partes: o.select_set(True)
        bpy.context.view_layer.objects.active = partes[0]; bpy.ops.object.transform_apply(location=False, rotation=True, scale=True); bpy.ops.object.join(); o = bpy.context.object
        md = o.modifiers.new('rm', 'REMESH'); md.mode = 'VOXEL'; md.voxel_size = 0.018
        md = o.modifiers.new('sm', 'CORRECTIVE_SMOOTH'); md.iterations = 10
        bpy.ops.object.modifier_apply(modifier='rm'); bpy.ops.object.modifier_apply(modifier='sm'); poner(o, Bl); bpy.ops.object.shade_smooth()
        bpy.ops.mesh.primitive_cylinder_add(radius=0.11, depth=0.03, vertices=48, location=(0.21, 0, -1.1)); m = poner(bpy.context.object, Me); bpy.ops.object.shade_smooth()
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.07, location=(-0.32, -0.16, 0.12)); r = bpy.context.object; r.scale = (0.5, 1, 1); poner(r, Rj)
        v = bpy.data.objects.new('bud', None); bpy.context.scene.collection.objects.link(v)
        for k in (o, m, r): k.parent = v
        v.location = (x, 0, 1.25); v.rotation_euler = (math.radians(inclina), 0, math.radians(giro))
    uno(-0.5, -24, -10); uno(0.55, 160, 10)
    return 1.3


# ── RONDA 267 · el PINTADO: cada material pasa a «gouache». La luz difusa se lee con Shader to RGB y se cuantiza en bandas (sombra fría · medio · luz cálida)
#    con el borde removido por una pincelada (ruido estirado); el brillo especular se corta en una mancha blanca dura. Paleta retro de la referencia.
RETRO = {  # color base nuevo por material (None = el suyo)
    'cuero': (0.80, 0.26, 0.12), 'costura': (0.16, 0.10, 0.08), 'plastico': (0.20, 0.36, 0.55), 'goma': (0.13, 0.17, 0.24),
    'a': (0.27, 0.55, 0.30), 'b': (0.78, 0.20, 0.14), 'x': (0.20, 0.36, 0.62), 'y': (0.86, 0.66, 0.22),
    'ceramica': (0.93, 0.89, 0.80), 'cafe': (0.20, 0.10, 0.06), 'crema': (0.55, 0.33, 0.16),
    'blanco': (0.93, 0.90, 0.83), 'negro': (0.18, 0.24, 0.32), 'fresno': (0.72, 0.50, 0.27), 'acero': (0.62, 0.69, 0.73),
    'rejilla': (0.15, 0.15, 0.17), 'punta': (0.70, 0.72, 0.74),
}
def _mix(a, b, t): return tuple(a[i] * (1 - t) + b[i] * t for i in range(3))
def _lin(c): return tuple(v ** 2.2 for v in c)  # la paleta está en valores de pantalla (sRGB); Blender trabaja en lineal
def pintar_material(m):
    nombre = m.name.split('.')[0]
    b = m.node_tree.nodes.get('Principled BSDF')
    base = _lin(RETRO[nombre]) if nombre in RETRO else (tuple(b.inputs['Base Color'].default_value[:3]) if b else (0.21, 0.21, 0.21))
    metal = bool(b and b.inputs['Metallic'].default_value > 0.5) or nombre in ('acero', 'punta')
    nt = m.node_tree; nt.nodes.clear(); N = nt.nodes.new; L = nt.links.new
    out = N('ShaderNodeOutputMaterial'); em = N('ShaderNodeEmission'); L(em.outputs[0], out.inputs[0])
    dif = N('ShaderNodeBsdfDiffuse'); dif.inputs['Color'].default_value = (1, 1, 1, 1); s2r = N('ShaderNodeShaderToRGB'); L(dif.outputs[0], s2r.inputs[0])
    bw = N('ShaderNodeRGBToBW'); L(s2r.outputs['Color'], bw.inputs[0])
    # pincelada: ruido muy estirado que mueve el borde de las bandas
    tc = N('ShaderNodeTexCoord'); mp = N('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (2.5, 2.5, 38); L(tc.outputs['Object'], mp.inputs['Vector'])
    ns = N('ShaderNodeTexNoise'); ns.inputs['Scale'].default_value = 4; ns.inputs['Detail'].default_value = 6; L(mp.outputs['Vector'], ns.inputs['Vector'])
    mr = N('ShaderNodeMapRange'); mr.inputs['To Min'].default_value = -0.15; mr.inputs['To Max'].default_value = 0.15; L(ns.outputs['Fac'], mr.inputs['Value'])
    su = N('ShaderNodeMath'); su.operation = 'ADD'; L(bw.outputs[0], su.inputs[0]); L(mr.outputs['Result'], su.inputs[1])
    rp = N('ShaderNodeValToRGB'); rp.color_ramp.interpolation = 'EASE'; el = rp.color_ramp.elements  # ronda 267 (2.ª) · «más pintado»: las bandas se funden como el gouache
    sombra = _mix(tuple(c * (0.30 if metal else 0.38) for c in base), _lin((0.16, 0.20, 0.32)), 0.25)
    luz = _mix(base, _lin((1.0, 0.95, 0.86)), 0.2 if not metal else 0.45)
    # cuatro bandas: sombra honda · sombra · el color (la mayor parte) · una luz estrecha
    el[0].position = 0.0; el[0].color = (*sombra, 1); el[1].position = 0.16; el[1].color = (*_mix(sombra, base, 0.55), 1)
    e3 = el.new(0.34); e3.color = (*base, 1)
    e4 = el.new(0.86 if not metal else 0.7); e4.color = (*luz, 1)
    L(su.outputs[0], rp.inputs['Fac'])
    # el brillo: un corte duro del especular, en blanco crema
    gl = N('ShaderNodeBsdfGlossy'); gl.inputs['Roughness'].default_value = 0.12 if metal else 0.2; gs = N('ShaderNodeShaderToRGB'); L(gl.outputs[0], gs.inputs[0])
    gbw = N('ShaderNodeRGBToBW'); L(gs.outputs['Color'], gbw.inputs[0])
    gr = N('ShaderNodeValToRGB'); gr.color_ramp.interpolation = 'CONSTANT'; ge = gr.color_ramp.elements
    ge[0].color = (0, 0, 0, 1); ge[1].position = 0.45 if metal else 0.72; ge[1].color = (1, 1, 1, 1); L(gbw.outputs[0], gr.inputs['Fac'])
    mx = N('ShaderNodeMix'); mx.data_type = 'RGBA'; L(gr.outputs['Color'], mx.inputs['Factor']); L(rp.outputs['Color'], mx.inputs[6]); mx.inputs[7].default_value = (*_lin((1.0, 0.98, 0.93)), 1)
    L(mx.outputs[2], em.inputs['Color'])

def pintar(sc):
    sc.render.engine = 'BLENDER_EEVEE'
    sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
    sc.world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.35
    for o in list(sc.objects):
        if o.type == 'MESH' and o.is_shadow_catcher: bpy.data.objects.remove(o)
    for m in bpy.data.materials:
        if m.use_nodes: pintar_material(m)
    for o in sc.objects:
        if o.type == 'LIGHT':
            if o.name == 'llave': o.data.energy = 520
            elif o.name == 'recorte': o.data.energy = 120
            else: o.data.energy = 30
    # ronda 267 (2.ª) · la PINCELADA: filtro Kuwahara anisótropo en el compositor (el «óleo» de Blender): la superficie se rompe en trazos que siguen la forma
    g = bpy.data.node_groups.new('pintura', 'CompositorNodeTree'); sc.compositing_node_group = g
    g.interface.new_socket('Image', in_out='OUTPUT', socket_type='NodeSocketColor')
    rl = g.nodes.new('CompositorNodeRLayers'); k = g.nodes.new('CompositorNodeKuwahara'); go = g.nodes.new('NodeGroupOutput')
    k.inputs['Size'].default_value = 9; k.inputs['Type'].default_value = 'Anisotropic'; k.inputs['Sharpness'].default_value = 0.6; k.inputs['Eccentricity'].default_value = 1.2
    g.links.new(rl.outputs['Image'], k.inputs['Image']); g.links.new(k.outputs['Image'], go.inputs[0])


PIEZAS = {'balon': balon, 'mando': mando, 'cafe': cafe, 'futbol': futbol, 'azada': azada, 'airpods': airpods}
for nombre, fn in PIEZAS.items():
    if SOLO and nombre not in SOLO: continue
    sc = escena()
    tam = fn()
    if PINTADO: pintar(sc)
    cam = sc.camera
    cam.data.lens = 70 / tam * 1.0 if tam > 1.25 else 70
    sc.render.filepath = os.path.join(OUT, nombre + '.png')
    bpy.ops.render.render(write_still=True)
    print('render', nombre)
