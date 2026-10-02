const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent })).newPage();
  await p.goto('https://ascii.fm/stations', { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await p.waitForTimeout(3000);
  for (let i = 0; i < 12; i++) { await p.screenshot({ path: `tools/ref107/m${String(i).padStart(2,'0')}.png`, clip: { x: 630, y: 240, width: 620, height: 380 } }); await p.waitForTimeout(90); }
  // con el ratón encima
  for (let i = 0; i < 8; i++) { await p.mouse.move(900 + i * 25, 420 + Math.sin(i) * 20); await p.waitForTimeout(80); await p.screenshot({ path: `tools/ref107/r${i}.png`, clip: { x: 630, y: 240, width: 620, height: 380 } }); }
  await b.close();
})();
