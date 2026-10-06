// RONDA 118 · «todo en 1»: V dibujada → la gota escribe el isotipo a su paso → cae, sin pausas. Fotogramas cada 150 ms
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/clara'); await p.waitForTimeout(900);
  const cx = W * 0.3, cy = H * 0.35, s = Math.min(W, H) * 0.13;
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.8 + s * 0.7 * (i / 14), cy - s + 2 * s * (i / 14));
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.1 + s * 1.1 * (i / 14), cy + s - 2.3 * s * (i / 14));
  const f = [];
  for (let i = 0; i < 16; i++) { await p.screenshot({ path: `tools/shots/r118uc-${String(i).padStart(2, '0')}.jpg`, quality: 60 }); f.push(await p.evaluate(() => ({ c: document.querySelector('[data-entrada-v]')?.className ?? 'fuera', o: document.querySelector('[data-gota]')?.style.opacity }))); await p.waitForTimeout(150); }
  await p.waitForTimeout(2500);
  console.log(JSON.stringify({ errs, f, sumi: await p.evaluate(() => window.__sumi?.()) }));
  await b.close();
})();
