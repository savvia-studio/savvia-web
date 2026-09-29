// Ronda 68 · el logotipo definitivo: barra (oscuro y claro), ticket, transición entre páginas, móvil
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(600); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(2500);
  const S = `tools/shots/r68-logo-${motor}-${W}`;
  await p.screenshot({ path: `${S}-hero.jpg`, quality: 72, clip: { x: 0, y: 0, width: W, height: 120 } });
  const y = await p.evaluate(() => document.querySelector('#servicios').getBoundingClientRect().top + scrollY + 200);
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(900);
  await p.screenshot({ path: `${S}-claro.jpg`, quality: 72, clip: { x: 0, y: 0, width: W, height: 120 } });
  const r = await p.$eval('.logo-marca', (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; });
  const yt = await p.evaluate(() => { const e = document.querySelector('.logo-t'); return e.getBoundingClientRect().top + scrollY - 200; });
  await p.evaluate((y) => scrollTo(0, y), yt); await p.waitForTimeout(3500);
  const t = await p.$eval('.logo-t', (e) => { const r = e.getBoundingClientRect(); return { x: r.left - 40, y: r.top - 20, width: r.width + 80, height: r.height + 40 }; });
  if (t.y > 0 && t.y < H - 60) await p.screenshot({ path: `${S}-ticket.jpg`, quality: 72, clip: t });
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(500);
  await p.evaluate(() => { const a = [...document.querySelectorAll('a[href="/proyectos"]')][0]; a && a.click(); }); await p.waitForTimeout(450);
  await p.screenshot({ path: `${S}-vt.jpg`, quality: 72 });
  console.log(motor, W, errs.length ? errs : 'sin errores', 'logo', r);
  await b.close();
})();
