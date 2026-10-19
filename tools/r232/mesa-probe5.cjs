const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('.mesa:has(.foto-e)').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
  await p.waitForTimeout(150);
  console.log(JSON.stringify(await p.evaluate(() => { const l = document.querySelector('.mesa:has(.foto-e)').closest('.lamina'); const r = l.getBoundingClientRect(); return document.elementsFromPoint(r.left + r.width * 0.15, r.top + r.height * 0.3).slice(0, 8).map((e) => e.tagName + '.' + [...e.classList].join('.') + ':' + (e.dataset?.e || '') + ':' + getComputedStyle(e).transform.slice(0, 20) + ':' + getComputedStyle(e).zIndex + ':' + getComputedStyle(e).opacity); })));
  await b.close();
})();
