// Ronda 23 · el pie: el logotipo se dibuja, cae la gota, el paisaje se dibuja y se pinta desde el impacto; estaciones con el motor del árbol. node tools/r23-pie.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.mouse.wheel(0, 10); await p.waitForTimeout(1200);
  const shot = (n) => p.screenshot({ path: `tools/shots/r23-pie-${tag}-${n}.jpg`, type: 'jpeg', quality: 84 });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.evaluate((y) => scrollTo(0, y), H - 1400); await p.waitForTimeout(1500); // se crean los lienzos
  await p.evaluate((y) => scrollTo(0, y), H); // llega el pie
  const t0 = Date.now();
  for (const t of [400, 1000, 1500, 1900, 2300, 2800, 3600, 4600, 6200]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await shot(`d${t}`); }
  const dib = await p.evaluate(() => ({ pintado: document.querySelector('[data-paisaje]').classList.contains('pintado'), listos: [...document.querySelectorAll('[data-lienzo]')].map((c) => c.classList.contains('listo')), marcaW: Math.round(document.querySelector('[data-marca]').getBoundingClientRect().height), solape: (() => { const c = document.querySelector('.contenido .grid-12').getBoundingClientRect(), q = document.querySelector('.capa.montes').getBoundingClientRect(); return Math.round(c.bottom - q.top); })(), lineaBlend: getComputedStyle(document.querySelector('[data-linea]')).mixBlendMode }));
  await p.waitForTimeout(6000 + 1100); await shot('estacion-medio');
  await p.waitForTimeout(2000); await shot('estacion-fin');
  const est = await p.evaluate(() => document.querySelector('[data-paisaje]').dataset.estacion);
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify({ dib, est, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
