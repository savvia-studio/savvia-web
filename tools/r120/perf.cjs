const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent }); const p = await ctx.newPage();
  await p.goto('http://localhost:4321/?carga=0&lenis=0' + (process.argv[2] || ''), { waitUntil: 'networkidle' }); await p.waitForTimeout(9000);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const t = await p.evaluate(() => new Promise((ok) => { const t = []; let a = performance.now(); const f = (n) => { t.push(n - a); a = n; if (t.length < 360) requestAnimationFrame(f); else ok(t); }; requestAnimationFrame(f); }));
  t.shift(); const s = [...t].sort((x, y) => x - y), fps = 1000 / (t.reduce((a, c) => a + c, 0) / t.length);
  console.log({ bucle: await p.evaluate(() => window.__sumi().bucle), fps: fps.toFixed(1), p95: s[Math.floor(s.length * 0.95)].toFixed(1), lentos: t.filter((x) => x > 50).length, max: s[s.length - 1].toFixed(0) });
  await b.close();
})();
