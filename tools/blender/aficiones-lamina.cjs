// RONDA 267 · la LÁMINA: los renders pintados (aficiones.py con PINTADO=1) recortados en cuadrado y con grano de papel DENTRO del dibujo (luz suave sobre
// un ruido fino; fuera, transparente) → public/media/equipo/lamina/<nombre>.webp, 360 px
const sharp = require('sharp'), fs = require('fs');
const D = 'public/media/equipo/lamina/'; fs.mkdirSync(D, { recursive: true });
(async () => {
  for (const n of ['balon', 'mando', 'cafe', 'futbol', 'azada', 'airpods']) {
    const src = `tools/blender/out/aficiones-pintado/${n}.png`;
    const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 30) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const s = Math.round(Math.max(x1 - x0, y1 - y0) * 1.12), L = Math.max(0, Math.round((x0 + x1 - s) / 2)), T = Math.max(0, Math.round((y0 + y1 - s) / 2));
    const w = Math.min(s, info.width - L), h = Math.min(s, info.height - T);
    const base = await sharp(src).extract({ left: L, top: T, width: w, height: h }).resize(720, 720, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    const ruido = Buffer.alloc(720 * 720); for (let i = 0; i < ruido.length; i++) ruido[i] = 128 + Math.round((Math.random() - 0.5) * 70);
    const grano = await sharp(ruido, { raw: { width: 720, height: 720, channels: 1 } }).blur(0.6).toColourspace('srgb').png().toBuffer();
    const conGrano = await sharp(base).composite([{ input: grano, blend: 'soft-light' }]).png().toBuffer();
    const recortado = await sharp(conGrano).composite([{ input: base, blend: 'dest-in' }]).png().toBuffer(); // sharp redimensiona ANTES de componer: en dos pasos
    await sharp(recortado).resize(360, 360).webp({ quality: 88, alphaQuality: 92 }).toFile(`${D}${n}.webp`);
    console.log(n);
  }
})();
