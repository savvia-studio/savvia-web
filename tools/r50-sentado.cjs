// Ronda 50 · la barra de cristal al sentarse: durante el viaje y al posarse. node tools/r50-sentado.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  const ypr = await p.evaluate(() => document.getElementById('proyectos').getBoundingClientRect().top + scrollY), alto = await p.evaluate(() => document.querySelector('#proyectos .pista').offsetHeight);
  await p.evaluate((y) => scrollTo(0, y), ypr + (alto - 720) * 0.3); await p.waitForTimeout(600); await p.evaluate((y) => scrollTo(0, y), ypr + (alto - 720) * 0.6); await p.waitForTimeout(8000);
  const estado = () => p.evaluate(() => { const c = document.querySelector('.cromo'), cs = getComputedStyle(c), t = getComputedStyle(document.querySelector('.tras-cromo')); return { dolly: !!document.querySelector('.escena.dolly'), fondo: cs.backgroundColor, cristal: cs.backdropFilter || cs.webkitBackdropFilter, tras: getComputedStyle(document.querySelector('.tras-cromo'), '::before').filter }; });
  const R = { de_pie: await estado() };
  await p.click('[data-sentarse]'); await p.waitForTimeout(600); R.viaje = await estado();
  await p.screenshot({ path: `tools/shots/r50-${motor}-sentado-viaje.jpg`, type: 'jpeg', quality: 82 });
  await p.waitForTimeout(2200); R.sentado = await estado();
  const cb = await p.evaluate(() => { const r = document.querySelector('.cromo').getBoundingClientRect(); return { x: r.x - 10, y: r.y - 10, width: r.width + 20, height: r.height + 80 }; });
  await p.screenshot({ path: `tools/shots/r50-${motor}-sentado-barra.jpg`, type: 'jpeg', quality: 86, clip: cb });
  console.log(motor, errs.length ? errs : 'sin errores', JSON.stringify(R)); await b.close();
})();
