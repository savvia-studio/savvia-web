// RONDA 114 · la pincelada suena: el roble pintándose, en momentos fijos tras la carga (Chrome o WebKit)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4321/?roble=2026';
const MOM = (process.argv[5] || '1,3,6,10,18,28,45').split(',').map(Number);
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(URL);
  await p.waitForFunction(() => window.__gotaSuelta === true, null, { timeout: 15000 });
  const t0 = Date.now(), tag = `${motor}-${W}`, est = [];
  for (const s of MOM) { const falta = s * 1000 - (Date.now() - t0); if (falta > 0) await p.waitForTimeout(falta); await p.screenshot({ path: `tools/shots/r114-${tag}-${String(s).padStart(2, '0')}s.jpg`, quality: 72 }); est.push([s, await p.evaluate(() => window.__tinta?.())]); }
  console.log(JSON.stringify({ tag, errs, est: est.map(([s, e]) => [s, e && e.dadas, e && e.firmado, e && e.gl]), desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
