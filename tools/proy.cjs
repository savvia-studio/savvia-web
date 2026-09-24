// Proyectos: capturas a lo largo de la entrada + sentado. node tools/proy.cjs <url> <prefijo> [ancho alto]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url, pre = 'proy', w = '1280', h = '720'] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url, { waitUntil: 'load' }); await p.waitForTimeout(800);
  const top = await p.evaluate(() => document.querySelector('[data-pista]').getBoundingClientRect().top + scrollY);
  const shot = (n) => p.screenshot({ path: `tools/shots/${pre}_${n}.jpg`, type: 'jpeg', quality: 78 });
  let i = 0;
  for (const k of [0, 0.6]) { await p.evaluate((y) => scrollTo(0, y), top + k * +h); await p.waitForTimeout(900); await shot(i++); }
  await p.evaluate((y) => scrollTo(0, y), top + 1.3 * +h); await p.waitForTimeout(1150); await shot(i++); await p.waitForTimeout(900); await shot(i++); await p.waitForTimeout(2200); await shot(i++);
  // mover el ratón activa la web del monitor; rueda sobre el monitor
  await p.mouse.move(+w / 2, +h * 0.47); await p.mouse.move(+w / 2 + 4, +h * 0.47 + 3); await p.waitForTimeout(200);
  const y0 = await p.evaluate(() => scrollY);
  await p.mouse.wheel(0, 300); await p.waitForTimeout(500);
  const dentro = await p.evaluate(() => document.querySelector('[data-web]:not([hidden])').scrollTop), y1 = await p.evaluate(() => scrollY);
  const dial = await p.evaluate(() => innerWidth >= 1024);
  if (dial) { const r = await p.evaluate(() => { const b = document.querySelector('[data-lista]').getBoundingClientRect(); return [b.left + 60, b.top + b.height / 2]; }); await p.mouse.move(r[0], r[1]); await p.mouse.wheel(0, 120); await p.waitForTimeout(500); await p.mouse.wheel(0, 120); } else await p.click('.dial li:nth-child(11) [data-item]');
  await p.waitForTimeout(2600); await shot(i++);
  await p.click('[data-sentarse]'); await p.waitForTimeout(1400); await shot(i++);
  await p.keyboard.press('Escape'); await p.waitForTimeout(600);
  console.log(JSON.stringify({ errs, ruedaDentro: dentro, paginaMovida: y1 - y0, activo: await p.evaluate(() => document.querySelector('.ficha:not([hidden])').dataset.hechos) }));
  await b.close();
})();
