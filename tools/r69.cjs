// Ronda 69 · FAQ recta, transición en marrón, la carga solo la primera vez
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const ctx = await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  await p.goto('http://localhost:4321/'); await p.waitForTimeout(1200);
  const primera = await p.evaluate(() => document.documentElement.classList.contains('cargando'));
  await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1500);
  await p.reload(); await p.waitForTimeout(800);
  const segunda = await p.evaluate(() => ({ cargando: document.documentElement.classList.contains('cargando'), velo: !!document.querySelector('[data-cargador]') }));
  await p.goto('http://localhost:4321/?carga=1'); await p.waitForTimeout(800);
  const forzada = await p.evaluate(() => document.documentElement.classList.contains('cargando'));
  await p.evaluate(() => document.querySelector('[data-saltar]')?.click()); await p.waitForTimeout(1200);
  const y = await p.evaluate(() => document.querySelector('[data-preguntas]').getBoundingClientRect().top + scrollY + 60);
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(1500);
  await p.evaluate(() => window.__faq?.(2)); await p.waitForTimeout(2600);
  await p.screenshot({ path: `tools/shots/r69-faq-${motor}-${W}.jpg`, quality: 70 });
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
  await p.evaluate(() => [...document.querySelectorAll('a[href="/proyectos"]')][0]?.click());
  await p.waitForTimeout(420); await p.screenshot({ path: `tools/shots/r69-vt-${motor}-${W}-a.jpg`, quality: 60 });
  await p.waitForTimeout(700); await p.screenshot({ path: `tools/shots/r69-vt-${motor}-${W}-b.jpg`, quality: 60 }).catch(() => {});
  await p.waitForTimeout(500); await p.screenshot({ path: `tools/shots/r69-vt-${motor}-${W}-c.jpg`, quality: 60 }).catch(() => {});
  console.log(motor, W, errs.length ? errs : 'sin errores', JSON.stringify({ primera, segunda, forzada }));
  await b.close();
})();
