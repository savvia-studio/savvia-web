const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, URL = process.argv[4] || 'http://localhost:4321/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(URL); await p.waitForTimeout(11000);
  await p.screenshot({ path: `tools/shots/r113-reposo-${motor}-${W}${URL.includes("clara") ? "-clara" : ""}.jpg`, quality: 80 });
  await p.waitForTimeout(1400);
  await p.screenshot({ path: `tools/shots/r113-reposo-${motor}-${W}-b.jpg`, quality: 80 });
  console.log(JSON.stringify({ motor, W, errs }));
  await b.close();
})();
