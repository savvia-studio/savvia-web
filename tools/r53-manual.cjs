// Ronda 53 · el manual real de Neety (neety.treseiscero.app/library) para el ejemplo de «Formación» en Servicios
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 2200 }, deviceScaleFactor: 1.5, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/library', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {}); await p.waitForTimeout(2500);
  await p.screenshot({ path: 'tools/ref53/manual-neety.png', clip: { x: 0, y: 0, width: 1280, height: 2200 } });
  await b.close();
})();
