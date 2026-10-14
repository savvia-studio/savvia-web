// RONDA 189 · el fondo BARRIDO de «Más proyectos» (Eric: fondos de naturaleza desenfocados «con efecto de arrastre», como Harbor):
// el paisaje de la ventana de la mesa (cielo, monte y bosque; los paneles de los lados, sin el monitor ni los parteluces), en cada estación,
// con desenfoque de MOVIMIENTO (muestras a lo largo de la dirección, pesos en triángulo) + un desenfoque leve.
// Siete VARIANTES (una por pieza: otro encuadre y otra dirección del arrastre) → public/media/anteriores/fondos/barrido-<v>-<estación>.webp
const sharp = require('sharp');
const W = 1000, H = 1000, L = 120;
// x: panel izquierdo (0) o derecho (3420) de la lámina de 5120; y/h: el tramo de alto (la ventana acaba hacia y 1820); ang: grados
const V = [
  { x: 0, y: 420, h: 1400, ang: -24 },
  { x: 3420, y: 420, h: 1400, ang: -24 },
  { x: 0, y: 700, h: 1120, ang: 18 },
  { x: 3420, y: 0, h: 1500, ang: -30 },
  { x: 3420, y: 650, h: 1170, ang: 22 },
  { x: 0, y: 100, h: 1500, ang: -14 },
  { x: 3420, y: 500, h: 1320, ang: 28 },
  { x: 0, y: 250, h: 1400, ang: -36 }, // la pieza de entrada (los destacados que rotan)
];
(async () => {
  for (const [v, p] of V.entries()) if (!process.argv[2] || +process.argv[2] === v) for (const est of ['primavera', 'verano', 'otono', 'invierno']) {
    const pad = L, A = (p.ang * Math.PI) / 180;
    const { data, info } = await sharp(`public/media/estudio/${est}-xl.webp`)
      .extract({ left: p.x, top: p.y, width: 1690, height: p.h })
      .resize(W + 2 * pad, H + 2 * pad, { fit: 'cover' })
      .removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const w = info.width, out = Buffer.alloc(W * H * 3), dx = Math.cos(A), dy = Math.sin(A);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let r = 0, g = 0, b = 0, n = 0;
      for (let k = -L / 2; k <= L / 2; k += 1) {
        const wgt = 1 - Math.abs(k) / (L / 2 + 1);
        const i = (Math.round(y + pad + k * dy) * w + Math.round(x + pad + k * dx)) * 3;
        r += data[i] * wgt; g += data[i + 1] * wgt; b += data[i + 2] * wgt; n += wgt;
      }
      const o = (y * W + x) * 3; out[o] = r / n; out[o + 1] = g / n; out[o + 2] = b / n;
    }
    await sharp(out, { raw: { width: W, height: H, channels: 3 } }).blur(1.2).modulate({ saturation: 0.92 })
      .webp({ quality: 78 }).toFile(`public/media/anteriores/fondos/barrido-${v}-${est}.webp`);
  }
  console.log('ok');
})();
