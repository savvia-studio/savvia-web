const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const B = 'http://localhost:4322', S = '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r137-equipo-';
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  for (const [nom, motor, vp] of [['chrome', chromium, { width: 1280, height: 720 }], ['webkit', webkit, { width: 1280, height: 720 }], ['movil', chromium, { width: 390, height: 844 }]]) {
    const br = motor === webkit ? await webkit.launch() : await chromium.launch(launchOpts);
    const ctx = await br.newContext({ viewport: vp, userAgent: motor === webkit ? undefined : userAgent, deviceScaleFactor: 2, hasTouch: nom === 'movil', isMobile: nom === 'movil' });
    await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
    const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    pg.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
    await pg.goto(B + '/', { waitUntil: 'networkidle' }); await espera(1200);
    const top = await pg.evaluate(() => document.querySelector('[data-paseo]').getBoundingClientRect().top + scrollY);
    const vh = vp.height;
    const clip = async () => { const r = await pg.evaluate(() => { const p = document.querySelector('[data-paseo]').getBoundingClientRect(); return { x: 0, y: Math.max(0, p.top - 140), width: innerWidth, height: Math.min(innerHeight - Math.max(0, p.top - 140), p.height + 260) }; }); return r; };
    for (const lin of [0.3, 0.6, 1.0]) {
      await pg.evaluate((y) => scrollTo(0, y), top - (vh * 0.96 - lin * vh * 0.66));
      await espera(700);
      await pg.screenshot({ path: `${S}${nom}-${lin === 1 ? 'juntos' : 'andando' + lin}.jpg`, quality: 80, clip: await clip() });
    }
    const quien = nom === 'movil' ? null : true;
    for (const i of [0, 1]) {
      const n = i ? 'eric' : 'andoni';
      if (nom === 'movil') { if (i) continue; await pg.tap(`#estudio [data-quien="${i}"]`); }
      else { await pg.mouse.move(5, 5); await espera(400); await pg.hover(`#estudio [data-quien="${i}"]`); }
      // espera a que empiece el gesto y captura fotogramas
      await pg.waitForFunction((i) => document.querySelector('[data-juntos]').classList.contains('con-gesto-' + i), i, { timeout: 4000 }).catch(() => errs.push('no gesto ' + n));
      const c = await pg.evaluate(() => { const j = document.querySelector('[data-juntos]').getBoundingClientRect(); const x = Math.max(0, j.x - 160), y = Math.max(0, j.y - 60); return { x, y, width: Math.min(innerWidth - x, j.width + 320), height: Math.min(innerHeight - y, j.height + 200) }; });
      for (let k = 0; k < 8; k++) { await pg.screenshot({ path: `${S}${nom}-${n}-g${k}.jpg`, quality: 80, clip: c }); await espera(70); }
      await espera(800);
      const st = await pg.evaluate((i) => ({ activo: document.querySelector('[data-juntos]').classList.contains('con-gesto-' + i), mira: document.querySelector('[data-juntos]').dataset.mira }), i);
      await pg.screenshot({ path: `${S}${nom}-${n}-fin.jpg`, quality: 80, clip: c });
      console.log(nom, n, 'tras gesto', JSON.stringify(st));
    }
    const m = await pg.evaluate(() => { const j = document.querySelector('[data-juntos]').getBoundingClientRect(); return [...document.querySelectorAll('#estudio .punto')].map((p) => { const r = p.getBoundingClientRect(); return [Math.round(r.x - j.x), Math.round(r.y - j.y), Math.round(j.width)]; }); });
    console.log(nom, 'puntos', JSON.stringify(m), 'errs', errs);
    await br.close();
  }
})();
