// RONDA 83 · la cuerda: capturas a lo largo de la sección y sonda (cuántos problemas resueltos)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(process.env.URL || 'http://localhost:4332/'); await p.waitForTimeout(2500);
  const top = await p.$eval('[data-dolores]', (e) => e.getBoundingClientRect().top + scrollY), h = await p.$eval('[data-dolores]', (e) => e.offsetHeight);
  const S = `tools/shots/r83-dolores-${motor}-${W}`;
  const fotos = [];
  for (let i = 0; i <= 5; i++) {
    const y = top - H * 0.3 + (h * i) / 6;
    for (let k = 0; k < 8; k++) { await p.evaluate((y) => scrollTo(0, y), y - (7 - k) * 30); await p.waitForTimeout(40); }
    await p.waitForTimeout(i === 1 ? 250 : 1600);
    await p.screenshot({ path: `${S}-${i}.jpg`, quality: 70 }); fotos.push(`${S}-${i}.jpg`);
  }
  const sonda = await p.evaluate(() => Object.values(window.__dolores)[0]());
  console.log(JSON.stringify({ motor, W, errs, sonda, desb: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
