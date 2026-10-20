# RONDA 267 (2.ª) · «tiene que ser un estilo más pintado»: los renders REALISTAS de Cycles (out/aficiones) pasados a pintura en el compositor:
# Kuwahara anisótropo (trazos que siguen la forma) en dos pasadas, un posterizado suave y algo más de saturación. → out/aficiones-gouache/<nombre>.png
#   /Applications/Blender.app/Contents/MacOS/Blender -b -P tools/blender/pintar-render.py -- [tamaño] [nombre…]
import bpy, os, sys
args = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
TAM = float(args[0]) if args else 10
SOLO = args[1:]
D = os.path.dirname(__file__); SRC = os.path.join(D, 'out', 'aficiones'); OUT = os.path.join(D, 'out', 'aficiones-gouache'); os.makedirs(OUT, exist_ok=True)
for n in ['balon', 'mando', 'cafe', 'futbol', 'azada', 'airpods']:
    if SOLO and n not in SOLO: continue
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; sc.render.resolution_x = sc.render.resolution_y = 900; sc.render.film_transparent = True
    sc.view_settings.view_transform = 'Standard'; sc.render.image_settings.color_mode = 'RGBA'
    img = bpy.data.images.load(os.path.join(SRC, n + '.png'))
    g = bpy.data.node_groups.new('p', 'CompositorNodeTree'); sc.compositing_node_group = g
    g.interface.new_socket('Image', in_out='OUTPUT', socket_type='NodeSocketColor')
    im = g.nodes.new('CompositorNodeImage'); im.image = img
    k1 = g.nodes.new('CompositorNodeKuwahara'); k1.inputs['Size'].default_value = TAM; k1.inputs['Type'].default_value = 'Anisotropic'; k1.inputs['Sharpness'].default_value = 0.8; k1.inputs['Eccentricity'].default_value = 1.6
    k2 = g.nodes.new('CompositorNodeKuwahara'); k2.inputs['Size'].default_value = TAM * 0.5; k2.inputs['Type'].default_value = 'Anisotropic'; k2.inputs['Sharpness'].default_value = 0.9; k2.inputs['Eccentricity'].default_value = 1.0
    hs = g.nodes.new('CompositorNodeHueSat'); hs.inputs['Saturation'].default_value = 1.18
    go = g.nodes.new('NodeGroupOutput'); L = g.links.new
    L(im.outputs['Image'], k1.inputs['Image']); L(k1.outputs['Image'], k2.inputs['Image']); L(k2.outputs['Image'], hs.inputs['Image']); L(hs.outputs['Image'], go.inputs[0])
    sc.render.filepath = os.path.join(OUT, n + '.png'); bpy.ops.render.render(write_still=True); print('pintado', n)
