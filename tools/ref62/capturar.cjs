// RONDA 62 · referencia (focuslab.agency/work y /work/marketo): capturas a pantallazos + esqueleto de textos
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const fs = require('fs');
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const [n, url] of [['work', 'https://www.focuslab.agency/work'], ['marketo', 'https://www.focuslab.agency/work/marketo']]) {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent })).newPage();
    await p.goto(url, { waitUntil: 'load', timeout: 60000 }); await p.waitForTimeout(3000);
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0, i = 0; y < alto && i < 22; y += 900, i++) {
      await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(900);
      await p.screenshot({ path: `tools/ref62/${n}-${String(i).padStart(2, '0')}.jpg`, quality: 60 });
    }
    const esq = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,h4,p,a,button,li,figcaption,span')].filter((e) => e.children.length === 0 && e.textContent.trim() && e.getBoundingClientRect().height > 0).map((e) => `${e.tagName} ${Math.round(e.getBoundingClientRect().top + scrollY)} ${Math.round(parseFloat(getComputedStyle(e).fontSize))}px | ${e.textContent.trim().slice(0, 90)}`).join('\n'));
    fs.writeFileSync(`tools/ref62/${n}.txt`, `alto ${alto}\n` + esq);
    console.log(n, alto);
    await p.context().close();
  }
  await b.close();
})();
