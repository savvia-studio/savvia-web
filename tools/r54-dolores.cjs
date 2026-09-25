// Ronda 54 · los dolores con las demos SIN tarjeta: captura de cada parada ya resuelta. node tools/r54-dolores.cjs [motor] [ancho]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(2500);
  const sec = '#recorrido-a2';
  const [y0, h] = await p.evaluate((s) => { const e = document.querySelector(s); return [e.getBoundingClientRect().top + scrollY, e.offsetHeight]; }, sec);
  for (let y = y0 - 400; y < y0 + h; y += 120) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(60); }
  for (let k = 0; k < 4; k++) {
    const yy = await p.evaluate(([s, k]) => document.querySelectorAll(`${s} [data-parada]`)[k].getBoundingClientRect().top + scrollY, [sec, k]);
    await p.evaluate((v) => scrollTo(0, v - 60), yy); await p.waitForTimeout(4200);
    await p.screenshot({ path: `tools/shots/r54-dolor-${motor}-${W}-${k}.jpg`, quality: 72 });
  }
  const est = await p.evaluate((s) => [...document.querySelectorAll(`${s} [data-tarjeta]`)].map((t) => t.classList.contains('viva')), sec);
  console.log(motor, W, errs.length ? errs : 'sin errores', 'vivas', est);
  await b.close();
})();
