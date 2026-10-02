const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto((process.argv[2] || 'http://localhost:4331/') + '?carga=1'); await p.waitForTimeout(1200);
  console.log('antes', JSON.stringify(await p.evaluate(() => window.__jazz())));
  await p.mouse.click(640, 576); await p.waitForTimeout(1500);
  console.log('1 clic', JSON.stringify(await p.evaluate(() => window.__jazz())));
  await p.waitForTimeout(2500);
  console.log('+2,5 s', JSON.stringify(await p.evaluate(() => window.__jazz())));
  await b.close();
})();
