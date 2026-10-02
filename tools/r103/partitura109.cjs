const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=0'); await p.mouse.click(5, 300); await p.waitForTimeout(3000);
  const antes = await p.evaluate(() => window.__jazz().ganancia);
  await p.evaluate(() => document.querySelector('[data-partitura], #partitura, .partitura')?.scrollIntoView({ block: 'center' }));
  const hay = await p.evaluate(() => !!document.querySelector('[data-partitura], #partitura, .partitura'));
  await p.waitForTimeout(9000);
  console.log(JSON.stringify({ errs, hay, antes, dentro: await p.evaluate(() => window.__jazz().ganancia) }));
  await b.close();
})();
