// repro 2e: llegar a la fase D de verdad (salto que no cae en la zona muerta de entrar) y mover el ratón sobre la pantalla a medio pasar
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const path = require('path');
const URL = process.argv[2] || 'http://localhost:4331/?carga=0';
const EXTRA = +process.argv[3] || 150;
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })).newPage();
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto(URL, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const info = () => p.evaluate(() => { const pista = document.querySelector('[data-estudio] [data-pista]'); const r = pista.getBoundingClientRect(); const esc = document.querySelector('[data-escenario]'); const pant = document.querySelector('[data-pantalla]'); const pr = pant.getBoundingClientRect(); return { y: scrollY, f: +((-r.top) / (r.height - innerHeight)).toFixed(3), esc: esc.className, pantTop: Math.round(pr.top), pantH: Math.round(pr.height), pe: getComputedStyle(pant).pointerEvents, iframe: !!document.querySelector('[data-estudio] iframe'), sentado: document.querySelector('[data-estudio]').classList.contains('sentado') }; });
  const fin = await p.evaluate(() => { const pista = document.querySelector('[data-estudio] [data-pista]'); const r = pista.getBoundingClientRect(); return r.bottom + scrollY - innerHeight; });
  await p.mouse.move(640, 712);
  for (let y = 0; y <= fin - 300; y += 400) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(100); }
  await p.evaluate((y) => window.scrollTo(0, y), fin - 300); await p.waitForTimeout(400);
  await p.evaluate((y) => window.scrollTo(0, y), fin + EXTRA); await p.waitForTimeout(900);
  const i0 = await info(); console.log('a medio pasar', JSON.stringify(i0));
  const cy = i0.pantTop + i0.pantH / 2;
  await p.mouse.move(600, cy - 10); await p.waitForTimeout(80); await p.mouse.move(640, cy); await p.waitForTimeout(80); await p.mouse.move(652, cy + 6); await p.waitForTimeout(900);
  const i1 = await info(); console.log('tras mover sobre la pantalla', JSON.stringify(i1));
  await p.screenshot({ path: path.join(__dirname, `m-${EXTRA}-antes.jpg`), quality: 70 });
  for (let i = 0; i < 4; i++) { await p.mouse.wheel(0, 100); await p.waitForTimeout(150); }
  await p.waitForTimeout(500);
  const i2 = await info(); console.log('tras 4 ruedas (400 px): página movida', i2.y - i1.y, 'px', JSON.stringify(i2));
  await p.screenshot({ path: path.join(__dirname, `m-${EXTRA}-despues.jpg`), quality: 70 });
  await b.close();
})();
