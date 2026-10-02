// RONDA 83 · la carga del acorde: estado inicial → tres notas → resuelve → sube al hero → el director se dibuja desde la batuta
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, est = process.argv[4] || '';
const URL = (process.env.URL || 'http://localhost:4332/') + '?carga=1';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  if (est) await ctx.addInitScript((e) => { try { localStorage.setItem('savvia:estacion', e); } catch {} }, est);
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(URL); await p.waitForTimeout(1500);
  const S = `tools/shots/r83-carga-${motor}-${W}`;
  await p.screenshot({ path: `${S}-0.jpg`, quality: 75 });
  const cabezas = await p.$$eval('[data-notas] .cabeza', (els) => els.map((e) => { const r = e.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }));
  for (let i = 0; i < cabezas.length; i++) { await p.mouse.click(cabezas[i][0], cabezas[i][1]); await p.waitForTimeout(i === 1 ? 120 : 500); if (i === 1) await p.screenshot({ path: `${S}-1.jpg`, quality: 75 }); }
  await p.waitForTimeout(500); await p.screenshot({ path: `${S}-2.jpg`, quality: 75 });
  await p.waitForTimeout(1300); await p.screenshot({ path: `${S}-3.jpg`, quality: 75 });
  await p.waitForTimeout(1500); await p.screenshot({ path: `${S}-4.jpg`, quality: 75 });
  await p.waitForTimeout(4000); await p.screenshot({ path: `${S}-5.jpg`, quality: 75 });
  const r = await p.evaluate(() => ({ cargando: document.documentElement.classList.contains('cargando'), velo: !!document.querySelector('[data-cargador]'), heroT: document.querySelector('[data-hero]').style.transform, crecido: document.querySelector('[data-hero]').classList.contains('crecido'), desb: document.documentElement.scrollWidth - innerWidth }));
  console.log(JSON.stringify({ motor, W, cabezas: cabezas.length, errs, ...r }));
  await b.close();
})();
