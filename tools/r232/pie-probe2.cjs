const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  p.on('pageerror', (e) => console.log('ERR', String(e))); p.on('console', (m) => m.type() !== 'log' && console.log(m.type(), m.text()));
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.getElementById('contacto').scrollIntoView({ block: 'end' }));
  await p.waitForTimeout(8000);
  await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
  for (const t of [100, 800, 2000, 3000]) { await p.waitForTimeout(t === 100 ? 100 : t - [100, 800, 2000][[800, 2000, 3000].indexOf(t)]);
    console.log(t, JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('#contacto [data-capa] canvas')].map((c) => { const r = c.getBoundingClientRect(); return [c.hasAttribute('data-lienzo'), Math.round(r.top), Math.round(r.height), c.style.opacity, (c.style.mask || c.style.webkitMask || '').slice(30, 70), getComputedStyle(c).position]; })))); }
  await p.screenshot({ path: 'tools/shots/r232-pie-probe.jpg', type: 'jpeg' });
  await b.close();
})();
