const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4332/'); await p.waitForTimeout(1500);
  const y = await p.$eval('[data-preguntas]', (e) => e.getBoundingClientRect().top + scrollY + 60); await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(1500);
  await p.click('[data-q]'); await p.waitForTimeout(900);
  const esc = await p.$('[data-escribiendo]'); await esc.screenshot({ path: 'tools/shots/r83-faq-escribiendo.png' });
  console.log(JSON.stringify({ errs }));
  await b.close();
})();
