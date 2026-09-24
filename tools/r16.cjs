// Ronda 16 · la carga (logo + gota que rueda, cae con rastro, el hero sube) y el hero asentado. node tools/r16.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4340/', { waitUntil: 'domcontentloaded' });
  const t0 = Date.now(), ts = [500, 1000, 1500, 2000, 2400, 2800, 3100, 3400, 3700, 4200, 5200, 9000];
  for (const t of ts) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await p.screenshot({ path: `tools/shots/r16-${tag}-${t}.jpg`, type: 'jpeg', quality: 78 }); }
  const y = await p.evaluate(() => document.querySelector('[data-pasos]').getBoundingClientRect().top + scrollY);
  await p.evaluate((yy) => scrollTo(0, yy - 60), y); await p.waitForTimeout(2200); await p.screenshot({ path: `tools/shots/r16-${tag}-pasos.jpg`, type: 'jpeg', quality: 80 });
  await p.evaluate((yy) => scrollTo(0, yy - innerHeight * 0.75), y); await p.waitForTimeout(900); await p.screenshot({ path: `tools/shots/r16-${tag}-raices.jpg`, type: 'jpeg', quality: 80 });
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', await p.evaluate(() => ({ suelta: window.__gotaSuelta, velo: !!document.querySelector('[data-cargador]'), cargando: document.documentElement.classList.contains('cargando'), heroT: document.querySelector('[data-hero]').style.transform, desborde: document.documentElement.scrollWidth - innerWidth })));
  await b.close();
})();
