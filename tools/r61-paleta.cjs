// RONDA 61 · la paleta 3 a prueba: captura cada sección en la paleta 3 y en la 2 (?paleta=2) para compararlas.
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const BASE = process.argv[2] || 'http://localhost:4321/';
const SECC = ['[data-hero]', '#recorrido-a2', '#proyectos', '#anteriores', '#servicios', '#la-savvia', '#estudio', '#preguntas', '#contacto'];
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [pal, q] of [['3', ''], ['2', '?paleta=2']]) {
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
    const errores = []; p.on('pageerror', (e) => errores.push(e.message));
    await p.goto(BASE + q, { waitUntil: 'load' }); await p.waitForTimeout(600); await p.keyboard.press('Escape'); await p.waitForTimeout(1500);
    for (const [i, s] of SECC.entries()) {
      await p.evaluate((sel) => { const e = document.querySelector(sel); e && scrollTo(0, e.getBoundingClientRect().top + scrollY + (sel === '#proyectos' ? innerHeight * 2.2 : sel === '#contacto' ? e.offsetHeight - innerHeight : 40)); }, s);
      await p.waitForTimeout(s === '#contacto' ? 6000 : 1800);
      await p.screenshot({ path: `tools/shots/r61-p${pal}-${i}.jpg`, quality: 70 });
    }
    const colores = await p.evaluate(() => ['#anteriores', '#servicios', '#la-savvia', '#preguntas'].map((s) => { const e = document.querySelector(s); const c = getComputedStyle(e); return s + ' ' + c.backgroundColor + ' / ' + c.color; }));
    console.log('paleta', pal, colores.join(' · '), 'errores', errores.length ? errores : 0);
    await p.context().close();
  }
  await b.close();
})();
