// Ronda 73 · Servicios en tabla: capturas (arriba, medio, abajo), columna al pasar, móvil
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 800 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1200); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1500);
  const y0 = await p.evaluate(() => document.querySelector('#servicios').getBoundingClientRect().top + scrollY);
  const alto = await p.evaluate(() => document.querySelector('#servicios').offsetHeight);
  for (let i = 0, y = y0 + 40; y < y0 + alto; y += H * 0.8, i++) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(1300); await p.screenshot({ path: `tools/shots/r73-serv-${motor}-${W}-${i}.jpg`, quality: 70 }); }
  let col = null;
  if (W > 1000) {
    const c = await p.$('.cabeza [data-c="2"]'); await c.scrollIntoViewIfNeeded(); await c.hover(); await p.waitForTimeout(900);
    await p.screenshot({ path: `tools/shots/r73-serv-${motor}-${W}-col2.jpg`, quality: 70 });
    col = await p.evaluate(() => document.querySelector('[data-tabla]').dataset.col);
  }
  console.log(motor, W, errs.length ? errs : 'sin errores', 'alto', alto, 'col', col, 'desborde', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  await b.close();
})();
