// Ronda 154 · «mover la v de la izquierda un poco más a la izquierda»: desplaza en x el subtrazado de la primera v del logotipo.
const fs = require('fs'), f = process.argv[2], DX = +process.argv[3], K = +(process.argv[4] || 3);
const s = fs.readFileSync(f, 'utf8'), d = s.match(/ d="([^"]+)"/)[1];
const tok = (p) => p.match(/[A-Za-z]|-?[\d.]+/g);
const mover = (p, dx) => { const t = tok(p); let cmd = '', k = 0, o = ''; for (const x of t) { if (/[A-Za-z]/.test(x)) { cmd = x; k = 0; o += x; continue; }
  let v = +x; if (cmd === 'H' || ((cmd === 'M' || cmd === 'L' || cmd === 'Q') && k % 2 === 0)) v += dx; o += (o.at(-1).match(/[A-Za-z]/) ? '' : ' ') + +v.toFixed(2); k++; } return o; };
const rango = (p) => { const t = tok(p); let cmd = '', k = 0, xs = []; for (const x of t) { if (/[A-Za-z]/.test(x)) { cmd = x; k = 0; continue; } if (cmd === 'H' || ((cmd === 'M' || cmd === 'L' || cmd === 'Q') && k % 2 === 0)) xs.push(+x); k++; } return [Math.min(...xs), Math.max(...xs)]; };
const subs = d.split(/(?=M)/);
console.log(subs.map((p, i) => i + ':' + rango(p).map(Math.round).join('–')).join('  '));
if (DX) { subs[K] = mover(subs[K], DX); fs.writeFileSync(f, s.replace(d, subs.join(''))); console.log('movido', K, DX); }
