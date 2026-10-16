// Monta un paquete de favicons de Andoni (carpetas primavera/verano/otono/invierno con favicon-64.png y favicon-180.png, esquinas redondeadas transparentes):
// favicon-<e>.png = su 64 px; apple-touch-icon-<e>.png = su 180 a sangre, con cada esquina rellena del color que tiene al lado (iOS pinta de negro lo
// transparente y redondea él; con el haz de luz de la v6, un solo color dejaba canto). Uso: node tools/r213/montar.cjs <carpeta del zip>
const sharp = require('sharp'), fs = require('fs'); const D = process.argv[2];
(async () => { for (const e of ['primavera', 'verano', 'otono', 'invierno']) {
  fs.copyFileSync(`${D}/${e}/favicon-64.png`, `public/favicon-${e}.png`);
  const { data, info } = await sharp(`${D}/${e}/favicon-180.png`).ensureAlpha().raw().toBuffer({ resolveWithObject: true }); const W = info.width, out = Buffer.from(data);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) { const i = (y * W + x) * 4; if (data[i + 3] === 255) continue;
    let cx = x, cy = y; for (let k = 0; k < W / 3; k++) { cx += x < W / 2 ? 1 : -1; cy += y < W / 2 ? 1 : -1; if (data[(cy * W + cx) * 4 + 3] > 250) break; }
    const j = (cy * W + cx) * 4, a = data[i + 3] / 255; for (let c = 0; c < 3; c++) out[i + c] = Math.round(data[i + c] * a + data[j + c] * (1 - a)); out[i + 3] = 255; }
  await sharp(out, { raw: { width: W, height: W, channels: 4 } }).png().toFile(`public/apple-touch-icon-${e}.png`); console.log(e, 'ok'); } })();
