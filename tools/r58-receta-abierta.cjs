// Ronda 58 · el ticket, una vez impreso, se queda FUERA y anclado en la página: al volver arriba no se mete ni se mueve (scroll normal), sin pisar el titular
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
  const antes = await p.evaluate(() => [document.querySelector('[data-receta]').classList.contains('abierta'), document.querySelector('[data-ticket]').getBoundingClientRect().top + scrollY]);
  const res = []; let pisa = 0, k = 0;
  for (let y = y0 + h - 300; y > y0 - 900; y -= 240) {
    await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(160);
    const r = await p.evaluate(() => { const t = document.querySelector('[data-ticket]').getBoundingClientRect(), a = document.querySelector('.arnes').getBoundingClientRect(); return [Math.round(t.top + scrollY), t.top < a.bottom && t.bottom > a.top && t.top > -99999]; });
    res.push(r[0]); if (r[1]) pisa++;
    if (k++ % 2 === 0) await p.screenshot({ path: `tools/shots/r58-abierta-${motor}-${W}-${k}.jpg`, quality: 65 });
  }
  const fijo = new Set(res).size === 1;
  console.log(motor, W, errs.length ? errs : 'sin errores', 'abierta', antes[0], 'ticket quieto en la página al subir:', fijo, res[0], '| pisa el titular:', pisa);
  await b.close();
})();
