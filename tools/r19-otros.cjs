// Ronda 19 · Otros trabajos: pantallas en perspectiva, vídeos al pasar, barras finas. node tools/r19-otros.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.mouse.wheel(0, 10); await p.waitForTimeout(1200);
  const shot = (n) => p.screenshot({ path: `tools/shots/r19-otros-${tag}-${n}.jpg`, type: 'jpeg', quality: 84 });
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const piezas = await p.$$('[data-pieza]');
  // el relevo de logotipos (barrido): a la vista 3,5 s y comprobar que cambia
  { const r0 = await piezas[0].evaluate((el) => { const q = el.getBoundingClientRect(); return q.top + scrollY; }); await ir(r0 - 150, 800); const k0 = await p.evaluate(() => [...document.querySelectorAll('[data-logo]')].findIndex((l) => l.classList.contains('on'))); await p.waitForTimeout(3000); await shot('relevo'); const k1 = await p.evaluate(() => [...document.querySelectorAll('[data-logo]')].findIndex((l) => l.classList.contains('on'))); console.log('relevo', k0, '→', k1); }
  const info = [];
  for (let i = 1; i < piezas.length; i++) {
    const r = await piezas[i].evaluate((el) => { const q = el.getBoundingClientRect(); return { y: q.top + scrollY }; });
    await ir(r.y - +h * 0.15, 1800);
    const rb = await piezas[i].boundingBox();
    await p.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await p.waitForTimeout(1400);
    await shot(`p${i}`);
    info.push(await piezas[i].evaluate((el) => { const v = el.querySelector('video'); const q = el.querySelector('.quad'); return { tipo: el.className, playing: v && !v.paused && v.readyState >= 2, t: v && +v.currentTime.toFixed(1), s: q && getComputedStyle(q.closest('.mesa')).getPropertyValue('--s'), tr: q && getComputedStyle(q).transform.slice(0, 40) }; }));
    await p.mouse.move(5, 5);
  }
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify(info));
  await b.close();
})();
