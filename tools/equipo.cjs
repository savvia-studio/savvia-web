// Equipo: paseo con el scroll + hover. node tools/equipo.cjs <url> <prefijo> [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, pre = 'equipo', w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(700);
  const top = await p.evaluate(() => document.querySelector('[data-paseo]').getBoundingClientRect().top + scrollY);
  let i = 0;
  for (const k of [0.9, 0.62, 0.42, 0.2]) { await p.evaluate((y) => scrollTo(0, y), top - k * +h); await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/${pre}_${i++}.jpg`, type: 'jpeg', quality: 80 }); }
  const llegaron = await p.evaluate(() => document.querySelector('[data-equipo]').classList.contains('llegaron'));
  const r = await p.evaluate(() => { const b = document.querySelector('[data-quien="1"]').getBoundingClientRect(); return [b.left + b.width * 0.4, b.top + b.height * 0.4]; });
  await p.mouse.move(r[0] - 5, r[1]); await p.mouse.move(r[0], r[1]); await p.waitForTimeout(900);
  await p.screenshot({ path: `tools/shots/${pre}_${i++}.jpg`, type: 'jpeg', quality: 80 });
  const abierto = await p.evaluate(() => [...document.querySelectorAll('[data-quien]')].map((x) => x.getAttribute('aria-expanded')));
  console.log(JSON.stringify({ errs, llegaron, abierto }));
  await b.close();
})();
