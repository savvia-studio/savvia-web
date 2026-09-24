// Ronda 19 · el hover del árbol: se desdibuja y se vuelve a dibujar. node tools/r19-hero.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(6000); // Escape salta la carga; el árbol se pinta
  const shot = (n) => p.screenshot({ path: `tools/shots/r19-hero-${tag}-${n}.jpg`, type: 'jpeg', quality: 84 });
  await shot('quieto');
  const r = await p.evaluate(() => { const q = document.querySelector('[data-arbol]').getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; });
  await p.mouse.move(r.x, r.y);
  const t0 = Date.now();
  for (const t of [250, 600, 900, 1400, 2200, 3200, 4200]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await shot(`h${t}`); }
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify({ crecido: await p.evaluate(() => document.querySelector('[data-hero]').classList.contains('crecido')) }));
  await b.close();
})();
