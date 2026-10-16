const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs'); const sharp = require('/Users/andonimart/Desktop/savvia/savvia-web-main/node_modules/sharp');
(async()=>{for (const [eng,opts] of [['chromium',pw.launchOpts],['webkit',{headless:true}]]){const b=await pw[eng].launch(opts);
const c=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});await c.addInitScript(()=>{try{localStorage.setItem('savvia:carga','1')}catch{}});
const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));await p.goto('http://localhost:4332/?carga=0',{waitUntil:'load',timeout:180000});await p.waitForTimeout(2000);
const m=p.locator('.mesa[data-mesa-quad]').filter({has:p.locator('.foto-e')}).first();await m.scrollIntoViewIfNeeded();await p.waitForTimeout(2000);const tiles=[];
for(const e of ['primavera','verano','otono','invierno']){await p.evaluate(e=>document.documentElement.dataset.estacion=e,e);await p.waitForTimeout(1500);
const vis=await m.evaluate(el=>[...el.querySelectorAll('.foto-e')].filter(i=>getComputedStyle(i).display!=='none').map(i=>i.dataset.e+':'+i.complete+':'+i.naturalWidth));console.log(eng,e,vis.join(' '));tiles.push(await m.screenshot())}
const cargadas=await p.evaluate(()=>performance.getEntriesByType('resource').filter(r=>r.name.includes('mesa-movil')).map(r=>r.name.split('/').pop()));console.log(eng,'descargadas',cargadas.join(' '),'errores',errs.length);
if(eng==='chromium'){const md=await sharp(tiles[0]).metadata();const w=Math.round(md.width/2),h=Math.round(md.height/2);await sharp({create:{width:w*4,height:h,channels:3,background:'#000'}}).composite(await Promise.all(tiles.map(async(t,i)=>({input:await sharp(t).resize(w,h).toBuffer(),left:i*w,top:0})))).jpeg({quality:75}).toFile(process.argv[2])}
await b.close()}})();
