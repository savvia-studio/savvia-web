// RONDA 188 · capturas del caso: la fila de las tarjetas (dentro de las guías), el sistema (paleta, espaciado) y desbordes. node tools/r188/ver.cjs <slug> <salida> [ancho] [motor]
const pw = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const [slug, out, W = '1280', motor = 'chromium'] = process.argv.slice(2);
  const b = await pw[motor].launch(motor === 'chromium' ? pw.launchOpts : { headless: true });
  const ctx = await b.newContext({ viewport: { width: +W, height: 900 }, deviceScaleFactor: 1, userAgent: motor === 'chromium' ? pw.userAgent : undefined });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  await p.goto(`http://localhost:4332/proyectos/${slug}?carga=0`, { waitUntil: 'load' }); await p.waitForTimeout(800);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 500) { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(60); }
  await p.evaluate(() => document.querySelectorAll('[data-vivo]').forEach((e) => e.classList.add('visto'))); await p.waitForTimeout(1500);
  const info = await p.evaluate(() => {
    const wrap = document.querySelector('.cabecera').getBoundingClientRect();
    const fuera = [...document.querySelectorAll('.tesela .medio')].map((m) => { const r = m.getBoundingClientRect(); return { l: Math.round(r.left - wrap.left), r: Math.round(wrap.right - r.right) }; }).filter((x) => x.l < -1 || x.r < -1);
    return { desborde: document.documentElement.scrollWidth - innerWidth, fuera, paleta: !!document.querySelector('.paleta-grande'), esp: document.querySelectorAll('.pasos li').length };
  });
  for (const sel of ['.sis', '.mosaico']) { const el = p.locator(sel).first(); if (await el.count()) { await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(1600); await el.screenshot({ path: `${out}-${sel.slice(1)}-${W}-${motor}.jpg`, type: 'jpeg', quality: 70 }); } }
  console.log(motor, W, slug, JSON.stringify(info), errs.slice(0, 3).join(' | '));
  await b.close();
})();
