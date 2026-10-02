# RONDA 86 · «los altavoces tienen que ser mucho más realistas»: un monitor de estudio modelado por script y renderizado en Cycles con la luz de la escena
# (cálida, desde la ventana de detrás a la derecha). Dos ángulos (izquierdo y derecho, girados hacia el ordenador) y, para cada uno, una pasada SOLO del woofer
# (misma cámara) que la web superpone y hace vibrar con la música.
#   /Applications/Blender.app/Contents/MacOS/Blender -b -P tools/blender/altavoz.py
import bpy, math, json, os
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view

OUT = os.path.join(os.path.dirname(__file__), 'out')
os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'
sc.cycles.samples = 96
sc.cycles.use_denoising = True
sc.render.film_transparent = True
sc.render.resolution_x, sc.render.resolution_y = 1500, 2350
sc.view_settings.view_transform = 'AgX'

def mat(nombre, color, rough=0.5, metal=0.0, coat=0.0):
    m = bpy.data.materials.new(nombre); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1); b.inputs['Roughness'].default_value = rough; b.inputs['Metallic'].default_value = metal
    if coat: b.inputs['Coat Weight'].default_value = coat
    return m

def nogal():
    m = bpy.data.materials.new('nogal'); m.use_nodes = True; nt = m.node_tree
    b = nt.nodes['Principled BSDF']; b.inputs['Roughness'].default_value = 0.38; b.inputs['Coat Weight'].default_value = 0.35
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (60, 60, 3)
    ns = nt.nodes.new('ShaderNodeTexNoise'); ns.inputs['Scale'].default_value = 3.0; ns.inputs['Detail'].default_value = 12; ns.inputs['Distortion'].default_value = 2.5
    rp = nt.nodes.new('ShaderNodeValToRGB')
    rp.color_ramp.elements[0].color = (0.035, 0.018, 0.01, 1); rp.color_ramp.elements[1].color = (0.19, 0.095, 0.045, 1)
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector']); nt.links.new(mp.outputs['Vector'], ns.inputs['Vector'])
    nt.links.new(ns.outputs['Fac'], rp.inputs['Fac']); nt.links.new(rp.outputs['Color'], b.inputs['Base Color'])
    return m

M_NOGAL = nogal()
M_FRENTE = mat('frente', (0.018, 0.016, 0.015), 0.62)
M_CONO = mat('cono', (0.035, 0.033, 0.032), 0.78)
M_GOMA = mat('goma', (0.012, 0.012, 0.012), 0.45)
M_CUPULA = mat('cupula', (0.05, 0.05, 0.05), 0.35)
M_METAL = mat('metal', (0.55, 0.5, 0.45), 0.3, 1.0)
M_LED = bpy.data.materials.new('led'); M_LED.use_nodes = True
e = M_LED.node_tree.nodes.new('ShaderNodeEmission'); e.inputs['Color'].default_value = (1.0, 0.42, 0.15, 1); e.inputs['Strength'].default_value = 8
M_LED.node_tree.links.new(e.outputs['Emission'], M_LED.node_tree.nodes['Material Output'].inputs['Surface'])

W, D, H = 0.30, 0.26, 0.50
def cubo(nombre, dims, loc, m, bisel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.name = nombre; o.scale = dims
    bpy.ops.object.transform_apply(scale=True)
    if bisel:
        md = o.modifiers.new('bisel', 'BEVEL'); md.width = bisel; md.segments = 5; md.limit_method = 'ANGLE'
    o.data.materials.append(m); bpy.ops.object.shade_smooth(); return o

caja = cubo('caja', (W, D, H), (0, 0, H / 2), M_NOGAL, 0.014)
frente = cubo('frente', (W - 0.03, 0.01, H - 0.03), (0, -D / 2 - 0.002, H / 2), M_FRENTE, 0.006)
YF = -D / 2 - 0.008
piezas_cono = []
def woofer(zc, R):
    bpy.ops.mesh.primitive_torus_add(major_radius=R + 0.012, minor_radius=0.016, location=(0, YF, zc), rotation=(math.pi / 2, 0, 0), major_segments=96, minor_segments=24)
    marco = bpy.context.object; marco.data.materials.append(M_METAL); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_torus_add(major_radius=R - 0.004, minor_radius=0.011, location=(0, YF - 0.002, zc), rotation=(math.pi / 2, 0, 0), major_segments=96, minor_segments=24)
    goma = bpy.context.object; goma.data.materials.append(M_GOMA); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_cone_add(vertices=96, radius1=R - 0.012, radius2=0.03, depth=0.045, location=(0, YF + 0.02, zc), rotation=(-math.pi / 2, 0, 0))
    cono = bpy.context.object; cono.data.materials.append(M_CONO); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.034, location=(0, YF + 0.004, zc), segments=48, ring_count=24)
    tapa = bpy.context.object; tapa.scale = (1, 0.45, 1); tapa.data.materials.append(M_CONO); bpy.ops.object.shade_smooth()
    for k in range(4):
        a = math.pi / 4 + k * math.pi / 2
        bpy.ops.mesh.primitive_cylinder_add(radius=0.006, depth=0.006, location=((R + 0.024) * math.cos(a), YF - 0.004, zc + (R + 0.024) * math.sin(a)), rotation=(math.pi / 2, 0, 0))
        bpy.context.object.data.materials.append(M_METAL)
    piezas_cono.extend([goma, cono, tapa])
    return (0, YF, zc)
def tweeter(zc):
    bpy.ops.mesh.primitive_torus_add(major_radius=0.034, minor_radius=0.008, location=(0, YF, zc), rotation=(math.pi / 2, 0, 0), major_segments=64, minor_segments=16)
    bpy.context.object.data.materials.append(M_METAL); bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.024, location=(0, YF + 0.006, zc), segments=48, ring_count=24)
    d = bpy.context.object; d.scale = (1, 0.55, 1); d.data.materials.append(M_CUPULA); bpy.ops.object.shade_smooth()
    piezas_cono.append(d)
cw = woofer(0.17, 0.105)
tweeter(0.385)
bpy.ops.mesh.primitive_cylinder_add(radius=0.005, depth=0.004, location=(0.105, YF - 0.002, 0.465), rotation=(math.pi / 2, 0, 0))
bpy.context.object.data.materials.append(M_LED)

# LUZ: la ventana cálida detrás a la derecha (contraluz) + un relleno suave delante + el ambiente
bpy.ops.object.light_add(type='AREA', location=(1.4, 1.6, 1.3)); L = bpy.context.object; L.data.energy = 700; L.data.size = 2.0; L.data.color = (1.0, 0.72, 0.42)
L.rotation_euler = (Vector((0, 0, 0.3)) - L.location).to_track_quat('-Z', 'Y').to_euler()
bpy.ops.object.light_add(type='AREA', location=(-1.2, -2.0, 1.2)); F = bpy.context.object; F.data.energy = 45; F.data.size = 3.0; F.data.color = (1.0, 0.86, 0.72)
F.rotation_euler = (Vector((0, 0, 0.3)) - F.location).to_track_quat('-Z', 'Y').to_euler()
w = bpy.data.worlds.new('mundo'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.35, 0.22, 0.14, 1); w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.22

bpy.ops.object.camera_add(); cam = bpy.context.object; sc.camera = cam; cam.data.lens = 90
todo = [o for o in bpy.data.objects if o.type == 'MESH']
meta = {}
for lado, giro in [('izq', -14), ('der', 14)]:
    # el altavoz gira hacia el ordenador; la cámara, delante y un poco por encima
    for o in todo: o.rotation_euler.z = 0
    piv = bpy.data.objects.new('piv', None) if 'piv' not in bpy.data.objects else bpy.data.objects['piv']
    for o in todo: o.parent = None
    ang = math.radians(giro)
    for o in todo:
        o.matrix_world = __import__('mathutils').Matrix.Rotation(ang, 4, 'Z') @ (o.matrix_world if 'base' in o else o.matrix_world)
    cam.location = (0, -3.0, 0.62); cam.rotation_euler = (math.radians(84), 0, 0)
    for o in todo: o.hide_render = False
    sc.render.filepath = os.path.join(OUT, f'altavoz-{lado}.png'); bpy.ops.render.render(write_still=True)
    # solo el woofer y el tweeter (la capa que vibra)
    for o in todo: o.hide_render = o not in piezas_cono
    sc.render.filepath = os.path.join(OUT, f'cono-{lado}.png'); bpy.ops.render.render(write_still=True)
    # dónde cae el centro del woofer en la imagen (para escalar la capa desde ahí)
    wc = __import__('mathutils').Matrix.Rotation(ang, 4, 'Z') @ Vector(cw)
    p = world_to_camera_view(sc, cam, wc); meta[lado] = {'woofer': [round(p.x, 4), round(1 - p.y, 4)]}
    for o in todo: o.matrix_world = __import__('mathutils').Matrix.Rotation(-ang, 4, 'Z') @ o.matrix_world
json.dump(meta, open(os.path.join(OUT, 'altavoz.json'), 'w'))
print('META', meta)
