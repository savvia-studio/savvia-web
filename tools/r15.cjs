// Ronda 15 · la carga (firma + gota) y el árbol: dibujo → pintura rasgada → semitono + hervor. node tools/r15.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4340/', { waitUntil: 'domcontentloaded' });
  const t0 = Date.now(), ts = [300, 900, 1500, 2100, 2500, 2800, 3200, 3700, 4400, 5200, 6400, 8000];
  for (const t of ts) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await p.screenshot({ path: `tools/shots/r15-${tag}-${t}.jpg`, type: 'jpeg', quality: 78 }); }
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', '· suelta', await p.evaluate(() => (window).__gotaSuelta), '· velo', await p.evaluate(() => !!document.querySelector('[data-cargador]')));
  await b.close();
})();
