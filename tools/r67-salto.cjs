// Ronda 67 · el cambio de estación del roble, fotograma a fotograma: node tools/r67-salto.cjs [de] [a]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const de = process.argv[2] || 'otono', a = process.argv[3] || 'invierno';
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto(`http://localhost:4321/?estacion=${de}`); await p.waitForTimeout(1500); await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(6000);
  await p.evaluate(async (a) => { const m = await import('/src/scripts/estacion.ts'); m.fijarEstacion(m.EST.indexOf(a), 'test'); }, a);
  for (let i = 0; i < 12; i++) { await p.waitForTimeout(260); await p.screenshot({ path: `tools/shots/r67-salto-${i}.jpg`, clip: { x: 300, y: 400, width: 680, height: 320 }, quality: 60 }); }
  await b.close();
})();
