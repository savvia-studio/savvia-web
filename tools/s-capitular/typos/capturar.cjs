// S y s de muchas caligráficas de Google Fonts (OFL), puestas como capitular en el primer párrafo del manifiesto.
// Misma regla para todas: la tinta mide ALTO veces el cuerpo, se apoya en la línea base, cuelga un poco por la izquierda
// y la palabra sigue pegada a la tinta. uso: node capturar.cjs <dir> → <dir>/<slug>-S.png, <slug>-s.png, fuentes.json
const fs = require('fs');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const F = ['Herr Von Muellerhoff', 'Mr De Haviland', 'Mrs Saint Delafield', 'Monsieur La Doulaise', 'Mr Dafoe', 'Mrs Sheppards', 'Miss Fajardose', 'Dr Sugiyama',
  'Parisienne', 'Pinyon Script', 'Imperial Script', 'Great Vibes', 'Alex Brush', 'Italianno', 'Petit Formal Script', 'Rouge Script', 'Allura', 'Tangerine',
  'Ephesis', 'WindSong', 'Corinthia', 'Luxurious Script', 'Mea Culpa', 'Ballet', 'Lovers Quarrel', 'Arizonia', 'Ruthie', 'Qwigley', 'Sacramento', 'Allison',
  'Euphoria Script', 'Birthstone', 'Babylonica', 'Ingrid Darling', 'Water Brush', 'Send Flowers', 'Island Moments', 'Monte Carlo', 'Updock', 'Lavishly Yours',
  'Hurricane', 'Comforter', 'Estonia', 'The Nautigal', 'Moon Dance', 'Vujahday Script', 'Love Light', 'Inspiration', 'Cherish', 'Ms Madi', 'Gwendolyn',
  'Bonheur Royale', 'Style Script', 'Rochester', 'Meddon', 'Kristi', 'Clicker Script', 'Niconne', 'Engagement', 'Grey Qo', 'Explora', 'Fleur De Leah', 'Princess Sofia'];
const ALTO = 2.5, HANG = 0.12, AIRE = 0.04;
const slug = (f) => f.toLowerCase().replace(/ /g, '-');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4332/manifiesto?carga=0&estacion=otono', { waitUntil: 'networkidle' });
  for (let i = 0; i < F.length; i += 20) await p.addStyleTag({ url: `https://fonts.googleapis.com/css2?${F.slice(i, i + 20).map((f) => 'family=' + f.replace(/ /g, '+')).join('&')}&display=block` });
  const ok = await p.evaluate(async (F) => { const r = {}; for (const f of F) { try { await document.fonts.load(`100px '${f}'`, 'Ss'); } catch {} r[f] = document.fonts.check(`100px '${f}'`, 'Ss'); } return r; }, F);
  const validas = F.filter((f) => ok[f]); console.log('no cargan:', F.filter((f) => !ok[f]).join(', ') || 'ninguna');
  const cap = p.locator('[data-cap]'); await cap.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  const par = cap.locator('xpath=ancestor::*[contains(@class,"parrafo")][1]');
  await par.evaluate((el) => { document.querySelectorAll('.parrafo, .firma-final').forEach((x) => { if (x !== el) x.style.visibility = 'hidden'; }); document.querySelectorAll('canvas, [data-raices], img').forEach((x) => (x.style.visibility = 'hidden')); });
  const bb = await par.boundingBox();
  const clip = { x: Math.max(0, bb.x - 100), y: bb.y - 130, width: bb.width + 150, height: bb.height + 170 };
  for (const f of validas) for (const L of ['S', 's']) {
    await cap.evaluate((el, [f, L, ALTO, HANG, AIRE]) => {
      const cv = document.createElement('canvas').getContext('2d'); cv.font = `100px '${f}'`; const m = cv.measureText(L);
      const tinta = (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) / 100; const fs = ALTO / tinta; // em del párrafo
      const izq = -m.actualBoundingBoxLeft / 100, der = m.actualBoundingBoxRight / 100, av = m.width / 100; // en em de la letra
      el.textContent = L;
      el.style.cssText = `font-family:'${f}',cursive;font-size:${fs}em;line-height:0;font-weight:400;font-style:normal;letter-spacing:0;` +
        `margin-left:${(-izq - HANG / fs).toFixed(3)}em;margin-right:${(der - av + AIRE / fs).toFixed(3)}em;vertical-align:baseline;`;
    }, [f, L, ALTO, HANG, AIRE]);
    await p.waitForTimeout(120);
    await p.screenshot({ path: `${OUT}/${slug(f)}-${L === 'S' ? 'mayus' : 'minus'}.png`, clip });
  }
  fs.writeFileSync(`${OUT}/fuentes.json`, JSON.stringify(validas));
  console.log(validas.length, 'fuentes,', validas.length * 2, 'capturas');
  await b.close();
})();
