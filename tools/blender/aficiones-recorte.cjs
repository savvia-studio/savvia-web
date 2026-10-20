// RONDA 265 · recorta cada render de tools/blender/aficiones.py a un cuadrado alrededor del objeto y funde los bordes (la sombra del captador
// llega hasta el canto del render y dejaba un cuadrado) → public/media/equipo/aficiones3d/<nombre>.webp, 320 px
// ronda 267 (3.ª) · argumentos opcionales: carpeta de origen y de destino (la lámina usa los renders pintados: out/aficiones-gouache → equipo/lamina)
const sharp = require('sharp');
const [ORIGEN = 'tools/blender/out/aficiones', DESTINO = 'public/media/equipo/aficiones3d'] = process.argv.slice(2);
(async () => {
  for (const n of ['balon', 'mando', 'cafe', 'futbol', 'azada', 'airpods']) {
    const src = `${ORIGEN}/${n}.png`;
    const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 160) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const s = Math.round(Math.max(x1 - x0, y1 - y0) * 1.3), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 + s * 0.04;
    const L = Math.max(0, Math.min(info.width - s, Math.round(cx - s / 2))), T = Math.max(0, Math.min(info.height - s, Math.round(cy - s / 2)));
    const v = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><defs><radialGradient id="g"><stop offset=".62" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`);
    const recorte = await sharp(src).extract({ left: L, top: T, width: s, height: s }).ensureAlpha().composite([{ input: v, blend: 'dest-in' }]).png().toBuffer();
    await sharp(recorte).resize(320, 320).webp({ quality: 86, alphaQuality: 90 }).toFile(`${DESTINO}/${n}.webp`);
    console.log(n, s);
  }
})();
