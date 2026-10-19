// RONDA 245 · las secciones de neety ENTERAS (cada <section> a 1440 de ancho), para «mueve secciones»
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/home', { waitUntil: 'load' }); await p.waitForTimeout(3000);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(250); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500);
  const secs = await p.evaluate(() => [...document.querySelectorAll('main > section, body section')].filter((s) => s.parentElement.closest('section') === null).map((s) => { const r = s.getBoundingClientRect(); return { y: r.top + scrollY, h: r.height, t: (s.innerText || '').slice(0, 60).replace(/\s+/g, ' ') }; }).filter((s) => s.h > 300));
  console.log(JSON.stringify(secs, null, 1));
  await p.screenshot({ path: 'neety/pagina.jpg', type: 'jpeg', quality: 80, fullPage: true });
  await b.close(); })();
