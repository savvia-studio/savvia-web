// Ronda 66 · cada pieza de «Más proyectos» (asomada y quieta): ¿el navegador o la pantalla caben enteros en su lámina? node tools/r66-piezas.cjs [ancho]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const W = +(process.argv[2] || 1280);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: 800 }, userAgent, reducedMotion: 'reduce' })).newPage();
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(2000);
  const piezas = await p.$$('#anteriores a.pieza');
  for (const [i, el] of piezas.entries()) {
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
    const r = await el.evaluate((a) => { const l = a.querySelector('.lamina').getBoundingClientRect(); const m = a.querySelector('.mockup, .pantalla'); const q = m.getBoundingClientRect(); return { slug: a.dataset.slug, tipo: a.className, fuera: [Math.round(l.left - q.left), Math.round(q.right - l.right), Math.round(l.top - q.top), Math.round(q.bottom - l.bottom)].map((v) => Math.max(0, v)) }; });
    await el.screenshot({ path: `tools/shots/r66-pieza-${W}-${i}.jpg`, quality: 70 });
    console.log(JSON.stringify(r));
  }
  await b.close();
})();
