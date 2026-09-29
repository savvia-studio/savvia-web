// Ronda 66 · la carga con la palabra y la estación: node tools/r66-carga.cjs [motor] [estacion]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', est = process.argv[3] || 'otono', W = 1280, H = 720;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(`http://localhost:4321/?estacion=${est}`); await p.waitForTimeout(1500); await p.screenshot({ path: `tools/shots/r68-carga-${motor}-${est}-inicio.jpg`, quality: 70 });
  await p.mouse.move(W / 2 + 60, H / 2);
  for (let a = 0; a <= 380; a += 12) await p.mouse.move(W / 2 + 60 * Math.cos((a * Math.PI) / 180), H / 2 + 60 * Math.sin((a * Math.PI) / 180));
  const tiempos = [100, 700, 700, 900, 500, 500, 600];
  for (const [i, t] of tiempos.entries()) { await p.waitForTimeout(t); await p.screenshot({ path: `tools/shots/r68-carga-${motor}-${est}-${i}.jpg`, quality: 70 }); }
  await p.waitForTimeout(4000);
  await p.screenshot({ path: `tools/shots/r68-hero-${motor}-${est}.jpg`, quality: 75 });
  const st = await p.evaluate(() => ({ velo: !!document.querySelector('[data-cargador]'), hora: document.querySelector('[data-hora]').textContent, lamina: document.querySelector('[data-hero] [data-lamina]').getAttribute('src') }));
  console.log(motor, est, errs.length ? errs.slice(0, 4) : 'sin errores', JSON.stringify(st));
  await b.close();
})();
