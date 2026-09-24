// Ronda 51 · A con tarjetas: la tarjeta se dibuja al llegar la gota, y el titular de Proyectos se genera al final. node tools/r51A2-titular.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4332/?s2=a2'); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  const est = () => p.evaluate(() => { const d = window.__dolores['recorrido-a2'](); return { vivas: d.vivas, hecho: d.hecho, titular: d.titular, vis: getComputedStyle(document.querySelector('[data-titulo] h2')).visibility }; });
  const R = { inicio: await est() };
  // la segunda tarjeta, a medio dibujarse
  const ll = await p.evaluate(() => { const s = document.getElementById('recorrido-a2'), t = s.querySelectorAll('[data-tarjeta]')[1].getBoundingClientRect(); return t.top + scrollY; });
  await p.evaluate((y) => scrollTo(0, y - 720 * 0.62 - 30), ll); await p.waitForTimeout(700);
  await p.evaluate((y) => scrollTo(0, y - 720 * 0.62 + 10), ll); await p.waitForTimeout(450); await p.screenshot({ path: `tools/shots/r51A2-${motor}-dibuja-1.jpg`, type: 'jpeg', quality: 78 });
  await p.waitForTimeout(600); await p.screenshot({ path: `tools/shots/r51A2-${motor}-dibuja-2.jpg`, type: 'jpeg', quality: 78 });
  await p.waitForTimeout(1500); await p.screenshot({ path: `tools/shots/r51A2-${motor}-dibuja-3.jpg`, type: 'jpeg', quality: 78 });
  const fin = await p.evaluate(() => { const s = document.getElementById('recorrido-a2'); return s.getBoundingClientRect().top + scrollY + s.offsetHeight; });
  await p.evaluate((y) => scrollTo(0, y), fin - 300); await p.waitForTimeout(900); R.a = await est();
  await p.evaluate((y) => scrollTo(0, y), fin); 
  for (const [n, ms] of [['b1', 250], ['b2', 450], ['b3', 700], ['b4', 1500]]) { await p.waitForTimeout(ms === 250 ? 250 : ms - ({ b2: 250, b3: 450, b4: 700 })[n]); await p.screenshot({ path: `tools/shots/r51A2-${motor}-titular-${n}.jpg`, type: 'jpeg', quality: 75 }); }
  R.b = await est();
  await p.evaluate((y) => scrollTo(0, y), fin + 600); await p.waitForTimeout(1500); R.d = await est(); await p.screenshot({ path: `tools/shots/r51A2-${motor}-titular-d.jpg`, type: 'jpeg', quality: 75 });
  console.log(motor, errs.length ? errs : 'sin errores', JSON.stringify(R)); await b.close();
})();
