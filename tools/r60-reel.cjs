// RONDA 60 · el reel del menú: la miniatura corre al abrir el menú; al pulsarla, el reel en grande suena; Esc lo cierra.
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const URL = process.argv[2] || 'http://localhost:4321/';
(async () => {
  for (const [nom, motor, w, h] of [['chrome', chromium, 1280, 720], ['chrome', chromium, 390, 844], ['webkit', webkit, 1280, 720]]) {
    const b = await motor.launch(nom === 'chrome' ? launchOpts : {});
    const p = await (await b.newContext({ viewport: { width: w, height: h }, userAgent: nom === 'chrome' ? userAgent : undefined })).newPage();
    const errores = []; p.on('pageerror', (e) => errores.push(e.message)); p.on('console', (m) => m.type() === 'error' && errores.push(m.text()));
    await p.goto(URL, { waitUntil: 'load' }); await p.waitForTimeout(800);
    await p.keyboard.press('Escape'); await p.waitForTimeout(1500);
    await p.click('[data-rejilla]'); await p.waitForTimeout(1600);
    const a = await p.evaluate(() => window.__reel());
    await p.screenshot({ path: `tools/shots/r60-menu-${nom}-${w}.png` });
    await p.click('[data-reel]'); await p.waitForTimeout(700);
    await p.screenshot({ path: `tools/shots/r60-reel-pinta-${nom}-${w}.png` });
    await p.waitForTimeout(1800);
    const bb = await p.evaluate(() => ({ ...window.__reel(), menu: document.documentElement.classList.contains('menu-abierto'), panel: (() => { const r = document.querySelector('[data-reel-panel]').getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; })(), ancho: document.documentElement.scrollWidth }));
    await p.screenshot({ path: `tools/shots/r60-reel-${nom}-${w}.png` });
    await p.keyboard.press('Escape'); await p.waitForTimeout(1500);
    const c = await p.evaluate(() => window.__reel());
    console.log(nom, w, 'menú', JSON.stringify(a), '→ reel', JSON.stringify(bb), '→ cerrado', JSON.stringify(c), 'errores', errores.length ? errores : 0);
    await b.close();
  }
})();
