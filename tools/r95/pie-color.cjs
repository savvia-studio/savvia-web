// RONDA 95 · el pie es una sola materia: muestras de color a lo alto del pie (sin el corte del velo)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage(); await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(1500);
  const top = await p.evaluate(() => document.querySelector('[data-pie]').getBoundingClientRect().top + scrollY);
  await p.evaluate((y) => (window.__lenis ? window.__lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y)), top - 200); await p.waitForTimeout(2500);
  await p.screenshot({ path: 'tools/shots/r95-pie-color.jpg', quality: 80 });
  const buf = await p.screenshot({ clip: { x: 900, y: 0, width: 4, height: 720 } });
  require('fs').writeFileSync('/tmp/col.png', buf);
  await b.close();
})();
