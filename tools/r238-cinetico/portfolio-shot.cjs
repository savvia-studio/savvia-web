// RONDA 249 · cómo se ve la rejilla de /proyectos (referencia del muro del reel)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 }, userAgent })).newPage();
  await p.goto('http://localhost:4332/proyectos?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(200); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500);
  await p.screenshot({ path: 'portfolio.jpg', type: 'jpeg', quality: 70, fullPage: true });
  console.log(h); await b.close(); })();
