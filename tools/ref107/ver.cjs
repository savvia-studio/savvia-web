const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent })).newPage();
  await p.goto('https://ascii.fm/stations', { waitUntil: 'networkidle', timeout: 45000 }).catch((e) => console.log('nav', e.message));
  await p.waitForTimeout(4000);
  for (let i = 0; i < 6; i++) { await p.screenshot({ path: `tools/ref107/s${i}.png` }); await p.waitForTimeout(250); }
  const info = await p.evaluate(() => ({ title: document.title, canv: [...document.querySelectorAll('canvas')].map((c) => [c.width, c.height]), pre: [...document.querySelectorAll('pre')].length, txt: document.body.innerText.slice(0, 1500), scripts: [...document.scripts].map((s) => s.src).filter(Boolean) }));
  console.log(JSON.stringify(info, null, 1));
  await b.close();
})();
