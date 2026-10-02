// RONDA 105 · el hueco del ratón en el ASCII del hero
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(5000);
  const lz = await (await p.$('[data-lienzo]')).boundingBox(), clip = { x: lz.x, y: lz.y, width: lz.width, height: lz.height };
  await p.mouse.move(lz.x + lz.width * 0.45, lz.y + lz.height * 0.45, { steps: 8 }); await p.waitForTimeout(700);
  await p.screenshot({ path: `tools/shots/r107-hueco-${motor}-1.jpg`, quality: 72, clip });
  await p.mouse.move(lz.x + lz.width * 0.58, lz.y + lz.height * 0.3, { steps: 12 }); await p.waitForTimeout(250);
  await p.screenshot({ path: `tools/shots/r107-hueco-${motor}-2.jpg`, quality: 72, clip });
  await p.mouse.move(10, 10, { steps: 6 }); await p.waitForTimeout(1500);
  await p.screenshot({ path: `tools/shots/r107-hueco-${motor}-3.jpg`, quality: 72, clip });
  console.log(JSON.stringify({ motor, errs }));
  await b.close();
})();
