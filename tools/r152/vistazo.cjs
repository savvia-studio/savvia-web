// RONDA 152 · capturas de ventana (1440×900) de una web real en varias alturas: node tools/r152/vistazo.cjs <clave> y1,y2,…
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/r126/blanca.cjs');
const G = require('/Users/andonimart/Desktop/savvia/savvia-web/tools/reel/grabar-comun.cjs');
const W = require('./webs.cjs');
const OUT = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/4a330437-fe35-417c-bed0-2d5af9993a14/scratchpad/vistazo';
(async () => {
  require('fs').mkdirSync(OUT, { recursive: true });
  const k = process.argv[2], ys = process.argv[3].split(',').map(Number), s = W[k];
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent });
  if (s.marca) await B.preparar(ctx, s.marca);
  const p = await ctx.newPage();
  await p.goto(s.url, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  await p.waitForTimeout(3500); await G.limpiar(p);
  for (const y of ys) {
    for (let yy = 0; yy <= y; yy += 600) { await p.evaluate((v) => { (window.__lenis || window.lenis)?.scrollTo?.(v, { immediate: true, force: true }); document.scrollingElement.scrollTop = v; }, yy); await p.waitForTimeout(60); }
    await p.evaluate((v) => { (window.__lenis || window.lenis)?.scrollTo?.(v, { immediate: true, force: true }); document.scrollingElement.scrollTop = v; }, y);
    await p.waitForTimeout(1600);
    await p.screenshot({ path: `${OUT}/${k}-${y}.jpg`, type: 'jpeg', quality: 60 });
  }
  await b.close();
  console.log('ok', ys.length);
})();
