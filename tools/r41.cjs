// Ronda 41 · node tools/r41.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(5000);
  const shot = (n, clip) => p.screenshot({ path: `tools/shots/r41-${tag}-${n}.jpg`, type: 'jpeg', quality: 84, ...(clip ? { clip } : {}) });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const R = {};
  R.hero = await p.evaluate(() => document.querySelector('.hero .text-lead').textContent);
  await shot('icono', { x: +w - 140, y: 0, width: 140, height: 80 });
  // la primera tarjeta: antes de la gota no está; se dibuja; luego viva
  const yp = await top('[data-pista]'), fijo = await p.evaluate(() => window.__pasos().fijo);
  const ydiana = fijo ? yp : (await top('[data-tarjeta="0"]')) - +h * 0.44;
  await ir(ydiana - +h * 0.3, 700); R.antes = await p.evaluate(() => ({ ...window.__pasos(), vis: getComputedStyle(document.querySelector('.t0 .capa-t')).visibility })); await shot('t0-antes');
  await p.evaluate((yy) => scrollTo(0, yy), ydiana + 2); await p.waitForTimeout(450); await shot('t0-dibujando-1'); await p.waitForTimeout(500); await shot('t0-dibujando-2'); await p.waitForTimeout(1600); await shot('t0-dibujada');
  R.despues = await p.evaluate(() => window.__pasos());
  if (fijo) { const T = (await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight)) - +h; for (const f of [0.3, 0.56, 0.8]) { await ir(yp + T * f, 1500); await shot(`paso-${f}`); } R.brotes = await p.evaluate(() => [...document.querySelectorAll('.carril li')].map((l) => [l.className, getComputedStyle(l.querySelector('.h1')).scale])); }
  // Proyectos: la llamada, el deslizar, los cuatro proyectos en el monitor
  const ypr = await top('#proyectos'), altoPr = await p.evaluate(() => document.querySelector('#proyectos .pista').offsetHeight);
  await ir(ypr + (altoPr - +h) * 0.3, 600); await ir(ypr + (altoPr - +h) * 0.6, 8500); await shot('proy-llamada');
  R.llamada = await p.evaluate(() => document.querySelector('[data-pista-scroll]').classList.contains('on'));
  const pant = await p.evaluate(() => { const r = document.querySelector('[data-pantalla]').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  await p.mouse.move(pant.x + pant.width / 2, pant.y + pant.height / 2, { steps: 3 }); await p.waitForTimeout(300);
  await p.mouse.wheel(0, 400); await p.waitForTimeout(900);
  R.trasDeslizar = await p.evaluate(() => ({ llamada: document.querySelector('[data-pista-scroll]').classList.contains('on'), capta: !!document.querySelector('[data-capta]') }));
  await p.mouse.wheel(0, 500); await p.waitForTimeout(900);
  const crop = { x: pant.x - 30, y: pant.y - 30, width: pant.width + 60, height: pant.height + 60 };
  await shot('monitor-0', crop);
  for (let k = 1; k < 4; k++) { await p.click('[data-giro="1"]').catch(() => {}); await p.waitForTimeout(7000); await shot(`monitor-${k}`, crop); }
  // Nuestros proyectos: la voz y cada pieza al pasar
  const ya = await top('#anteriores'); await ir(ya - 60, 1600); await shot('voz');
  R.voz = await p.evaluate(() => ({ texto: document.querySelector('.cita.on').innerText.slice(0, 80), nombres: [...document.querySelectorAll('.quien')].map((q) => getComputedStyle(q).opacity) }));
  const piezas = await p.$$('#anteriores a.pieza');
  for (const [k, pz] of piezas.entries()) { await pz.scrollIntoViewIfNeeded(); await p.waitForTimeout(500); const bb = await pz.boundingBox(); await shot(`pieza-${k}-reposo`, { x: bb.x, y: Math.max(0, bb.y), width: bb.width, height: Math.min(bb.height, +h - Math.max(0, bb.y)) }); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 3); await p.waitForTimeout(2600); const b2 = await pz.boundingBox(); await shot(`pieza-${k}-video`, { x: b2.x, y: Math.max(0, b2.y), width: b2.width, height: Math.min(b2.height, +h - Math.max(0, b2.y)) }); }
  await p.mouse.move(5, 5);
  // la transición de color, estrecha (entrada a La savvia)
  const yl = await top('#la-savvia'); await ir(yl - +h * 0.92, 500); await shot('sube-1'); await ir(yl - +h * 0.8, 500); await shot('sube-2');
  const ye = await top('#estudio'); await ir(ye + 40, 1400); await shot('estudio');
  R.estudio = await p.evaluate(() => getComputedStyle(document.querySelector('#estudio')).backgroundColor);
  // el pie: flora y el formulario que se dibuja como el árbol
  const H = await p.evaluate(() => document.documentElement.scrollHeight); await ir(H, 7500); await shot('pie');
  const c = await p.$('[data-contacta]'); const cb = await c.boundingBox();
  await p.mouse.move(cb.x + cb.width * 0.45, cb.y + cb.height * 0.5, { steps: 3 }); await p.waitForTimeout(450); await shot('form-1'); await p.waitForTimeout(450); await shot('form-2'); await p.waitForTimeout(1200); await shot('form-3');
  await p.keyboard.press('Escape'); await p.waitForTimeout(500); await shot('form-cierra'); await p.waitForTimeout(1500);
  R.form = await p.evaluate(() => ({ hidden: document.querySelector('[data-form]').hidden, copias: document.querySelectorAll('.formulario').length }));
  // invierno: flora del pie y de la tarjeta
  await p.click('[data-estacion-ic]'); await p.waitForTimeout(3000); await shot('pie-invierno');
  await ir(fijo ? yp + 60 : ydiana + 200, 2200); await shot('tarjeta-invierno');
  R.overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify(R));
  await b.close();
})();
