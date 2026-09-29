# RONDA 64 · DETALLES de la web para los casos: de cada momento grabado se busca la ventana cuadrada con MÁS DETALLE (energía de bordes, sin la
# barra de arriba) en un fotograma y se recorta el vídeo ahí → public/media/obra/<slug>/d<n>.mp4 (+ póster). uv run --with pillow --with numpy python tools/r64-detalles.py
import subprocess, json, os, numpy as np
from PIL import Image, ImageFilter
FF = '/opt/homebrew/bin/ffmpeg'
R = 'tools/reel'
D = {  # (origen, inicio, duración) — los mismos momentos de la galería, más cerca
  'multiverse': [('m:multiverse-m00', 0, 4.1), ('m:multiverse-m03', 0, 4.1)],
  'amarra': [('m:zernio-m02', 0, 4.1), ('m:zernio-m03', 0, 4.1)],
  'playground': [('m:playground-m06', 0, 4.1), ('m:playground-m01', 0, 4.1)],
  'neety': [('m:neety-m00', 0, 4.1), ('m:neety-m02', 0, 4.1)],
  'invopop': [('m:invopop-m02', 0, 4.1), ('m:invopop-m01', 0, 4.1)],
  'business-online-payroll': [('m:business-online-payroll-m01', 0, 3.1), ('m:business-online-payroll-m02', 0, 3.1)],
  'cubbo': [('m:cubbo-m01', 0, 3.2), ('m:cubbo-m02', 0, 3.3)],
  'remerge': [('m:remerge-m02', 0, 4.1), ('m:remerge-m03', 0, 4.1)],
  'isotrol': [('m:isotrol-m00', 0, 4.1), ('m:isotrol-m02', 0, 2.6)],
}
src = lambda o: os.path.join(R, 'planos' if o.startswith('p:') else 'momentos', o[2:] + '.mp4')
def energia(path, t):
  subprocess.run([FF, '-y', '-loglevel', 'error', '-ss', str(t), '-i', path, '-frames:v', '1', '/tmp/_f.png'], check=True)
  im = Image.open('/tmp/_f.png').convert('L'); W, H = im.size
  e = np.asarray(im.filter(ImageFilter.FIND_EDGES), dtype=np.float32)
  return e, W, H
for slug, lista in D.items():
  if os.environ.get('SOLO') and slug != os.environ['SOLO']: continue
  for n, (o, ini, dur) in enumerate(lista, 1):
    p = src(o)
    if not os.path.exists(p): print(slug, 'falta', p); continue
    real = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)
    dur = min(dur, real - ini)  # hay momentos más cortos de lo previsto
    if os.path.exists('/tmp/_f.png'): os.remove('/tmp/_f.png')
    e, W, H = energia(p, ini + dur * 0.6)
    lado = int(min(W, H) * (0.42 if W > H else 0.8))
    top0 = int(H * 0.1)  # sin la barra de navegación
    ii = e.cumsum(0).cumsum(1)
    mejor, bx, by = -1, 0, top0
    paso = max(8, lado // 12)
    for y in range(top0, H - lado, paso):
      for x in range(1, W - lado, paso):
        s = ii[y + lado - 1, x + lado - 1] - ii[y - 1, x + lado - 1] - ii[y + lado - 1, x - 1] + ii[y - 1, x - 1]
        # centrado en su bloque: evita ventanas medio vacías
        if s > mejor: mejor, bx, by = s, x, y
    out = f'public/media/obra/{slug}/d{n}'
    subprocess.run([FF, '-y', '-loglevel', 'error', '-ss', str(ini), '-t', str(dur), '-i', p, '-vf', f'crop={lado}:{lado}:{bx}:{by},scale=900:900', '-an', '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out + '.mp4'], check=True)
    subprocess.run([FF, '-y', '-loglevel', 'error', '-ss', str(round(dur * 0.8, 2)), '-i', out + '.mp4', '-frames:v', '1', '-q:v', '5', out + '.jpg'], check=True)
    print(slug, n, o, f'{lado}px en ({bx},{by})', os.path.getsize(out + '.mp4') // 1024, 'KB')
