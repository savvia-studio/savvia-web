const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); await p.goto('http://localhost:4332/'); await p.waitForTimeout(1500);
  const top = await p.$eval('[data-paseo]', (e) => e.getBoundingClientRect().top + scrollY);
  for (let k = 0; k <= 10; k++) { await p.evaluate((y) => scrollTo(0, y), top - 720 * 0.96 + 720 * 0.66 * 0.8 * k / 10); await p.waitForTimeout(40); }
  await p.waitForTimeout(700); await p.screenshot({ path: process.argv[2], quality: 75 }); await b.close();
})();
