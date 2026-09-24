// Ronda 50 · la paleta 2: una captura por sección. node tools/r50.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4331/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(5500);
  const shot = (n) => p.screenshot({ path: `tools/shots/r50-${tag}-${n}.jpg`, type: 'jpeg', quality: 82 });
  await shot('hero');
  const secs = await p.evaluate(() => [...document.querySelectorAll('main > section, main > div > section, footer, #anteriores, #servicios, #la-savvia, #estudio, #preguntas')].map((s) => s.id).filter(Boolean));
  const vistos = new Set();
  for (const id of secs) {
    if (vistos.has(id)) continue; vistos.add(id);
    const y = await p.evaluate((i) => { const s = document.getElementById(i); return s.getBoundingClientRect().top + scrollY; }, id);
    await p.evaluate((yy) => scrollTo(0, yy), id === 'proyectos' ? y + 2.2 * +h : y + 40); await p.waitForTimeout(id === 'proyectos' ? 7000 : 2200);
    await shot(id);
  }
  // pasar por un servicio y por el CTA del pie
  const H = await p.evaluate(() => document.documentElement.scrollHeight); await p.evaluate((hh) => scrollTo(0, hh), H); await p.waitForTimeout(7000); await shot('pie-fin');
  const R = { secciones: secs, fondo: await p.evaluate(() => Object.fromEntries(['servicios', 'la-savvia', 'anteriores', 'preguntas', 'estudio'].map((i) => [i, getComputedStyle(document.getElementById(i)).backgroundColor]))), plato: await p.evaluate(() => getComputedStyle(document.querySelector('[data-plato]')).backgroundColor), overflow: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) };
  console.log(tag, errs.length ? errs : 'sin errores', JSON.stringify(R));
  await b.close();
})();
