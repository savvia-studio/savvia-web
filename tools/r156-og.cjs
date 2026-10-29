// RONDA 156 · la imagen para compartir: el hero de otoño con el roble pintado y el logotipo SIN isotipo (Eric); sin iconos, carriles, hora, radio ni
// Agentation (1200×630). Uso: node tools/r156-og.cjs [url] [salida]; la inglesa (29/10): node tools/r156-og.cjs https://savvia.studio/en/ public/og-en.jpg  (Playwright del entorno de Ship Studio en el Mac de Eric; en el de Andoni, el pw.cjs de savvia_inspo)
const pw = require('/Users/ericruiz/.ship-studio/playwright-env/node_modules/playwright-core');
const url = process.argv[2] || 'http://localhost:3935/';
(async () => {
  const b = await pw.chromium.launch({ headless: true });
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
  await p.goto(url + (url.includes('?') ? '&' : '?') + 'estacion=otono&carga=0&feedback=0', { waitUntil: 'load' });
  await p.waitForTimeout(12000);
  await p.addStyleTag({ content: '.acciones-nav,.carriles,.marcas,.radio,[data-carril-fila]::before,[data-hora],.esquina,[class*=toolbarContainer],[class*=styles-module__toolbar],#reviewRoot{opacity:0!important} .esquina,[data-hora]{visibility:hidden!important}' });
  await p.waitForTimeout(400);
  await p.screenshot({ path: process.argv[3] || 'public/og.jpg', type: 'jpeg', quality: 86 });
  await b.close();
})();
