const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); p.on('pageerror', (e) => console.log('ERR', String(e))); await p.goto('http://localhost:4332/'); await p.waitForTimeout(1500);
  const [top, h] = await p.$eval('[data-escena]', (e) => [e.getBoundingClientRect().top + scrollY, e.offsetHeight]);
  await p.evaluate((y) => scrollTo(0, y), top + 0.5 * (h - 720)); await p.waitForTimeout(800);
  console.log(top, h, await p.evaluate(() => { const e = document.querySelector('[data-escena]'); const r = e.getBoundingClientRect(); return [scrollY, r.top, r.height, getComputedStyle(e.querySelector('.escenario')).position, window.__partitura?.()]; }));
  await b.close(); })();
