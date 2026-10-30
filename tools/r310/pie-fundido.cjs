// comprobación limpia: en el pie, verano crecido → clic a otoño: ¿se funde la hierba (bajada gradual) o se corta?
const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] === 'webkit' ? 'webkit' : 'chromium';
(async () => {
  const b = motor === 'webkit' ? await pw.webkit.launch() : await pw.chromium.launch(pw.launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })).newPage();
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto('http://localhost:4331/?carga=0', { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  // alfa media de la hierba: cuenta de verdes con alfa > 40 y alfa media de esos píxeles
  const medir = () => p.evaluate(() => { const cv = document.querySelector('[data-tiempo-lienzo]'); const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; let n = 0, a = 0; for (let i = 0; i < d.length; i += 16) if (d[i + 3] > 10 && d[i + 1] > d[i] + 15 && d[i + 1] > d[i + 2] + 15) { n++; a += d[i + 3]; } const z = document.querySelector('[data-tiempo]').getBoundingClientRect(); return `${n}@${n ? Math.round(a / n) : 0}(z ${Math.round(z.top)}..${Math.round(z.bottom)}/${innerHeight})`; });
  const clics = async (n, gap = 500) => { for (let i = 0; i < n; i++) { await p.click('[data-estacion-ic]'); await p.waitForTimeout(gap); } };
  await clics(3); await p.waitForTimeout(600); await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForFunction(() => document.querySelector('.paisaje')?.classList.contains('pintado'), null, { timeout: 25000 }); await p.waitForTimeout(12000);
  console.log(motor, 'crecida', await medir());
  await p.click('[data-estacion-ic]'); const t0 = Date.now(); const s = [];
  for (let i = 0; i < 14; i++) { await p.waitForTimeout(80); s.push(`${((Date.now() - t0) / 1000).toFixed(2)}:${await medir()}`); }
  console.log(motor, 'verano→otoño', s.join(' '));
  await b.close();
})();
