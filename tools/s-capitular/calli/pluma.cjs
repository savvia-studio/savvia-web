// La pluma de punta fina sobre una línea central dada: fina al subir y en horizontal, gruesa al bajar (la presión).
// Devuelve el SVG (sellos + línea central) en unidades de 1000 = alto de la S. Mismo motor que ../s-pluma.cjs.
function suaviza(P, n = 3) { // Catmull-Rom uniforme entre los puntos, para que los sellos no dejen dientes
  const o = [], Q = [P[0], ...P, P[P.length - 1]];
  for (let i = 1; i < Q.length - 2; i++) for (let k = 0; k < n; k++) { const t = k / n, t2 = t * t, t3 = t2 * t;
    o.push([0, 1].map((j) => 0.5 * (2 * Q[i][j] + (-Q[i - 1][j] + Q[i + 1][j]) * t + (2 * Q[i - 1][j] - 5 * Q[i][j] + 4 * Q[i + 1][j] - Q[i + 2][j]) * t2 + (-Q[i - 1][j] + 3 * Q[i][j] - 3 * Q[i + 1][j] + Q[i + 2][j]) * t3))); }
  o.push(P[P.length - 1]); return o;
}
function trazo(P0, { fino = 13, grueso = 132, k = 1.6, punta = 0.08, eje = 0.18 } = {}) {
  const pts = suaviza(P0), n = pts.length;
  const w = pts.map((p, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const L = Math.hypot(dx, dy) || 1; dx /= L; dy /= L;
    const baja = Math.max(0, dy * Math.cos(eje) - dx * Math.sin(eje)); return fino + (grueso - fino) * Math.pow(baja, k); });
  let ws = w.slice(); for (let it = 0; it < 6; it++) ws = ws.map((v, i) => (ws[Math.max(0, i - 2)] + ws[Math.max(0, i - 1)] + v * 2 + ws[Math.min(n - 1, i + 1)] + ws[Math.min(n - 1, i + 2)]) / 6);
  ws = ws.map((v, i) => { const t = i / (n - 1); const f = Math.min(1, t / punta, (1 - t) / (punta * 0.6)); return Math.max(2.5, v * (0.35 + 0.65 * Math.min(1, f))); });
  const out = []; let acum = 0;
  for (let i = 0; i < n; i++) { if (i) acum += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (i && i < n - 1 && acum < ws[i] * 0.18) continue; acum = 0; out.push(`<circle cx="${pts[i][0].toFixed(1)}" cy="${pts[i][1].toFixed(1)}" r="${(ws[i] / 2).toFixed(1)}"/>`); }
  const linea = `<path fill="none" stroke="currentColor" stroke-width="${(Math.min(...ws) * 0.95).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" d="M${pts.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L')}"/>`;
  return { svg: linea + out.join(''), pts, ws };
}
function svgS(trazos, op) {
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, cuerpo = '';
  for (const T of trazos) { const { svg, pts, ws } = trazo(T, op); cuerpo += svg; pts.forEach((p, i) => { const r = ws[i] / 2; x0 = Math.min(x0, p[0] - r); x1 = Math.max(x1, p[0] + r); y0 = Math.min(y0, p[1] - r); y1 = Math.max(y1, p[1] + r); }); }
  const m = 12, vb = [x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m].map(Math.round);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" data-base="${-vb[1]}" data-izq="${-vb[0]}"><g fill="currentColor">${cuerpo}</g></svg>`;
}
module.exports = { trazo, svgS };
