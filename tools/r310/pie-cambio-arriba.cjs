// repro 1g: pie visto en VERANO (hierba crecida) → subir → cambiar de estación arriba → bajar: ¿aparece la hierba crecida y desaparece de golpe?
const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const path = require('path');
const URL = process.argv[2] || 'http://localhost:4331/?carga=0';
const motor = process.argv[3] === 'webkit' ? 'webkit' : 'chromium';
(async () => {
  const b = motor === 'webkit' ? await pw.webkit.launch() : await pw.chromium.launch(pw.launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto(URL, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const medir = () => p.evaluate(() => {
    const cv = document.querySelector('[data-tiempo-lienzo]'); const c = cv.getContext('2d'); const d = c.getImageData(0, 0, cv.width, cv.height).data; let n = 0, tinta = 0;
    for (let i = 0; i < d.length; i += 32) { if (d[i + 3] > 40) { tinta++; if (d[i + 1] > d[i] + 15 && d[i + 1] > d[i + 2] + 15) n++; } }
    return { verde: n, tinta };
  });
  const bajar = async () => { for (let y = 0; y < 30000; y += 600) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(40); } await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); };
  const clics = async (n, gap = 500) => { for (let i = 0; i < n; i++) { await p.click('[data-estacion-ic]'); await p.waitForTimeout(gap); } };
  // a verano arriba, bajar, dejar crecer
  await clics(3); await p.waitForTimeout(800); await bajar();
  await p.waitForFunction(() => document.querySelector('.paisaje')?.classList.contains('pintado'), null, { timeout: 25000 }); await p.waitForTimeout(12000);
  console.log('verano crecido', JSON.stringify(await medir()));
  // subir, cambiar a otoño, bajar
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500); await clics(1); await p.waitForTimeout(800); await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const t0 = Date.now(); const s = [];
  for (let i = 0; i < 30; i++) { await p.waitForTimeout(50); const m = await medir(); s.push(`${((Date.now() - t0) / 1000).toFixed(2)}:${m.verde}/${m.tinta}`); if (i === 1 || i === 5 || i === 12) await p.screenshot({ path: path.join(__dirname, `n-${motor}-${i}.jpg`), quality: 60 }); }
  console.log(motor, 'al bajar en otoño (verde/tinta)', s.join(' '));
  await b.close();
})();
