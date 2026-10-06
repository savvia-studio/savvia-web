const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, B, ruta] of [['chrome', chromium, '/'], ['chrome', chromium, '/clara'], ['webkit', webkit, '/clara']]) {
    const b = n === 'webkit' ? await B.launch() : await B.launch(launchOpts);
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: n === 'webkit' ? undefined : userAgent })).newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(`http://localhost:4321${ruta}?carga=0&lenis=0`, { waitUntil: 'networkidle' });
    await p.evaluate(() => { const r = document.querySelector('[data-pista]'); scrollTo(0, r.offsetTop + r.offsetHeight * 0.4); });
    await p.waitForTimeout(3000);
    const r = await p.evaluate(() => { const s = document.querySelector('[data-sentarse]'); const q = s.getBoundingClientRect(); const e = document.elementFromPoint(q.x + q.width / 2, q.y + q.height / 2); return { encima: s.contains(e), el: e?.className }; });
    await p.click('[data-sentarse]').catch((e) => errs.push('click ' + e.message.slice(0, 80)));
    await p.waitForTimeout(2000);
    const sentado = await p.evaluate(() => document.documentElement.classList.contains('estudio-sentado'));
    console.log(n, ruta, r, { sentado, errs });
    await b.close();
  }
})();
