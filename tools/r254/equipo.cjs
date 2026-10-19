// RONDA 254 · la sección de Eric y Andoni: de pie, y al pasar, el estallido de ilustraciones + las píldoras
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const S = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/';
(async () => {
  for (const [nom, motor, vw, vh] of [['chrome', chromium, 1280, 720], ['webkit', webkit, 1280, 720], ['movil', chromium, 390, 844]]) {
    const b = await motor.launch(motor === webkit ? { headless: true } : launchOpts);
    const p = await (await b.newContext({ viewport: { width: vw, height: vh }, userAgent })).newPage();
    const err = []; p.on('pageerror', (e) => err.push(e.message)); p.on('console', (m) => m.type() === 'error' && err.push(m.text()));
    await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(1500);
    await p.evaluate(() => document.querySelector('[data-juntos]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1800);
    const j = await p.$('[data-juntos]'); const r = await j.boundingBox();
    if (vw > 500) {
      await p.mouse.move(r.x + r.width * 0.39, r.y + r.height * 0.5); await p.waitForTimeout(1200);
      await p.screenshot({ path: S + `r254-${nom}-andoni.png` });
      await p.mouse.move(r.x + r.width * 0.58, r.y + r.height * 0.5); await p.waitForTimeout(1300);
      await p.screenshot({ path: S + `r254-${nom}-eric.png` });
    } else {
      await p.tap('[data-quien="0"]').catch(() => {}); await p.waitForTimeout(1200);
      await p.screenshot({ path: S + `r254-${nom}-andoni.png` });
    }
    const gest = await p.evaluate(() => document.querySelectorAll('.gesto').length);
    console.log(nom, 'errores', err.length, err.slice(0, 2), 'gestos', gest);
    await b.close();
  }
})();
