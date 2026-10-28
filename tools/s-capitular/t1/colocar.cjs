// Las variantes de T1 en el manifiesto, con la misma receta que la T1 de la sección «Sencillas» (3 veces el cuerpo, colgando .18 em):
// unidades de la fuente (1000 = 1 em de la letra), origen x = 0 en el punto de inserción, avance de la S de la fuente. uso: node colocar.cjs out ctx
const fs = require('fs'); const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [DIR, OUT] = process.argv.slice(2); fs.mkdirSync(OUT, { recursive: true });
const IDS = fs.readdirSync(DIR).filter((f) => f.endsWith('.svg')).map((f) => f.replace('.svg', ''));
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4332/manifiesto?carga=0&estacion=otono', { waitUntil: 'networkidle' });
  const cap = p.locator('[data-cap]'); await cap.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  const par = cap.locator('xpath=ancestor::*[contains(@class,"parrafo")][1]');
  await par.evaluate((el) => { document.querySelectorAll('.parrafo, .firma-final').forEach((x) => { if (x !== el) x.style.visibility = 'hidden'; }); document.querySelectorAll('canvas, [data-raices], img').forEach((x) => (x.style.visibility = 'hidden')); });
  const bb = await par.boundingBox();
  const clip = { x: Math.max(0, bb.x - 90), y: bb.y - 130, width: bb.width + 140, height: bb.height + 160 };
  for (const id of IDS) {
    const svg = fs.readFileSync(`${DIR}/${id}.svg`, 'utf8');
    await cap.evaluate((el, svg) => {
      el.removeAttribute('style'); el.innerHTML = svg;
      const s = el.querySelector('svg'); const [vx, vy, vw, vh] = s.getAttribute('viewBox').split(' ').map(Number); const adv = +s.dataset.adv;
      const k = 3 / 1000; // em del párrafo por unidad de la fuente (la letra a 3 em)
      // la letra no ocupa alto en la línea (no la empuja): caja de ancho = avance, el dibujo en absoluto, su base sobre la del texto
      el.style.cssText = `display:inline-block;position:relative;font-size:1em;height:0;line-height:0;vertical-align:baseline;width:${(adv * k - 0.54 - 0.06).toFixed(3)}em;`;
      s.style.cssText = `position:absolute;left:${(vx * k - 0.54).toFixed(3)}em;bottom:${(-(vy + vh) * k).toFixed(3)}em;height:${vh * k}em;width:${vw * k}em;overflow:visible;`;
    }, svg);
    await p.waitForTimeout(150);
    await p.screenshot({ path: `${OUT}/${id}.png`, clip });
  }
  await b.close();
})();
