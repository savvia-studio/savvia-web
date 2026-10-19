// RONDA 258 · las ilustraciones se dibujan a tinta, se imprime la trama y hacen su gesto
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const S = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/';
(async () => {
  for (const [nom, motor] of [['chrome', chromium], ['webkit', webkit]]) {
    const b = await motor.launch(motor === webkit ? { headless: true } : launchOpts);
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
    const err = []; p.on('pageerror', (e) => err.push(e.message)); p.on('console', (m) => m.type() === 'error' && err.push(m.text()));
    await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(1500);
    await p.evaluate(() => document.querySelector('[data-juntos]').scrollIntoView({ block: 'end' })); await p.waitForTimeout(1800);
    const r = await (await p.$('[data-juntos]')).boundingBox();
    for (const [quien, fx] of [['eric', 0.58], ['andoni', 0.39]]) {
      await p.mouse.move(r.x + r.width * fx, r.y + r.height * 0.5);
      
      for (const t of [450, 900, 2600, 3500]) { await p.waitForTimeout(t === 450 ? 450 : t === 900 ? 450 : t === 2600 ? 1700 : 900);
        await p.screenshot({ path: S + `r260-${nom}-${quien}-${t}.png` }); }
      const vivas = await p.evaluate(() => document.querySelectorAll('.ilu.viva').length);
      console.log(nom, quien, 'vivas', vivas);
      await p.mouse.move(5, 5); await p.waitForTimeout(600);
    }
    console.log(nom, 'errores', err.length, err.slice(0, 2));
    await b.close();
  }
})();
