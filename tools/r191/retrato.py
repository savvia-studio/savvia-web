import sys,numpy as np,cv2
from PIL import Image
from rembg import remove
src,out=sys.argv[1],sys.argv[2]
im=Image.open(src).convert('RGB')
cut=np.array(remove(im))           # RGBA
a=cut[...,3].astype(np.float32)/255
g=cv2.cvtColor(np.array(im),cv2.COLOR_RGB2GRAY)
# local contrast like a drawing
g=cv2.createCLAHE(2.2,(8,8)).apply(g).astype(np.float32)/255
import os
FY=int(os.environ.get('FY','0'))
N=1254; S=float(os.environ.get('S','1.62'))
W=int(800*S)
g=cv2.resize(g,(W,W),interpolation=cv2.INTER_LANCZOS4); a=cv2.resize(a,(W,W),interpolation=cv2.INTER_LANCZOS4)
canv=np.ones((N,N),np.float32); A=np.zeros((N,N),np.float32)
ox=(N-W)//2+int(os.environ.get('DX','10')); oy=int(os.environ.get('OY','90'))-int(int(os.environ.get('TOP','140'))*S)
ys,ye=max(0,oy),min(N,oy+W); xs,xe=max(0,ox),min(N,ox+W)
canv[ys:ye,xs:xe]=g[ys-oy:ye-oy,xs-ox:xe-ox]; A[ys:ye,xs:xe]=a[ys-oy:ye-oy,xs-ox:xe-ox]
rng=np.random.default_rng(7)
BODY=float(os.environ.get('BODY','0'))
if BODY:
    yb=np.clip((np.mgrid[0:N,0:N][0].astype(np.float32)-(820+FY))/80,0,1)
    canv=canv*(1-BODY*yb)
# pencil grain: diagonal hatching noise
n=rng.standard_normal((N,N)).astype(np.float32)
k=np.zeros((25,25),np.float32); cv2.line(k,(0,24),(24,0),1,1); k/=k.sum()
hatch=cv2.filter2D(n,-1,k); hatch/=hatch.std()
canv=0.16+0.84*np.clip(canv,0,1)**0.85
tone=np.clip(canv+0.06*hatch*(1-canv*0.6),0,1)
# ragged brush-stroke dissolve on the lower body (vertical/diagonal streaks)
yy,xx=np.mgrid[0:N,0:N].astype(np.float32)
st=rng.standard_normal((N,N)).astype(np.float32)
kv=np.zeros((161,161),np.float32); cv2.line(kv,(50,0),(110,160),1,7); kv/=kv.sum()
streak=cv2.filter2D(st,-1,kv); streak/=streak.std()
coarse=cv2.GaussianBlur(rng.standard_normal((N,N)).astype(np.float32),(0,0),40); coarse/=coarse.std()
# fade begins around chest; also fade toward left/right edges of body
cx=N/2+10
d=(yy-860-FY)/300 + (np.abs(xx-cx)/520)**4*1.1
fade=np.clip(1.05-d+0.22*streak+0.18*coarse,0,1)
fade=np.clip((fade-0.3)/0.45,0,1); fade=cv2.GaussianBlur(fade,(0,0),1.6)
# head/neck region keeps full mask
w=np.clip((yy-760-FY)/140,0,1); fade=1*(1-w)+fade*w
M=np.clip(A*fade,0,1)
# soften hair edge slightly with grain
M=np.clip(M*(1+0.08*hatch),0,1)
# in the dissolve, strokes darker (charcoal smears)
smear=np.clip(0.12*np.maximum(streak,0)*np.clip((yy-800-FY)/160,0,1),0,0.12)
tone=np.clip(tone-smear*M,0,1)
outg=1-(1-tone)*M
outg=(outg*255).astype(np.uint8)
Image.fromarray(outg).convert('RGB').save(out,quality=88)
print('ok')
