// Ronda 19 · Proyectos: iframe real, abanico (+), sentado. node tools/r19-proy.cjs [ancho alto] [motor]
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const [w = '1280', h = '720', motor = 'chrome'] = process.argv.slice(2);
const tag = `${motor}-${w}`;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => r.status() >= 400 && errs.push(`${r.status()} ${r.url()}`));
  await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.mouse.wheel(0, 10); await p.waitForTimeout(1500); // la rueda salta la carga
  const shot = (n) => p.screenshot({ path: `tools/shots/r19-proy-${tag}-${n}.jpg`, type: 'jpeg', quality: 82 });
  const top = (s) => p.evaluate((q) => document.querySelector(q).getBoundingClientRect().top + scrollY, s);
  const ir = async (y, ms = 900) => { await p.evaluate((yy) => scrollTo(0, yy), y); await p.waitForTimeout(ms); };
  const yq = await top('[data-pista]'), H = await p.evaluate(() => document.querySelector('[data-pista]').offsetHeight), T = H - +h;
  for (const f of [0.1, 0.25]) await ir(yq + T * f, 300);
  await ir(yq + T * 0.5, 6000); await shot('escena');
  const est = await p.evaluate(() => { const w = document.querySelector('[data-web]:not([hidden])'); const f = w.querySelector('iframe'); return { iframe: !!f, src: f && f.src, w: f && f.style.width, tr: f && f.style.transform, cargando: w.classList.contains('cargando'), url: document.querySelector('[data-url]').textContent }; });
  // abanico
  await p.click('[data-mas]'); await p.waitForTimeout(350); await shot('abanico-medio'); await p.waitForTimeout(700); await shot('abanico');
  const ab = await p.evaluate(() => { const a = document.querySelector('[data-abanico]'); const r = a.getBoundingClientRect(); return { abierto: a.classList.contains('abierto'), ests: [...a.querySelectorAll('.est')].map((e) => { const q = e.getBoundingClientRect(); return [Math.round(q.left + q.width / 2 - r.left - r.width / 2), Math.round(q.top + q.height / 2 - r.top - r.height / 2), getComputedStyle(e).opacity]; }) }; });
  await p.click('[data-est="verano"]'); await p.waitForTimeout(1800); await shot('verano');
  await p.click('[data-mas]'); await p.waitForTimeout(700); const cierraX = await p.evaluate(() => !document.querySelector('[data-abanico]').classList.contains('abierto')); await p.click('[data-mas]'); await p.waitForTimeout(900);
  const r20 = await p.evaluate(() => ({ sonidoEnAbanico: !!document.querySelector('[data-abanico] .grupo [data-sonido]'), sobreEscena: document.documentElement.classList.contains('sobre-escena'), navBlend: getComputedStyle(document.querySelector('[data-nav]')).mixBlendMode }));
  await p.mouse.click(+w / 2, 40); await p.waitForTimeout(800); // clic fuera: se cierra
  const cerrado = await p.evaluate(() => !document.querySelector('[data-abanico]').classList.contains('abierto'));
  // cambiar de proyecto y sentarse
  await p.click('[data-item][data-pos="9"]'); // la fila justo debajo del centro (la 5 queda fuera de la máscara: WebKit no la deja clicar) await p.waitForTimeout(4000);
  const est2 = await p.evaluate(() => { const ws = [...document.querySelectorAll('[data-web]')]; return { visibles: ws.filter((x) => !x.hidden).map((x) => x.dataset.web), montadas: ws.map((x) => !!x.firstElementChild), cargando: ws.filter((x) => !x.hidden)[0].classList.contains('cargando') }; });
  await p.click('[data-sentarse]'); await p.waitForTimeout(600); await shot('dolly'); await p.waitForTimeout(1200); await shot('sentado');
  const sent = await p.evaluate(() => { const w = document.querySelector('[data-web]:not([hidden])'); const f = w.querySelector('iframe'); const r = f.getBoundingClientRect(); return { iframeVisible: Math.round(r.width) + 'x' + Math.round(r.height), pantalla: (() => { const q = document.querySelector('[data-pantalla]').getBoundingClientRect(); return Math.round(q.width) + 'x' + Math.round(q.height); })() }; });
  // RONDA 21: la × de salir no debe abrir el menú; la barra sigue oculta hasta que la cámara se posa
  await p.click('[data-levantarse]'); await p.waitForTimeout(300);
  const x1 = await p.evaluate(() => ({ menu: document.documentElement.classList.contains('menu-abierto'), sentadoHtml: document.documentElement.classList.contains('estudio-sentado'), navOp: getComputedStyle(document.querySelector('[data-nav]')).opacity }));
  await p.waitForTimeout(1700);
  const x2 = await p.evaluate(() => ({ menu: document.documentElement.classList.contains('menu-abierto'), sentadoHtml: document.documentElement.classList.contains('estudio-sentado'), navOp: getComputedStyle(document.querySelector('[data-nav]')).opacity }));
  await p.mouse.click(+w - 58, 36); await p.waitForTimeout(700);
  const x3 = await p.evaluate(() => document.documentElement.classList.contains('menu-abierto'));
  if (x3) { await p.keyboard.press('Escape'); await p.waitForTimeout(600); }
  // salida y corte
  for (const f of [0.9, 1.0, 1.08]) { await ir(yq + T * f, 900); await shot(`salida-${f}`); }
  console.log(tag, 'errores:', errs.length ? errs : 'ninguno', JSON.stringify({ est, ab, cierraConX: cierraX, cerrado, est2, sent, r20, x1, x2, menuTrasEsperar: x3 }));
  await b.close();
})();
