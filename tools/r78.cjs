// Ronda 78 · los heroes que rotan (nombre legible y relevo) y el «Escríbenos» que brota de la tilde de «Contáctanos»
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto(process.env.URL || 'http://localhost:4331/'); await p.waitForTimeout(2500);
  const S = `tools/shots/r78-${motor}-${W}`;
  const y = await p.evaluate(() => { const e = document.querySelector('[data-rota]'); return e.getBoundingClientRect().top + scrollY - 140; });
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(2500);
  const box = await p.$eval('[data-rota]', (e) => { const r = e.getBoundingClientRect(); return { x: r.left, y: r.top, width: r.width, height: r.height }; });
  const clip = { x: Math.max(0, box.x - 10), y: Math.max(0, box.y - 10), width: box.width + 20, height: box.height + 20 };
  for (let i = 0; i < 4; i++) { await p.screenshot({ path: `${S}-heroe-${i}.jpg`, quality: 70, clip }); await p.waitForTimeout(i === 0 ? 3700 : 4200); }
  // relevo a mitad
  await p.waitForTimeout(3950); await p.screenshot({ path: `${S}-heroe-relevo.jpg`, quality: 70, clip });
  const claros = await p.evaluate(() => JSON.parse(document.querySelector('[data-rota]').dataset.claros));
  // el CTA
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(9000);
  const bb = await p.$eval('[data-contacta]', (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width * 0.3, y: r.top + r.height * 0.55 }; });
  await p.mouse.move(bb.x, bb.y, { steps: 3 });
  for (const t of [120, 260, 450, 1000]) { await p.waitForTimeout(t === 120 ? 120 : t - [120, 260, 450, 1000][[120, 260, 450, 1000].indexOf(t) - 1]); await p.screenshot({ path: `${S}-cta-${t}.jpg`, quality: 70, clip: { x: 0, y: H * 0.35, width: W, height: H * 0.65 } }); }
  console.log(JSON.stringify({ motor, W, errs, claros }));
  await b.close();
})();
