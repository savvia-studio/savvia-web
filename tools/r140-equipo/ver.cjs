const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r140-equipo';
(async () => {
  for (const [nom, motor, w, h] of [['chrome', chromium, 1280, 720], ['webkit', webkit, 1280, 720], ['chrome390', chromium, 390, 844]]) {
    const b = motor === webkit ? await webkit.launch() : await motor.launch(launchOpts);
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    const pg = await ctx.newPage(); const errs = [];
    pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await pg.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
    await pg.goto('http://localhost:4322/?lenis=0&carga=0', { waitUntil: 'networkidle' });
    const top = await pg.evaluate(() => { const p = document.querySelector('[data-paseo]'); return p.getBoundingClientRect().top + scrollY; });
    const ch = await pg.evaluate(() => document.querySelector('[data-paseo]').offsetHeight);
    // lin = (vh*.96 - top)/(vh*.26+ch)
    const at = async (lin) => { const y = top - (h * 0.96 - lin * (h * 0.26 + ch)); await pg.evaluate((y) => scrollTo(0, y), y); await pg.waitForTimeout(500); };
    await at(0.45); await pg.screenshot({ path: `${OUT}-${nom}-paseo.jpg`, quality: 85 });
    await at(1.0); await pg.waitForTimeout(1500); await pg.screenshot({ path: `${OUT}-${nom}-final.jpg`, quality: 85 });
    const info = await pg.evaluate(() => { const j = document.querySelector('[data-juntos]').getBoundingClientRect(); const s = document.querySelector('#estudio + section, #estudio ~ section')?.getBoundingClientRect(); return { juntos: [Math.round(j.left), Math.round(j.top), Math.round(j.width), Math.round(j.height)], siguiente: s && Math.round(s.top), vh: innerHeight, llegaron: document.querySelector('[data-equipo]').classList.contains('llegaron') }; });
    if (w > 600) {
      const btn = await pg.$('[data-equipo] [data-quien="0"]'); const bb = await btn.boundingBox();
      await pg.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await pg.waitForTimeout(1400);
      await pg.screenshot({ path: `${OUT}-${nom}-hover-andoni.jpg`, quality: 85 });
      const j = info.juntos;
      await pg.mouse.move(5, 5); await pg.waitForTimeout(700);
      await pg.screenshot({ path: `${OUT}-${nom}-caras.jpg`, quality: 92, clip: { x: j[0] + j[2] * 0.3, y: j[1], width: j[2] * 0.4, height: j[3] * 0.3 } });
    } else {
      await pg.tap?.('[data-quien="1"]').catch(() => {});
    }
    console.log(nom, JSON.stringify(info), 'errs', errs);
    await b.close();
  }
})();
