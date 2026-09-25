// Ronda 55 · los óleos de los dolores siguen a la estación: clic en el icono → cada óleo cambia de cuadro (lienzo nuevo) sin errores
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', url = process.argv[3] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(2000);
  const sec = '#recorrido-a2';
  const [y0, h] = await p.evaluate((s) => { const e = document.querySelector(s); return [e.getBoundingClientRect().top + scrollY, e.offsetHeight]; }, sec);
  for (let y = y0 - 400; y < y0 + h; y += 120) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(60); }
  const yy = await p.evaluate((s) => document.querySelectorAll(`${s} [data-parada]`)[1].getBoundingClientRect().top + scrollY, sec);
  await p.evaluate((v) => scrollTo(0, v - 60), yy); await p.waitForTimeout(3500);
  const antes = await p.evaluate((s) => [...document.querySelectorAll(`${s} [data-rama] img`)].map((i) => i.getAttribute('src')), sec);
  await p.screenshot({ path: `tools/shots/r55-oleo-${motor}-antes.jpg`, quality: 70 });
  await p.evaluate(() => document.querySelector('[data-estacion-ic]').closest('button').click()); await p.waitForTimeout(650); await p.screenshot({ path: `tools/shots/r55-oleo-${motor}-mitad.jpg`, quality: 70 }); await p.waitForTimeout(3200);
  const despues = await p.evaluate((s) => [...document.querySelectorAll(`${s} [data-rama] img`)].map((i) => i.getAttribute('src')), sec);
  await p.screenshot({ path: `tools/shots/r55-oleo-${motor}-despues.jpg`, quality: 70 });
  console.log(motor, errs.length ? errs.slice(0, 3) : 'sin errores', antes[1], '→', despues[1], 'lienzos', await p.evaluate((s) => document.querySelectorAll(`${s} [data-rama] canvas`).length, sec));
  await b.close();
})();
