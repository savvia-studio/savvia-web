// RONDA 141 · poses reconstruidas (48, lienzo 480×520, nativas) → paseos en tira y gestos sueltos, alineados a la foto real juntos-r140.webp.
//  · Paseo: una escala por serie; cada fotograma desplazado en px ENTEROS para que su pecho caiga en el mismo x (sin remuestrear) y su pie en
//    la línea 499. Tira de 12 celdas. El 12 se encaja sobre la figura de la foto (alto, y luego el máximo solape de máscaras con la cara pesando ×4).
//  · Gesto: 01 y 12 encajados igual sobre la foto; los intermedios con escala, cadera y pies interpolados entre los dos. Recortados a su silueta.
const sharp=require('sharp'),fs=require('fs'),path=require('path');const {rgba}=require('./medir.cjs');const {mascaraFoto,ajustar}=require('./ajuste.cjs');
const SRC='tools/r141-equipo/fuente/poses',OUT='public/media/equipo/r141';fs.mkdirSync(OUT,{recursive:true});
function m(im){const {data,w,h}=im;const A=(x,y)=>data[(y*w+x)*4+3]>40;let t=1e9,b=-1,l=1e9,r=-1;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(A(x,y)){t=Math.min(t,y);b=Math.max(b,y);l=Math.min(l,x);r=Math.max(r,x);}
 const H=b-t,cen=(f0,f1)=>{let s=0,n=0;for(let y=t+Math.round(H*f0);y<=t+Math.round(H*f1);y++)for(let x=0;x<w;x++)if(A(x,y)){s+=x;n++;}return s/n;};
 return {l,t,r,b,H,pecho:cen(.2,.34),cadera:cen(.46,.58)};}
function mf(im,x0,x1){const {data,w,h}=im;const A=(x,y)=>data[(y*w+x)*4+3]>40;let t=1e9,b=-1;for(let y=0;y<h;y++)for(let x=x0;x<x1;x++)if(A(x,y)){t=Math.min(t,y);b=Math.max(b,y);}
 const H=b-t;let s=0,n=0;for(let y=t+Math.round(H*.2);y<=t+Math.round(H*.34);y++)for(let x=x0;x<x1;x++)if(A(x,y)){s+=x;n++;}return {t,b,H,pecho:s/n};}
const lerp=(a,b,k)=>a+(b-a)*k,r4=v=>+v.toFixed(3);
(async()=>{
 const foto=await rgba('public/media/equipo/juntos-r140.webp');
 const series={a:{paseo:'andoni-paseo',gesto:'andoni-canasta',x0:0,x1:568,cabeza:300},e:{paseo:'eric-paseo',gesto:'eric-reves',x0:568,x1:1200,cabeza:230}};
 const res={};
 for(const [k,S] of Object.entries(series)){
  const F=mf(foto,S.x0,S.x1),M=await mascaraFoto(S.x0,S.x1);
  const encajar=async(p,f)=>{const s0=F.H/f.H;return ajustar(p,M,s0,F.pecho-f.pecho*s0,F.b-f.b*s0,S.cabeza);};
  const fr=[];for(let i=1;i<=12;i++){const p=path.join(SRC,S.paseo,String(i).padStart(2,'0')+'.png');fr.push({p,...m(await rgba(p))});}
  const ref=fr[11];const dxs=fr.map(f=>Math.round(ref.pecho-f.pecho)),pad=Math.max(...dxs.map(Math.abs))+4,CW=480+2*pad;
  await sharp({create:{width:CW*12,height:520,channels:4,background:{r:0,g:0,b:0,alpha:0}}})
   .composite(fr.map((f,i)=>({input:f.p,left:i*CW+pad+dxs[i],top:499-f.b}))).webp({quality:90,alphaQuality:100,effort:6}).toFile(`${OUT}/${k}-paseo.webp`);
  const e12=await encajar(ref.p,ref);
  res[k]={paseo:{src:`/media/equipo/r141/${k}-paseo.webp`,s:r4(e12.s),celda:CW,alto:520,izq:r4(e12.X-pad*e12.s),arriba:r4(e12.Y-(499-ref.b)*e12.s),iou:r4(e12.iou)}};
  const g=[];for(let i=1;i<=12;i++){const p=path.join(SRC,S.gesto,String(i).padStart(2,'0')+'.png');g.push({p,...m(await rgba(p))});}
  const a1=await encajar(g[0].p,g[0]),a12=await encajar(g[11].p,g[11]);
  const cad1=a1.X+g[0].cadera*a1.s,cad12=a12.X+g[11].cadera*a12.s,pie1=a1.Y+g[0].b*a1.s,pie12=a12.Y+g[11].b*a12.s;
  const marcos=[];
  for(let i=0;i<12;i++){const f=g[i],q=i/11;let sk,X,Y;
   if(i===0){({s:sk,X,Y}=a1);}else if(i===11){({s:sk,X,Y}=a12);}else{sk=lerp(a1.s,a12.s,q);X=lerp(cad1,cad12,q)-f.cadera*sk;Y=lerp(pie1,pie12,q)-f.b*sk;}
   const l=Math.max(0,f.l-2),t=Math.max(0,f.t-2),w=Math.min(480,f.r+3)-l,h=Math.min(520,f.b+3)-t;
   const nom=`${k}-gesto-${String(i+1).padStart(2,'0')}.webp`;
   await sharp(f.p).extract({left:l,top:t,width:w,height:h}).webp({quality:90,alphaQuality:100,effort:6}).toFile(`${OUT}/${nom}`);
   marcos.push({src:`/media/equipo/r141/${nom}`,x:r4((X+l*sk)/12),y:r4((Y+t*sk)/10),w:r4(w*sk/12),h:r4(h*sk/10)});}
  res[k].gesto={s1:r4(a1.s),s12:r4(a12.s),iou:[r4(a1.iou),r4(a12.iou)],marcos};
 }
 fs.writeFileSync('tools/r141-equipo/montaje.json',JSON.stringify(res,null,1));
 console.log(JSON.stringify({a:res.a.paseo,e:res.e.paseo,ga:[res.a.gesto.s1,res.a.gesto.s12,res.a.gesto.iou],ge:[res.e.gesto.s1,res.e.gesto.s12,res.e.gesto.iou]}));
})();
