// RONDA 175 · las tres demos de los problemas, capturadas de cerca en varios instantes
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = process.argv[2] || 'http://localhost:4332', cual = (process.argv[3] || '0,1,2').split(',').map(Number), nav = process.argv[4] || 'chrome', ancho = +(process.argv[5] || 1280);
const ts = (process.argv[6] || '1500,4000,7000').split(',').map(Number);
(async () => {
  const tipo = nav === 'webkit' ? webkit : chromium;
  const b = await tipo.launch(tipo === chromium ? launchOpts : {});
  const p = await (await b.newContext({ viewport: { width: ancho, height: ancho < 700 ? 844 : 800 }, userAgent, deviceScaleFactor: 2 })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
  await p.goto(B + '/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const n = await p.evaluate(() => document.querySelectorAll('[data-dolores] .parada').length);
  for (const i of cual) {
    // bajar poco a poco hasta la parada (la raíz y la gota van con el scroll)
    const y = await p.evaluate((i) => { const e = document.querySelectorAll('[data-dolores] .parada')[i]; return e.getBoundingClientRect().top + scrollY - innerHeight * 0.2; }, i);
    const y0 = await p.evaluate(() => scrollY);
    for (let k = 1; k <= 12; k++) { await p.evaluate((v) => scrollTo(0, v), y0 + ((y - y0) * k) / 12); await p.waitForTimeout(90); }
    let t0 = Date.now();
    for (const t of ts) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); const el = (await p.$$('[data-dolores] .parada'))[i]; await el.screenshot({ path: `tools/shots/r182-${nav}${ancho}-p${i}-${t}.jpg`, quality: 78 }); }
  }
  console.log(nav, ancho, { n, errs });
  await b.close();
})();
