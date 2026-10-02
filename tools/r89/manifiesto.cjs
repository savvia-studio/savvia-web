const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(1500);
  const top = await p.evaluate(() => document.querySelector('[data-manifiesto]').getBoundingClientRect().top + scrollY);
  for (const [i, dy] of [[0, -200], [1, 120], [2, 420]].entries ? [[0, -200], [1, 120], [2, 420]] : []) { await p.evaluate((y) => scrollTo(0, y), top + dy); await p.waitForTimeout(i === 0 ? 3200 : 900); await p.screenshot({ path: `tools/shots/r89-manif-${motor}-${W}-${i}.jpg`, quality: 70 }); }
  console.log(JSON.stringify({ motor, W, errs, tinta: await p.evaluate(() => document.querySelectorAll('.pl.tinta').length), total: await p.evaluate(() => document.querySelectorAll('.pl').length), desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
