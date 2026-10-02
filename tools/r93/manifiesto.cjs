// RONDA 93 · del director se desprenden las tarjetas y forman el manifiesto (capturas a lo largo de la salida del hero)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), q = process.argv[4] || '';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0' + q); await p.waitForTimeout(5500);
  const H = await p.evaluate(() => document.querySelector('[data-hero]').offsetHeight);
  const out = [];
  for (const k of [0.15, 0.3, 0.45, 0.6, 0.8, 1.0, 1.3]) {
    await p.evaluate((y) => { (window.__lenis ? window.__lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y)); }, Math.round(H * 0.85 * k));
    await p.waitForTimeout(700);
    out.push(await p.evaluate(() => ({ y: scrollY, ocultas: document.querySelectorAll('.pl.por-llegar').length, total: document.querySelectorAll('.pl').length })));
    await p.screenshot({ path: `tools/shots/r93-manif-${motor}-${W}${q ? '-clara' : ''}-${k}.jpg`, quality: 70 });
  }
  console.log(JSON.stringify({ motor, W, q, errs, out, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
