const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const URL = 'http://localhost:4331/?carga=0';
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })).newPage();
  p.on('pageerror', (e) => console.log('ERR', e.message)); p.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('CON', m.type(), m.text().slice(0, 160)); });
  await p.goto(URL, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const info = () => p.evaluate(() => { const pista = document.querySelector('[data-estudio] [data-pista]'); const r = pista.getBoundingClientRect(); const esc = document.querySelector('[data-escenario]'), es = document.querySelector('[data-escena]'); const tit = document.querySelector('[data-estudio] [data-titulo], [data-estudio] .titulo'); return { y: scrollY, f: ((-r.top) / (r.height - innerHeight)).toFixed(3), esc: esc.className, escena: es.className + ' | ' + (es.style.transform || '(sin)'), titVis: tit ? tit.style.visibility : '?' }; });
  const fin = await p.evaluate(() => { const pista = document.querySelector('[data-estudio] [data-pista]'); const r = pista.getBoundingClientRect(); return r.bottom + scrollY - innerHeight; });
  await p.mouse.move(640, 712);
  for (const yy of [fin - 600, fin - 300, fin - 100, fin - 20, fin - 2, fin, fin + 30, fin + 150]) { await p.evaluate((y) => window.scrollTo(0, y), yy); await p.waitForTimeout(400); console.log(JSON.stringify(await info())); }
  await b.close();
})();
