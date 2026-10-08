// RONDA 141 · ajuste fino: escala y posición de una pose sobre la figura de la foto que MÁS se solapen (IoU de máscaras, la cara pesa ×4).
// Búsqueda gruesa (rejilla de 6 px) y luego fina alrededor del mejor (rejilla de 3 px).
const {rgba}=require('./medir.cjs');
async function mascaraFoto(x0,x1){const f=await rgba('public/media/equipo/juntos-r140.webp');const M=new Uint8Array(f.w*f.h);let t=1e9,b=0;
 for(let y=0;y<f.h;y++)for(let x=x0;x<x1;x++)if(f.data[(y*f.w+x)*4+3]>100){M[y*f.w+x]=1;t=Math.min(t,y);b=Math.max(b,y);}return {M,w:f.w,h:f.h,x0,x1,t,b};}
async function ajustar(posePath,foto,s0,X0,Y0,headTop){const p=await rgba(posePath);const P=new Uint8Array(p.w*p.h);for(let i=0;i<P.length;i++)P[i]=p.data[i*4+3]>100?1:0;
 const iou=(s,X,Y,g)=>{let inter=0,uni=0;const xa=Math.floor(Math.max(0,Math.min(foto.x0,X)-10)),xb=Math.min(foto.w,Math.max(foto.x1,X+p.w*s)+10);
  for(let fy=Math.max(0,foto.t-60);fy<foto.h;fy+=g){const py=Math.round((fy-Y)/s),wg=fy<headTop?4:1;for(let fx=xa;fx<xb;fx+=g){const px=Math.round((fx-X)/s);
   const a=px>=0&&py>=0&&px<p.w&&py<p.h?P[py*p.w+px]:0,b=foto.M[fy*foto.w+fx];if(!a&&!b)continue;if(a&&b)inter+=wg;uni+=wg;}}return inter/uni;};
 let best={iou:-1};
 for(let ds=-0.03;ds<=0.0301;ds+=0.015)for(let dx=-80;dx<=80;dx+=8)for(let dy=-24;dy<=56;dy+=8){const v=iou(s0*(1+ds),X0+dx,Y0+dy,6);if(v>best.iou)best={iou:v,ds,dx,dy};}
 const c=best;best={iou:-1};
 for(let ds=c.ds-0.01;ds<=c.ds+0.0101;ds+=0.005)for(let dx=c.dx-8;dx<=c.dx+8;dx+=2)for(let dy=c.dy-8;dy<=c.dy+8;dy+=2){const v=iou(s0*(1+ds),X0+dx,Y0+dy,3);if(v>best.iou)best={iou:v,ds,dx,dy};}
 return {...best,s:s0*(1+best.ds),X:X0+best.dx,Y:Y0+best.dy};}
module.exports={mascaraFoto,ajustar};
