// Ronda 54 · Servicios: al pasar, cada ejemplo real SE CONSTRUYE (cuatro fases en 10 s). Capturas de la demo en 1,2 · 3,7 · 6,2 · 8,7 s.
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', url = process.argv[3] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(2000);
  for (let i = 0; i < 3; i++) {
    const y = await p.evaluate((k) => document.querySelectorAll('#servicios [data-servicio]')[k].getBoundingClientRect().top + scrollY, i);
    await p.evaluate((yy) => scrollTo(0, yy - 250), y); await p.waitForTimeout(800);
    const bx = await p.evaluate((k) => { const r = document.querySelectorAll('#servicios [data-nombre]')[k].getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, i);
    await p.mouse.move(bx[0] - 150, bx[1]); await p.mouse.move(bx[0], bx[1], { steps: 5 });
    let t = 0;
    for (const [k, ms] of [[0, 1200], [1, 3700], [2, 6200], [3, 8700]]) {
      await p.waitForTimeout(ms - t); t = ms;
      const clip = await p.evaluate((q) => { const r = document.querySelectorAll('#servicios [data-demo]')[q].getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, i);
      await p.screenshot({ path: `tools/shots/r54-serv-${motor}-${i}-${k}.png`, clip });
    }
  }
  await p.mouse.move(5, 5); await p.waitForTimeout(400);
  const nombres = await p.evaluate(() => [...document.querySelectorAll('#servicios [data-tinta]')].map((e) => e.textContent));
  console.log(motor, errs.length ? errs : 'sin errores', nombres);
  await b.close();
})();
