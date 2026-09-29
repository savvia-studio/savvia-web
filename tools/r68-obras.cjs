// Ronda 68 · las miniaturas de /proyectos: cada navegador, teléfono o pantalla ENTERO dentro de su pieza (rejilla y orden libre), capturas
const { chromium, webkit, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome', W = +(process.argv[3] || 1280), H = W > 600 ? 720 : 844;
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: W, height: H }, userAgent: motor === 'webkit' ? undefined : userAgent })).newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(String(e)));
  const medir = () => p.evaluate(() => [...document.querySelectorAll('[data-pieza-obra]')].filter((a) => a.offsetParent).map((a) => {
    const l = a.querySelector('.lamina').getBoundingClientRect(), m = a.querySelector('.mockup, .telefono-m, .mesa .pantalla').getBoundingClientRect();
    const fuera = Math.max(0, l.left - m.left, m.right - l.right, l.top - m.top, m.bottom - l.bottom);
    return [a.getAttribute('href').split('/').pop(), Math.round(fuera)];
  }).filter((x) => x[1] > 1));
  await p.goto('http://localhost:4321/proyectos'); await p.waitForTimeout(2500);
  const r1 = await medir();
  for (let y = 0, i = 0; y < 5000; y += H * 0.9, i++) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(400); await p.screenshot({ path: `tools/shots/r68-obras-${motor}-${W}-${i}.jpg`, quality: 60 }); if (await p.evaluate(() => innerHeight + scrollY >= document.body.scrollHeight - 5)) break; }
  const libre = await p.$('[data-orden="libre"], [data-libre], button:has-text("Libre")');
  let r2 = 'sin botón';
  if (libre) { await libre.click(); await p.waitForTimeout(1500); r2 = await medir(); const y = await p.evaluate(() => document.querySelector('[data-pieza-obra]:not([data-destacado])') ? 0 : 0); void y; }
  console.log(motor, W, errs.length ? errs : 'sin errores', 'fuera (rejilla):', JSON.stringify(r1), 'fuera (libre):', JSON.stringify(r2));
  await b.close();
})();
