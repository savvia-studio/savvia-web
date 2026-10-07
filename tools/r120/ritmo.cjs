const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/?carga=0&lenis=0', { waitUntil: 'networkidle' }); await p.waitForTimeout(9000);
  // muestreo en la página a cada fotograma durante 4 tiempos
  const m = await p.evaluate(() => new Promise((ok) => { const out = []; const t1 = performance.now() + 3800; const f = () => { const s = window.__sumi(); out.push([s.fase, s.pasoD, s.pasoM]); if (performance.now() < t1) requestAnimationFrame(f); else ok(out); }; requestAnimationFrame(f); }));
  // por décimas de tiempo: pose media del director
  const cubo = Array.from({ length: 10 }, () => []); for (const [fa, d] of m) cubo[Math.floor(((fa % 1) + 1) % 1 * 10)].push(d);
  console.log('pose del director por décima de tiempo (0 = arriba, 4 = golpe):', cubo.map((c) => c.length ? (c.reduce((a, x) => a + x, 0) / c.length).toFixed(1) : '-').join(' '));
  console.log('poses vistas', [...new Set(m.map((x) => x[1]))].sort(), 'músicos', [...new Set(m.map((x) => x[2]))].sort(), errs);
  await b.close();
})();
