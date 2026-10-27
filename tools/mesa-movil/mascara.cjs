// LA PANTALLA DEL MÓVIL DE LA MESA, medida en la foto (27/10/2026, Eric: «el rounded del marco mobile tiene que ser muy fiel a la realidad» · «sin muesca» ·
// «cuidado con ese 1 px en blanco entre vídeo y marco» · «revisa todo el contorno del frame interior: que no queden rebabas, que todo sea lineal y bien redondeado»).
// Antes las cuatro esquinas eran a ojo (ronda 67) y el radio un border-radius (~30 px): el cristal no quedaba recto en la caja y asomaba o se comía bisel.
// Ahora, en cada lámina (en directo y en espejo):
//   1. el cristal = el gris liso unido al centro; se ajusta una RECTA a cada uno de sus cuatro bordes (lejos de esquinas y de la muesca) → las cuatro esquinas;
//   2. la CAJA = ese cuadrilátero crecido MARGEN px (4: cubre todo el cristal; su fondo es negro) y, dentro, el VÍDEO en el rectángulo del cristal crecido
//      VIDEO px (1: apenas se mete bajo el marco);
//   3. la MÁSCARA, en el espacio de la caja (sin perspectiva): la forma del cristal de la foto (muesca rellena) suavizada, y sobre ella una forma LIMPIA ajustada,
//      bordes rectos y un arco por esquina con su radio (la foto no las tiene iguales: 25–33 px), crecida medio píxel.
//   4. detrás, el fondo NEGRO de la pantalla con la forma del cristal real (…-cristal.png): si entre la forma limpia y la foto queda una rendija, es negra.
//   node tools/mesa-movil/mascara.cjs → public/media/anteriores/mesa-movil(-espejo)-mascara.png y -cristal.png + src/data/mesa-movil.json ({ caja: esquinas, video: [x, y, ancho, alto] en % de la caja })
//   (DEPURA=1: el contorno, cristal frente a máscara, en 180 direcciones)
const sharp = require('sharp');
const fs = require('fs');
const VARIANTES = { 'mesa-movil': 'movil', 'mesa-movil-espejo': 'movil-espejo' };
const MARGEN = 4; // px de lámina que la CAJA (fondo negro) sobresale del cristal: el borde de la foto ondula y con 1–2 sobresalía (con 3 ya no; 4 de holgura)
const VIDEO = 1; // px de lámina que el VÍDEO sobresale del cristal (dentro de la caja: apenas se mete bajo el marco)
const CRECE = 0.75; // px de lámina que la forma de la foto se crece antes de ajustarle la limpia
const ESCALA = 3; // la máscara, a 3 px por px de lámina

const med = (v) => [...v].sort((x, y) => x - y)[v.length >> 1];
const recta = (pts) => { // mínimos cuadrados: v = m·u + b
  const n = pts.length, su = pts.reduce((s, [u]) => s + u, 0), sv = pts.reduce((s, [, v]) => s + v, 0), suu = pts.reduce((s, [u]) => s + u * u, 0), suv = pts.reduce((s, [u, v]) => s + u * v, 0);
  const m = (n * suv - su * sv) / (n * suu - su * su); return { m, b: (sv - m * su) / n };
};
// corte de una recta horizontal (y = m x + b) con una vertical (x = m' y + b')
const corte = (h, v) => { const y = (h.m * v.b + h.b) / (1 - h.m * v.m); return [v.m * y + v.b, y]; };

(async () => {
  const json = {};
  for (const [nombre, clave] of Object.entries(VARIANTES)) {
    const { data, info } = await sharp(`public/media/anteriores/${nombre}-otono.webp`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, px = (x, y) => { const i = (y * W + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
    const Lum = (c) => 0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2];
    // el cristal: gris neutro claro; alfa suave en el filo con el negro del bisel
    const cx0 = W * (clave === 'movil' ? 0.643 : 0.357) | 0, cy0 = (H * 0.47) | 0, Lr = Lum(px(cx0, cy0)), LB = 30;
    const alfa = (x, y) => { if (x < 0 || y < 0 || x >= W || y >= H) return 0; const c = px(x, y), L = Lum(c); if (Math.max(...c) - Math.min(...c) > 18 || L > Lr + 12) return 0; return Math.min(1, Math.max(0, (L - LB) / (Lr - 6 - LB))); };
    // relleno desde el centro: solo el cristal unido
    const dentro = new Uint8Array(W * H), pila = [[cx0, cy0]]; dentro[cy0 * W + cx0] = 1;
    while (pila.length) { const [x, y] = pila.pop(); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy, k = ny * W + nx; if (nx < 0 || ny < 0 || nx >= W || ny >= H || dentro[k]) continue; if (alfa(nx, ny) > 0.5) { dentro[k] = 1; pila.push([nx, ny]); } } }
    let x0 = W, x1 = 0, y0 = H, y1 = 0; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (dentro[y * W + x]) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    // el filo con subpíxel: desde dentro hacia fuera, dónde el alfa cruza 0,5
    const filo = (x, y, dx, dy) => { let k = 0; while (dentro[(y + dy * (k + 1)) * W + (x + dx * (k + 1))]) k++; const a1 = alfa(x + dx * k, y + dy * k), a2 = alfa(x + dx * (k + 1), y + dy * (k + 1)); return k + (a1 - 0.5) / Math.max(1e-3, a1 - a2); };
    const xm = Math.round((x0 + x1) / 2), ym = Math.round((y0 + y1) / 2), bw = x1 - x0, bh = y1 - y0;
    const tramo = (a, b, n) => Array.from({ length: n }, (_, i) => Math.round(a + ((b - a) * i) / (n - 1)));
    // arriba: dos franjas a los lados de la muesca; abajo, izquierda y derecha: el tramo central
    const arriba = recta([...tramo(x0 + bw * 0.12, x0 + bw * 0.22, 25), ...tramo(x0 + bw * 0.78, x0 + bw * 0.88, 25)].map((x) => [x, ym - filo(x, ym, 0, -1)]));
    const abajo = recta(tramo(x0 + bw * 0.2, x0 + bw * 0.8, 60).map((x) => [x, ym + filo(x, ym, 0, 1)]));
    const izq = recta(tramo(y0 + bh * 0.2, y0 + bh * 0.8, 80).map((y) => [y, xm - filo(xm, y, -1, 0)]));
    const der = recta(tramo(y0 + bh * 0.2, y0 + bh * 0.8, 80).map((y) => [y, xm + filo(xm, y, 1, 0)]));
    // los bordes, desplazados d px hacia fuera (en la normal) → sus cortes
    const fuera = (r, d, signo) => ({ m: r.m, b: r.b + signo * d * Math.hypot(1, r.m) });
    const esquinas = (d) => { const a = fuera(arriba, d, -1), b = fuera(abajo, d, 1), i = fuera(izq, d, -1), r = fuera(der, d, 1); return [corte(a, i), corte(a, r), corte(b, r), corte(b, i)]; };
    // los bordes del cristal están en el filo de su píxel (+0,5 al centro de píxel: las coordenadas de la lámina son de esquina de píxel)
    const vid = esquinas(MARGEN).map(([x, y]) => [+(x + 0.5).toFixed(1), +(y + 0.5).toFixed(1)]);
    if (process.env.DEPURA) { // cuánto cristal queda fuera de la caja crecida d px
      const dentroQ = (Q, x, y) => { let c = false; for (let i = 0, j = 3; i < 4; j = i++) { const [xi, yi] = Q[i], [xj, yj] = Q[j]; if ((yi > y) != (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
      for (const d of [1, 2, 3, 4, 5]) { const Q = esquinas(d).map(([x, y]) => [x + 0.5, y + 0.5]); let n = 0; for (let y = y0 - 8; y <= y1 + 8; y++) for (let x = x0 - 8; x <= x1 + 8; x++) if (alfa(x, y) >= 0.2 && dentro[y * W + x] !== undefined && (dentro[y * W + x] || [[1,0],[-1,0],[0,1],[0,-1]].some(([a, b]) => dentro[(y + b) * W + x + a])) && !dentroQ(Q, x + 0.5, y + 0.5)) n++; console.log('  caja +' + d + ' px: píxeles de cristal fuera', n); }
    }
    // la homografía de la caja (u, v ∈ [0, 1]) al cuadrilátero de la caja (la de Anteriores.astro y PiezaCasa.astro)
    const Q = vid, qx0 = Math.min(Q[0][0], Q[3][0]), qy0 = Math.min(Q[0][1], Q[1][1]), qW = Math.max(Q[1][0], Q[2][0]) - qx0, qH = Math.max(Q[2][1], Q[3][1]) - qy0;
    const [[a0, b0], [a1, b1], [a2, b2], [a3, b3]] = Q.map(([x, y]) => [(x - qx0) / qW, (y - qy0) / qH]);
    const dx1 = a1 - a2, dx2 = a3 - a2, dx3 = a0 - a1 + a2 - a3, dy1 = b1 - b2, dy2 = b3 - b2, dy3 = b0 - b1 + b2 - b3, det = dx1 * dy2 - dx2 * dy1;
    const g = (dx3 * dy2 - dx2 * dy3) / det, h = (dx1 * dy3 - dx3 * dy1) / det;
    const m = { a: a1 - a0 + g * a1, b: a3 - a0 + h * a3, c: a0, d: b1 - b0 + g * b1, e: b3 - b0 + h * b3, f: b0 };
    const OW = Math.round(qW * ESCALA), OH = Math.round(qH * ESCALA);
    const aLam = (u, v) => { const w = g * u + h * v + 1; return [qx0 + ((m.a * u + m.b * v + m.c) / w) * qW - 0.5, qy0 + ((m.d * u + m.e * v + m.f) / w) * qH - 0.5]; };
    // inversa (por iteración de Newton, basta para una homografía suave): lámina → caja
    const aCaja = (X, Y) => { let u = 0.5, v = 0.5; for (let k = 0; k < 20; k++) { const e = 1e-5, [x, y] = aLam(u, v), [xu, yu] = aLam(u + e, v), [xv, yv] = aLam(u, v + e), a11 = (xu - x) / e, a21 = (yu - y) / e, a12 = (xv - x) / e, a22 = (yv - y) / e, dt = a11 * a22 - a12 * a21, rx = x - X, ry = y - Y; u -= (a22 * rx - a12 * ry) / dt; v -= (-a21 * rx + a11 * ry) / dt; } return [u * OW, v * OH]; };
    // el VÍDEO: el cristal crecido VIDEO px, llevado a la caja → su rectángulo (en % de la caja)
    const vv = esquinas(VIDEO).map(([x, y]) => aCaja(x + 0.5, y + 0.5));
    let vl = (vv[0][0] + vv[3][0]) / 2, vr = (vv[1][0] + vv[2][0]) / 2, vt = (vv[0][1] + vv[1][1]) / 2, vb = (vv[2][1] + vv[3][1]) / 2;
    json[clave] = { caja: vid, video: [vl / OW, vt / OH, (vr - vl) / OW, (vb - vt) / OH].map((v) => +(v * 100).toFixed(3)) };
    // LA FORMA, LA DE LA FOTO (Eric: «estaba bien como teníamos»; un rectángulo redondeado ideal se desviaba hasta 3 px: las esquinas de la foto no son
    // iguales, 23–31 px). El cristal (con la muesca rellena hasta la recta del borde de arriba), suavizado en la lámina (gaussiana de 1,15 px: sin dientes ni
    // ondas al ampliarse) y cortado en el nivel que lo crece CRECE px; se pasa a la caja por la homografía
    const A = new Float32Array(W * H);
    for (let y = y0 - 3; y <= y1 + 3; y++) for (let x = x0 - 3; x <= x1 + 3; x++) A[y * W + x] = dentro[y * W + x] ? 1 : 0;
    // la muesca: solo en su tramo (20–80 % del ancho) y solo donde el cristal empieza más de 1 px por debajo de la recta (así no toca las esquinas)
    for (let x = Math.round(x0 + bw * 0.2); x <= Math.round(x0 + bw * 0.8); x++) {
      const yr = arriba.m * x + arriba.b; let yg = Math.round(yr) - 2; while (yg < ym && !dentro[yg * W + x]) yg++;
      if (yg - yr > 1) for (let y = Math.round(yr); y < yg; y++) A[y * W + x] = 1;
    }
    const sig = 1.15, rad = 4, ker = Array.from({ length: 2 * rad + 1 }, (_, k) => Math.exp(-((k - rad) ** 2) / (2 * sig * sig))), ks = ker.reduce((s, v) => s + v, 0);
    const tmp = new Float32Array(W * H), S = new Float32Array(W * H);
    for (let y = y0 - 6; y <= y1 + 6; y++) for (let x = x0 - 6; x <= x1 + 6; x++) { let s = 0; for (let k = -rad; k <= rad; k++) s += A[y * W + x + k] * ker[k + rad]; tmp[y * W + x] = s / ks; }
    for (let y = y0 - 6; y <= y1 + 6; y++) for (let x = x0 - 6; x <= x1 + 6; x++) { let s = 0; for (let k = -rad; k <= rad; k++) s += tmp[(y + k) * W + x] * ker[k + rad]; S[y * W + x] = s / ks; }
    const Sb = (x, y) => { const fx = Math.floor(x), fy = Math.floor(y), tx = x - fx, ty = y - fy, s = (a, b) => S[b * W + a]; return s(fx, fy) * (1 - tx) * (1 - ty) + s(fx + 1, fy) * tx * (1 - ty) + s(fx, fy + 1) * (1 - tx) * ty + s(fx + 1, fy + 1) * tx * ty; };
    // nivel del corte: en un borde recto suavizado, el perfil es la función de error; CRECE px hacia fuera ≈ nivel Φ(−CRECE/σ)
    const phi = (z) => 0.5 * (1 + Math.tanh(0.7978845608 * (z + 0.044715 * z ** 3)));
    const nivel = phi(-CRECE / sig), ancho = 0.5 / (sig * ESCALA * 0.4); // ~1 px de máscara de antialias
    const out = Buffer.alloc(OW * OH * 4);
    for (let jj = 0; jj < OH; jj++) for (let ii = 0; ii < OW; ii++) {
      const [X, Y] = aLam((ii + 0.5) / OW, (jj + 0.5) / OH), v = Sb(X, Y), t = Math.min(1, Math.max(0, (v - nivel) / ancho + 0.5)), k = (jj * OW + ii) * 4;
      out[k] = out[k + 1] = out[k + 2] = 255; out[k + 3] = Math.round(255 * t * t * (3 - 2 * t));
    }
    const vg = esquinas(0), cG = [(vg[0][0] + vg[2][0]) / 2, (vg[0][1] + vg[2][1]) / 2];
    // LA FORMA LIMPIA (Eric: «que no queden rebabas, que todo sea lineal y bien redondeado»): el filo de la foto ondula (imagen generada) y, ampliado, se nota.
    // Sobre la forma de la foto se AJUSTA un rectángulo de bordes rectos con un arco por esquina (cada una con su radio: la foto no las tiene iguales) y se crece
    // lo justo para que no asome cristal en ningún punto
    // el cristal REAL, sin suavizar (suavizada, una esquina se mete hacia dentro y la rendija se colaba: «todavía hay una muesquita de aire arriba a la izquierda»)
    const real = new Uint8Array(OW * OH);
    for (let jj = 0; jj < OH; jj++) for (let ii = 0; ii < OW; ii++) { const [X, Y] = aLam((ii + 0.5) / OW, (jj + 0.5) / OH), xi = Math.round(X), yi = Math.round(Y); real[jj * OW + ii] = A[yi * W + xi] > 0.5 || (dentro[yi * W + xi] && alfa(xi, yi) >= 0.35) ? 1 : 0; }
    const fa = (i, j) => (i < 0 || j < 0 || i >= OW || j >= OH ? 0 : real[j * OW + i]);
    const cruce = (fn, n) => { for (let k = 0; k < n; k++) if (fn(k) >= 0.5) return k; return n; };
    const fil = (a, b) => Array.from({ length: 41 }, (_, k) => Math.round(a + ((b - a) * k) / 40));
    const bL = med(fil(OH * 0.3, OH * 0.7).map((j) => cruce((i) => fa(i, j), OW))), bR = OW - med(fil(OH * 0.3, OH * 0.7).map((j) => cruce((i) => fa(OW - 1 - i, j), OW)));
    const bT = med(fil(OW * 0.3, OW * 0.7).map((i) => cruce((j) => fa(i, j), OH))), bB = OH - med(fil(OW * 0.3, OW * 0.7).map((i) => cruce((j) => fa(i, OH - 1 - j), OH)));
    // (Eric: «el lateral izquierdo, un pelín más gordo; cuadra el frame»): el rectángulo del vídeo, del cristal MEDIDO EN LA CAJA (los bordes de la lámina iban
    // ~1 px a la derecha: a la izquierda faltaba vídeo y a la derecha sobraba), VIDEO px por fuera
    vl = bL - VIDEO * ESCALA; vr = bR + VIDEO * ESCALA; vt = bT - VIDEO * ESCALA; vb = bB + VIDEO * ESCALA;
    json[clave].video = [vl / OW, vt / OH, (vr - vl) / OW, (vb - vt) / OH].map((v) => +(v * 100).toFixed(3));
    // dentro de la forma ideal (rectángulo [bL, bR] × [bT, bB] con radios rs[TL, TR, BR, BL]) — distancia con signo al borde (> 0 fuera)
    const dist = (x, y, rs, g = 0) => {
      const l = bL - g, r = bR + g, t = bT - g, b = bB + g;
      const [cx, cy, rr] = x < (l + r) / 2 ? (y < (t + b) / 2 ? [l + rs[0], t + rs[0], rs[0]] : [l + rs[3], b - rs[3], rs[3]]) : y < (t + b) / 2 ? [r - rs[1], t + rs[1], rs[1]] : [r - rs[2], b - rs[2], rs[2]];
      if (((x < l + rr) && (y < t + rr || y > b - rr)) || ((x > r - rr) && (y < t + rr || y > b - rr))) return Math.hypot(x - cx, y - cy) - (rr + g);
      return Math.max(l - x, x - r, t - y, y - b);
    };
    // el radio de cada esquina: el que mejor casa con la foto en su cuadrado (área distinta, mínima)
    const caja = 70 * ESCALA, rs = [0, 0, 0, 0];
    [[bL, bT, 1, 1], [bR, bT, -1, 1], [bR, bB, -1, -1], [bL, bB, 1, -1]].forEach(([ex, ey, sx, sy], q) => {
      let mejor = Infinity;
      for (let rad = 12 * ESCALA; rad <= 45 * ESCALA; rad += 0.5) {
        const prueba = [...rs]; prueba[q] = rad; let mal = 0;
        for (let k = 0; k < caja; k += 2) for (let l2 = 0; l2 < caja; l2 += 2) { const x = ex + sx * k, y = ey + sy * l2; mal += Math.abs((dist(x, y, prueba) <= 0 ? 1 : 0) - (fa(Math.round(x), Math.round(y)) >= 0.5 ? 1 : 0)); }
        if (mal < mejor) { mejor = mal; rs[q] = rad; }
      }
    });
    // crecer lo justo: el punto de cristal (foto) más alejado fuera de la forma, sin pasar de 2 px de lámina
    let sobra = 0; for (let j = 0; j < OH; j += 1) for (let i = 0; i < OW; i += 1) if (fa(i, j) >= 0.5) sobra = Math.max(sobra, dist(i + 0.5, j + 0.5, rs));
    // (Eric: «rellénala de negro»): la forma limpia solo crece medio píxel; lo que quede de cristal entre ella y la foto lo tapa el fondo NEGRO de la pantalla, que
    // lleva su propia máscara, la del cristal real (…-cristal.png)
    // (Eric: «en el lateral izquierdo, 1 px vertical negro que debería ser vídeo»): con ½ px, donde el filo de la foto se iba hacia fuera asomaba el negro. La forma
    // crece hasta el borde del vídeo (VIDEO px): en los bordes rectos el vídeo llega a su caja; el negro solo queda en lo que la caja no cubre
    const gr = VIDEO * ESCALA + 2;
    const svgR = (x, y) => x.toFixed(2) + ' ' + y.toFixed(2);
    const l = bL - gr, r = bR + gr, t = bT - gr, b = bB + gr, [r0, r1, r2, r3] = rs.map((v) => v + gr);
    const d = `M${svgR(l + r0, t)} L${svgR(r - r1, t)} A${r1} ${r1} 0 0 1 ${svgR(r, t + r1)} L${svgR(r, b - r2)} A${r2} ${r2} 0 0 1 ${svgR(r - r2, b)} L${svgR(l + r3, b)} A${r3} ${r3} 0 0 1 ${svgR(l, b - r3)} L${svgR(l, t + r0)} A${r0} ${r0} 0 0 1 ${svgR(l + r0, t)} Z`;
    const limpia = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OW}" height="${OH}"><path d="${d}" fill="#fff"/></svg>`)).ensureAlpha().raw().toBuffer();
    limpia.copy(out);
    if (process.env.DEPURA) { // por filas: cuánto cristal real queda fuera del vídeo por cada lado (px de lámina; > 0 = hueco que se ve negro)
      const vx0 = vl, vx1 = vr, filas = [];
      for (const fr of [0.08, 0.15, 0.3, 0.5, 0.7, 0.85, 0.92]) { const j = Math.round(OH * fr); let a = -1, b = -1; for (let i = 0; i < OW; i++) if (fa(i, j)) { if (a < 0) a = i; b = i; } filas.push(`${fr}: izq ${((vx0 - a) / ESCALA).toFixed(1)} der ${((b - vx1) / ESCALA).toFixed(1)}`); }
      const cols = []; for (const fc of [0.15, 0.5, 0.85]) { const i = Math.round(OW * fc); let a = -1, b = -1; for (let j = 0; j < OH; j++) if (fa(i, j)) { if (a < 0) a = j; b = j; } cols.push(`${fc}: arr ${((vt - a) / ESCALA).toFixed(1)} ab ${((b - vb) / ESCALA).toFixed(1)}`); }
      console.log('  ', filas.join(' · '), '\n  ', cols.join(' · '));
    }
    console.log(nombre, 'radios (px de lámina, TL TR BR BL):', rs.map((v) => (v / ESCALA).toFixed(1)).join(' '), '· crece', (gr / ESCALA).toFixed(2), 'px (cristal fuera de la forma, sin crecer:', (sobra / ESCALA).toFixed(2), ')');
    // el CRISTAL real crecido 3 px (tapa entero el brillo de su filo; sobre el bisel, negro sobre negro no se ve): la máscara del fondo negro de la pantalla
    const cr = Buffer.alloc(OW * OH);
    for (let jj = 0; jj < OH; jj++) for (let ii = 0; ii < OW; ii++) { let v = 0; for (let dj = -3 * ESCALA; dj <= 3 * ESCALA && !v; dj++) for (let di = -3 * ESCALA; di <= 3 * ESCALA && !v; di++) v = fa(ii + di, jj + dj); cr[jj * OW + ii] = v ? 255 : 0; }
    const crS = await sharp(cr, { raw: { width: OW, height: OH, channels: 1 } }).blur(1).extractChannel(0).raw().toBuffer();
    const crO = Buffer.alloc(OW * OH * 4); for (let k = 0; k < OW * OH; k++) { crO[k * 4] = crO[k * 4 + 1] = crO[k * 4 + 2] = 255; crO[k * 4 + 3] = crS[k]; }
    await sharp(crO, { raw: { width: OW, height: OH, channels: 4 } }).png({ compressionLevel: 9 }).toFile(`public/media/anteriores/${nombre}-cristal.png`);
    // la forma limpia, en las coordenadas del vídeo (su rectángulo dentro de la caja)
    const dst = `public/media/anteriores/${nombre}-mascara.png`, ex = { left: Math.round(vl), top: Math.round(vt), width: Math.round(vr - vl), height: Math.round(vb - vt) };
    await sharp(out, { raw: { width: OW, height: OH, channels: 4 } }).extract(ex).png({ compressionLevel: 9 }).toFile(dst);
    console.log(nombre, 'caja', JSON.stringify(vid), '· inclinaciones', [arriba.m, abajo.m, izq.m, der.m].map((v) => v.toFixed(4)).join(' '));
    if (process.env.DEPURA) {
      // el contorno: en 180 direcciones desde el centro, el filo del cristal (lámina) frente al de la máscara (llevado a la lámina); > 0 = asoma cristal
      const ma = (u, v) => { const i = Math.round(u * OW), j = Math.round(v * OH); return i < 0 || j < 0 || i >= OW || j >= OH ? 0 : out[(j * OW + i) * 4 + 3] / 255; };
      const res = [];
      for (let t = 0; t < 360; t += 2) {
        const dx = Math.cos((t * Math.PI) / 180), dy = Math.sin((t * Math.PI) / 180);
        let kg = 0; for (let k = 0; k < 400; k += 0.25) { if (alfa(Math.round(cG[0] + dx * k - 0.5), Math.round(cG[1] + dy * k - 0.5)) >= 0.5 && dentro[Math.round(cG[1] + dy * k - 0.5) * W + Math.round(cG[0] + dx * k - 0.5)]) kg = k; else if (k > kg + 2) break; }
        let km = 0; for (let k = 0; k < 400; k += 0.25) { const [u, v] = aCaja(cG[0] + dx * k, cG[1] + dy * k); if (ma(u / OW, v / OH) >= 0.5) km = k; else if (k > km + 2) break; }
        res.push([t, +(kg - km).toFixed(2)]);
      }
      const arribaMuesca = ([t]) => t > 235 && t < 305; // la muesca (cristal que falta: no cuenta)
      const v = res.filter((r) => !arribaMuesca(r)).map((r) => r[1]);
      console.log('  contorno (cristal − máscara, px de lámina): max', Math.max(...v), 'min', Math.min(...v), '· peores', JSON.stringify(res.filter((r) => !arribaMuesca(r)).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).slice(0, 6)));
    }
  }
  fs.writeFileSync('src/data/mesa-movil.json', JSON.stringify(json, null, 1) + '\n');
  console.log('→ src/data/mesa-movil.json');
})();
