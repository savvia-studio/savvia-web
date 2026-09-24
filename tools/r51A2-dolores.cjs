// Ronda 51 · la sección 2, DIRECCIÓN A CON TARJETAS, paso a paso en local. node tools/r51-dolores.cjs [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1.5, userAgent })).newPage();
  await p.goto('http://localhost:4332/?s2=a2', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(4500);
  const info = await p.evaluate(() => { const s = document.getElementById('recorrido-a2'); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, alto: s.offsetHeight }; });
  const pasos = 12; 
  for (let k = 0; k <= pasos; k++) {
    const y = info.top - +h * 0.6 + (info.alto + +h * 0.2) * (k / pasos);
    await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(1400);
    await p.screenshot({ path: `tools/shots/r51A2-dol-${w}-${String(k).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 72 });
  }
  console.log(w, JSON.stringify(await p.evaluate(() => window.__dolores ? window.__dolores['recorrido-a2']() : null)), JSON.stringify(info), 'pantallas de la sección:', (info.alto / +h).toFixed(1)); await b.close();
})();
