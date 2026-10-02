// RONDA 95 · mide el alfa de las tiras y de la pose final (cajas por celda) para alinear la llegada
const sharp = require('sharp');
const D = __dirname + '/fundadores/';
(async () => {
  for (const f of ['andoni-secuencia.png', 'eric-secuencia.png', 'juntos.png']) {
    const { data, info } = await sharp(D + f).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, al = (x, y) => data[(y * W + x) * 4 + 3];
    const caja = (x0, x1) => { let a = 1e9, b = -1, c = 1e9, d = -1; for (let y = 0; y < H; y++) for (let x = x0; x < x1; x++) if (al(x, y) > 20) { a = Math.min(a, x - x0); b = Math.max(b, x - x0); c = Math.min(c, y); d = Math.max(d, y); } return { x: [a, b], y: [c, d], cx: (a + b) / 2 }; };
    if (W === 3000) for (let k = 0; k < 5; k++) console.log(f, k, JSON.stringify(caja(k * 600, k * 600 + 600)));
    else { console.log(f, W, H, JSON.stringify(caja(0, W))); const occ = []; for (let x = 540; x < 660; x += 6) { let n = 0; for (let y = 0; y < H; y++) if (al(x, y) > 20) n++; occ.push(x + ':' + n); } console.log(occ.join(' ')); }
  }
})();
