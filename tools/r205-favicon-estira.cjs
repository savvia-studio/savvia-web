// RONDA 205 · Eric: «el tronco que has puesto no es como el real en grande». Nada dibujado: el favicon es la lámina del hero con su encuadre de
// producción, pero la franja del TRONCO (de CORTE a 1 del alto de la lámina: tronco, su curva, su textura y el ensanche de la base) se ESTIRA en
// vertical ×ESTIRA y se coloca bajo la copa: el tronco es el real, solo más largo. Salidas: favicon-<e>-32.png · favicon-<e>.png · apple-touch-icon-<e>.png.
// Uso: node tools/r205-favicon-estira.cjs [carpeta]  (ESC 0,96 · CORTE 0,8 · ESTIRA 2,4 · PIE 0,95: dónde queda el pie en el icono)
const sharp = require('sharp');
const SAL = process.argv[2] || 'public';
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
const ESC = Number(process.env.ESC || 0.96), CORTE = Number(process.env.CORTE || 0.84), ESTIRA = Number(process.env.ESTIRA || 2.8), PIE = Number(process.env.PIE || 0.95);
// Eric: «cerca de las hojas hay algo que tira hacia la izquierda»: la franja estirada era de lado a lado y arrastraba hojas y una rama baja; ahora solo
// la banda del tronco (x 0,40–0,62 de la lámina) y el corte más abajo (0,84), donde ya solo hay tronco
const X0 = 0.40, X1 = 0.62;
(async () => {
  for (const [e, fondo] of Object.entries(NOCHE)) {
    const N = 512, W = Math.round(N * ESC), H = Math.round((W * 583) / 1260);
    const base = await sharp(`public/media/hero/arbol-${e}.webp`).resize(W, H).png().toBuffer(), lam = sharp(base);
    const hC = Math.round(H * CORTE), hT = H - hC, hT2 = Math.round(hT * ESTIRA);
    const copa = await lam.clone().extract({ left: 0, top: 0, width: W, height: hC }).png().toBuffer();
    // Eric: «el tronco sin dithering»: en la franja del tronco se quitan los puntos sueltos del canto de la lámina (alfa a todo o nada con umbral
    // alto + mediana 3 que borra las motas) y se enfoca con algo más de contraste
    const bx = Math.round(W * X0), bw = Math.round(W * (X1 - X0));
    const tr = await lam.clone().extract({ left: bx, top: hC, width: bw, height: hT }).ensureAlpha().raw().toBuffer();
    for (let i = 3; i < tr.length; i += 4) tr[i] = tr[i] > 170 ? 255 : 0;
    // Eric: «el tronco tiene que tener curva»: a la banda estirada se le da la curva del tronco real (un arco suave hacia la izquierda en el tramo
    // medio, como en el hero, 0 en los extremos para que case con la copa y el pie): cada fila se desplaza x = −CURVA·W·sin(πt)
    const CURVA = Number(process.env.CURVA || 0.1);
    const est = await sharp(tr, { raw: { width: bw, height: hT, channels: 4 } }).median(3).resize(bw, hT2, { fit: 'fill', kernel: 'lanczos3' }).raw().toBuffer();
    const bw2 = bw + Math.ceil(W * CURVA) * 3, cur = Buffer.alloc(bw2 * hT2 * 4);
    // Eric: «la curva no está conseguida»: el arco simétrico a la izquierda no es el del roble. En el hero el tronco sale de la copa y BAJA HACIA LA
    // DERECHA, se arquea y vuelve al centro en la base: una S, con el vientre a la derecha arriba y un leve contraarco abajo
    for (let y = 0; y < hT2; y++) { const t = y / hT2, dx = Math.round(CURVA * W * (Math.sin(Math.PI * t) + 0.45 * Math.sin(2 * Math.PI * t))) + Math.ceil(W * CURVA); for (let x = 0; x < bw; x++) { const i = (y * bw + x) * 4, j = (y * bw2 + x + dx) * 4; cur[j] = est[i]; cur[j + 1] = est[i + 1]; cur[j + 2] = est[i + 2]; cur[j + 3] = est[i + 3]; } }
    const tronco = await sharp(cur, { raw: { width: bw2, height: hT2, channels: 4 } }).sharpen({ sigma: 1.6, m1: 1.2, m2: 2 }).linear(e === 'invierno' ? 1.05 : 1.3, e === 'invierno' ? -12 : 4).png().toBuffer(); // sobre la noche, el tronco algo más claro: se despega del fondo
    const alto = hC + hT2, left = Math.round(N / 2 - W * 0.507), top = Math.round(N * PIE - alto);
    const G = N * 2, lienzo = await sharp({ create: { width: G, height: G, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: tronco, left: N / 2 + left + bx - Math.ceil(W * CURVA), top: N / 2 + top + hC }, { input: copa, left: N / 2 + left, top: N / 2 + top }]).png().toBuffer();
    const recorte = await sharp(lienzo).extract({ left: N / 2, top: N / 2, width: N, height: N }).png().toBuffer();
    const cuadrado = await sharp({ create: { width: N, height: N, channels: 4, background: fondo } }).composite([{ input: recorte }]).png().toBuffer();
    const r = Math.round(N * 0.22);
    const mascara = await sharp(Buffer.from(`<svg width="${N}" height="${N}"><rect width="${N}" height="${N}" rx="${r}" fill="#fff"/></svg>`)).png().toBuffer();
    const redondo = await sharp(cuadrado).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
    await sharp(redondo).resize(32, 32, { kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).png().toFile(`${SAL}/favicon-${e}-32.png`);
    await sharp(redondo).resize(64, 64, { kernel: 'lanczos3' }).sharpen({ sigma: 0.6 }).png().toFile(`${SAL}/favicon-${e}.png`);
    await sharp(cuadrado).resize(180, 180).png().toFile(`${SAL}/apple-touch-icon-${e}.png`);
    console.log(e, 'ok');
  }
})();
