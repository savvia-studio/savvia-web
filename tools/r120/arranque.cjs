const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, B, q] of [['chrome', chromium, '?carga=0&lenis=0'], ['webkit', webkit, '?carga=0&lenis=0'], ['chrome-carga', chromium, '?lenis=0']]) {
    const b = n === 'webkit' ? await B.launch() : await B.launch(launchOpts);
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: n === 'webkit' ? undefined : userAgent })).newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto('http://localhost:4321/' + q);
    if (n === 'chrome-carga') { await p.waitForTimeout(800); await p.keyboard.press('Enter'); }
    await p.waitForFunction(() => window.__gotaSuelta === true, null, { timeout: 20000 }).catch(() => {});
    const t0 = Date.now(); await p.waitForFunction(() => window.__sumi && window.__sumi().bucle, null, { timeout: 15000 }).catch(() => {});
    const cambios = new Set(); for (let i = 0; i < 12; i++) { cambios.add((await p.evaluate(() => window.__sumi())).pasoD); await p.waitForTimeout(150); }
    console.log(n, { bucleTrasGota_ms: Date.now() - t0, poses: [...cambios].sort(), errs });
    await b.close();
  }
})();
