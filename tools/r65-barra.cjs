// Ronda 65 · el color de la barra al cruzar las fronteras de color: recortes de la esquina del logotipo cada 30 px alrededor de cada frontera
// node tools/r65-barra.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(500); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1500);
  const fronteras = await p.evaluate(() => ['#anteriores', '#servicios', '#la-savvia', '#estudio', '#contacto'].map((s) => { const e = document.querySelector(s); return e ? [s, Math.round(e.getBoundingClientRect().top + scrollY)] : null; }).filter(Boolean));
  let malos = 0;
  for (const [s, y] of fronteras) {
    for (let d = -520; d <= 60; d += 30) {
      await p.evaluate((v) => scrollTo(0, v), y + d); await p.waitForTimeout(120);
      const r = await p.evaluate(() => { const l = document.querySelector('.logo-marca').getBoundingClientRect(); return { claro: document.documentElement.classList.contains('sobre-claro'), escena: document.documentElement.classList.contains('sobre-escena'), x: l.left, y: l.top, w: l.width, h: l.height, c: getComputedStyle(document.querySelector('.logo-marca')).backgroundColor }; });
      // el fondo real: un píxel a la izquierda del logotipo (dentro de la barra), leído de la captura
      const png = await p.screenshot({ clip: { x: Math.max(0, r.x - 14), y: r.y + r.h / 2, width: 4, height: 2 } });
      const raw = await require('sharp')(png).removeAlpha().raw().toBuffer();
      const lum = (0.299 * raw[0] + 0.587 * raw[1] + 0.114 * raw[2]) / 255;
      const esperado = lum > 0.5; // fondo claro → logotipo oscuro
      if (!r.escena && esperado !== r.claro) { malos++; console.log('DESAJUSTE', s, d, 'fondo', lum.toFixed(2), 'claro', r.claro); }
    }
  }
  console.log(motor, 'fronteras', fronteras.length, 'desajustes', malos);
  await b.close();
})();
