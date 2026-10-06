// RONDA 118 · el director se da la vuelta con el scroll y señala hacia abajo
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/?carga=0&lenis=0'); await p.waitForTimeout(6000);
  const out = [];
  for (const [i, f] of [[0, 0], [1, 0.12], [2, 0.3], [3, 0.45], [4, 0.6], [5, 0.75]]) {
    await p.evaluate((y) => window.scrollTo(0, y), H * f); await p.waitForTimeout(500);
    out.push(await p.evaluate(() => window.__sumi?.().giro));
    await p.screenshot({ path: `tools/shots/r118g-${motor}-${W}-${i}.jpg`, quality: 65 });
  }
  console.log(JSON.stringify({ errs, out, jazz: await p.evaluate(() => window.__jazz?.()) }));
  await b.close();
})();
