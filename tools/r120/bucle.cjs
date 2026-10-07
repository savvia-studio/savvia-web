const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, B, ruta, W] of [['chrome', chromium, '/', 1280], ['webkit', webkit, '/', 1280], ['chrome', chromium, '/clara', 390]]) {
    const b = n === 'webkit' ? await B.launch() : await B.launch(launchOpts);
    const ctx = await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, userAgent: n === 'webkit' ? undefined : userAgent });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(`http://localhost:4321${ruta}?carga=0&lenis=0`, { waitUntil: 'networkidle' }); await p.waitForTimeout(8000);
    const vistos = new Set(), vm = new Set();
    for (let i = 0; i < 24; i++) { const s = await p.evaluate(() => window.__sumi()); vistos.add(s.pasoD); vm.add(s.pasoM); if (i % 6 === 0) await p.screenshot({ path: `tools/shots/r120-${n}-${W}-${ruta === '/' ? 'o' : 'c'}-${i}.jpg`, quality: 70, clip: W > 600 ? { x: 340, y: 380, width: 600, height: 340 } : undefined }); await p.waitForTimeout(120); }
    // tras bajar (giro) y volver, el bucle sigue
    await p.evaluate(() => scrollTo(0, innerHeight * 0.5)); await p.waitForTimeout(800); const g = await p.evaluate(() => window.__sumi().giro);
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(1500); const v2 = new Set(); for (let i = 0; i < 10; i++) { v2.add(await p.evaluate(() => window.__sumi().pasoD)); await p.waitForTimeout(120); }
    console.log(n, W, ruta, { bucle: (await p.evaluate(() => window.__sumi().bucle)), director: [...vistos].sort(), musicos: [...vm].sort(), giro: g, trasVolver: [...v2].sort(), errs });
    await b.close();
  }
})();
