// RONDA 307, 26.ª · «Storybook: Aplicaciones, todo se tiene que adaptar a las estaciones»: la imagen para compartir de cada estación (el hero de esa estación,
// como og.jpg: sin iconos, carriles ni Agentation; 1200 × 630) → public/media/sistema/aplicaciones/og-<estación>.jpg. La de las redes sigue siendo og.jpg.
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts);
  for (const e of ['otono', 'invierno', 'primavera', 'verano']) {
    const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage();
    await p.goto(`http://localhost:4332/?estacion=${e}&carga=0&feedback=0`, { waitUntil: 'load' }); await p.waitForTimeout(11000);
    await p.addStyleTag({ content: '.acciones-nav,.carriles,.marcas,.radio,[data-carril-fila]::before,[data-hora],.esquina,[class*=toolbarContainer],[class*=styles-module__toolbar],#reviewRoot,[data-chat],.chat-flotante{opacity:0 !important}' });
    await p.waitForTimeout(400);
    await p.screenshot({ path: `public/media/sistema/aplicaciones/og-${e}.jpg`, type: 'jpeg', quality: 84 });
    console.log(e); await p.close();
  }
  await b.close();
})();
