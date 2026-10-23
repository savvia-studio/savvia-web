// variantes del favicon de invierno: A trazo reforzado sin halo · B silueta oscura con filo claro de 1 px · C roble nevado (blanco) con contorno oscuro · D sobre su noche (como los avatares)
const sharp=require('sharp');
const dil=(a,W,H,r)=>{const o=new Float32Array(W*H);for(let y=0;y<H;y++)for(let x=0;x<W;x++){let m=0;for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(dx*dx+dy*dy>r*r+.5)continue;const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=W||yy>=H)continue;m=Math.max(m,a[yy*W+xx])}o[y*W+x]=m}return o};
(async()=>{
 for(const L of [32,64]){
  // se engorda a 256 y se reduce: ramas con cuerpo sin emborronar
  const B=256,src=await sharp('grande2-invierno.png').resize(B,B).raw().toBuffer();
  const a=new Float32Array(B*B);for(let i=0;i<B*B;i++)a[i]=src[i*4+3]/255;
  const g=dil(a,B,B,L===32?2:1), g2=dil(g,B,B,L===32?4:3);
  const mk=async(fn,name)=>{const o=Buffer.alloc(B*B*4);for(let i=0;i<B*B;i++){const [r,gg,b,al]=fn(i);o[i*4]=r;o[i*4+1]=gg;o[i*4+2]=b;o[i*4+3]=Math.round(Math.min(1,al)*255)}
   await sharp(o,{raw:{width:B,height:B,channels:4}}).resize(L,L,{kernel:'lanczos3'}).png().toFile(`inv-${name}-${L}.png`)};
  await mk(i=>[58,40,32,g[i]*1.3],'A');
  await mk(i=>{const n=g[i]>0.5?1:0;return n?[58,40,32,1]:[245,243,240,g2[i]*0.95]},'B');
  await mk(i=>{const n=g[i]>0.5?1:0;return n?[240,240,244,1]:[58,40,32,g2[i]]},'C');
  await mk(i=>{const R=B*0.22,x=i%B,y=(i/B)|0;const cx=Math.max(R,Math.min(B-R,x)),cy=Math.max(R,Math.min(B-R,y));const dentro=Math.hypot(x-cx,y-cy)<=R;if(!dentro)return[0,0,0,0];return g[i]>0.5?[240,240,244,1]:[52,58,70,1]},'D');
 }
 const fondo=async(c,w,h)=>sharp({create:{width:w,height:h,channels:3,background:c}}).png().toBuffer();
 const hojas=[];for(const [bg,y] of [['#f1f1f1',0],['#2b2b2b',100],['#3b231b',200]]){hojas.push({input:await fondo(bg,760,100),left:0,top:y});let x=10;
  for(const v of ['actual','A','B','C','D']){for(const s of [16,32,64]){const f=v==='actual'?(s===32?'favicon3-invierno-32.png':'favicon3-invierno.png'):`inv-${v}-${s===16?32:s}.png`;hojas.push({input:await sharp(f).resize(s,s).png().toBuffer(),left:x,top:y+(100-s)/2});x+=s+10}x+=30}}
 await sharp({create:{width:760,height:300,channels:3,background:'#888'}}).composite(hojas).resize(1520,600,{kernel:'nearest'}).png().toFile('inv-hoja.png');
})();
