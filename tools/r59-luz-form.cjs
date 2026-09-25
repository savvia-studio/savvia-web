// Ronda 59 · con la luz encendida, el formulario la tapa y la deja ver esmerilada a través del cristal
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1600), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: 900 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1000);
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(6500);
  const c = await p.evaluate(() => { const r = document.querySelector('[data-contacta]').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  await p.click('[data-punto-luz]'); await p.waitForTimeout(1500);
  await p.mouse.move(c[0], c[1], { steps: 4 }); await p.waitForTimeout(500);
  await p.screenshot({ path: `tools/shots/r59-luzform-${motor}-${W}-sube.jpg`, quality: 72 });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `tools/shots/r59-luzform-${motor}-${W}.jpg`, quality: 72 });
  const f = await p.evaluate(() => ({ k: window.__punto().k, fondo: document.querySelector('.luz-ventana.fondo').style.opacity }));
  await p.keyboard.press('Escape'); await p.mouse.move(5, 5); await p.waitForTimeout(1800);
  const g = await p.evaluate(() => ({ k: window.__punto().k, fondo: document.querySelector('.luz-ventana.fondo').style.opacity }));
  console.log(motor, W, errs.length ? errs : 'sin errores', 'abierto', JSON.stringify(f), '→ cerrado', JSON.stringify(g));
  await b.close();
})();
