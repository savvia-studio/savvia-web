// Ronda 67 · la receta impresa: hueco entre el titular y el ticket, y captura. node tools/r67-receta.cjs [motor] [ancho]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1200);
  const y0 = await p.evaluate(() => document.querySelector('#la-savvia').getBoundingClientRect().top + scrollY);
  for (let y = y0 - 300; y < y0 + 3400; y += 50) { await p.evaluate((v) => scrollTo(0, v), y); await p.waitForTimeout(70); }
  await p.waitForTimeout(3000);
  const r = await p.evaluate(() => { const h = document.querySelector('#receta-h').getBoundingClientRect(), t = document.querySelector('[data-ticket]').getBoundingClientRect(); return { hueco: Math.round(t.top - h.bottom), abierta: document.querySelector('[data-receta]').classList.contains('abierta'), hTop: Math.round(h.top + scrollY) }; });
  await p.evaluate((v) => scrollTo(0, v), r.hTop - 80); await p.waitForTimeout(600);
  await p.screenshot({ path: `tools/shots/r67-receta-${motor}-${W}.jpg`, quality: 70 });
  console.log(motor, W, errs.length ? errs : 'sin errores', JSON.stringify(r));
  await b.close();
})();
