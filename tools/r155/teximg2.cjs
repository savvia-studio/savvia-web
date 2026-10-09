const { webkit } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await webkit.launch({ headless: true });
  for (const w of [1280, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 720 : 844 }, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => {
    for (const P of [WebGLRenderingContext.prototype, window.WebGL2RenderingContext && WebGL2RenderingContext.prototype].filter(Boolean)) {
      const o = P.texImage2D;
      P.texImage2D = function (...a) { const s = a.find((x) => x && (x.src || x.tagName)); console.log('TEX', performance.now().toFixed(0), s && (s.src || s.tagName), s && s.complete, s && (s.naturalWidth ?? s.width), s && (s.width)); return o.apply(this, a); };
    }
  });
  const p = await ctx.newPage(); p.on('console', (m) => console.log(w, m.type(), m.text().slice(0, 160)));
  await p.goto('http://localhost:4322/manifiesto?carga=0', { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2500);
  await ctx.close(); }
  await b.close();
})();
