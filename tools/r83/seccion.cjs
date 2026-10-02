// RONDA 83 · captura genérica de una sección: node tools/r83/seccion.cjs <selector> <nombre> [motor] [ancho] [fracción] [espera ms] [capturas] [cada ms]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [sel, nombre, motor = 'chrome', Wa = '1280', f = '0', espera = '2500', n = '1', cada = '1000'] = process.argv.slice(2);
const W = +Wa, H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse|playground/i.test(m.text()) && errs.push(m.text()));
  await p.goto(process.env.URL || 'http://localhost:4332/'); await p.waitForTimeout(2000);
  const y = await p.$eval(sel, (e, f) => e.getBoundingClientRect().top + scrollY + e.offsetHeight * f, +f);
  for (let k = 8; k >= 0; k--) { await p.evaluate((y) => scrollTo(0, y), y - k * 60); await p.waitForTimeout(50); }
  await p.waitForTimeout(+espera);
  for (let i = 0; i < +n; i++) { await p.screenshot({ path: `tools/shots/r83-${nombre}-${motor}-${W}-${i}.jpg`, quality: 72 }); if (i < +n - 1) await p.waitForTimeout(+cada); }
  console.log(JSON.stringify({ nombre, motor, W, errs, desb: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
