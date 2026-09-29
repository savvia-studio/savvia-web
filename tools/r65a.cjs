// Ronda 65 · hero (copy, hora, gota realista, invierno sin hojas, verano con verdes), dolores (3, demo unida), destacados (sin info; sentado con ficha)
// node tools/r65a.cjs [motor] [ancho] [url]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), url = process.argv[4] || 'http://localhost:4321/';
const H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  const pre = `tools/shots/r66-${motor}-${W}`;
  // la carga: dibujar un círculo y capturar la gota cayendo
  await p.goto(url); await p.waitForTimeout(1200);
  const cx = W / 2, cy = H / 2;
  await p.mouse.move(cx + 60, cy);
  for (let a = 0; a <= 380; a += 12) await p.mouse.move(cx + 60 * Math.cos((a * Math.PI) / 180), cy + 60 * Math.sin((a * Math.PI) / 180));
  for (const t of [1500, 700, 500, 500]) { await p.waitForTimeout(t); await p.screenshot({ path: `${pre}-carga-${t}-${Date.now() % 1000}.jpg`, quality: 70 }); }
  await p.waitForTimeout(5000);
  await p.screenshot({ path: `${pre}-hero.jpg`, quality: 75 });
  const hero = await p.evaluate(() => ({ h: document.querySelector('[data-hero]').offsetHeight, h1: document.querySelector('#h1').textContent, hora: document.querySelector('[data-hora]').textContent }));
  // invierno y verano
  for (const e of ['invierno', 'verano']) {
    await p.evaluate(async (e) => { const m = await import('/src/scripts/estacion.ts'); m.fijarEstacion(m.EST.indexOf(e), 'test'); }, e);
    await p.waitForTimeout(3600);
    await p.screenshot({ path: `${pre}-hero-${e}.jpg`, quality: 75 });
  }
  // dolores
  const sec = '#recorrido-a2';
  const [y0, h] = await p.evaluate((s) => { const e = document.querySelector(s); return [e.getBoundingClientRect().top + scrollY, e.offsetHeight]; }, sec);
  for (let y = y0 - 400; y < y0 + h; y += 120) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(60); }
  const n = await p.evaluate((s) => document.querySelectorAll(`${s} [data-parada]`).length, sec);
  for (let k = 0; k < n; k++) {
    const yy = await p.evaluate(([s, k]) => document.querySelectorAll(`${s} [data-parada]`)[k].getBoundingClientRect().top + scrollY, [sec, k]);
    await p.evaluate((v) => scrollTo(0, v - 60), yy); await p.waitForTimeout(k === 2 ? 5600 : 3000);
    await p.screenshot({ path: `${pre}-dolor-${k}.jpg`, quality: 72 });
  }
  // destacados: de pie y sentado
  const yp = await p.evaluate(() => { const e = document.querySelector('[data-pista]'); return e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.36; });
  await p.evaluate((v) => scrollTo(0, v), yp); await p.waitForTimeout(4500);
  await p.screenshot({ path: `${pre}-proy-pie.jpg`, quality: 72 });
  const ui = await p.evaluate(() => ['.ui-info', '.ui-lista', '.ui-guia'].map((s) => getComputedStyle(document.querySelector(s)).visibility));
  await p.click('[data-sentarse]', { force: true }); await p.waitForTimeout(3200);
  await p.screenshot({ path: `${pre}-proy-sentado.jpg`, quality: 72 });
  const ficha = await p.evaluate(() => { const f = document.querySelector('.ui-info'); return [getComputedStyle(f).opacity, document.querySelector('.ficha:not([hidden]) .ficha-ver')?.getAttribute('href')]; });
  const ovf = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(motor, W, errs.length ? errs.slice(0, 5) : 'sin errores', JSON.stringify({ hero, paradas: n, ui, ficha, ovf }));
  await b.close();
})();
