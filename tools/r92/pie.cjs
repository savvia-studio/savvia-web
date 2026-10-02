// RONDA 92 · el pie: fondo de palabras (papel) y el bocadillo que sale de la tilde de «Contáctanos»
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), q = process.argv[4] || '';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0' + q); await p.waitForTimeout(1500);
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(6000);
  await p.screenshot({ path: `tools/shots/r92-pie-${motor}-${W}${q ? '-clara' : ''}-0.jpg`, quality: 70 });
  const bb = await (await p.$('[data-contacta]')).boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.4, bb.y + bb.height * 0.6); await p.waitForTimeout(450);
  await p.screenshot({ path: `tools/shots/r92-pie-${motor}-${W}${q ? '-clara' : ''}-1.jpg`, quality: 70 });
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `tools/shots/r92-pie-${motor}-${W}${q ? '-clara' : ''}-2.jpg`, quality: 70 });
  // del texto al bocadillo sin que se cierre
  const pb = await (await p.$('[data-pastilla]')).boundingBox();
  await p.mouse.move(pb.x + pb.width / 2, pb.y + pb.height / 2, { steps: 12 }); await p.waitForTimeout(500);
  const sigue = await p.evaluate(() => document.querySelector('[data-pie]').classList.contains('cta-abierto'));
  console.log(JSON.stringify({ motor, W, q, errs, sigueAbiertoEnElBocadillo: sigue, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
