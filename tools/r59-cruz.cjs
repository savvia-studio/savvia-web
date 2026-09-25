// Ronda 59 · la × de la vista sentado NUNCA abre el menú: clic en la ×, y otra vez en el mismo sitio a 0,3 · 1,7 · 3 s; luego salir y volver → abre
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const movil = W < 600;
  const p = await (await b.newContext({ viewport: { width: W, height: movil ? 844 : 800 }, hasTouch: movil, isMobile: movil && motor !== 'webkit' ? true : undefined, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(1000);
  const abierto = () => p.evaluate(() => document.documentElement.classList.contains('menu-abierto'));
  const res = [];
  for (const ronda of [0, 1]) {
    await p.evaluate(() => { const s = document.querySelector('[data-sentarse]'); s.scrollIntoView({ block: 'center' }); });
    await p.waitForTimeout(1500);
    await p.evaluate(() => document.querySelector('[data-sentarse]').click()); await p.waitForTimeout(2200);
    const c = await p.evaluate(() => { const r = document.querySelector('[data-levantarse]').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
    const clic = async () => (movil ? p.touchscreen.tap(c[0], c[1]) : p.mouse.click(c[0], c[1]));
    await clic(); const t = [];
    for (const ms of [300, 1400, 1300]) { await p.waitForTimeout(ms); await clic(); t.push(await abierto()); }
    res.push(`sentado→× y repeticiones: ${t.join('/')}`);
    if (await abierto()) await p.keyboard.press('Escape');
    await p.waitForTimeout(800);
  }
  if (!movil) { await p.mouse.move(640, 500, { steps: 5 }); await p.waitForTimeout(200); }
  else await p.waitForTimeout(2600);
  const r = await p.evaluate(() => { const r = document.querySelector('[data-rejilla]').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  if (movil) await p.touchscreen.tap(r[0], r[1]); else await p.mouse.click(r[0], r[1]);
  await p.waitForTimeout(500);
  console.log(motor, W, errs.length ? errs : 'sin errores', res.join(' | '), '| clic de verdad en el menú abre:', await abierto());
  await b.close();
})();
