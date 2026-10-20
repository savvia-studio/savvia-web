// RONDA 277 · las aficiones en MÓVIL: se toca a cada uno (dedo) y se captura la pareja con sus objetos; mide si caen fuera de la pantalla o bajo otra sección
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const S = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/';
const BASE = process.env.BASE || 'http://localhost:4332';
(async () => {
  for (const [nom, motor] of [['chrome', chromium], ['webkit', webkit]]) {
    const b = await motor.launch(motor === webkit ? { headless: true } : launchOpts);
    const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: motor !== webkit, hasTouch: true, userAgent })).newPage();
    const err = []; p.on('pageerror', (e) => err.push(e.message));
    await p.goto(BASE + '/?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(1500);
    await p.evaluate(() => document.querySelector('[data-juntos]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1800);
    for (const [q, i] of [['andoni', 0], ['eric', 1]]) {
      await p.tap(`[data-equipo] .p${i} .llamada-q`); await p.waitForTimeout(2600);
      const m = await p.evaluate((i) => [...document.querySelectorAll(`[data-aficiones="${i}"] .lam`)].map((e) => { const r = e.getBoundingClientRect(); const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), visible: !!top && (top === e || e.contains(top) || top.closest('[data-aficiones]') === e.closest('[data-aficiones]')) }; }), i);
      const j = await (await p.$('[data-juntos]')).boundingBox();
      await p.screenshot({ path: S + `r277-movil-${nom}-${q}.png` });
      console.log(nom, q, 'pareja y', Math.round(j.y), 'alto', Math.round(j.height), 'scroll', await p.evaluate(() => Math.round(scrollY)), JSON.stringify(m));
      await p.tap(`[data-equipo] .p${i} .llamada-q`); await p.waitForTimeout(800);
    }
    console.log(nom, 'errores', err.length, err.slice(0, 2), 'desborde', await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
    await b.close();
  }
})();
