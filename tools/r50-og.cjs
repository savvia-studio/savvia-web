// la imagen para compartir (ronda 50): el hero con el roble pintado y el logotipo NUEVO en la barra; sin iconos ni carriles (1200×630)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.goto('http://localhost:4331/?estacion=otono', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(500); await p.keyboard.press('Escape'); await p.waitForTimeout(7000);
  await p.addStyleTag({ content: '.acciones-nav,.carriles,.marcas,[data-carril-fila]::before{opacity:0!important}' });
  await p.waitForTimeout(300);
  await p.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 86 });
  await b.close();
})();
