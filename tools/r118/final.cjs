const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const ruta = process.argv[2] || '';
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto('http://localhost:4321/' + ruta + '?carga=0&lenis=0'); await p.waitForTimeout(3500);
  const [a, z] = await p.evaluate(() => { const li = document.querySelector('[data-parada="2"]'); const pi = document.querySelector('[data-pista]'); return [li.getBoundingClientRect().top + scrollY, pi.getBoundingClientRect().top + scrollY + 60]; });
  let y = 0; while (y < a) { y += 300; await p.evaluate((v) => window.scrollTo(0, v), y); await p.waitForTimeout(60); }
  const out = [];
  for (let i = 0; i <= 10; i++) { const v = a + ((z - a) * i) / 10; await p.evaluate((v) => window.scrollTo(0, v), v); await p.waitForTimeout(350);
    out.push(await p.evaluate(() => { const h = document.querySelector('[data-titulo] h2'); const t = document.querySelector('[data-titulo]'); return [h?.style.opacity, getComputedStyle(t).opacity, getComputedStyle(t).visibility].join('/'); }));
    if (i % 2 === 0) await p.screenshot({ path: `tools/shots/r118f-${ruta || 'o'}-${i}.jpg`, quality: 60 }); }
  console.log(JSON.stringify(out)); await b.close();
})();
