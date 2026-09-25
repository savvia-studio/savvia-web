// Ronda 53 · el cilindro de «Más proyectos»: capturas en varios puntos del scroll + desborde. node tools/r53-cilindro.cjs [motor] [ancho]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(2500);
  const [y0, h] = await p.evaluate(() => { const s = document.getElementById('anteriores'); return [s.getBoundingClientRect().top + scrollY, s.offsetHeight]; });
  const res = [];
  for (let k = 0; k < 5; k++) {
    await p.evaluate((yy) => scrollTo(0, yy), y0 + (h - 400) * k / 4); await p.waitForTimeout(900);
    await p.screenshot({ path: `tools/shots/r53-cil-${motor}-${W}-${k}.jpg`, quality: 70 });
    res.push(await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  }
  const t = await p.evaluate(() => window.__cilindro?.().slice(0, 3));
  console.log(motor, W, errs.length ? errs : 'sin errores', 'desborde', res, t);
  await b.close();
})();
