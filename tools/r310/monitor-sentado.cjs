// comprobación: SENTADO sigue igual (clic en la escena → sentado; rueda sobre el monitor → la web, no la página; Esc → levantarse)
const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] === 'webkit' ? 'webkit' : 'chromium';
(async () => {
  const b = motor === 'webkit' ? await pw.webkit.launch() : await pw.chromium.launch(pw.launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 })).newPage();
  p.on('pageerror', (e) => console.log('ERR', e.message));
  await p.goto('http://localhost:4331/?carga=0', { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  const info = () => p.evaluate(() => { const pant = document.querySelector('[data-pantalla]'); const r = pant.getBoundingClientRect(); return { y: scrollY, sentado: document.querySelector('[data-estudio]').classList.contains('sentado'), pe: getComputedStyle(pant).pointerEvents, iframe: !!document.querySelector('[data-estudio] iframe'), pant: [Math.round(r.left + r.width / 2), Math.round(r.top + r.height / 2)], esc: document.querySelector('[data-escenario]').className }; });
  const fin = await p.evaluate(() => { const pista = document.querySelector('[data-estudio] [data-pista]'); const r = pista.getBoundingClientRect(); return r.bottom + scrollY - innerHeight; });
  for (let y = 0; y <= fin - 300; y += 400) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(100); }
  await p.evaluate((y) => window.scrollTo(0, y), fin - 200); await p.waitForTimeout(900);
  let i = await info(); await p.mouse.move(i.pant[0] - 20, i.pant[1] - 10); await p.waitForTimeout(100); await p.mouse.move(i.pant[0], i.pant[1]); await p.waitForTimeout(300);
  await p.mouse.click(i.pant[0], i.pant[1]); await p.waitForTimeout(2600);
  i = await info(); console.log(motor, 'tras el clic', JSON.stringify(i));
  await p.mouse.move(i.pant[0] - 5, i.pant[1] + 5); await p.waitForTimeout(300);
  const y0 = (await info()).y; for (let k = 0; k < 4; k++) { await p.mouse.wheel(0, 100); await p.waitForTimeout(150); } await p.waitForTimeout(400);
  const i2 = await info(); console.log(motor, 'sentado + 4 ruedas: página movida', i2.y - y0, 'px; iframe', i2.iframe, 'pe', i2.pe);
  await p.keyboard.press('Escape'); await p.waitForTimeout(2000); console.log(motor, 'tras Esc', JSON.stringify(await info()));
  await b.close();
})();
