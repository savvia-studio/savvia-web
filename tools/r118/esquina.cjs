const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, userAgent })).newPage();
  await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(6000);
  const m = await p.evaluate(() => { const r = document.querySelector('[data-sumi] .marco').getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; });
  for (let i = 0; i < 3; i++) { await p.screenshot({ path: `tools/shots/r118-esq-${i}.jpg`, quality: 75, clip: m }); await p.waitForTimeout(1500); }
  await b.close();
})();
