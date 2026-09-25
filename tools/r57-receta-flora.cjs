// Ronda 57 · la receta: la impresora entre la maleza (flora) y el altavoz (quitar / poner sonido)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', url = process.argv[3] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1200);
  const [y0] = await p.evaluate(() => { const s = document.querySelector('[data-imprenta]'); return [s.getBoundingClientRect().top + scrollY]; });
  for (let y = y0 - 600; y < y0 + 700; y += 90) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(150); }
  await p.waitForTimeout(3000);
  await p.screenshot({ path: `tools/shots/r57-receta-flora-${motor}.jpg`, quality: 70 });
  const a0 = await p.evaluate(() => document.querySelector('[data-altavoz]').getAttribute('aria-pressed'));
  await p.click('[data-altavoz]'); const a1 = await p.evaluate(() => [document.querySelector('[data-altavoz]').getAttribute('aria-pressed'), localStorage.getItem('savvia:sonido')]);
  await p.click('[data-altavoz]'); const a2 = await p.evaluate(() => [document.querySelector('[data-altavoz]').getAttribute('aria-pressed'), localStorage.getItem('savvia:sonido'), window.__receta().sonido]);
  console.log(motor, errs.length ? errs : 'sin errores', 'altavoz', a0, '→', a1, '→', a2);
  await b.close();
})();
