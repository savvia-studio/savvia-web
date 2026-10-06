const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 })).newPage();
  await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(800);
  await p.evaluate(() => document.querySelector('[data-servicios]').scrollIntoView()); await p.waitForTimeout(1800);
  await p.screenshot({ path: 'tools/shots/r117-servicios.jpg', quality: 75 }); await b.close(); })();
