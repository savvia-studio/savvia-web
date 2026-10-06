const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/clara?carga=0&lenis=0'); await p.waitForTimeout(3500);
  for (let n = 0; n < 3; n++) {
    const y = await p.evaluate((n) => { const li = document.querySelector(`[data-parada="${n}"]`); return li.getBoundingClientRect().top + scrollY + li.offsetHeight / 2 - innerHeight / 2; }, n);
    const y0 = await p.evaluate(() => scrollY);
    for (let k = 1; k <= 10; k++) { await p.evaluate((v) => window.scrollTo(0, v), y0 + ((y - y0) * k) / 10); await p.waitForTimeout(120); }
    await p.waitForTimeout(3500);
    const r = await p.evaluate((n) => { const c = document.querySelector(`[data-parada="${n}"] .cuadro`).getBoundingClientRect(); return { x: c.left, y: Math.max(0, c.top), width: c.width, height: Math.min(c.height, innerHeight - Math.max(0, c.top)) }; }, n);
    await p.screenshot({ path: `tools/shots/r118-demo-clara-${n}.jpg`, quality: 75, clip: r });
  }
  console.log(JSON.stringify(errs)); await b.close();
})();
