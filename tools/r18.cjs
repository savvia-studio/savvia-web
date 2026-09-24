// Ronda 18 · gota realista + salpicadura, gota de las raíces que despierta las tarjetas, descanso de Proyectos, Otros trabajos. node tools/r18.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4340/', { waitUntil: 'domcontentloaded' });
  const t0 = Date.now(), shot = (n, o = {}) => p.screenshot({ path: `tools/shots/r18-${tag}-${n}.jpg`, type: 'jpeg', quality: 82, ...o });
  for (const t of [2150, 2330, 2450, 2900, 3400, 3780, 3860, 3960, 4150]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t0))); await shot(`c${t}`); }
  await p.waitForTimeout(5000);
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  // tarjetas dormidas → gota → despiertas
  const yf = await top('[data-fila]');
  await ir(yf - +h * 0.95, 700); await shot('dormidas');
  await ir(yf - +h * 0.62, 0);
  const t1 = Date.now();
  for (const t of [300, 640, 780, 900, 1100, 1700, 3000]) { await p.waitForTimeout(Math.max(0, t - (Date.now() - t1))); await shot(`g${t}`); }
  const desp = await p.evaluate(() => document.querySelector('[data-fila]').classList.contains('despierta'));
  // proyectos: descanso
  const yq = await top('[data-pista]'), H = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight), T = H - +h;
  const dentro = [];
  for (const f of [0.36, 0.5, 0.68]) { await ir(yq + T * f, 700); dentro.push(await p.evaluate(() => document.querySelector('[data-escenario]').classList.contains('dentro'))); }
  const ya = await top('#anteriores');
  for (let i = 0; i < 4; i++) { await ir(ya - 60 + i * +h * 0.8, 1900); await shot(`ot${i}`); }
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', { despierta: desp, proyectosQuietosEn: dentro, descansoPx: Math.round(T * 0.37), desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) });
  await b.close();
})();
