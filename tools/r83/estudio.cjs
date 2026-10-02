// RONDA 83 · la estela musical y los garabatos de director
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse|playground/i.test(m.text()) && errs.push(m.text()));
  await p.goto(process.env.URL || 'http://localhost:4332/'); await p.waitForTimeout(2000);
  const top = await p.$eval('[data-paseo]', (e) => e.getBoundingClientRect().top + scrollY);
  const S = `tools/shots/r83-estudio-${motor}-${W}`;
  // a mitad de camino y al llegar
  for (let k = 0; k < 12; k++) { await p.evaluate((y) => scrollTo(0, y), top - H * 0.96 + (H * 0.66 * 0.55 * k) / 11); await p.waitForTimeout(40); }
  await p.waitForTimeout(600); await p.screenshot({ path: `${S}-0.jpg`, quality: 72 });
  await p.evaluate((y) => scrollTo(0, y), top - H * 0.2); await p.waitForTimeout(1200);
  const q = await p.$('[data-quien="0"]'); const bb = await q.boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.6, bb.y + bb.height * 0.3); await p.waitForTimeout(1800); await p.screenshot({ path: `${S}-1.jpg`, quality: 72 });
  const q1 = await p.$('[data-quien="1"]'); const b1 = await q1.boundingBox();
  await p.mouse.move(b1.x + b1.width * 0.4, b1.y + b1.height * 0.3); await p.waitForTimeout(1800); await p.screenshot({ path: `${S}-2.jpg`, quality: 72 });
  console.log(JSON.stringify({ motor, W, errs, desb: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
