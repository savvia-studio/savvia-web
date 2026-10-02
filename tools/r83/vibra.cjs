// RONDA 85 · ¿el tramado del director vibra? píxeles de la caja del director que cambian en 250 ms
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
(async () => {
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); await p.goto('http://localhost:4332/'); await p.waitForTimeout(6000);
  const caja = await (await p.$('.arbol-caja')).boundingBox();
  const a = await p.screenshot({ clip: caja }); await p.waitForTimeout(250); const c = await p.screenshot({ clip: caja });
  const [x, y] = await Promise.all([a, c].map((q) => sharp(q).raw().toBuffer()));
  let n = 0; for (let i = 0; i < x.length; i += 3) if (Math.abs(x[i] - y[i]) + Math.abs(x[i + 1] - y[i + 1]) + Math.abs(x[i + 2] - y[i + 2]) > 18) n++;
  console.log(JSON.stringify({ cambian: +(100 * n / (x.length / 3)).toFixed(1) + ' %' }));
  await b.close();
})();
