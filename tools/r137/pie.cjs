const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const br = await chromium.launch(launchOpts);
  const ctx = await br.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const page = await ctx.newPage(); const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' }); await wait(1500);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await wait(4500);
  const el = page.locator('[data-contacta-txt]').first(); const b = await el.boundingBox();
  await page.mouse.move(b.x + b.width * 0.4, b.y + b.height / 2); await wait(2200);
  await page.screenshot({ path: '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r137-cta-pie.jpg', quality: 88 });
  console.log(errs); await br.close();
})();
