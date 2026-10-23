// Firma (23/10, 4.ª): las líneas las dibuja Andoni en Figma sobre la plantilla (tools/firma/andoni/firma-andoni-figma.webp, a 4×, fondo blanco).
// El blanco se vuelve transparente: cada píxel pasa a tinta (#1E1714) con alfa = lo oscuro que es, así el roble gris y los trazos se ven igual
// sobre cualquier fondo claro. Se recorta el margen vacío y se guarda a 2×.  node firma-figma.cjs <salida.png>
const sharp = require('sharp'), path = require('path');
(async () => {
  const { data, info } = await sharp(path.join(__dirname, 'andoni/firma-andoni-figma.webp')).flatten({ background: '#ffffff' }).raw().toBuffer({ resolveWithObject: true });
  const o = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const L = (0.299 * data[i * 3] + 0.587 * data[i * 3 + 1] + 0.114 * data[i * 3 + 2]) / 255;
    let a = 1 - L; a = a < 0.02 ? 0 : a;
    o[i * 4] = 30; o[i * 4 + 1] = 23; o[i * 4 + 2] = 20; o[i * 4 + 3] = Math.round(Math.min(1, a / (1 - 30 / 255)) * 255);
  }
  const t = await sharp(o, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer();
  // 24/10 · «el árbol mucho más pequeño y alineado a la izquierda»: se recorta a la MASA (columnas y filas con tinta densa), no a las estelas
  // sueltas de la copa, para que su borde izquierdo caiga en la línea del nombre; lo que queda fuera de la caja se pierde (son puntos al 10 %)
  const W = info.width, H = info.height; let x0 = W, x1 = 0, y0 = H, y1 = 0;
  const col = new Array(W).fill(0), fil = new Array(H).fill(0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (o[(y * W + x) * 4 + 3] > 70) { col[x]++; fil[y]++; }
  const mc = Math.max(...col) * 0.12, mf = Math.max(...fil) * 0.05;
  col.forEach((v, x) => { if (v > mc) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); } }); fil.forEach((v, y) => { if (v > mf) { y0 = Math.min(y0, y); y1 = Math.max(y1, y); } });
  const caja = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
  // el canto del recorte se funde (12 % a cada lado y arriba) solo en el gris del árbol: los trazos (tinta densa) quedan enteros
  const ex = await sharp(t).extract(caja).raw().toBuffer();
  for (let y = 0; y < caja.height; y++) for (let x = 0; x < caja.width; x++) {
    const i = (y * caja.width + x) * 4 + 3; if (ex[i] > 150) continue;
    const m = Math.min(x / (caja.width * 0.12), (caja.width - 1 - x) / (caja.width * 0.12), y / (caja.height * 0.1), 1);
    ex[i] = Math.round(ex[i] * m * m * (3 - 2 * m));
  }
  const rec = { data: await sharp(ex, { raw: { width: caja.width, height: caja.height, channels: 4 } }).png().toBuffer(), info: caja };
  const w = Math.round(rec.info.width / 2), h = Math.round(rec.info.height / 2);
  await sharp(rec.data).resize(w, h, { kernel: 'lanczos3' }).png({ palette: true, colors: 16, dither: 0.6, compressionLevel: 9, effort: 10 }).toFile(process.argv[2]);
  console.log(w, h);
})();
