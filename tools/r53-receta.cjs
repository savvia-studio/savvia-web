// Ronda 53 · la receta de papel: llegada (tiras imprimiéndose) y reposo, en escritorio y móvil. node tools/r53-receta.cjs [motor] [ancho] [url]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(2000);
  const y = await p.evaluate(() => document.getElementById('la-savvia').getBoundingClientRect().top + scrollY);
  await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(250);
  await p.screenshot({ path: `tools/shots/r53-receta-${motor}-${W}-a.jpg`, quality: 72 });
  await p.evaluate((yy) => scrollTo(0, yy + (innerHeight > 800 ? 300 : 420)), y); await p.waitForTimeout(700);
  await p.screenshot({ path: `tools/shots/r53-receta-${motor}-${W}-b.jpg`, quality: 72 });
  await p.waitForTimeout(6500);
  await p.screenshot({ path: `tools/shots/r53-receta-${motor}-${W}-c.jpg`, quality: 72 });
  const est = await p.evaluate(() => ({ impresas: [...document.querySelectorAll('[data-tira]')].map((t) => t.classList.contains('impresa')), desborde: document.documentElement.scrollWidth - innerWidth }));
  console.log(motor, W, errs.length ? errs : 'sin errores', JSON.stringify(est));
  await b.close();
})();
