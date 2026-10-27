const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', slug = process.argv[3] || 'neety';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    p.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
    await p.goto(`http://localhost:4332/proyectos/${slug}/`); await p.waitForTimeout(1800); const libro = await p.evaluate(() => !!document.querySelector('[data-libro]'));
    const n = `tools/r307-casos/${motor}-${w}`;
    await p.screenshot({ path: n + '-0.png' });
    await p.evaluate(() => scrollTo(0, 2600)); await p.waitForTimeout(900); await p.screenshot({ path: n + '-1.png' });
    const lado = await p.evaluate(() => { const r = document.querySelector('.lado')?.getBoundingClientRect(); return r && Math.round(r.top); });
    await p.click('[data-foco]'); await p.waitForTimeout(800); await p.screenshot({ path: n + '-foco.png' });
    const f = await p.evaluate(() => window.__foco());
    await p.mouse.move(w / 2, h / 2); await p.mouse.wheel(0, 900); await p.waitForTimeout(600); const f2 = await p.evaluate(() => [window.__foco().scroll, scrollY]);
    await p.keyboard.press('Escape'); await p.waitForTimeout(600); const out = await p.evaluate(() => [scrollY, document.documentElement.classList.contains('caso-foco')]);
    await p.screenshot({ path: n + '-salir.png' });
    const desb = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(motor, w, { ladoTop: lado, foco: f, ruedaDentro: f2, salir: out, desborde: desb, errs });
    await p.close();
  }
  await b.close();
})();
