// Ronda 68 · la llegada a Proyectos destacados: el titular se funde en la pantalla de carga (sin teclear la dirección) y se descubre la web
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(600); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1500);
  const y0 = await p.evaluate(() => document.querySelector('[data-estudio]').getBoundingClientRect().top + scrollY);
  for (let k = 0; k <= 20; k++) { await p.evaluate((y) => scrollTo(0, y), y0 + k * H * 0.07); await p.waitForTimeout(60); }
  const est = [];
  for (const [i, t] of [[0, 150], [1, 500], [2, 700], [3, 1600]].entries()) {
    await p.waitForTimeout(t[1]);
    await p.screenshot({ path: `tools/shots/r68-estreno-${motor}-${W}-${i}.jpg`, quality: 70 });
    est.push(await p.evaluate(() => ({ estrenando: document.querySelector('[data-pantalla]').classList.contains('estrenando'), url: document.querySelector('[data-carga-url]').textContent, carga: getComputedStyle(document.querySelector('.carga-web')).opacity })));
  }
  console.log(motor, W, errs.length ? errs : 'sin errores', JSON.stringify(est));
  await b.close();
})();
