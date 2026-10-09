const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, bt] of [['chrome', chromium], ['webkit', webkit]]) {
    const b = n === 'webkit' ? await bt.launch() : await bt.launch(launchOpts);
    const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
    const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto('http://localhost:4322/?carga=1'); await p.waitForTimeout(1500);
    await p.mouse.move(640, 300);
    for (let i = 0; i <= 50; i++) { const a = (i / 40) * Math.PI * 2; await p.mouse.move(640 + 90 * Math.cos(a), 360 + 90 * Math.sin(a)); await p.waitForTimeout(12); }
    await p.waitForTimeout(1900); await p.screenshot({ path: `/tmp/r144-${n}-dibuja.png` });
    await p.waitForTimeout(4000); await p.screenshot({ path: `/tmp/r144-${n}-fin.png` });
    const st = await p.evaluate(() => ({ cargando: document.documentElement.classList.contains('cargando'), velo: !!document.querySelector('[data-cargador]') }));
    console.log(n, JSON.stringify(st), errs.slice(0, 3));
    await b.close();
  }
})();
