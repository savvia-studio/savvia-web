// el hero REAL en sus cuatro estaciones, sin barra, botones ni titular (el título lo pone el reel)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => { const b = await chromium.launch(launchOpts);
  for (const e of ['otono', 'invierno', 'primavera', 'verano']) {
    const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 }, userAgent })).newPage();
    await p.goto(`http://localhost:4332/?carga=0&estacion=${e}`, { waitUntil: 'load' }); await p.waitForTimeout(7000);
    await p.addStyleTag({ content: '[data-nav],.cf,.cf-btn,.cf-panel,[data-radio],[class*="radio"],nav,header,[class*="toolbarContainer"]{display:none!important} .hero h1,.hero .titular p,.hero .sub{visibility:hidden!important}' });
    await p.evaluate(() => document.querySelectorAll('body *').forEach((el) => { const s = getComputedStyle(el); if (s.position === 'fixed' && !el.closest('.hero') && el.getBoundingClientRect().width < 200) el.style.display = 'none'; }));
    await p.waitForTimeout(400);
    console.log(e, await p.evaluate(() => document.documentElement.dataset.estacion));
    await p.screenshot({ path: `/Users/andonimart/Desktop/savvia/savvia-web-main/tools/r238-cinetico/hf/assets/hero-${e}.jpg`, type: 'jpeg', quality: 90 });
    await p.context().close();
  } await b.close(); })();
