// RONDA 113 · el cartel en reposo con la CPU ×4: fotogramas por segundo y lentos (>20 ms)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const URL = process.argv[2] || 'http://localhost:4321/';
(async () => { const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent }); const p = await ctx.newPage();
  await p.goto(URL); await p.waitForTimeout(9000);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.mouse.move(900, 300); await p.mouse.move(1000, 420, { steps: 30 });
  const r = await p.evaluate(() => new Promise((ok) => { const t = []; let a = performance.now(); const f = (n) => { t.push(n - a); a = n; if (t.length < 240) requestAnimationFrame(f); else ok(t); }; requestAnimationFrame(f); }));
  const media = r.reduce((x, y) => x + y, 0) / r.length; console.log(JSON.stringify({ fps: +(1000 / media).toFixed(1), lentos: r.filter((x) => x > 20).length, max: Math.round(Math.max(...r)) }));
  await b.close(); })();
