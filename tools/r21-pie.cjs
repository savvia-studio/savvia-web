// Ronda 21 · el pie: profundidad con el ratón, estaciones y el logotipo entre capas. node tools/r21-pie.cjs [ancho alto] [motor]
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
  const shot = (n) => p.screenshot({ path: `tools/shots/r21-pie-${tag}-${n}.jpg`, type: 'jpeg', quality: 84 });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.evaluate((y) => scrollTo(0, y), H); await p.waitForTimeout(1500); await shot('otono');
  const r = await p.evaluate(() => { const q = document.querySelector('[data-paisaje]').getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; });
  await p.mouse.move(r.x + r.w * 0.15, r.y + r.h * 0.3); await p.waitForTimeout(900);
  const m1 = await p.evaluate(() => [getComputedStyle(document.querySelector('[data-paisaje]')).getPropertyValue('--mx'), getComputedStyle(document.querySelector('.capa.hierba')).translate, getComputedStyle(document.querySelector('.capa.montes')).translate]);
  await shot('raton-izq');
  await p.mouse.move(r.x + r.w * 0.85, r.y + r.h * 0.7); await p.waitForTimeout(900);
  const m2 = await p.evaluate(() => [getComputedStyle(document.querySelector('[data-paisaje]')).getPropertyValue('--mx'), getComputedStyle(document.querySelector('.capa.hierba')).translate]);
  await p.waitForTimeout(5200); await shot('estacion2');
  const est = await p.evaluate(() => [document.querySelector('[data-paisaje]').dataset.estacion, getComputedStyle(document.querySelector('.capa.arboles')).filter.slice(0, 40), !!document.querySelector('.capa.logo'), getComputedStyle(document.querySelector('.capa.logo')).opacity]);
  await p.waitForTimeout(6000); await shot('estacion3');
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify({ m1, m2, est, desborde: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) }));
  await b.close();
})();
