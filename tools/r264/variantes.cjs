// RONDA 264 · las tres direcciones de las aficiones (?equipo=a|b|c) + las pegatinas: captura de cada una abierta
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const S = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/';
const motores = process.argv[2] === 'webkit' ? [['webkit', webkit]] : process.argv[2] === 'chrome' ? [['chrome', chromium]] : [['chrome', chromium], ['webkit', webkit]];
const W = +(process.argv[3] || 1280), H = W < 600 ? 844 : 720;
(async () => {
  for (const [nom, motor] of motores) {
    const b = await motor.launch(motor === webkit ? { headless: true } : launchOpts);
    for (const eq of ['lamina']) {
      const p = await (await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent, hasTouch: W < 600 })).newPage();
      const err = []; p.on('pageerror', (e) => err.push(e.message)); p.on('console', (m) => m.type() === 'error' && err.push(m.text()));
      await p.goto(`http://localhost:4332/?carga=0${eq ? '&equipo=' + eq : ''}`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
      await p.evaluate((m) => document.querySelector('[data-juntos]').scrollIntoView({ block: m ? 'start' : 'center' }), W < 600); await p.waitForTimeout(1800);
      const r = await (await p.$('[data-juntos]')).boundingBox();
      for (const [quien, fx] of [['eric', 0.58], ['andoni', 0.39]]) {
        if (W < 600) await p.click(`[data-quien="${quien === 'eric' ? 1 : 0}"]`);
        else await p.mouse.move(r.x + r.width * fx, r.y + r.height * 0.5);
        await p.waitForTimeout(700); await p.screenshot({ path: S + `r267-${nom}-${W}-${eq || 'p'}-${quien}-medio.png` });
        await p.waitForTimeout(2200); await p.screenshot({ path: S + `r267-${nom}-${W}-${eq || 'p'}-${quien}.png` });
        if (W >= 600) { await p.mouse.move(5, 5); await p.waitForTimeout(600); } else { await p.click(`[data-quien="${quien === 'eric' ? 1 : 0}"]`); await p.waitForTimeout(500); }
      }
      const desb = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      console.log(nom, W, eq || 'pegatinas', 'errores', err.length, err.slice(0, 2), 'desborde', desb);
      await p.close();
    }
    await b.close();
  }
})();
