// 28/10 · Eric: el lienzo de Figma de las láminas del caso de Neety, en la LAVANDA de Neety (#EEE8F7), como el look and feel («mejor rosa»; se probó
// transparente para ver el degradado dentro y no). Se rellena desde los bordes (solo el lienzo, no lo de dentro de los frames). Originales en tools/neety-figma/*-lienzo.webp.
// node tools/neety-figma/lienzo.cjs
const sharp = require('sharp'), fs = require('fs'), path = require('path');
const DIR = 'public/media/obra/neety', TOL = 10;
(async () => {
  for (const n of ['figma-look', 'figma-descartes', 'figma-libreria', 'figma-home', 'anim-figma']) {
    if (!fs.existsSync(path.join(DIR, n + '.webp')) && !fs.existsSync(path.join('tools/neety-figma', n + '-lienzo.webp'))) { console.log(n, 'no está: se salta'); continue; }
    const f = path.join(DIR, n + '.webp'), gris = path.join('tools/neety-figma', n + '-gris.webp'), copia = path.join('tools/neety-figma', n + '-lienzo.webp');
    if (!fs.existsSync(copia)) fs.copyFileSync(fs.existsSync(gris) ? gris : f, copia);
    const { data, info } = await sharp(copia).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = info, base = [data[0], data[1], data[2]];
    const cerca = (i) => Math.abs(data[i] - base[0]) <= TOL && Math.abs(data[i + 1] - base[1]) <= TOL && Math.abs(data[i + 2] - base[2]) <= TOL;
    const visto = new Uint8Array(w * h), pila = [];
    for (let x = 0; x < w; x++) pila.push(x, (h - 1) * w + x);
    for (let y = 0; y < h; y++) pila.push(y * w, y * w + w - 1);
    while (pila.length) {
      const p = pila.pop(); if (visto[p]) continue; visto[p] = 1;
      const i = p * 4; if (!cerca(i)) continue;
      data[i] = 0xee; data[i + 1] = 0xe8; data[i + 2] = 0xf7;
      const x = p % w, y = (p / w) | 0;
      if (x > 0) pila.push(p - 1); if (x < w - 1) pila.push(p + 1); if (y > 0) pila.push(p - w); if (y < h - 1) pila.push(p + w);
    }
    await sharp(data, { raw: { width: w, height: h, channels: 4 } }).webp({ quality: 88, alphaQuality: 90 }).toFile(f);
    console.log(n, 'ok');
  }
})();
