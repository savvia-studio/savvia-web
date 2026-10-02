const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(1500);
  const top = await p.evaluate(() => document.querySelector('[data-pie]').getBoundingClientRect().top + scrollY);
  for (const [i, k] of [0.15, 0.4, 0.7].entries()) { await p.evaluate((y) => scrollTo(0, y), top - 720 + k * 720); await p.waitForTimeout(400); await p.screenshot({ path: `tools/shots/r90-pie-${motor}-${i}.jpg`, quality: 60 }); }
  console.log(JSON.stringify({ motor, errs, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth), clip: await p.evaluate(() => document.querySelector('[data-pie] > .sube')?.style.clipPath.slice(0, 40)) }));
  await b.close();
})();
