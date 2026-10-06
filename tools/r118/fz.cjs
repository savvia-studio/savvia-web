const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const fz of process.argv.slice(2)) {
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
    await p.goto('http://localhost:4321/?fuerza=' + fz); await p.waitForTimeout(900);
    await p.keyboard.press('Enter'); await p.waitForTimeout(600); await p.mouse.click(1200, 140); await p.waitForTimeout(7500);
    const r = await p.evaluate(() => { const b = document.querySelector('[data-caja]').getBoundingClientRect(); return { x: b.left, y: b.top, width: b.width, height: b.height }; });
    await p.screenshot({ path: `tools/shots/r118-fz-${fz}.jpg`, quality: 80, clip: r });
  }
  await b.close();
})();
