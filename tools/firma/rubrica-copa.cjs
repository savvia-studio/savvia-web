// La rúbrica del Manifiesto (ronda 296, Eric): la de Andoni con la copa en UN trazo abierto («Abierta por abajo», 1/5 del artefacto «Rúbrica de
// una copa»). Vector rehecho sobre public/descargas/savvia-firma-trazos.png (150 × 93). Salida: public/media/manifiesto/rubrica.svg
// Uso: node tools/firma/rubrica-copa.cjs
const fs = require('fs'), path = require('path');
const TRONCO = { p: [[50, 29], [57, 38], [62, 50], [55, 64], [40, 78], [31, 88], [42, 92], [80, 90], [120, 83], [152, 74]], w: 4.2, ini: 0.12, fin: 0.3, pico: 0.5 };
const RAMA = { p: [[61, 40], [76, 34], [93, 30]], w: 2.1, ini: 0.25, fin: 0.35 };
const V = [
  { n: 'Abierta por abajo', nota: 'La misma copa, de un solo trazo: sale de la izquierda, da la vuelta por arriba y se cierra casi en el tronco.', copa: [[46, 48], [20, 46], [3, 38], [6, 22], [26, 10], [62, 2], [104, 0], [138, 9], [143, 27], [128, 41], [100, 46], [76, 47]] },
  { n: 'Al revés', nota: 'El mismo círculo, pero empezando por la derecha: el trazo entra fino y acaba con fuerza a la izquierda.', copa: [[78, 47], [106, 45], [132, 38], [143, 22], [128, 6], [92, 0], [50, 4], [16, 14], [2, 32], [14, 45], [44, 48]], fuerte: 'fin' },
  { n: 'Redonda, que se pasa', nota: 'Más redonda y el final cruza su propio arranque, como cuando cierras un círculo deprisa.', copa: [[58, 46], [26, 46], [6, 34], [10, 14], [40, 2], [86, 0], [126, 6], [142, 22], [130, 40], [96, 47], [60, 45], [40, 40]] },
  { n: 'Abierta arriba', nota: 'Se cierra por abajo y deja el hueco arriba a la izquierda, donde la de ahora tiene el corte entre los dos arcos.', copa: [[40, 10], [16, 16], [2, 32], [12, 45], [46, 48], [78, 47], [112, 44], [138, 34], [142, 15], [120, 3], [86, 0], [62, 3]] },
  { n: 'Del tronco a la copa', nota: 'Un solo gesto: el trazo de la copa nace en la punta del tronco y da la vuelta entera.', copa: [[50, 29], [38, 40], [12, 44], [2, 30], [14, 12], [50, 2], [98, 0], [136, 8], [143, 26], [124, 42], [90, 47], [72, 47]], sinCabeza: true },
];
// Catmull-Rom y un trazo de pincel: grueso en medio, fino en las puntas
function curva(p, n = 160) {
  const r = [];
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], d = p[i + 2] || c;
    for (let k = 0; k < n / (p.length - 1); k++) {
      const t = k / (n / (p.length - 1)), t2 = t * t, t3 = t2 * t;
      r.push([0, 1].map((j) => 0.5 * (2 * b[j] + (-a[j] + c[j]) * t + (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * t2 + (-a[j] + 3 * b[j] - 3 * c[j] + d[j]) * t3)));
    }
  }
  r.push(p[p.length - 1]);
  return r;
}
const suave = (x) => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);
function pincel(tr, hasta = 1) {
  const c = curva(tr.p), N = c.length, M = Math.max(2, Math.round(N * hasta));
  const arr = [], ab = [];
  for (let i = 0; i < M; i++) {
    const t = i / (N - 1), [x, y] = c[i], q = c[Math.min(N - 1, i + 1)], o = c[Math.max(0, i - 1)];
    let dx = q[0] - o[0], dy = q[1] - o[1]; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    const g = (tr.w / 2) * (0.25 + 0.75 * suave(t / tr.ini)) * (0.12 + 0.88 * suave((1 - t) / tr.fin)) * (1 + 0.12 * Math.sin(t * 9)) * (tr.pico ? 1 + 0.45 * Math.exp(-((t - tr.pico) ** 2) / 0.012) : 1);
    arr.push(`${(x - dy * g).toFixed(2)},${(y + dx * g).toFixed(2)}`); ab.unshift(`${(x + dy * g).toFixed(2)},${(y - dx * g).toFixed(2)}`);
  }
  return `<polygon points="${arr.concat(ab).join(' ')}"/>`;
}
const trazos = (v) => [{ p: v.copa, w: 3.3, ini: v.fuerte === 'fin' ? 0.4 : 0.1, fin: v.fuerte === 'fin' ? 0.08 : 0.22 }, v.sinCabeza ? { ...TRONCO, ini: 0.02 } : TRONCO, RAMA];
function svg(v, k = 1) {
  // orden del dibujo: copa, tronco con su subrayado, rama
  const ts = trazos(v), L = ts.length, partes = ts.map((t, i) => { const a = i / L, p = Math.min(1, Math.max(0, (k - a) * L)); return p > 0 ? pincel(t, p) : ''; });
  return `<svg viewBox="-4 -6 160 104" fill="#1e1714" >${partes.join('')}</svg>`;
}

const s = svg(V[0]).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="104" ');
fs.writeFileSync(path.join(__dirname, '../../public/media/manifiesto/rubrica.svg'), s + '\n');
console.log('rubrica.svg', s.length);
