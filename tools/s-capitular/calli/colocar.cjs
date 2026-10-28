// Las S elegidas, a pluma y puestas en el manifiesto (como ../eses6.cjs). uso: node colocar.cjs centros.json <dir> id id ...
const fs = require('fs'); const { svgS } = require('./pluma.cjs');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [IN, OUT, ...IDS] = process.argv.slice(2); const D = JSON.parse(fs.readFileSync(IN, 'utf8'));
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4332/manifiesto?carga=0&estacion=otono', { waitUntil: 'networkidle' });
  const cap = p.locator('[data-cap]'); await cap.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  const par = cap.locator('xpath=ancestor::*[contains(@class,"parrafo")][1]');
  await par.evaluate((el) => { document.querySelectorAll('.parrafo, .firma-final').forEach((x) => { if (x !== el) x.style.visibility = 'hidden'; }); document.querySelectorAll('canvas, [data-raices], img').forEach((x) => (x.style.visibility = 'hidden')); });
  const bb = await par.boundingBox();
  const clip = { x: Math.max(0, bb.x - 90), y: bb.y - 110, width: bb.width + 140, height: bb.height + 140 };
  for (const id of IDS) {
    const svg = svgS(D[+id].trazos); fs.writeFileSync(`${OUT}/mano-${id}.svg`, svg);
    await cap.evaluate((el, svg) => {
      el.removeAttribute('style'); el.innerHTML = svg;
      const s = el.querySelector('svg'); const [, , vw, vh] = s.getAttribute('viewBox').split(' ').map(Number);
      const base = +s.dataset.base, izq = +s.dataset.izq, em = 2.2, ancho = (em * vw) / vh;
      el.style.cssText = 'display:inline-block;font-size:1em;line-height:0;vertical-align:baseline;';
      s.style.cssText = `display:inline-block;height:${em}em;width:${ancho}em;vertical-align:${(-(vh - base) / vh * em).toFixed(3)}em;margin-left:${(-(izq / vh) * em).toFixed(3)}em;margin-right:-0.04em;overflow:visible;`;
    }, svg);
    await p.waitForTimeout(150);
    await p.screenshot({ path: `${OUT}/mano-${id}.png`, clip });
  }
  await b.close();
})();
