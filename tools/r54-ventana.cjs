// Ronda 54 · la ventana del pie: cerrada → abierta (el haz crece) → cerrada. node tools/r54-ventana.cjs [motor] [ancho]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1500);
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(6500);
  await p.screenshot({ path: `tools/shots/r54-ventana-${motor}-${W}-0.jpg`, quality: 72 });
  await p.click('[data-ventana]'); await p.waitForTimeout(700);
  await p.screenshot({ path: `tools/shots/r54-ventana-${motor}-${W}-1.jpg`, quality: 72 });
  await p.waitForTimeout(2200);
  await p.screenshot({ path: `tools/shots/r54-ventana-${motor}-${W}-2.jpg`, quality: 72 });
  const abierta = await p.evaluate(() => window.__ventana());
  await p.click('[data-ventana]'); await p.waitForTimeout(1200);
  const cerrada = await p.evaluate(() => window.__ventana());
  console.log(motor, W, errs.length ? errs : 'sin errores', JSON.stringify({ abierta: [abierta.abierta, abierta.k], cerrada: [cerrada.abierta, cerrada.k] }));
  await b.close();
})();
