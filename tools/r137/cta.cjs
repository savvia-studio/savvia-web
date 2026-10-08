const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = '/Users/andonimart/Desktop/savvia/savvia-web/tools/shots/';
const B = 'http://localhost:4322';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function hoverFrames(page, sel, name, times, pad = 24, css = '') {
  if (css) await page.addStyleTag({ content: css });
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded(); await wait(600);
  const b = await el.boundingBox();
  const clip = { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: b.width + pad * 2, height: b.height + pad * 2 };
  await page.mouse.move(b.x - 60, b.y + b.height / 2); await wait(300);
  await page.screenshot({ path: OUT + `r137-cta-${name}-0reposo.jpg`, clip, quality: 92 });
  await page.mouse.move(b.x + 6, b.y + b.height * 0.5);
  let t0 = Date.now();
  for (const t of times) { const d = t - (Date.now() - t0); if (d > 0) await wait(d); await page.screenshot({ path: OUT + `r137-cta-${name}-${String(t).padStart(4, '0')}.jpg`, clip, quality: 92 }); }
  await page.mouse.move(b.x - 60, b.y - 60); await wait(900);
}
(async () => {
  const br = await chromium.launch(launchOpts);
  const ctx = await br.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent });
  await ctx.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch {} });
  const page = await ctx.newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  // claro: caso
  await page.goto(B + '/proyectos/remerge', { waitUntil: 'networkidle' }); await wait(1500);
  await hoverFrames(page, '.caso .ver', 'claro', [150, 350, 900]);
  // flecha: fotogramas
  await hoverFrames(page, '.caso .ver', 'flecha', [40, 120, 200, 280, 380, 560], 6);
  // oscuro: 404 (A filo)
  await page.goto(B + '/no-existe-r137', { waitUntil: 'networkidle' }); await wait(1800);
  await hoverFrames(page, '.perdida .btn-primary', 'oscuro-A', [150, 350, 900], 40);
  // oscuro B: invertido a niebla
  await page.goto(B + '/no-existe-r137', { waitUntil: 'networkidle' }); await wait(1800);
  await hoverFrames(page, '.perdida .btn-primary', 'oscuro-B', [150, 350, 900], 40, '.btn-primary{background-color:#eadde7!important;color:#302018!important;box-shadow:none!important;--btn-bano:#fff!important}');
  // invierno
  await page.goto(B + '/no-existe-r137?estacion=invierno', { waitUntil: 'networkidle' }); await wait(3200);
  await hoverFrames(page, '.perdida .btn-primary', 'invierno', [350, 900], 40);
  // handbook
  await page.goto(B + '/handbook/la-receta', { waitUntil: 'networkidle' }); await wait(1500);
  await hoverFrames(page, '.par.despues', 'hb', [120, 260, 450, 900], 16);
  // secundario
  await page.goto(B + '/handbook', { waitUntil: 'networkidle' }); await wait(1500);
  await hoverFrames(page, '.btn-secondary', 'secundario', [150, 300, 700], 16);
  console.log('errs', errs);
  await br.close();
})();
