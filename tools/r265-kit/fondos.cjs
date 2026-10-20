// RONDA 265 · fondos de LinkedIn y X: el paisaje del pie de cada estación, sin «Contáctanos» ni el texto, capturado en Chrome real.
// node tools/r265-kit/fondos.cjs → tools/r265-kit/out/pie-<estacion>.png (la franja del paisaje a 3200 px de ancho)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = __dirname + '/out/'; require('fs').mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch(launchOpts);
  // ronda 266 · «un estado más final, donde ya se vean más hojas cayendo, nieve, flores, hierba»: las cuatro a la vez y ESPERA (segundos, argumento)
  const ESPERA = +(process.argv[2] || 45) * 1000;
  await Promise.all(['otono', 'invierno', 'primavera', 'verano'].map(async (e) => {
    const p = await (await b.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 2, userAgent })).newPage();
    await p.goto(`http://localhost:4332/?carga=0&estacion=${e}`, { waitUntil: 'load' }); await p.waitForTimeout(1200);
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(ESPERA); // el paisaje se dibuja y se pinta; las hojas y la nieve se acumulan, las flores brotan
    await p.addStyleTag({ content: '[data-pie] .contenido, [data-pie] .contacta, [data-pie] .contacta *, [data-pie] [data-tiempo], [data-pie] .cursor-contacto, nav, header, .barra, [data-carriles], .carriles { visibility: hidden !important; opacity: 0 !important; }' });
    await p.evaluate(() => { for (const el of document.querySelectorAll('body *')) { if (getComputedStyle(el).position === 'fixed' && !el.closest('[data-pie]')) el.style.visibility = 'hidden'; } });
    await p.waitForTimeout(300);
    const r = await p.$eval('[data-paisaje]', (el) => { const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, w: b.width, h: b.height }; });
    const y = Math.max(0, r.y), h = Math.min(900 - y, r.h - (y - r.y));
    await p.screenshot({ path: OUT + `pie-${e}.png`, clip: { x: 0, y, width: 1600, height: h } });
    console.log(e, 'paisaje', Math.round(r.w), '×', Math.round(r.h), 'capturado', Math.round(h));
    await p.close();
  }));
  await b.close();
})();
