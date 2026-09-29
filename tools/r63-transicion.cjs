// RONDA 63 · transición entre páginas: del listado al caso (el vídeo viaja de la tarjeta a la portada)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  const errores = []; p.on('pageerror', (e) => errores.push(e.message));
  await p.goto('http://localhost:4321/proyectos', { waitUntil: 'load' }); await p.waitForTimeout(1500);
  console.log('soporte @view-transition:', await p.evaluate(() => 'onpagereveal' in window));
  await p.click('[data-pieza-obra] >> nth=0');
  for (const t of [120, 350, 650]) { await p.waitForTimeout(t === 120 ? 120 : t - 120); await p.screenshot({ path: `tools/shots/r63-vt-${t}.jpg`, quality: 60 }); }
  await p.waitForTimeout(1500);
  console.log('llegó a', await p.evaluate(() => location.pathname), 'errores', errores.length ? errores : 0);
  await b.close(); })();
