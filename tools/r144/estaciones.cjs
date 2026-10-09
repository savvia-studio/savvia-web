const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await p.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  for (const e of ['primavera', 'verano', 'otono', 'invierno']) {
    await p.goto(`http://localhost:4322/?lenis=0&carga=0&estacion=${e}`, { waitUntil: 'networkidle' });
    await p.evaluate(() => scrollTo(0, innerHeight * 1.15)); await p.waitForTimeout(3500);
    await p.screenshot({ path: `/tmp/r144-est-${e}.png` });
    console.log(e, await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-coral')));
  }
  await b.close();
})();
