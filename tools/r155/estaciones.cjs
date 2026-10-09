// Ronda 155 · las cuatro estaciones del manifiesto: brote arriba y la raíz llegando a la capitular (Chrome y WebKit, 1280)
const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [nm, bt, op] of [['chrome', chromium, launchOpts], ['webkit', webkit, { headless: true }]]) {
    const b = await bt.launch(op);
    for (const e of ['primavera', 'verano', 'otono', 'invierno']) {
      const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
      await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
      const p = await ctx.newPage(); const errs = []; p.on('pageerror', (x) => errs.push(x.message));
      await p.goto(`http://localhost:4322/manifiesto?carga=0&estacion=${e}`, { waitUntil: 'load' });
      await p.waitForTimeout(5000);
      await p.screenshot({ path: `${__dirname}/shots/est-${nm}-${e}-arriba.png` });
      const i = await p.evaluate(() => window.__manifiesto());
      await p.evaluate((y) => scrollTo(0, y), i.punta.y - 720 * 0.45); await p.waitForTimeout(1800);
      await p.screenshot({ path: `${__dirname}/shots/est-${nm}-${e}-texto.png` });
      // cambio de estación en caliente
      console.log(nm, e, i.est, 'errores', errs);
      await ctx.close();
    }
    await b.close();
  }
})();
