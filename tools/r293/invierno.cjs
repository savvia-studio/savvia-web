// Invierno: ramas finas y oscuras que desaparecen en pestañas oscuras. Se engordan las ramas (dilatación del alfa) y se les pone un halo claro
// (la nieve de la lámina de Telegram de invierno es blanca: el árbol vive sobre claro), así se lee en pestaña clara y oscura.
const sharp=require('sharp');
(async()=>{
 const src='favicon2-invierno.png';
 for(const [lado,eng,halo] of [[64,1,2.2],[32,1,1.4],[512,6,14]]){
  const base=await sharp('grande2-invierno.png').resize(lado,lado,{kernel:'lanczos3'}).raw().toBuffer({resolveWithObject:true});
  const W=lado,H=lado,d=base.data,a=new Float32Array(W*H);for(let i=0;i<W*H;i++)a[i]=d[i*4+3]/255;
  // dilatación: el alfa toma el máximo de su vecindad
  const dil=new Float32Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){let m=0;for(let dy=-eng;dy<=eng;dy++)for(let dx=-eng;dx<=eng;dx++){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=W||yy>=H)continue;if(dx*dx+dy*dy>eng*eng+0.5)continue;m=Math.max(m,a[yy*W+xx])}dil[y*W+x]=m}
  // ramas: tinta de la corteza, oscura
  const ramas=Buffer.alloc(W*H*4);for(let i=0;i<W*H;i++){ramas[i*4]=58;ramas[i*4+1]=40;ramas[i*4+2]=32;ramas[i*4+3]=Math.round(Math.min(1,dil[i]*1.4)*255)}
  const rb=await sharp(ramas,{raw:{width:W,height:H,channels:4}}).png().toBuffer();
  // halo claro: la silueta engordada, desenfocada, en blanco nieve
  const h=Buffer.alloc(W*H*4);for(let i=0;i<W*H;i++){h[i*4]=246;h[i*4+1]=246;h[i*4+2]=248;h[i*4+3]=Math.round(Math.min(1,dil[i]*2)*255)}
  const hb=await sharp(await sharp(h,{raw:{width:W,height:H,channels:4}}).png().toBuffer()).blur(halo).toBuffer();
  const hb2=await sharp(hb).ensureAlpha().raw().toBuffer({resolveWithObject:true});for(let i=3;i<hb2.data.length;i+=4)hb2.data[i]=Math.min(255,hb2.data[i]*2.2);
  const halob=await sharp(hb2.data,{raw:{width:W,height:H,channels:4}}).png().toBuffer();
  const out=lado===512?'grande3-invierno.png':lado===32?'favicon3-invierno-32.png':'favicon3-invierno.png';
  await sharp({create:{width:W,height:H,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite([{input:halob},{input:rb}]).png().toFile(out);
 }
 const fondo=async(c,w,h)=>sharp({create:{width:w,height:h,channels:3,background:c}}).png().toBuffer();
 const hojas=[];for(const [bg,y] of [['#f1f1f1',0],['#2b2b2b',120],['#3b231b',240]]){hojas.push({input:await fondo(bg,700,120),left:0,top:y});let x=10;
  for(const [pre] of [['favicon2'],['favicon3']]){for(const s of [16,32,64]){hojas.push({input:await sharp(pre+'-invierno'+(s===32?'-32':'')+'.png').resize(s,s).png().toBuffer(),left:x,top:y+(120-s)/2});x+=s+14}x+=60}
  for(const e of ['otono','primavera','verano']){hojas.push({input:await sharp('favicon2-'+e+'-32.png').png().toBuffer(),left:x,top:y+44});x+=46}}
 await sharp({create:{width:700,height:360,channels:3,background:'#888'}}).composite(hojas).resize(1400).png().toFile('hoja-inv.png');
})();
