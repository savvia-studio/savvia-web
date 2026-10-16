// RONDA 207 · Andoni: «trabajar el wordmark de savvia haciéndole alguna ligera modificación y que tenga más personalidad» → «modificar las v de alguna
// manera sutil pero que se note». Sobre la palabra de siempre (Family, public/savvia-palabra.svg → tools/retirados/savvia-palabra.r206.svg; sus glifos,
// en palabra-glifos.json: s[0] a[1,2] v[3] v[4] punto de la i[5] i[6] a[7,8]): el brazo FINO de cada v ya no acaba en remate sino en una BOLA (la
// terminación de la v caligráfica del logotipo de Andoni, ronda 10), que rima con el punto de la i. Misma caja (2373 × 707): no cambia el tamaño en
// ningún sitio. Probadas y descartadas: la gota en la i, las vv cruzadas («sawia»), la gota que cuelga del vértice («sayyia»), las v caligráficas enteras.
// Uso: node tools/r207/wordmark.cjs
const fs = require('fs'); const g = JSON.parse(fs.readFileSync('tools/r207/palabra-glifos.json'));
const v1 = g[3].replace('H1028V-462H1193V-427Q1163 -427 1151 -420.5Q1139 -414 1131 -394', 'H1080Q1098 -440 1106 -394');
const v2 = g[4].replace('H1524.0V-462H1689.0V-427Q1659.0 -427 1647.0 -420.5Q1635.0 -414 1627.0 -394', 'H1576Q1594 -440 1602 -394');
if (v1 === g[3] || v2 === g[4]) throw new Error('no se encontró el remate de la v');
const bola = (x) => `M${x - 52} -438A52 52 0 1 0 ${x + 52} -438A52 52 0 1 0 ${x - 52} -438Z`; // r 52: que se note también a 22 px de alto
const d = g[0] + g[1] + g[2] + v1 + v2 + g[5] + g[6] + g[7] + g[8];
// las bolas, en su propio trazo (en el mismo, al solaparse con el brazo, el sentido de giro las agujereaba)
fs.writeFileSync('public/savvia-palabra.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 -689 2373 707" width="2373" height="707"><path fill="white" d="${d}"/><path fill="white" d="${bola(1092)}"/><path fill="white" d="${bola(1588)}"/></svg>`);
console.log('ok');
