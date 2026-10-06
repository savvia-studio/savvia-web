// RONDA 117 · savvia agentic: la película de la librería de Neety en tiempo real (sin música).
// Capturas por segundo del bucle (fotograma fijo con `ir`), consola, desborde, palabras prohibidas en el texto visible y fotogramas lentos (>20 ms) en 4 s.
// uso: node tools/r117/partitura.cjs [chrome|webkit] [ancho] [ruta]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, ruta = process.argv[4] || '/';
const TIEMPOS = [1.2, 3.0, 5.5, 7.1, 9.7, 11.5, 12.3, 14.8];
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(`http://localhost:4321${ruta}?carga=0&lenis=0`); await p.waitForTimeout(1800);
  const y = await p.$eval('[data-cine]', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight / 2 - innerHeight / 2);
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(700);
  const sufijo = ruta.includes('clara') ? '-clara' : '';
  const pref = `tools/shots/r117-partitura-${motor}-${W}${sufijo}`;
  for (const t of TIEMPOS) {
    await p.evaluate((t) => window.__partitura.ir(t), t); await p.waitForTimeout(90);
    await p.screenshot({ path: `${pref}-t${String(t).replace('.', '_')}.png` });
  }
  // texto visible de la sección (y lo que la película llega a escribir): nada de música
  const texto = await p.evaluate(() => { const s = document.querySelector('[data-partitura]'); return s.innerText + ' ' + s.querySelector('[data-cine]').getAttribute('aria-label') + ' ' + [...s.querySelectorAll('svg text')].map((x) => x.textContent).join(' '); });
  const prohibidas = (texto.match(/pentagram|pauta|\bnotas?\b|\bfine\b|allegro|compás|partitura|cuerda|ensayo|batuta|tempo|orquest|m[uú]sica/gi) || []);
  await p.evaluate(() => window.__partitura.seguir());
  const fr = await p.evaluate(() => new Promise((res) => { const ts = []; let a = performance.now(); const t0 = a; const f = (x) => { ts.push(x - a); a = x; if (x - t0 < 4000) requestAnimationFrame(f); else res(ts); }; requestAnimationFrame(f); }));
  fr.sort((a, b) => a - b);
  const desborde = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  const errsF = errs.filter((e) => !/treseiscero|multiverse|zernio|playground|neety\.|frame|iframe|\{\{/i.test(e));
  console.log(JSON.stringify({ motor, W, ruta, desborde, prohibidas, p90: +fr[Math.floor(fr.length * 0.9)].toFixed(1), lentos: fr.filter((x) => x > 20).length + '/' + fr.length, errs: errsF, errsTodos: errs.length }));
  await b.close();
})();
