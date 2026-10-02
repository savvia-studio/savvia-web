const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const tag = process.argv[2] || 'antes';
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=0' + (process.argv[3] || '')); await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(7000);
  const bb = await (await p.$('[data-contacta]')).boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.5, bb.y + bb.height * 0.6, { steps: 6 }); await p.waitForTimeout(2200);
  await p.screenshot({ path: `tools/shots/r106-pie-${tag}.jpg`, quality: 75, clip: { x: 0, y: 240, width: 1280, height: 480 } });
  console.log(JSON.stringify({ errs }));
  await b.close();
})();
