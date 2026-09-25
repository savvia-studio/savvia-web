// Ronda 53 · capturas de secciones enteras (antes / después). node tools/r53-secciones.cjs <etiqueta> [url] [ancho]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const et = process.argv[2] || 'x', url = process.argv[3] || 'http://localhost:4332/', W = +(process.argv[4] || 1280);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(2500);
  for (const id of ['hero', 'anteriores', 'servicios', 'la-savvia']) {
    const y = await p.evaluate((i) => { const s = document.getElementById(i) || document.querySelector(`[data-seccion="${i}"]`); return s ? s.getBoundingClientRect().top + scrollY : null; }, id);
    if (y == null) { console.log('sin', id); continue; }
    const h = await p.evaluate((i) => (document.getElementById(i)).offsetHeight, id);
    for (let k = 0, n = Math.min(6, Math.ceil(h / 800)); k < n; k++) {
      await p.evaluate((yy) => scrollTo(0, yy), y + k * 800); await p.waitForTimeout(1400);
      await p.screenshot({ path: `tools/shots/r53-${et}-${id}-${k}-${W}.jpg`, quality: 70 });
    }
  }
  console.log(et, errs.length ? errs : 'sin errores');
  await b.close();
})();
