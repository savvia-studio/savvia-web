// El gesto de la S de Herr Von Muellerhoff (T1): el contorno del glifo es un solo trazo (ida por un lado, vuelta por el otro).
// Se muestrea, se buscan las dos puntas (donde el contorno da la vuelta) y se empareja un lado con el otro: línea central + grosor.
// uso: node gesto.cjs → gesto.json (y hacia abajo, unidades de la fuente) + gesto.png (comprobación)
const fs = require('fs');
const { chromium, launchOpts } = require('/Users/andonimart/Desktop/savvia/savvia_inspo/scripts/pw.cjs');
const { d } = JSON.parse(fs.readFileSync(__dirname + '/s-t1.json', 'utf8'));
(async () => {
  const b = await chromium.launch(launchOpts); const p = await b.newPage({ viewport: { width: 1000, height: 1000 } });
  const r = await p.evaluate((d) => {
    const ns = 'http://www.w3.org/2000/svg', s = document.createElementNS(ns, 'svg'), pa = document.createElementNS(ns, 'path');
    pa.setAttribute('d', d); s.append(pa); document.body.append(s);
    const L = pa.getTotalLength(), N = 3000, P = [];
    for (let i = 0; i < N; i++) { const q = pa.getPointAtLength((L * i) / N); P.push([q.x, -q.y]); } // y hacia abajo
    // giro en una ventana: en las puntas el contorno vuelve sobre sí mismo (giro cercano a 180°)
    const w = 25, giro = P.map((_, i) => { const a = P[(i - w + N) % N], c = P[i], e = P[(i + w) % N]; const v1 = [c[0] - a[0], c[1] - a[1]], v2 = [e[0] - c[0], e[1] - c[1]]; const cos = (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2) || 1); return Math.acos(Math.max(-1, Math.min(1, cos))); });
    let i1 = giro.indexOf(Math.max(...giro)); const lejos = (j) => Math.min(Math.abs(j - i1), N - Math.abs(j - i1));
    let i2 = -1, m = -1; giro.forEach((g, j) => { if (lejos(j) > N * 0.2 && g > m) { m = g; i2 = j; } });
    if (i1 > i2) [i1, i2] = [i2, i1];
    const A = P.slice(i1, i2 + 1), B = [...P.slice(i2), ...P.slice(0, i1 + 1)].reverse(); // los dos lados, de la punta 1 a la punta 2
    const acum = (Q) => { const o = [0]; for (let i = 1; i < Q.length; i++) o.push(o[i - 1] + Math.hypot(Q[i][0] - Q[i - 1][0], Q[i][1] - Q[i - 1][1])); return o; };
    const en = (Q, La, t) => { const s = t * La[La.length - 1]; let i = La.findIndex((v) => v >= s); if (i <= 0) return Q[0]; const u = (s - La[i - 1]) / (La[i] - La[i - 1] || 1); return [Q[i - 1][0] + (Q[i][0] - Q[i - 1][0]) * u, Q[i - 1][1] + (Q[i][1] - Q[i - 1][1]) * u]; };
    const LA = acum(A), LB = acum(B), C = [], W = [];
    for (let k = 0; k <= 200; k++) { const a = en(A, LA, k / 200), bb = en(B, LB, k / 200); C.push([(a[0] + bb[0]) / 2, (a[1] + bb[1]) / 2]); W.push(0); }
    for (let k = 0; k < C.length; k++) { let m = 1e9; for (const q of P) { const dd = Math.hypot(q[0] - C[k][0], q[1] - C[k][1]); if (dd < m) m = dd; } W[k] = 2 * m; }
    return { C, W, tips: [P[i1], P[i2]] };
  }, d);
  fs.writeFileSync(__dirname + '/gesto.json', JSON.stringify(r));
  const pl = r.C.map((q) => q.join(' ')).join(' L');
  await p.setContent(`<svg viewBox="-260 -780 1020 900" width="1000" height="880" style="background:#fff"><path d="${d}" transform="scale(1,-1)" fill="#ccc"/><path d="M${pl}" fill="none" stroke="red" stroke-width="3"/>${r.C.filter((_, i) => i % 20 == 0).map((q, i) => `<circle cx="${q[0]}" cy="${q[1]}" r="${r.W[i * 20] / 2}" fill="none" stroke="blue"/>`).join('')}${r.tips.map((t) => `<circle cx="${t[0]}" cy="${t[1]}" r="10" fill="green"/>`).join('')}</svg>`);
  await p.screenshot({ path: __dirname + '/gesto.png' }); await b.close();
  console.log('ancho max', Math.max(...r.W).toFixed(1), 'puntas', r.tips.map((t) => t.map(Math.round)));
})();
