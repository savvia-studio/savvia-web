// RONDA 85 · las notas que dejan «Contáctanos»
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4332/'); await p.waitForTimeout(1200);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.evaluate((y) => scrollTo(0, y), alto);
  const fs = [];
  for (let i = 0; i < 8; i++) { await p.waitForTimeout(500); const f = `tools/shots/r85-pie-${motor}-${W}-${i}.jpg`; await p.screenshot({ path: f, quality: 65 }); fs.push(f); }
  const r = await p.evaluate(() => ({ on: document.querySelectorAll('.contacta .l.on').length, entera: document.querySelector('[data-pie]').classList.contains('entera') }));
  console.log(JSON.stringify({ motor, W, errs, ...r }));
  await b.close();
})();
