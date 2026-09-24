// La Savvia (sistema): una captura por ingrediente. node tools/sistema.cjs <url> <prefijo> [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, pre = 'sis', w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(600);
  await p.evaluate(() => document.querySelector('[data-plato]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1500);
  const ids = await p.evaluate(() => [...document.querySelectorAll('[data-ing]')].map((b) => b.dataset.ing));
  for (const [i, id] of ids.entries()) { await p.click(`[data-ing="${id}"]`); await p.waitForTimeout(id === 'voz' ? 2600 : 900); await p.screenshot({ path: `tools/shots/${pre}_${i}.jpg`, type: 'jpeg', quality: 80 }); }
  console.log(JSON.stringify({ errs, fin: await p.evaluate(() => window.__sistema()) }));
  await b.close();
})();
