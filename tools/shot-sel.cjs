// Captura de viewport con un selector centrado: node tools/shot-sel.cjs <url> <selector> <nombre> [ancho alto] [clic]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, sel, name, w = '1280', h = '720', clic] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(900);
  if (clic) { await p.locator(clic).click(); await p.waitForTimeout(1100); }
  await p.screenshot({ path: `tools/shots/${name}.jpg`, type: 'jpeg', quality: 80 });
  await b.close();
})();
