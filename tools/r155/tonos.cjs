// Ronda 155 · «en otoño tenemos que darle más tonalidades otoñales, en primavera lo mismo, y en invierno igual; la de verano está bien»:
// recolorea las HOJAS del brote (no la bellota ni las raíces) con una paleta de varios tonos por estación, repartidos con un ruido suave
// (manchas que siguen la hoja) y conservando el sombreado y la textura de la acuarela. Base: tools/r155/base/brote-<e>.webp → public/media/manifiesto/.
const sharp = require('/Users/andonimart/Desktop/savvia/savvia-web/node_modules/sharp');
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const PAL = {
  otono: ['#7e2418', '#a8361f', '#c65c2d', '#dd8432', '#e8ac45', '#c9a34a', '#8a7a34'],
  primavera: ['#5f9a34', '#86c043', '#b3d95c', '#dbe87e', '#f3c9d5', '#ec9fb8', '#d97a9c'],
  invierno: ['#6a4a34', '#9a6f48', '#c9955a', '#d9c3a0', '#8fa6c4', '#bccbdc', '#eef3f8'],
};
const OUT = __dirname + '/../../public/media/manifiesto/';
const ruido = (x, y, s) => Math.sin(x * 0.021 * s + Math.sin(y * 0.013 * s) * 2.1) * 0.5 + Math.sin(y * 0.027 * s - x * 0.011 * s + 1.7) * 0.35 + Math.sin((x + y) * 0.051 * s + 0.4) * 0.15;
(async () => {
  for (const e of Object.keys(PAL)) {
    const pal = PAL[e].map(hex);
    const { data, info } = await sharp(`${__dirname}/base/brote-${e}.webp`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { width: W, height: H } = info;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4, a = data[i + 3]; if (a < 8) continue;
      const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
      const sat = d / (1 - Math.abs(2 * l - 1) + 1e-6);
      let h = 0; if (d > 1e-6) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360;
      // la hoja: tonos de verde a naranja con color (la bellota es marrón oscuro y poco saturada; el tallo, verde oscuro y fino)
      let hoja = 0;
      if (e === 'invierno') hoja = l > 0.25 && y < H * 0.86 ? 1 : 0; // la hoja seca y las yemas (escarcha incluida)
      else hoja = sat > 0.22 && h > 20 && h < 170 && l > 0.18 ? 1 : 0;
      if (y > H * 0.79) hoja = 0; // la bellota se queda como está
      if (!hoja) continue;
      // reparto de tonos: ruido suave + algo de la posición (las puntas, más maduras en otoño / más tiernas en primavera)
      let t = 0.5 + 0.45 * ruido(x, y, 1) + 0.25 * ruido(x, y, 3.3);
      t = Math.min(0.999, Math.max(0, t));
      const f = t * (pal.length - 1), k = Math.floor(f), u = f - k, c0 = pal[k], c1 = pal[k + 1];
      const pc = [0, 1, 2].map((j) => (c0[j] + (c1[j] - c0[j]) * u) / 255);
      const pl = 0.299 * pc[0] + 0.587 * pc[1] + 0.114 * pc[2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const esc = Math.min(1.6, Math.max(0.35, lum / Math.max(0.05, pl) * 0.92)); // conserva el sombreado de la acuarela
      const mezcla = e === 'invierno' ? 0.7 : 0.88;
      // el motor del árbol apaga un poco el color al pintarlo: aquí se le da algo más de viveza (otoño y primavera)
      const viv = e === 'invierno' ? 1.2 : 1.3;
      const nn = [0, 1, 2].map((j) => Math.min(1, pc[j] * esc)), ln = 0.299 * nn[0] + 0.587 * nn[1] + 0.114 * nn[2];
      for (let j = 0; j < 3; j++) { const n = Math.min(1, Math.max(0, ln + (nn[j] - ln) * viv)); data[i + j] = Math.round(255 * ((j === 0 ? r : j === 1 ? g : b) * (1 - mezcla) + n * mezcla)); }
    }
    await sharp(data, { raw: info }).webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}brote-${e}.webp`);
    console.log(e, 'ok');
  }
})();
