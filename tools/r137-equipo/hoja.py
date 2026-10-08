import numpy as np
from PIL import Image, ImageDraw
O='out/'; bg=(59,35,27)
def onbg(im):
  b=Image.new('RGBA',im.size,bg+(255,)); b.alpha_composite(im); return b
rows=[]
for n in ['andoni-anda','eric-anda']:
  s=Image.open(O+n+'.webp'); rows.append(onbg(s))
fin=Image.open(O+'juntos-r137.webp')
for p in ['andoni-canasta','eric-reves']:
  fr=[Image.open(O+f'{p}-{i:02d}.webp') for i in range(1,9)]
  W,H=fr[0].size; s=Image.new('RGBA',(W*9,H)); s.paste(fin,(0,0))
  for i,f in enumerate(fr): s.paste(f,(W*(i+1),0))
  rows.append(onbg(s))
# overlays: final vs gesto01 (diff)
W=max(r.width for r in rows); H=sum(r.height for r in rows)
sh=Image.new('RGB',(W,H),(20,20,20)); y=0
d=ImageDraw.Draw(sh)
for r in rows:
  sh.paste(r.convert('RGB'),(0,y)); 
  # baseline guide
  y+=r.height
sh=sh.resize((W//2,H//2),Image.LANCZOS)
sh.save('/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r137-equipo-frames.jpg',quality=86)
print(sh.size)
# onion: final vs gesture 1 and walk 9
fA=np.array(fin).astype(float); 
for p in ['andoni-canasta-01','eric-reves-01','andoni-canasta-08','eric-reves-08']:
  g=np.array(Image.open(O+p+'.webp')).astype(float)
  o=np.zeros_like(fA); o[...,0]=fA[...,3]; o[...,1]=g[...,3]; o[...,3]=255
  Image.fromarray(o.astype(np.uint8)).save(f'onion-{p}.png')
