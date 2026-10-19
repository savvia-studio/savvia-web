const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  p.on('pageerror', (e) => console.log('ERR', String(e)));
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('.mesa:has(.foto-e)').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(3000);
  const est = () => p.evaluate(() => [document.documentElement.dataset.estacion, [...document.querySelector('.mesa:has(.foto-e)').querySelectorAll('img.foto-e')].map((i) => i.dataset.e + ':' + getComputedStyle(i).display + ':' + i.complete + ':' + (i.style.opacity || '-')).join(' ')]);
  console.log(await est());
  for (let k = 0; k < 1; k++) {
    await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
    const m = await p.$('.mesa:has(.foto-e)');
    for (const t of [150, 500, 900, 1400]) { await p.waitForTimeout(t === 150 ? 150 : 400); await m.screenshot({ path: `tools/shots/r232-mesa-${k}-${t}.jpg`, type: 'jpeg', quality: 50 }); }
    console.log(await p.evaluate(() => { const c = [...document.querySelectorAll('.mesa img.foto-e')].find((i) => i.style.mask); return c ? getComputedStyle(c).maskComposite + ' / ' + getComputedStyle(c).webkitMaskComposite : 'sin copia'; }));
    await p.waitForTimeout(2400);
  }
  await b.close();
})();
