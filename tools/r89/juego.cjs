// RONDA 89 · la carga: primer fotograma (el isotipo no sale raro), la posición del isotipo fotograma a fotograma al resolver (sin salto), y el hero con su magia
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4331/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.addInitScript(() => { window.__marcos = []; const mira = () => { const l = document.querySelector('[data-logo]'); if (l) { const r = l.getBoundingClientRect(); window.__marcos.push([Math.round(performance.now()), Math.round(r.left), Math.round(r.top), Math.round(r.width), getComputedStyle(l).visibility]); } requestAnimationFrame(mira); }; requestAnimationFrame(mira); });
  await p.goto(URL + '?carga=1');
  await p.screenshot({ path: `tools/shots/r89-carga0-${motor}-${W}.jpg`, quality: 60 });
  await p.waitForTimeout(900);
  const t0 = Date.now();
  while (Date.now() - t0 < 20000) {
    const s = await p.evaluate(() => window.__carga?.());
    if (!s || s.aciertos >= 4) break;
    const prox = Math.min(...s.llegadas.filter((x) => x > -0.1));
    if (isFinite(prox) && Math.abs(prox) < 0.06) { await p.mouse.click(W / 2, H * 0.8); await p.waitForTimeout(150); } else await p.waitForTimeout(15);
  }
  const tRes = await p.evaluate(() => performance.now());
  await p.waitForTimeout(2600);
  // saltos: cualquier fotograma visible del isotipo que se aleje más de 60 px del anterior
  const m = await p.evaluate(() => window.__marcos);
  const tras = m.filter((x) => x[0] > tRes - 400 && x[4] === 'visible');
  let salto = 0, donde = null; for (let i = 1; i < tras.length; i++) { const d = Math.hypot(tras[i][1] - tras[i - 1][1], tras[i][2] - tras[i - 1][2]); if (d > salto) { salto = d; donde = tras.slice(Math.max(0, i - 2), i + 2); } }
  const primeros = m.slice(0, 4);
  for (let i = 0; i < 4; i++) { await p.waitForTimeout(i ? 1400 : 3000); await p.screenshot({ path: `tools/shots/r89-hero-${motor}-${W}-${i}.jpg`, quality: 70 }); }
  console.log(JSON.stringify({ motor, W, errs, saltoMax: Math.round(salto), donde, primeros, magia: await p.evaluate(() => window.__heroMagia?.()), crecido: await p.evaluate(() => document.querySelector('[data-hero]').classList.contains('crecido')) }));
  await b.close();
})();
