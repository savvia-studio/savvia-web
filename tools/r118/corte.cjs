const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const W of [1000, 1100, 1280, 1440]) {
    const p = await (await b.newContext({ viewport: { width: W, height: 560 }, userAgent })).newPage();
    await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(2500);
    const r = await p.evaluate(() => { const li = document.querySelector('[data-parada="0"]'); const t = li.querySelector('.texto').getBoundingClientRect(), w = document.querySelector('[data-dolores] .paradas').getBoundingClientRect(), d = li.querySelector('.dolor').getBoundingClientRect(); return { texto: Math.round(t.left), dolor: Math.round(d.left), wrap: Math.round(w.left), sx: document.documentElement.scrollWidth, ancho: innerWidth }; });
    console.log(W, JSON.stringify(r));
  }
  await b.close();
})();
