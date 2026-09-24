// Otros trabajos (ronda 18): mosaico, entrada y los logotipos que rotan. node tools/otros.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e))); p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4340/', { waitUntil: 'load' }); await p.mouse.click(+w / 2, 100); await p.waitForTimeout(800);
  const ya = await p.evaluate(() => document.querySelector('#anteriores').getBoundingClientRect().top + scrollY);
  const full = await p.evaluate(() => document.querySelector('#anteriores').offsetHeight);
  for (let y = ya - 100; y < ya + full; y += +h * 0.6) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(500); }
  await p.waitForTimeout(1500);
  await p.locator('#anteriores').screenshot({ path: `tools/shots/otros-${motor}-${w}.jpg`, type: 'jpeg', quality: 82 });
  await p.evaluate((yy) => scrollTo(0, yy), ya + 140); await p.waitForTimeout(400);
  const rota = p.locator('[data-rota]');
  for (let i = 0; i < 6; i++) { await rota.screenshot({ path: `tools/shots/otros-${motor}-${w}-rota${i}.jpg`, type: 'jpeg', quality: 85 }); await p.waitForTimeout(i % 2 ? 2300 : 500); }
  console.log(motor, w, errs.length ? errs : 'sin errores', 'alto', full);
  await b.close();
})();
