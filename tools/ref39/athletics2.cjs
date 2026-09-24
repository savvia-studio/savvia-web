const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent });
  const p = await ctx.newPage();
  await p.goto('https://athleticsnyc.com/', { waitUntil: 'networkidle', timeout: 60000 }).catch(e=>console.log('goto',e.message));
  await p.waitForTimeout(1500);
  await p.evaluate(() => { const b=[...document.querySelectorAll('button')].find(x=>/Rechazar/i.test(x.textContent)); b&&b.click(); });
  const y = await p.evaluate(() => { const e=[...document.querySelectorAll('*')].find(e=>e.childElementCount===0 && /Our specialties/.test(e.textContent)); const r=e.getBoundingClientRect(); return r.top+scrollY; });
  console.log('y', y);
  const d = await p.evaluate((y) => { const e=[...document.querySelectorAll('*')].find(e=>e.childElementCount===0 && /Our specialties/.test(e.textContent)); let s=e; for(let i=0;i<5;i++) s=s.parentElement; return s.outerHTML.slice(0,4000); }, y);
  console.log(d);
  for (let i = 0; i < 10; i++) {
    await p.evaluate((yy) => scrollTo(0, yy), y - 120 + i * 300);
    await p.waitForTimeout(700);
    await p.screenshot({ path: `tools/ref39/sp-${i}.jpg`, type: 'jpeg', quality: 65 });
  }
  await b.close();
})();
