// RECONSTRUIDO por el agente del manifiesto (ronda 155): el original de este archivo lo borré por error al limpiar tools/r155/. Reconstruido a partir
// de tools/r140-og.cjs y de lo que dice AGENTS.md («sin el (+) flotante; og.jpg?v=155»). Revisar antes de volver a usarlo.
// La imagen para compartir: el hero de otoño con el roble pintado; sin iconos, carriles, hora ni el (+) flotante (1200×630). Uso: node tools/r155/og.cjs [url]
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const url = process.argv[2] || 'http://localhost:4322/';
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch (e) {} }); // sin animación de carga
  await p.goto(url + '?estacion=otono', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(14000);
  await p.addStyleTag({ content: '.acciones-nav,.carriles,.marcas,.mando,[data-carril-fila]::before,[data-hora],[class*=toolbarContainer]{opacity:0!important} [data-hora]{visibility:hidden!important}' });
  await p.waitForTimeout(300);
  await p.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 86 });
  await b.close();
})();
