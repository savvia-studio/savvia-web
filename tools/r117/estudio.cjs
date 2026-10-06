// RONDA 117 · la estela de Eric y Andoni: pisadas de píxeles tramados
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(800);
  const y0 = await p.evaluate(() => { const s = document.querySelector('[data-estela]').parentElement; return s.getBoundingClientRect().top + scrollY; });
  for (const [i, f] of [[1, 0.1], [2, 0.35], [3, 0.6]]) { await p.evaluate(([y, f]) => window.scrollTo(0, y - innerHeight * 1.0 + innerHeight * f * 1.6), [y0, f]); await p.waitForTimeout(250); await p.screenshot({ path: `tools/shots/r117-estudio-${i}.jpg`, quality: 75 }); }
  console.log(JSON.stringify({ errs })); await b.close();
})();
