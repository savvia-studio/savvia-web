// Verificación mínima: consola, respuestas >=400, desborde, fuentes. Chrome real + WebKit.
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const URL = process.argv[2] || 'http://localhost:4331/';
const VPS = [{ n: 'd', w: 1280, h: 720 }, { n: 'm', w: 390, h: 844 }];
(async () => {
  for (const [name, eng, opts] of [['chrome', chromium, launchOpts], ['webkit', webkit, { headless: true }]]) {
    const b = await eng.launch(opts);
    for (const vp of VPS) {
      const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1, ...(name === 'chrome' ? { userAgent } : {}) });
      const p = await ctx.newPage();
      const errs = [], bad = [];
      p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      p.on('pageerror', (e) => errs.push(String(e)));
      p.on('response', (r) => r.status() >= 400 && bad.push(r.status() + ' ' + r.url()));
      await p.goto(URL, { waitUntil: 'load' });
      await p.evaluate(() => document.fonts.ready);
      const info = await p.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        height: document.documentElement.scrollHeight,
        h1: getComputedStyle(document.querySelector('h1')).fontFamily.slice(0, 40),
        h1px: getComputedStyle(document.querySelector('h1')).fontSize,
        body: getComputedStyle(document.body).fontFamily.slice(0, 40),
        fonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.slice(0, 28)),
        words: document.querySelector('main').innerText.split(/\s+/).length,
      }));
      console.log(name, vp.w, JSON.stringify({ errs, bad, ...info }));
      if (name === 'chrome') await p.screenshot({ path: `tools/shots/${vp.n}_full.jpg`, fullPage: true, type: 'jpeg', quality: 70 });
      await ctx.close();
    }
    await b.close();
  }
})();
