// RONDA 118 · las notas salen de la partitura y forman las líneas del problema
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(2500);
  const y = await p.evaluate(() => { const li = document.querySelector('[data-parada="1"]'); const t = li.querySelector('[data-tarjeta]') || li; return t.getBoundingClientRect().top + scrollY - innerHeight * 0.55; });
  await p.evaluate((y) => window.scrollTo(0, y), y);
  for (let i = 0; i < 14; i++) { await p.waitForTimeout(160); await p.screenshot({ path: `tools/shots/r118v-${String(i).padStart(2, '0')}.jpg`, quality: 60 }); }
  console.log(JSON.stringify({ errs, cls: await p.evaluate(() => document.querySelector('[data-parada="1"]').className) }));
  await b.close();
})();
