// RONDA 85 · la nota que cae: fotogramas cada 250 ms tras tocar el acorde
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4332/?carga=1'); await p.waitForTimeout(1400);
  const cab = await p.$$eval('[data-notas] .cabeza', (els) => els.map((e) => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }));
  for (const c of cab) { await p.mouse.click(c[0], c[1]); await p.waitForTimeout(300); }
  const fs = [];
  for (let i = 0; i < 14; i++) { await p.waitForTimeout(220); const f = `tools/shots/r85-cae-${motor}-${W}-${String(i).padStart(2, '0')}.jpg`; await p.screenshot({ path: f, quality: 60 }); fs.push(f); }
  await p.waitForTimeout(3000); await p.screenshot({ path: `tools/shots/r85-cae-${motor}-${W}-fin.jpg`, quality: 70 });
  console.log(JSON.stringify({ motor, W, errs, velo: await p.evaluate(() => !!document.querySelector('[data-cargador]')) }));
  await b.close();
})();
