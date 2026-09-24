// Tira de viewports a lo largo de la página: node tools/full.cjs <url> <prefijo> [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, pre = 'full', w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  console.log('alto', H);
  let i = 0;
  for (let y = 0; y < H; y += +h) {
    await p.evaluate((yy) => scrollTo(0, yy), y);
    await p.waitForTimeout(450);
    await p.screenshot({ path: `tools/shots/${pre}_${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 70 });
    i++;
  }
  await b.close();
})();
