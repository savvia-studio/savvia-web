// 28/10 · Eric: «estas fotos, ¿las puedes tratar para que sean más bonitas? Ese fondo típico de Figma no sé yo».
// La lámina «look and feel» del caso de Neety ya no es una captura del lienzo (gris, rótulos «Neety Concept…»,
// avatares): cada frame se exporta limpio del Figma (get_screenshot, 1039 px de ancho) y aquí se recorta a su primera pantalla
// (1512 × 984 en el frame) y se monta en rejilla sobre la lavanda de Neety, con esquinas redondeadas y un filo.
// Uso: node tools/neety-figma/laminas.cjs <carpeta look (01..17.png)>
const sharp = require('sharp');
const path = require('path');

const FONDO = '#EEE8F7'; // lavanda de Neety (proyectos.ts › colores[0])
const PROP = 984 / 1512; // primera pantalla del frame
const ANCHO = 2400, MARGEN = 80, HUECO = 40;

async function pieza(archivo, w) {
  const h = Math.round(w * PROP);
  const r = Math.round(w * 0.028);
  const meta = await sharp(archivo).metadata();
  const img = await sharp(archivo)
    .extract({ left: 0, top: 0, width: meta.width, height: Math.round(meta.width * PROP) })
    .resize(w, h, { kernel: 'lanczos3' })
    .toBuffer();
  const mascara = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" fill="#fff"/></svg>`);
  const filo = Buffer.from(`<svg width="${w}" height="${h}"><rect x=".5" y=".5" width="${w - 1}" height="${h - 1}" rx="${r}" fill="none" stroke="#21127a" stroke-opacity=".1"/></svg>`);
  return sharp(img).composite([{ input: mascara, blend: 'dest-in' }, { input: filo }]).png().toBuffer();
}

async function lamina(filas, cols, salida) {
  const w = Math.floor((ANCHO - 2 * MARGEN - (cols - 1) * HUECO) / cols);
  const h = Math.round(w * PROP);
  const alto = 2 * MARGEN + filas.length * h + (filas.length - 1) * HUECO;
  const capas = [];
  for (const [i, fila] of filas.entries()) {
    for (const [j, archivo] of fila.entries()) {
      capas.push({ input: await pieza(archivo, w), left: MARGEN + j * (w + HUECO), top: MARGEN + i * (h + HUECO) });
    }
  }
  await sharp({ create: { width: ANCHO, height: alto, channels: 3, background: FONDO } })
    .composite(capas).webp({ quality: 82, effort: 6 }).toFile(salida);
  console.log(salida, ANCHO, '×', alto);
}

const [look] = process.argv.slice(2);
const f = (dir, ns) => ns.map((n) => path.join(dir, String(n).padStart(2, '0') + '.png'));
const DEST = path.join(__dirname, '../../public/media/obra/neety');
(async () => {
  // look: una fila por concepto (1.1 · 1.2 · 2.x · 3.x)
  await lamina([f(look, [1, 2, 3, 4, 5]), f(look, [6, 7, 8, 9, 10]), f(look, [14, 15, 16, 17]), f(look, [11, 12, 13])], 5, path.join(DEST, 'figma-look.webp'));
})();
