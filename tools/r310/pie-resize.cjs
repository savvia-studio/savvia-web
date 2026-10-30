// comprobación: en el pie, verano → otoño se FUNDE (no se corta); un cambio de ancho conserva la hierba; arriba → verano y bajar: empieza desde cero
const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] === 'webkit' ? 'webkit' : 'chromium';
(async () => {
  const b = motor === 'webkit' ? await pw.webkit.launch() : await pw.chromium.launch(pw.launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto('http://localhost:4331/?carga=0', { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const medir = () => p.evaluate(() => { const cv = document.querySelector('[data-tiempo-lienzo]'); const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data; let n = 0; for (let i = 0; i < d.length; i += 32) if (d[i + 3] > 40 && d[i + 1] > d[i] + 15 && d[i + 1] > d[i + 2] + 15) n++; return n; });
  const serie = async (nombre, seg, paso = 150) => { const t0 = Date.now(); const s = []; while (Date.now() - t0 < seg * 1000) { await p.waitForTimeout(paso); s.push(await medir()); } console.log(motor, nombre, s.join(' ')); };
  const clics = async (n, gap = 500) => { for (let i = 0; i < n; i++) { await p.click('[data-estacion-ic]'); await p.waitForTimeout(gap); } };
  const abajo = () => p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // (1) arriba → verano; bajar: empieza desde cero
  await clics(3); await p.waitForTimeout(600); await abajo(); await serie('1 arriba→verano, bajar (0,15 s)', 3, 150);
  await p.waitForTimeout(10000); console.log(motor, 'crecida', await medir());
  // (2) cambio de ancho en verano: la hierba sigue (no vuelve a cero)
  await p.setViewportSize({ width: 1380, height: 900 }); await serie('2 ancho 1440→1380', 2.5, 250);
  // (3) verano → otoño a la vista: se funde (bajada gradual, no corte)
  await clics(1, 0); await serie('3 verano→otoño a la vista', 1.6, 100);
  await b.close();
})();
