// Ronda 55 · la ventana del pie: cerrada · rendija al pasar · abriéndose · abierta · cerrándose · cerrada. La luz y las hojas, con el MISMO reloj.
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 800 : 844 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1500);
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(6000);
  const r = await p.evaluate(() => { const e = document.querySelector('[data-ventana] .marco').getBoundingClientRect(); return [e.x, e.y, e.width, e.height]; });
  const zoom = { x: Math.max(0, r[0] - 40), y: Math.max(0, r[1] - 30), width: 420, height: 380 };
  const res = [];
  const foto = async (n) => { await p.screenshot({ path: `tools/shots/r55-ventana-${motor}-${W}-${n}.png`, clip: zoom }); res.push([n, (await p.evaluate(() => window.__ventana())).k]); };
  await foto('0-cerrada');
  await p.mouse.move(r[0] + r[2] / 2, r[1] + r[3] / 2); await p.waitForTimeout(800); await foto('1-rendija');
  await p.mouse.click(r[0] + r[2] / 2, r[1] + r[3] / 2); await p.waitForTimeout(550); await foto('2-abriendo');
  await p.waitForTimeout(1900); await foto("3-abierta");
  await p.screenshot({ path: `tools/shots/r55-ventana-${motor}-${W}-entera.jpg`, quality: 70 });
  await p.mouse.click(r[0] + r[2] / 2, r[1] + r[3] / 2); await p.waitForTimeout(450); await foto('4-cerrando');
  await p.mouse.move(5, 5); await p.waitForTimeout(1300); await foto('5-cerrada');
  console.log(motor, W, errs.length ? errs : 'sin errores', JSON.stringify(res));
  await b.close();
})();
