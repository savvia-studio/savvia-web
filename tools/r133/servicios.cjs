const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/r133-servicios-';
const URL = process.argv[2] || 'http://localhost:4322/';
(async () => {
  for (const [nombre, tipo, vp] of [['chrome', chromium, { width: 1280, height: 800 }], ['webkit', webkit, { width: 1280, height: 800 }], ['movil', chromium, { width: 390, height: 844 }]]) {
    const b = tipo === webkit ? await webkit.launch() : await chromium.launch(launchOpts);
    const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, userAgent: tipo === webkit ? undefined : userAgent });
    await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e)));
    p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(URL, { waitUntil: 'load' });
    await p.waitForTimeout(1500);
    const sec = p.locator('#servicios');
    await p.evaluate(() => { const s = document.querySelector('[data-serv]'); scrollTo(0, s.getBoundingClientRect().top + scrollY - 140); });
    const n0 = await p.evaluate(() => document.querySelectorAll('#servicios li.on').length);
    // medio recorrido inicial
    await p.waitForTimeout(900);
    const pick = async (f) => { const card = p.locator('[data-tarjeta-serv]'); await card.screenshot({ path: OUT + f }).catch(() => {}); };
    if (nombre !== 'webkit') await p.screenshot({ path: OUT + nombre + '-run1.jpg', quality: 80 });
    await p.waitForTimeout(800);
    if (nombre === 'chrome') await p.screenshot({ path: OUT + nombre + '-run2.jpg', quality: 80 });
    await p.waitForTimeout(4500);
    const fin = [];
    for (let k = 0; k < 3; k++) {
      await p.locator(`[data-opcion="${k}"]`).click();
      await p.waitForTimeout(k === 0 ? 400 : 4200);
      const on = await p.evaluate(() => document.querySelectorAll('#servicios li.on').length);
      fin.push(on);
      await p.screenshot({ path: OUT + nombre + `-forma${k + 1}.jpg`, quality: 80 });
    }
    // cambio a mitad: 1 -> 0 -> 2 rápido
    await p.locator('[data-opcion="0"]').click(); await p.waitForTimeout(500);
    if (nombre === 'chrome') await p.screenshot({ path: OUT + nombre + '-mitad.jpg', quality: 80 });
    await p.locator('[data-opcion="2"]').click(); await p.waitForTimeout(4500);
    const tras = await p.evaluate(() => [...document.querySelectorAll('#servicios li[data-quien]')].every((li) => li.classList.contains('on') === li.dataset.quien.split(' ').includes('2')));
    // teclado
    await p.locator('[data-opcion="2"]').focus(); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(200);
    const tecla = await p.evaluate(() => window.__servicios.activa());
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(nombre, { n0, fin, tras, tecla, ov, errs });
    await b.close();
  }
})();
