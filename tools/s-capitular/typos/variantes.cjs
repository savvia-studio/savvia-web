// Variantes de las S votadas, compensadas a ojo de tipógrafo, no por la caja de la letra:
// - TAMAÑO: la tinta mide ALTO veces la altura de mayúscula del texto (no del cuerpo), apoyada en la línea base.
// - DISTANCIA: la «a» se pega a la tinta que hay en la franja de la altura de x del texto (donde está la «a»), no al
//   borde de la caja: un adorno que vuela por arriba puede pasar por encima de la palabra.
// - MARGEN: lo que cae en esa franja empieza en el margen; lo que vuela fuera, cuelga.
// uso: node variantes.cjs <dir> → <dir>/<slug>.png + variantes.json
const fs = require('fs');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const F = ['Lavishly Yours', 'Herr Von Muellerhoff', 'Imperial Script', 'Carattere'];
const ALTOS = [[3.0, 'pequeña'], [3.6, 'media'], [4.2, 'grande'], [4.8, 'muy grande']]; // ≈ 2 · 2,4 · 2,8 · 3,2 veces el cuerpo
const AIRES = [[0.02, 'pegada'], [0.08, 'justa'], [0.16, 'con aire']];
const slug = (f) => f.toLowerCase().replace(/ /g, '-');
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4332/manifiesto?carga=0&estacion=otono', { waitUntil: 'networkidle' });
  await p.addStyleTag({ url: `https://fonts.googleapis.com/css2?${F.map((f) => 'family=' + f.replace(/ /g, '+')).join('&')}&display=block` });
  await p.evaluate(async (F) => { for (const f of F) await document.fonts.load(`100px '${f}'`, 'S'); }, F);
  const cap = p.locator('[data-cap]'); await cap.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  const par = cap.locator('xpath=ancestor::*[contains(@class,"parrafo")][1]');
  await par.evaluate((el) => { document.querySelectorAll('.parrafo, .firma-final').forEach((x) => { if (x !== el) x.style.visibility = 'hidden'; }); document.querySelectorAll('canvas, [data-raices], img').forEach((x) => (x.style.visibility = 'hidden')); });
  const bb = await par.boundingBox();
  const clip = { x: Math.max(0, bb.x - 120), y: bb.y - 150, width: bb.width + 170, height: bb.height + 190 };
  // medidas de la letra del texto (altura de x y de mayúscula, en em del párrafo) y de cada S (perfil de tinta por filas)
  const med = await cap.evaluate((el, F) => {
    const cs = getComputedStyle(el.parentElement), c = document.createElement('canvas').getContext('2d');
    c.font = `100px ${cs.fontFamily}`; const xh = c.measureText('x').actualBoundingBoxAscent / 100, ch = c.measureText('H').actualBoundingBoxAscent / 100;
    const S = {};
    for (const f of F) {
      const T = 400, cv = document.createElement('canvas'); cv.width = T * 3; cv.height = T * 3; const g = cv.getContext('2d');
      g.font = `${T}px '${f}'`; const m = g.measureText('S'); const ox = T, oy = T * 2; g.fillText('S', ox, oy);
      const d = g.getImageData(0, 0, cv.width, cv.height).data; const filas = [];
      let top = 1e9, bot = -1e9;
      for (let y = 0; y < cv.height; y++) { let l = 1e9, r = -1e9; for (let x = 0; x < cv.width; x++) if (d[(y * cv.width + x) * 4 + 3] > 40) { l = Math.min(l, x); r = Math.max(r, x); } if (r > -1e9) { top = Math.min(top, y); bot = Math.max(bot, y); } filas.push([l, r]); }
      // todo en em de la letra; y hacia arriba desde la base
      S[f] = { top: (oy - top) / T, bot: (oy - bot) / T, av: m.width / T, filas: filas.map(([l, r], y) => [(oy - y) / T, l < 1e9 ? (l - ox) / T : null, r > -1e9 ? (r - ox) / T : null]) };
    }
    return { xh, ch, S };
  }, F);
  console.log('texto: altura de x', med.xh.toFixed(3), 'mayúscula', med.ch.toFixed(3));
  const lista = [];
  for (const f of F) {
    const s = med.S[f], tinta = s.top - Math.min(0, s.bot);
    for (const [alto, nA] of ALTOS) {
      const fs = (alto * med.ch) / tinta; // em del párrafo
      // franja de la «a»: de la base a la altura de x del texto, en em de la letra
      const yX = med.xh / fs; const banda = s.filas.filter(([y, l]) => l !== null && y >= 0 && y <= yX);
      const dch = Math.max(...banda.map((q) => q[2])), izq = Math.min(...banda.map((q) => q[1]));
      for (const [aire, nD] of AIRES) {
        const id = `${slug(f)}-${nA.replace(/ /g, '-')}-${nD.replace(/ /g, '-')}`;
        await cap.evaluate((el, [f, fs, izq, dch, av, aire]) => {
          el.textContent = 'S';
          el.style.cssText = `font-family:'${f}',cursive;font-size:${fs}em;line-height:0;font-weight:400;font-style:normal;letter-spacing:0;vertical-align:baseline;` +
            `margin-left:${(-izq - 0.02 / fs).toFixed(4)}em;margin-right:${(dch - av + aire / fs).toFixed(4)}em;`;
        }, [f, fs, izq, dch, s.av, aire]);
        await p.waitForTimeout(100);
        await p.screenshot({ path: `${OUT}/${id}.png`, clip });
        lista.push({ slug: id, fuente: f, tam: nA, dist: nD, alto, aire });
      }
    }
  }
  fs.writeFileSync(`${OUT}/variantes.json`, JSON.stringify(lista));
  console.log(lista.length, 'variantes'); await b.close();
})();
