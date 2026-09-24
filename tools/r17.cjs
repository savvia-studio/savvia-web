// Ronda 17 · gota en lágrima, marco a 40 px, lupa y estaciones, sección 2 con aire, Trabajo anterior. node tools/r17.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4340/', { waitUntil: 'domcontentloaded' });
  const t0 = Date.now(), shot = (n, o = {}) => p.screenshot({ path: `tools/shots/r17-${tag}-${n}.jpg`, type: 'jpeg', quality: 80, ...o });
  for (const t of [1500, 2250, 2600, 3000, 3400]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await shot(`c${t}`); }
  await p.waitForTimeout(6500); await shot('hero');
  const medida = await p.evaluate(() => { const s = document.querySelector('[data-hero] .titular p').getBoundingClientRect(), m = document.querySelector('.marco').getBoundingClientRect(), a = document.querySelector('[data-arbol]').getBoundingClientRect(), hh = document.querySelector('[data-hero]').getBoundingClientRect(); return { subtituloAMarco: Math.round(m.top - s.bottom), marco: [Math.round(m.top), Math.round(m.bottom)], arbol: [Math.round(a.width), Math.round(a.height), Math.round(a.bottom)], hero: Math.round(hh.bottom), mono: getComputedStyle(document.querySelector('.detail')).fontFamily.slice(0, 40), filas: document.querySelectorAll('[data-marcas] .fila').length, boton: !!document.querySelector('[data-carriles-boton]') }; });
  if (+w >= 1024) {
    const a = await p.evaluate(() => { const r = document.querySelector('[data-arbol]').getBoundingClientRect(); return [r.left + r.width * 0.42, r.top + r.height * 0.38]; });
    await p.mouse.move(a[0] - 30, a[1] - 10); await p.mouse.move(a[0], a[1], { steps: 8 }); await p.waitForTimeout(900); await shot('lupa');
    await p.mouse.click(a[0], a[1]); await p.waitForTimeout(6000); await p.mouse.move(10, 300); await p.waitForTimeout(600); await shot('invierno');
    await p.mouse.click(a[0], a[1]); await p.waitForTimeout(6000); await p.mouse.move(10, 300); await p.waitForTimeout(600); await shot('primavera');
    await p.mouse.click(a[0], a[1]); await p.waitForTimeout(6000); await p.mouse.move(10, 300); await p.waitForTimeout(600); await shot('verano');
  }
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  await ir(await top('[data-pasos]') - 200, 2200); await shot('pasos');
  const ya = await top('#anteriores'); await ir(ya - 40, 1400); await shot('ant1'); await ir(ya + +h * 0.85, 1400); await shot('ant2'); await ir(ya + +h * 1.7, 1400); await shot('ant3');
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify(medida), 'desborde', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  await b.close();
})();
