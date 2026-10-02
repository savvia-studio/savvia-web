// RONDA 92 · la paleta clara: la carga (mástil, notas, isotipo) y el hero pop
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', q = process.argv[3] ?? '&paleta=clara';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4331/?carga=1' + q); await p.waitForTimeout(2200);
  await p.screenshot({ path: `tools/shots/r92-carga-${motor}${q ? '-clara' : ''}-0.jpg`, quality: 65 });
  const t0 = Date.now(); let n = 0;
  while (Date.now() - t0 < 15000) { const s = await p.evaluate(() => window.__carga?.()); if (!s || s.aciertos >= 4) break; const prox = Math.min(...s.llegadas.filter((x) => x > -0.1)); if (isFinite(prox) && Math.abs(prox) < 0.06) { await p.mouse.click(640, 576); if (++n === 2) await p.screenshot({ path: `tools/shots/r92-carga-${motor}${q ? '-clara' : ''}-1.jpg`, quality: 65 }); await p.waitForTimeout(150); } else await p.waitForTimeout(15); }
  await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/r92-carga-${motor}${q ? '-clara' : ''}-2.jpg`, quality: 65 });
  await p.waitForTimeout(6000); await p.screenshot({ path: `tools/shots/r92-carga-${motor}${q ? '-clara' : ''}-3.jpg`, quality: 70 });
  console.log(JSON.stringify({ motor, q, errs }));
  await b.close();
})();
