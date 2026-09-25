// Ronda 54 · cuatro apartados REALES del manual de Neety (neety.treseiscero.app/library), para el ejemplo de «Equipos con IA» en Servicios
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const sharp = require('sharp');
const PASOS = [['recibir', 'Recibir el proyecto'], ['cambiar', 'Cambiar contenido'], ['secciones', 'Añadir secciones nuevas'], ['practicas', 'Buenas prácticas al pedir cambios']];
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 960 }, deviceScaleFactor: 1.5, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/library', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {}); await p.waitForTimeout(2000);
  for (const [n, t] of PASOS) {
    const y = await p.evaluate((txt) => { const h = [...document.querySelectorAll('h2,h3')].find((e) => e.textContent.trim() === txt); return h ? h.getBoundingClientRect().top + scrollY : null; }, t);
    if (y == null) { console.log('sin', t); continue; }
    await p.evaluate((yy) => scrollTo(0, yy - 60), y); await p.waitForTimeout(700);
    const png = await p.screenshot({ clip: { x: 300, y: 0, width: 980, height: 735 } });
    await sharp(png).resize(760).webp({ quality: 80 }).toFile(`public/media/servicios/manual-${n}.webp`);
    console.log(n, 'ok');
  }
  await b.close();
})();
