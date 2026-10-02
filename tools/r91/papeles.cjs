const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(5000);
  const top = await p.evaluate(() => document.querySelector('[data-manifiesto]').getBoundingClientRect().top + scrollY);
  for (const [i, k] of [-0.5, -0.25, 0, 0.25, 0.6].entries()) { await p.evaluate((y) => scrollTo(0, y), top + k * H); await p.waitForTimeout(400); await p.screenshot({ path: `tools/shots/r91-papeles-${motor}-${W}-${i}.jpg`, quality: 65 }); }
  console.log(JSON.stringify({ motor, W, errs, porLlegar: await p.evaluate(() => document.querySelectorAll('.pl.por-llegar').length), desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
