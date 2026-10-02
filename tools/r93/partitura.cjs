// RONDA 93 · la partitura: fuera como la ronda 91 (cajas y cursores con píldora), dentro el hero de Neety en grande.
// Capturas por tiempo de compás (fotograma fijo con `ir`), consola, desborde y fotogramas lentos con el bucle en marcha.
// uso: node tools/r93/partitura.cjs [chrome|webkit] [ancho]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
const TIEMPOS = [0, 2, 4.4, 5.9, 6.7, 7.8, 9.0, 10.0, 11.4, 13.0, 14.7, 15.6, 17.8];
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0&lenis=0'); await p.waitForTimeout(1800);
  const y = await p.$eval('[data-cine]', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight / 2 - innerHeight / 2);
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(700);
  const { BEAT } = await p.evaluate(() => ({ BEAT: window.__partitura.BEAT }));
  const pref = `tools/shots/r93-partitura-${motor}-${W}`;
  for (const tb of TIEMPOS) {
    await p.evaluate((t) => window.__partitura.ir(t), tb * BEAT); await p.waitForTimeout(80);
    await p.screenshot({ path: `${pref}-b${String(tb).replace('.', '_')}.jpg`, quality: 72 });
  }
  // proporción del ensayo dentro del cuaderno, a cámara dentro
  const prop = await p.evaluate(() => { const c = document.querySelector('[data-ventana]'), n = c.querySelector('.neety'); return { cuaderno: c.offsetWidth + '×' + c.offsetHeight, neety: n.offsetWidth + '×' + n.offsetHeight, ancho: +(n.offsetWidth / c.offsetWidth).toFixed(2) }; });
  await p.evaluate(() => window.__partitura.seguir());
  const fr = await p.evaluate(() => new Promise((res) => { const ts = []; let a = performance.now(); const f = (x) => { ts.push(x - a); a = x; if (ts.length < 240) requestAnimationFrame(f); else res(ts); }; requestAnimationFrame(f); }));
  fr.sort((a, b) => a - b);
  const desborde = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const errsF = errs.filter((e) => !/treseiscero|multiverse|zernio|playground|neety|frame|iframe|\{\{/i.test(e));
  console.log(JSON.stringify({ motor, W, prop, desborde, p90: +fr[Math.floor(fr.length * 0.9)].toFixed(1), lentos: fr.filter((x) => x > 20).length + '/' + fr.length, errs: errsF, errsTodos: errs.length }));
  await b.close();
})();
