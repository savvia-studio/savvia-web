const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=0'); await p.mouse.click(5, 300);
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(7000);
  const bb = await (await p.$('[data-director-pie] canvas')).boundingBox();
  for (let i = 0; i < 4; i++) { await p.screenshot({ path: `tools/shots/r103-saxo-${i}.jpg`, quality: 70, clip: bb }); await p.waitForTimeout(700); }
  console.log(JSON.stringify({ errs, bb }));
  await b.close();
})();
