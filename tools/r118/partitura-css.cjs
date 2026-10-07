const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const url of process.argv.slice(2)) {
    const b = await chromium.launch(launchOpts);
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
    await p.goto(url + '?carga=0&lenis=0', { waitUntil: 'networkidle' }); await p.waitForTimeout(4000);
    console.log(url, JSON.stringify(await p.evaluate(() => {
      const cv = document.querySelector('[data-partitura-hero]'), at = cv.parentElement, out = {};
      for (const [k, el] of [['cv', cv], ['atril', at], ['marco', at.parentElement]]) { const s = getComputedStyle(el), r = el.getBoundingClientRect(); out[k] = { tr: s.transform.slice(0, 60), persp: s.perspective, po: s.perspectiveOrigin, ts: s.transformStyle, z: s.zIndex, pos: s.position, ov: s.overflow, r: [r.x, r.y, r.width, r.height].map(Math.round), cls: el.className.slice(0, 60) }; }
      return out;
    })));
    await b.close();
  }
})();
