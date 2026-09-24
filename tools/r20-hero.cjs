// Ronda 20 · las estaciones del árbol al clicar (y el rótulo). node tools/r20-hero.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(6000);
  const shot = (n) => p.screenshot({ path: `tools/shots/r20-hero-${tag}-${n}.jpg`, type: 'jpeg', quality: 84 });
  const r = await p.evaluate(() => { const q = document.querySelector('[data-arbol]').getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; });
  await p.mouse.move(r.x, r.y); await p.waitForTimeout(4200); await shot('otono');
  const nombres = [];
  for (const e of ['invierno', 'primavera', 'verano']) { await p.mouse.click(r.x, r.y); await p.waitForTimeout(900); await shot(e + '-medio'); await p.waitForTimeout(3400); await shot(e); nombres.push(await p.evaluate(() => [document.querySelector('[data-estacion-nombre]').textContent, getComputedStyle(document.querySelector('[data-estacion-rotulo]')).opacity])); }
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify(nombres));
  await b.close();
})();
