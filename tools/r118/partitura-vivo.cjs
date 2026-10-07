const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const url of process.argv.slice(2)) {
    const b = await chromium.launch(launchOpts);
    const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
    const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
    await p.goto(url + (url.includes('?') ? '&' : '?') + 'carga=0&lenis=0', { waitUntil: 'networkidle' });
    await p.waitForTimeout(7000);
    const r = await p.evaluate(() => {
      const cv = document.querySelector('[data-partitura-hero]'); if (!cv) return { cv: false };
      const cs = getComputedStyle(cv), pa = getComputedStyle(cv.parentElement);
      let px = 0; try { const c = document.createElement('canvas'); c.width = cv.width; c.height = cv.height; const x = c.getContext('2d'); x.drawImage(cv, 0, 0); const d = x.getImageData(0, 0, c.width, c.height).data; for (let i = 3; i < d.length; i += 16) if (d[i] > 10) px++; } catch (e) { px = 'err ' + e; }
      return { cv: true, w: cv.width, h: cv.height, op: cs.opacity, vis: cs.visibility, disp: cs.display, mask: cs.maskImage?.slice(0, 80) || cs.webkitMaskImage?.slice(0, 80), paOp: pa.opacity, paMask: (pa.maskImage || pa.webkitMaskImage || '').slice(0, 120), px, fase: !!window.__partituraHero, rv: getComputedStyle(cv.closest('[data-marco]') || cv.parentElement).getPropertyValue('--rv') };
    });
    console.log(url, JSON.stringify(r), errs.slice(0, 5));
    await p.screenshot({ path: `tools/shots/r119-part-${url.includes('4330') ? 'build' : url.includes('localhost') ? 'local' : 'vivo'}.jpg`, quality: 70 });
    await b.close();
  }
})();
