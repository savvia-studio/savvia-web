const { webkit } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const br = await webkit.launch();
  const ctx = await br.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const page = await ctx.newPage();
  for (const [url, sel, n] of [['/proyectos/remerge', '.caso .ver', 'wk-claro'], ['/handbook/la-receta', '.par.despues', 'wk-hb']]) {
    await page.goto('http://localhost:4322' + url, { waitUntil: 'networkidle' }); await wait(1500);
    const el = page.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await wait(500);
    const b = await el.boundingBox(); const clip = { x: b.x - 12, y: b.y - 12, width: b.width + 24, height: b.height + 24 };
    await page.mouse.move(b.x - 40, b.y + b.height / 2); await wait(200);
    await page.mouse.move(b.x + 5, b.y + b.height / 2); const t0 = Date.now();
    for (const t of [130, 700]) { await wait(t - (Date.now() - t0)); await page.screenshot({ path: OUT + `r137-cta-${n}-${t}.jpg`, clip, quality: 90 }); }
    const off = await page.evaluate((s) => [...document.querySelector(s).querySelectorAll('.btn-flecha path')].map((p) => getComputedStyle(p).strokeDashoffset), sel);
    console.log(n, off);
  }
  await br.close();
})();
