// RONDA 62 · /proyectos (destacados, filtros, páginas) y /proyectos/<slug> (caso): capturas y comprobaciones
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = process.argv[2] || 'http://localhost:4321';
(async () => {
  for (const [nom, motor, w, h] of [['chrome', chromium, 1280, 720], ['chrome', chromium, 390, 844], ['webkit', webkit, 1280, 720]]) {
    const b = await motor.launch(nom === 'chrome' ? launchOpts : {});
    const p = await (await b.newContext({ viewport: { width: w, height: h }, userAgent: nom === 'chrome' ? userAgent : undefined })).newPage();
    const errores = []; p.on('pageerror', (e) => errores.push(e.message)); p.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
    const malas = []; p.on('response', (r) => r.status() >= 400 && malas.push(r.status() + ' ' + r.url()));
    await p.goto(B + '/proyectos', { waitUntil: 'load' }); await p.waitForTimeout(1800);
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let i = 0, y = 0; y < alto - h && i < 12; i++, y += h * 0.9) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(900); if (nom === 'chrome' && w === 1280 || i < 6) await p.screenshot({ path: `tools/shots/r62-lista-${nom}-${w}-${i}.jpg`, quality: 60 }); }
    const a = await p.evaluate(() => window.__obras());
    await p.click('[data-servicio="Migración"]'); await p.waitForTimeout(400);
    const bb = await p.evaluate(() => window.__obras());
    await p.click('[data-servicio=""]'); await p.waitForTimeout(300);
    await p.click('.pag:not(.flecha) >> nth=1'); await p.waitForTimeout(700);
    const c = await p.evaluate(() => ({ ...window.__obras(), url: location.search }));
    const ancho = await p.evaluate(() => document.documentElement.scrollWidth);
    console.log(nom, w, 'lista', JSON.stringify(a), '· Migración', JSON.stringify(bb), '· pág 2', JSON.stringify(c), 'desborde', ancho - w);
    for (const slug of nom === 'chrome' && w === 1280 ? ['multiverse', 'remerge', 'playground'] : ['playground']) {
      await p.goto(B + '/proyectos/' + slug, { waitUntil: 'load' }); await p.waitForTimeout(1500);
      const al = await p.evaluate(() => document.documentElement.scrollHeight);
      for (let i = 0, y = 0; y < al && i < 14; i++, y += h * 0.9) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(800); await p.screenshot({ path: `tools/shots/r62-caso-${slug}-${nom}-${w}-${i}.jpg`, quality: 60 }); }
      const an = await p.evaluate(() => document.documentElement.scrollWidth);
      console.log(nom, w, slug, 'alto', al, 'desborde', an - w);
    }
    console.log(nom, w, 'errores', errores.length ? errores.slice(0, 5) : 0, 'respuestas ≥400', malas.length ? malas.slice(0, 5) : 0);
    await b.close();
  }
})();
