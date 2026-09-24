const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage();
  await p.goto('https://athleticsnyc.com/', { waitUntil: 'networkidle', timeout: 60000 }).catch(e=>console.log('goto',e.message));
  await p.waitForTimeout(1500);
  await p.evaluate(() => { const b=[...document.querySelectorAll('button')].find(x=>/Rechazar/i.test(x.textContent)); b&&b.click(); });
  await p.evaluate(() => scrollTo(0, 1672 - 120 + 300));
  await p.waitForTimeout(1500);
  await p.screenshot({ path: 'tools/ref39/base.jpg', type: 'jpeg', quality: 70 });
  const hit = await p.evaluate(() => { const e = document.elementFromPoint(400, 250); return e ? e.outerHTML.slice(0, 1500) + ' || ' + e.parentElement.outerHTML.slice(0, 2500) : null; });
  console.log(hit);
  for (const [i, y] of [[1, 250], [2, 320], [3, 390]]) {
    await p.mouse.move(400, y, { steps: 6 });
    await p.waitForTimeout(1300);
    await p.screenshot({ path: `tools/ref39/hov-${i}.jpg`, type: 'jpeg', quality: 70 });
  }
  await b.close();
})();
