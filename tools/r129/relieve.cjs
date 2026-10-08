// RONDA 129 · el roble como RELIEVE en el papel: mapa de alturas (gris) a partir del roble del hero (arbol-otono.webp, el de savvia.studio).
// altura = silueta (solo lo bien entintado: las estelas tenues no cuentan) suavizada × (0,5 + 0,5 × luz de la lámina: hojas y corteza).
const sharp = require('sharp');
(async () => {
  const src = 'public/media/hero/arbol-otono.webp';
  const W = 1260;
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const n = info.width * info.height;
  const a = Buffer.alloc(n), l = Buffer.alloc(n);
  const ss = (e0, e1, x) => { const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
  for (let i = 0; i < n; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
    a[i] = Math.round(255 * ss(0.45, 0.85, data[i * 4 + 3] / 255));
    l[i] = Math.round(0.3 * r + 0.59 * g + 0.11 * b);
  }
  const raw = { raw: { width: info.width, height: info.height, channels: 1 } };
  const g1 = async (buf, s) => sharp(buf, raw).blur(s).extractChannel(0).raw().toBuffer();
  // fuera lo fino (estelas, línea de suelo): solo queda lo que sigue siendo denso tras un desenfoque ancho; luego, el bulto suave
  const ancho = await g1(a, 7);
  for (let i = 0; i < n; i++) a[i] = Math.round(a[i] * ss(0.42, 0.62, ancho[i] / 255));
  const ab = await g1(a, 2.5);
  const lb = await sharp(l, raw).blur(0.7).normalize().extractChannel(0).raw().toBuffer();
  const h = Buffer.alloc(n);
  for (let i = 0; i < n; i++) h[i] = Math.round(ab[i] * (0.5 + 0.5 * (lb[i] / 255)));
  // margen transparente alrededor (el gofrado no toca el canto de la textura)
  const M = 40;
  await sharp(h, raw).extend({ top: M, bottom: M, left: M, right: M, background: { r: 0, g: 0, b: 0 } }).extractChannel(0)
    .webp({ lossless: true }).toFile('public/media/manifiesto/roble-relieve.webp');
  const m = await sharp('public/media/manifiesto/roble-relieve.webp').metadata();
  console.log(m.width, m.height, m.channels);
  await sharp('public/media/manifiesto/roble-relieve.webp').resize(700).jpeg().toFile(process.argv[2] || '/dev/null');
})();
