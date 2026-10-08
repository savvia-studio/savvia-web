const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/';
const URL = process.env.URL || 'http://localhost:4322/manifiesto';
(async () => {
  const casos = [['chrome', chromium, 1280, 720], ['webkit', webkit, 1280, 720], ['movil', chromium, 390, 844]];
  const solo = process.argv[2];
  for (const [n, eng, w, h] of casos) {
    if (solo && solo !== n) continue;
    const b = await eng.launch(eng === webkit ? {} : launchOpts);
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
    await p.goto(URL, { waitUntil: 'load' });
    await p.waitForTimeout(1500);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    const pos = (process.env.POS || '0,0.08,0.14,0.2,0.27,0.34,0.42,0.5,0.6').split(',').map(Number);
    for (const [i, f] of pos.entries()) {
      await p.evaluate((y) => scrollTo(0, y), Math.round(f * H));
      await p.waitForTimeout(350);
      await p.screenshot({ path: `${OUT}r129-manifiesto-${n}-${i}.jpg`, quality: 70 });
    }
    console.log(n, JSON.stringify(await p.evaluate(() => window.__manifiesto && window.__manifiesto())), errs);
    await b.close();
  }
})();
