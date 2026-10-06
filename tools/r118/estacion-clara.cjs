const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, B] of [['chrome', chromium], ['webkit', webkit]]) {
    const b = n === 'webkit' ? await B.launch() : await B.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: n === 'webkit' ? undefined : userAgent })).newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
    await p.goto('http://localhost:4321/clara?carga=0&lenis=0', { waitUntil: 'networkidle' });
    await p.evaluate(() => { const r = document.querySelector('[data-capa]').closest('section'); scrollTo(0, r.offsetTop + r.offsetHeight * 0.45); });
    await p.waitForTimeout(2500);
    const est = await p.$$eval('[data-est]', (bs) => bs.map((b) => b.dataset.est));
    // fuerza el clic aunque el abanico esté cerrado
    const min = [];
    for (const e of ['invierno', 'verano']) {
      await p.evaluate((e) => document.querySelector(`[data-est="${e}"]`).click(), e);
      for (let i = 0; i < 20; i++) {
        await p.waitForTimeout(100);
        min.push(await p.evaluate(() => { const v = [...document.querySelectorAll('[data-capa]')].filter((c) => +getComputedStyle(c).opacity > 0.01); return v.length ? Math.max(...v.map((c) => +getComputedStyle(c).opacity)) : 0; }));
      }
    }
    console.log(n, { est, errs, minCobertura: Math.min(...min).toFixed(2) });
    await b.close();
  }
})();
