// RONDA 307, 26.ª · «Storybook: añadir los nuevos filtros en componentes»: la barra REAL del portfolio (la de Eric), capturada cerrada y con «Tecnología»
// abierto → public/media/sistema/componentes/filtros-{cerrado,abierto}.png (2×)
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
(async () => {
  const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })).newPage();
  await p.goto('http://localhost:4332/proyectos?carga=0', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  await p.addStyleTag({ content: '[class*=toolbarContainer],[class*=styles-module__toolbar],#reviewRoot,.barra-nav,.mosaico,.carriles,[data-chat]{opacity:0 !important}' });
  const barra = p.locator('.mandos.barra-f').first(); await barra.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
  const r = await barra.boundingBox(); const pad = 24;
  await p.screenshot({ path: 'public/media/sistema/componentes/filtros-cerrado.png', clip: { x: r.x - pad, y: r.y - pad, width: r.width + pad * 2, height: r.height + pad * 2 } });
  await p.locator('[data-desp="tec"] [data-desp-b]').click(); await p.waitForTimeout(900);
  const m = await p.locator('[data-desp="tec"] [data-desp-menu]').boundingBox();
  const x0 = Math.min(r.x, m.x) - pad, y0 = Math.min(r.y, m.y) - pad, x1 = Math.max(r.x + r.width, m.x + m.width) + pad, y1 = Math.max(r.y + r.height, m.y + m.height) + pad;
  await p.screenshot({ path: 'public/media/sistema/componentes/filtros-abierto.png', clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
  console.log('barra', r, 'menú', m);
  await b.close();
})();
