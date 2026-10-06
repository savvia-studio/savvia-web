// RONDA 117 (2.ª) · la gota recorre el isotipo y lo moja: fotogramas cada 200 ms desde que se reconoce la V
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e.stack || e).slice(0, 400)));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(900);
  const cx = W * 0.45, cy = H * 0.4, s = Math.min(W, H) * 0.13;
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.8 + s * 0.7 * (i / 14), cy - s + 2 * s * (i / 14));
  for (let i = 0; i <= 14; i++) await p.mouse.move(cx - s * 0.1 + s * 1.1 * (i / 14), cy + s - 2.3 * s * (i / 14));
  for (let i = 0; i < 12; i++) { await p.waitForTimeout(200); await p.screenshot({ path: `tools/shots/r117g-${motor}-${W}-${String(i).padStart(2, '0')}.jpg`, quality: 70, clip: { x: 0, y: 0, width: W, height: H * 0.75 } }); }
  console.log(JSON.stringify({ errs }));
  await b.close();
})();
