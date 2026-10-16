// RONDA 206 · Andoni: «el favicon, algo reducido del árbol pero que siga manteniendo los colores lo mejor posible».
// De la lámina del hero de cada estación (public/media/hero/arbol-<e>.webp) se queda solo el NÚCLEO del roble: fuera las estelas horizontales
// (solo lo casi opaco, y solo las columnas donde el árbol es denso), recortado a su caja, agrandado hasta llenar el icono y simplificado
// (mediana + algo más de saturación para que el color aguante a 16–32 px). Mismo fondo de estación que la ronda 156.
// (invierno, sin copa, guarda más: sus ramas son finas y translúcidas.)
// Uso: node tools/r206/favicon.cjs [carpeta de salida] (por defecto, public/)
const sharp = require('sharp');
const OUT = process.argv[2] || 'public';
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
(async () => {
  for (const [e, fondo] of Object.entries(NOCHE)) {
    const src = sharp(`public/media/hero/arbol-${e}.webp`).ensureAlpha();
    const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
    const { width: W, height: H } = info;
    // densidad de tinta opaca por columna y por fila → caja del núcleo
    // alfa limpia: lo translúcido (estelas) fuera, rampa corta para no dejar dientes
    const px = Buffer.from(data);
    for (let i = 3; i < px.length; i += 4) { const a = px[i] / 255; px[i] = Math.round(255 * Math.min(1, Math.max(0, (e === 'invierno' ? (a - 0.45) / 0.3 : (a - 0.7) / 0.2)))); }
    // ronda 207 · Andoni: «el árbol no entra bien: más espacio por arriba y que no se corte por los lados»: la caja sale de lo que QUEDA tras limpiar
    // (la copa entera: solo se descartan las columnas y filas con casi nada, los restos sueltos de estela), no del núcleo denso
    const col = new Float64Array(W), fil = new Float64Array(H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (px[(y * W + x) * 4 + 3] > 128) { col[x]++; fil[y]++; }
    const caja = (v, n, k) => { const m = Math.max(...v) * k; let a = 0, b = n - 1; while (v[a] < m) a++; while (v[b] < m) b--; return [a, b]; };
    const [x0, x1] = caja(col, W, 0.06), [y0, y1] = caja(fil, H, 0.02);
    const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
    const nucleo = await sharp(px, { raw: { width: W, height: H, channels: 4 } }).extract({ left: x0, top: y0, width: cw, height: ch })
      .median(5).modulate({ saturation: 1.25 }).png().toBuffer();
    // aire: 16 % arriba, 9 % a los lados (lejos de las esquinas redondeadas), 10 % abajo
    const N = 512, arriba = Math.round(N * 0.16), lado = Math.round(N * 0.09), pad = Math.round(N * 0.1);
    const k = Math.min((N - lado * 2) / cw, (N - arriba - pad) / ch), tw = Math.round(cw * k), th = Math.round(ch * k);
    const arbol = await sharp(nucleo).resize(tw, th).png().toBuffer();
    const cuadrado = await sharp({ create: { width: N, height: N, channels: 4, background: fondo } })
      .composite([{ input: arbol, left: Math.round((N - tw) / 2), top: N - pad - th }]).png().toBuffer();
    const r = Math.round(N * 0.22);
    const mascara = await sharp(Buffer.from(`<svg width="${N}" height="${N}"><rect width="${N}" height="${N}" rx="${r}" fill="#fff"/></svg>`)).png().toBuffer();
    const redondo = await sharp(cuadrado).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
    await sharp(redondo).resize(64, 64, { kernel: 'lanczos3' }).png().toFile(`${OUT}/favicon-${e}.png`);
    await sharp(cuadrado).resize(180, 180, { kernel: 'lanczos3' }).png().toFile(`${OUT}/apple-touch-icon-${e}.png`);
    console.log(e, { x0, x1, y0, y1 });
  }
})();
