// Variantes de la elegida (Carattere, media, con aire) en el manifiesto, con la misma compensación que variantes.cjs:
// tamaño sobre la mayúscula del texto y distancia desde la tinta que queda a la altura de la «a».
// Modos: «linea» (apoyada en la base de la primera línea, la de la tanda 2), «hundida» (capitular clásica: de la altura
// de mayúscula de la 1.ª línea a la base de la 2.ª, el texto la rodea) y «colgada» (toda la S en el margen).
// uso: node carattere.cjs <dir> → <dir>/<id>.png + carattere.json
const fs = require('fs');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const CORAL = '#FF616B';
const V = [
  { id: 'elegida', nombre: 'La elegida', nota: 'Media y con aire, tal cual la votaste.', alto: 3.6, aire: 0.16 },
  { id: 'algo-menor', nombre: 'Algo menor', nota: 'Un 7 % más pequeña: más discreta.', alto: 3.35, aire: 0.16 },
  { id: 'algo-mayor', nombre: 'Algo mayor', nota: 'Un 8 % más grande: más presencia.', alto: 3.9, aire: 0.16 },
  { id: 'menos-aire', nombre: 'Menos aire', nota: 'La palabra un poco más cerca.', alto: 3.6, aire: 0.11 },
  { id: 'mas-aire', nombre: 'Más aire', nota: 'La palabra un poco más lejos.', alto: 3.6, aire: 0.23 },
  { id: 'hundida-alta', nombre: 'Hundida y alzada', nota: 'Baja hasta la base de la segunda línea y además sobresale por arriba: las dos líneas la rodean y gana presencia.', modo: 'hundida', sobre: 2.7, aire: 0.16 },
  { id: 'hundida', nombre: 'Hundida en dos líneas', nota: 'La capitular clásica: de la altura de mayúscula de la primera línea a la base de la segunda; las dos líneas la rodean.', modo: 'hundida', sobre: 1.8, aire: 0.16 },
  { id: 'colgada', nombre: 'Colgada en el margen', nota: 'Toda la S fuera de la columna: el texto empieza recto en el margen.', modo: 'colgada', alto: 3.6, aire: 0.16 },
  { id: 'coral', nombre: 'En coral', nota: 'La elegida en el coral de savvia, la única nota de color del párrafo.', alto: 3.6, aire: 0.16, color: CORAL },
  { id: 'hundida-coral', nombre: 'Hundida y en coral', nota: 'La capitular clásica, en coral.', modo: 'hundida', sobre: 1.8, aire: 0.16, color: CORAL },
  { id: 'mas-peso', nombre: 'Con más peso', nota: 'El trazo algo más grueso, para que pese como el texto.', alto: 3.6, aire: 0.16, trazo: 0.014 },
  { id: 'mas-peso-mayor', nombre: 'Más peso y algo mayor', nota: 'Más grande y con el trazo algo más grueso.', alto: 3.9, aire: 0.16, trazo: 0.014 },
];
(async () => {
  const b = await chromium.launch(launchOpts);
  const p = await b.newPage({ viewport: { width: 1280, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  await p.goto('http://localhost:4332/manifiesto?carga=0&estacion=otono', { waitUntil: 'networkidle' });
  await p.addStyleTag({ url: 'https://fonts.googleapis.com/css2?family=Carattere&display=block' });
  await p.evaluate(async () => { await document.fonts.load("100px 'Carattere'", 'S'); });
  const cap = p.locator('[data-cap]'); await cap.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  const par = cap.locator('xpath=ancestor::*[contains(@class,"parrafo")][1]');
  await par.evaluate((el) => { document.querySelectorAll('.parrafo, .firma-final').forEach((x) => { if (x !== el) x.style.visibility = 'hidden'; }); document.querySelectorAll('canvas, [data-raices], img').forEach((x) => (x.style.visibility = 'hidden')); });
  const bb = await par.boundingBox();
  const clip = { x: Math.max(0, bb.x - 150), y: bb.y - 150, width: bb.width + 200, height: bb.height + 200 };
  const med = await cap.evaluate((el) => {
    const pe = el.parentElement, cs = getComputedStyle(pe), c = document.createElement('canvas').getContext('2d');
    c.font = `100px ${cs.fontFamily}`; const xh = c.measureText('x').actualBoundingBoxAscent / 100, ch = c.measureText('H').actualBoundingBoxAscent / 100;
    const T = 400, cv = document.createElement('canvas'); cv.width = T * 3; cv.height = T * 3; const g = cv.getContext('2d');
    g.font = `${T}px 'Carattere'`; const m = g.measureText('S'); const ox = T, oy = T * 2; g.fillText('S', ox, oy);
    const d = g.getImageData(0, 0, cv.width, cv.height).data; const filas = []; let top = 1e9, bot = -1e9;
    for (let y = 0; y < cv.height; y++) { let l = 1e9, r = -1e9; for (let x = 0; x < cv.width; x++) if (d[(y * cv.width + x) * 4 + 3] > 40) { l = Math.min(l, x); r = Math.max(r, x); } if (r > -1e9) { top = Math.min(top, y); bot = Math.max(bot, y); } filas.push([(oy - y) / T, l < 1e9 ? (l - ox) / T : null, r > -1e9 ? (r - ox) / T : null]); }
    return { xh, ch, px: parseFloat(cs.fontSize), lh: parseFloat(cs.lineHeight) / parseFloat(cs.fontSize), top: (oy - top) / T, bot: (oy - bot) / T, av: m.width / T, filas, html: el.outerHTML };
  });
  console.log('texto: x', med.xh.toFixed(3), 'H', med.ch.toFixed(3), 'interlineado', med.lh.toFixed(3), 'em');
  const tinta = med.top - Math.min(0, med.bot);
  const banda = (fs, y0, y1) => med.filas.filter(([y, l]) => l !== null && y >= y0 / fs && y <= y1 / fs);
  const lista = [];
  for (const v of V) {
    const modo = v.modo || 'linea';
    // hundida: la tinta va de la altura de mayúscula de la 1.ª línea a la base de la 2.ª
    const altoEm = modo === 'hundida' ? med.lh + (v.sobre || 1) * med.ch : v.alto * med.ch;
    const fs = altoEm / tinta, baja = v.baja ? v.baja * med.lh : 0;
    // la franja que tiene que respetar la palabra: en «linea», la altura de x de la 1.ª línea; si la S baja, también la de la 2.ª
    const yLo = modo === 'hundida' ? -med.lh : -baja, yHi = modo === 'hundida' ? med.ch : med.xh - baja;
    const fr = banda(fs, yLo + (modo === 'hundida' ? 0 : baja) - baja, yHi), dch = Math.max(...fr.map((q) => q[2])), izq = Math.min(...fr.map((q) => q[1]));
    const derTodo = Math.max(...med.filas.filter((q) => q[2] !== null).map((q) => q[2]));
    await cap.evaluate((el, [v, modo, fs, izq, dch, derTodo, av, baja, lh, base]) => {
      el.removeAttribute('style'); el.innerHTML = ''; el.textContent = 'S';
      const comun = `font-family:'Carattere',cursive;font-weight:400;font-style:normal;letter-spacing:0;color:${v.color || 'inherit'};${v.trazo ? `-webkit-text-stroke:${v.trazo}em currentColor;` : ''}`;
      if (modo === 'hundida') {
        // un hueco flotante de dos líneas; dentro, la S en un SVG con la base en la base de la 2.ª línea
        const pe = el.parentElement; const sonda = document.createElement('span'); sonda.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
        el.textContent = ''; el.style.cssText = 'display:inline'; el.after(sonda);
        const P = parseFloat(getComputedStyle(pe).fontSize), base1 = sonda.getBoundingClientRect().top; sonda.remove();
        const ancho = (dch + v.aire / fs) * fs * P, x0 = -izq * fs * P;
        el.style.cssText = `display:block;float:left;position:relative;width:${ancho + x0}px;height:${lh * P * 2 - 2}px;margin:0;`;
        const top0 = el.getBoundingClientRect().top;
        el.innerHTML = `<svg width="1" height="1" style="position:absolute;left:0;top:${(base1 - top0) + lh * P}px;overflow:visible"><text x="${x0}" y="0" style="${comun}font-size:${fs * P}px">S</text></svg>`;
        if (v.color) el.querySelector('text').setAttribute('fill', v.color); else el.querySelector('text').setAttribute('fill', 'currentColor');
        return;
      }
      if (modo === 'colgada') {
        // toda la tinta a la izquierda del margen, con su aire; el avance total es 0: la palabra empieza en el margen
        const ml = -v.aire / fs - derTodo; el.style.cssText = comun + `font-size:${fs}em;line-height:0;vertical-align:baseline;margin-left:${ml.toFixed(4)}em;margin-right:${(-ml - av).toFixed(4)}em;`;
        return;
      }
      el.style.cssText = comun + `font-size:${fs}em;line-height:0;vertical-align:${(-baja / fs).toFixed(4)}em;margin-left:${(-izq - 0.02 / fs).toFixed(4)}em;margin-right:${(dch - av + v.aire / fs).toFixed(4)}em;`;
    }, [v, modo, fs, izq, dch, derTodo, med.av, baja, med.lh]);
    if (v.id === 'elegida') console.log('ELEGIDA', JSON.stringify(await cap.evaluate((el) => el.style.cssText)));
    await p.waitForTimeout(150);
    await p.screenshot({ path: `${OUT}/${v.id}.png`, clip });
    lista.push({ id: v.id, nombre: v.nombre, nota: v.nota });
  }
  fs.writeFileSync(`${OUT}/carattere.json`, JSON.stringify(lista));
  console.log(lista.length, 'variantes'); await b.close();
})();
