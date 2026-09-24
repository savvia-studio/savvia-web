// Secuencia temporal de un viewport: node tools/seq.cjs <url> <prefijo> <y> <ms,ms,...> [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, pre = 'seq', y = '0', ts = '400,1200,3500', w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url, { waitUntil: 'load' });
  if (+y) await p.evaluate((yy) => scrollTo(0, yy), +y);
  let t = 0;
  for (const ms of ts.split(',').map(Number)) { await p.waitForTimeout(ms - t); t = ms; await p.screenshot({ path: `tools/shots/${pre}_${ms}.jpg`, type: 'jpeg', quality: 80 }); }
  console.log(JSON.stringify({ errs, alto: await p.evaluate(() => document.documentElement.scrollHeight) }));
  await b.close();
})();
