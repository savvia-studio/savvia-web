// RONDA 205 · el favicon PEQUEÑO (pestaña a 16/32 px y píldora de savvia en savvia agentic): el roble MÁS CERCA para que el tronco se lea:
// la copa se sale por los lados y el tronco nace del borde de abajo (opción 1, solo a tamaño pequeño). Mismo refuerzo de madera que
// r205-favicon-tronco.cjs. Salida: <carpeta>/favicon-<estación>-32.png (32 px, esquinas redondeadas). Uso: node tools/r205-favicon-pequeno.cjs [carpeta]
const sharp = require('sharp');
const SAL = process.argv[2] || 'public';
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
const ESC = Number(process.env.ESC || 1.7); // ancho del árbol respecto al icono (1 = cabe entero)
// ronda 205 (Eric: «falta el tronco, no se ve nada»): el tronco oscurecido se confundía con la noche. En PEQUEÑO el tronco va en el tono de la
// madera medido en las raíces del hero (ronda 181: contrasta con la noche de su estación) y bastante más ancho (28 px a 512 ≈ 1,75 px a 32)
const RAD = { otono: 28, invierno: 14, primavera: 28, verano: 28 };
const MADERA = { otono: [0x9b, 0x64, 0x52], invierno: [0x70, 0x5f, 0x58], primavera: [0xa2, 0x5d, 0x6d], verano: [0x7d, 0x60, 0x44] };
(async () => {
  for (const [e, fondo] of Object.entries(NOCHE)) {
    const N = 512, W = Math.round(N * ESC), H = Math.round((W * 583) / 1260);
    const arbol = await sharp(`public/media/hero/arbol-${e}.webp`).resize(W, H).ensureAlpha().raw().toBuffer();
    const m = new Uint8Array(W * H); let sr = 0, sg = 0, sb = 0, n = 0;
    for (let y = Math.round(H * 0.7); y < Math.round(H * 0.95); y++) for (let x = Math.round(W * 0.42); x < Math.round(W * 0.6); x++) {
      const i = (y * W + x) * 4, r = arbol[i], g = arbol[i + 1], b = arbol[i + 2], a = arbol[i + 3];
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), lum = r * 0.3 + g * 0.59 + b * 0.11;
      if (a > 150 && lum < 120 && mx - mn < 70) { m[y * W + x] = 1; sr += r; sg += g; sb += b; n++; }
    }
    const R = RAD[e], h = new Uint8Array(W * H), d = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (m[y * W + x]) for (let k = -R; k <= R; k++) { const xx = x + k; if (xx >= 0 && xx < W) h[y * W + xx] = 1; }
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (h[y * W + x]) for (let k = -R; k <= R; k++) { const yy = y + k; if (yy >= 0 && yy < H) d[yy * W + x] = 1; }
    const c = MADERA[e];
    const capa = Buffer.alloc(W * H * 4);
    for (let i = 0; i < W * H; i++) if (d[i]) { capa[i * 4] = c[0]; capa[i * 4 + 1] = c[1]; capa[i * 4 + 2] = c[2]; capa[i * 4 + 3] = 255; }
    // el árbol, centrado en su tronco (x ≈ 0,51 de la lámina) y con el pie un 4 % por debajo del borde (la línea de suelo, fuera)
    // SUBE (fracción del icono): cuánto se levanta el pie del árbol sobre el borde de abajo (sin ella, el pie un 4 % por debajo)
    const left = Math.round(N / 2 - W * 0.51), top = process.env.SUBE ? Math.round(N - H - N * Number(process.env.SUBE)) : Math.round(N - H + H * 0.04);
    const recorta = async (buf) => {
      // lo que se sale del icono se recorta: se compone sobre un lienzo grande y se corta el cuadrado
      const G = await sharp({ create: { width: W + 2 * N, height: H + 2 * N, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
        .composite([{ input: buf, left: N, top: N }]).png().toBuffer();
      return sharp(G).extract({ left: N - left, top: N - top, width: N, height: N }).png().toBuffer();
    };
    const tronco = await recorta(await sharp(capa, { raw: { width: W, height: H, channels: 4 } }).blur(1.2 * ESC).png().toBuffer());
    const arbolPng = await recorta(await sharp(arbol, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer());
    const cuadrado = await sharp({ create: { width: N, height: N, channels: 4, background: fondo } }).composite([{ input: tronco }, { input: arbolPng }]).png().toBuffer();
    const r = Math.round(N * 0.22);
    const mascara = await sharp(Buffer.from(`<svg width="${N}" height="${N}"><rect width="${N}" height="${N}" rx="${r}" fill="#fff"/></svg>`)).png().toBuffer();
    const redondo = await sharp(cuadrado).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
    await sharp(redondo).resize(32, 32).png().toFile(`${SAL}/favicon-${e}-32.png`);
    console.log(e, 'ok');
  }
})();
