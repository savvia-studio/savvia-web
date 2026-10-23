// /sistema en las cuatro estaciones: por cada una, se fija como lo hace la web (data-estacion + theme-color + savvia:estacion) y se capturan las secciones
const {chromium,launchOpts}=require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const SECC=['mapa','logotipo','construccion','color','tipografia','espaciado','radios','voz','iconografia','materia','aplicaciones','descargas','stack','componentes','piezas','herramientas'];
const EST=['otono','invierno','primavera','verano'],HEX=['#3b231b','#f5f5f7','#3a2932','#1b3125'];
(async()=>{const b=await chromium.launch(launchOpts);const p=await b.newPage({viewport:{width:1280,height:720}});
const err=[];p.on('pageerror',e=>err.push(e.message));p.on('console',m=>{if(m.type()==='error')err.push(m.text())});
await p.goto('http://localhost:4332/sistema?firma=color',{waitUntil:'networkidle'});await p.waitForTimeout(1200);
for(const [n,e] of EST.entries()){
  for(const id of SECC){
    await p.evaluate((id)=>{const el=document.getElementById(id);el.scrollIntoView({block:'start',behavior:'instant'});},id);
    await p.waitForTimeout(250);
    // la sección de color fija su propia estación al pasar; se vuelve a imponer la del ensayo después del scroll
    await p.evaluate(([n,e,h])=>{if(document.documentElement.dataset.estacion!==e){document.documentElement.dataset.estacion=e;document.querySelector('meta[name="theme-color"]')?.setAttribute('content',h);dispatchEvent(new CustomEvent('savvia:estacion',{detail:{n,origen:'prueba'}}));}},[n,e,HEX[n]]);
    await p.waitForTimeout(id==='descargas'?900:450);
    await p.screenshot({path:`${process.argv[2]}/est/${e}-${id}.jpg`,type:'jpeg',quality:70});
  }
  const info=await p.evaluate(()=>({est:document.documentElement.dataset.estacion,favicon:document.querySelector('[data-icono]')?.getAttribute('href'),apple:document.querySelector('[data-icono-apple]')?.getAttribute('href'),firma:[...document.querySelectorAll('.dl-papel img, .dc-firma img')].map(i=>i.getAttribute('src')).join(' '),noche:getComputedStyle(document.documentElement).getPropertyValue('--noche').trim()}));
  console.log(JSON.stringify(info));
}
console.log('errores',err.slice(0,8));await b.close();})();
