const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(2500);
  const y = await p.evaluate(() => { const s = document.querySelector('#proyectos'); return s.getBoundingClientRect().top + scrollY + (s.querySelector('.pista').offsetHeight - innerHeight) * 0.45; });
  await p.evaluate((yy) => scrollTo(0, yy * 0.5), y); await p.waitForTimeout(400);
  await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(6000);
  const antes = await p.evaluate(() => [...document.querySelectorAll('#proyectos img[data-capa]')].map((c) => c.currentSrc.split('/').pop() + ':' + c.naturalWidth));
  await p.click('[data-sentarse]'); await p.waitForTimeout(4000);
  const despues = await p.evaluate(() => [...document.querySelectorAll('#proyectos img[data-capa]')].map((c) => c.currentSrc.split('/').pop() + ':' + c.naturalWidth));
  await p.screenshot({ path: 'tools/shots/r39-sentado-dpr2.jpg', type: 'jpeg', quality: 88 });
  await p.screenshot({ path: 'tools/shots/r39-sentado-teclado.png', clip: { x: 360, y: 560, width: 560, height: 160 } });
  console.log(JSON.stringify({ antes, despues, errs }));
  await b.close();
})();
