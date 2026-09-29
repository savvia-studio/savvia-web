// Ronda 65 · capturas por sección: node tools/r65b.cjs [motor] [ancho] [selector] [nombre] [pasos]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), sel = process.argv[4] || '#anteriores', nom = process.argv[5] || 'mas', N = +(process.argv[6] || 6);
const H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1200); await p.keyboard.press('Escape'); await p.waitForTimeout(1500);
  const [y0, h] = await p.evaluate((s) => { const e = document.querySelector(s); return [e.getBoundingClientRect().top + scrollY, e.offsetHeight]; }, sel);
  for (let y = Math.max(0, y0 - 800); y < y0; y += 200) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(40); }
  for (let k = 0; k < N; k++) {
    await p.evaluate((yy) => scrollTo(0, yy), y0 + (k * (h - H * 0.5)) / Math.max(1, N - 1) - 40);
    await p.waitForTimeout(+(process.env.ESPERA || 1600));
    await p.screenshot({ path: `tools/shots/r65-${nom}-${motor}-${W}-${k}.jpg`, quality: 70 });
  }
  const ovf = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(motor, W, sel, errs.length ? errs.slice(0, 4) : 'sin errores', 'desborde', ovf, 'alto', h);
  await b.close();
})();
