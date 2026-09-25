// Ronda 59 · sonidos grabados: el ambiente de cada estación del estudio y la impresora de la receta se cargan, se decodifican y suenan
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', url = process.argv[3] || 'http://localhost:4332/';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch({ ...launchOpts, args: [...(launchOpts.args || []), '--autoplay-policy=no-user-gesture-required'] });
  const p = await (await b.newContext({ viewport: { width: 1280, height: 800 }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = [], mp3 = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('response', (r) => { if (r.url().includes('/media/sonido/')) mp3.push(`${r.status()} ${r.url().split('/').pop()}`); });
  await p.addInitScript(() => localStorage.setItem('savvia:sonido', '1'));
  await p.goto(url); await p.waitForTimeout(1500); await p.keyboard.press('Escape'); await p.waitForTimeout(800);
  await p.mouse.click(5, 400);
  // el estudio
  await p.evaluate(() => document.querySelector('#proyectos, [data-pista]')?.scrollIntoView()); await p.waitForTimeout(3500);
  const s1 = await p.evaluate(() => window.__sonido?.());
  // la receta
  await p.evaluate(() => document.querySelector('[data-receta]').scrollIntoView()); await p.waitForTimeout(400);
  for (let i = 0; i < 30; i++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(60); }
  await p.waitForTimeout(1500);
  const r = await p.evaluate(() => window.__receta());
  console.log(motor, errs.length ? errs : 'sin errores', '| mp3:', mp3.join(', '), '| estudio:', JSON.stringify(s1), '| receta:', r.impreso, r.sonido);
  await b.close();
})();
