// Ronda 67 · la cuadrícula (líneas guía) y el testimonio tramado, con su relevo: node tools/r67-mas.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1200);
  const y1 = await p.evaluate(() => document.querySelector('[data-cuadricula]').getBoundingClientRect().top + scrollY - 200);
  await p.evaluate((v) => scrollTo(0, v), y1); await p.waitForTimeout(2500);
  await p.screenshot({ path: `tools/shots/r67-cuadricula-${motor}.jpg`, quality: 72 });
  const y2 = await p.evaluate(() => document.querySelector('[data-voz]').getBoundingClientRect().top + scrollY - 120);
  await p.evaluate((v) => scrollTo(0, v), y2); await p.waitForTimeout(2000);
  await p.screenshot({ path: `tools/shots/r67-voz-${motor}-0.jpg`, quality: 72 });
  await p.click('[data-paso="1"]'); await p.waitForTimeout(450);
  await p.screenshot({ path: `tools/shots/r67-voz-${motor}-1.jpg`, quality: 72 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `tools/shots/r67-voz-${motor}-2.jpg`, quality: 72 });
  console.log(motor, errs.length ? errs : 'sin errores');
  await b.close();
})();
