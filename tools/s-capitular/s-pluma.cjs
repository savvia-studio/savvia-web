// La S a medida, como hecha a pluma de punta fina: una línea central (Catmull-Rom por puntos de control) y un grosor que depende de hacia dónde
// va la pluma (la presión): fina al subir y en horizontal, gruesa al bajar. Sale un contorno relleno en SVG (viewBox en unidades de 1000 = 1 em).
// uso: node s-pluma.cjs <dir>  → <dir>/<variante>.svg
const fs = require('fs');
const OUT = process.argv[2];

// curva suave que pasa por los puntos (Catmull-Rom centrípeta, muestreada)
function cr(P, n = 60) {
  const out = [];
  const Q = [P[0], ...P, P[P.length - 1]];
  for (let i = 1; i < Q.length - 2; i++) {
    const [p0, p1, p2, p3] = [Q[i - 1], Q[i], Q[i + 1], Q[i + 2]];
    const d = (a, b) => Math.pow(Math.hypot(b[0] - a[0], b[1] - a[1]), 0.5) || 1e-6;
    const t0 = 0, t1 = t0 + d(p0, p1), t2 = t1 + d(p1, p2), t3 = t2 + d(p2, p3);
    for (let k = 0; k < n; k++) {
      const t = t1 + ((t2 - t1) * k) / n;
      const L = (a, b, ta, tb) => [((tb - t) / (tb - ta)) * a[0] + ((t - ta) / (tb - ta)) * b[0], ((tb - t) / (tb - ta)) * a[1] + ((t - ta) / (tb - ta)) * b[1]];
      const A1 = L(p0, p1, t0, t1), A2 = L(p1, p2, t1, t2), A3 = L(p2, p3, t2, t3);
      const B1 = L(A1, A2, t0, t2), B2 = L(A2, A3, t1, t3);
      out.push(L(B1, B2, t1, t2));
    }
  }
  out.push(P[P.length - 1]);
  return out;
}

// el contorno: a cada punto, su normal por el grosor; grosor = fino + (grueso − fino) · (cuánto baja la pluma)^k, suavizado
function trazo(P, { fino = 9, grueso = 70, k = 1.6, punta = 0.08, eje = 0 }) {
  const pts = cr(P);
  const n = pts.length;
  const w = pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1]; const L = Math.hypot(dx, dy) || 1;
    dx /= L; dy /= L;
    // la presión: el componente hacia abajo, girado un poco por la inclinación de la mano (eje)
    const baja = Math.max(0, dy * Math.cos(eje) - dx * Math.sin(eje));
    return fino + (grueso - fino) * Math.pow(baja, k);
  });
  // suavizado del grosor (la presión no cambia de golpe) y afinado en las puntas
  let ws = w.slice();
  for (let it = 0; it < 6; it++) ws = ws.map((v, i) => (ws[Math.max(0, i - 2)] + ws[Math.max(0, i - 1)] + v * 2 + ws[Math.min(n - 1, i + 1)] + ws[Math.min(n - 1, i + 2)]) / 6);
  ws = ws.map((v, i) => { const t = i / (n - 1); const f = Math.min(1, t / punta, (1 - t) / (punta * 0.6)); return Math.max(2.5, v * (0.35 + 0.65 * Math.min(1, f))); });
  // los sellos: un círculo por cada medio radio de avance
  const out = [];
  let acum = 0;
  for (let i = 0; i < n; i++) {
    if (i) acum += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (i && i < n - 1 && acum < ws[i] * 0.18) continue;
    acum = 0;
    out.push(`<circle cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="${(ws[i] / 2).toFixed(1)}"/>`);
  }
  // debajo de los sellos, la línea central como trazo continuo del grosor fino: el perfil no se ve punteado en tamaños pequeños
  const linea = `<path fill="none" stroke="currentColor" stroke-width="${(Math.min(...ws) * 0.95).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" d="M${pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L')}"/>`;
  return { circulos: linea + out.join(''), pts, ws };
}

// las variantes: puntos de la línea central (y hacia abajo; línea de base en 0, altura de la S unos −1000)
const V = {
  // A · T1 + T6: la entrada fina en diagonal desde abajo a la izquierda sube, da una vuelta amplia arriba (el lazo de T6), baja por la columna gruesa
  // y la cola vuelve hacia la izquierda con un rizo pequeño
  'pluma-a': { P: [[-640, 70], [-320, -300], [40, -700], [300, -930], [450, -1020], [470, -1090], [380, -1120], [240, -1070], [150, -960], [130, -820], [200, -680], [350, -540], [470, -380], [490, -190], [400, -40], [220, 30], [40, 10], [-60, -70], [-40, -150]], op: { grueso: 132, fino: 13 } },
  // B · más T6: el lazo de arriba más grande y la letra más vertical
  'pluma-b': { P: [[-520, 50], [-220, -360], [100, -760], [330, -980], [500, -1060], [520, -1150], [400, -1190], [230, -1130], [130, -990], [120, -830], [210, -680], [370, -540], [480, -370], [490, -180], [390, -30], [210, 30], [30, 0], [-50, -90]], op: { grueso: 140, fino: 13, k: 1.4 } },
  // C · más T1: sin lazo, la entrada gira arriba en una curva abierta y baja
  'pluma-c': { P: [[-660, 80], [-340, -290], [40, -700], [300, -940], [470, -1040], [560, -1050], [520, -980], [380, -950], [220, -890], [140, -760], [200, -620], [360, -500], [480, -340], [490, -160], [400, -30], [220, 30], [40, 0], [-60, -80]], op: { grueso: 132, fino: 13 } },
  // D · como A, con la cola alargada hacia la derecha, que enlaza con la «a»
  'pluma-d': { P: [[-640, 70], [-320, -300], [40, -700], [300, -930], [450, -1020], [470, -1090], [380, -1120], [240, -1070], [150, -960], [130, -820], [200, -680], [350, -540], [470, -380], [490, -190], [400, -40], [220, 30], [60, 10], [10, -50], [120, -70], [330, -40], [520, 0]], op: { grueso: 132, fino: 13 } },
};
for (const [id, { P, op }] of Object.entries(V)) {
  const { circulos, pts, ws } = trazo(P, op);
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9;
  pts.forEach((p, i) => { const r = ws[i] / 2; x0 = Math.min(x0, p[0] - r); x1 = Math.max(x1, p[0] + r); y0 = Math.min(y0, p[1] - r); y1 = Math.max(y1, p[1] + r); });
  const m = 12, vb = [x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m].map((v) => Math.round(v));
  // data-base: dónde cae la línea de base (y = 0) desde arriba, en unidades del viewBox; data-izq: dónde cae x = 0 desde la izquierda
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" data-base="${-vb[1]}" data-izq="${-vb[0]}"><g fill="currentColor">${circulos}</g></svg>`;
  fs.writeFileSync(`${OUT}/${id}.svg`, svg);
  console.log(id, vb.join(' '), (svg.length / 1024).toFixed(1) + ' KB');
}
