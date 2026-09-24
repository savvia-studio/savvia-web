// Ronda 22 · el DIBUJO de cada capa del paisaje del pie (bordes de luminancia, en Cacao, con el alfa de la lámina) y la máscara RASGADA con la
// que se pinta (rampa diagonal con ruido: al desplazarla, el frente tiene el canto irregular). node tools/lineas.cjs
const sharp = require('sharp');
(async () => {
  for (const n of ['montes', 'arboles', 'hierba']) {
    const { data, info } = await sharp(`public/media/pie/${n}.webp`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, L = new Float32Array(W * H), A = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) { L[i] = (0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2]) / 255; A[i] = data[i * 4 + 3] / 255; }
    const out = Buffer.alloc(W * H * 4);
    const g = (x, y) => L[Math.min(H - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))] * A[Math.min(H - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      // Sobel sobre luminancia × alfa: las líneas del grabado; también el contorno de la capa (donde el alfa cae)
      const gx = -g(x - 1, y - 1) - 2 * g(x - 1, y) - g(x - 1, y + 1) + g(x + 1, y - 1) + 2 * g(x + 1, y) + g(x + 1, y + 1);
      const gy = -g(x - 1, y - 1) - 2 * g(x, y - 1) - g(x + 1, y - 1) + g(x - 1, y + 1) + 2 * g(x, y + 1) + g(x + 1, y + 1);
      const e = Math.min(1, Math.max(0, Math.hypot(gx, gy) * 1.6 - 0.1) / 0.9); // umbral: solo los bordes claros (si no, un empaste y 450 KB)
      const i = (y * W + x) * 4; out[i] = 0x30; out[i + 1] = 0x20; out[i + 2] = 0x18; out[i + 3] = Math.round(255 * Math.pow(e, 1.3) * Math.max(A[y * W + x], e * 0.6));
    }
    await sharp(out, { raw: { width: W, height: H, channels: 4 } }).resize(1400).webp({ quality: 72, alphaQuality: 80 }).toFile(`public/media/pie/${n}-lineas.webp`);
    console.log(n, 'líneas', W, H);
  }
  // la máscara: 3 tramos (opaco · rampa con ruido · transparente), rampa a 30° para que el frente entre en diagonal
  const W = 1200, H = 400, out = Buffer.alloc(W * H * 4);
  const h2 = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
  const n2 = (x, y) => { const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy, u = fx * fx * (3 - 2 * fx), w = fy * fy * (3 - 2 * fy); return (h2(ix, iy) * (1 - u) + h2(ix + 1, iy) * u) * (1 - w) + (h2(ix, iy + 1) * (1 - u) + h2(ix + 1, iy + 1) * u) * w; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = (x + y * 0.55) / W; // eje diagonal
    const ruido = (n2(x * 0.02, y * 0.02) - 0.5) * 0.14 + (n2(x * 0.09, y * 0.09) - 0.5) * 0.05;
    const a = Math.min(1, Math.max(0, (0.62 - u + ruido) / 0.16)); // opaco hasta ~1/3, rampa rasgada, transparente después
    const i = (y * W + x) * 4; out[i] = out[i + 1] = out[i + 2] = 255; out[i + 3] = Math.round(255 * a);
  }
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toFile('public/media/pie/rasgo.png');
  console.log('rasgo.png', W, H);
})();
