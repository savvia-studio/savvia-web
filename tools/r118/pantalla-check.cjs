const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto(process.argv[2] + '?carga=0&lenis=0', { waitUntil: 'networkidle' }); await p.waitForTimeout(5000);
  console.log(JSON.stringify(await p.evaluate(() => {
    const pts = window.__partituraHero.pantalla(), m = document.querySelector('.marco').getBoundingClientRect();
    // muestra el píxel más brillante del lienzo en pantalla cerca de cada nota proyectada: debe haber luz ahí
    return { n: pts.length, marco: [m.x, m.y, m.width, m.height].map(Math.round), muestra: pts.slice(0, 4).map((q) => q.map(Math.round)) };
  })));
  await b.close();
})();
