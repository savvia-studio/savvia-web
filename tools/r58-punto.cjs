// Ronda 58 · la luz del punto final del pie: reposo · encendida · con el formulario (se apaga)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1200);
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(6500);
  await p.screenshot({ path: `tools/shots/r58-punto-${motor}-${W}-reposo.jpg`, quality: 70 });
  await p.click('[data-punto-luz]'); await p.waitForTimeout(1400);
  await p.screenshot({ path: `tools/shots/r58-punto-${motor}-${W}-encendida.jpg`, quality: 70 });
  const a = await p.evaluate(() => window.__punto());
  const c = await p.evaluate(() => { const r = document.querySelector('[data-contacta]').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  await p.mouse.move(c[0], c[1]); await p.waitForTimeout(1500);
  const f = await p.evaluate(() => [window.__punto(), document.querySelector('[data-pie]').classList.contains('form-abierto')]);
  console.log(motor, W, errs.length ? errs : 'sin errores', 'encendida', a.on, a.k, '→ con formulario', JSON.stringify([f[0].on, f[0].k, f[1]]), 'desborde', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  await b.close();
})();
