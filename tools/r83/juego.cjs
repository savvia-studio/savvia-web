// RONDA 85 · la carga «guitar hero»: un jugador que pulsa cuando la nota llega a la diana; capturas del juego, el isotipo dibujándose, la caída y el hero
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4332/?carga=1'); await p.waitForTimeout(1000);
  const S = `tools/shots/r85-juego-${motor}-${W}`; let f = 0;
  await p.screenshot({ path: `${S}-${f++}.jpg`, quality: 65 });
  const t0 = Date.now(); let fallo = false;
  while (Date.now() - t0 < 20000) {
    const s = await p.evaluate(() => window.__carga?.());
    if (!s || s.aciertos >= 4) break;
    const prox = Math.min(...s.llegadas.filter((x) => x > -0.1));
    if (isFinite(prox) && Math.abs(prox) < 0.06) { await p.mouse.click(W / 2, H * 0.8); if (s.aciertos === 2 || s.aciertos === 4) await p.screenshot({ path: `${S}-${f++}.jpg`, quality: 65 }); if (!fallo && s.aciertos === 1) { fallo = true; await p.mouse.click(W / 2, H * 0.5); } await p.waitForTimeout(150); }
    else await p.waitForTimeout(15);
  }
  const tt = Date.now() - t0;
  for (let i = 0; i < 6; i++) { await p.waitForTimeout(450); await p.screenshot({ path: `${S}-${f++}.jpg`, quality: 65 }); }
  await p.waitForTimeout(3000); await p.screenshot({ path: `${S}-${f++}.jpg`, quality: 65 });
  console.log(JSON.stringify({ motor, W, errs, tiempo: tt, velo: await p.evaluate(() => !!document.querySelector('[data-cargador]')), crecido: await p.evaluate(() => document.querySelector('[data-hero]').classList.contains('crecido')) }));
  await b.close();
})();
