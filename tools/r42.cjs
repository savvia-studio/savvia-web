// Ronda 42 · node tools/r42.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = [], avisos = []; p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); if (m.type() === 'warning' && /WebGL|context/i.test(m.text())) avisos.push(m.text()); }); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(4500);
  const shot = (n, clip) => p.screenshot({ path: `tools/shots/r42-${tag}-${n}.jpg`, type: 'jpeg', quality: 84, ...(clip ? { clip } : {}) });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const R = {};
  // dolores: la flora tras dibujarse la tarjeta
  const yp = await top('[data-pista]');
  await ir(yp - +h * 0.4, 600); await ir(yp + 4, 4200); await shot('dolores-flora');
  R.flora = await p.evaluate(() => [...document.querySelectorAll('[data-flora]')].map((f) => [f.closest('section,footer')?.id, f.classList.contains('dibujada'), getComputedStyle(f).display]));
  R.firma = await p.evaluate(() => !!document.querySelector('[data-firma]'));
  // cambio de estación con la flora a la vista: se repinta
  await p.click('[data-estacion-ic]'); await p.waitForTimeout(1100); await shot('dolores-flora-pintando'); await p.waitForTimeout(2200); await shot('dolores-flora-invierno');
  // Proyectos: la llamada hacia arriba
  const ypr = await top('#proyectos'), altoPr = await p.evaluate(() => document.querySelector('#proyectos .pista').offsetHeight);
  await ir(ypr + (altoPr - +h) * 0.3, 600); await ir(ypr + (altoPr - +h) * 0.6, 8000); await shot('proy-llamada');
  // voces en medio del mosaico, flechas
  const yv = await top('[data-voces]'); await ir(yv - +h * 0.3, 1500); await shot('voces');
  R.voces = await p.evaluate(() => { const v = document.querySelector('[data-voces]'), m = v.parentElement; return { enMosaico: m.classList.contains('mosaico'), antes: v.previousElementSibling?.className, cita: document.querySelector('.cita.on').dataset.cita }; });
  await p.click('[data-voz="1"]'); await p.waitForTimeout(1200); R.trasFlecha = await p.evaluate(() => document.querySelector('.cita.on').dataset.cita); await shot('voces-2');
  const pz = await p.$('#anteriores a.pieza.mancha'); await pz.scrollIntoViewIfNeeded(); await p.waitForTimeout(600); const bb = await pz.boundingBox(); await shot('camara', { x: bb.x + bb.width - 90, y: bb.y + bb.height * 0.5, width: 90, height: bb.height * 0.5 });
  // estudio y preguntas con flora
  const ye = await top('#estudio'); await ir(ye + 20, 3200); await shot('estudio');
  const yq = await top('#preguntas'); await ir(yq + 80, 3200); await shot('preguntas');
  // el pie en las cuatro estaciones
  const H = await p.evaluate(() => document.documentElement.scrollHeight); await ir(H, 7000);
  for (let k = 0; k < 4; k++) { await p.waitForTimeout(2500); R[`pie${k}`] = await p.evaluate(() => document.documentElement.dataset.estacion); await shot(`pie-${k}`); await p.click('[data-estacion-ic]'); }
  R.overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', 'avisos:', avisos.length ? avisos.slice(0, 3) : 'ninguno', JSON.stringify(R));
  await b.close();
})();
