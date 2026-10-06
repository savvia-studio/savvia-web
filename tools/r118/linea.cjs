const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(3500);
  const y = await p.evaluate(() => document.querySelector('[data-dolores]').getBoundingClientRect().top + scrollY);
  await p.evaluate((y) => window.scrollTo(0, y - 360), y); await p.waitForTimeout(900);
  const filas = await p.evaluate((y) => [...document.querySelectorAll('.fila, [class*="fila"]')].map((f) => Math.round(f.getBoundingClientRect().top + scrollY)).filter((t) => Math.abs(t - y) < 6), y);
  await p.screenshot({ path: 'tools/shots/r118-linea.jpg', quality: 70, clip: { x: 0, y: 260, width: 1280, height: 200 } });
  console.log(JSON.stringify({ seccion: Math.round(y), filas })); await b.close();
})();
