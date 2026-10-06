const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
  await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(3000);
  await p.evaluate(() => window.scrollTo(0, document.querySelector('[data-dolores]').getBoundingClientRect().top + scrollY + 600)); await p.waitForTimeout(2500);
  const cdp = await p.context().newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const r = await p.evaluate(() => new Promise((ok) => { const f = []; let u = performance.now(); const t0 = u; const s = (t) => { f.push(t - u); u = t; if (t - t0 < 4000) requestAnimationFrame(s); else { f.sort((a, b) => a - b); ok({ fps: +(1000 / (f.reduce((a, b) => a + b, 0) / f.length)).toFixed(1), p95: +f[Math.floor(f.length * 0.95)].toFixed(1), lentos: f.filter((x) => x > 50).length }); } }; requestAnimationFrame(s); }));
  console.log(JSON.stringify(r)); await b.close();
})();
