// Ronda 68 · el «rayo» bajo Eric y Andoni: capturas del final del paseo y qué elementos hay en la esquina de abajo a la derecha
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(600); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1500);
  const y0 = await p.evaluate(() => { const e = document.querySelector('[data-paseo]'); return e.getBoundingClientRect().top + scrollY; });
  for (const [k, d] of [[0, 0.95], [1, 0.7], [2, 0.5], [3, 0.35]]) {
    await p.evaluate((y) => scrollTo(0, y), y0 - H * d); await p.waitForTimeout(900);
    await p.screenshot({ path: `tools/shots/r68-estudio-${motor}-${W}-${k}.jpg`, quality: 72 });
  }
  const pila = await p.evaluate(({ W, H }) => document.elementsFromPoint(W * 0.85, H * 0.93).slice(0, 8).map((e) => e.tagName + '.' + [...e.classList].join('.') + (e.dataset ? ' ' + Object.keys(e.dataset).join(',') : '')), { W, H });
  console.log(pila);
  await b.close();
})();
