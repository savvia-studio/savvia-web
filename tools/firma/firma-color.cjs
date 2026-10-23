// Firma · opciones a color (24/10 · Andoni: «más opciones: roble a color, con algo característico de la web…»).
//   savvia-firma-color-<est>.png  el roble de cada estación a color (los de Telegram, sin fondo) con los trazos de Andoni encima, recortado como la gris
//   savvia-firma-avatar-<est>.png el roble sobre la noche de su estación (el avatar de Telegram), esquinas redondeadas ya en la imagen
//   (fuera: «el de la gota de savia va fuera»)
const sharp = require('sharp'), path = require('path');
const PUB = path.join(__dirname, '../../public/descargas');
const EST = ['otono', 'invierno', 'primavera', 'verano'];
(async () => {
  // los trazos de Andoni, sacados de su lámina de Figma (lo casi negro), en su lienzo de 1248 × 912
  const { data, info } = await sharp(path.join(__dirname, 'andoni/firma-andoni-figma.webp')).flatten({ background: '#ffffff' }).raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, tr = Buffer.alloc(W * H * 4), gris = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const L = (0.299 * data[i * 3] + 0.587 * data[i * 3 + 1] + 0.114 * data[i * 3 + 2]) / 255;
    tr[i * 4] = 30; tr[i * 4 + 1] = 23; tr[i * 4 + 2] = 20; tr[i * 4 + 3] = Math.round(Math.max(0, Math.min(1, (0.52 - L) / 0.36)) * 255);
    gris[i] = Math.round(Math.min(1, (1 - L) / (1 - 30 / 255)) * 255);
  }
  const trazos = await sharp(tr, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
  // la caja de la masa, la misma que la firma gris (firma-figma.cjs)
  let x0 = W, x1 = 0, y0 = H, y1 = 0; const col = new Array(W).fill(0), fil = new Array(H).fill(0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (gris[y * W + x] > 70) { col[x]++; fil[y]++; }
  const mc = Math.max(...col) * 0.12, mf = Math.max(...fil) * 0.05;
  col.forEach((v, x) => { if (v > mc) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); } }); fil.forEach((v, y) => { if (v > mf) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); } });
  const caja = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
  for (const e of EST) {
    // el roble a color en el sitio de la plantilla (a 4×: 8, 56, 1200 × 820)
    const roble = await sharp(await sharp(path.join(__dirname, 'estaciones', `arbol-${e}.png`)).trim({ threshold: 1 }).toBuffer()).resize(1200, 820, { fit: 'fill' }).raw().toBuffer();
    for (let i = 3; i < roble.length; i += 4) roble[i] = Math.round(roble[i] * 0.78); // un punto transparente: los trazos se leen encima
    const lam = await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: roble, raw: { width: 1200, height: 820, channels: 4 }, left: 8, top: 56 }, { input: trazos }]).png().toBuffer();
    const ex = await sharp(lam).extract(caja).raw().toBuffer();
    for (let y = 0; y < caja.height; y++) for (let x = 0; x < caja.width; x++) {
      const i = (y * caja.width + x) * 4, k = (y0 + y) * W + (x0 + x); if (tr[k * 4 + 3] > 150) continue;
      const m = Math.min(x / (caja.width * 0.12), (caja.width - 1 - x) / (caja.width * 0.12), y / (caja.height * 0.1), 1);
      ex[i + 3] = Math.round(ex[i + 3] * m * m * (3 - 2 * m));
    }
    await sharp(ex, { raw: { width: caja.width, height: caja.height, channels: 4 } }).resize(Math.round(caja.width / 3)).png({ palette: true, colors: 32, dither: 0.8, compressionLevel: 9, effort: 10 }).toFile(path.join(PUB, `savvia-firma-color-${e}.png`));
    // avatar: el de Telegram, a 128 (se pinta a 64) con las esquinas al 22 %
    const R = 28, mask = Buffer.from(`<svg width="128" height="128"><rect width="128" height="128" rx="${R}" fill="#fff"/></svg>`);
    await sharp(path.join(PUB, `savvia-telegram-${e}.png`)).resize(128, 128).composite([{ input: mask, blend: 'dest-in' }]).png({ compressionLevel: 9 }).toFile(path.join(PUB, `savvia-firma-avatar-${e}.png`));
  }
  console.log('caja', caja, '→', Math.round(caja.width / 2), Math.round(caja.height / 2));
})();
