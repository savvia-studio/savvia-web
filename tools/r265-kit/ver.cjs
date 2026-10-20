// RONDA 265 · el brandbook: logotipo sin isotipo, la sección de descargas, todos los enlaces de descarga responden 200, consola y desborde
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const S = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/';
(async () => {
  for (const [nom, motor, W] of [['chrome', chromium, 1280], ['webkit', webkit, 1280], ['chrome', chromium, 390]]) {
    const b = await motor.launch(motor === webkit ? { headless: true } : launchOpts);
    const p = await (await b.newContext({ viewport: { width: W, height: W < 600 ? 844 : 720 }, deviceScaleFactor: 2, userAgent })).newPage();
    const err = [], malos = []; p.on('pageerror', (e) => err.push(e.message)); p.on('console', (m) => m.type() === 'error' && err.push(m.text()));
    p.on('response', (r) => r.status() >= 400 && malos.push(r.status() + ' ' + r.url()));
    await p.goto((process.env.BASE || 'http://localhost:4332') + '/sistema?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(1500);
    for (const id of ['logotipo', 'descargas', 'aplicaciones', 'materia']) {
      await p.evaluate((i) => document.getElementById(i).scrollIntoView(), id); await p.waitForTimeout(1500);
      await p.screenshot({ path: S + `r265-bb-${nom}-${W}-${id}.png`, fullPage: false });
    }
    const iso = await p.evaluate(() => document.querySelectorAll('#logotipo .iso-masc, #construccion .iso-masc').length);
    const links = await p.$$eval('#descargas a[download], #descargas a.btn', (as) => as.map((a) => a.href));
    let mal = 0; for (const u of links) { const r = await p.request.head(u); if (r.status() !== 200) { mal++; console.log('  falla', r.status(), u); } }
    const desb = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(nom, W, 'isotipos', iso, 'enlaces', links.length, 'rotos', mal, 'errores', err.length, err.slice(0, 2), '≥400', malos.slice(0, 3), 'desborde', desb);
    await b.close();
  }
})();
