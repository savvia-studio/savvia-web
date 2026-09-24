// Ronda 50 · el tinte del cristal de la barra: neutro mientras carga, el de la web al descubrirse. node tools/r50-tinte.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  const ypr = await p.evaluate(() => document.getElementById('proyectos').getBoundingClientRect().top + scrollY), alto = await p.evaluate(() => document.querySelector('#proyectos .pista').offsetHeight);
  const tinte = () => p.evaluate(() => ({ fondo: getComputedStyle(document.querySelector('.tras-cromo')).backgroundColor, cargando: !!document.querySelector('.web:not([hidden]).cargando') }));
  const barra = async (n) => { const c = await p.evaluate(() => { const r = document.querySelector('.cromo').getBoundingClientRect(); return { x: r.x - 8, y: r.y - 8, width: r.width + 16, height: r.height + 60 }; }); await p.screenshot({ path: `tools/shots/r50-${motor}-tinte-${n}.png`, clip: c }); };
  await p.evaluate((y) => scrollTo(0, y), ypr + (alto - 720) * 0.3); await p.waitForTimeout(600); await p.evaluate((y) => scrollTo(0, y), ypr + (alto - 720) * 0.6);
  const R = {};
  await p.waitForTimeout(1600); R.estreno = await tinte(); await barra('cargando');
  await p.waitForTimeout(7000); R.multiverse = await tinte(); await barra('multiverse');
  await p.click('[data-giro="1"]').catch(() => {}); await p.waitForTimeout(700); R.cambiando = await tinte(); await barra('cambiando');
  await p.waitForTimeout(7000); R.siguiente = await tinte(); await barra('siguiente');
  console.log(motor, errs.length ? errs : 'sin errores', JSON.stringify(R)); await b.close();
})();
