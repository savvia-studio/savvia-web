// RONDA 208 (2) · Andoni: «trabajarlo un poco más para que los grosores coincidan mejor con el resto de letras».
// El calco (tools/r208/trazo-potrace.svg, de su imagen) tenía las v más finas que las letras de Family y la s y las a algo blandas. Aquí se recompone en
// raster a 1200 px de alto, en el ESPACIO DEL CALCO (su espaciado):
//   · s, a, el palo de la i y la última a → los glifos EXACTOS de Family (tools/r207/palabra-glifos.json), cada uno colocado donde Andoni lo tenía
//     (traslación con el máximo solape con su componente del calco);
//   · las v → las suyas (remates ondulados, la gota del vértice, el brazo que sube) UNIDAS a los brazos de la v de Family sin remates: así el grueso y
//     el fino son los de la fuente y sus añadidos se quedan;
//   · la bola → el punto de la i de Family, centrado donde estaba la suya.
// El resultado se vectoriza con potrace (salida: tools/r208/compuesto.png → node tools/r208/wordmark.cjs <svg>).
// Uso: node tools/r208/ajustar.cjs <ruta al módulo potrace>
const sharp = require('sharp'), fs = require('fs');
const potrace = require(process.argv[2]);
const g = JSON.parse(fs.readFileSync('tools/r207/palabra-glifos.json'));
const H = 1200, K = 844 / 482; // px por unidad de Family (alto de la s: 482 unidades = 844 px en el calco)
(async () => {
  // el calco ya recortado a su tinta (tools/r208/palabra-calco.svg = lo que dejó wordmark.cjs)
  const vb = await sharp('tools/r208/palabra-calco.svg', { density: 90 }).resize({ height: H }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = vb.info.width, A = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) A[i] = vb.data[i * 4 + 3] > 128 ? 1 : 0;
  // componentes del calco
  const et = new Int32Array(W * H).fill(-1), comps = [];
  for (let s = 0; s < W * H; s++) {
    if (!A[s] || et[s] >= 0) continue;
    const id = comps.length, st = [s]; let n = 0, x0 = 1e9, x1 = -1, y0 = 1e9, y1 = -1; et[s] = id;
    while (st.length) { const q = st.pop(); n++; const x = q % W, y = (q / W) | 0; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= W || Y >= H) continue; const r = Y * W + X; if (A[r] && et[r] < 0) { et[r] = id; st.push(r); } } }
    comps.push({ id, n, x0, x1, y0, y1 });
  }
  const grandes = comps.filter((c) => c.n > 5000).sort((a, b) => a.x0 - b.x0);
  // por orden de x0: s · a · v1 · v2 (con el brazo y la bola) · palo de la i · a
  const [cS, cA, cV1, cV2, cI, cA2] = grandes;
  // máscara de una pieza de Family (unidades) a K px/unidad
  const pieza = async (d, clipY) => {
    const u = { x0: 1e9, x1: -1e9, y0: 1e9, y1: -1e9 };
    const nums = d.match(/[MLQHV][^MLQHVZ]*/g);
    let cx = 0;
    for (const c of nums) { const t = c[0], n = c.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);
      if (t === 'H') { u.x0 = Math.min(u.x0, n[0]); u.x1 = Math.max(u.x1, n[0]); continue; }
      if (t === 'V') { u.y0 = Math.min(u.y0, n[0]); u.y1 = Math.max(u.y1, n[0]); continue; }
      for (let i = 0; i < n.length; i += 2) { u.x0 = Math.min(u.x0, n[i]); u.x1 = Math.max(u.x1, n[i]); u.y0 = Math.min(u.y0, n[i + 1]); u.y1 = Math.max(u.y1, n[i + 1]); } }
    const m = 4, x0 = u.x0 - m, y0 = (clipY ?? u.y0) - m, w = u.x1 - u.x0 + 2 * m, h = u.y1 + m - y0;
    const pw = Math.round(w * K), ph = Math.round(h * K);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}" viewBox="${x0} ${y0} ${w} ${h}">${clipY != null ? `<clipPath id="c"><rect x="${x0}" y="${clipY}" width="${w}" height="${h}"/></clipPath>` : ''}<path ${clipY != null ? 'clip-path="url(#c)"' : ''} fill="#000" d="${d}"/></svg>`;
    const r = await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const M = new Uint8Array(r.info.width * r.info.height); for (let i = 0; i < M.length; i++) M[i] = r.data[i * 4 + 3] > 128 ? 1 : 0;
    return { M, w: r.info.width, h: r.info.height };
  };
  // mejor traslación: abajo-izquierda de la caja como punto de partida, ±16 px
  // punto de partida: abajo-izquierda de la caja; para las v, el VÉRTICE (centro de sus filas de más abajo) sobre el vértice
  const vertice = (M, w, h, es) => { let sx = 0, n = 0; for (let y = h - 1; y >= 0 && n < 200; y--) for (let x = 0; x < w; x++) if (es(x, y)) { sx += x; n++; } return sx / n; };
  const encajar = (P, comp, soloAbajo = 0) => {
    let best = { s: -1 };
    let bx = comp.x0, by = comp.y1 - P.h + 1;
    if (soloAbajo) { const vc = vertice(null, comp.x1 - comp.x0 + 1, comp.y1 - comp.y0 + 1, (x, y) => et[(comp.y0 + y) * W + comp.x0 + x] === comp.id), vp = vertice(null, P.w, P.h, (x, y) => P.M[y * P.w + x]); bx = Math.round(comp.x0 + vc - vp); }
    for (let dy = -16; dy <= 16; dy += 2) for (let dx = -16; dx <= 16; dx += 2) {
      const ox = bx + dx, oy = by + dy; let inter = 0, uni = 0;
      for (let y = soloAbajo; y < P.h; y += 2) for (let x = 0; x < P.w; x += 2) { const X = ox + x, Y = oy + y; if (X < 0 || Y < 0 || X >= W || Y >= H) continue; const t = et[Y * W + X] === comp.id ? 1 : 0, p = P.M[y * P.w + x]; if (t && p) inter++; if (t || p) uni++; }
      const s = inter / uni; if (s > best.s) best = { s, ox, oy };
    }
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const ox = best.ox + dx, oy = best.oy + dy; let inter = 0, uni = 0;
      for (let y = soloAbajo; y < P.h; y += 2) for (let x = 0; x < P.w; x += 2) { const X = ox + x, Y = oy + y; if (X < 0 || Y < 0 || X >= W || Y >= H) continue; const t = et[Y * W + X] === comp.id ? 1 : 0, p = P.M[y * P.w + x]; if (t && p) inter++; if (t || p) uni++; }
      const s = inter / uni; if (s > best.s) best = { s, ox, oy };
    }
    return best;
  };
  const out = new Uint8Array(A);
  const borrar = (c) => { for (let i = 0; i < W * H; i++) if (et[i] === c.id) out[i] = 0; };
  const pegar = (P, o) => { for (let y = 0; y < P.h; y++) for (let x = 0; x < P.w; x++) if (P.M[y * P.w + x]) { const X = o.ox + x, Y = o.oy + y; if (X >= 0 && Y >= 0 && X < W && Y < H) out[Y * W + X] = 1; } };
  const informe = {};
  for (const [nom, d, c] of [['s', g[0], cS], ['a', g[1] + g[2], cA], ['i', g[6], cI], ['a2', g[7] + g[8], cA2]]) {
    const P = await pieza(d); const o = encajar(P, c); borrar(c); pegar(P, o); informe[nom] = +o.s.toFixed(3);
  }
  // las v: las SUYAS (remates ondulados, la gota del vértice, el brazo que sube), pero con los grosores de Family fila a fila: en cada fila de los
  // brazos (por debajo de los remates y por encima de donde se juntan), el brazo GRUESO se ensancha por fuera (izquierda) hasta el ancho del de Family
  // a esa misma altura y el FINO se ajusta por fuera (derecha) al suyo. El hueco de dentro, la gota y el resto no se tocan.
  const KF = K, base = cS.y1; // línea base del calco = pie de la s
  const famV = await pieza(g[3]); // la v de Family entera: anchos de sus dos brazos por altura sobre la base
  const anchos = (dy) => { const y = famV.h - 1 - Math.round(4 * KF) - dy; if (y < 0 || y >= famV.h) return null; const r = []; let s = -1;
    for (let x = 0; x <= famV.w; x++) { const on = x < famV.w && famV.M[y * famV.w + x]; if (on && s < 0) s = x; if (!on && s >= 0) { r.push(x - s); s = -1; } } return r.length === 2 ? r : null; };
  const remate = Math.round((462 - 427) * KF) + 30; // alto de los remates + la onda
  const xAlto = cA.y0; // la altura de x (arriba de la a): la segunda v empieza en la bola, así que su caja no vale
  const suave = (v) => { const o = v.slice(); for (let i = 0; i < v.length; i++) { let s = 0, n = 0; for (let k = -12; k <= 12; k++) { const j = i + k; if (j >= 0 && j < v.length && v[j] != null) { s += v[j]; n++; } } o[i] = n ? s / n : 0; } return o; };
  for (const c of [cV1, cV2]) {
    const y0 = xAlto + Math.round((462 - 427) * KF), filas = []; // desde el pie del remate
    for (let y = y0; y <= base; y++) {
      const r = []; let s = -1;
      for (let x = c.x0; x <= c.x1 + 1; x++) { const on = x <= c.x1 && et[y * W + x] === c.id; if (on && s < 0) s = x; if (!on && s >= 0) { if (x - s > 6) r.push([s, x - 1]); s = -1; } }
      filas.push(r);
    }
    // cuánto ensanchar por fuera cada brazo en cada fila (null donde no se puede medir) → suavizado y a 0 en el vértice
    const dG = [], dF = [];
    filas.forEach((r, i) => { const f = anchos(base - (y0 + i)); if (!f || r.length < 2) { dG.push(null); dF.push(null); return; }
      const gr = r[0], fi = r[r.length - 1]; dG.push(f[0] - (gr[1] - gr[0] + 1)); dF.push(f[1] - (fi[1] - fi[0] + 1)); });
    // el borde de fuera de cada brazo se GIRA como una recta que acaba en su vértice (delta = D·(base − y)/(base − y0), D por mínimos cuadrados con lo
    // medido): el brazo sigue recto y llega al pie que dibujó Andoni; y bajo el remate entra en 40 filas (sin corte)
    const ajuste = (d) => { let sxy = 0, sxx = 0; d.forEach((v, i) => { if (v == null) return; const u = (dG.length - i) / dG.length; sxy += u * v; sxx += u * u; }); const D = sxx ? sxy / sxx : 0;
      return d.map((_, i) => D * ((dG.length - i) / dG.length)); };
    const sG = ajuste(dG), sF = ajuste(dF);
    informe['ensanche_' + (c === cV1 ? 'v1' : 'v2')] = { grueso: +sG[0].toFixed(1), fino: +sF[0].toFixed(1) };
    // el borde de fuera de cada brazo, como RECTA (ajustada a las filas medibles del suyo); la nueva recta = esa, desplazada D·(base − y)/(base − y0)
    // hacia fuera. Se rellena solo entre la recta nueva y la primera tinta (grueso) o se recorta solo lo que queda fuera de ella pegado al brazo (fino),
    // desde el pie del remate hasta la base: ni alarga remates ni deja muescas.
    const recta = (pick) => { let n = 0, sy = 0, sx = 0, syy = 0, sxy = 0; filas.forEach((r, i) => { if (dG[i] == null) return; const x = pick(r), y = y0 + i; n++; sy += y; sx += x; syy += y * y; sxy += x * y; });
      const m = (n * sxy - sx * sy) / (n * syy - sy * sy), q = (sx - m * sy) / n; return (y) => m * y + q; };
    const eG = recta((r) => r[0][0]), eF = recta((r) => r[r.length - 1][1]);
    for (let i = 0; i < filas.length; i++) {
      const y = y0 + i;
      const nG = Math.round(eG(y) - sG[i]); // grueso: rellenar de nG hasta la primera tinta (como mucho, la recta vieja + 8)
      for (let x = nG; x <= eG(y) + 8 && x < W; x++) { if (A[y * W + x] && et[y * W + x] === c.id) break; out[y * W + x] = 1; }
      const nF = Math.round(eF(y) + sF[i]);
      if (sF[i] >= 0) { for (let x = nF; x >= eF(y) - 8 && x > 0; x--) { if (A[y * W + x] && et[y * W + x] === c.id) break; out[y * W + x] = 1; } }
      else { for (let x = nF + 1; x <= eF(y) + 4; x++) if (et[y * W + x] === c.id) out[y * W + x] = 0; }
    }
  }
  informe.v = 'grosores de Family por fila';
  // la bola: el punto de la i de Family, centrado en el punto más grueso de la v2 por encima de la altura de x
  let bx = 0, by = 0, br = 0;
  for (let y = cV2.y0; y < cA.y0 - 10; y += 2) for (let x = cV2.x0; x <= cV2.x1; x += 2) {
    if (et[y * W + x] !== cV2.id) continue; let r = 1; while (r < 200) { let ok = true; for (let k = 0; k < 16 && ok; k++) { const a = (k / 16) * 2 * Math.PI, X = Math.round(x + r * Math.cos(a)), Y = Math.round(y + r * Math.sin(a)); if (X < 0 || Y < 0 || X >= W || Y >= H || et[Y * W + X] !== cV2.id) ok = false; } if (!ok) break; r++; }
    if (r > br) { br = r; bx = x; by = y; }
  }
  const rDot = (58 * K); // el punto de Family: 116 unidades de diámetro
  for (let y = Math.floor(by - br - 2); y <= by + br + 2; y++) for (let x = Math.floor(bx - br - 2); x <= bx + br + 2; x++) if ((x - bx) ** 2 + (y - by) ** 2 <= (br + 1.5) ** 2) out[y * W + x] = 0;
  for (let y = Math.floor(by - rDot); y <= by + rDot; y++) for (let x = Math.floor(bx - rDot); x <= bx + rDot; x++) if ((x - bx) ** 2 + (y - by) ** 2 <= rDot ** 2) out[y * W + x] = 1;
  informe.bola = { suya: br, family: +rDot.toFixed(1) };
  // a PNG (negro sobre blanco) y potrace
  const png = Buffer.alloc(W * H * 3, 255); for (let i = 0; i < W * H; i++) if (out[i]) png[i * 3] = png[i * 3 + 1] = png[i * 3 + 2] = 0;
  await sharp(png, { raw: { width: W, height: H, channels: 3 } }).blur(0.8).png().toFile('tools/r208/compuesto.png');
  potrace.trace('tools/r208/compuesto.png', { threshold: 128, turdSize: 20, optTolerance: 0.8, alphaMax: 1, color: 'white', background: 'transparent' }, (e, svg) => {
    if (e) throw e;
    const d = svg.match(/ d="([^"]+)"/)[1].replace(/-?\d+\.\d+/g, (n) => String(Math.round(+n * 10) / 10));
    fs.writeFileSync('public/savvia-palabra.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path fill="white" fill-rule="evenodd" d="${d}"/></svg>`);
    console.log(JSON.stringify(informe), W, H, (fs.statSync('public/savvia-palabra.svg').size / 1024).toFixed(1) + ' KB');
  });
})();
