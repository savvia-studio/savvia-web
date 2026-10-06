// RONDA 116 (2.ª) · la V sin clicar → isotipo → gota de agua con cámara → director; luz, ondas que desvelan la orquesta, raíces musicales con el scroll
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
  // un clic: el audio solo puede arrancar con un gesto
  await p.mouse.click(W * 0.9, H * 0.9);
  const t0 = Date.now(), fotos = [[1, 900], [2, 1500], [3, 2100], [4, 2700], [5, 6000], [6, 11000]];
  for (const [i, ms] of fotos) { const f = ms - (Date.now() - t0); if (f > 0) await p.waitForTimeout(f); await p.screenshot({ path: `tools/shots/r116b-${tag}-${i}.jpg`, quality: 72 }); }
  const est = await p.evaluate(() => ({ sumi: window.__sumi?.(), jazz: window.__jazz?.(), velo: !!document.querySelector('[data-entrada-v]'), luz: document.querySelector('[data-sumi]')?.classList.contains('luz-entra') }));
  // el scroll: las raíces crecen hasta la capitular
  for (const [i, y] of [[7, 0.45], [8, 0.9]]) { await p.evaluate((f) => window.scrollTo(0, innerHeight * f), y); await p.waitForTimeout(900); await p.screenshot({ path: `tools/shots/r116b-${tag}-${i}.jpg`, quality: 72 }); }
  const des = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(JSON.stringify({ tag, errs, ...est, desborde: des }));
  await b.close();
})();
