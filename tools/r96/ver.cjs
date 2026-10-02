// RONDA 96 · el estilo retrato (hero y pie) y el calderón del «Contáctanos»
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), q = process.argv[4] || '';
const tag = `${motor}-${W}${q.includes('clara') ? '-clara' : ''}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0' + q);
  await p.waitForTimeout(1600); await p.screenshot({ path: `tools/shots/r96-hero-${tag}-a.jpg`, quality: 72 });
  await p.waitForTimeout(3000); await p.screenshot({ path: `tools/shots/r96-hero-${tag}-b.jpg`, quality: 72 });
  await p.waitForTimeout(4500); await p.screenshot({ path: `tools/shots/r96-hero-${tag}-c.jpg`, quality: 72 });
  const lienzo = await p.evaluate(() => { const c = document.querySelector('[data-lienzo]'); return { w: c.width, h: c.height, listo: c.classList.contains('listo') }; });
  const magia = await p.evaluate(() => window.__heroMagia && window.__heroMagia());
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(7000);
  await p.screenshot({ path: `tools/shots/r96-pie-${tag}-0.jpg`, quality: 72 });
  const bb = await (await p.$('[data-contacta]')).boundingBox();
  await p.mouse.move(bb.x + bb.width * 0.4, bb.y + bb.height * 0.6); await p.waitForTimeout(500);
  await p.screenshot({ path: `tools/shots/r96-pie-${tag}-1.jpg`, quality: 72 });
  await p.waitForTimeout(1300);
  await p.screenshot({ path: `tools/shots/r96-pie-${tag}-2.jpg`, quality: 72 });
  const pb = await (await p.$('[data-pastilla]')).boundingBox();
  await p.mouse.move(pb.x + pb.width / 2, pb.y + pb.height / 2, { steps: 14 }); await p.waitForTimeout(500);
  const sigue = await p.evaluate(() => document.querySelector('[data-pie]').classList.contains('cta-abierto'));
  const fuera = await p.evaluate(() => { const r = document.querySelector('[data-pastilla]').getBoundingClientRect(); return [Math.round(r.left), Math.round(innerWidth - r.right)]; });
  console.log(JSON.stringify({ tag, errs, lienzo, magia, sigueAbiertoEnLaPildora: sigue, margenesPildora: fuera, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
