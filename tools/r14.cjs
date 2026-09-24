// Ronda 14 · la gota del hero en secuencia, la tarjeta 04, sentado con selector y la SALIDA de proyectos. node tools/r14.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4340/', { waitUntil: 'domcontentloaded' });
  const t0 = Date.now();
  for (const t of [350, 800, 1200, 1700, 2600, 3800, 5600]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await p.screenshot({ path: `tools/shots/r14-${tag}-hero-${t}.jpg`, type: 'jpeg', quality: 80, clip: { x: 0, y: +h * 0.3, width: +w, height: +h * 0.7 } }); }
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 700) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  await ir(await top('[data-pasos]') - 40, 1400);
  await p.evaluate(() => document.querySelectorAll('[data-tarjeta]')[3].click());
  const t1 = Date.now();
  for (const t of [1500, 2500, 3300, 4300, 5600]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t1))); await p.locator('.tarjeta[aria-current="true"] .demo').screenshot({ path: `tools/shots/r14-${tag}-c4-${t}.jpg`, type: 'jpeg', quality: 80 }); }
  const yq = await top('[data-pista]'), H = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight), T = H - +h;
  await ir(yq + T * 0.5, 5200);
  await p.click('[data-sentarse]'); await p.waitForTimeout(1500); await p.screenshot({ path: `tools/shots/r14-${tag}-sentado.jpg`, type: 'jpeg', quality: 80 });
  await p.click('[data-otro="1"]'); await p.waitForTimeout(1800); await p.screenshot({ path: `tools/shots/r14-${tag}-sentado2.jpg`, type: 'jpeg', quality: 80 });
  const nombre = await p.evaluate(() => document.querySelector('[data-otro-nombre]').textContent);
  await p.keyboard.press('Escape'); await p.waitForTimeout(800);
  for (const f of [0.6, 0.7, 0.8, 0.9, 0.97]) { await ir(yq + T * f, 500); await p.screenshot({ path: `tools/shots/r14-${tag}-sale-${f}.jpg`, type: 'jpeg', quality: 75 }); }
  await ir(yq + H - +h * 0.4, 500); await p.screenshot({ path: `tools/shots/r14-${tag}-despues.jpg`, type: 'jpeg', quality: 75 });
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', '· desborde', ov, '· sentado →', nombre);
  await b.close();
})();
