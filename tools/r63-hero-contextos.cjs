// RONDA 63 · «al hacer scroll hasta abajo y volver arriba, las imágenes del hero salen en blanco»: ¿contextos WebGL perdidos?
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  for (const [nom, motor] of [['chrome', chromium], ['webkit', webkit]]) {
    const b = await motor.launch(nom === 'chrome' ? launchOpts : {});
    const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: nom === 'chrome' ? userAgent : undefined });
    await ctx.addInitScript(() => {
      window.__gl = { creados: 0, perdidos: [], vivos: 0 };
      const orig = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (t, o) {
        const c = orig.call(this, t, o);
        if (c && /webgl/.test(t) && !this.__contado) {
          this.__contado = true; window.__gl.creados++; window.__gl.vivos++;
          const quien = () => (this.closest('[data-hero]') ? 'HERO' : this.closest('#raices, [data-raices]') ? 'raices' : (this.closest('section, footer')?.id || this.parentElement?.className || '?'));
          this.addEventListener('webglcontextlost', () => { window.__gl.perdidos.push(quien()); window.__gl.vivos--; }); this.addEventListener('webglcontextrestored', () => { (window.__gl.vuelven ||= []).push(quien()); window.__gl.vivos++; }); (window.__lienzos ||= []).push([this, c]);
        }
        return c;
      };
    });
    const p = await ctx.newPage();
    await p.goto('http://localhost:4321/', { waitUntil: 'load' }); await p.waitForTimeout(700); await p.keyboard.press('Escape'); await p.waitForTimeout(3500);
    await p.screenshot({ path: `tools/shots/r63-hero-antes-${nom}.jpg`, quality: 60 });
    const alto = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= alto; y += 500) { await p.mouse.wheel(0, 500); await p.waitForTimeout(160); }
    await p.waitForTimeout(3000);
    const abajo = await p.evaluate(() => JSON.parse(JSON.stringify(window.__gl)));
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(2500);
    await p.screenshot({ path: `tools/shots/r63-hero-despues-${nom}.jpg`, quality: 60 });
    const hero = await p.evaluate(() => window.__lienzos.filter(([cv]) => cv.closest('[data-hero]') || cv.closest('#raices, [data-raices]')).map(([cv, c]) => ({ perdido: c.isContextLost(), listo: cv.classList.contains('listo'), w: cv.width })));
    // píxeles pintados en el árbol del hero (alfa > 0)
    console.log(nom, 'hero y raíces al volver:', JSON.stringify(hero));
    console.log(nom, 'abajo', JSON.stringify(abajo), '· arriba', JSON.stringify(await p.evaluate(() => window.__gl)));
    await b.close();
  }
})();
