// RONDA 83 · el pie «fin de la obra»: llegada y hover sobre «Contáctanos»
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse|playground/i.test(m.text()) && errs.push(m.text()));
  await p.goto(process.env.URL || 'http://localhost:4332/'); await p.waitForTimeout(1500);
  const alto = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let k = 10; k >= 0; k--) { await p.evaluate((y) => scrollTo(0, y), alto - k * 120); await p.waitForTimeout(60); }
  await p.waitForTimeout(3000);
  const S = `tools/shots/r83-pie-${motor}-${W}`;
  await p.screenshot({ path: `${S}-0.jpg`, quality: 72 });
  const bb = await (await p.$('[data-contacta]')).boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.4, bb.y + bb.height * 0.5, { steps: 5 }); await p.waitForTimeout(1400);
  await p.screenshot({ path: `${S}-1.jpg`, quality: 72 });
  const abierto = await p.evaluate(() => document.querySelector('[data-pie]').classList.contains('cta-abierto'));
  console.log(JSON.stringify({ motor, W, errs, abierto, desb: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
