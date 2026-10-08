// RONDA 141 · comprobación: último fotograma del paseo y 01/12 del gesto sobre la foto real (tintados) → hoja
const sharp=require('sharp'),fs=require('fs');const J=JSON.parse(fs.readFileSync('tools/r141-equipo/montaje.json'));
const out=process.argv[2]||'tools/r141-equipo/superposicion.jpg';
(async()=>{const capas=[];
 for(const k of ['a','e']){const P=J[k].paseo;
  const cel=await sharp(`public/media/equipo/r141/${k}-paseo.webp`).extract({left:11*P.celda,top:0,width:P.celda,height:520}).toBuffer();
  const w=Math.round(P.celda*P.s),h=Math.round(520*P.s);
  const res=await sharp(cel).resize(w,h).tint({r:255,g:40,b:40}).ensureAlpha(0.5).toBuffer();
  // bajar opacidad: multiplicar alfa
  const {data,info}=await sharp(res).raw().toBuffer({resolveWithObject:true});for(let i=3;i<data.length;i+=4)data[i]=data[i]*0.5;
  capas.push({input:await sharp(data,{raw:info}).png().toBuffer(),left:Math.round(P.izq),top:Math.round(P.arriba)});}
 const base=await sharp('public/media/equipo/juntos-r140.webp').flatten({background:'#eee'}).toBuffer();
 const lienzo=await sharp({create:{width:2600,height:1800,channels:3,background:'#eee'}}).composite([{input:base,left:700,top:500}]).png().toBuffer();
 await sharp(lienzo).composite(capas.map(c=>({...c,left:c.left+700,top:c.top+500}))).jpeg({quality:85}).toFile(out);
 // gestos 01 y 12
 for(const n of [0,11]){const cs=[];for(const k of ['a','e']){const M=J[k].gesto.marcos[n];
   const w=Math.round(M.w*12),h=Math.round(M.h*10);const res=await sharp('public'+M.src).resize(w,h).tint({r:40,g:60,b:255}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
   for(let i=3;i<res.data.length;i+=4)res.data[i]*=0.5;cs.push({input:await sharp(res.data,{raw:res.info}).png().toBuffer(),left:Math.round(M.x*12)+700,top:Math.round(M.y*10)+500});}
  await sharp(lienzo).composite(cs).jpeg({quality:85}).toFile(out.replace('.jpg',`-gesto${n+1}.jpg`));}
})();
