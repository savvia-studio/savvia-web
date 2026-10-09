// RONDA 153 · rendimiento del Manifiesto bajando con la CPU ×4 (Chrome real, DPR 2) + movimiento reducido.
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  await p.goto('http://localhost:4322/manifiesto', { waitUntil: 'networkidle' });
  await p.waitForTimeout(6500);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.evaluate(() => { window.__f = []; let t = performance.now(); const l = (n) => { window.__f.push(n - t); t = n; if (window.__f.length < 100000) requestAnimationFrame(l); }; requestAnimationFrame(l); });
  const total = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let y = 0; y < total; y += 60) { await p.mouse.wheel(0, 60); await p.waitForTimeout(90); }
  await p.waitForTimeout(1500);
  const f = await p.evaluate(() => window.__f.slice(5));
  const s = [...f].sort((a, b) => a - b), q = (k) => s[Math.floor(s.length * k)];
  console.log('cpu×4', { frames: f.length, fps: (1000 / (f.reduce((a, b) => a + b, 0) / f.length)).toFixed(1), p50: q(0.5).toFixed(1), p95: q(0.95).toFixed(1), max: s[s.length - 1].toFixed(0), lentos50: f.filter((x) => x > 50).length });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  const p2 = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await p2.goto('http://localhost:4322/manifiesto', { waitUntil: 'networkidle' });
  await p2.waitForTimeout(1500);
  await p2.evaluate(() => scrollTo(0, document.querySelector('.texto').offsetTop + 200));
  await p2.waitForTimeout(500);
  await p2.screenshot({ path: '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r153m/reducido-390.jpg', quality: 70 });
  console.log('reducido', JSON.stringify(await p2.evaluate(() => window.__manifiesto().savia)));
  await b.close();
})();
