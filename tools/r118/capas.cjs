const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(900);
  await p.keyboard.press('Enter'); await p.waitForTimeout(600); await p.mouse.click(1200, 140); await p.waitForTimeout(7500);
  const r = await p.evaluate(() => { const b = document.querySelector('[data-caja]').getBoundingClientRect(); return { x: b.left, y: b.top, width: b.width, height: b.height }; });
  for (const [n, sel] of [['todo', ''], ['sin-musicos', '[data-musicos]'], ['sin-director', '[data-acuarela]'], ['sin-mascara', 'MASK']]) {
    await p.evaluate((sel) => { document.querySelectorAll('[data-caja] canvas').forEach((c) => (c.style.visibility = '')); const c = document.querySelector('[data-caja]'); if (sel === 'MASK') { c.style.maskImage = 'none'; c.style.webkitMaskImage = 'none'; } else if (sel) document.querySelector('[data-caja] ' + sel).style.visibility = 'hidden'; }, sel);
    await p.waitForTimeout(300); await p.screenshot({ path: `tools/shots/r118-capa-${n}.jpg`, quality: 80, clip: r });
  }
  await b.close();
})();
