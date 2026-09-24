// Ronda 19 · la carga: «sa  ia» + pista, mantener pulsado, las v dibujadas por la gota, cuello, caída con desenfoque, árbol. node tools/r19-carga.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  const shot = (n) => p.screenshot({ path: `tools/shots/r19-carga-${tag}-${n}.jpg`, type: 'jpeg', quality: 85 });
  await p.waitForTimeout(2300); await shot('espera');
  const espera = await p.evaluate(() => ({ pista: document.querySelector('[data-pista]').classList.contains('ver'), fija: getComputedStyle(document.querySelector('[data-logo] .fija')).opacity, gota: getComputedStyle(document.querySelector('[data-gota]')).opacity, cargando: document.documentElement.classList.contains('cargando') }));
  // mantener pulsado: la gota se llena en 0,9 s
  await p.mouse.move(+w / 2, +h / 2); await p.mouse.down();
  await p.waitForTimeout(500); await shot('llenando');
  await p.waitForTimeout(600);
  const t0 = Date.now();
  await p.mouse.up();
  for (const t of [300, 700, 1100, 1500, 1900, 2350, 2600, 2850, 3050, 3300, 3600, 3900, 4200]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await shot(`r${t}`); }
  await p.waitForTimeout(3000); await shot('fin');
  const fin = await p.evaluate(() => ({ suelta: !!window.__gotaSuelta, cargando: document.documentElement.classList.contains('cargando'), heroTr: document.querySelector('[data-hero]').style.transform, velo: !!document.querySelector('[data-cargador]'), crecido: document.querySelector('[data-hero]').classList.contains('crecido') }));
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify({ espera, fin }));
  await b.close();
})();
