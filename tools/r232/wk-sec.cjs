const { webkit, chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const WK = process.argv[2] !== 'chrome';
  const b = WK ? await webkit.launch({ headless: true }) : await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, ...(WK ? {} : { userAgent }) })).newPage();
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.getElementById('servicios').scrollIntoView());
  await p.waitForTimeout(2500);
  const leer = () => p.evaluate(() => { const r = getComputedStyle(document.documentElement), s = getComputedStyle(document.getElementById('servicios')); return [r.getPropertyValue('--color-salvia'), r.getPropertyValue('--noche'), s.backgroundColor, r.transitionProperty.slice(0, 60)]; });
  console.log('antes', await leer());
  await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
  for (let i = 0; i < 5; i++) { await p.waitForTimeout(400); console.log(i * 400 + 400, await leer()); }
  await b.close();
})();
