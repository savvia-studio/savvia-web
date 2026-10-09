// RONDA 154 · el degradado de Neety donde sale: pieza del portfolio, portada del caso y la pieza que rota en la home. node tools/r154/neety.cjs <etiqueta>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const tag = process.argv[2] || 'antes', O = 'tools/r154/shots';
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  await p.goto('http://localhost:4322/proyectos?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const pz = p.locator('a.pieza[href="/proyectos/neety"]').first();
  await pz.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500); await pz.screenshot({ path: `${O}/neety-portfolio-${tag}.jpg`, type: 'jpeg', quality: 80 });
  await p.goto('http://localhost:4322/proyectos/neety?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(1200);
  const po = p.locator('.portada').first(); await po.scrollIntoViewIfNeeded(); await p.waitForTimeout(2500); await po.screenshot({ path: `${O}/neety-portada-${tag}.jpg`, type: 'jpeg', quality: 80 });
  await p.goto('http://localhost:4322/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(1500);
  const r = p.locator('[data-rota]').first();
  if (await r.count()) { await r.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
    await p.evaluate(() => { const rota = document.querySelector('[data-rota]'); const c = JSON.parse(rota.dataset.colores)[3]; c.forEach((x, i) => rota.style.setProperty(`--c${i + 1}`, x)); rota.style.transition = 'none'; });
    await p.waitForTimeout(600); await r.screenshot({ path: `${O}/neety-home-${tag}.jpg`, type: 'jpeg', quality: 80 }); }
  await b.close(); console.log('ok');
})();
