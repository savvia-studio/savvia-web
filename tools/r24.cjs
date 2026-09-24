// Ronda 24 · rótulos del marco, FAQ, gota con scroll, hierba de acuarela, enlace de Otros, La Savvia, barra sobre claro. node tools/r24.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(5500);
  const shot = (n) => p.screenshot({ path: `tools/shots/r24-${tag}-${n}.jpg`, type: 'jpeg', quality: 84 });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  await shot('hero');
  const hero = await p.evaluate(() => { const m = document.querySelector('.marco').getBoundingClientRect(), e = document.querySelector('[data-estacion-rotulo]').getBoundingClientRect(), d = document.querySelector('.desde').getBoundingClientRect(); return { est: document.querySelector('[data-estacion-nombre]').textContent, dentro: e.right <= m.right + 1 && e.bottom <= m.bottom + 1 && d.left >= m.left - 1, opE: getComputedStyle(document.querySelector('[data-estacion-rotulo]')).opacity, dataEst: document.querySelector('[data-hero]').dataset.estacion }; });
  // la gota con el scroll: tres puntos del progreso
  const yf = await top('[data-fila]');
  const gotas = [];
  for (const f of [0.95, 0.8, 0.66]) { await ir(yf - +h * f, 500); gotas.push(await p.evaluate(() => [getComputedStyle(document.querySelector('[data-gota-raiz]')).opacity, document.querySelector('[data-gota-raiz]').style.transform.slice(0, 40), document.querySelector('[data-fila]').classList.contains('despierta')])); await shot(`gota-${f}`); }
  await ir(yf - +h * 0.55, 900);
  const despierta = await p.evaluate(() => document.querySelector('[data-fila]').classList.contains('despierta'));
  // La Savvia: sin sticky, sin subtítulo, un solo botón
  const ys = await top('#la-savvia'); await ir(ys + 100, 1200); await shot('savvia');
  const sav = await p.evaluate(() => ({ sticky: getComputedStyle(document.querySelector('[data-plato]')).position, botones: document.querySelectorAll('.acciones button').length, sub: !!document.querySelector('#la-savvia .text-sub'), sobreClaro: document.documentElement.classList.contains('sobre-claro'), navBlend: getComputedStyle(document.querySelector('[data-nav]')).mixBlendMode }));
  // Otros: el enlace junto al titular, pegado a la línea
  const ya = await top('#anteriores'); await ir(ya - 40, 1200);
  const todos = await p.$('.todos'); const rb = await todos.boundingBox(); await p.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await p.waitForTimeout(800); await shot('otros-hover');
  const otros = await p.evaluate(() => { const t = document.querySelector('.todos').getBoundingClientRect(), wr = document.querySelector('#anteriores .wrap').getBoundingClientRect(); return { pegado: Math.round(wr.right - t.right), color: getComputedStyle(document.querySelector('.todos')).color }; });
  await p.mouse.move(5, 5);
  // Estudio: la hierba de acuarela
  const ye = await top('#estudio'); await ir(ye - 100, 800); await ir(ye + 600, 1800); await shot('estudio');
  // FAQ
  const yq = await top('#preguntas'); await ir(yq - 60, 1000);
  await p.click('[data-faq]:nth-of-type(2) summary'); await p.waitForTimeout(250); await shot('faq-abriendo'); await p.waitForTimeout(500); await shot('faq-abierta');
  const faq = await p.evaluate(() => [...document.querySelectorAll('[data-faq]')].map((d) => [d.open, Math.round(d.querySelector('[data-cuerpo]').offsetHeight)]));
  await p.click('[data-faq]:nth-of-type(2) summary'); await p.waitForTimeout(600);
  const faq2 = await p.evaluate(() => [...document.querySelectorAll('[data-faq]')].map((d) => d.open));
  // el pie: la barra en Cacao sobre lo claro
  const H = await p.evaluate(() => document.documentElement.scrollHeight); await ir(H, 1500);
  const pie = await p.evaluate(() => ({ sobreClaro: document.documentElement.classList.contains('sobre-claro'), navColor: getComputedStyle(document.querySelector('[data-nav]')).color, blend: getComputedStyle(document.querySelector('[data-nav]')).mixBlendMode, alto: document.querySelector('[data-pie]').offsetHeight, pitch: document.querySelector('[data-pie] .text-sub').textContent.trim() }));
  await shot('pie');
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify({ hero, gotas, despierta, sav, otros, faq, faq2, pie }));
  await b.close();
})();
