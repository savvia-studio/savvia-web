// RONDA 189 · logotipos de la cuadrícula a un mismo tamaño: cada logo se rasteriza a mucha resolución, se le RECORTA el aire (trim por alfa)
// y se guarda como PNG en public/media/logos/cuadricula/<slug>.png; la proporción y la densidad de tinta salen al JSON para la talla
const sharp = require('sharp'), fs = require('fs'), path = require('path');
const fuente = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')); // [{slug, src}]
(async () => {
  const out = {};
  for (const { slug, src } of fuente) {
    // densidad según el tamaño del dibujo (un SVG en unidades de fuente, a 600 ppp, pasaba del límite de píxeles)
    const m0 = await sharp(path.join('public', src), { density: 72 }).metadata();
    const img = sharp(path.join('public', src), { density: Math.min(600, Math.max(1, 72 * 480 / m0.height)), limitInputPixels: false }).ensureAlpha();
    const alto = 240, buf = await img.resize({ height: Math.max(alto, Math.round(alto * 1)), fit: 'inside' }).png().toBuffer();
    const recortado = await sharp(buf).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 }).png().toBuffer({ resolveWithObject: true });
    const a = await sharp(recortado.data).extractChannel(3).stats();
    // (30/10 · rendimiento) en WebP sin pérdida (es una máscara: cuenta el alfa), un 36 % menos que el PNG
    fs.writeFileSync(`public/media/logos/cuadricula/${slug}.webp`, await sharp(recortado.data).webp({ lossless: true, effort: 6 }).toBuffer());
    out[slug] = { r: +(recortado.info.width / recortado.info.height).toFixed(3), tinta: +(a.channels[0].mean / 255).toFixed(3), w: recortado.info.width, h: recortado.info.height };
  }
  console.log(JSON.stringify(out, null, 1));
})();
