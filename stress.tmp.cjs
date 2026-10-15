const { chromium } = require('/Users/ericruiz/ShipStudio/andonimart-multiverse-home/node_modules/playwright-core');
(async()=>{const b=await chromium.launch({executablePath:'/Users/ericruiz/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
const p=await b.newPage({viewport:{width:1440,height:900}});
await p.goto('http://localhost:3935/',{waitUntil:'load'});await p.waitForTimeout(1500);await p.keyboard.press('Escape');await p.waitForTimeout(800);
const slugs=['wisable','kymatio','cubbo','transcend-network','monad','thx'];
const est=(s)=>p.evaluate((s)=>{const pz=document.querySelector('[data-slug='+s+']'),v=pz.querySelector('video');return {t:+v.currentTime.toFixed(2),pausado:v.paused,seeking:v.seeking,centra:pz.classList.contains('centra'),suena:pz.classList.contains('suena')}},s);
let malos=0;
for(let i=0;i<40;i++){
  const s=slugs[i%slugs.length];const el=p.locator('[data-slug='+s+'] .lamina');await el.scrollIntoViewIfNeeded();await p.waitForTimeout(500);
  const bx=await el.boundingBox();const dwell=[30,80,150,300,700,1500,3000][i%7];
  await p.mouse.move(bx.x+bx.width/2,bx.y+bx.height/2,{steps:i%3?1:6});await p.waitForTimeout(dwell);
  if(i%4===0){ // salir hacia otra pieza vecina o hacia el borde
    await p.mouse.move(bx.x+bx.width+40,bx.y+bx.height/2,{steps:4});
  } else await p.mouse.move(5,5,{steps:i%2?1:8});
  await p.waitForTimeout(1500);const r=await est(s);
  const mal=r.t>0.05||!r.pausado||r.centra||r.suena; if(mal){malos++;console.log('MAL',s,'dwell',dwell,JSON.stringify(r))}
}
console.log('malos',malos,'de 40');await b.close()})()
