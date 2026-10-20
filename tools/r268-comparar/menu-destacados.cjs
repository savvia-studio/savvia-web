// RONDA 274 · el menú: los destacados rotan con el menú abierto y la tarjeta lleva al caso que enseña
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const S = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/';
(async () => {
  for (const [nom, motor, W] of [['chrome', chromium, 1280], ['webkit', webkit, 1280], ['chrome', chromium, 390]]) {
    const b = await motor.launch(motor === webkit ? { headless: true } : launchOpts);
    const p = await (await b.newContext({ viewport: { width: W, height: W < 600 ? 844 : 720 }, deviceScaleFactor: 2, userAgent })).newPage();
    const err = []; p.on('pageerror', (e) => err.push(e.message)); p.on('console', (m) => m.type() === 'error' && err.push(m.text()));
    await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(2000);
    await p.click('button.rejilla'); await p.waitForTimeout(1600);
    const a = await p.$eval('[data-destacados]', (d) => d.getAttribute('href')); await p.screenshot({ path: S + `r274-menu-${nom}-${W}-1.png` });
    await p.waitForTimeout(3400);
    const b2 = await p.$eval('[data-destacados]', (d) => d.getAttribute('href') + ' · ' + d.querySelector('[data-dst-nombre]').textContent); await p.screenshot({ path: S + `r274-menu-${nom}-${W}-2.png` });
    const desb = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(nom, W, a, '→', b2, 'errores', err.length, err.slice(0, 2), 'desborde', desb);
    await b.close();
  }
})();
