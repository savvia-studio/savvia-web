// Ronda 52 · las tarjetas de agua siguen a la estación: clics seguidos en el icono de la barra → ¿la tarjeta acaba en la estación de la página?
// Y una captura a mitad del cambio (la nueva debe entrar DESDE el icono). node tools/r52-cambio.cjs [motor] [url]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', url = process.argv[3] || 'http://localhost:4332/?s2=a2';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  const y = await p.evaluate(() => document.querySelectorAll('[data-agua]')[0].getBoundingClientRect().top + scrollY);
  await p.evaluate((yy) => scrollTo(0, yy - 90), y); await p.waitForTimeout(2500);
  const clic = () => p.evaluate(() => document.querySelector('[data-estacion-ic]').closest('button').click());
  const estado = () => p.evaluate(() => ({ pagina: document.documentElement.dataset.estacion, ...(({ actual, nueva, m }) => ({ actual, nueva, m: +m.toFixed(2) }))(window.__agua()) }));
  const clip = await p.evaluate(() => { const r = document.querySelectorAll('[data-agua]')[0].getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  const res = [];
  // 1) un cambio: captura a mitad
  await clic(); await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/r52-cambio-${motor}-mitad.png`, clip }); await p.waitForTimeout(2500); res.push(['uno', await estado()]);
  // 2) ráfagas: 2, 3 y 5 clics seguidos
  for (const n of [2, 3, 5]) { for (let k = 0; k < n; k++) { await clic(); await p.waitForTimeout(90); } await p.waitForTimeout(3200); res.push([`${n} seguidos`, await estado()]); }
  // 3) clic durante la transición
  await clic(); await p.waitForTimeout(500); await clic(); await p.waitForTimeout(3200); res.push(['a mitad', await estado()]);
  await p.screenshot({ path: `tools/shots/r52-cambio-${motor}-final.png`, clip });
  const mal = res.filter(([, e]) => e.pagina !== e.nueva || e.actual !== e.nueva || e.m < 1);
  console.log(motor, errs.length ? errs.slice(0, 2) : 'sin errores', mal.length ? 'FALLA ' + JSON.stringify(mal) : 'OK ' + JSON.stringify(res.map(([k, e]) => `${k}: ${e.pagina}`)));
  await b.close();
})();
