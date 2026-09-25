// Ronda 55 · el ticket continuo que sale de la impresora con el scroll: capturas en varios puntos + estado (impreso, pasos marcados)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1500);
  const [y0, h] = await p.evaluate(() => { const s = document.getElementById('la-savvia'); return [s.getBoundingClientRect().top + scrollY, s.offsetHeight]; });
  const res = [];
  for (let k = 0; k < 6; k++) {
    await p.evaluate((yy) => scrollTo(0, yy), y0 + (h - 500) * k / 5); await p.waitForTimeout(1400);
    await p.screenshot({ path: `tools/shots/r55-receta-${motor}-${W}-${k}.jpg`, quality: 70 });
    res.push(await p.evaluate(() => window.__receta()));
  }
  const des = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(motor, W, errs.length ? errs : 'sin errores', 'desborde', des, JSON.stringify(res.map((r) => [r.impreso, r.alto, r.marcados.filter(Boolean).length])));
  await b.close();
})();
