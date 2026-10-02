// RONDA 92 · la partitura con viaje de cámara: capturas cada ~0,7 s durante un bucle entero (o por fotograma fijo con `ir`), consola y desborde.
// uso: node tools/r92/partitura.cjs [chrome|webkit] [ancho] [vivo|fijo] [paleta]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, como = process.argv[4] || 'vivo';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0&lenis=0' + (process.argv[5] ? '&paleta=' + process.argv[5] : '')); await p.waitForTimeout(1800);
  const y = await p.$eval('[data-cine]', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight / 2 - innerHeight / 2 - 30);
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(700);
  const L = await p.evaluate(() => window.__partitura.LOOP);
  const pref = `tools/shots/r92-partitura-${motor}-${W}-${como}${process.argv[5] ? "-" + process.argv[5] : ""}`;
  const n = Math.ceil(L / 0.7);
  if (como === 'fijo') {
    for (let i = 0; i < n; i++) { await p.evaluate((t) => window.__partitura.ir(t), i * 0.7); await p.waitForTimeout(60); await p.screenshot({ path: `${pref}-${String(i).padStart(2, '0')}.jpg`, quality: 70 }); }
  } else {
    await p.evaluate(() => window.__partitura.seguir());
    const t0 = Date.now();
    for (let i = 0; i < n; i++) {
      const espera = t0 + i * 700 - Date.now(); if (espera > 0) await p.waitForTimeout(espera);
      await p.screenshot({ path: `${pref}-${String(i).padStart(2, '0')}.jpg`, quality: 70 });
    }
  }
  // fotogramas: tiempos entre rAF durante 3 s del bucle
  const fr = await p.evaluate(() => new Promise((res) => { const ts = []; let a = performance.now(); const f = (x) => { ts.push(x - a); a = x; if (ts.length < 180) requestAnimationFrame(f); else res(ts); }; requestAnimationFrame(f); }));
  fr.sort((a, b) => a - b);
  const desborde = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const errsF = errs.filter((e) => !/treseiscero|multiverse|zernio|playground|neety|frame|iframe|\{\{/i.test(e));
  console.log(JSON.stringify({ motor, W, como, L: +L.toFixed(2), capturas: n, desborde, p90: +fr[Math.floor(fr.length * 0.9)].toFixed(1), lentos: fr.filter((x) => x > 20).length + '/' + fr.length, errs: errsF, errsTodos: errs.length }));
  await b.close();
})();
