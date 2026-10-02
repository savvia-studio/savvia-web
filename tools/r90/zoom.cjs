const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async()=>{const b=await chromium.launch(launchOpts);const p=await (await b.newContext({viewport:{width:1280,height:720},deviceScaleFactor:4,userAgent})).newPage();
await p.goto('http://localhost:4331/?carga=0');await p.waitForTimeout(1200);
const t=await p.evaluate(()=>document.querySelector('#servicios .tabla').getBoundingClientRect().top+scrollY);
await p.evaluate(y=>scrollTo(0,y-200),t);await p.waitForTimeout(4500);
await p.screenshot({path:'tools/shots/r90-servicios-zoom.jpg',clip:{x:420,y:150,width:640,height:140},quality:80});await b.close();})();
