// Transición líquida en cada frontera de color. node tools/sube.cjs <url> <prefijo>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, pre = 'sube'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(700);
  const tops = await p.evaluate(() => [...document.querySelectorAll('[data-sube]')].map((s) => ({ id: s.id, top: s.getBoundingClientRect().top + scrollY })));
  let i = 0;
  for (const t of tops) for (const k of [0.78, 0.5]) { await p.evaluate((y) => scrollTo(0, y), t.top - k * 720); await p.waitForTimeout(500); await p.screenshot({ path: `tools/shots/${pre}_${i++}.jpg`, type: 'jpeg', quality: 78 }); }
  console.log(JSON.stringify({ errs, tops }));
  await b.close();
})();
