// Firma de correo: el roble en un solo trazo, como una rúbrica a rotulador (línea casi constante, que se afila al empezar y al acabar).
// node firma-arbol.cjs <salida.png> <andoni|eric>
const sharp = require('sharp');
const SALIDA = process.argv[2];
const W = 362, H = 180;
// puntos de paso: suelo → tronco → copa (lóbulo izquierdo, cima, lóbulo derecho) → bucle → tronco → cola que sube
// un trazo por persona: el mismo roble, dibujado a su manera
const TRAZOS = {
  // Andoni: copa ancha y baja, un bucle junto a la rama derecha, cola que sube
  andoni: { sesgo: 0.12, K: [[0,166],[44,159],[104,165],[140,156],[150,128],[136,100],[104,96],[76,78],[82,48],[114,30],[152,22],[192,12],[234,22],
    [272,32],[296,62],[280,92],[246,100],[218,86],[212,64],[240,56],[250,84],[224,108],[202,130],[202,158],[230,170],[292,160],[356,126]] },
  // Eric: empieza con un gancho, copa en un óvalo con una espiral dentro, y remata con un subrayado que vuelve hacia atrás
  eric: { sesgo: 0.06, K: [[12,150],[0,166],[40,166],[108,162],[138,150],[148,120],[142,92],[108,88],[84,62],[98,28],[140,10],[200,8],[250,22],
    [276,52],[262,84],[226,96],[192,86],[170,62],[186,40],[214,40],[226,62],[208,76],[194,64],[194,92],[188,124],[198,156],[262,166],[336,150],[356,138],[300,152]] },
};
const { sesgo: SESGO, K: K0 } = TRAZOS[process.argv[3] || 'andoni'];
// cursiva: la rúbrica se inclina a la derecha y se reencaja al ancho
const xs = K0.map(([x, y]) => x + (H - y) * SESGO), x0 = Math.min(...xs), x1 = Math.max(...xs);
const K = K0.map(([x, y], i) => [3 + (xs[i] - x0) / (x1 - x0) * (W - 6), y]);
const P = [];
for (let i = 0; i < K.length - 1; i++) {
  const p0 = K[Math.max(0, i - 1)], p1 = K[i], p2 = K[i + 1], p3 = K[Math.min(K.length - 1, i + 2)];
  for (let s = 0; s < 24; s++) { const t = s / 24, t2 = t * t, t3 = t2 * t;
    P.push([0, 1].map(j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3))); }
}
P.push(K[K.length - 1]);
let seg = '';
for (let i = 1; i < P.length; i++) {
  const [x0, y0] = P[i - 1], [x1, y1] = P[i], u = i / P.length;
  const w = 6.2 * (0.86 + 0.14 * Math.sin(u * 23)) * (0.3 + 0.7 * Math.min(1, u * 14, (1 - u) * 5));
  seg += `<line x1="${x0.toFixed(2)}" y1="${y0.toFixed(2)}" x2="${x1.toFixed(2)}" y2="${y1.toFixed(2)}" stroke-width="${w.toFixed(2)}"/>`;
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><g stroke="#2A1A14" stroke-linecap="round" fill="none">${seg}</g></svg>`;
sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(SALIDA).then((i) => console.log(i.width, i.height, i.size));
