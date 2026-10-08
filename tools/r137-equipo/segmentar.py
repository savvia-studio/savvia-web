import numpy as np, json
from PIL import Image
from scipy import ndimage as ndi
im=np.array(Image.open('/Users/andonimart/Desktop/Storyboard de caminatas y gestos deportivos.png'))
a=im[...,3].astype(int)
mask=a>60
H,W=a.shape
lab_all=np.zeros(a.shape,np.int32); nid=0
for (y0,y1) in [(55,345),(385,695)]:
  band=np.zeros_like(mask); band[y0:y1]=mask[y0:y1]
  er=ndi.binary_erosion(band,iterations=4)
  up=np.zeros_like(er); cut=y0+int((y1-y0)*0.5); up[y0:cut]=er[y0:cut]
  lab,n=ndi.label(up)
  sizes=ndi.sum(up,lab,range(1,n+1))
  seeds=np.zeros(a.shape,np.int32)
  for k in range(1,n+1):
    if sizes[k-1]<800: continue
    reg=lab==k
    xs=np.nonzero(reg)[1]
    if xs.max()-xs.min()>120:  # merged pair: split at weakest column
      cols=reg.sum(0); lo,hi=xs.min()+50,xs.max()-50
      c=lo+int(np.argmin(cols[lo:hi])); print('split pair at',c)
      for part in (reg&(np.arange(W)<c), reg&(np.arange(W)>=c)):
        nid+=1; seeds[part]=nid
    else:
      nid+=1; seeds[reg]=nid
  # multi-source BFS inside band
  lb=seeds.copy()
  for it in range(400):
    d=ndi.grey_dilation(lb,size=3)
    new=(lb==0)&band&(d>0)
    if not new.any(): break
    lb[new]=d[new]
  lab_all[lb>0]=lb[lb>0]
figs=[]
for k in range(1,nid+1):
  ys,xs=np.nonzero(lab_all==k)
  if len(ys)<3000: continue
  figs.append(dict(id=k,x0=int(xs.min()),x1=int(xs.max())+1,y0=int(ys.min()),y1=int(ys.max())+1,n=len(ys)))
figs.sort(key=lambda f:(f['y0']>360,f['x0']))
for f in figs: print(f)
np.save('lab.npy',lab_all); json.dump(figs,open('figs.json','w'))
