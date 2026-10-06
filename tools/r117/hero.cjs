// RONDA 117 · carga en claro (la gota recorre el isotipo y cae de la bola) → director tramado y más pequeño → pulsos desde abajo que desvelan la terraza → el director se deshace en el manifiesto
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4321/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(URL); await p.waitForTimeout(900);
  const tag = `${motor}-${W}${URL.includes('clara') ? '-clara' : ''}`;
  const cx = W * 0.45, cy = H * 0.4, s = Math.min(W, H) * 0.13;
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.8 + s * 0.7 * (i / 14), cy - s + 2 * s * (i / 14));
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.1 + s * 1.1 * (i / 14), cy + s - 2.3 * s * (i / 14));
  await p.mouse.click(W * 0.9, H * 0.9);
  const t0 = Date.now();
  for (const [i, ms] of [[1, 450], [2, 1100], [3, 1700], [4, 2600], [5, 3600], [6, 8000], [7, 12500]]) { const f = ms - (Date.now() - t0); if (f > 0) await p.waitForTimeout(f); await p.screenshot({ path: `tools/shots/r117-${tag}-${i}.jpg`, quality: 72 }); }
  const est = await p.evaluate(() => ({ sumi: window.__sumi?.(), jazz: window.__jazz?.(), dis: window.__disuelve?.() }));
  for (const [i, y] of [[8, 0.3], [9, 0.6], [10, 0.95], [11, 1.4]]) { await p.evaluate((f) => window.scrollTo(0, innerHeight * f), y); await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/r117-${tag}-${i}.jpg`, quality: 72 }); }
  const dis2 = await p.evaluate(() => window.__disuelve?.());
  const des = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(JSON.stringify({ tag, errs, ...est, dis2, desborde: des }));
  await b.close();
})();
