// RONDA 118 · «Dirige tú»: salta la carga, espera al hero pintado y pasa el ratón por la orquesta
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, hasTouch: W < 600, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(900);
  await p.keyboard.press('Enter'); await p.waitForTimeout(600); await p.mouse.click(W * 0.95, H * 0.2); await p.waitForTimeout(7000);
  const m = await p.evaluate(() => { const r = document.querySelector('[data-caja]').getBoundingClientRect(); return { l: r.left, t: r.top, w: r.width, h: r.height }; });
  const out = [];
  for (const [i, fx, fy] of [[1, 0.13, 0.6], [2, 0.71, 0.6], [3, 0.88, 0.6], [4, 0.32, 0.6]]) {
    const x = m.l + m.w * fx, y = m.t + m.h * fy;
    if (W < 600) await p.touchscreen.tap(x, y); else for (let k = 0; k <= 8; k++) await p.mouse.move(x - 40 + k * 5, y);
    await p.waitForTimeout(900);
    out.push(await p.evaluate(() => ({ rot: document.querySelector('.sumi').className, eq: window.__jazz?.().eq })));
    await p.screenshot({ path: `tools/shots/r118d-${motor}-${W}-${i}.jpg`, quality: 72 });
  }
  if (W >= 600) { await p.mouse.move(W / 2, 40); await p.waitForTimeout(900); out.push(await p.evaluate(() => ({ rot: document.querySelector('.sumi').className, eq: window.__jazz?.().eq }))); }
  console.log(JSON.stringify({ errs, out, des: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
