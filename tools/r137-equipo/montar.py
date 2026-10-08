# RONDA 137 · storyboard de Andoni → tiras de andar, pose final y gestos (canasta / revés). Requiere lab.npy y figs.json de segmentar.py.
import numpy as np, json, sys, os
from PIL import Image
D=sys.argv[1]; OUT=sys.argv[2]
SRC='/Users/andonimart/Desktop/Storyboard de caminatas y gestos deportivos.png'
im=np.array(Image.open(SRC)).astype(np.float32)
lab=np.load(D+'/lab.npy'); figs=json.load(open(D+'/figs.json'))
HS=320.0; BASE=HS*0.965; K=1.5  # lienzo (unidades del tablero), línea de pies, escala de salida
row1=[f for f in figs if f['y0']<360]; row2=[f for f in figs if f['y0']>=360]
A_walk=row1[0:9]; pairs=row1[9:11]; E_walk=list(reversed(row1[11:20]))
A_g=row2[0:8]; E_g=row2[8:16]
def cut(f, extra=None):
  y0,y1,x0,x1=f['y0'],f['y1'],f['x0'],f['x1']
  reg=extra[y0:y1,x0:x1] if extra is not None else lab[y0:y1,x0:x1]==f['id']
  c=im[y0:y1,x0:x1].copy(); al=c[...,3]*reg; al[al<25]=0; c[...,3]=al
  return c,x0,y0
# la pareja: corte vertical en x=1078 (las manos se tocan; medido en el tablero)
pm=np.zeros(lab.shape,bool)
for p in pairs: pm|=lab==p['id']
X=np.arange(lab.shape[1])[None,:]
pA=dict(y0=min(p['y0'] for p in pairs),y1=max(p['y1'] for p in pairs),x0=1000,x1=1170); pE=dict(pA)
mA=pm&(X<1078); mE=pm&(X>=1078)
def metr(c):
  a=c[...,3]; s=a>200; rows=np.nonzero(s.sum(1)>=3)[0]; top,bot=rows[0],rows[-1]
  h=bot-top; ys,xs=np.nonzero(s)
  t=(ys>top+0.14*h)&(ys<top+0.5*h); torso=xs[t].mean()
  f=ys>bot-0.06*h; feet=xs[f].mean()
  chest=xs[(ys>top+0.27*h)&(ys<top+0.33*h)].mean()
  return dict(top=top,bot=bot,h=h,torso=torso,feet=feet,chest=chest,xmin=xs.min(),xmax=xs.max())
def premul_resize(c,s):
  h,w=c.shape[:2]; p=c.copy(); p[...,:3]*=p[...,3:]/255
  r=np.stack([np.array(Image.fromarray(p[...,i]).resize((max(1,round(w*s)),max(1,round(h*s))),Image.LANCZOS)) for i in range(4)],-1)
  r[...,3]=np.clip(r[...,3],0,255); r[...,:3]=np.where(r[...,3:]>0.5,r[...,:3]*255/np.maximum(r[...,3:],1e-3),0)
  return np.clip(r,0,255)
def paste(canvas,c,ox,oy):
  # c en unidades de salida, ox/oy esquina en píxeles de salida (float → redondeo)
  ox,oy=int(round(ox)),int(round(oy)); h,w=c.shape[:2]; H,W=canvas.shape[:2]
  sx0,sy0=max(0,-ox),max(0,-oy); dx0,dy0=max(0,ox),max(0,oy); w2=min(w-sx0,W-dx0); h2=min(h-sy0,H-dy0)
  if w2<=0 or h2<=0: return 0
  src=c[sy0:sy0+h2,sx0:sx0+w2]; dst=canvas[dy0:dy0+h2,dx0:dx0+w2]
  a=src[...,3:]/255; dst[...,:3]=src[...,:3]*a+dst[...,:3]*(1-a); dst[...,3:]=src[...,3:]+dst[...,3:]*(1-a)
  return int((c[...,3]>30).sum()-(src[...,3]>30).sum())  # píxeles recortados
def save(arr,name): Image.fromarray(np.clip(arr,0,255).astype(np.uint8)).save(os.path.join(OUT,name),'WEBP',quality=88,alpha_quality=95,method=6)
info={}
# ── pose final: la pareja centrada, pies (el más bajo) en BASE
cA,_,_=cut(pA,mA); cE,_,_=cut(pE,mE)
mAf=metr(cA); mEf=metr(cE)
FW=HS*1.2
pair_x0=pA['x0']; bot=max(mAf['bot'],mEf['bot'])
cx=( (mAf['xmin'])+(mEf['xmax']) )/2  # centro de la pareja (coords del recorte)
offx=FW/2-cx; offy=BASE-bot   # recorte → lienzo (unidades tablero)
fin=np.zeros((round(HS*K),round(FW*K),4),np.float32)
for c in (cA,cE): paste(fin,premul_resize(c,K),offx*K,offy*K)
save(fin,'juntos-r137.webp')
def can(m,k): return {kk:(m[kk]+(offx if kk in('torso','feet','chest','xmin','xmax') else offy if kk in ('top','bot') else 0)) for kk in m}
FA=can(mAf,0); FE=can(mEf,0)
info['final']=dict(A=FA,E=FE,HS=HS,FW=FW)
# ── andar: celdas 0,6·HS; torso al centro, pies en la línea de su pose de llegada; escala = alto de la pose final / alto del fotograma 9 (de pie)
CW=HS*0.6
def tira(frames,F,name):
  cs=[cut(f)[0] for f in frames]; ms=[metr(c) for c in cs]
  s=F['h']/ms[-1]['h']
  strip=np.zeros((round(HS*K),round(CW*K)*len(cs),4),np.float32); lost=[]
  for i,(c,m) in enumerate(zip(cs,ms)):
    cell=np.zeros((round(HS*K),round(CW*K),4),np.float32)
    lost.append(paste(cell,premul_resize(c,K*s),(CW/2-m['torso']*s)*K,(F['bot']-m['bot']*s)*K))
    strip[:,i*round(CW*K):(i+1)*round(CW*K)]=cell
  save(strip,name); return dict(scale=s,lost=lost,h=[m['h'] for m in ms])
info['andaA']=tira(A_walk,FA,'andoni-anda.webp'); info['andaE']=tira(E_walk,FE,'eric-anda.webp')
# ── gestos: lienzo de la pose final; fotograma 1 encajado en la pose final (torso, línea de pies y alto); los demás siguen los pies del 1; los demás, por sus pies y la altura que tenían en el tablero
def gesto(frames,F,pref):
  cs=[cut(f)[0] for f in frames]; ms=[metr(c) for c in cs]; s=F['h']/ms[0]['h']
  b0=frames[0]['y0']+ms[0]['bot']; out=[]
  ox=lambda m: F['torso']-ms[0]['torso']*s+(ms[0]['feet']-m['feet'])*s
  corr=F['torso']-(ox(ms[-1])+ms[-1]['torso']*s)  # el último vuelve al sitio de la pose final (sin salto al soltar)
  W8=[0,0,0,0,0,1/3,2/3,1]
  for i,(f,c,m) in enumerate(zip(frames,cs,ms)):
    cv=np.zeros((round(HS*K),round(FW*K),4),np.float32)
    by=(frames[i]['y0']+m['bot'])-b0   # desplazamiento vertical de sus pies en el tablero
    lost=paste(cv,premul_resize(c,K*s),(ox(m)+W8[i]*corr)*K,(F['bot']+by*s-m['bot']*s)*K)
    n=f'{pref}-{i+1:02d}.webp'; save(cv,n); out.append(dict(n=n,lost=lost))
  return dict(scale=s,frames=out)
info['gA']=gesto(A_g,FA,'andoni-canasta'); info['gE']=gesto(E_g,FE,'eric-reves')
json.dump(info,open(os.path.join(D,'info.json'),'w'),default=float,indent=1)
print(json.dumps(info,default=lambda x:round(float(x),2),indent=0)[:3000])
