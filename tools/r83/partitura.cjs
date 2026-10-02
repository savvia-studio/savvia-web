// RONDA 85 · la entrada en su sobre: fotogramas a lo largo de la escena
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4332/'); await p.waitForTimeout(1500);
  const [top, h] = await p.$eval('[data-sala-entrada]', (e) => [e.getBoundingClientRect().top + scrollY, e.offsetHeight]);
  const ps = [0, 0.06, 0.12, 0.2, 0.3, 0.36, 0.5, 0.72, 0.88, 0.97];
  const out = [];
  for (const [i, q] of ps.entries()) { await p.evaluate((y) => scrollTo(0, y), top + q * (h - H)); await p.waitForTimeout(700); const f = `tools/shots/r85-partitura-${motor}-${W}-${i}.jpg`; await p.screenshot({ path: f, quality: 65 }); out.push(await p.evaluate(() => window.__partitura())); }
  // vuelta arriba: lo hecho se queda hecho
  await p.evaluate((y) => scrollTo(0, y), top + 0.1 * (h - H)); await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/r85-partitura-${motor}-${W}-vuelta.jpg`, quality: 65 });
  const vuelta = await p.evaluate(() => window.__partitura());
  console.log(JSON.stringify({ motor, W, errs, fin: out[out.length - 1], vuelta, desb: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
