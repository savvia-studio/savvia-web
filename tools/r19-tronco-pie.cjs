// Ronda 19 · el tronco (ventana con corteza y paralaje) y el pie (logotipo que se llena de savia). node tools/r19-tronco-pie.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.mouse.wheel(0, 10); await p.waitForTimeout(1200);
  const shot = (n) => p.screenshot({ path: `tools/shots/r19-tp-${tag}-${n}.jpg`, type: 'jpeg', quality: 84 });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const yt = await top('#tronco');
  await ir(yt - 100, 1500); await shot('tronco-a');
  await ir(yt + 260, 1200); await shot('tronco-b');
  const tr = await p.evaluate(() => ({ listo: document.querySelector('[data-corteza]').classList.contains('listo'), cv: [document.querySelector('[data-corteza]').width, document.querySelector('[data-corteza]').height] }));
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const yp = await top('[data-pie]');
  await ir(yp - +h + 200, 1200); await shot('pie-a');
  await ir(yp - +h / 2, 1200); await shot('pie-b');
  await ir(H, 1500); await shot('pie-c');
  const pieInfo = await p.evaluate(() => ({ nivel: document.querySelector('[data-nivel]').getAttribute('transform'), viva: document.querySelector('[data-pie]').classList.contains('viva'), desborde: document.documentElement.scrollWidth - innerWidth }));
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify({ tr, pieInfo }));
  await b.close();
})();
