// RONDA 156 · Eric: «si no hacemos isotipo en el favicon tiene que estar solo el background principal, y ese background se cambia con la estación;
// igual sí que podemos poner el árbol en pequeño». Un favicon POR ESTACIÓN: la noche de la estación (la paleta de la ronda 152) con su roble
// (la lámina del hero, public/media/hero/arbol-<estación>.webp) pequeño, con el pie abajo. 64 px con las esquinas redondeadas (favicon) y 180 px a
// sangre (icono de iPhone). Base.astro elige el de la estación al cargar y lo cambia al cambiarla. Uso: node tools/r156-favicon.cjs
const sharp = require('sharp');
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
(async () => {
  for (const [e, fondo] of Object.entries(NOCHE)) {
    const N = 512, W = Math.round(N * 0.96), H = Math.round((W * 583) / 1260);
    const arbol = await sharp(`public/media/hero/arbol-${e}.webp`).resize(W, H).toBuffer();
    const base = sharp({ create: { width: N, height: N, channels: 4, background: fondo } }).composite([{ input: arbol, left: Math.round((N - W) / 2), top: N - H - Math.round(N * 0.17) }]).png();
    const cuadrado = await base.toBuffer();
    // favicon: esquinas redondeadas (22 %)
    const r = Math.round(N * 0.22);
    const mascara = await sharp(Buffer.from(`<svg width="${N}" height="${N}" viewBox="0 0 ${N} ${N}"><rect width="${N}" height="${N}" rx="${r}" fill="#fff"/></svg>`)).resize(N, N).png().toBuffer();
    const redondo = await sharp(cuadrado).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer(); // sharp compone DESPUÉS de redimensionar: en dos pasos
    await sharp(redondo).resize(64, 64).png().toFile(`public/favicon-${e}.png`);
    await sharp(cuadrado).resize(180, 180).png().toFile(`public/apple-touch-icon-${e}.png`);
    console.log(e, 'ok');
  }
})();
