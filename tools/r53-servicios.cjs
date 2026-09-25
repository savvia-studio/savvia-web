// Ronda 53 · Servicios: al pasar por cada uno, su EJEMPLO REAL. Capturas a 0,6 s y 4 s. node tools/r53-servicios.cjs [motor] [url]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', url = process.argv[3] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, hasTouch: false, isMobile: false, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  await p.emulateMedia({ reducedMotion: 'no-preference' });
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(2000);
  const res = [];
  for (let i = 0; i < 3; i++) {
    const y = await p.evaluate((k) => document.querySelectorAll('#servicios [data-servicio]')[k].getBoundingClientRect().top + scrollY, i);
    await p.evaluate((yy) => scrollTo(0, yy - 250), y); await p.waitForTimeout(800);
    const bx = await p.evaluate((k) => { const r = document.querySelectorAll('#servicios [data-nombre]')[k].getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }, i);
    await p.mouse.move(bx[0] - 150, bx[1]); await p.mouse.move(bx[0], bx[1], { steps: 5 }); await p.waitForTimeout(600);
    await p.screenshot({ path: `tools/shots/r53-serv-${motor}-${i}-a.jpg`, quality: 75 });
    await p.waitForTimeout(3400);
    await p.screenshot({ path: `tools/shots/r53-serv-${motor}-${i}-b.jpg`, quality: 75 });
    res.push(await p.evaluate((k) => { const d = document.querySelectorAll('#servicios [data-demo]')[k]; return +getComputedStyle(d).opacity; }, i));
  }
  console.log(motor, errs.length ? errs : 'sin errores', 'demo visible', res);
  await b.close();
})();
