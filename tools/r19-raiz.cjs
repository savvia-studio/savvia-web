// Ronda 19 · la gota resbala por la raíz y cae a la tarjeta. node tools/r19-raiz.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.mouse.wheel(0, 10); await p.waitForTimeout(1200); // la rueda salta la carga
  const shot = (n) => p.screenshot({ path: `tools/shots/r19-raiz-${tag}-${n}.jpg`, type: 'jpeg', quality: 82 });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const yf = await top('[data-fila]');
  await ir(yf - +h * 0.95, 700);
  await ir(yf - +h * 0.62, 0);
  const t1 = Date.now();
  for (const t of [300, 700, 1100, 1500, 1900, 2200, 2500, 2800, 3600]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t1))); await shot(`g${t}`); }
  const r = await p.evaluate(() => ({ despierta: document.querySelector('[data-fila]').classList.contains('despierta'), gotaEnBody: document.querySelector('[data-gota-raiz]').parentElement === document.body, desborde: document.documentElement.scrollWidth - innerWidth }));
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify(r));
  await b.close();
})();
