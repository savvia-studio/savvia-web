const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(1500);
  const y = await p.$eval('[data-escena-p]', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight / 2 - innerHeight / 2);
  await p.evaluate((y) => scrollTo(0, y), y);
  for (let i = 0; i < 3; i++) { await p.waitForTimeout(i ? 1700 : 3500); await p.screenshot({ path: `tools/shots/r89-partitura-${motor}-${W}-${i}.jpg`, quality: 72 }); }
  console.log(JSON.stringify({ motor, W, errs, tocadas: await p.evaluate(() => document.querySelectorAll('.pieza.tocada').length), notas: await p.evaluate(() => document.querySelectorAll('[data-notas] g').length), desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
