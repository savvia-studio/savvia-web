// hoja de contactos: node tools/r83/hoja.cjs salida.jpg columnas img1 img2 …
const sharp = require('sharp');
(async () => {
  const [out, cols, ...fs] = process.argv.slice(2); const C = +cols, w = 640;
  const metas = await Promise.all(fs.map((f) => sharp(f).metadata()));
  const h = Math.round((w * metas[0].height) / metas[0].width), R = Math.ceil(fs.length / C);
  const comp = await Promise.all(fs.map(async (f, i) => ({ input: await sharp(f).resize(w, h).toBuffer(), left: (i % C) * w, top: Math.floor(i / C) * h })));
  await sharp({ create: { width: w * C, height: h * R, channels: 3, background: '#000' } }).composite(comp).jpeg({ quality: 78 }).toFile(out);
})();
