// captura de un elemento: node tools/r83/elem.cjs <selector> <salida.png> [ancho] [antes-de-capturar: js]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [sel, out, Wa = '1280', js = ''] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: +Wa, height: +Wa > 600 ? 720 : 844 }, deviceScaleFactor: 2, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); await p.goto('http://localhost:4332/'); await p.waitForTimeout(1500);
  if (js) await p.evaluate(js);
  const e = await p.$(sel); await e.scrollIntoViewIfNeeded(); await p.waitForTimeout(1800);
  await e.screenshot({ path: out }); await b.close();
})();
