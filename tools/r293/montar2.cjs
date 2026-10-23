// Favicon más grande: se encaja la MASA del árbol (alfa > 50 %), no las estelas; lo que sobresale del cuadrado se funde hacia el borde (nunca corte seco).
const sharp=require('sharp');
(async()=>{const ests=['otono','invierno','primavera','verano'];
for(const e of ests){
  const {data,info}=await sharp(`arbol-${e}.png`).raw().toBuffer({resolveWithObject:true});
  const W=info.width,H=info.height;let x0=W,x1=0,y0=H,y1=0;
  // caja de la masa: filas/columnas con suficiente alfa denso
  const col=new Array(W).fill(0),fil=new Array(H).fill(0);
  for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(data[(y*W+x)*4+3]>140){col[x]++;fil[y]++;}
  const umbralC=Math.max(...col)*0.16,umbralF=Math.max(...fil)*0.04;
  col.forEach((v,x)=>{if(v>umbralC){x0=Math.min(x0,x);x1=Math.max(x1,x)}});fil.forEach((v,y)=>{if(v>umbralF){y0=Math.min(y0,y);y1=Math.max(y1,y)}});
  // cuadrado centrado en la masa, que llega del pie del tronco a la copa
  const lado=Math.max(x1-x0,y1-y0)*1.02,cx=(x0+x1)/2,cy=(y0+y1)/2;
  const L=Math.round(lado),left=Math.round(cx-lado/2),top=Math.round(y1-lado+lado*0.01);
  const P=1200;const lienzo=await sharp(await sharp(`arbol-${e}.png`).extend({top:P,bottom:P,left:P,right:P,background:{r:0,g:0,b:0,alpha:0}}).png().toBuffer()).extract({left:left+P,top:top+P,width:L,height:L}).raw().toBuffer();
  // fundido de los 7 % de cada borde lateral y superior (las estelas no se cortan en seco)
  for(let y=0;y<L;y++)for(let x=0;x<L;x++){const m=Math.min(x,L-1-x,y)/(L*0.07);if(m<1){const i=(y*L+x)*4+3;lienzo[i]=Math.round(lienzo[i]*Math.max(0,m)*Math.max(0,m)*(3-2*Math.max(0,m))/ (1) );}}
  const cuad=await sharp(lienzo,{raw:{width:L,height:L,channels:4}}).png().toBuffer();
  console.log(e,{x0,x1,y0,y1,L});
  for(const [n,lado2] of [['favicon2-'+e,64],['favicon2-'+e+'-32',32],['grande2-'+e,512]])
    await sharp(cuad).resize(lado2,lado2,{kernel:"lanczos3"}).modulate({saturation:lado2<100?1.15:1}).sharpen(lado2<100?{sigma:0.5}:undefined).png().toFile(n+'.png');
}
const fondo=async(c,w,h)=>sharp({create:{width:w,height:h,channels:3,background:c}}).png().toBuffer();
const hojas=[];
for(const [bg,y] of [['#f1f1f1',0],['#2b2b2b',140]]){hojas.push({input:await fondo(bg,1100,140),left:0,top:y});
 let x=10;for(const e of ests){for(const s of [16,32,64]){hojas.push({input:await sharp('favicon2-'+e+(s===32?'-32':'')+'.png').resize(s,s).png().toBuffer(),left:x,top:y+(140-s)/2});x+=s+12}x+=40}}
hojas.push({input:await sharp('grande2-otono.png').resize(260,260).png().toBuffer(),left:820,top:10});
await sharp({create:{width:1100,height:280,channels:3,background:'#888'}}).composite(hojas).png().toFile('hoja2.png');
})();
