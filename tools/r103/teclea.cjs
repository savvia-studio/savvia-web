// RONDA 108 · el director y «Contáctanos» se escriben signo a signo
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280);
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForSelector('[data-lienzo].listo', { timeout: 8000 }).catch(() => {});
  const lz = await (await p.$('[data-lienzo]')).boundingBox(), clip = { x: lz.x, y: lz.y, width: lz.width, height: lz.height };
  let t = 0; for (const ms of [400, 1200, 2200, 4000]) { await p.waitForTimeout(ms - t); t = ms; await p.screenshot({ path: `tools/shots/r108-hero-${motor}-${W}-${ms}.jpg`, quality: 72, clip }); }
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); 
  const fin = await (await p.$('[data-contacta]')).boundingBox();
  t = 0; for (const ms of [1300, 2200, 3400, 5000]) { await p.waitForTimeout(ms - t); t = ms; await p.screenshot({ path: `tools/shots/r108-pie-${motor}-${W}-${ms}.jpg`, quality: 72, clip: { x: 0, y: Math.max(0, fin.y - 120), width: W, height: Math.min(360, (W > 600 ? 720 : 844) - Math.max(0, fin.y - 120)) } }); }
  console.log(JSON.stringify({ motor, W, errs, entera: await p.evaluate(() => document.querySelector('[data-pie]').classList.contains('entera')) }));
  await b.close();
})();
