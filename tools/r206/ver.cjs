// RONDA 206 · los gestos nuevos (60 fotogramas), fotograma a fotograma sobre la foto (sonda window.__gesto) → hoja. node tools/r206/ver.cjs <salida.jpg> [motor] [ancho]
const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs'), sharp = require('sharp');
(async () => {
  const [out, motor = 'chromium', W = '1280'] = process.argv.slice(2);
  const b = await pw[motor].launch(motor === 'chromium' ? pw.launchOpts : { headless: true });
  const ctx = await b.newContext({ viewport: { width: +W, height: 900 }, deviceScaleFactor: 2 });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4332/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(1000);
  const j = p.locator('.juntos').first(); await j.scrollIntoViewIfNeeded(); await p.waitForTimeout(2500);
  const tiles = [];
  for (const i of [0, 1]) for (const f of [0, 10, 20, 30, 40, 50]) {
    await p.evaluate(([i, f]) => window.__gesto(i, f), [i, f]); await p.waitForTimeout(500);
    tiles.push(await j.screenshot({ type: 'png' }));
  }
  const m = await sharp(tiles[0]).metadata(), tw = Math.round(m.width / 2), th = Math.round(m.height / 2);
  const comp = await Promise.all(tiles.map(async (t, k) => ({ input: await sharp(t).resize(tw, th).toBuffer(), left: (k % 6) * tw, top: Math.floor(k / 6) * th })));
  await sharp({ create: { width: tw * 6, height: th * 2, channels: 3, background: '#3b231b' } }).composite(comp).jpeg({ quality: 75 }).toFile(out);
  console.log(motor, W, 'errores:', errs.length ? errs.join(' | ') : 0);
  await b.close();
})();
