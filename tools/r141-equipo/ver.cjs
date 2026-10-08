// RONDA 141 · capturas del paseo, el fundido a la foto y los gestos (sonda determinista window.__gesto)
const {chromium,webkit,launchOpts,userAgent}=require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp=require('/Users/andonimart/Desktop/savvia/savvia-web/node_modules/sharp');
const OUT='/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/';
const motor=process.argv[2]||'chrome',W=+(process.argv[3]||1280),H=+(process.argv[4]||720);
(async()=>{const b=motor==='webkit'?await webkit.launch():await chromium.launch(launchOpts);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,userAgent:motor==='webkit'?undefined:userAgent,hasTouch:W<500,isMobile:W<500&&motor!=='webkit'});
 await ctx.addInitScript(()=>{try{localStorage.setItem('savvia:carga','1')}catch{}});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>m.type()==='error'&&errs.push(m.text()));
 await p.goto('http://localhost:4322/?lenis=0',{waitUntil:'networkidle'});await p.waitForTimeout(800);
 const ir=async lin=>{await p.evaluate(lin=>{const el=document.querySelector('[data-paseo]');const vh=innerHeight,ch=el.offsetHeight;const top=el.getBoundingClientRect().top+scrollY;
   const rt=vh*0.96-lin*(vh*0.26+ch);scrollTo(0,top-rt);},lin);await p.waitForTimeout(350);};
 const clip=async()=>p.evaluate(()=>{const r=document.querySelector('[data-paseo]').getBoundingClientRect();return {x:0,y:Math.max(0,r.top-40),width:innerWidth,height:Math.min(innerHeight-Math.max(0,r.top-40),r.height+80)};});
 const tiras=[];const tag=`${motor}-${W}`;
 for(const lin of [0.25,0.5,0.8,0.91,0.94,0.96,0.975,0.99,1]){await ir(lin);const poses=await p.evaluate(()=>document.querySelector('[data-equipo]').dataset.poses);
  const buf=await p.screenshot({clip:await clip()});tiras.push({buf,lab:`lin ${lin} poses ${poses}`});}
 const hoja=async(arr,nombre,cols)=>{const w=640;const im=await Promise.all(arr.map(a=>sharp(a.buf).resize(w).toBuffer()));const metas=await Promise.all(im.map(x=>sharp(x).metadata()));const h=Math.max(...metas.map(m=>m.height))+28;
  const rows=Math.ceil(arr.length/cols);const comp=[];im.forEach((x,i)=>{const c=i%cols,r=Math.floor(i/cols);comp.push({input:x,left:c*w,top:r*h+28});comp.push({input:Buffer.from(`<svg width="${w}" height="28"><text x="8" y="20" font-size="16" font-family="monospace" fill="#c00">${arr[i].lab}</text></svg>`),left:c*w,top:r*h});});
  await sharp({create:{width:cols*w,height:rows*h,channels:3,background:'#fff'}}).composite(comp).jpeg({quality:82}).toFile(OUT+nombre);};
 await hoja(tiras,`r141-equipo-paseo-${tag}.jpg`,3);
 // gestos
 await ir(1);await p.waitForTimeout(400);
 for(const i of [0,1]){const g=[];const cl=await clip();
  for(const f of [-1,0,2,4,6,8,10,11]){await p.evaluate(([i,f])=>window.__gesto(i,f),[i,f]);await p.waitForTimeout(200);g.push({buf:await p.screenshot({clip:cl}),lab:`${i?'eric':'andoni'} f ${f<0?'foto':f+1}`});}
  await p.evaluate(i=>window.__gesto(i,-1),i);await hoja(g,`r141-equipo-gesto-${i?'eric':'andoni'}-${tag}.jpg`,4);}
 // gesto real con ratón: entrar, salir a mitad, comprobar que termina
 if(W>=1000){const z=await p.$('[data-zona="0"]');const bb=await z.boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(500);
  const mid=await p.evaluate(()=>document.querySelector('[data-juntos]').className);await p.mouse.move(5,5);await p.waitForTimeout(250);
  const tras=await p.evaluate(()=>document.querySelector('[data-juntos]').className);await p.waitForTimeout(1600);const fin=await p.evaluate(()=>document.querySelector('[data-juntos]').className);
  console.log('raton',{mid,tras,fin});}
 else{const z=await p.$('[data-zona="1"]');const bb=await z.boundingBox();await p.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height/2);await p.waitForTimeout(700);
  await p.screenshot({path:OUT+`r141-equipo-movil-tap-${tag}.jpg`,clip:{x:0,y:0,width:W,height:H},type:'jpeg',quality:80});console.log('tap',await p.evaluate(()=>document.querySelector('[data-juntos]').className+' mira='+document.querySelector('[data-juntos]').dataset.mira));}
 const dims=await p.evaluate(()=>{const j=document.querySelector('[data-juntos]').getBoundingClientRect();return {juntosH:j.height,dpr:devicePixelRatio};});console.log(tag,dims,'errs',errs);
 await b.close();})();
