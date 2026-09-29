// RONDA 63 · /proyectos en claro (destacados como «Más proyectos», buscador, filtros) y el caso ampliado: pruebas y capturas
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = process.argv[2] || 'http://localhost:4321';
(async () => {
  for (const [nom, motor, w, h] of [['chrome', chromium, 1280, 720], ['chrome', chromium, 390, 844], ['webkit', webkit, 1280, 720]]) {
    const b = await motor.launch(nom === 'chrome' ? launchOpts : {});
    const p = await (await b.newContext({ viewport: { width: w, height: h }, userAgent: nom === 'chrome' ? userAgent : undefined })).newPage();
    const errores = []; p.on('pageerror', (e) => errores.push(e.message)); p.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
    const malas = []; p.on('response', (r) => r.status() >= 400 && malas.push(r.status() + ' ' + r.url()));
    await p.goto(B + '/proyectos', { waitUntil: 'load' }); await p.waitForTimeout(1500);
    if (nom === 'chrome' && w === 1280) {
      const alto = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let i = 0, y = 0; y < alto - h && i < 10; i++, y += h * 0.9) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(800); await p.screenshot({ path: `tools/shots/r63-lista-${i}.jpg`, quality: 60 }); }
      await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400);
      await p.hover('[data-pieza-obra] >> nth=0'); await p.waitForTimeout(1500);
      console.log('pieza suena al pasar:', await p.evaluate(() => document.querySelector('[data-pieza-obra]').classList.contains('suena')));
    }
    const pruebas = {};
    for (const q of ['multilingüe', 'fintech', 'webflw', 'notion', 'ia', 'migracion coreano', 'zzzz']) pruebas[q] = (await p.evaluate((x) => window.__buscar(x), q)).visibles.join(',') || '—';
    console.log(nom, w, JSON.stringify(pruebas));
    await p.evaluate(() => window.__buscar(''));
    await p.click('[data-servicio="Multidioma"]'); await p.waitForTimeout(300);
    console.log(nom, w, 'Multidioma →', (await p.evaluate(() => window.__obras())).visibles.join(','), '· url', await p.evaluate(() => location.search));
    const fondo = await p.evaluate(() => getComputedStyle(document.querySelector('main')).backgroundColor);
    console.log(nom, w, 'fondo', fondo, 'desborde', (await p.evaluate(() => document.documentElement.scrollWidth)) - w);
    for (const slug of nom === 'chrome' && w === 1280 ? ['multiverse', 'invopop'] : ['playground']) {
      await p.goto(B + '/proyectos/' + slug, { waitUntil: 'load' }); await p.waitForTimeout(1200);
      const al = await p.evaluate(() => document.documentElement.scrollHeight);
      if (nom === 'chrome' && w === 1280) for (let i = 0, y = 0; y < al && i < 18; i++, y += h * 0.9) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(600); await p.screenshot({ path: `tools/shots/r63-caso-${slug}-${i}.jpg`, quality: 60 }); }
      console.log(nom, w, slug, 'alto', al, 'desborde', (await p.evaluate(() => document.documentElement.scrollWidth)) - w);
    }
    console.log(nom, w, 'errores', errores.length ? errores.slice(0, 4) : 0, '≥400', malas.length ? malas.slice(0, 4) : 0);
    await b.close();
  }
})();
