// RONDA 94 · el hero REAL de Neety: fotogramas tras la carga para copiar su movimiento.
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage();
  const t0 = Date.now();
  await p.goto('https://neety.treseiscero.app/home', { waitUntil: 'commit' });
  const T = [0,150,300,450,600,800,1000,1200,1500,1800,2100,2500,3000,3500,4000,5000,6000,7000,8000,10000,12000];
  for (const t of T) { const w = t - (Date.now() - t0); if (w > 0) await p.waitForTimeout(w);
    await p.screenshot({ path: `tools/shots/r94-real/f${String(t).padStart(5,'0')}.jpg`, quality: 70 }); }
  const html = await p.evaluate(() => document.querySelector('section, main')?.outerHTML.slice(0, 20000));
  require('fs').writeFileSync('tools/shots/r94-real/hero.html', html || '');
  await b.close();
})();
