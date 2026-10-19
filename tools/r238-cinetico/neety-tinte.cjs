// RONDA 255 · «cambia colores» de verdad: la misma sección de neety.com con sus variables de color cambiadas (no un filtro)
const { chromium, launchOpts, userAgent } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const PAL = JSON.parse(process.argv[2] || '[{}]'), SECC = process.argv[3] || '0,815', OUT = process.argv[4] || 'neety/tinte';
(async () => { const b = await chromium.launch(launchOpts); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent })).newPage();
  await p.goto('https://neety.treseiscero.app/home', { waitUntil: 'load' }); await p.waitForTimeout(2500);
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(200); }
  const [y0, hh] = SECC.split(',').map(Number);
  await p.addStyleTag({ content: '*{transition:none!important}' });
  for (let i = 0; i < PAL.length; i++) {
    await p.evaluate((v) => {
      const { hue, ...vars } = v;
      for (const [k, c] of Object.entries(vars)) document.documentElement.style.setProperty(k, c);
      // los degradados de Neety son imágenes: se reteñen con el tono de la paleta (solo los medios, no el texto)
      let st = document.getElementById('tinte-r255'); if (!st) { st = document.createElement('style'); st.id = 'tinte-r255'; document.head.appendChild(st); }
      st.textContent = hue ? `main img, main canvas, main video, main [style*="gradient"], main [class*="grad"] { filter: hue-rotate(${hue}deg) saturate(1.05) !important; }` : '';
    }, PAL[i]);
    await p.evaluate((y) => scrollTo(0, y), y0); await p.waitForTimeout(900);
    await p.screenshot({ path: `${OUT}-${i}.jpg`, type: 'jpeg', quality: 85, clip: { x: 0, y: 0, width: 1120, height: 900 } });
  }
  await b.close(); })();
