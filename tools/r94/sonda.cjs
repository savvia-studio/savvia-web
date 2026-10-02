// RONDA 94 · estado de la cinta en un tiempo dado (opacidad, filtro y caja de cada tarjeta, relativas al marco)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4331/?carga=0&lenis=0'); await p.waitForTimeout(1500);
  const y = await p.$eval('[data-cine]', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight / 2 - innerHeight / 2);
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(500);
  for (const tb of [11.4, 13.2, 15.2]) {
    const r = await p.evaluate((tb) => { const P = window.__partitura; P.ir(tb * P.BEAT); const m = document.querySelector('.n-card'); const R = m.getBoundingClientRect();
      return [...document.querySelectorAll('[data-sf]')].map((e) => { const q = e.getBoundingClientRect(); return [e.style.opacity, e.style.filter, Math.round((q.top - R.top) / R.height * 100) + '%→' + Math.round((q.bottom - R.top) / R.height * 100) + '%']; }); }, tb);
    console.log(tb, JSON.stringify(r));
  }
  await b.close();
})();
