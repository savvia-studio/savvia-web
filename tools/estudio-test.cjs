// Prueba de la sección de proyectos: cambio de proyecto, estación, sentarse, scroll dentro, Esc, sonido.
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const URL = process.argv[2] || 'http://localhost:4332/';
(async () => {
  for (const [name, eng, opts, vp] of [['chrome', chromium, launchOpts, { width: 1280, height: 720 }], ['webkit', webkit, { headless: true }, { width: 1280, height: 720 }], ['chrome-m', chromium, launchOpts, { width: 390, height: 844 }]]) {
    const b = await eng.launch(opts);
    const p = await (await b.newContext({ viewport: vp, deviceScaleFactor: 1, ...(name !== 'webkit' ? { userAgent } : {}) })).newPage();
    const errs = [], bad = [];
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
    p.on('response', (r) => r.status() >= 400 && bad.push(r.status() + ' ' + r.url()));
    await p.goto(URL, { waitUntil: 'load' });
    await p.locator('[data-escenario]').scrollIntoViewIfNeeded(); await p.waitForTimeout(1800);
    const st = () => p.evaluate(() => ({ capa: document.querySelector('.capa.on')?.dataset.capa, cuenta: document.querySelector('[data-cuenta]').textContent, web: [...document.querySelectorAll('[data-web]')].findIndex((w) => !w.hidden), over: document.documentElement.scrollWidth - innerWidth, sfx: window.__sfxCount?.(), son: window.__sonido?.() }));
    const a = await st();
    if (name === 'chrome') await p.screenshot({ path: 'tools/shots/estudio_1.jpg', type: 'jpeg', quality: 80 });
    if (name === 'chrome-m') await p.screenshot({ path: 'tools/shots/estudio_m.jpg', type: 'jpeg', quality: 80 });
    await p.locator('[data-sonido]').click(); await p.waitForTimeout(300);
    await p.locator('[data-item="2"]').click(); await p.waitForTimeout(2000);
    const c = await st();
    if (name === 'chrome') await p.screenshot({ path: 'tools/shots/estudio_2.jpg', type: 'jpeg', quality: 80 });
    await p.locator('[data-est="invierno"]').click(); await p.waitForTimeout(400);
    const man = await p.evaluate(() => document.querySelector('.capa.on')?.dataset.capa);
    await p.locator('[data-sentarse]').click({ force: true }); await p.waitForTimeout(1500);
    const geo = await p.evaluate(() => { const r = document.querySelector('[data-pantalla]').getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), vw: innerWidth, vh: innerHeight, htmlOverflow: getComputedStyle(document.documentElement).overflow }; });
    const r = await p.evaluate(() => document.querySelector('[data-pantalla]').getBoundingClientRect().toJSON());
    await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2); await p.mouse.wheel(0, 900); await p.waitForTimeout(700);
    const sc = await p.evaluate(() => ({ dentro: Math.round(document.querySelector('[data-web]:not([hidden])').scrollTop), pagina: Math.round(scrollY) }));
    if (name === 'chrome') await p.screenshot({ path: 'tools/shots/estudio_3.jpg', type: 'jpeg', quality: 80 });
    if (name === 'chrome-m') await p.screenshot({ path: 'tools/shots/estudio_m3.jpg', type: 'jpeg', quality: 80 });
    await p.keyboard.press('Escape'); await p.waitForTimeout(900);
    const fin = await p.evaluate(() => ({ sentado: document.querySelector('[data-estudio]').classList.contains('sentado'), htmlOverflow: getComputedStyle(document.documentElement).overflow }));
    await p.locator('[data-sonido]').click(); await p.waitForTimeout(2500);
    const off = await st();
    console.log(name, JSON.stringify({ errs, bad, estacionManual: man, inicio: a, cambio: c, sentado: geo, scroll: sc, fin, sonidoOff: off.son }));
    await b.close();
  }
})();
