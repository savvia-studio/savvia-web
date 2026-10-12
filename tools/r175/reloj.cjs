// RONDA 175 · el reloj de la demo 02 en WebKit: filas visibles y --t a lo largo de dos vueltas
const { webkit, chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, tipo] of [['webkit', webkit], ['chrome', chromium]]) {
    const b = await tipo.launch(tipo === chromium ? launchOpts : {});
    const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent })).newPage();
    await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(2500);
    const y = await p.evaluate(() => { const e = document.querySelectorAll('[data-dolores] .parada')[1]; return e.getBoundingClientRect().top + scrollY - innerHeight * 0.2; });
    const y0 = await p.evaluate(() => scrollY);
    for (let k = 1; k <= 12; k++) { await p.evaluate((v) => scrollTo(0, v), y0 + ((y - y0) * k) / 12); await p.waitForTimeout(90); }
    const out = [];
    for (let i = 0; i < 16; i++) { await p.waitForTimeout(1000); out.push(await p.evaluate(() => { const f = document.querySelector('.demo-2 .forja'); const t = document.querySelector('.demo-2').closest('.tarjeta'); return [getComputedStyle(f).getPropertyValue('--t').slice(0, 5), [...f.querySelectorAll('.skill')].map((s) => (+getComputedStyle(s).opacity).toFixed(1)).join(' '), t.className.replace(/astro-\w+/g, '').replace(/\s+/g, ' ')].join(' | '); })); }
    console.log(n + '\n' + out.join('\n'));
    await b.close();
  }
})();
