// RONDA 97 · el pie en ASCII: la palabra, el reordenado al pasar y el director
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), q = process.argv[4] || '';
const tag = `${motor}-${W}${q ? '-clara' : ''}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0' + q); await p.waitForTimeout(1200);
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(6500);
  await p.screenshot({ path: `tools/shots/r97-pie-${tag}-0.jpg`, quality: 72 });
  const bb = await (await p.$('[data-contacta]')).boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.5, bb.y + bb.height * 0.6); await p.waitForTimeout(600);
  await p.screenshot({ path: `tools/shots/r97-pie-${tag}-1.jpg`, quality: 72 });
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `tools/shots/r97-pie-${tag}-2.jpg`, quality: 72 });
  const abierto = await p.evaluate(() => document.querySelector('[data-pie]').classList.contains('cta-abierto'));
  console.log(JSON.stringify({ tag, errs, abierto, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
