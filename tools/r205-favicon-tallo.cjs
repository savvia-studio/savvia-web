// RONDA 205 · Eric: «el tronco tiene que llegar hasta la parte de abajo del favicon; si hay que reformular el árbol, hazlo». El favicon es el ROBLE
// de la estación sobre su noche con un TALLO dibujado: un tronco en el tono de madera de la estación (el medido en las raíces del hero, ronda 181)
// que nace dentro de la copa y baja hasta el borde inferior del icono, un poco más ancho abajo. La lámina va encima (su propio tronco se funde con
// el dibujado). Salidas: favicon-<e>-32.png (pestaña), favicon-<e>.png (64) y apple-touch-icon-<e>.png (180, a sangre).
// Uso: node tools/r205-favicon-tallo.cjs [carpeta]   (ESC = ancho del árbol respecto al icono, 0,9; ALTO = dónde queda el pie del árbol, 0,66 del icono)
const sharp = require('sharp');
const SAL = process.argv[2] || 'public';
const NOCHE = { otono: '#3b231b', invierno: '#f5f5f7', primavera: '#3a2932', verano: '#1b3125' };
const MADERA = { otono: '#9b6452', invierno: '#705f58', primavera: '#a25d6d', verano: '#7d6044' };
// ESC: ancho del árbol respecto al icono · ALTO: dónde queda el pie de la lámina · FIN: hasta dónde baja el tallo (1 = el borde) · ANCHO: × la anchura medida
const ESC = Number(process.env.ESC || 0.96), ALTO = Number(process.env.ALTO || 0.78), FIN = Number(process.env.FIN || 0.94), ANCHO = Number(process.env.ANCHO || 1.4);
(async () => {
  for (const [e, fondo] of Object.entries(NOCHE)) {
    const N = 512, W = Math.round(N * ESC), H = Math.round((W * 583) / 1260);
    const left = Math.round(N / 2 - W * 0.51), top = Math.round(N * ALTO - H);
    const raw = await sharp(`public/media/hero/arbol-${e}.webp`).resize(W, H).ensureAlpha().raw().toBuffer();
    const arbol = await sharp(raw, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
    // el tallo CONTINÚA el tronco de la lámina (Eric: «parecía un champiñón; el árbol tiene que tener un cuerpo parecido»): se mide el tronco real en
    // las últimas filas de la lámina (píxeles opacos de la franja central) → su anchura mediana, su centro y su color medio; el tallo baja desde
    // dentro de la copa hasta el borde con esa anchura (×1,25, y ×1,6 en el pie, como el ensanche real de un tronco) y ese color
    const anchos = [], cxs = []; let sr = 0, sg = 0, sb = 0, n = 0;
    for (let y = Math.round(H * 0.86); y < Math.round(H * 0.97); y++) {
      let x0 = -1, x1 = -1;
      for (let x = Math.round(W * 0.4); x < Math.round(W * 0.62); x++) { if (raw[(y * W + x) * 4 + 3] > 200) { if (x0 < 0) x0 = x; x1 = x; } }
      if (x0 >= 0 && x1 - x0 < W * 0.08) { anchos.push(x1 - x0 + 1); cxs.push((x0 + x1) / 2); for (let x = x0; x <= x1; x++) { const i = (y * W + x) * 4; sr += raw[i]; sg += raw[i + 1]; sb += raw[i + 2]; n++; } }
    }
    const med = (a) => a.length ? a.sort((p, q) => p - q)[a.length >> 1] : 0;
    const wT = (med(anchos) || W * 0.03) * ANCHO, cx = left + (med(cxs) || W * 0.51);
    const col = n ? `rgb(${Math.round(sr / n)},${Math.round(sg / n)},${Math.round(sb / n)})` : MADERA[e];
    const y0 = top + H * 0.7, wBot = wT * 1.3, yF = N * FIN;
    const tallo = Buffer.from(`<svg width="${N}" height="${N}"><path d="M${cx - wT / 2} ${y0} L${cx + wT / 2} ${y0} L${cx + wBot / 2} ${yF} Q${cx} ${yF + wBot * 0.3} ${cx - wBot / 2} ${yF} Z" fill="${col}"/></svg>`);
    console.log(e, 'tronco medido', med(anchos), 'px de', W, 'color', col);
    const cuadrado = await sharp({ create: { width: N, height: N, channels: 4, background: fondo } })
      .composite([{ input: tallo }, { input: arbol, left, top }]).png().toBuffer();
    const r = Math.round(N * 0.22);
    const mascara = await sharp(Buffer.from(`<svg width="${N}" height="${N}"><rect width="${N}" height="${N}" rx="${r}" fill="#fff"/></svg>`)).png().toBuffer();
    const redondo = await sharp(cuadrado).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
    await sharp(redondo).resize(32, 32).png().toFile(`${SAL}/favicon-${e}-32.png`);
    await sharp(redondo).resize(64, 64).png().toFile(`${SAL}/favicon-${e}.png`);
    await sharp(cuadrado).resize(180, 180).png().toFile(`${SAL}/apple-touch-icon-${e}.png`);
    console.log(e, 'ok');
  }
})();
