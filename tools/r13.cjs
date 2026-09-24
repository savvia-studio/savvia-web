// Ronda 13 · capturas de lo tocado: node tools/r13.cjs <url> [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [url = 'http://localhost:4340/', w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto(url, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  const shot = (n) => p.screenshot({ path: `tools/shots/r13-${tag}-${n}.jpg`, type: 'jpeg', quality: 80 });
  await p.waitForTimeout(900); await shot('hero-0.9s');
  await p.waitForTimeout(3000); await shot('hero-4s');
  const top = (sel) => p.evaluate((s) => document.querySelector(s).getBoundingClientRect().top + scrollY, sel);
  const ir = async (y, ms = 700) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const yr = await top('[data-raices]'); await ir(yr - +h * 0.3); await shot('raices');
  const yp = await top('[data-pasos]'); await ir(yp - 40, 1500);
  for (let i = 0; i < 4; i++) {
    await p.evaluate((k) => { const t = document.querySelectorAll('[data-tarjeta]')[k]; t.click(); }, i);
    await p.waitForTimeout(i === 3 ? 4400 : 2600); await shot(`paso${i + 1}`);
  }
  await ir(yp + 500, 3800); await shot('firma');
  const ys = await top('[data-sistema]'); await ir(ys + 80, 800);
  await p.evaluate(() => document.querySelector('[data-ver-doc]').click()); await p.waitForTimeout(3600); await shot('savvia-doc');
  const yq = await top('[data-pista]');
  const H = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight);
  for (const f of [0.02, 0.4, 0.74]) { await ir(yq + (H - +h) * f, 500); await shot(`proy-${f}`); }
  await ir(yq + (H - +h) * 0.78, 1600); await shot('proy-busca');
  await p.waitForTimeout(2200); await shot('proy-teclea');
  await p.waitForTimeout(2600); await shot('proy-web');
  const yv = await top('#servicios'); await ir(yv - +h * 0.75, 500); await shot('brota-servicios');
  const ye = await top('[data-paseo]'); await ir(ye - +h * 0.35, 900); await ir(ye - +h * 0.3, 1200); await shot('equipo');
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', '· desborde', ov, '· sistema', await p.evaluate(() => JSON.stringify({ ...window.__sistema(), md: undefined })));
  await b.close();
})();
