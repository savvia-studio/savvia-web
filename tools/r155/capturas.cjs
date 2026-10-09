// Ronda 155 · capturas del manifiesto a lo largo del scroll (Chrome y WebKit, 1280 y 390)
const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const URL = process.env.URL || 'http://localhost:4322/manifiesto?carga=0';
const solo = process.argv[2];
(async () => {
  for (const [nm, bt, op] of [['chrome', chromium, launchOpts], ['webkit', webkit, { headless: true }]]) {
    if (solo && solo !== nm) continue;
    const b = await bt.launch(op);
    for (const [w, h] of [[1280, 720], [390, 844]]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: w < 500 ? 2 : 1 });
      await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
      const p = await ctx.newPage();
      const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      await p.goto(URL, { waitUntil: 'load' });
      await p.waitForTimeout(5200);
      const info = await p.evaluate(() => window.__manifiesto && window.__manifiesto());
      const capY = info ? info.punta.y : 1300;
      const pts = [['0-arriba', 0], ['1-poco', h * 0.25], ['2-mitad', Math.max(0, (capY - h * 0.6) * 0.6)], ['3-llega', Math.max(0, capY - h * 0.6)], ['4-texto', Math.max(0, capY - h * 0.3)]];
      for (const [tag, y] of pts) {
        await p.evaluate((y) => window.scrollTo(0, y), y);
        await p.waitForTimeout(tag === '4-texto' ? 1900 : 900);
        const s = await p.evaluate(() => window.__manifiesto && window.__manifiesto());
        console.log(nm, w, tag, 'y', Math.round(y), 'g', s && s.g.toFixed(3), 'bebe', s && s.bebe, 'sk', s && s.sk);
        await p.screenshot({ path: `${__dirname}/shots/${nm}-${w}-${tag}.png` });
      }
      console.log(nm, w, 'errores', errs);
      await ctx.close();
    }
    await b.close();
  }
})();
