// RONDA 95 · los fotogramas nuevos de Eric y Andoni + la estela «resonancia».
// uso: node tools/r95/estudio.cjs [chrome|webkit] [1280|390] [clara]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844, clara = process.argv[4] === 'clara';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse|playground|neety/i.test(m.text()) && errs.push(m.text()));
  const malas = []; p.on('response', (r) => r.status() >= 400 && malas.push(r.status() + ' ' + r.url()));
  await p.goto(`${process.env.URL || 'http://localhost:4331/'}?carga=0&lenis=0${clara ? '&paleta=clara' : ''}`); await p.waitForTimeout(2200);
  const top = await p.$eval('[data-paseo]', (e) => e.getBoundingClientRect().top + scrollY);
  const S = `tools/shots/r95-estudio-${motor}-${W}${clara ? '-clara' : ''}`;
  // avance lin = (vh*0.96 - top) / (vh*0.66) → scroll para un avance dado
  const ir = async (lin) => { await p.evaluate((y) => scrollTo(0, y), top - H * 0.96 + H * 0.66 * lin); await p.waitForTimeout(+(process.env.ESPERA || 60)); };
  const medir = () => p.evaluate(() => {
    const q = (s) => document.querySelector(s), pa = q('[data-paseo]').getBoundingClientRect(), a = q('[data-a]'), e = q('[data-e]'), j = q('[data-juntos]');
    const r = (el) => { const b = el.getBoundingClientRect(); return { x: +(b.left - pa.left).toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), top: +(b.top - pa.top).toFixed(2) }; };
    return { real: (innerHeight * 0.96 - pa.top) / (innerHeight * 0.66), a: r(a), e: r(e), j: r(j), ca: getComputedStyle(a).backgroundPositionX, ce: getComputedStyle(e).backgroundPositionX, oa: +getComputedStyle(a).opacity, oj: +getComputedStyle(j).opacity, ch: q('[data-paseo]').offsetHeight };
  });
  // 1 · recorrido fino: 120 pasos de avance → tamaños constantes, posiciones monótonas, celdas que cambian
  const filas = [];
  for (let k = 0; k <= 120; k++) { await ir(k / 120); filas.push({ lin: k / 120, ...(await medir()) }); }
  let saltoTam = 0, noMonoA = 0, noMonoE = 0, maxDx = 0;
  for (let i = 1; i < filas.length; i++) {
    const f = filas[i], g = filas[i - 1];
    saltoTam = Math.max(saltoTam, Math.abs(f.a.w - g.a.w), Math.abs(f.a.h - g.a.h), Math.abs(f.e.h - g.e.h), Math.abs(f.a.top - f.j.top), Math.abs(f.e.top - f.j.top));
    if (f.a.x < g.a.x - 0.01) noMonoA++; if (f.e.x > g.e.x + 0.01) noMonoE++;
    const dl = Math.abs(Math.min(1, f.real) - Math.min(1, g.real)); if (dl > 1e-4) maxDx = Math.max(maxDx, Math.abs(f.a.x - g.a.x) / (dl * 120)); // px por 1/120 de avance REAL
  }
  const fin = filas[filas.length - 1], ch = fin.ch;
  // coherencia: la x de Andoni frente a la fórmula aplicada al avance REAL (si no coincide, hay salto o retraso)
  const cw = ch * 0.6, xa0 = -cw * 1.1, xa1 = fin.j.x + (477.2528735632184 * ch) / 1000 - cw / 2;
  let desvio = 0;
  for (const f of filas) { const l = Math.min(1, Math.max(0, f.real)), tr = Math.min(1, l / 0.94), q = tr < 0.8 ? tr : 0.8 + (1 - Math.pow(1 - (tr - 0.8) / 0.2, 2)) * 0.2; const dv = Math.abs(xa0 + (xa1 - xa0) * q - f.a.x); if (dv > 3 && process.env.DEP) console.error(f.lin.toFixed(3), f.real.toFixed(4), f.a.x, (xa0 + (xa1 - xa0) * q).toFixed(1)); desvio = Math.max(desvio, dv); }
  const esperaA = fin.j.x + (477.2528735632184 * ch) / 1000, esperaE = fin.j.x + (705.2701149425287 * ch) / 1000;
  const llegada = { andoni: +(fin.a.x + fin.a.w / 2 - esperaA).toFixed(3), eric: +(fin.e.x + fin.e.w / 2 - esperaE).toFixed(3), anchoCelda: fin.a.w / ch, anchoJuntos: fin.j.w / ch };
  const enFundido = filas.filter((f) => f.lin > 0.93 && f.lin < 1).map((f) => `${f.lin.toFixed(3)}:${f.ca}/${f.oa.toFixed(2)}/${f.oj.toFixed(2)}`);
  // 2 · capturas en 8 puntos del paseo (recorte del paseo)
  const clip = async (n) => { const bb = await (await p.$('[data-paseo]')).boundingBox(); await p.screenshot({ path: `${S}-${n}.jpg`, quality: 78, clip: { x: 0, y: Math.max(0, bb.y - 30), width: W, height: Math.min(H - Math.max(0, bb.y - 30), bb.height * 1.35 + 30) } }); };
  const puntos = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 0.975, 1];
  for (const [i, l] of puntos.entries()) { await ir(Math.max(0, l - 0.03)); await ir(l); await p.waitForTimeout(i < 6 ? 260 : 500); await clip(i); }
  // 3 · al juntarse: hover sobre cada uno abre su nota
  await ir(1); await p.waitForTimeout(300);
  const notas = [];
  for (const i of [0, 1]) {
    const bb = await (await p.$(`[data-quien="${i}"]`)).boundingBox();
    await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height * 0.35); await p.waitForTimeout(900);
    notas.push(await p.$eval(`[data-quien="${i}"]`, (e) => e.getAttribute('aria-expanded')));
    await p.screenshot({ path: `${S}-nota${i}.jpg`, quality: 72 });
  }
  await p.mouse.move(5, 5);
  // 4 · tiempos de fotograma mientras se anda (scroll continuo de 0 a 1 en ~2,4 s), con CPU ×4 en Chrome si FPS4=1
  if (motor === 'chrome' && process.env.CPU4) { const s = await ctx.newCDPSession(p); await s.send('Emulation.setCPUThrottlingRate', { rate: 4 }); }
  await ir(0); await p.waitForTimeout(400);
  const tiempos = await p.evaluate(async ({ top, H }) => {
    const d = []; let u = performance.now(), vivo = true;
    const f = (t) => { d.push(t - u); u = t; if (vivo) requestAnimationFrame(f); }; requestAnimationFrame(f);
    for (let k = 0; k <= 144; k++) { scrollTo(0, top - H * 0.96 + H * 0.66 * (k / 144)); await new Promise((r) => setTimeout(r, 16)); }
    await new Promise((r) => setTimeout(r, 600)); vivo = false;
    d.shift(); d.sort((a, b) => a - b);
    return { n: d.length, p50: +d[Math.floor(d.length * 0.5)].toFixed(1), p90: +d[Math.floor(d.length * 0.9)].toFixed(1), max: +d[d.length - 1].toFixed(1), lentos: +((100 * d.filter((x) => x > 20).length) / d.length).toFixed(1) };
  }, { top, H });
  const desb = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(JSON.stringify({ motor, W, clara, errs, malas, desb, saltoTam, noMonoA, noMonoE, maxDxPorPaso: +maxDx.toFixed(1), desvioFormula: +desvio.toFixed(2), llegada, enFundido: enFundido.join(' '), notas, tiempos, celdas: [...new Set(filas.map((f) => f.ca))] }));
  await b.close();
})();
