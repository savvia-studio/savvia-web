// RONDA 114 · la tinta pintando (lo más caro: copa y aguadas) con la CPU ×4: fps y fotogramas lentos
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent }); const p = await ctx.newPage();
  await p.goto(process.argv[2] || 'http://localhost:4321/'); await p.waitForFunction(() => window.__gotaSuelta === true, null, { timeout: 15000 }); await p.waitForTimeout(16000);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const r = await p.evaluate(() => new Promise((ok) => { const t = []; let a = performance.now(); const f = (n) => { t.push(n - a); a = n; if (t.length < 300) requestAnimationFrame(f); else ok(t); }; requestAnimationFrame(f); }));
  const m = r.reduce((x, y) => x + y, 0) / r.length; console.log(JSON.stringify({ fps: +(1000 / m).toFixed(1), lentos: r.filter((x) => x > 20).length, max: Math.round(Math.max(...r)) })); await b.close(); })();
