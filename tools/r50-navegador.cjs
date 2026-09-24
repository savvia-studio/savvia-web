// Ronda 50 · barra del navegador fina con la dirección centrada, y la píldora «desliza dentro» sobre la pantalla. node tools/r50-navegador.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  const ypr = await p.evaluate(() => document.getElementById('proyectos').getBoundingClientRect().top + scrollY), alto = await p.evaluate(() => document.querySelector('#proyectos .pista').offsetHeight);
  await p.evaluate((y) => scrollTo(0, y), ypr + (alto - +h) * 0.3); await p.waitForTimeout(600); await p.evaluate((y) => scrollTo(0, y), ypr + (alto - +h) * 0.6); await p.waitForTimeout(8500);
  const R = await p.evaluate(() => {
    const pa = document.querySelector('[data-pantalla]').getBoundingClientRect(), cr = document.querySelector('.cromo').getBoundingClientRect(), di = document.querySelector('.direccion').getBoundingClientRect(), pi = document.querySelector('[data-pista-scroll]'), pr = pi.getBoundingClientRect(), vi = document.querySelector('.visor').getBoundingClientRect();
    return { barra: Math.round(cr.height * 10) / 10, pantalla: Math.round(pa.height), direccionCentro: Math.round(di.left + di.width / 2 - (cr.left + cr.width / 2)), textoCentro: (() => { const u = document.querySelector('[data-url]').getBoundingClientRect(); return +(u.left + u.width / 2 - (cr.left + cr.width / 2)).toFixed(1); })(), cristal: getComputedStyle(document.querySelector('.cromo')).backdropFilter || getComputedStyle(document.querySelector('.cromo')).webkitBackdropFilter, tras: getComputedStyle(document.querySelector('.tras-cromo')).backgroundImage.slice(0, 60), webBajoBarra: Math.round(vi.top - cr.bottom), pildora: { on: pi.classList.contains('on'), op: getComputedStyle(pi).opacity, dentro: pr.left > pa.left && pr.right < pa.right && pr.bottom < pa.bottom && pr.top > pa.top } };
  });
  const pa = await p.evaluate(() => { const r = document.querySelector('[data-pantalla]').getBoundingClientRect(); return { x: r.x - 16, y: r.y - 16, width: r.width + 32, height: r.height + 32 }; });
  await p.screenshot({ path: `tools/shots/r50-${tag}-monitor.png`, clip: pa });
  const cb = await p.evaluate(() => { const r = document.querySelector('.cromo').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  await p.screenshot({ path: `tools/shots/r50-${tag}-barra.png`, clip: cb });
  const bb = await (await p.$('[data-pantalla]')).boundingBox(); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.mouse.wheel(0, 300); await p.waitForTimeout(900);
  R.trasRueda = await p.evaluate(() => ({ on: document.querySelector('[data-pista-scroll]').classList.contains('on'), capta: !!document.querySelector('[data-capta]') }));
  console.log(tag, errs.length ? errs : 'sin errores', JSON.stringify(R)); await b.close();
})();
