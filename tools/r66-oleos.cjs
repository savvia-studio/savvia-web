// Ronda 66 · los paisajes de Donostia de Andoni (SAVVIA-Donostia-12-estaciones-con-nieve) en los tres pasos de la sección 2: 0 La Concha · 1 Peine del
// Viento · 2 Urumea. A 640 × 960, con el BORDE que se desvanece irregular de la ronda 55 → public/media/tarjetas/<estación>-<k>-v.webp
const sharp = require('sharp');
const EST = ['otono', 'invierno', 'primavera', 'verano'], ESC = ['miramar-la-concha', 'peine-del-viento', 'urumea-maria-cristina'];
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
const ruido = (x, y) => { const i = Math.floor(x), j = Math.floor(y), f = x - i, g = y - j, u = f * f * (3 - 2 * f), v = g * g * (3 - 2 * g); return (hash(i, j) * (1 - u) + hash(i + 1, j) * u) * (1 - v) + (hash(i, j + 1) * (1 - u) + hash(i + 1, j + 1) * u) * v; };
(async () => {
  for (const e of EST) for (let k = 0; k < 3; k++) {
    const { data, info } = await sharp(`tools/r66/SAVVIA-Donostia-12-estaciones-con-nieve/${e}/${ESC[k]}-${e}.png`).resize(640, 960, { kernel: 'lanczos3' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, out = Buffer.alloc(W * H * 4);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const nx = (x / W - 0.5) * 2, ny = (y / H - 0.5) * 2, a0 = Math.atan2(ny, nx);
      const borde = 1.02 + (ruido(Math.cos(a0) * 2.2 + k * 9, Math.sin(a0) * 2.2 + 3) - 0.5) * 0.28 + (ruido(x / 14, y / 14) - 0.5) * 0.1;
      const r = Math.sqrt(nx * nx * 1.05 + ny * ny);
      let a = Math.min(1, Math.max(0, (borde - r) / 0.42)); a = a * a * (3 - 2 * a);
      const i = (y * W + x) * 3, o = (y * W + x) * 4;
      out[o] = data[i]; out[o + 1] = data[i + 1]; out[o + 2] = data[i + 2]; out[o + 3] = Math.round(a * 255);
    }
    await sharp(out, { raw: { width: W, height: H, channels: 4 } }).webp({ quality: 84, alphaQuality: 90 }).toFile(`public/media/tarjetas/${e}-${k}-v.webp`);
  }
  console.log('ok');
})();
