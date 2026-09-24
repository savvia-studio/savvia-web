// Ronda 39 · node tools/r39.cjs [ancho alto] [motor] [url]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome', URL = 'http://localhost:4331/'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto(URL, { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(5500);
  const shot = (n) => p.screenshot({ path: `tools/shots/r39-${tag}-${n}.jpg`, type: 'jpeg', quality: 82 });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const R = {};
  await shot('hero');
  R.hero = await p.evaluate(() => ({ h1: document.querySelector('h1').textContent, sub: document.querySelector('.hero .text-lead').textContent, est: document.documentElement.dataset.estacion, body: getComputedStyle(document.body).fontFamily.slice(0, 30), mono: getComputedStyle(document.querySelector('.detail')).fontFamily.slice(0, 30), areal: [...document.fonts].filter((f) => /Areal/.test(f.family) && f.status === 'loaded').map((f) => f.family + ' ' + f.weight), overflow: document.documentElement.scrollWidth - innerWidth }));
  // raíces fijas: pintadas sin scroll
  await ir(+h * 0.75, 700); await shot('raices');
  R.raices = await p.evaluate(() => document.querySelector('[data-raices] canvas').classList.contains('listo'));
  // la gota y los dolores
  const yp = await top('[data-pista]'), fijo = await p.evaluate(() => window.__pasos().fijo);
  const alto = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight);
  R.pasos = [];
  const T = alto - +h;
  const puntos = fijo ? [yp - +h * 0.7, yp - +h * 0.35, yp, yp + T * 0.03, yp + T * 0.07, yp + T * 0.12, yp + T * 0.3, yp + T * 0.55, yp + T * 0.8, yp + T * 0.97] : [yp - +h * 0.6, yp - +h * 0.3, yp + 100, yp + 900, yp + 1800, yp + 2700];
  for (const [k, y] of puntos.entries()) { await ir(y, k < 2 ? 500 : 1300); R.pasos.push({ y: Math.round(y), gota: await p.evaluate(() => getComputedStyle(document.querySelector('[data-gota-raiz]')).opacity), ...(await p.evaluate(() => window.__pasos())) }); await shot(`pasos-${k}`); }
  // estación: clic en el árbol → toda la web
  await ir(0, 800);
  const caja = await p.$('[data-arbol]'); const cb = await caja.boundingBox();
  await p.mouse.click(cb.x + cb.width / 2, cb.y + cb.height / 2); await p.waitForTimeout(2800);
  R.estacion = await p.evaluate(() => ({ html: document.documentElement.dataset.estacion, bg: getComputedStyle(document.documentElement).backgroundColor, rotulo: document.querySelector('[data-estacion-nombre]').textContent, theme: document.querySelector('meta[name=theme-color]').content }));
  await shot('invierno-hero');
  await ir(+h * 0.75, 2600); await shot('invierno-raices');
  // Proyectos: la señal de scroll y la guía del dial
  const ypr = await top('#proyectos'); const altoPr = await p.evaluate(() => document.querySelector('[data-pista]') && document.querySelector('#proyectos .pista').offsetHeight);
  await ir(ypr + (altoPr - +h) * 0.2, 600); await ir(ypr + (altoPr - +h) * 0.36, 600); await ir(ypr + (altoPr - +h) * 0.45, 9000);
  await shot('proyectos');
  R.proy = await p.evaluate(() => ({ pista: document.querySelector('[data-pista-scroll]').classList.contains('on'), guia: getComputedStyle(document.querySelector('[data-guia]')).display, n: document.querySelector('[data-guia-n]').textContent, bgEscenario: getComputedStyle(document.querySelector('[data-escenario]')).backgroundColor, capa: [...document.querySelectorAll('[data-capa]')].filter((c) => c.src).map((c) => c.src.split('/').pop()) }));
  if (R.proy.guia !== 'none') { await p.click('[data-giro="1"]'); await p.waitForTimeout(1200); R.proy.trasFlecha = await p.evaluate(() => document.querySelector('[data-guia-n]').textContent); await shot('proyectos-flecha'); }
  // Nuestros proyectos con voces
  const ya = await top('#anteriores'); await ir(ya - 40, 1400); await shot('nuestros-1'); await ir(ya + +h * 0.9, 1400); await shot('nuestros-2'); await ir(ya + +h * 1.8, 1400); await shot('nuestros-3'); await ir(ya + +h * 2.7, 1400); await shot('nuestros-4');
  R.voces = await p.evaluate(() => [...document.querySelectorAll('#anteriores .voz')].map((v) => { const r = v.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width)]; }));
  R.titulo2 = await p.evaluate(() => document.querySelector('#ant-h').textContent);
  // Servicios: hover
  const ys = await top('#servicios'); await ir(ys + 60, 1200); await shot('servicios');
  const nom = await p.$$('[data-nombre]');
  if (nom[1]) { const nb = await nom[1].boundingBox(); await p.mouse.move(nb.x + nb.width * 0.3, nb.y + nb.height / 2); await p.waitForTimeout(1100); await shot('servicios-hover'); }
  R.serv = await p.evaluate(() => ({ on: [...document.querySelectorAll('[data-servicio]')].map((x) => x.classList.contains('on')), tags: [...document.querySelectorAll('.servicio.on .tags .tag')].map((t) => getComputedStyle(t).opacity) }));
  await p.mouse.move(5, 5);
  const yl = await top('#la-savvia'); await ir(yl + 60, 1400); await shot('savvia');
  const ye = await top('#estudio'); await ir(ye - 200, 1000); await ir(ye + 200, 1600); await shot('estudio');
  const yq = await top('#preguntas'); await ir(yq, 1000); await shot('faq');
  R.overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify(R, null, 0));
  await b.close();
})();
