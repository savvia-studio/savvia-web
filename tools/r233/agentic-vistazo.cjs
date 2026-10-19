const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
(async () => {
  const b = await chromium.launch(launchOpts); const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  await p.goto('http://localhost:4332/?carga=0&grabando=1', { waitUntil: 'load' });
  const cine = p.locator('[data-partitura] [data-cine]').first();
  await cine.scrollIntoViewIfNeeded(); await p.waitForTimeout(3500);
  const LOOP = await p.evaluate(() => window.__partitura.LOOP);
  console.log('LOOP', LOOP, 'caja', JSON.stringify(await cine.boundingBox()));
  const fr = [];
  for (let k = 0; k < 16; k++) { await p.evaluate((t) => window.__partitura.ir(t), (k / 16) * LOOP); await p.waitForTimeout(80); fr.push(await cine.screenshot({ type: 'jpeg', quality: 70 })); }
  const m = await sharp(fr[0]).metadata(); const w = 480, h = Math.round(m.height * 480 / m.width);
  const t = await Promise.all(fr.map((f) => sharp(f).resize(w, h).toBuffer()));
  await sharp({ create: { width: w * 4, height: h * 4, channels: 3, background: '#000' } }).composite(t.map((x, i) => ({ input: x, left: (i % 4) * w, top: Math.floor(i / 4) * h }))).jpeg().toFile('tools/r233/agentic-hoja.jpg');
  await b.close();
})();
