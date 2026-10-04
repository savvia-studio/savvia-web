// la imagen para compartir (ronda 83: el isotipo con el vértice más a la derecha; antes ronda 68): el hero con el roble pintado y el logotipo en la barra;
// sin iconos ni carriles ni hora (1200×630). En el Mac de Eric: node tools/r83-og.cjs [url]   (astro dev --background → ver el puerto con astro dev status)
const { chromium } = require(process.env.PW || '/Users/ericruiz/.ship-studio/playwright-env/node_modules/playwright');
const url = process.argv[2] || 'http://localhost:3935/';
(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
  await p.addInitScript(() => { try { localStorage.setItem('savvia:carga', '1'); } catch (e) {} }); // sin animación de carga
  await p.goto(url + '?estacion=otono', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(9000);
  await p.addStyleTag({ content: '.acciones-nav,.carriles,.marcas,[data-carril-fila]::before,[data-hora]{opacity:0!important} [data-hora]{visibility:hidden!important}' });
  await p.waitForTimeout(300);
  await p.screenshot({ path: 'public/og.jpg', type: 'jpeg', quality: 86 });
  await b.close();
})();
