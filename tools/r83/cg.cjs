const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const cx = await b.newContext({ userAgent }); await cx.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => false })); const p = await cx.newPage();
  await p.goto('http://localhost:4332/'); await p.waitForTimeout(800); const a = await p.evaluate(() => document.documentElement.classList.contains('cargando'));
  await p.keyboard.press('Escape'); await p.waitForTimeout(1500);
  await p.reload(); await p.waitForTimeout(800); const c = await p.evaluate(() => document.documentElement.classList.contains('cargando'));
  console.log(JSON.stringify({ primeraVisita: a, alRecargar: c })); await b.close(); })();
