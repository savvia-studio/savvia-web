const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('.mesa:has(.foto-e)').scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelector('[data-estacion-ic]').click());
  await p.waitForTimeout(300);
  console.log(JSON.stringify(await p.evaluate(() => [...document.querySelector('.mesa:has(.foto-e)').children].map((c) => { const s = getComputedStyle(c); return [c.tagName, c.className, c.dataset?.e, s.display, s.position, s.zIndex, s.opacity, s.maskComposite, s.getPropertyValue('mask-image').slice(0, 80), s.getPropertyValue('mask-size'), c.getBoundingClientRect().height | 0]; }))));
  await b.close();
})();
