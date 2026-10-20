// RONDA 272 · la separación vertical entre objetos de cada uno (px CSS) y su tamaño
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
  await p.goto('http://localhost:4332/?carga=0'); await p.waitForTimeout(1500);
  await p.evaluate(() => document.querySelector('[data-juntos]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1500);
  const r = await (await p.$('[data-juntos]')).boundingBox();
  for (const [q, fx, i] of [['andoni', 0.39, 0], ['eric', 0.58, 1]]) {
    await p.mouse.move(r.x + r.width * fx, r.y + r.height * 0.5); await p.waitForTimeout(2500);
    const g = await p.evaluate((i) => { const im = [...document.querySelectorAll(`[data-aficiones="${i}"] .lam`)].map((e) => e.getBoundingClientRect()); return { huecos: im.slice(1).map((b, k) => Math.round(b.top - im[k].bottom)), tam: im.map((b) => `${Math.round(b.width)}×${Math.round(b.height)}`) }; }, i);
    console.log(q, JSON.stringify(g));
    await p.mouse.move(5, 5); await p.waitForTimeout(600);
  }
  await b.close();
})();
