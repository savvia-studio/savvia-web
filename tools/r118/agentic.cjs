// RONDA 118 · savvia agentic con la librería real de Neety: capturas del bucle (fotograma fijo), errores, desborde y fotogramas lentos (CPU ×4 en Chrome).
// uso: node tools/r118/agentic.cjs [chrome|webkit] [ancho] [ruta]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, ruta = process.argv[4] || '/';
const TIEMPOS = (process.argv[5] || '5.2,6.2,6.75,7.2,7.5,8.1,8.4,9.0,9.9,10.5,11.4,12.4').split(',').map(Number);
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(`http://localhost:4321${ruta}?carga=0&lenis=0`); await p.waitForTimeout(1800);
  const y = await p.$eval('[data-cine]', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight / 2 - innerHeight / 2);
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(900);
  const pref = `tools/shots/r118a-${motor}-${W}`;
  for (const t of TIEMPOS) {
    await p.evaluate((t) => window.__partitura.ir(t), t); await p.waitForTimeout(110);
    await p.locator('[data-cine]').screenshot({ path: `${pref}-t${String(t).replace('.', '_')}.jpg`, type: 'jpeg', quality: 82 });
  }
  await p.evaluate(() => window.__partitura.seguir());
  if (motor === 'chrome') { const c = await ctx.newCDPSession(p); await c.send('Emulation.setCPUThrottlingRate', { rate: 4 }); }
  await p.waitForTimeout(500);
  const fr = await p.evaluate(() => new Promise((res) => { const ts = []; let a = performance.now(); const t0 = a; const f = (x) => { ts.push(x - a); a = x; if (x - t0 < 16500) requestAnimationFrame(f); else res(ts); }; requestAnimationFrame(f); }));
  const s = [...fr].sort((a, b) => a - b);
  const desborde = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const errsF = errs.filter((e) => !/treseiscero|multiverse|zernio|playground|neety\.|frame|iframe|\{\{/i.test(e));
  console.log(JSON.stringify({ motor, W, desborde, p50: +s[Math.floor(s.length * 0.5)].toFixed(1), p90: +s[Math.floor(s.length * 0.9)].toFixed(1), max: +s[s.length - 1].toFixed(0), lentos50: fr.filter((x) => x > 50).length + '/' + fr.length, errs: errsF, errsTodos: errs.length }));
  await b.close();
})();
