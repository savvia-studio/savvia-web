// Saca la línea central de cada «S» de Calligrapher.ai (el trazo llega como contorno: ida por un lado, vuelta por el otro)
// y la normaliza a 1000 de alto con la base en y = 0. uso: node proceso.cjs eses.json centros.json
const fs = require('fs');
const [IN, OUT] = process.argv.slice(2);
const pts = (d) => { const n = (d.match(/-?\d+(\.\d+)?/g) || []).map(Number); const o = [[n[0], n[1]]]; for (let i = 2; i + 5 < n.length; i += 6) o.push([n[i + 4], n[i + 5]]); return o; };
const centro = (P) => {
  // el punto de giro: el más alejado del inicio a lo largo del contorno (la punta final del trazo)
  const n = P.length; let L = [0]; for (let i = 1; i < n; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const tot = L[n - 1]; const at = (s) => { let i = L.findIndex((v) => v >= s); if (i <= 0) return P[0]; const t = (s - L[i - 1]) / (L[i] - L[i - 1] || 1); return [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * t, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * t]; };
  const m = 80, C = [], W = [];
  for (let k = 0; k <= m; k++) { const a = at((tot / 2) * (k / m)), b = at(tot - (tot / 2) * (k / m)); C.push([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]); W.push(Math.hypot(a[0] - b[0], a[1] - b[1])); }
  return { C, W };
};
const datos = JSON.parse(fs.readFileSync(IN, 'utf8')).map((e, i) => {
  const trazos = e.d.map((d) => centro(pts(d)));
  const todos = trazos.flatMap((t) => t.C);
  const y0 = Math.min(...todos.map((p) => p[1])), y1 = Math.max(...todos.map((p) => p[1])), x0 = Math.min(...todos.map((p) => p[0]));
  const k = 1000 / (y1 - y0);
  return { id: i, st: e.st, bias: e.bias, trazos: trazos.map((t) => t.C.map((p) => [+((p[0] - x0) * k).toFixed(1), +((p[1] - y1) * k).toFixed(1)])) };
});
fs.writeFileSync(OUT, JSON.stringify(datos));
console.log(datos.length, 'trazos por S:', [...new Set(datos.map((d) => d.trazos.length))]);
