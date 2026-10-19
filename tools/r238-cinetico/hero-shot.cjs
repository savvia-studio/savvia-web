const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 }, userAgent })).newPage();
  await p.goto('http://localhost:4332/?carga=0&estacion=otono', { waitUntil: 'load' }); await p.waitForTimeout(6000);
  await p.screenshot({ path: '/Users/andonimart/Desktop/savvia/savvia-web-main/tools/r238-cinetico/hero-1920.jpg', type: 'jpeg', quality: 80 }); await b.close(); })();
