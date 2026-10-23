// Firma estilo «una línea sobre el árbol»: roble de la casa en gris muy tenue + un solo trazo fino que recorre copa, horquilla y tronco.
const sharp=require('sharp');
const [,,SALIDA,QUIEN='andoni',GUIA]=process.argv;
const W=480,H=300;
// trazos en coordenadas 0..1 del lienzo (cubic path); uno por persona, el mismo roble dibujado a su manera
const T={
 andoni:'M .03 .30 C .24 .44 .48 .52 .66 .45 S .90 .30 .97 .17 M .38 .08 C .36 .30 .48 .46 .64 .52 M .80 .48 C .63 .42 .58 .21 .68 .10 C .77 .01 .90 .10 .86 .25 C .82 .37 .67 .41 .58 .35 M .71 .53 L .50 .61 C .63 .63 .82 .71 .80 .85 C .78 .97 .63 1.0 .52 1.0',
 eric:'M .05 .40 C .14 .20 .36 .05 .58 .08 S .90 .22 .97 .38 M .24 .32 C .40 .48 .60 .48 .72 .34 C .79 .24 .70 .14 .61 .20 C .54 .26 .58 .38 .70 .40 M .63 .46 L .46 .57 C .58 .61 .76 .68 .74 .83 C .72 .95 .60 .99 .50 1.0',
};
const d=T[QUIEN].replace(/(-?\d*\.\d+|-?\d+)\s+(-?\d*\.\d+|-?\d+)/g,(m,x,y)=>`${(x*W).toFixed(1)} ${(y*(H-8)+4).toFixed(1)}`);
(async()=>{
 // árbol: el de otoño recortado, en gris, muy claro (como la foto lavada de la referencia)
 const arbol=await sharp(await sharp(require('path').join(__dirname,'arbol-otono.png')).trim({threshold:1}).toBuffer()).resize(Math.round(W*0.92),Math.round(H*1.0),{fit:'contain',background:{r:0,g:0,b:0,alpha:0},position:'bottom'}).grayscale().linear(0.55,110).ensureAlpha().png().toBuffer();
 const {data,info}=await sharp(arbol).raw().toBuffer({resolveWithObject:true});
 for(let i=3;i<data.length;i+=4)data[i]=Math.round(data[i]*0.42);
 const tenue=await sharp(data,{raw:info}).png().toBuffer();
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><path d="${d}" fill="none" stroke="#1E1714" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
 const capas=[{input:tenue,left:Math.round(W*0.04),top:0}];
 if(GUIA!=='solo-arbol')capas.push({input:Buffer.from(svg),left:0,top:0});
 await sharp({create:{width:W,height:H,channels:4,background:{r:0,g:0,b:0,alpha:0}}}).composite(capas).png({palette:true,colors:64,compressionLevel:9}).toFile(SALIDA);
 console.log(SALIDA);
})();
