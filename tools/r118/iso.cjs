// RONDA 118 · el isotipo de la carga: pequeño y siempre en medio aunque la V se dibuje en una esquina
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('' + (process.argv[4] || 'http://localhost:4321/') + ''); await p.waitForTimeout(900);
  const cx = W * 0.18, cy = H * 0.3, s = Math.min(W, H) * 0.13;
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.8 + s * 0.7 * (i / 14), cy - s + 2 * s * (i / 14));
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.1 + s * 1.1 * (i / 14), cy + s - 2.3 * s * (i / 14));
  await p.waitForTimeout(500);
  const r = await p.evaluate(() => { const e = document.querySelector('[data-entrada-v] svg.iso, [data-entrada-v] .iso') || document.querySelector('[data-entrada-v] svg'); const b = e?.getBoundingClientRect(); return b ? { cx: b.left + b.width / 2, cy: b.top + b.height / 2, h: b.height } : null; });
  await p.screenshot({ path: `tools/shots/r118-iso-${motor}-${W}.jpg`, quality: 72 });
  console.log(JSON.stringify({ errs, r, centro: [W / 2, H / 2] }));
  await b.close();
})();
