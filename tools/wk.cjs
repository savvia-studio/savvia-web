// Hero en WebKit y con movimiento reducido: node tools/wk.cjs <url>
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const url = process.argv[2];
(async () => {
  for (const [n, eng, o, ctxo] of [['wk', webkit, { headless: true }, {}], ['rm', chromium, launchOpts, { reducedMotion: 'reduce', userAgent }]]) {
    const b = await eng.launch(o);
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, ...ctxo })).newPage();
    const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(n === 'wk' ? 4200 : 900);
    await p.screenshot({ path: `tools/shots/r9_${n}_hero.jpg`, type: 'jpeg', quality: 78 });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.evaluate((y) => scrollTo(0, y), Math.round(H * 0.17)); await p.waitForTimeout(900);
    await p.screenshot({ path: `tools/shots/r9_${n}_cards.jpg`, type: 'jpeg', quality: 78 });
    console.log(n, JSON.stringify({ errs, hero: await p.evaluate(() => window.__hero && window.__hero()) }));
    await b.close();
  }
})();
