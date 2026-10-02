const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const casos = [['chrome', 1280, 720], ['chrome', 390, 844], ['webkit', 1280, 720]];
(async () => {
  for (const [motor, W, H] of casos) {
    const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
    const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto('http://localhost:4331/?carga=0'); await p.waitForTimeout(1500);
    const top = await p.evaluate(() => document.querySelector('#servicios').getBoundingClientRect().top + scrollY);
    await p.evaluate((y) => scrollTo(0, y - 60), top); await p.waitForTimeout(600);
    await p.screenshot({ path: `tools/shots/r90-servicios-${motor}-${W}-a.jpg`, quality: 70 });
    await p.waitForTimeout(4500);
    await p.screenshot({ path: `tools/shots/r90-servicios-${motor}-${W}-b.jpg`, quality: 70 });
    await p.evaluate(() => scrollBy(0, innerHeight * 0.75)); await p.waitForTimeout(2800);
    await p.screenshot({ path: `tools/shots/r90-servicios-${motor}-${W}-c.jpg`, quality: 70 });
    const r = await p.evaluate(() => ({ ya: document.querySelector('[data-sub]').classList.contains('ya'), dibujados: [...document.querySelectorAll('.instrumento.dibuja')].length, desborde: document.documentElement.scrollWidth - innerWidth }));
    console.log(motor, W, JSON.stringify({ errs, ...r }));
    await b.close();
  }
})();
