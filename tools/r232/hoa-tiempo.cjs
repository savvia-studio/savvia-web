const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('[data-slug=home-of-ambrose] .mesa').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(3000);
  console.log(await p.evaluate(() => new Promise((ok) => {
    const out = [], t0 = performance.now(); document.querySelector('[data-estacion-ic]').click();
    const leer = () => { const i = [...document.querySelectorAll('[data-slug=home-of-ambrose] .foto-e')].find((x) => x.style.position === 'absolute'); const dt = performance.now() - t0; out.push(Math.round(dt) + 'ms:' + (i ? i.style.getPropertyValue('mask-size').split(',').pop().trim() + ' op' + (+i.style.opacity).toFixed(2) : 'fin')); if (dt < 2900) setTimeout(leer, 300); else ok(out.join('  ')); };
    setTimeout(leer, 30);
  })));
  await b.close();
})();
