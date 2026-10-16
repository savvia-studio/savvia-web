// RONDA 207 · Andoni: «el árbol no entra bien: más espacio por arriba y que no se corte por los lados» → «el favicon tiene que conservar el estilo del hero».
// La lámina del hero de cada estación TAL CUAL (con sus estelas, su trama y sus colores; sin limpiar ni simplificar, como la ronda 156), más grande
// que en la 156 y con aire arriba: el núcleo del roble ocupa el 70 % del ancho y lo que sobresale (las estelas) se DESVANECE antes de llegar al borde
// (máscara horizontal), así que nada queda cortado. Fondo, la noche de la estación. Uso: node tools/r207/favicon.cjs [salida] (por defecto, public/)
const sharp = require('sharp');
const OUT = process.argv[2] || 'public';
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
const NUCLEO = { otono: [292, 912], invierno: [349, 833], primavera: [292, 919], verano: [287, 920] }; // medido en tools/r206/favicon.cjs
(async () => {
  const N = 512, LW = 1260, LH = 583;
  for (const [e, fondo] of Object.entries(NOCHE)) {
    const [a, b] = NUCLEO[e], k = Math.min((N * 0.7) / (b - a), (N * 0.72) / LH);
    const w = Math.round(LW * k), h = Math.round(LH * k), cx = ((a + b) / 2) * k, left = Math.round(N / 2 - cx), top = N - Math.round(N * 0.1) - h;
    const sl = Math.max(0, -left), sw = Math.min(w, N - left) - sl; // la lámina es más ancha que el icono: se recorta a lo que cae dentro
    const lamina = await sharp(await sharp(`public/media/hero/arbol-${e}.webp`).resize(w, h).png().toBuffer()).extract({ left: sl, top: 0, width: sw, height: h }).png().toBuffer();
    // las estelas se apagan de 80 % a 94 % del icono, a cada lado
    const fade = Buffer.from(`<svg width="${N}" height="${N}"><defs><linearGradient id="g"><stop offset="0.06" stop-color="#fff" stop-opacity="0"/><stop offset="0.2" stop-color="#fff"/><stop offset="0.8" stop-color="#fff"/><stop offset="0.94" stop-color="#fff" stop-opacity="0"/></linearGradient></defs><rect width="${N}" height="${N}" fill="url(#g)"/></svg>`);
    const capa = await sharp({ create: { width: N, height: N, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: lamina, left: left + sl, top }]).png().toBuffer();
    const arbol = await sharp(capa).composite([{ input: await sharp(fade).png().toBuffer(), blend: 'dest-in' }]).png().toBuffer();
    const cuadrado = await sharp({ create: { width: N, height: N, channels: 4, background: fondo } }).composite([{ input: arbol }]).png().toBuffer();
    const r = Math.round(N * 0.22);
    const mascara = await sharp(Buffer.from(`<svg width="${N}" height="${N}"><rect width="${N}" height="${N}" rx="${r}" fill="#fff"/></svg>`)).png().toBuffer();
    const redondo = await sharp(cuadrado).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
    await sharp(redondo).resize(64, 64, { kernel: 'lanczos3' }).png().toFile(`${OUT}/favicon-${e}.png`);
    await sharp(cuadrado).resize(180, 180, { kernel: 'lanczos3' }).png().toFile(`${OUT}/apple-touch-icon-${e}.png`);
    console.log(e, { w, h, left, top });
  }
})();
