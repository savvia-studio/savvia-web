const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.addInitScript(() => { addEventListener('savvia:gota', () => (window.__tGota = performance.now())); });
  await p.goto('http://localhost:4321/?lenis=0'); await p.waitForTimeout(800); await p.keyboard.press('Enter');
  await p.waitForFunction(() => window.__sumi && window.__sumi().bucle, null, { timeout: 20000 });
  console.log(await p.evaluate(() => ({ gota: Math.round(window.__tGota), listo: Math.round(performance.now()), imgs: performance.getEntriesByType('resource').filter((e) => e.name.includes('/bucle/')).map((e) => [e.name.split('/').pop(), Math.round(e.startTime), Math.round(e.responseEnd)]) })));
  await b.close();
})();
