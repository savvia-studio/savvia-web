// las S a pluma, puestas en el manifiesto: un SVG en línea dentro de la capitular, apoyado en la línea de base y colgando un poco por la izquierda
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
const [DIR, OUT] = process.argv.slice(2);
const V = [['pluma-a', 2.2], ['pluma-b', 2.25], ['pluma-d', 2.2], ['pluma-a-grande', 2.7]];
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4332/manifiesto?carga=0&estacion=otono', { waitUntil: 'networkidle' });
  const cap = p.locator('[data-cap]'); await cap.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  const par = cap.locator('xpath=ancestor::*[contains(@class,"parrafo")][1]');
  await par.evaluate((el) => { document.querySelectorAll('.parrafo, .firma-final').forEach((x) => { if (x !== el) x.style.visibility = 'hidden'; }); document.querySelectorAll('canvas, [data-raices], img').forEach((x) => (x.style.visibility = 'hidden')); });
  const bb = await par.boundingBox();
  const clip = { x: Math.max(0, bb.x - 90), y: bb.y - 110, width: bb.width + 140, height: bb.height + 140 };
  for (const [id, alto] of V) {
    const svg = fs.readFileSync(`${DIR}/${id.replace('-grande', '')}.svg`, 'utf8');
    await cap.evaluate((el, [svg, alto]) => {
      el.removeAttribute('style'); el.innerHTML = svg;
      const s = el.querySelector('svg'); const [vx, vy, vw, vh] = s.getAttribute('viewBox').split(' ').map(Number);
      const base = +s.dataset.base, izq = +s.dataset.izq; // y = 0 (línea de base) e x = 0 en el viewBox
      // alto en em del párrafo; la línea de base del dibujo, sobre la del texto; la entrada cuelga por la izquierda (x = 0 en el margen)
      const em = alto, ancho = (em * vw) / vh;
      el.style.cssText = 'display:inline-block;font-size:1em;line-height:0;vertical-align:baseline;';
      s.style.cssText = `display:inline-block;height:${em}em;width:${ancho}em;vertical-align:${(-(vh - base) / vh * em).toFixed(3)}em;margin-left:${(-(izq / vh) * em).toFixed(3)}em;margin-right:${(-0.06).toFixed(3)}em;overflow:visible;`;
    }, [svg, alto]);
    await p.waitForTimeout(200);
    await p.screenshot({ path: `${OUT}/${id}.png`, clip });
  }
  await b.close();
})();
