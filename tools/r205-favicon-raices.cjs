// RONDA 205 · Eric, con la captura del hero: «el árbol realmente puede estar con sus raíces». El favicon es el ROBLE ENTERO del hero: la lámina del
// árbol (1260 × 583) y la de las raíces (1260 × 361) pegadas por la línea de suelo (comparten eje y suelo desde la ronda 66), sobre la noche de la
// estación. Sin tallos dibujados: el tronco y la raíz principal son el cuerpo. Salidas: favicon-<e>-32.png (pestaña), favicon-<e>.png (64) y
// apple-touch-icon-<e>.png (180). Uso: node tools/r205-favicon-raices.cjs [carpeta]  (ESC = ancho del árbol respecto al icono, 1,15: copa y raíces
// se salen un poco por los lados, que son lo más tenue; el tronco gana tamaño)
const sharp = require('sharp');
const SAL = process.argv[2] || 'public';
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
const ESC = Number(process.env.ESC || 1.15);
(async () => {
  for (const [e, fondo] of Object.entries(NOCHE)) {
    const N = 512, W = Math.round(N * ESC), HA = Math.round((W * 583) / 1260), HR = Math.round((W * 361) / 1260);
    const arbol = await sharp(`public/media/hero/arbol-${e}.webp`).resize(W, HA).png().toBuffer();
    const raices = await sharp(`public/media/hero/raices-${e}.webp`).resize(W, HR).png().toBuffer();
    // centrado en el tronco (x 0,507 de la lámina) y en vertical por la masa (la copa pesa más que las raíces: el suelo queda algo bajo el centro)
    const left = Math.round(N / 2 - W * 0.507), suelo = Math.round(N * 0.58);
    const G = N * 2, lienzo = await sharp({ create: { width: G, height: G, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: arbol, left: N / 2 + left, top: N / 2 + suelo - HA }, { input: raices, left: N / 2 + left, top: N / 2 + suelo }]).png().toBuffer();
    const recorte = await sharp(lienzo).extract({ left: N / 2, top: N / 2, width: N, height: N }).png().toBuffer();
    const cuadrado = await sharp({ create: { width: N, height: N, channels: 4, background: fondo } }).composite([{ input: recorte }]).png().toBuffer();
    const r = Math.round(N * 0.22);
    const mascara = await sharp(Buffer.from(`<svg width="${N}" height="${N}"><rect width="${N}" height="${N}" rx="${r}" fill="#fff"/></svg>`)).png().toBuffer();
    const redondo = await sharp(cuadrado).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
    await sharp(redondo).resize(32, 32).png().toFile(`${SAL}/favicon-${e}-32.png`);
    await sharp(redondo).resize(64, 64).png().toFile(`${SAL}/favicon-${e}.png`);
    await sharp(cuadrado).resize(180, 180).png().toFile(`${SAL}/apple-touch-icon-${e}.png`);
    console.log(e, 'ok');
  }
})();
