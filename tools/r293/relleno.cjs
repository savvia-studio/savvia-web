const sharp=require('sharp');
(async()=>{for(const e of ['otono','invierno','primavera','verano']){
 const src=await sharp(`savvia-telegram-${e}.png`).removeAlpha().raw().toBuffer();
 const {data,info}=await sharp(`arbol-${e}.png`).raw().toBuffer({resolveWithObject:true});
 const W=info.width,H=info.height,al=Buffer.alloc(W*H);
 for(let i=0;i<W*H;i++)al[i]=data[i*4+3];
 // cierre: desenfoque del alfa y umbral → tapa los huecos oscuros de la copa (invierno: ramas finas, sin cierre)
 const r=e==='invierno'?0:30;
 let lleno=al;
 if(r){lleno=await sharp(al,{raw:{width:W,height:H,channels:1}}).blur(r).extractChannel(0).raw().toBuffer();}
 for(let i=0;i<W*H;i++){
   const f=r?Math.max(0,Math.min(1,(lleno[i]-120)/30)):0;
   const a=Math.max(al[i]/255,f);
   if(f>al[i]/255){for(let k=0;k<3;k++)data[i*4+k]=src[i*3+k];}
   data[i*4+3]=Math.round(a*255);}
 await sharp(data,{raw:info}).png().toFile(`arbol-${e}.png`);}})();
