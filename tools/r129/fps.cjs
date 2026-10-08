const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await p.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
  await p.goto('http://localhost:4322/manifiesto', { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluate(() => { window.__f = []; let t = performance.now(); const l = (n) => { window.__f.push(n - t); t = n; requestAnimationFrame(l); }; requestAnimationFrame(l); });
  const H = await p.evaluate(() => document.querySelector('.lectura').offsetHeight);
  for (let y = 0; y < H; y += 60) { await p.mouse.wheel(0, 60); await p.waitForTimeout(16); }
  const f = await p.evaluate(() => window.__f.slice(2));
  f.sort((a, b) => a - b);
  const avg = f.reduce((a, b) => a + b, 0) / f.length;
  console.log({ frames: f.length, fps: (1000 / avg).toFixed(1), p95: f[Math.floor(f.length * 0.95)].toFixed(1), lentos50: f.filter((x) => x > 50).length, max: f[f.length - 1].toFixed(0) });
  await b.close();
})();
