// Ronda 40 · node tools/r40.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const URL = 'http://localhost:4331/', tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto(URL, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(5500);
  const shot = (n) => p.screenshot({ path: `tools/shots/r40-${tag}-${n}.jpg`, type: 'jpeg', quality: 82 });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const R = {};
  await shot('hero');
  R.hero = await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, est: document.documentElement.dataset.estacion, bg: getComputedStyle(document.documentElement).backgroundColor, arbol: getComputedStyle(document.documentElement).getPropertyValue('--arbol') }));
  // el icono de estación: cuatro clics = la vuelta entera
  const ic = await p.$('[data-estacion-ic]');
  R.icono = [];
  for (let k = 0; k < 4; k++) { await ic.click(); await p.waitForTimeout(300); if (k === 0) await shot('icono-morfando'); await p.waitForTimeout(2600); R.icono.push(await p.evaluate(() => [document.documentElement.dataset.estacion, getComputedStyle(document.documentElement).backgroundColor, document.querySelector('[data-estacion-ic]').dataset.nombre])); await shot(`est-${k}`); }
  // el menú se dibuja
  await p.click('[data-rejilla]'); await p.waitForTimeout(450); await shot('menu-dibujando'); await p.waitForTimeout(1200); await shot('menu-abierto');
  R.menu = await p.evaluate(() => ({ on: document.querySelector('[data-menu]').classList.contains('on'), mask: getComputedStyle(document.querySelector('[data-menu]')).maskImage || getComputedStyle(document.querySelector('[data-menu]')).webkitMaskImage }));
  await p.keyboard.press('Escape'); await p.waitForTimeout(350); await shot('menu-cerrando'); await p.waitForTimeout(1500);
  R.menuCerrado = await p.evaluate(() => document.querySelector('[data-menu]').hidden);
  // los dolores: boceto → viva
  const yp = await top('[data-pista]'), alto = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight), T = alto - +h;
  const fijo = await p.evaluate(() => window.__pasos().fijo);
  R.pasos = [];
  const pts = fijo ? [yp - +h * 0.35, yp + T * 0.02, yp + T * 0.12, yp + T * 0.3, yp + T * 0.58, yp + T * 0.97] : [yp - +h * 0.3, yp + 300, yp + 1200];
  for (const [k, y] of pts.entries()) { await ir(y, 1400); R.pasos.push(await p.evaluate(() => window.__pasos())); await shot(`pasos-${k}`); }
  // Proyectos: sin números, flechas, caso de estudio, sin salida
  const ypr = await top('#proyectos'), altoPr = await p.evaluate(() => document.querySelector('#proyectos .pista').offsetHeight);
  await ir(ypr + (altoPr - +h) * 0.3, 600); await ir(ypr + (altoPr - +h) * 0.6, 8000); await shot('proyectos');
  R.proy = await p.evaluate(() => ({ numeros: !!document.querySelector('.guia-tit'), ver: document.querySelector('.ficha:not([hidden]) .ver').textContent.trim(), href: document.querySelector('.ficha:not([hidden]) .ver').getAttribute('href'), pista: document.querySelector('#proyectos .pista').offsetHeight / innerHeight }));
  await ir(ypr + altoPr - +h * 0.4, 1400); await shot('salida');
  // Nuestros proyectos (claro) y las voces
  const ya = await top('#anteriores'); await ir(ya + +h * 1.4, 1400); await shot('voces-1');
  R.voces = await p.evaluate(() => ({ bg: getComputedStyle(document.querySelector('#anteriores')).backgroundColor, on: [...document.querySelectorAll('[data-cita]')].map((c) => c.classList.contains('on')), citado: [...document.querySelectorAll('.pieza.citado')].map((x) => x.dataset.slug) }));
  await p.click('[data-quien="1"]'); await p.waitForTimeout(1300); await shot('voces-2');
  R.voces2 = await p.evaluate(() => [...document.querySelectorAll('.pieza.citado')].map((x) => x.dataset.slug));
  // Servicios: demo al pasar
  const ys = await top('#servicios'); await ir(ys + 80, 1200); await shot('servicios');
  const nom = await p.$$('[data-nombre]');
  for (const k of [0, 1, 2]) { const nb = await nom[k].boundingBox(); await p.mouse.move(nb.x + nb.width * 0.3, nb.y + nb.height / 2); await p.waitForTimeout(k === 0 ? 1800 : 2600); await shot(`serv-${k}`); }
  R.serv = await p.evaluate(() => ({ bg: getComputedStyle(document.querySelector('#servicios')).backgroundColor, on: [...document.querySelectorAll('[data-servicio]')].map((x) => x.classList.contains('on')), agentic: !!document.querySelector('#servicios .agentic') }));
  await p.mouse.move(5, 5);
  for (const s of ['#la-savvia', '#estudio', '#preguntas']) { const y = await top(s); await ir(y + 40, 1400); await shot(s.slice(1)); }
  R.fondos = await p.evaluate(() => ['#anteriores', '#servicios', '#la-savvia', '#estudio', '#preguntas', '#contacto'].map((s) => [s, getComputedStyle(document.querySelector(s)).backgroundColor]));
  // el pie: oscuro, paisaje y el formulario que se dibuja
  const H = await p.evaluate(() => document.documentElement.scrollHeight); await ir(H, 7000); await shot('pie');
  const c = await p.$('[data-contacta]'); const cb = await c.boundingBox();
  await p.mouse.move(cb.x + cb.width * 0.4, cb.y + cb.height * 0.5, { steps: 4 }); await p.waitForTimeout(500); await shot('form-dibujando'); await p.waitForTimeout(1300); await shot('form-abierto');
  R.form = await p.evaluate(() => ({ hidden: document.querySelector('[data-form]').hidden, on: document.querySelector('[data-form]').classList.contains('on') }));
  await p.keyboard.press('Escape'); await p.waitForTimeout(400); await shot('form-cerrando'); await p.waitForTimeout(1500);
  R.formCerrado = await p.evaluate(() => document.querySelector('[data-form]').hidden);
  R.overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify(R));
  await b.close();
})();
