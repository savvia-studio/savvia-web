const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [n, B, ruta, W] of [['chrome', chromium, '/', 1280], ['webkit', webkit, '/', 1280], ['chrome', chromium, '/clara', 390]]) {
    const b = n === 'webkit' ? await B.launch() : await B.launch(launchOpts);
    const p = await (await b.newContext({ viewport: { width: W, height: W > 600 ? 720 : 844 }, userAgent: n === 'webkit' ? undefined : userAgent })).newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
    await p.goto(`${process.env.BASE_URL || 'http://localhost:4321'}${ruta}?carga=0&lenis=0&entreacto=4`, { waitUntil: 'networkidle' });
    await p.waitForTimeout(2500); const antes = await p.evaluate(() => window.__entreacto.estado());
    await p.waitForTimeout(3500); const abierto = await p.evaluate(() => window.__entreacto.estado());
    await p.waitForTimeout(1800); await p.screenshot({ path: `tools/shots/r124-${n}-${W}${ruta === '/' ? '' : '-clara'}.jpg`, quality: 75 });
    const px = await p.evaluate(() => { const cv = document.querySelector('[data-entreacto-partitura]'); const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; const x = c.getContext('2d'); x.drawImage(cv, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; let k = 0; for (let i = 3; i < d.length; i += 16) if (d[i] > 10) k++; return k; });
    await p.mouse.move(100, 100); await p.mouse.move(400, 300); await p.waitForTimeout(300); const tras = await p.evaluate(() => window.__entreacto.estado());
    await p.waitForTimeout(1700); const oculto = await p.evaluate(() => document.querySelector('[data-entreacto]').hidden);
    console.log(n, W, ruta, { antes, abierto, pintaPx: px, trasMover: tras, ocultoDespues: oculto, errs });
    await b.close();
  }
})();
