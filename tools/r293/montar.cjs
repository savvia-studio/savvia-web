const sharp=require('sharp');
(async()=>{
const ests=['otono','invierno','primavera','verano'];const fichas=[];
for(const e of ests){
  // alfa limpia: quita el ruido por debajo de 8 % y recorta a la masa del árbol
  const {data,info}=await sharp(`arbol-${e}.png`).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  for(let i=3;i<data.length;i+=4) data[i]=data[i]<20?0:data[i];
  const limpia=await sharp(data,{raw:info}).png().toBuffer();
  const t=await sharp(limpia).trim({threshold:1}).toBuffer({resolveWithObject:true});
  console.log(e,t.info.width,t.info.height);
  for(const [n,lado,margen] of [['favicon-'+e,64,2],['favicon-'+e+'-32',32,1],['grande-'+e,512,16]]){
    const dentro=lado-2*margen;
    const img=await sharp(t.data).resize(dentro,dentro,{fit:'contain',background:{r:0,g:0,b:0,alpha:0},kernel:'lanczos3'}).png().toBuffer();
    await sharp({create:{width:lado,height:lado,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:img,left:margen,top:margen}]).png().toFile(n+'.png');
  }
}
// hoja de prueba: sobre pestaña clara y oscura, a 16/32/64
const comps=[];let x=10;
for(const e of ests){for(const [bg,y] of [['#f1f1f1',10],['#202124',150]]){}
}
const fondo=async(c,w,h)=>sharp({create:{width:w,height:h,channels:3,background:c}}).png().toBuffer();
const hojas=[];
for(const [bg,y] of [['#f1f1f1',0],['#2b2b2b',140]]){hojas.push({input:await fondo(bg,1100,140),left:0,top:y});
 let x=10;for(const e of ests){for(const s of [16,32,64]){hojas.push({input:await sharp('favicon-'+e+(s===32?'-32':'')+'.png').resize(s,s).png().toBuffer(),left:x,top:y+(140-s)/2});x+=s+12}x+=40}}
hojas.push({input:await sharp('grande-otono.png').resize(260,260).png().toBuffer(),left:820,top:10});
await sharp({create:{width:1100,height:280,channels:3,background:'#888'}}).composite(hojas).png().toFile('hoja.png');
})();
