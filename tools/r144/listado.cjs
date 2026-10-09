const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, bt, w] of [['chrome', chromium, 1280], ['webkit', webkit, 1280], ['chrome', chromium, 390]]) {
    const b = n === 'webkit' ? await bt.launch() : await bt.launch(launchOpts);
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto('http://localhost:4322/proyectos?lenis=0', { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);
    await p.screenshot({ path: `/tmp/r144-lista-${n}-${w}-a.png` });
    const pasos = [];
    for (let i = 0; i < 4; i++) { pasos.push(await p.evaluate(() => window.__slider())); await p.click('[data-paso="1"]').catch(() => {}); await p.waitForTimeout(900); }
    pasos.push(await p.evaluate(() => window.__slider()));
    await p.screenshot({ path: `/tmp/r144-lista-${n}-${w}-b.png` });
    await p.click('[data-abrir-filtros]'); await p.waitForTimeout(500);
    await p.evaluate(() => document.querySelector('[data-todos]').scrollIntoView()); await p.waitForTimeout(600);
    await p.screenshot({ path: `/tmp/r144-lista-${n}-${w}-c.png` });
    await p.click('[data-f="pais"][data-v="España"]'); await p.waitForTimeout(1200);
    const o = await p.evaluate(() => window.__obras());
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(n, w, JSON.stringify(pasos.map((x) => x.n + '@' + x.scroll + '/' + x.max)), JSON.stringify(o), 'desborde', ov, errs.slice(0, 3));
    await b.close();
  }
})();
