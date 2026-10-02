// RONDA 90 · Lenis: ¿rompe algo? rueda por toda la página (con y sin Lenis), tiempos de fotograma, sentado + rueda sobre el monitor, menú abierto + rueda
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', q = process.argv[3] || '';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse|playground|neety/i.test(m.text()) && errs.push(m.text()));
  await p.goto('http://localhost:4331/?carga=0' + q); await p.waitForTimeout(2000);
  const lenis = await p.evaluate(() => !!window.__lenis && document.documentElement.classList.contains('lenis'));
  // tiempos de fotograma mientras se baja con la rueda
  await p.evaluate(() => { window.__fr = []; let u = performance.now(); const f = (t) => { window.__fr.push(t - u); u = t; requestAnimationFrame(f); }; requestAnimationFrame(f); });
  await p.mouse.move(640, 360);
  const ys = [];
  for (let i = 0; i < 70; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(60); if (i % 10 === 9) ys.push(await p.evaluate(() => Math.round(scrollY))); }
  await p.waitForTimeout(800);
  const fr = await p.evaluate(() => { const a = window.__fr.slice(5); const s = [...a].sort((x, y) => x - y); return { n: a.length, p90: +s[Math.floor(s.length * 0.9)].toFixed(1), lentos: +(a.filter((x) => x > 20).length / a.length * 100).toFixed(1) }; });
  // proyectos: sentarse y rueda sobre el monitor
  const y = await p.$eval('#proyectos', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.45);
  await p.evaluate((y) => (window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)), y); await p.waitForTimeout(1500);
  let sentado = null;
  const btn = await p.$('[data-sentarse]');
  if (btn) {
    await btn.click(); await p.waitForTimeout(2200);
    const y0 = await p.evaluate(() => scrollY); const pr = await (await p.$('[data-pantalla]')).boundingBox();
    await p.mouse.move(pr.x + pr.width / 2, pr.y + pr.height / 2); await p.mouse.wheel(0, 400); await p.waitForTimeout(700);
    sentado = { clase: await p.evaluate(() => document.documentElement.className.includes('estudio-sentado')), paginaSeMovio: (await p.evaluate(() => scrollY)) - y0, lenisParado: await p.evaluate(() => window.__lenis?.isStopped ?? null) };
    await p.keyboard.press('Escape'); await p.waitForTimeout(2000);
  }
  // menú abierto + rueda
  await p.mouse.move(640, 360);
  const yM = await p.evaluate(() => scrollY); await p.click('[data-rejilla]').catch(() => {}); await p.waitForTimeout(900);
  await p.mouse.wheel(0, 500); await p.waitForTimeout(700);
  const menu = { abierto: await p.evaluate(() => document.documentElement.classList.contains('menu-abierto')), paginaSeMovio: (await p.evaluate(() => scrollY)) - yM };
  await p.keyboard.press('Escape'); await p.waitForTimeout(800);
  // tras cerrar, la rueda vuelve a funcionar
  const y1 = await p.evaluate(() => scrollY); await p.mouse.wheel(0, 400); await p.waitForTimeout(900); const vuelve = (await p.evaluate(() => scrollY)) - y1;
  console.log(JSON.stringify({ motor, q, lenis, errs, ys, fr, sentado, menu, ruedaTrasMenu: vuelve }));
  await b.close();
})();
