const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  await p.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  await p.goto('http://localhost:4322/?lenis=0&carga=0', { waitUntil: 'networkidle' });
  await p.evaluate(() => scrollTo(0, innerHeight * 1.15)); await p.waitForTimeout(1500);
  const el = await p.$('.demo-1');
  for (const t of [1, 2.5, 4, 5.5, 7]) { await p.waitForTimeout(t === 1 ? 0 : 1500); await el.screenshot({ path: `/tmp/r144-d1-${t}.png` }); }
  await b.close();
})();
