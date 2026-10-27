const { chromium, webkit, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const motor = process.argv[2] || 'chrome';
(async () => {
  const b = motor === 'webkit' ? await webkit.launch() : await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = [];
  p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => m.type() === 'error' && errs.push(m.text())); p.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  const D = 'tools/r307-story/' + motor + '-';
  await p.goto('http://localhost:4332/sistema'); await p.waitForTimeout(800); const tras = p.url();
  await p.screenshot({ path: D + '0-portada.png' });
  const indices = await p.evaluate(() => [...document.querySelectorAll('.indice-g')].map((e) => e.textContent));
  // construcción a mitad y entera
  await p.evaluate(() => document.getElementById('construccion').scrollIntoView()); await p.waitForTimeout(2600); await p.screenshot({ path: D + '1-construccion-a-mitad.png' });
  await p.waitForTimeout(3500); await p.screenshot({ path: D + '2-construccion.png' });
  // estaciones: índice visible y selector
  await p.evaluate(() => document.querySelector('[data-escena-est]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(800);
  const ind = await p.evaluate(() => { const i = document.querySelector('.indice'); const r = i.getBoundingClientRect(); return { op: getComputedStyle(i).opacity, top: Math.round(r.top), vis: r.bottom > 0 && r.top < innerHeight }; });
  const est0 = await p.evaluate(() => document.documentElement.dataset.estacion);
  await p.click('[data-punto="1"]'); await p.waitForTimeout(1600); await p.screenshot({ path: D + '3-estaciones-invierno.png' });
  const est1 = await p.evaluate(() => [document.documentElement.dataset.estacion, document.querySelector('[data-punto="1"]').getAttribute('aria-checked')]);
  await p.click('[data-punto="3"]'); await p.waitForTimeout(1600); await p.screenshot({ path: D + '4-estaciones-verano.png' });
  await p.click('[data-punto="0"]'); await p.waitForTimeout(800);
  // iconografía y movimiento
  await p.evaluate(() => document.getElementById('iconografia').scrollIntoView()); await p.waitForTimeout(600); await p.screenshot({ path: D + '5-iconos.png' });
  await p.evaluate(() => document.querySelector('[data-cta-demo]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(2200); await p.screenshot({ path: D + '6-movimiento.png' });
  const lleno = await p.evaluate(() => document.querySelector('[data-cta-boton]').classList.contains('demo-hover'));
  await p.evaluate(() => document.querySelector('.dl-firmas')?.scrollIntoView({ block: 'center' })); await p.waitForTimeout(600); await p.screenshot({ path: D + '7-firma.png' });
  const desb = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  await p.goto('http://localhost:4332/lab'); await p.waitForTimeout(1500); await p.screenshot({ path: D + '8-lab.png' });
  console.log(motor, { tras, indices, indice: ind, est0, est1, botonLleno: lleno, desborde: desb, errs: errs.filter((e) => !e.includes('interactive-widget')) });
  await b.close();
})();
