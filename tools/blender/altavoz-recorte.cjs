// recorta cada altavoz (y su capa de conos, con el MISMO recorte) a la silueta y los pasa a webp; escribe dónde queda el centro del woofer
const sharp = require('sharp'), fs = require('fs');
(async () => {
  const meta = JSON.parse(fs.readFileSync('tools/blender/out/altavoz.json')), out = {};
  for (const l of ['izq', 'der']) {
    const { data, info } = await sharp(`tools/blender/out/altavoz-${l}.png`).raw().toBuffer({ resolveWithObject: true });
    let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 8) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    const r = { left: x0 - 2, top: y0 - 2, width: x1 - x0 + 5, height: y1 - y0 + 5 };
    await sharp(`tools/blender/out/altavoz-${l}.png`).extract(r).webp({ quality: 90, alphaQuality: 100 }).toFile(`public/media/estudio/altavoz-${l}.webp`);
    await sharp(`tools/blender/out/cono-${l}.png`).extract(r).webp({ quality: 90, alphaQuality: 100 }).toFile(`public/media/estudio/cono-${l}.webp`);
    const [wx, wy] = meta[l].woofer;
    out[l] = { w: r.width, h: r.height, woofer: [+((wx * info.width - r.left) / r.width).toFixed(4), +((wy * info.height - r.top) / r.height).toFixed(4)] };
  }
  console.log(JSON.stringify(out));
})();
