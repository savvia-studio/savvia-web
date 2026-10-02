// RONDA 95 · Servicios: el selector de casos (sustituye a las entradas) y la cabecera de la tabla que se recoge atada al scroll
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const casos = [['chrome', 1280, 720, ''], ['chrome', 390, 844, ''], ['webkit', 1280, 720, ''], ['webkit', 390, 844, ''], ['chrome', 1280, 720, 'clara'], ['webkit', 390, 844, 'clara']];
const S = 'tools/shots/r95-servicios';
(async () => {
  for (const [motor, W, H, pal] of casos) {
    const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
    const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    const tag = `${motor}-${W}${pal ? '-' + pal : ''}`;
    // el servidor de desarrollo recarga la página si otros archivos cambian mientras tanto: se reintenta
    const abrir = async () => { for (let k = 0; k < 6; k++) { try { await p.goto(`http://localhost:4331/?carga=0&lenis=0${pal ? '&paleta=' + pal : ''}`); await p.waitForTimeout(1500); if (await p.evaluate(() => !!document.querySelector('[data-sub]'))) return; } catch {} await p.waitForTimeout(1500); } };
    await abrir();
    // 1 · el selector: varios momentos (en reposo y a media rueda)
    await p.evaluate(() => document.querySelector('[data-sub]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(600);
    const clipSub = async () => { const r = await p.evaluate(() => { const r = document.querySelector('[data-sub]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }); return { x: Math.max(0, r.x - 12), y: Math.max(0, r.y - 16), width: Math.min(W - Math.max(0, r.x - 12), r.w + 24), height: r.h + 32 }; };
    const sel = [];
    for (let k = 0; k < 4; k++) {
      await p.screenshot({ path: `${S}-${tag}-sel-${k}a.png`, clip: await clipSub() });
      // justo después del cambio (a media rueda): esperar al siguiente cambio y capturar a 180 ms
      await p.waitForFunction((t) => document.querySelector('[data-selector]').getAttribute('aria-label') !== t, await p.evaluate(() => document.querySelector('[data-selector]').getAttribute('aria-label')), { timeout: 6000 });
      await p.waitForTimeout(180);
      await p.screenshot({ path: `${S}-${tag}-sel-${k}b.png`, clip: await clipSub() });
      sel.push(await p.evaluate(() => { const s = document.querySelector('[data-selector]'), r = s.getBoundingClientRect(); return { label: s.getAttribute('aria-label'), ancho: Math.round(r.width), fuera: Math.round(Math.max(0, r.right - innerWidth)) }; }));
    }
    // clic: avanza y se anuncia
    await p.click('[data-selector]'); await p.waitForTimeout(400);
    const anuncio = await p.evaluate(() => document.querySelector('[data-anuncio]').textContent);
    // 2 · la cabecera (solo escritorio): scroll en pasos de 8 px alrededor del pegado
    let cab = null;
    if (W >= 1024) {
      const y0 = await p.evaluate(() => { const c = document.querySelector('[data-centinela]'); return c.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(document.querySelector('[data-cabeza]')).top); });
      const pasos = [];
      const medir = () => p.evaluate(() => {
        const c = document.querySelector('[data-cabeza]'), d = c.querySelector('.d'), ic = c.querySelector('.instrumento'), n = c.querySelector('.nombre');
        const filas = document.querySelector('[data-fila]');
        return { p: +getComputedStyle(c).getPropertyValue('--p'), visible: c.getBoundingClientRect().height - (parseFloat(getComputedStyle(c).getPropertyValue('--cierre')) || 0) * (+getComputedStyle(c).getPropertyValue('--p')), op: +getComputedStyle(d).opacity, ic: ic.getBoundingClientRect().height, nTop: n.getBoundingClientRect().top, flujo: c.offsetHeight, fila: filas.getBoundingClientRect().top + scrollY };
      });
      for (let y = y0 - 40, k = 0; y <= y0 + 240; y += 8, k++) {
        await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(40);
        const m = await medir(); pasos.push(m);
        if (k % 7 === 0) await p.screenshot({ path: `${S}-${tag}-cab-${String(k).padStart(2, '0')}.png`, clip: { x: 0, y: 0, width: W, height: 420 } });
      }
      // y de vuelta (no parpadea: debe deshacer lo mismo)
      const vuelta = [];
      for (let y = y0 + 240; y >= y0 - 40; y -= 8) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(40); vuelta.push(await medir()); }
      const salto = (arr, f) => Math.max(...arr.slice(1).map((m, i) => Math.abs(f(m) - f(arr[i]))));
      const mono = (arr, f, sig) => arr.slice(1).every((m, i) => sig * (f(m) - f(arr[i])) >= -1e-3);
      cab = {
        pasos: pasos.length,
        maxSaltoVisible: +salto(pasos, (m) => m.visible).toFixed(2), maxSaltoOpacidad: +salto(pasos, (m) => m.op).toFixed(3), maxSaltoIcono: +salto(pasos, (m) => m.ic).toFixed(2),
        monotono: { visible: mono(pasos, (m) => m.visible, -1), opacidad: mono(pasos, (m) => m.op, -1), icono: mono(pasos, (m) => m.ic, -1), vueltaVisible: mono(vuelta, (m) => m.visible, 1) },
        altoFlujo: [...new Set(pasos.map((m) => m.flujo))], filaEnPagina: [...new Set(pasos.map((m) => Math.round(m.fila)))],
        extremos: { p0: pasos[0].p, p1: pasos[pasos.length - 1].p, visible: [Math.round(pasos[0].visible), Math.round(pasos[pasos.length - 1].visible)], icono: [pasos[0].ic, pasos[pasos.length - 1].ic] },
      };
    }
    const desborde = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(tag, JSON.stringify({ errs, sel, anuncio, cab, desborde }));
    await b.close();
  }
})();
