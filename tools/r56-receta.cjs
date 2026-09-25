// Ronda 56 · el ticket enganchado a la impresora: scroll gradual, la impresora a su ritmo (objetivo vs impreso), capturas y sonido tras un clic
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1200);
  await p.mouse.click(5, 400); // un gesto: despierta el sonido
  const [y0, h] = await p.evaluate(() => { const s = document.querySelector('[data-imprenta]'); return [s.getBoundingClientRect().top + scrollY, s.offsetHeight]; });
  const res = [];
  let k = 0;
  for (let y = y0 - 600; y < y0 + h - 400; y += 90) {
    await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(160);
    if ((y - y0 + 600) % 540 < 90) { await p.screenshot({ path: `tools/shots/r56-receta-${motor}-${W}-${k++}.jpg`, quality: 68 }); res.push(await p.evaluate(() => window.__receta())); }
  }
  await p.waitForTimeout(3500);
  const fin = await p.evaluate(() => window.__receta());
  console.log(motor, W, errs.length ? errs : 'sin errores', 'desborde', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
  console.log(res.map((r) => `${r.impreso}/${r.objetivo}`).join(' · '), '| fin', fin.impreso, '/', fin.alto, 'marcados', fin.marcados.filter(Boolean).length, 'sonido', fin.sonido);
  await b.close();
})();
