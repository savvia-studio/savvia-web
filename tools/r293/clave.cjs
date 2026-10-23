const sharp=require('sharp');
(async()=>{for(const e of ['otono','invierno','primavera','verano']){
 const {data,info}=await sharp(`savvia-telegram-${e}.png`).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const W=info.width,H=info.height,o=Buffer.alloc(W*H*4);
 // fondo: media de las dos esquinas de abajo (el haz no llega)
 const med=(x0,y0)=>{let s=[0,0,0],n=0;for(let y=y0;y<y0+40;y++)for(let x=x0;x<x0+40;x++){const i=(y*W+x)*3;s[0]+=data[i];s[1]+=data[i+1];s[2]+=data[i+2];n++}return s.map(v=>v/n)};
 const a=med(5,H-60),b=med(W-45,H-60);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x),f=x/W;
  const bg=[0,1,2].map(k=>a[k]*(1-f)+b[k]*f);
  const c=[data[i*3],data[i*3+1],data[i*3+2]];
  const d=Math.hypot(c[0]-bg[0],c[1]-bg[1],c[2]-bg[2]);
  // el haz es claro y poco saturado: solo cuenta en la mitad de arriba; ahí se exige más diferencia
  const umbral=16; if(y<H*0.45){o[i*4+3]=0;continue;}
  let al=Math.max(0,Math.min(1,(d-umbral)/40));
  for(let k=0;k<3;k++) o[i*4+k]=al>0?Math.max(0,Math.min(255,bg[k]+(c[k]-bg[k])/Math.max(al,0.75))):0;
  o[i*4+3]=Math.round(al*255);}
 await sharp(o,{raw:{width:W,height:H,channels:4}}).png().toFile(`arbol-${e}.png`);console.log(e,a.map(Math.round),b.map(Math.round));}})();
