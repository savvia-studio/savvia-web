// Ronda 46 · node tools/r46.cjs [ancho alto] [motor] — la llamada «Desliza dentro» a la derecha y el reproductor de los testimonios
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(4000);
  const shot = (n, clip) => p.screenshot({ path: `tools/shots/r46-${tag}-${n}.jpg`, type: 'jpeg', quality: 84, ...(clip ? { clip } : {}) });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const R = {};
  // 1 · la llamada
  const ypr = await top('#proyectos'), altoPr = await p.evaluate(() => document.querySelector('#proyectos .pista').offsetHeight);
  await ir(ypr + (altoPr - +h) * 0.3, 600); await ir(ypr + (altoPr - +h) * 0.6, 8500); await shot('llamada');
  R.llamada = await p.evaluate(() => {
    const l = document.querySelector('[data-pista-scroll]'), s = l.querySelector('span').getBoundingClientRect(), pt = l.querySelector('.punto-silla').getBoundingClientRect(), pa = document.querySelector('[data-pantalla]').getBoundingClientRect();
    return { on: l.classList.contains('on'), punto: [Math.round(pt.x + pt.width / 2), Math.round(pt.y + pt.height / 2)], pantallaTR: [Math.round(pa.right), Math.round(pa.top)], texto: [Math.round(s.left), Math.round(s.right)], ancho: innerWidth };
  });
  R.monitor = await p.evaluate(() => { const c = document.querySelector('.cromo').getBoundingClientRect(), v = document.querySelector('.visor').getBoundingClientRect(); return { barraAbajo: Math.round(c.bottom), webArriba: Math.round(v.top) }; });
  { const pa = await p.evaluate(() => { const r = document.querySelector('[data-pantalla]').getBoundingClientRect(); return { x: r.x - 10, y: r.y - 10, width: r.width + 20, height: r.height + 20 }; }); await shot('monitor', pa); }
  // 2 · el reproductor: se le da vídeo a la voz 0 (copia de prueba en el DOM) y se vuelve a ella
  const ya = await top('[data-voces]'); await ir(ya - 80, 1500);
  R.titulo = await p.evaluate(() => document.querySelector('#ant-h').textContent);
  R.camaras = await p.evaluate(() => [...document.querySelectorAll('[data-cita]')].map((c) => !!c.dataset.video));
  await p.click('[data-voz="1"]'); await p.waitForTimeout(900); // voz 1 = Invopop, con vídeo
  R.camara = await p.evaluate(() => window.__reproductor().camara);
  await p.click('[data-voz="-1"]'); await p.waitForTimeout(600); R.camaraIsotrol = await p.evaluate(() => window.__reproductor().camara); await p.click('[data-voz="1"]'); await p.waitForTimeout(700);
  const vb = await (await p.$('[data-voces]')).boundingBox(); await shot('voz-camara', { x: 0, y: Math.max(0, vb.y + vb.height - 220), width: +w, height: 200 });
  await p.click('[data-voz-video]'); await p.waitForTimeout(350); await shot('rep-pintando'); await p.waitForTimeout(1600); await shot('rep-abierto');
  R.abierto = await p.evaluate(() => window.__reproductor());
  // buscar a la mitad con el hilo y pausar
  const hb = await (await p.$('[data-rep-hilo]')).boundingBox(); await p.mouse.click(hb.x + hb.width * 0.5, hb.y + hb.height / 2); await p.waitForTimeout(400);
  await p.click('[data-rep-play]'); await p.waitForTimeout(400); await shot('rep-pausa');
  R.pausa = await p.evaluate(() => ({ ...window.__reproductor(), hilo: getComputedStyle(document.querySelector('[data-rep-hilo]')).getPropertyValue('--p'), t: document.querySelector('[data-rep-t]').textContent }));
  await p.click('[data-rep-son]'); R.mudo = await p.evaluate(() => window.__reproductor().mudo);
  await p.keyboard.press('Escape'); await p.waitForTimeout(250); await shot('rep-cierra'); await p.waitForTimeout(1000);
  R.cerrado = await p.evaluate(() => ({ ...window.__reproductor(), foco: document.activeElement?.matches('[data-voz-video]') }));
  // reabrir y cerrar con clic fuera
  await p.click('[data-voz-video]'); await p.waitForTimeout(1400); R.reabre = await p.evaluate(() => +window.__reproductor().t.toFixed(1)); await p.mouse.click(8, 8); await p.waitForTimeout(1200);
  R.centro = await p.evaluate(() => { const f = document.querySelector('.voces').getBoundingClientRect(), n = document.querySelector('.quien.on').getBoundingClientRect(), c = document.querySelector('[data-voz-video]').getBoundingClientRect(); const m = f.left + f.width / 2; return { nombre: Math.round(n.left + n.width / 2 - m), camara: Math.round(c.left + c.width / 2 - m) }; });
  await shot('voz-final', { x: 0, y: 200, width: +w, height: Math.min(500, +h - 200) });
  R.clicFuera = await p.evaluate(() => window.__reproductor().abierto);
  R.overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify(R));
  await b.close();
})();
