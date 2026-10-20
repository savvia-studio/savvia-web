// RONDA 268 · capturas para comparar los estilos de las aficiones: Andoni y Eric con sus aficiones abiertas (Chrome, 1280 × 720, DPR 2), recortadas a la pareja
// node tools/r268-comparar/capturar.cjs <salida> <equipo|''>
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const S = '/private/tmp/claude-501/-Users-andonimart-Desktop-savvia-savvia-web/c2fddab7-65f3-4450-b3da-d2f265b9f4e4/scratchpad/comparar/';
require('fs').mkdirSync(S, { recursive: true });
const [nombre, eq = ''] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2, userAgent })).newPage();
  await p.goto(`http://localhost:4332/?carga=0${eq ? '&equipo=' + eq : ''}`, { waitUntil: 'load' }); await p.waitForTimeout(1500);
  await p.evaluate(() => document.querySelector('[data-juntos]').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1800);
  await p.evaluate(() => { for (const el of document.querySelectorAll('body *')) if (getComputedStyle(el).position === 'fixed') { el.style.visibility = 'hidden'; el.style.opacity = '0'; } });
  const r = await (await p.$('[data-juntos]')).boundingBox();
  for (const [q, fx] of [['andoni', 0.39], ['eric', 0.58]]) {
    await p.mouse.move(r.x + r.width * fx, r.y + r.height * 0.5); await p.waitForTimeout(3200);
    await p.screenshot({ path: S + `${nombre}-${q}.png`, clip: { x: 540, y: 150, width: 700, height: 440 } });
    await p.mouse.move(5, 5); await p.waitForTimeout(700);
  }
  await b.close(); console.log(nombre, 'ok');
})();
