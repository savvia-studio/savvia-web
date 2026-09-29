// Ronda 68 · sentado (recto + la × arriba en el centro sin abrir el menú), testimonio que se dibuja y se escribe, etiquetas por forma, CTA del pie
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse/i.test(m.text()) && errs.push(m.text()));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(600); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1500);
  const S = `tools/shots/r68-${motor}-${W}`;
  // 1-2 · sentado
  const yE = await p.evaluate(() => { const e = document.querySelector('[data-estudio]'); return e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.45; });
  await p.evaluate((y) => scrollTo(0, y), yE); await p.waitForTimeout(1800);
  await p.evaluate(() => document.querySelector('[data-sentarse]')?.click()); await p.waitForTimeout(2600);
  await p.screenshot({ path: `${S}-sentado.jpg`, quality: 72 });
  const x = await p.$eval('[data-levantarse]', (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
  await p.mouse.click(x.x, x.y);
  for (const t of [300, 700, 1200, 2500]) { await p.waitForTimeout(t === 300 ? 300 : 400); await p.mouse.click(x.x, x.y); }
  await p.waitForTimeout(1200);
  const menu = await p.evaluate(() => document.documentElement.classList.contains('menu-abierto') || !document.querySelector('[data-menu]')?.hidden);
  // 3 · testimonio
  const yV = await p.evaluate(() => { const e = document.querySelector('[data-voz]'); return e.getBoundingClientRect().top + scrollY - 120; });
  await p.evaluate((y) => scrollTo(0, y), yV); await p.waitForTimeout(900);
  await p.screenshot({ path: `${S}-voz-a.jpg`, quality: 72 });
  await p.waitForTimeout(2600); await p.screenshot({ path: `${S}-voz-b.jpg`, quality: 72 });
  await p.click('[data-voz] [data-paso="1"]'); await p.waitForTimeout(150); await p.click('[data-voz] [data-paso="1"]'); await p.waitForTimeout(900);
  await p.screenshot({ path: `${S}-voz-c.jpg`, quality: 72 });
  await p.waitForTimeout(2600); await p.screenshot({ path: `${S}-voz-d.jpg`, quality: 72 });
  const voz = await p.evaluate(() => ({ on: [...document.querySelectorAll('[data-vq]')].findIndex((q) => q.classList.contains('on')), lienzosOn: document.querySelectorAll('[data-rc].on').length }));
  // 4 · servicios
  const serv = [];
  for (const k of [0, 1, 2]) {
    const y = await p.evaluate((k) => { const e = document.querySelectorAll('[data-servicio]')[k]; return e.getBoundingClientRect().top + scrollY - innerHeight * 0.3; }, k);
    await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(1400);
    await p.screenshot({ path: `${S}-serv-${k}.jpg`, quality: 72 });
    serv.push(await p.evaluate((k) => { const li = document.querySelectorAll('[data-servicio]')[k].getBoundingClientRect(), n = document.querySelector('[data-nube-caja]').getBoundingClientRect(); return { tit: document.querySelector('[data-nube-tit]').textContent.replace(/\s+/g, ' ').trim(), dy: Math.round(n.top - li.top) }; }, k));
  }
  // 5 · CTA del pie
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(8000);
  const bb = await p.$eval('[data-contacta]', (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width * 0.2, y: r.top + r.height * 0.4 }; });
  await p.mouse.move(bb.x, bb.y); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${S}-cta.jpg`, quality: 72 });
  const ovf = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(motor, W, errs.length ? errs.slice(0, 4) : 'sin errores', { menuAbierto: menu, voz, serv, desborde: ovf });
  await b.close();
})();
