// Carriles (ronda 17): siempre puestos, sin botón; la sección 2 no lleva fila arriba. node tools/carriles.cjs [url]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, userAgent })).newPage();
  await p.goto(process.argv[2] || 'http://localhost:4340/', { waitUntil: 'load' }); await p.mouse.click(640, 100); await p.waitForTimeout(1500);
  console.log(JSON.stringify(await p.evaluate(() => { const ys = [...document.querySelectorAll('[data-marcas] .fila')].map((f) => parseInt(f.style.top)); const r = Math.round(document.querySelector('#recorrido').getBoundingClientRect().top + scrollY); return { boton: !!document.querySelector('[data-carriles-boton]'), filas: ys.length, filaEnSeccion2: ys.includes(r), x: [...document.querySelectorAll('.carriles .v')].map((v) => Math.round(v.getBoundingClientRect().x)), opacidad: getComputedStyle(document.querySelector('.carriles')).opacity }; })));
  await b.close();
})();
