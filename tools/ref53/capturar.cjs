// Ronda 53 · capturas de referencia: poetry.camera (la receta de papel) y la library de Neety (lo que se entrega al cliente)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [nombre, url, n] of [['poetry', 'https://poetry.camera/?ref=siteinspire', 14], ['neety', 'https://neety.treseiscero.app/library', 10]]) {
    const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent })).newPage();
    await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {}); await p.waitForTimeout(2500);
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    fs.writeFileSync(`tools/ref53/${nombre}.txt`, await p.evaluate(() => document.body.innerText));
    for (let k = 0; k < n; k++) {
      const y = Math.round((alto - 800) * k / (n - 1));
      await p.mouse.wheel(0, 0); await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(1300);
      await p.screenshot({ path: `tools/ref53/${nombre}-${String(k).padStart(2, '0')}.jpg`, quality: 70 });
    }
    console.log(nombre, alto);
  }
  await b.close();
})();
