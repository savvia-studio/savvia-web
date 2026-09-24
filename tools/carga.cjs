// Carga (ronda 15): movimiento reducido = sin carga; un clic la salta y el árbol arranca; recarga a media página = sin caída.
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const out = {};
  let p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://localhost:4340/', { waitUntil: 'load' }); await p.waitForTimeout(600);
  out.reducido = await p.evaluate(() => ({ velo: !!document.querySelector('[data-cargador]'), suelta: window.__gotaSuelta, scroll: getComputedStyle(document.documentElement).overflow }));
  p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4340/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  await p.mouse.click(640, 360); await p.waitForTimeout(1200);
  out.saltada = await p.evaluate(() => ({ velo: !!document.querySelector('[data-cargador]'), suelta: window.__gotaSuelta, cargando: document.documentElement.classList.contains('cargando') }));
  console.log(JSON.stringify(out));
  await b.close();
})();
