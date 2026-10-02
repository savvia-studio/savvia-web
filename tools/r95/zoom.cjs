// RONDA 95 · primer plano de la estela a un avance dado: node tools/r95/zoom.cjs <lin> [chrome|webkit] [clara] [esperaMs]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const lin = +(process.argv[2] || 0.6), motor = process.argv[3] || 'chrome', clara = process.argv[4] === 'clara', espera = +(process.argv[5] || 300);
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1100 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage();
  await p.goto(`http://localhost:4331/?carga=0&lenis=0${clara ? '&paleta=clara' : ''}`); await p.waitForTimeout(2000);
  const top = await p.$eval('[data-paseo]', (e) => e.getBoundingClientRect().top + scrollY);
  for (let k = 0; k <= 20; k++) { await p.evaluate((y) => scrollTo(0, y), top - 1100 * 0.96 + 1100 * 0.66 * lin * (k / 20)); await p.waitForTimeout(50); }
  await p.waitForTimeout(espera);
  const bb = await (await p.$('[data-paseo]')).boundingBox();
  await p.screenshot({ path: `tools/shots/r95-zoom-${motor}${clara ? '-clara' : ''}-${lin}.png`, clip: { x: 0, y: bb.y + bb.height * 0.55, width: 1280, height: bb.height * 0.75 } });
  await b.close();
})();
