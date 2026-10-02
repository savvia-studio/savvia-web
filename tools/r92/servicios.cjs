// RONDA 92 · Servicios: la entrada «necesites» y la tira de entradas que sale del talonario; los instrumentos a plumilla
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const casos = [['chrome', 1280, 720, 2, ''], ['chrome', 390, 844, 2, ''], ['webkit', 1280, 720, 2, ''], ['chrome', 1280, 720, 2, 'clara'], ['webkit', 390, 844, 2, 'clara']];
(async () => {
  for (const [motor, W, H, dpr, pal] of casos) {
    const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
    const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: dpr, userAgent: motor === 'webkit' ? undefined : userAgent });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    const tag = `${motor}-${W}${pal ? '-' + pal : ''}`;
    await p.goto(`http://localhost:4331/?carga=0${pal ? '&paleta=' + pal : ''}`); await p.waitForTimeout(1500);
    const top = await p.evaluate(() => document.querySelector('#servicios').getBoundingClientRect().top + scrollY);
    await p.evaluate((y) => scrollTo(0, y - 80), top); await p.waitForTimeout(500);
    await p.screenshot({ path: `tools/shots/r92-servicios-${tag}-inicio.jpg`, quality: 75 });
    await p.waitForTimeout(1300);
    await p.screenshot({ path: `tools/shots/r92-servicios-${tag}-media.jpg`, quality: 75 });
    await p.waitForTimeout(2500);
    await p.screenshot({ path: `tools/shots/r92-servicios-${tag}-desplegado.jpg`, quality: 75 });
    const fr = await p.evaluate(() => { const r = document.querySelector('[data-sub]').getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    await p.screenshot({ path: `tools/shots/r92-servicios-${tag}-zoom-entradas.jpg`, quality: 85, clip: { x: Math.max(0, fr.x - 10), y: Math.max(0, fr.y - 10), width: Math.min(W - Math.max(0, fr.x - 10), fr.w + 20), height: fr.h + 20 } });
    // los iconos
    const sel = W >= 1024 ? '.tabla .cabeza' : '.fichas .ficha-s';
    await p.evaluate((s) => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(3200);
    const ic = await p.evaluate((s) => { const els = [...document.querySelectorAll(s + ' .instrumento')].slice(0, 3).map((e) => e.getBoundingClientRect()); const x0 = Math.min(...els.map((r) => r.x)), y0 = Math.min(...els.map((r) => r.y)), x1 = Math.max(...els.map((r) => r.right)), y1 = Math.max(...els.map((r) => r.bottom)); return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }; }, W >= 1024 ? '.tabla .cabeza' : '.fichas .ficha-s:first-child');
    await p.screenshot({ path: `tools/shots/r92-servicios-${tag}-iconos.jpg`, quality: 90, clip: { x: Math.max(0, ic.x - 12), y: Math.max(0, ic.y - 12), width: Math.min(W, ic.w + 24), height: ic.h + 24 } });
    const r = await p.evaluate(() => ({
      ya: document.querySelector('[data-sub]').classList.contains('ya'),
      entradas: document.querySelectorAll('[data-sub] .ent').length,
      opacas: [...document.querySelectorAll('[data-sub] .cli')].filter((e) => getComputedStyle(e).opacity === '1').length,
      filas: new Set([...document.querySelectorAll('[data-sub] .ent')].map((e) => Math.round(e.getBoundingClientRect().top / 10))).size,
      lectura: document.querySelector('[data-sub]').textContent.replace(/\s+/g, ' ').trim(),
      dibujados: document.querySelectorAll('.instrumento.dibuja').length,
      desborde: document.documentElement.scrollWidth - innerWidth,
    }));
    console.log(tag, JSON.stringify({ errs, ...r }));
    await b.close();
  }
})();
