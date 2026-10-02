// RONDA 93 · fotogramas mientras el director suelta sus tarjetas (bajar del hero al manifiesto), CPU ×4
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const q = process.argv[2] || '';
(async () => {
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=0' + q); await p.waitForTimeout(5500);
  if (process.argv[3]) await p.addStyleTag({ content: process.argv[3] });
  if (process.argv[4]) await p.evaluate(process.argv[4]);
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const r = await p.evaluate(() => new Promise((res) => { const ts = []; let y = 0, ult = performance.now(); const H = document.querySelector('[data-hero]').offsetHeight;
    const f = (t) => { ts.push(t - ult); ult = t; y += 6; window.__lenis ? window.__lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y); if (y < H * 1.3) requestAnimationFrame(f); else { ts.shift(); ts.sort((a, b) => a - b); res({ n: ts.length, lentos: ts.filter((x) => x > 20).length, p90: +ts[Math.floor(ts.length * 0.9)].toFixed(1), max: +ts[ts.length - 1].toFixed(0) }); } };
    requestAnimationFrame(f); }));
  console.log(JSON.stringify({ q, ...r, errs })); await b.close();
})();
