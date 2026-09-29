// Ronda 67 · destacados: rotan de pie; al sentarse, pantalla de carga y web real; al cambiar de proyecto, carga. node tools/r67-destacados.cjs [motor] [ancho]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1000);
  const y = await p.evaluate(() => { const e = document.querySelector('[data-pista]'); return e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.36; });
  for (let yy = y - 1400; yy <= y; yy += 100) { await p.evaluate((v) => scrollTo(0, v), yy); await p.waitForTimeout(60); }
  await p.waitForTimeout(5500);
  const on = () => p.evaluate(() => [...document.querySelectorAll('[data-web]')].findIndex((w) => w.classList.contains('on')));
  const a0 = await on(); await p.screenshot({ path: `tools/shots/r67-dest-${motor}-${W}-0.jpg`, quality: 70 });
  await p.waitForTimeout(7600); const a1 = await on(); await p.waitForTimeout(700);
  await p.screenshot({ path: `tools/shots/r67-dest-${motor}-${W}-1.jpg`, quality: 70 });
  await p.click('[data-sentarse]', { force: true }); await p.waitForTimeout(1900);
  await p.screenshot({ path: `tools/shots/r67-dest-${motor}-${W}-carga.jpg`, quality: 70 });
  const iframe1 = await p.evaluate(() => !!document.querySelector('[data-web]:not([hidden]) iframe, [data-web]:not([hidden]) img'));
  await p.waitForTimeout(4000);
  await p.screenshot({ path: `tools/shots/r67-dest-${motor}-${W}-sentado.jpg`, quality: 70 });
  await p.click('[data-otro="1"]'); await p.waitForTimeout(500);
  await p.screenshot({ path: `tools/shots/r67-dest-${motor}-${W}-cambio.jpg`, quality: 70 });
  const cargaVisible = await p.evaluate(() => getComputedStyle(document.querySelector('.carga-web')).opacity);
  console.log(motor, W, errs.length ? errs.slice(0, 3) : 'sin errores', JSON.stringify({ rota: [a0, a1], montada: iframe1, cargaAlCambiar: cargaVisible }));
  await b.close();
})();
