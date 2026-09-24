const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage();
  await p.goto('https://athleticsnyc.com/', { waitUntil: 'networkidle', timeout: 60000 }).catch(e=>console.log('goto',e.message));
  await p.waitForTimeout(2500);
  // localizar la sección
  const info = await p.evaluate(() => {
    const els = [...document.querySelectorAll('h1,h2,h3,p,span,div')].filter(e => /specialt/i.test(e.textContent||'') && e.children.length < 3);
    const e = els[0]; if (!e) return null;
    e.scrollIntoView({ block: 'start' });
    const sec = e.closest('section') || e.parentElement.parentElement;
    return { tag: e.tagName, txt: e.textContent.trim().slice(0,80), y: scrollY, html: (sec?.innerText||'').slice(0, 2500) };
  });
  console.log(JSON.stringify(info, null, 1));
  for (let i = 0; i < 6; i++) {
    await p.waitForTimeout(900);
    await p.screenshot({ path: `tools/ref39/ath-${i}.jpg`, type: 'jpeg', quality: 70 });
    await p.mouse.wheel(0, 450);
  }
  await b.close();
})();
