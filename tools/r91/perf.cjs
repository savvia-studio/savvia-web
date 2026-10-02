// RONDA 91 · el hero en papel «va muy ralentizado»: histograma de fotogramas con el hero a la vista (Chrome real, CPU ×4), 6 s tras aparecer
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const q = process.argv[2] || '';
(async () => {
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.goto('http://localhost:4331/?carga=0' + q); await p.waitForTimeout(7000);
  await p.evaluate(() => { window.__fr = []; let u = performance.now(); const f = (t) => { window.__fr.push(t - u); u = t; if (window.__fr.length < 2000) requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await p.waitForTimeout(6000);
  const r = await p.evaluate(() => { const a = window.__fr.slice(3); const s = [...a].sort((x, y) => x - y); return { fps: +(1000 / (a.reduce((x, y) => x + y, 0) / a.length)).toFixed(1), p90: +s[Math.floor(s.length * 0.9)].toFixed(1), lentos: +(a.filter((x) => x > 20).length / a.length * 100).toFixed(1), max: +s[s.length - 1].toFixed(0) }; });
  console.log(JSON.stringify({ q, ...r, errs }));
  await b.close();
})();
