const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const tag = process.argv[2];
(async () => {
  for (const [nom, tipo] of [['chrome', chromium], ['webkit', webkit]]) {
    for (const est of ['', '?estacion=invierno']) {
      const b = await tipo.launch(nom === 'chrome' ? launchOpts : undefined);
      const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 3 });
      await ctx.addInitScript(() => localStorage.setItem('savvia:carga', '1'));
      const p = await ctx.newPage();
      await p.goto('http://localhost:4322/' + est, { waitUntil: 'load' });
      await p.waitForTimeout(5000);
      // forzar visibles: pie abierto, "escribiendo" y mensajes con cara
      await p.evaluate(() => {
        document.querySelector('footer, .pie')?.classList.add('cta-abierto');
        document.querySelectorAll('[data-escribiendo]').forEach((e) => (e.hidden = false));
      });
      const n = await p.evaluate(() => document.querySelectorAll('img[src*="cara-"]').length);
      const done = new Set(); let fallos = 0;
      for (let i = 0; i < n; i++) { try {
        const h = await p.evaluateHandle((i) => { const im = document.querySelectorAll('img[src*="cara-"]')[i]; return im.parentElement; }, i);
        const el = h.asElement();
        const key = await el.evaluate((e) => e.className + '|' + (e.closest('section,footer')?.id || e.closest('section,footer')?.className));
        if (done.has(key)) continue; done.add(key);
        await el.scrollIntoViewIfNeeded().catch(() => {});
        await p.waitForTimeout(1200);
        await el.evaluate((e) => e.querySelectorAll('img').forEach((im) => { im.style.opacity = 1; im.style.translate = '0 0'; }));
        const bb = await el.boundingBox();
        if (!bb || bb.width < 2) continue;
        const pad = 14;
        await p.screenshot({ path: `tools/shots/r133-caras-${tag}-${nom}${est ? '-inv' : ''}-${done.size}.jpg`, clip: { x: Math.max(0, bb.x - pad), y: Math.max(0, bb.y - pad), width: bb.width + pad * 2, height: bb.height + pad * 2 }, quality: 90, type: 'jpeg' });
      } catch (e) { console.log('fallo', i, String(e).slice(0,80)); await p.waitForTimeout(3000); i--; if (++fallos > 6) break; } }
      console.log(nom, est, 'avatares', n, 'grupos', done.size);
      await b.close();
    }
  }
})();
