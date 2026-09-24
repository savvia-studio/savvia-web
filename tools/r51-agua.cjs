// Ronda 51 · la tarjeta de agua: tres fotogramas de una tarjeta viva (¿ondea?) y el titular que nace del agua. node tools/r51-agua.cjs [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:4332/?s2=a2'); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(3000);
  const y = await p.evaluate(() => { const t = document.querySelectorAll('#recorrido-a2 [data-tarjeta]')[0].getBoundingClientRect(); return t.top + scrollY; });
  await p.evaluate((yy) => scrollTo(0, yy - 90), y); await p.waitForTimeout(2600);
  const clip = await p.evaluate(() => { const r = document.querySelectorAll('#recorrido-a2 [data-tarjeta]')[0].getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  const fotos = [];
  for (let k = 0; k < 3; k++) { fotos.push(await p.screenshot({ clip, type: 'png' })); require('fs').writeFileSync(`tools/shots/r51-agua-${motor}-${k}.png`, fotos[k]); await p.waitForTimeout(500); }
  // ¿cambia? (píxeles distintos entre el 1.º y el 3.º)
  const diff = await p.evaluate(async ([a, c]) => { const load = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; }); const [A, C] = await Promise.all([load(a), load(c)]); const cv = new OffscreenCanvas(A.width, A.height), g = cv.getContext('2d'); g.drawImage(A, 0, 0); const da = g.getImageData(0, 0, A.width, A.height).data; g.drawImage(C, 0, 0); const dc = g.getImageData(0, 0, A.width, A.height).data; let n = 0; for (let i = 0; i < da.length; i += 4) if (Math.abs(da[i] - dc[i]) + Math.abs(da[i + 1] - dc[i + 1]) + Math.abs(da[i + 2] - dc[i + 2]) > 12) n++; return +(100 * n / (da.length / 4)).toFixed(1); }, [fotos[0].toString('base64'), fotos[2].toString('base64')]);
  const est = await p.evaluate(() => ({ estacion: document.documentElement.dataset.estacion, contextos: document.querySelectorAll('canvas').length }));
  console.log(motor, errs.length ? errs.slice(0, 3) : 'sin errores', JSON.stringify({ tarjeta: [Math.round(clip.width), Math.round(clip.height)], cambiaEn1s: diff + ' %', ...est }));
  await b.close();
})();
