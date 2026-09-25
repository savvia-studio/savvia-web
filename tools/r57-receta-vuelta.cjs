// Ronda 57 · el ticket, al volver hacia arriba una vez impreso: se mete por la boca (asoma baja con el scroll), no se reimprime, nunca pisa el titular
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1200);
  const [y0, h] = await p.evaluate(() => { const s = document.querySelector('[data-imprenta]'); return [s.getBoundingClientRect().top + scrollY, s.offsetHeight]; });
  for (let y = y0 - 600; y < y0 + h; y += 90) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(150); }
  await p.waitForTimeout(3000);
  const res = [];
  let k = 0, pisa = 0;
  for (let y = y0 + h - 300; y > y0 - 900; y -= 120) {
    await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(140);
    const r = await p.evaluate(() => { const t = document.querySelector('[data-ticket]').getBoundingClientRect(), a = document.querySelector('#receta-h').getBoundingClientRect(), b = document.querySelector('.arnes').getBoundingClientRect(); const bocaY = document.querySelector('[data-impresora]').getBoundingClientRect().top; return { asoma: window.__receta().asoma, impreso: window.__receta().impreso, pisa: Math.max(0, Math.min(bocaY, b.bottom) - Math.max(t.top, a.top)) > 0 && t.top < b.bottom && bocaY > a.top }; });
    if (r.pisa) pisa++;
    res.push(r.asoma);
    if (k++ % 3 === 0) await p.screenshot({ path: `tools/shots/r57-vuelta-${motor}-${W}-${k}.jpg`, quality: 65 });
  }
  console.log(motor, W, errs.length ? errs : 'sin errores', 'asoma al subir:', res.join(' '), '| veces que pisa el titular:', pisa);
  await b.close();
})();
