// RONDA 64 · el titular-buscador, los filtros plegados, el orden libre, la savia al cambiar de página y el caso con la marca
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = 'http://localhost:4321';
(async () => {
  for (const [nom, motor, w, h] of [['chrome', chromium, 1280, 720], ['chrome', chromium, 390, 844], ['webkit', webkit, 1280, 720]]) {
    const b = await motor.launch(nom === 'chrome' ? launchOpts : {});
    const p = await (await b.newContext({ viewport: { width: w, height: h }, userAgent: nom === 'chrome' ? userAgent : undefined })).newPage();
    const errores = []; p.on('pageerror', (e) => errores.push(e.message)); p.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
    const malas = []; p.on('response', (r) => r.status() >= 400 && malas.push(r.status() + ' ' + r.url()));
    await p.goto(B + '/proyectos', { waitUntil: 'load' }); await p.waitForTimeout(1200);
    const n = `${nom}-${w}`;
    await p.evaluate(() => document.querySelector('[data-todos]').scrollIntoView()); await p.waitForTimeout(900);
    await p.screenshot({ path: `tools/shots/r64-todos-${n}.jpg`, quality: 60 });
    const ph = await p.evaluate(() => document.querySelector('[data-buscar]').placeholder);
    await p.click('[data-abrir-filtros]'); await p.waitForTimeout(500);
    const filtrosVisibles = await p.evaluate(() => !document.querySelector('[data-filtros]').hidden);
    await p.click('[data-abrir-filtros]'); await p.waitForTimeout(300);
    await p.click('[data-orden="libre"]'); await p.waitForTimeout(1400);
    await p.screenshot({ path: `tools/shots/r64-libre-${n}.jpg`, quality: 60 });
    const o = await p.evaluate(() => window.__obras());
    await p.fill('[data-buscar]', 'fintech'); await p.waitForTimeout(500);
    const f = await p.evaluate(() => window.__obras().visibles.join(','));
    console.log(n, 'placeholder:', ph, '· filtros al pulsar:', filtrosVisibles, '· libre:', o.orden, o.visibles.length, '· fintech →', f, '· desborde', (await p.evaluate(() => document.documentElement.scrollWidth)) - w);
    await p.fill('[data-buscar]', ''); await p.waitForTimeout(400);
    // LA SAVIA: pulsar una tarjeta y capturar la inundación
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
    const pz = await p.$('[data-pieza-obra]'); const r = await pz.boundingBox();
    await p.mouse.click(r.x + r.width * 0.5, r.y + r.height * 0.4);
    for (const t of [180, 380, 600]) { await p.waitForTimeout(t === 180 ? 180 : 200); await p.screenshot({ path: `tools/shots/r64-savia-${n}-${t}.jpg`, quality: 55 }).catch(() => {}); }
    await p.waitForURL(/\/proyectos\/.+/, { timeout: 8000 }); await p.waitForTimeout(2500);
    const al = await p.evaluate(() => document.documentElement.scrollHeight);
    if (nom === 'chrome' && w === 1280) for (let i = 0, y = 0; y < al && i < 16; i++, y += h * 0.9) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(900); await p.screenshot({ path: `tools/shots/r64-caso-${i}.jpg`, quality: 55 }); }
    console.log(n, 'llegó a', await p.evaluate(() => location.pathname), 'desborde', (await p.evaluate(() => document.documentElement.scrollWidth)) - w, 'restos de savia', await p.evaluate(() => document.querySelectorAll('.vt-savia').length), 'errores', errores.length ? errores.slice(0, 3) : 0, '≥400', malas.length ? malas.slice(0, 3) : 0);
    await b.close();
  }
})();
