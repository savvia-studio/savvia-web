// Captura de viewport en un punto de scroll: node tools/shot.cjs <url> <y> <nombre> [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, y = '0', name = 'shot', w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2, userAgent })).newPage();
  await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  await p.evaluate((yy) => scrollTo(0, yy), +y); await p.waitForTimeout(300);
  await p.screenshot({ path: `tools/shots/${name}.jpg`, type: 'jpeg', quality: 82 });
  await b.close();
})();
