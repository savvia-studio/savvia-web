const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const W of [1000, 1280, 390]) {
    const p = await (await b.newContext({ viewport: { width: W, height: 700 }, userAgent })).newPage();
    await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(2500);
    const r = await p.evaluate(() => [...document.querySelectorAll('[data-parada]')].map((li) => { const l = [...li.querySelectorAll('.sistema > i')].map((i) => Math.round(i.getBoundingClientRect().top + scrollY)); const c = li.querySelector('.cuadro').getBoundingClientRect(); return { lineas: [l[0], l[4]], cuadro: [Math.round(c.top + scrollY), Math.round(c.bottom + scrollY)] }; }));
    console.log(W, JSON.stringify(r));
  }
  await b.close();
})();
