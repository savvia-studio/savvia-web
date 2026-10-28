// Variantes de la S de T1 (Herr Von Muellerhoff) hechas sobre SU gesto (línea central + grosor, de gesto.json), en unidades de la
// fuente (1000 = 1 em, y hacia abajo, base en y = 0, origen x = 0). uso: node variantes.cjs <dir> → <dir>/<id>.svg + hoja.png
const fs = require('fs');
const G = JSON.parse(fs.readFileSync(__dirname + '/gesto.json', 'utf8'));
const ADV = 563;
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
const apex = (C) => C.reduce((m, p, i) => (p[1] < C[m][1] ? i : m), 0);
const pluma = (d, fino = 12, grueso = 50) => fino + (grueso - fino) * Math.pow(Math.max(0, d[1] * 0.98 - d[0] * 0.2), 1.6);

// suaviza la curva de grosor (sin cambiar la línea)
const suaveW = (W, n = 4) => { let w = W.slice(); for (let it = 0; it < n; it++) w = w.map((v, i) => (w[Math.max(0, i - 1)] + 2 * v + w[Math.min(w.length - 1, i + 1)]) / 4); return w; };

// LAZO en la cabeza: al llegar arriba, en vez del pico, la pluma sigue y se curva hacia la izquierda (sube, va a la izquierda, baja) y
// entra en la columna desde más a la izquierda; la columna se recoloca con un desplazamiento que se apaga hacia abajo.
function lazo({ C, W }, { r = 90, giro = 270, mezcla = 60 } = {}) {
  const a = apex(C), d1 = norm([C[a][0] - C[a - 6][0], C[a][1] - C[a - 6][1]]);
  const izq = [d1[1], -d1[0]], cen = [C[a][0] + izq[0] * r, C[a][1] + izq[1] * r];
  const t0 = Math.atan2(C[a][1] - cen[1], C[a][0] - cen[0]);
  // sentido: la derivada al empezar tiene que ir hacia d1
  const sg = (-Math.sin(t0) * d1[0] + Math.cos(t0) * d1[1]) > 0 ? 1 : -1;
  const n = Math.round(giro / 4), L = [], LW = [];
  for (let k = 1; k <= n; k++) { const t = t0 + sg * (giro * Math.PI / 180) * (k / n); L.push([cen[0] + r * Math.cos(t), cen[1] + r * Math.sin(t)]); }
  for (let k = 0; k < L.length; k++) { const p0 = k ? L[k - 1] : C[a]; LW.push(pluma(norm([L[k][0] - p0[0], L[k][1] - p0[1]]))); }
  const Q = L[L.length - 1], off = [Q[0] - C[a][0], Q[1] - C[a][1]];
  const resto = C.slice(a + 1).map((p, i) => { const f = Math.max(0, 1 - i / mezcla); const e = f * f * (3 - 2 * f); return [p[0] + off[0] * e, p[1] + off[1] * e]; });
  return { C: [...C.slice(0, a + 1), ...L, ...resto], W: suaveW([...W.slice(0, a + 1), ...LW, ...W.slice(a + 1)]) };
}
// COLA más larga: la curva final sigue girando como venía y abraza por debajo (el vientre de abajo de la S)
function cola({ C, W }, { largo = 0.6, giro = 1.0 } = {}) {
  const n = C.length, k = 12; const p = C[n - 1], q = C[n - 1 - k];
  let d = norm([p[0] - q[0], p[1] - q[1]]); const ang = Math.atan2(d[1], d[0]);
  const ant = norm([q[0] - C[n - 1 - 2 * k][0], q[1] - C[n - 1 - 2 * k][1]]);
  let curv = ang - Math.atan2(ant[1], ant[0]); curv = Math.atan2(Math.sin(curv), Math.cos(curv)) / k * giro;
  const paso = 4, m = Math.round((largo * 300) / paso), N = [], NW = []; let a = ang, x = p[0], y = p[1];
  for (let i = 0; i < m; i++) { a += curv; x += Math.cos(a) * paso; y += Math.sin(a) * paso; N.push([x, y]); NW.push(Math.max(3, W[n - 2] * (1 - i / m) + pluma([Math.cos(a), Math.sin(a)], 8, 34) * 0.5 * (1 - i / m))); }
  return { C: [...C, ...N], W: suaveW([...W.slice(0, n - 1), ...NW, 2]) };
}
// CRUCE: desde la cabeza hacia abajo, la columna y la cola se llevan hacia la derecha (cuanto más abajo, más): la columna pasa a
// cruzar de arriba a la izquierda a abajo a la derecha, como la diagonal de una S, y la cola queda como su curva de abajo
function cruce({ C, W }, dx = 300, vuelve = 0.8) {
  const a = apex(C), yA = C[a][1], yB = Math.max(...C.slice(a).map((p) => p[1]));
  let b = a; C.forEach((p, i) => { if (i > a && p[1] > C[b][1]) b = i; });
  // pasado el punto más bajo, la cola recupera su sitio a la izquierda: la curva de abajo se abre como la de arriba
  return { C: C.map((p, i) => { if (i <= a) return p; const t = Math.min(1, Math.max(0, (p[1] - yA) / (yB - yA))); let e = t * t * (3 - 2 * t);
    if (i > b) { const u = Math.min(1, (i - b) / Math.max(1, (C.length - 1 - b))); e *= 1 - vuelve * (u * u * (3 - 2 * u)); } return [p[0] + dx * e, p[1]]; }), W };
}
// redondea la curva de abajo: suavizado (media de vecinos) desde algo antes del punto más bajo hasta la punta
function redondea({ C, W }, veces = 40) {
  const a = apex(C); let b = a; C.forEach((p, i) => { if (i > a && p[1] > C[b][1]) b = i; });
  let P = C.map((p) => p.slice()); const i0 = Math.max(a + 5, b - 35);
  for (let it = 0; it < veces; it++) P = P.map((p, i) => (i <= i0 || i >= P.length - 1 ? p : [(P[i - 1][0] + 2 * p[0] + P[i + 1][0]) / 4, (P[i - 1][1] + 2 * p[1] + P[i + 1][1]) / 4]));
  return { C: P, W };
}
// la cola acaba antes: tras el punto más bajo, solo sube hasta una fracción del alto (en la T1 sube hasta media letra)
function rabo({ C, W }, sube = 0.2) {
  const a = apex(C); let b = a; C.forEach((p, i) => { if (i > a && p[1] > C[b][1]) b = i; });
  const H = C[b][1] - C[a][1]; let f = C.length; for (let i = b; i < C.length; i++) if (C[b][1] - C[i][1] > sube * H) { f = i; break; }
  const w = W.slice(0, f).map((v, i) => (i > f - 12 ? v * Math.max(0.25, (f - i) / 12) : v)); // afina la punta
  return { C: C.slice(0, f), W: w };
}
const recorta = ({ C, W }, f) => { const i = Math.round(apex(C) * f); return { C: C.slice(i), W: W.slice(i) }; };
const contraste = ({ C, W }, k) => ({ C, W: W.map((w) => 12 + (w - 12) * k) });
const gira = ({ C, W }, grados) => { const t = (grados * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t); return { C: C.map(([x, y]) => [x * c - y * s, x * s + y * c]), W }; };
const base = { C: G.C, W: G.W };
const R = { r: 65, giro: 180, mezcla: 75 };
const S = (g, dx, rr = R, sube = 0.18, vuelve = 0.8) => rabo(redondea(cruce(lazo(g, rr), dx, vuelve)), sube);
const L = { r: 150, giro: 195, mezcla: 100 };
const V = {
  't1': { g: base, nota: 'La T1 tal cual, rehecha desde su gesto con nuestra pluma (la referencia).' },
  'a': { g: S(base, 340, L, 0.25, 0.8), nota: '' },
  'b': { g: S(base, 340, L, 0.35, 1.0), nota: '' },
  'c': { g: S(base, 380, { r: 130, giro: 190, mezcla: 100 }, 0.3, 1.0), nota: '' },
  'd': { g: S(base, 300, { r: 120, giro: 185, mezcla: 90 }, 0.3, 0.9), nota: '' },
  'e': { g: S(base, 420, { r: 170, giro: 200, mezcla: 110 }, 0.3, 1.1), nota: '' },
  'f': { g: S(recorta(base, 0.5), 340, L, 0.3, 1.0), nota: '' },
  'g': { g: gira(S(base, 340, L, 0.3, 1.0), -8), nota: '' },
  'h': { g: contraste(S(base, 340, L, 0.3, 1.0), 1.4), nota: '' },
};
function svg({ C, W }) {
  // un sello por paso, más la línea central fina debajo (como pluma.cjs)
  let x0 = 1e9, x1 = -1e9, y0 = 1e9, y1 = -1e9, c = ''; let ac = 0;
  C.forEach((p, i) => { const r = W[i] / 2; x0 = Math.min(x0, p[0] - r); x1 = Math.max(x1, p[0] + r); y0 = Math.min(y0, p[1] - r); y1 = Math.max(y1, p[1] + r);
    if (i) ac += Math.hypot(p[0] - C[i - 1][0], p[1] - C[i - 1][1]); if (i && i < C.length - 1 && ac < Math.max(1.5, r * 0.25)) return; ac = 0; c += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r.toFixed(1)}"/>`; });
  // con pocos puntos el sello deja dientes: densificar
  const m = 10, vb = [x0 - m, y0 - m, x1 - x0 + 2 * m, y1 - y0 + 2 * m].map(Math.round);
  const ln = `<path fill="none" stroke="currentColor" stroke-width="${(Math.min(...W) * 0.95).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" d="M${C.map((p) => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L')}"/>`;
  // avance: lo más a la derecha de la mitad de abajo de la letra (donde sigue la «a»), con un poco de aire; la T1 conserva el suyo
  const bajo = C.map((p, i) => (p[1] > -330 ? p[0] + W[i] / 2 : -1e9)), adv = Math.round(Math.max(ADV, Math.max(...bajo) + 25));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" data-adv="${adv}"><g fill="currentColor">${ln}${c}</g></svg>`;
}
// densifica: puntos cada 2 unidades (interpolando grosor), para que los sellos no dejen dientes
const densa = ({ C, W }) => { const oc = [C[0]], ow = [W[0]]; for (let i = 1; i < C.length; i++) { const l = Math.hypot(C[i][0] - C[i - 1][0], C[i][1] - C[i - 1][1]), n = Math.max(1, Math.ceil(l / 2)); for (let k = 1; k <= n; k++) { const t = k / n; oc.push([C[i - 1][0] + (C[i][0] - C[i - 1][0]) * t, C[i - 1][1] + (C[i][1] - C[i - 1][1]) * t]); ow.push(W[i - 1] + (W[i] - W[i - 1]) * t); } } return { C: oc, W: ow }; };
module.exports = { V, svg, densa };
if (require.main === module) {
  const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
  for (const [id, v] of Object.entries(V)) fs.writeFileSync(`${OUT}/${id}.svg`, svg(densa(v.g)));
  const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
  const orig = JSON.parse(fs.readFileSync(__dirname + '/s-t1.json', 'utf8')).d;
  const html = `<body style="margin:0;background:#fff;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:8px;font:12px monospace">
    <div style="height:300px;border:1px solid #ddd;display:flex;flex-direction:column;align-items:center"><svg viewBox="-260 -780 1000 900" style="height:270px"><path d="${orig}" transform="scale(1,-1)" fill="#302018"/></svg>fuente original</div>
    ${Object.keys(V).map((id) => `<div style="height:300px;border:1px solid #ddd;display:flex;flex-direction:column;align-items:center;color:#302018">${fs.readFileSync(`${OUT}/${id}.svg`, 'utf8').replace('<svg ', '<svg style="height:270px;width:auto;max-width:100%" ')}${id}</div>`).join('')}</body>`;
  (async () => { const b = await chromium.launch(launchOpts); const p = await b.newPage({ viewport: { width: 1200, height: 900 } }); await p.setContent(html); await p.screenshot({ path: `${OUT}/hoja.png`, fullPage: true }); await b.close(); })();
}
