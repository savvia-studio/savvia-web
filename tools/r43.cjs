// Ronda 43 · node tools/r43.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent });
  const R = {}, errs = [];
  const abrir = async (est) => {
    const p = await ctx.newPage();
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
    p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
    await p.goto('http://localhost:4331/' + (est ? `?estacion=${est}` : ''), { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(2500);
    return p;
  };
  const shot = (p, n, clip) => p.screenshot({ path: `tools/shots/r43-${tag}-${n}.jpg`, type: 'jpeg', quality: 84, ...(clip ? { clip } : {}) });
  const top = (p, s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (p, y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  let p = await abrir('');
  // el puente
  const yb = await top(p, '[data-puente]'); await ir(p, yb - 60, 2600); await shot(p, 'puente');
  R.puente = await p.evaluate(() => ({ h: document.querySelector('#puente-h').textContent.replace(/\s+/g, ' ').trim(), tachado: document.querySelector('[data-puente]').classList.contains('tachado') }));
  // la estela del estudio en otoño
  const ye = await top(p, '#estudio'); await ir(p, ye - 100, 600); await ir(p, ye + 500, 2500); await shot(p, 'estela-otono');
  // preguntas: una sugerencia y una libre sin respuesta
  const yq = await top(p, '#preguntas'); await ir(p, yq + 40, 1200); await shot(p, 'faq-0');
  await p.evaluate(() => window.__faq(2)); await p.waitForTimeout(700); await shot(p, 'faq-escribiendo'); await p.waitForTimeout(2600); await shot(p, 'faq-1');
  await p.evaluate(() => window.__preguntar('¿Hacéis apps para relojes?')); await p.waitForTimeout(3400); await shot(p, 'faq-2');
  R.faq = await p.evaluate(() => ({ intercambios: [...document.querySelectorAll('.intercambio')].filter((x) => getComputedStyle(x).display !== 'none').length, correo: !!document.querySelector('.por-correo'), estiloLibre: getComputedStyle([...document.querySelectorAll('.burbuja.tu')].pop()).backgroundColor }));
  // el formulario sube desde el paisaje
  const H = await p.evaluate(() => document.documentElement.scrollHeight); await ir(p, H, 7000);
  const c = await p.$('[data-contacta]'); const cb = await c.boundingBox();
  await p.mouse.move(cb.x + cb.width * 0.45, cb.y + cb.height * 0.5, { steps: 3 }); await p.waitForTimeout(450); await shot(p, 'form-subiendo'); await p.waitForTimeout(1200); await shot(p, 'form-arriba');
  R.form = await p.evaluate(() => getComputedStyle(document.querySelector('[data-form]')).translate);
  await p.keyboard.press('Escape'); await p.waitForTimeout(1500); R.formCerrado = await p.evaluate(() => document.querySelector('[data-form]').hidden);
  await p.close();
  // el pie en cada estación: tras ~14 s (se acumula), y el rayo de verano con el formulario
  for (const est of ['otono', 'invierno', 'primavera', 'verano']) {
    p = await abrir(est);
    const H2 = await p.evaluate(() => document.documentElement.scrollHeight); await ir(p, H2, 6500);
    await p.waitForTimeout(est === 'otono' || est === 'invierno' ? 14000 : 4000); await p.mouse.move(+w * 0.8, +h * 0.3); await p.waitForTimeout(1500); await shot(p, `pie-${est}`);
    if (est === 'verano') {
      R.rayo = await p.evaluate(() => getComputedStyle(document.querySelector('.luz-pie')).opacity);
      const c2 = await p.$('[data-contacta]'); const cb2 = await c2.boundingBox(); await p.mouse.move(cb2.x + cb2.width * 0.45, cb2.y + cb2.height * 0.5, { steps: 3 }); await p.waitForTimeout(1500);
      R.rayoConForm = await p.evaluate(() => getComputedStyle(document.querySelector('.luz-pie')).opacity); await shot(p, 'pie-verano-form');
    }
    if (est !== 'otono') { const ye2 = await top(p, '#estudio'); await ir(p, ye2 - 100, 600); await ir(p, ye2 + 500, 2500); await shot(p, `estela-${est}`); }
    await p.close();
  }
  console.log(tag, 'errores:', errs.length ? [...new Set(errs)].slice(0, 5) : 'ninguno', JSON.stringify(R));
  await b.close();
})();
