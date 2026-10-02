// RONDA 93 · el hero (oscuro y claro): capturas a lo largo del recorrido de la magia
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), q = process.argv[4] || '', tag = process.argv[5] || 'a';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0' + q); await p.waitForTimeout(5200);
  const sel = '.arbol-caja';
  for (const ms of [0, 1300, 2300, 3300, 4300]) { if (ms) await p.waitForTimeout(1000); await p.screenshot({ path: `tools/shots/r93-hero-${tag}-${motor}-${W}${q ? '-clara' : ''}-${ms}.jpg`, quality: 75 }); }
  console.log(JSON.stringify({ motor, W, q, errs }));
  await b.close();
})();
