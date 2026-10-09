// Ronda 155 · cambio de estación en caliente (otoño → invierno) y movimiento reducido
const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [nm, bt, op] of [['chrome', chromium, launchOpts], ['webkit', webkit, { headless: true }]]) {
    const b = await bt.launch(op);
    const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
    await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
    const p = await ctx.newPage(); const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(e.message));
    await p.goto('http://localhost:4322/manifiesto?carga=0&estacion=otono', { waitUntil: 'load' });
    await p.waitForTimeout(4500);
    await p.evaluate(() => scrollTo(0, 300)); await p.waitForTimeout(800);
    await p.evaluate(() => dispatchEvent(new CustomEvent('savvia:estacion', { detail: { n: 1 } })));
    await p.waitForTimeout(1300); await p.screenshot({ path: `${__dirname}/shots/cambio-${nm}-medio.png` });
    await p.waitForTimeout(2500); await p.screenshot({ path: `${__dirname}/shots/cambio-${nm}-fin.png` });
    const n = await p.evaluate(() => [document.querySelectorAll('[data-brote-caja] canvas').length, document.querySelectorAll('[data-raices-caja] canvas').length]);
    console.log(nm, 'lienzos tras el cambio', n, 'errores', errs);
    await ctx.close();
    const c2 = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const p2 = await c2.newPage(); const e2 = []; p2.on('pageerror', (e) => e2.push(e.message));
    await p2.goto('http://localhost:4322/manifiesto?carga=0', { waitUntil: 'load' }); await p2.waitForTimeout(2500);
    await p2.screenshot({ path: `${__dirname}/shots/reducido-${nm}-arriba.png` });
    const i = await p2.evaluate(() => window.__manifiesto());
    await p2.evaluate((y) => scrollTo(0, y), i.punta.y - 500); await p2.waitForTimeout(800);
    await p2.screenshot({ path: `${__dirname}/shots/reducido-${nm}-texto.png` });
    console.log(nm, 'reducido g', i.g, 'bebe', i.bebe, e2);
    await c2.close(); await b.close();
  }
})();
