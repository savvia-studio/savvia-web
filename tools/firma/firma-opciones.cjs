// Firma · imágenes de las opciones (24/10 · Andoni: «poner diferentes opciones de firma y que puedas elegir cuál sale en el correo de abajo»).
//   savvia-firma-roble.png   el roble con los trazos de Andoni (firma-figma.cjs)
//   savvia-firma-trazos.png  solo los trazos (lo casi negro de su lámina de Figma; el gris del roble fuera)
const sharp = require('sharp'), path = require('path'), fs = require('fs');
const PUB = path.join(__dirname, '../../public');
(async () => {
  // savvia-firma-roble.png sale de: node tools/firma/firma-figma.cjs public/descargas/savvia-firma-roble.png
  const { data, info } = await sharp(path.join(__dirname, 'andoni/firma-andoni-figma.webp')).flatten({ background: '#ffffff' }).raw().toBuffer({ resolveWithObject: true });
  const o = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const L = (0.299 * data[i * 3] + 0.587 * data[i * 3 + 1] + 0.114 * data[i * 3 + 2]) / 255;
    const a = Math.max(0, Math.min(1, (0.52 - L) / 0.36));
    o[i * 4] = 30; o[i * 4 + 1] = 23; o[i * 4 + 2] = 20; o[i * 4 + 3] = Math.round(a * 255);
  }
  // 24/10 · «solo los trazos, pero más pequeños y más estilo firma»: con más cuerpo (el trazo se engorda antes de reducir, si no a 60 px se pierde),
  // inclinado hacia delante como una rúbrica (cizalla de 14°) y algo achatado (80 % de alto)
  const W = info.width, H = info.height, al = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) al[i] = o[i * 4 + 3];
  const R = 7; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let m = 0; for (let dy = -R; dy <= R; dy += 2) for (let dx = -R; dx <= R; dx += 2) { if (dx * dx + dy * dy > R * R) continue; const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < W && yy < H) m = Math.max(m, al[yy * W + xx]); } o[(y * W + x) * 4 + 3] = m; }
  const t = await sharp(o, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
  const inc = Math.tan(22 * Math.PI / 180); // 24/10, 6.ª · «que parezca aún más una firma»: más inclinada, más apretada y con el subrayado de una rúbrica
  const cz = await sharp(t).affine([[1, -inc], [0, 0.66]], { background: { r: 0, g: 0, b: 0, alpha: 0 }, interpolator: 'bicubic' }).png().toBuffer();
  const r0 = await sharp(cz).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
  // el subrayado: una pincelada que sale del pie del tronco hacia la derecha, fina al entrar, gruesa en medio y afilada al salir, con un repunte
  const RW = r0.info.width, RH = r0.info.height, pie = Math.round(RH * 1.0);
  // sale del pie del tronco (donde acaba su trazo), baja y vuelve, y barre hacia la derecha subiendo un poco: una curva de Bézier cúbica
  const B0 = [0.30 * RW, 0.985 * RH], B1 = [0.02 * RW, 1.26 * RH], B2 = [0.62 * RW, 1.14 * RH], B3 = [1.06 * RW, 0.96 * RH];
  const P = (t) => [0, 1].map((j) => (1 - t) ** 3 * B0[j] + 3 * (1 - t) ** 2 * t * B1[j] + 3 * (1 - t) * t * t * B2[j] + t ** 3 * B3[j]);
  const N = 80, grosor = (t) => RH * 0.03 * Math.pow(Math.sin(Math.PI * Math.min(1, 0.12 + t * 0.92)), 0.8) + 0.6;
  const arriba = [], abajo = [];
  for (let k = 0; k <= N; k++) { const t = k / N, [x, y] = P(t), [x2, y2] = P(Math.min(1, t + 0.01)), dx = x2 - x || 1e-3, dy = y2 - y, l = Math.hypot(dx, dy), nx = -dy / l, ny = dx / l, g = grosor(t);
    arriba.push(`${(x + nx * g).toFixed(1)},${(y + ny * g).toFixed(1)}`); abajo.unshift(`${(x - nx * g).toFixed(1)},${(y - ny * g).toFixed(1)}`); }
  const HT = Math.round(RH * 1.32), WT = Math.round(RW * 1.12);
  const sub = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${WT}" height="${HT}"><polygon points="${[...arriba, ...abajo].join(' ')}" transform="translate(${Math.round(RW * 0.04)},0)" fill="#1E1714"/></svg>`);
  const comp = await sharp({ create: { width: WT, height: HT, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite([{ input: r0.data, left: Math.round(RW * 0.04), top: 0 }, { input: sub }]).png().toBuffer();
  const r = await sharp(comp).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
  const w = 150, h = Math.round(r.info.height * w / r.info.width); // se pinta a 75 px de ancho
  await sharp(r.data).resize(w, h, { kernel: 'lanczos3' }).png({ palette: true, colors: 16, compressionLevel: 9, effort: 10 }).toFile(path.join(PUB, 'descargas/savvia-firma-trazos.png'));
  console.log('trazos', w, h);
})();
