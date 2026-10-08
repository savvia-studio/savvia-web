// RONDA 141 · mide bbox, alto, torso (x) y pies (x) de cada pose y de las dos mitades de juntos-r140.webp
const sharp=require('sharp'),fs=require('fs'),path=require('path');
async function rgba(f){const {data,info}=await sharp(f).ensureAlpha().raw().toBuffer({resolveWithObject:true});return {data,w:info.width,h:info.height};}
function medir(im,x0=0,x1=im.w){const {data,w,h}=im;let t=1e9,b=-1,l=1e9,r=-1;const A=(x,y)=>data[(y*w+x)*4+3]>40;
 for(let y=0;y<h;y++)for(let x=x0;x<x1;x++)if(A(x,y)){if(y<t)t=y;if(y>b)b=y;if(x<l)l=x;if(x>r)r=x;}
 const H=b-t;const cen=(y0,y1)=>{let s=0,n=0;for(let y=y0;y<=y1;y++)for(let x=x0;x<x1;x++)if(A(x,y)){s+=x;n++;}return s/n;};
 return {l,t,r,b,H,torso:+cen(t+Math.round(H*.18),t+Math.round(H*.42)).toFixed(1),hombro:+cen(t+Math.round(H*.18),t+Math.round(H*.24)).toFixed(1),pies:+cen(b-Math.round(H*.04),b).toFixed(1)};}
module.exports={rgba,medir};
if(require.main===module)(async()=>{const base='tools/r141-equipo/fuente/poses',out={};
 for(const s of fs.readdirSync(base).sort()){out[s]=[];for(const f of fs.readdirSync(path.join(base,s)).sort()){const m=medir(await rgba(path.join(base,s,f)));out[s].push(m);console.log(s,f,JSON.stringify(m));}}
 const j=await rgba('public/media/equipo/juntos-r140.webp');out.juntos=[medir(j,0,568),medir(j,568,j.w)];console.log('juntos',j.w,j.h,JSON.stringify(out.juntos));
 fs.writeFileSync('tools/r141-equipo/medidas.json',JSON.stringify(out,null,1));})();
