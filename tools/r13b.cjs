// Ronda 13 · detalle: tarjeta 02 en secuencia, documento entero, estreno del buscador, hero medido. node tools/r13b.cjs [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.goto('http://localhost:4340/', { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(3600);
  console.log('hero', await p.evaluate(() => { const c = document.querySelector('.arbol-caja').getBoundingClientRect(); return { alto: c.height | 0, ancho: c.width | 0, suelo: c.bottom | 0, pliegue: innerHeight }; }));
  const top = (sel) => p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sel);
  const ir = async (y, ms = 700) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  await ir(await top('[data-pasos]') - 40, 1400);
  await p.evaluate(() => document.querySelectorAll('[data-tarjeta]')[1].click());
  const t0 = Date.now();
  for (const t of [500, 1100, 1800, 3300, 4200]) { await p.waitForTimeout(t - (Date.now() - t0)); await p.locator('.tarjeta[aria-current="true"] .demo').screenshot({ path: `tools/shots/r13-c2-${t}.jpg`, type: 'jpeg', quality: 80 }); }
  await ir(await top('[data-sistema]') + 60, 600);
  await p.evaluate(() => document.querySelector('[data-ver-doc]').click()); await p.waitForTimeout(4200);
  await p.locator('[data-plato]').screenshot({ path: 'tools/shots/r13-doc.jpg', type: 'jpeg', quality: 85 });
  const yq = await top('[data-pista]'), H = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight);
  await ir(yq + (H - +h) * 0.72, 400); await p.locator('[data-pantalla]').screenshot({ path: 'tools/shots/r13-pant-a.jpg' });
  await ir(yq + (H - +h) * 0.77, 300); await p.locator('[data-pantalla]').screenshot({ path: 'tools/shots/r13-pant-b.jpg' });
  await ir(yq + (H - +h) * 0.8, 2400); await p.locator('[data-pantalla]').screenshot({ path: 'tools/shots/r13-pant-c.jpg' });
  await b.close();
})();
