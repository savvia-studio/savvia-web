const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: W, height: H }, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); await p.goto('http://localhost:4332/'); await p.waitForTimeout(1200);
  const [top, h] = await p.$eval('[data-pie]', (e) => [e.getBoundingClientRect().top + scrollY, e.offsetHeight]);
  await p.evaluate((y) => scrollTo(0, y), top - H * 0.4); await p.waitForTimeout(900); await p.screenshot({ path: process.argv[2] + '-a.jpg', quality: 70 });
  await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(5500); await p.screenshot({ path: process.argv[2] + '-b.jpg', quality: 70 });
  console.log(h); await b.close();
})();
