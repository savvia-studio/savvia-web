const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const tag = process.argv[2] || 'x';
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
  for (const [n, u] of [['oscura', '/?carga=0'], ['clara', '/clara?carga=0']]) {
    await p.goto('http://localhost:4331' + u); await p.waitForTimeout(9000);
    const lz = await (await p.$('[data-lienzo]')).boundingBox();
    await p.screenshot({ path: `tools/shots/r112-${tag}-${n}.jpg`, quality: 75, clip: { x: lz.x, y: lz.y, width: lz.width, height: lz.height } });
    console.log(n, await p.evaluate(() => getComputedStyle(document.body).backgroundColor));
  }
  await b.close();
})();
