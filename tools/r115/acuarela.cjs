// RONDA 116 · la V SIN CLICAR (solo moviendo el ratón), el isotipo que nace de ella, la gota que cae a los pies y el director pintándose con el motor del roble
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4321/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(URL); await p.waitForTimeout(1000);
  const tag = `${motor}-${W}${URL.includes('clara') ? '-clara' : ''}`;
  await p.screenshot({ path: `tools/shots/r116-${tag}-0.jpg`, quality: 70 });
  const cx = W * 0.42, cy = H * 0.42, s = Math.min(W, H) * 0.13;
  // un garabato que NO es una V (horizontal)
  for (let i = 0; i <= 16; i++) await p.mouse.move(cx - s + (2 * s * i) / 16, cy + 60 + Math.sin(i) * 4);
  await p.waitForTimeout(1700);
  const sigue = await p.evaluate(() => !!document.querySelector('[data-entrada-v]') && !window.__gotaSuelta);
  // la V, SIN pulsar
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.8 + s * 0.7 * (i / 14), cy - s + 2 * s * (i / 14));
  await p.screenshot({ path: `tools/shots/r116-${tag}-1.jpg`, quality: 70 });
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.1 + s * 1.1 * (i / 14), cy + s - 2.3 * s * (i / 14));
  await p.waitForTimeout(400); await p.screenshot({ path: `tools/shots/r116-${tag}-2.jpg`, quality: 70 });
  await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/r116-${tag}-3.jpg`, quality: 70 });
  const ok = await p.waitForFunction(() => window.__gotaSuelta === true, null, { timeout: 6000 }).then(() => true, () => false);
  const t0 = Date.now();
  for (const [i, ms] of [[4, 400], [5, 1500], [6, 3000], [7, 6000]]) { const f = ms - (Date.now() - t0); if (f > 0) await p.waitForTimeout(f); await p.screenshot({ path: `tools/shots/r116-${tag}-${i}.jpg`, quality: 75 }); }
  const est = await p.evaluate(() => ({ sumi: window.__sumi?.(), jazz: window.__jazz?.(), velo: !!document.querySelector('[data-entrada-v]'), desborde: document.documentElement.scrollWidth - innerWidth }));
  console.log(JSON.stringify({ tag, errs, garabatoNoEntra: sigue, vReconocida: ok, ...est }));
  await b.close();
})();
