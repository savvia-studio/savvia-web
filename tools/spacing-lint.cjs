// Comprueba que las utilidades de espaciado usan SOLO los pasos de DESIGN.md.
const fs = require('fs'), path = require('path');
const OK = new Set(['0', 'px', '1', '2', '3', '4', '6', '8', '12', '14', '16', '24', '32', 'auto', 'full']);
const RE = /(?<![\w-])-?(?:p|m|gap|space|inset|top|right|bottom|left)(?:[xytrblse]|-[xy])?-(\d+(?:\.\d+)?)(?![\w/])/g;
let bad = 0;
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|css|ts)$/.test(f))
      fs.readFileSync(p, 'utf8').split('\n').forEach((l, i) => {
        for (const m of l.matchAll(RE)) if (!OK.has(m[1])) { bad++; console.log(`${p}:${i + 1}  ${m[0]}`); }
      });
  }
})('src');
console.log(bad ? `${bad} pasos fuera de escala` : 'espaciado: todo en escala');
process.exit(bad ? 1 : 0);
