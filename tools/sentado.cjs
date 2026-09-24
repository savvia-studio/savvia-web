// Sentado (ronda 17b): ordenador y mesa nítidos, solo el paisaje desenfocado. node tools/sentado.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4340/', { waitUntil: 'load' }); await p.mouse.click(640, 100); await p.waitForTimeout(800);
  const yq = await p.evaluate(() => document.querySelector('[data-pista]').getBoundingClientRect().top + scrollY), H = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight);
  await p.evaluate((y) => scrollTo(0, y), yq + (H - 720) * 0.5); await p.waitForTimeout(5200);
  await p.click('[data-sentarse]'); await p.waitForTimeout(2000);
  await p.screenshot({ path: `tools/shots/sentado-${motor}.jpg`, type: 'jpeg', quality: 85 });
  await p.click('[data-otro="1"]'); await p.waitForTimeout(2600);
  await p.screenshot({ path: `tools/shots/sentado-${motor}-2.jpg`, type: 'jpeg', quality: 85 });
  console.log(motor, errs.length ? errs : 'sin errores', await p.evaluate(() => [...document.querySelectorAll('[data-nitida]')].map((n) => [n.dataset.nitida, n.complete && n.naturalWidth, n.classList.contains('on')])));
  await b.close();
})();
