// RONDA 205 · Eric: «no se aprecia mucho el tronco del árbol en el favicon ni en el mini favicon de la píldora» → opción 2: sin tocar el encuadre
// (el de la ronda 156), se REFUERZA la madera solo al reducir: se buscan los píxeles del tronco en la lámina (la franja central de abajo, oscuros
// y poco saturados), se ensanchan (dilatación de R px a 512) y se pintan, un poco más oscuros, POR DEBAJO del árbol. El dibujo queda encima, intacto.
// Uso: node tools/r205-favicon-tronco.cjs [carpeta de salida] (por defecto, public)
const sharp = require('sharp');
const SAL = process.argv[2] || 'public';
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
const RAD = { otono: 12, invierno: 4, primavera: 12, verano: 12 }; // radio de la dilatación a 512 px; en invierno, poco (el tronco desnudo ya se lee y engordado parece un tocón)
(async () => {
  for (const [e, fondo] of Object.entries(NOCHE)) {
    const N = 512, W = Math.round(N * 0.96), H = Math.round((W * 583) / 1260);
    const arbol = await sharp(`public/media/hero/arbol-${e}.webp`).resize(W, H).ensureAlpha().raw().toBuffer();
    // 1 · el tronco: franja central bajo la copa (el 30 % de abajo), opaco, oscuro y poco saturado
    const m = new Uint8Array(W * H);
    let sr = 0, sg = 0, sb = 0, n = 0;
    const R = RAD[e];
    for (let y = Math.round(H * 0.7); y < Math.round(H * 0.95); y++) for (let x = Math.round(W * 0.42); x < Math.round(W * 0.6); x++) {
      const i = (y * W + x) * 4, r = arbol[i], g = arbol[i + 1], b = arbol[i + 2], a = arbol[i + 3];
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), lum = (r * 0.3 + g * 0.59 + b * 0.11);
      if (a > 150 && lum < 120 && (mx - mn) < 70) { m[y * W + x] = 1; sr += r; sg += g; sb += b; n++; }
    }
    // 2 · dilatación (cuadrada, separable)
    const h = new Uint8Array(W * H), d = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (m[y * W + x]) for (let k = -R; k <= R; k++) { const xx = x + k; if (xx >= 0 && xx < W) h[y * W + xx] = 1; }
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (h[y * W + x]) for (let k = -R; k <= R; k++) { const yy = y + k; if (yy >= 0 && yy < H) d[yy * W + x] = 1; }
    const c = n ? [sr / n * 0.7, sg / n * 0.7, sb / n * 0.7].map(Math.round) : [40, 28, 22];
    const capa = Buffer.alloc(W * H * 4);
    for (let i = 0; i < W * H; i++) if (d[i]) { capa[i * 4] = c[0]; capa[i * 4 + 1] = c[1]; capa[i * 4 + 2] = c[2]; capa[i * 4 + 3] = 255; }
    const tronco = await sharp(capa, { raw: { width: W, height: H, channels: 4 } }).blur(1.2).png().toBuffer();
    const arbolPng = await sharp(arbol, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
    const left = Math.round((N - W) / 2), top = N - H - Math.round(N * 0.17);
    const cuadrado = await sharp({ create: { width: N, height: N, channels: 4, background: fondo } })
      .composite([{ input: tronco, left, top }, { input: arbolPng, left, top }]).png().toBuffer();
    const r = Math.round(N * 0.22);
    const mascara = await sharp(Buffer.from(`<svg width="${N}" height="${N}" viewBox="0 0 ${N} ${N}"><rect width="${N}" height="${N}" rx="${r}" fill="#fff"/></svg>`)).resize(N, N).png().toBuffer();
    const redondo = await sharp(cuadrado).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
    await sharp(redondo).resize(64, 64).png().toFile(`${SAL}/favicon-${e}.png`);
    await sharp(cuadrado).resize(180, 180).png().toFile(`${SAL}/apple-touch-icon-${e}.png`);
    console.log(e, 'tronco', n, 'px', 'color', c.join(','));
  }
})();
