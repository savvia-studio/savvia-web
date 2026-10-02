const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(1500);
  const top = await p.evaluate(() => document.querySelector('#proyectos').getBoundingClientRect().top + scrollY);
  // bajar despacio por el manifiesto (entinta) y luego el tramo del vuelo
  for (let y = top - H * 2.2; y < top - H; y += 120) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(40); }
  const ks = [0, 0.25, 0.5, 0.75, 1];
  for (const [i, k] of ks.entries()) { await p.evaluate((y) => scrollTo(0, y), top - H + k * H); await p.waitForTimeout(350); await p.screenshot({ path: `tools/shots/r90-vuelo-${motor}-${W}-${i}.jpg`, quality: 65 }); }
  const vis = await p.evaluate(() => [...document.querySelectorAll('[data-titulo] h2 .letra')].filter((l) => getComputedStyle(l).opacity === '1').length + '/' + document.querySelectorAll('[data-titulo] h2 .letra').length);
  await p.evaluate((y) => scrollTo(0, y), top - H * 1.2); await p.waitForTimeout(300);
  const vuelta = await p.evaluate(() => [...document.querySelectorAll('.cierre .letra')].filter((l) => getComputedStyle(l).opacity !== '0').length + '/' + document.querySelectorAll('.cierre .letra').length);
  console.log(JSON.stringify({ motor, W, errs, tituloAlFinal: vis, fraseAlVolver: vuelta, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
