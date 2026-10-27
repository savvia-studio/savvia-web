// RONDA 307, 26.ª · Andoni: «el trazo de la firma es demasiado perfecto: tiene que parecer hecho por un humano». La misma copa de un trazo (la de Eric) pero
// trazada como a pulso: el recorrido se desvía con ruido de baja frecuencia, la presión sube y baja (no solo en las puntas), el arco no es simétrico,
// el final se pasa un poco y se vuelve sobre sí (el gesto de cerrar deprisa), y el tronco tiembla. Salida: public/descargas/savvia-firma-trazos.png
const fs = require('fs'), path = require('path'), sharp = require('sharp');
const fuente = fs.readFileSync(path.join(__dirname, 'rubrica-copa.cjs'), 'utf8').split("\nconst s = svg(V[0])")[0];
const m = {}; new Function('module', 'require', fuente + '\nmodule.V = V; module.curva = curva; module.TRONCO = TRONCO; module.RAMA = RAMA;')(m, require);
const SEM = +(process.argv[2] || 23); // 23: la elegida (la del centro arriba de seis)
let sem = SEM; const azar = () => ((sem = (sem * 16807) % 2147483647) / 2147483647) - 0.5;
// ruido suave (suma de senos con fases al azar): la mano no tiembla a cada punto, deriva
const deriva = (n, amp) => { const f = [0.7, 1.9, 4.3].map((k) => [k, azar() * 6.28, 0.3 + Math.random() * 0]); return (t) => f.reduce((s, [k, ph], i) => s + Math.sin(t * k * 6.28 + ph) * amp / (i + 1), 0); };
function trazo(p, w, opc) {
  const c = m.curva(p, 260), N = c.length, dn = deriva(N, opc.desvio), dp = deriva(N, 1);
  const a = [], b = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1), q = c[Math.min(N - 1, i + 1)], o = c[Math.max(0, i - 1)];
    let dx = q[0] - o[0], dy = q[1] - o[1]; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    const off = dn(t); const x = c[i][0] - dy * off, y = c[i][1] + dx * off;
    // presión: entra rápida y fina, se apoya a ratos, se levanta al final (con algo de arrastre)
    const pres = Math.max(0.12, (0.35 + 0.65 * Math.min(1, t / opc.entra)) * (0.25 + 0.75 * Math.min(1, (1 - t) / opc.sale)) * (1 + 0.32 * dp(t)));
    const g = (w / 2) * pres;
    a.push(`${(x - dy * g).toFixed(2)},${(y + dx * g).toFixed(2)}`); b.unshift(`${(x + dy * g).toFixed(2)},${(y - dx * g).toFixed(2)}`);
  }
  return `<polygon points="${a.concat(b).join(' ')}"/>`;
}
// la copa: los puntos de Eric movidos a mano (más ancha por la derecha, la izquierda más baja) y un final que se pasa y vuelve
const copa = m.V[0].copa.map(([x, y], i, arr) => [x + azar() * 4.5 + (x > 70 ? 2 : -1), y + azar() * 3.5 + (i < 3 ? 2 : 0)]);
const [ux, uy] = copa[copa.length - 1]; copa.push([ux - 7, uy + 1.5], [ux - 10, uy - 1.5]);
const tronco = m.TRONCO.p.map(([x, y]) => [x + azar() * 2.2, y + azar() * 1.8]);
const rama = m.RAMA.p.map(([x, y]) => [x + azar() * 2, y + azar() * 2]);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="195" viewBox="-6 -8 166 108" fill="#1e1714">${trazo(copa, 3.6, { desvio: 1.6, entra: 0.06, sale: 0.16 })}${trazo(tronco, 4.4, { desvio: 1.1, entra: 0.1, sale: 0.3 })}${trazo(rama, 2.3, { desvio: 0.6, entra: 0.25, sale: 0.4 })}</svg>`;
const out = process.argv[3] || path.join(__dirname, '../../public/descargas/savvia-firma-trazos.png');
fs.writeFileSync(out.replace(/\.png$/, '.svg'), svg + '\n');
sharp(Buffer.from(svg)).resize(150, 93, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out).then(() => console.log(out));
