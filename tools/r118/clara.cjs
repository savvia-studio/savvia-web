const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const ruta of ['', 'clara']) {
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto('http://localhost:4321/' + ruta + '?carga=0'); await p.waitForTimeout(6500);
    const c = await p.evaluate(() => { const r = document.querySelector('[data-caja]').getBoundingClientRect(); return { x: r.left, y: r.top + r.height * 0.55, width: r.width, height: r.height * 0.45 }; });
    await p.screenshot({ path: `tools/shots/r118-pie-${ruta || 'oscura'}.jpg`, quality: 80, clip: c });
    await p.screenshot({ path: `tools/shots/r118-hero-${ruta || 'oscura'}.jpg`, quality: 70 });
    const y = await p.evaluate(() => document.querySelector('[data-parada="0"]').getBoundingClientRect().top + scrollY - 120);
    for (let k = 0; k < 8; k++) { await p.evaluate((y) => window.scrollTo(0, y), y * (k + 1) / 8); await p.waitForTimeout(250); }
    await p.waitForTimeout(800); await p.screenshot({ path: `tools/shots/r118-s2-${ruta || 'oscura'}.jpg`, quality: 70 });
    console.log(ruta || 'oscura', JSON.stringify(errs));
  }
  await b.close();
})();
