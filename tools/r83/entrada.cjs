// RONDA 83 · la entrada de concierto: imprimir entera con el scroll y fotografiar el papel completo
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(process.env.URL || 'http://localhost:4332/'); await p.waitForTimeout(2000);
  const [top, h] = await p.$eval('#la-savvia', (e) => [e.getBoundingClientRect().top + scrollY, e.offsetHeight]);
  for (let y = top - H; y < top + h * 0.8; y += 40) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(30); }
  await p.waitForTimeout(9000);
  const t = await p.$('[data-ticket]'); await t.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  await t.screenshot({ path: `tools/shots/r83-entrada-${motor}-${W}.png` });
  console.log(JSON.stringify({ motor, W, errs, bricolage: await p.evaluate(() => document.fonts.check('800 20px "Bricolage Grotesque"')) }));
  await b.close();
})();
