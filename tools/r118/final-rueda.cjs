// RONDA 118 · del último problema a Proyectos con la RUEDA y el scroll suave (Lenis), como lo usa Andoni
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch({ ...launchOpts, headless: true });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 820 }, userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/?carga=0'); await p.waitForTimeout(3500);
  await p.mouse.move(700, 400);
  const a = await p.evaluate(() => document.querySelector('[data-parada="2"]').getBoundingClientRect().top + scrollY - 900);
  while ((await p.evaluate(() => scrollY)) < a) { await p.mouse.wheel(0, 400); await p.waitForTimeout(90); }
  await p.waitForTimeout(800);
  const out = [];
  for (let i = 0; i < 26; i++) {
    await p.mouse.wheel(0, 120); await p.waitForTimeout(160);
    const st = await p.evaluate(() => { const h = document.querySelector('[data-titulo] h2'), t = document.querySelector('[data-titulo]'), r = h.getBoundingClientRect(); return { y: Math.round(scrollY), op: h.style.opacity, tvis: getComputedStyle(t).visibility, top: Math.round(r.top), h: Math.round(r.height), v3: document.querySelector('[data-parada="2"]').style.getPropertyValue('--vis') }; });
    out.push(st); if (i % 3 === 0) await p.screenshot({ path: `tools/shots/r118w-${String(i).padStart(2, '0')}.jpg`, quality: 55 });
  }
  console.log(JSON.stringify({ errs, out }, null, 0)); await b.close();
})();
