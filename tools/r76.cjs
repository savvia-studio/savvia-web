// Ronda 76 · capturas del feedback de Eric: árbol en invierno y primavera, dolores, destacados (sin ondas, sentado redondeado), Más proyectos (reel, cuadrícula,
// fondos de marca, teléfono), Servicios sin «N de 16», la impresora abajo, el pie (nieve, flores, CTA sin parpadeo)
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
const URL = process.env.URL || 'http://localhost:4331/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 2, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse|playground/i.test(m.text()) && errs.push(m.text()));
  await p.goto(URL); await p.waitForTimeout(5500);
  const S = `tools/shots/r76-${motor}-${W}`;
  const ir = async (sel, f = 0, espera = 1500) => { const y = await p.evaluate(([s, f]) => { const e = document.querySelector(s); return e.getBoundingClientRect().top + scrollY + e.offsetHeight * f; }, [sel, f]); await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(espera); };
  const foto = (n) => p.screenshot({ path: `${S}-${n}.jpg`, quality: 70 });
  const estacion = async (n) => { await p.evaluate((n) => { const w = window; if (w.__fijarEstacion) w.__fijarEstacion(n); else document.querySelector('[data-estacion-ic]')?.click(); }, n); await p.waitForTimeout(3500); };
  await foto('hero-otono');
  // 1 · el árbol en invierno y en primavera (el icono de la barra avanza una estación cada clic: otoño → invierno → primavera)
  await p.click('[data-estacion-ic]'); await p.waitForTimeout(4000); await foto('hero-invierno');
  await p.click('[data-estacion-ic]'); await p.waitForTimeout(4000); await foto('hero-primavera');
  // 2 · dolores
  await ir('[data-dolores]', 0.18, 3000); await foto('dolores-1');
  await ir('[data-dolores]', 0.42, 3000); await foto('dolores-2');
  // 3 · destacados: el titular sin ondas
  await ir('#proyectos', 0.02, 1500); await foto('destacados-titular');
  // 4 · Más proyectos
  await ir('#anteriores', 0, 2500); await foto('mas-1');
  await ir('[data-cuadricula]', -0.2, 3500); await foto('mas-cuadricula');
  const piezas = await p.$$('#anteriores [data-pieza]');
  await ir('#anteriores [data-slug="remerge"]', -0.3, 2000); await foto('mas-remerge');
  await ir('#anteriores [data-slug="isotrol"]', -0.2, 2000); await foto('mas-isotrol');
  await ir('#anteriores [data-slug="routal"]', -0.2, 2000); await foto('mas-routal');
  // 5 · Servicios
  await ir('#servicios', 0.05, 1800); await foto('servicios');
  // 6 · la receta: la impresora
  await ir('#la-savvia', 0.02, 1800); await foto('receta-a');
  await ir('#la-savvia', 0.2, 2500); await foto('receta-b');
  // 7 · pie en primavera (la web está en primavera) y el CTA al pasar
  await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(9000); await foto('pie-primavera');
  const bb = await p.$eval('[data-contacta]', (e) => { const r = e.getBoundingClientRect(); return { x: r.left + r.width * 0.12, y: r.top + r.height * 0.5 }; });
  const clases = [];
  await p.mouse.move(bb.x, bb.y, { steps: 4 });
  for (let i = 0; i < 10; i++) { await p.mouse.move(bb.x + i * 3, bb.y + (i % 2), { steps: 2 }); await p.waitForTimeout(90); clases.push(await p.evaluate(() => document.querySelector('[data-pie]').classList.contains('cta-abierto') ? 1 : 0)); }
  await p.waitForTimeout(800); await foto('pie-cta');
  await p.mouse.move(5, 5); await p.waitForTimeout(800);
  const cerrado = await p.evaluate(() => !document.querySelector('[data-pie]').classList.contains('cta-abierto'));
  // invierno en el pie
  await p.click('[data-estacion-ic]'); await p.waitForTimeout(1500); await p.click('[data-estacion-ic]'); await p.waitForTimeout(1500); await p.click('[data-estacion-ic]'); await p.waitForTimeout(7000);
  await foto('pie-invierno');
  // 8 · sentado (redondeos)
  await ir('#proyectos', 0.45, 2500);
  await p.evaluate(() => document.querySelector('[data-sentarse]')?.click()); await p.waitForTimeout(3200); await foto('sentado');
  const desb = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(JSON.stringify({ motor, W, errs, ctaDurantePasar: clases.join(''), ctaCerradoAlSalir: cerrado, desborde: desb, piezas: piezas.length }));
  await b.close();
})();
