// RONDA 83 · Vivaldi en Proyectos destacados: el (+) abre, «Vivaldi» enciende la música de la estación, cambiar de estación cambia de movimiento
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch({ ...launchOpts, args: [...(launchOpts.args || []), '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent: motor === 'webkit' ? undefined : userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e))); p.on('console', (m) => m.type() === 'error' && !/s\.t|zernio|multiverse|playground/i.test(m.text()) && errs.push(m.text()));
  const pedidas = []; p.on('request', (r) => /vivaldi/.test(r.url()) && pedidas.push(r.url().split('/').pop()));
  await p.goto(process.env.URL || 'http://localhost:4332/'); await p.waitForTimeout(2000);
  const y = await p.$eval('#proyectos', (e) => e.getBoundingClientRect().top + scrollY + e.offsetHeight * 0.45);
  await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(2500);
  await p.evaluate(() => document.querySelector('[data-mas]').click());
  await p.waitForTimeout(800);
  await p.mouse.click(20, 400); await p.waitForTimeout(3500); // ronda 85: el sonido va encendido de serie; basta un gesto
  const a = await p.evaluate(() => window.__sonido());
  await p.screenshot({ path: `tools/shots/r83-vivaldi-${motor}.jpg`, quality: 70 });
  await p.evaluate(() => document.querySelector('[data-est="invierno"], .est[aria-label*="nvierno"]')?.click()); await p.waitForTimeout(3000);
  const c = await p.evaluate(() => window.__sonido());
  console.log(JSON.stringify({ motor, errs, pedidas, antes: a, despues: c }));
  await b.close();
})();
