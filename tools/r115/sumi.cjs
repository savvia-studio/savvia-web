// RONDA 115 · dibujar la V con el ratón (primero una raya que NO es una V), el director pintándose y el estado final
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4321/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(URL); await p.waitForTimeout(1200);
  const tag = `${motor}-${W}${URL.includes('clara') ? '-clara' : ''}`;
  await p.screenshot({ path: `tools/shots/r115-${tag}-0.jpg`, quality: 70 });
  const cx = W / 2, cy = H * 0.46, s = Math.min(W, H) * 0.12;
  // una raya horizontal: no es una V
  await p.mouse.move(cx - s, cy); await p.mouse.down(); for (let i = 0; i <= 12; i++) await p.mouse.move(cx - s + (2 * s * i) / 12, cy + Math.sin(i) * 2); await p.mouse.up();
  await p.waitForTimeout(250); const pista = await p.evaluate(() => document.querySelector('[data-pista]')?.textContent);
  await p.waitForTimeout(700);
  // la V
  await p.mouse.move(cx - s * 0.8, cy - s); await p.mouse.down();
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.8 + s * 0.7 * (i / 14), cy - s + 2 * s * (i / 14));
  await p.screenshot({ path: `tools/shots/r115-${tag}-1.jpg`, quality: 70 });
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.1 + s * 1.1 * (i / 14), cy + s - 2.3 * s * (i / 14));
  await p.mouse.up();
  await p.waitForTimeout(350); await p.screenshot({ path: `tools/shots/r115-${tag}-2.jpg`, quality: 70 });
  const ok = await p.waitForFunction(() => window.__gotaSuelta === true, null, { timeout: 6000 }).then(() => true, () => false);
  const t0 = Date.now();
  for (const [i, ms] of [[3, 1500], [4, 4000], [5, 7500], [6, 13000]]) { const f = ms - (Date.now() - t0); if (f > 0) await p.waitForTimeout(f); await p.screenshot({ path: `tools/shots/r115-${tag}-${i}.jpg`, quality: 75 }); }
  const est = await p.evaluate(() => ({ sumi: window.__sumi?.(), jazz: window.__jazz?.(), velo: !!document.querySelector('[data-entrada-v]'), desborde: document.documentElement.scrollWidth - innerWidth, h1: document.querySelector('#h1')?.textContent }));
  console.log(JSON.stringify({ tag, errs, pistaTrasRaya: pista, vReconocida: ok, ...est }));
  await b.close();
})();
