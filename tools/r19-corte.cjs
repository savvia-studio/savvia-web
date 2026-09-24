// Ronda 19 · punto 10: ver el «corte» entre la salida de Proyectos y Otros trabajos. node tools/r19-corte.cjs
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.mouse.wheel(0, 10); await p.waitForTimeout(1500);
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const yq = await top('[data-pista]'), H = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight), T = H - 720;
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  let i = 0;
  for (const f of [0.9, 0.965, 1.0, 1.06, 1.14, 1.25]) { await ir(yq + T * f, 900); await p.screenshot({ path: `tools/shots/r19-corte-${i++}-${f}.jpg`, type: 'jpeg', quality: 80 }); }
  console.log(await p.evaluate(() => { const a = document.querySelector('#anteriores'); const r = a.getBoundingClientRect(); return { anterioresTop: r.top + scrollY, pistaFin: document.querySelector('[data-pista]').getBoundingClientRect().bottom + scrollY, faltaH: document.querySelector('[data-estudio] .wrap').offsetHeight }; }));
  await b.close();
})();
