// la imagen para compartir (ronda 140: el logotipo de raíces de la ronda 139, en la barra por diferencia; antes r83-og.cjs):
// el hero de otoño con el roble pintado; sin iconos, carriles ni hora (1200×630). Uso: node tools/r140-og.cjs [url]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const url = process.argv[2] || 'http://localhost:4322/';
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch (e) {} }); // sin animación de carga
  await p.goto(url + '?estacion=otono', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(14000);
  await p.addStyleTag({ content: '.acciones-nav,.carriles,.marcas,[data-carril-fila]::before,[data-hora],[class*=toolbarContainer]{opacity:0!important} [data-hora]{visibility:hidden!important}' });
  await p.waitForTimeout(300);
  await p.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 86 });
  await b.close();
})();
