const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://www.clusia.com/about', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(3000);
  for (const y of [900, 1800, 2700, 3600, 4500, 5000]) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(1500); await p.screenshot({ path: `tools/ref15/cl-y${y}.jpg`, type: 'jpeg', quality: 70 }); }
  console.log(JSON.stringify(await p.evaluate(() => [...document.querySelectorAll('video,canvas,img')].map((e) => ({ t: e.tagName, src: (e.currentSrc || e.src || e.querySelector?.('source')?.src || '').slice(0, 140), w: e.clientWidth, h: e.clientHeight, y: Math.round(e.getBoundingClientRect().top + scrollY) })).filter((e) => e.w > 200))));
  await b.close();
})();
