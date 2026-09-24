const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await p.goto('https://www.shopify.com/es-es/editions/winter2026#agentic', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(6000);
  const info = await p.evaluate(() => { const el = document.getElementById('agentic'); return el ? { top: el.getBoundingClientRect().top + scrollY, h: el.offsetHeight, html: el.outerHTML.slice(0, 1500) } : null; });
  console.log(JSON.stringify(info));
  if (info) {
    for (let i = 0; i < 10; i++) { await p.evaluate((y) => scrollTo(0, y), info.top - 200 + i * 260); await p.waitForTimeout(900); await p.screenshot({ path: `tools/ref15/shop-${i}.jpg`, type: 'jpeg', quality: 70 }); }
  }
  const q = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
  await q.goto('https://www.clusia.com/about', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await q.waitForTimeout(4000);
  for (let i = 0; i < 6; i++) { await q.screenshot({ path: `tools/ref15/clusia-${i}.jpg`, type: 'jpeg', quality: 75 }); await q.waitForTimeout(700); }
  const vids = await q.evaluate(() => [...document.querySelectorAll('video, canvas, img')].slice(0, 30).map((e) => ({ t: e.tagName, src: e.currentSrc || e.src || '', w: e.clientWidth, h: e.clientHeight, y: Math.round(e.getBoundingClientRect().top) })));
  console.log(JSON.stringify(vids));
  await b.close();
})();
