// RONDA 118 · la segunda sección de savvia.studio en la musical: la onda llega a cada problema y sus tres líneas entran a compás
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4321/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e.stack || e).slice(0, 400))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(URL); await p.waitForTimeout(900);
  await p.keyboard.press('Enter'); await p.waitForTimeout(600); await p.mouse.click(W * 0.95, H * 0.2); await p.waitForTimeout(6500);
  await p.screenshot({ path: `tools/shots/r118e-${motor}-${W}-0.jpg`, quality: 70 });
  const top = await p.evaluate(() => document.querySelector('[data-dolores]').getBoundingClientRect().top + scrollY);
  const alto = await p.evaluate(() => document.querySelector('[data-dolores]').offsetHeight);
  const out = [];
  for (let i = 1; i <= 8; i++) {
    const y = top - H * 0.6 + (alto * i) / 8; await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(1300);
    const st = await p.evaluate(() => [...document.querySelectorAll('[data-parada]')].map((li) => li.className.replace('parada', '').trim()));
    out.push(st); if (i % 2 === 0) await p.screenshot({ path: `tools/shots/r118e-${motor}-${W}-${i}.jpg`, quality: 70 });
  }
  console.log(JSON.stringify({ errs, out: out.at(-1), sonda: await p.evaluate(() => { const d = window.__dolores || {}; return Object.fromEntries(Object.entries(d).map(([k, f]) => [k, f()])); }), y: await p.evaluate(() => scrollY), des: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
