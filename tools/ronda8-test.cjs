// Pasos (pestañas), servicios (activo + voces), pregunta libre y entrañas (arrastre que encaja en columna).
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const URL = process.argv[2] || 'http://localhost:4332/';
(async () => {
  for (const [name, eng, opts, vp] of [['chrome', chromium, launchOpts, { width: 1280, height: 720 }], ['webkit', webkit, { headless: true }, { width: 1280, height: 720 }], ['chrome-m', chromium, launchOpts, { width: 390, height: 844 }]]) {
    const b = await eng.launch(opts);
    const p = await (await b.newContext({ viewport: vp, deviceScaleFactor: 1, ...(name !== 'webkit' ? { userAgent } : {}) })).newPage();
    const errs = [], bad = [];
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
    p.on('response', (r) => r.status() >= 400 && bad.push(r.status() + ' ' + r.url()));
    await p.goto(URL, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
    const shot = (n) => (name === 'webkit' ? null : p.screenshot({ path: `tools/shots/r8_${name === 'chrome' ? 'd' : 'm'}_${n}.jpg`, type: 'jpeg', quality: 78 }));
    // pasos
    await p.locator('#recorrido [role=tablist]').scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
    await p.evaluate(() => scrollBy(0, -innerHeight * 0.55)); await p.waitForTimeout(400);
    await p.locator('[data-tab="2"]').click(); await p.waitForTimeout(1000);
    const paso = await p.evaluate(() => [...document.querySelectorAll('[data-paso]')].map((x) => x.dataset.pos).join(''));
    await shot('pasos');
    // entrañas
    await p.locator('[data-guias]').scrollIntoViewIfNeeded(); await p.locator('[data-guias]').click(); await p.waitForTimeout(500);
    let ent = null;
    if (vp.width > 1000) {
      await p.evaluate(() => document.querySelector('[data-bloque="titular"]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
      const r = await p.evaluate(() => document.querySelector('[data-bloque="titular"]').getBoundingClientRect().toJSON());
      await p.mouse.move(r.x + 80, r.y + 30); await p.mouse.down(); await p.mouse.move(r.x + 80 + 310, r.y + 30 + 30, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(700);
    }
    ent = await p.evaluate(() => window.__entranas());
    await shot('entranas');
    // servicios
    await p.locator('[data-servicio="2"]').scrollIntoViewIfNeeded(); await p.locator('[data-servicio="2"]').click(); await p.waitForTimeout(800);
    const serv = await p.evaluate(() => [...document.querySelectorAll('[data-servicio]')].map((x) => x.getAttribute('aria-expanded')).join(','));
    await p.locator('[data-voz-next]').click(); await p.waitForTimeout(300);
    const voz = await p.evaluate(() => document.querySelector('[data-voz-n]').textContent);
    await shot('servicios');
    // pregunta libre
    await p.locator('#otra').scrollIntoViewIfNeeded();
    await p.evaluate(() => window.__preguntar('¿Y cuánto me va a costar la web?')); await p.waitForTimeout(1300);
    const r1 = await p.evaluate(() => document.querySelector('[data-texto]').textContent.slice(0, 60));
    await p.evaluate(() => window.__preguntar('¿Hacéis apps para iPhone?')); await p.waitForTimeout(1300);
    const r2 = await p.evaluate(() => ({ t: document.querySelector('[data-texto]').textContent.slice(0, 50), correo: !document.querySelector('[data-correo]').hidden }));
    await shot('preguntas');
    const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(name, JSON.stringify({ errs, bad, over, paso, ent: ent && ent.bloques.map((x) => `${x.n}:${x.cs}/${x.dy}`).join(' '), serv, voz, r1, r2 }));
    await b.close();
  }
})();
