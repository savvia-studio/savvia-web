const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 3, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); await p.goto('http://localhost:4332/'); await p.waitForTimeout(1500);
  const y = await p.$eval('#proyectos', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.45); await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(2500);

  const r = await p.$eval('.mas-rotulo', (e) => { const q = e.getBoundingClientRect(); return { x: q.left - 10, y: q.top - 14, width: q.width + 20, height: q.height + 28 }; });
  await p.screenshot({ path: process.argv[2], clip: r }); await b.close();
})();
