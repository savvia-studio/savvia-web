// RONDA 94 · Proyectos destacados en la paleta clara (entrada y escena)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280);
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=0&paleta=clara'); await p.waitForTimeout(2500);
  const y0 = await p.evaluate(() => document.querySelector('#proyectos').getBoundingClientRect().top + scrollY);
  const H = await p.evaluate(() => innerHeight);
  for (const [k, dy] of [['a', -H * 0.5], ['b', 0], ['c', H * 0.6], ['d', H * 1.4]]) {
    await p.evaluate((y) => (window.__lenis ? window.__lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y)), y0 + dy); await p.waitForTimeout(1200);
    await p.screenshot({ path: `tools/shots/r94-proy-clara-${motor}-${W}-${k}.jpg`, quality: 65 });
  }
  console.log(JSON.stringify({ motor, W, errs, bg: await p.evaluate(() => getComputedStyle(document.querySelector('#proyectos')).backgroundColor) }));
  await b.close();
})();
