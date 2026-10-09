// Ajusta curvas de Bézier (Schneider) al contorno poligonal del isotipo → pocos anclajes con sus manejadores.
const fs = require('fs');
const s = fs.readFileSync('public/savvia-isotipo-gota.svg', 'utf8');
let P = [...s.match(/ d="([^"]+)"/)[1].matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((m) => [+m[1], +m[2]]);
if (Math.hypot(P[0][0] - P.at(-1)[0], P[0][1] - P.at(-1)[1]) < 1e-6) P.pop();
const TOL = +(process.argv[2] || 0.12);
const MAXP = +(process.argv[3] || 70); // ningún tramo más largo que esto (anclas repartidas y manejadores cortos)
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1], len = (a) => Math.hypot(a[0], a[1]), nrm = (a) => mul(a, 1 / (len(a) || 1));
const bez = (c, t) => { const u = 1 - t; return add(add(mul(c[0], u * u * u), mul(c[1], 3 * u * u * t)), add(mul(c[2], 3 * u * t * t), mul(c[3], t * t * t))); };
function chord(pts) { const u = [0]; for (let i = 1; i < pts.length; i++) u.push(u[i - 1] + len(sub(pts[i], pts[i - 1]))); return u.map((x) => x / u.at(-1)); }
function gen(pts, u, t1, t2) {
  const A = u.map((t) => [mul(t1, 3 * t * (1 - t) ** 2), mul(t2, 3 * t * t * (1 - t))]);
  let C = [[0, 0], [0, 0]], X = [0, 0];
  const p0 = pts[0], p3 = pts.at(-1);
  u.forEach((t, i) => { C[0][0] += dot(A[i][0], A[i][0]); C[0][1] += dot(A[i][0], A[i][1]); C[1][1] += dot(A[i][1], A[i][1]);
    const tmp = sub(pts[i], bez([p0, p0, p3, p3], t)); X[0] += dot(A[i][0], tmp); X[1] += dot(A[i][1], tmp); });
  C[1][0] = C[0][1]; const det = C[0][0] * C[1][1] - C[0][1] * C[1][0];
  let a1 = det ? (X[0] * C[1][1] - X[1] * C[0][1]) / det : 0, a2 = det ? (C[0][0] * X[1] - C[1][0] * X[0]) / det : 0;
  const L = len(sub(p3, p0)); if (a1 < L * 1e-3 || a2 < L * 1e-3) a1 = a2 = L / 3;
  return [p0, add(p0, mul(t1, a1)), add(p3, mul(t2, a2)), p3];
}
function err(pts, c, u) { let m = 0, k = Math.floor(pts.length / 2); pts.forEach((p, i) => { const d = len(sub(bez(c, u[i]), p)); if (d > m) { m = d; k = i; } }); return [m, k]; }
function rep(pts, c, u) { return u.map((t, i) => { const d1 = [3 * ((1 - t) ** 2) , 0]; // Newton
  const q = bez(c, t), q1 = add(add(mul(sub(c[1], c[0]), 3 * (1 - t) ** 2), mul(sub(c[2], c[1]), 6 * (1 - t) * t)), mul(sub(c[3], c[2]), 3 * t * t));
  const q2 = add(mul(add(sub(c[2], mul(c[1], 2)), c[0]), 6 * (1 - t)), mul(add(sub(c[3], mul(c[2], 2)), c[1]), 6 * t));
  const n = dot(sub(q, pts[i]), q1), dd = dot(q1, q1) + dot(sub(q, pts[i]), q2); return dd ? Math.min(1, Math.max(0, t - n / dd)) : t; }); }
const tan = (i, dir) => { const n = P.length, a = P[(i + n) % n], b = P[(i + dir * 4 + n * 2) % n]; return nrm(sub(b, a)); };
const out = [];
function fit(i0, i1) { // índices en P (i1 puede pasar de n: contorno cerrado)
  const pts = []; for (let i = i0; i <= i1; i++) pts.push(P[i % P.length]);
  const t1 = tan(i0, 1), t2 = tan(i1, -1);
  let u = chord(pts), c = gen(pts, u, t1, t2), [e, k] = err(pts, c, u);
  for (let it = 0; it < 12 && e > TOL && e < TOL * 8; it++) { u = rep(pts, c, u); c = gen(pts, u, t1, t2); [e, k] = err(pts, c, u); }
  if ((e <= TOL && pts.length <= MAXP) || pts.length < 8) { out.push({ i: i0, c }); return; }
  if (e <= TOL) k = Math.floor(pts.length / 2);
  fit(i0, i0 + k); fit(i0 + k, i1);
}
// cortes iniciales: la punta de salida (0) y el extremo de la gota (máximo avance angular)
const a0 = Math.atan2(P[0][1] - 32, P[0][0] - 32);
const U = P.map(([x, y]) => { let a = a0 - Math.atan2(y - 32, x - 32); return (((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / (2 * Math.PI); });
let m = 0; U.forEach((u, i) => { if (u > U[m]) m = i; });
const n = P.length, q = Math.round(n / 4);
[[0, Math.round(m / 2)], [Math.round(m / 2), m], [m, Math.round((m + n) / 2)], [Math.round((m + n) / 2), n]].forEach(([a, b]) => fit(a, b));
const r = (v) => +v.toFixed(2);
const anclas = out.map((s, k) => ({ i: s.i, p: s.c[0].map(r), out: s.c[1].map(r), in: out[(k - 1 + out.length) % out.length].c[2].map(r) }));
const V = anclas.map((a) => (a.i <= m ? a.i / m : 1 - (a.i - m) / (n - m)));
fs.writeFileSync('src/data/isotipo-bezier.json', JSON.stringify({ m, n, anclas: anclas.map((a, k) => ({ ...a, v: +V[k].toFixed(4) })) }));
console.log('anclas', anclas.length, 'm', m, 'n', n);
