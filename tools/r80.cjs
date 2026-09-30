// Ronda 80 · el ticket sin «0 €» y el botón de la librería como un mensaje a la IA; la PUERTA del «Contáctanos» (fotogramas de la apertura)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(process.env.URL || 'http://localhost:4331/'); await p.waitForTimeout(2000);
  const S = `tools/shots/r80-${motor}-${W}`;
  // la receta: bajar despacio por la imprenta hasta que termine
  const [y0, y1] = await p.evaluate(() => { const e = document.querySelector('[data-receta]'); const t = e.getBoundingClientRect().top + scrollY; return [t, t + e.offsetHeight]; });
  for (let y = y0; y < y1 - H * 0.6; y += 40) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(45); }
  await p.waitForTimeout(3000);
  const lib = await p.$('.boton-lib'); await lib.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  await lib.hover(); await p.waitForTimeout(500);
  const r = await lib.boundingBox();
  await p.screenshot({ path: `${S}-libreria.jpg`, quality: 72, clip: { x: Math.max(0, r.x - 280), y: Math.max(0, r.y - 330), width: Math.min(W, r.width + 560), height: 460 } });
  const euro = await p.evaluate(() => document.querySelector('[data-receta]').textContent.includes('€'));
  // la puerta
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(9000);
  const bb = await p.$eval('[data-contacta]', (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width * 0.3, y: r.top + r.height * 0.55 }; });
  await p.evaluate(() => { window.__m = []; const pl = document.querySelector('.cta-pastilla'); const t0 = performance.now(); (function f() { const cs = getComputedStyle(pl); window.__m.push([Math.round(performance.now() - t0), cs.transform.slice(0, 40), getComputedStyle(pl, '::before').clipPath]); if (performance.now() - t0 < 1600) requestAnimationFrame(f); })(); });
  await p.mouse.move(bb.x, bb.y); await p.waitForTimeout(1800);
  const m = await p.evaluate(() => window.__m.filter((_, i) => i % 10 === 0));
  await p.screenshot({ path: `${S}-puerta.jpg`, quality: 72, clip: { x: 0, y: H * 0.3, width: W, height: H * 0.7 } });
  console.log(JSON.stringify({ motor, W, errs, euro }));
  console.log(m.map((x) => x.join(' | ')).join('\n'));
  await b.close();
})();
