// RONDA 113 · la cuenta (fotogramas por tiempo) y el cartel (entrada y reposo), en Chrome o WebKit
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4321/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.addInitScript(() => { window.__vs = []; const mira = () => { const v = document.querySelector('[data-entrada] [data-v]'); if (v) { const r = v.getBoundingClientRect(); window.__vs.push([Math.round(performance.now()), Math.round(r.left), Math.round(r.top)]); } requestAnimationFrame(mira); }; requestAnimationFrame(mira); });
  await p.goto(URL);
  const tag = `${motor}-${W}`;
  for (const [i, ms] of [[0, 300], [1, 1600], [2, 2500], [3, 3300], [4, 4200], [5, 5000], [6, 5600], [7, 6300], [8, 8500]].map((x) => x)) {
    const ya = await p.evaluate(() => performance.now()); if (ms > ya) await p.waitForTimeout(ms - ya);
    await p.screenshot({ path: `tools/shots/r113-${tag}-${i}.jpg`, quality: 65 });
  }
  const vs = await p.evaluate(() => window.__vs); let salto = 0; for (let i = 1; i < vs.length; i++) salto = Math.max(salto, Math.hypot(vs[i][1] - vs[i - 1][1], vs[i][2] - vs[i - 1][2]));
  const estado = await p.evaluate(() => ({ velo: !!document.querySelector('[data-entrada]'), cargando: document.documentElement.classList.contains('cargando'), encendido: document.querySelector('[data-cartel]')?.classList.contains('encendido'), jazz: window.__jazz?.(), desborde: document.documentElement.scrollWidth - innerWidth }));
  console.log(JSON.stringify({ tag, errs, saltoV: Math.round(salto), ...estado }));
  await b.close();
})();
