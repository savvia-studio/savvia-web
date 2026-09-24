// Ronda 20 · la carga arranca dibujando un CÍRCULO con el ratón; las v se dibujan a trazo. node tools/r20-carga.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' });
  const shot = (n) => p.screenshot({ path: `tools/shots/r20-carga-${tag}-${n}.jpg`, type: 'jpeg', quality: 85 });
  await p.waitForTimeout(2200); await shot('espera');
  const espera = await p.evaluate(() => ({ pista: document.querySelector('[data-carga-pista]').classList.contains('ver'), fija: getComputedStyle(document.querySelector('[data-logo] .fija')).opacity, cargando: document.documentElement.classList.contains('cargando') }));
  // un círculo con el ratón: 28 puntos en 700 ms alrededor del centro, radio 70
  const cx = +w * 0.5, cy = +h * 0.62, R = 70;
  for (let i = 0; i <= 28; i++) { const a = (i / 28) * Math.PI * 2.1; await p.mouse.move(cx + Math.cos(a) * R, cy + Math.sin(a) * R); await p.waitForTimeout(25); }
  await shot('circulo');
  const t0 = Date.now();
  const arr = await p.evaluate(() => document.querySelector('[data-cargador]').classList.contains('circulo'));
  for (const t of [300, 700, 1100, 1500, 1900, 2300, 2700, 3000, 3300, 3700, 4100, 4500]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await shot(`r${t}`); }
  const pl = await p.evaluate(() => document.querySelector('[data-plumada]') && document.querySelector('[data-plumada]').getAttribute('stroke-dashoffset'));
  await p.waitForTimeout(3000); await shot('fin');
  const fin = await p.evaluate(() => ({ suelta: !!window.__gotaSuelta, cargando: document.documentElement.classList.contains('cargando'), heroTr: document.querySelector('[data-hero]').style.transform, velo: !!document.querySelector('[data-cargador]') }));
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify({ espera, circulo: arr, plumadaAlFinal: pl, fin }));
  await b.close();
})();
