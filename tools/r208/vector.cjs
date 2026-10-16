// RONDA 208 (3) · los grosores, exactos: el wordmark de Andoni reconstruido EN VECTORIAL sobre los glifos de Family (tools/r207/palabra-glifos.json),
// en vez de calcado. Lo que él cambió, dibujado con las medidas de la fuente:
//   · las dos v quedan UNIDAS por un solo remate (el derecho de la primera y el izquierdo de la segunda) que se comba un poco a mitad;
//   · por el canto de dentro del brazo grueso de cada v baja la savia y se queda en una GOTA en el fondo; otra gotita bajo el primer remate;
//   · la segunda v pierde su remate derecho: le queda una banderita ondulada a la izquierda y su brazo fino SUBE en curva hasta una bola que es el
//     punto de la i (la i ya no lleva punto propio; la bola es el punto de Family, en su sitio).
// Uso: node tools/r208/vector.cjs [salida.svg] (por defecto, public/savvia-palabra.svg)
const fs = require('fs');
const g = JSON.parse(fs.readFileSync('tools/r207/palabra-glifos.json'));
const OUT = process.argv[2] || 'public/savvia-palabra.svg';
// v sin remates: los dos brazos (de y −427 hacia abajo) como polígono, con la misma geometría que la v de Family
const vBrazos = (dx) => {
  const p = [[762, -427], [853, -427], [977, -95], [1088, -389], [1094, -406], [1090, -416.5], [1086, -427], [1131, -427], [1131, -394], [974, 0], [933, 0]];
  return 'M' + p.map(([x, y]) => `${x + dx} ${y}`).join('L') + 'Z';
};
// la v de Family del ejemplo trae el brazo fino con su curva de remate (1088,−389 → 1068,−427); la versión sin remate cierra el brazo recto:
// la v sin remates: sus dos brazos rectos hasta −427 (prolongando los cantos de Family: el fino, de 977,−95→1088,−389 y 974,0→1131,−394)
const v = (dx) => `M${977 + dx} -95L${1107 + dx} -440H${1149 + dx}L${974 + dx} 0H${933 + dx}L${757 + dx} -440H${848 + dx}Z`; // hasta −440: se mete 13 en el remate (sin costura)
// remate recto (Family), de x0 a x1; con `combo`, la cara de abajo se COMBA un poco a mitad (la barra que une las dos v cede como una rama)
const remate = (x0, x1, combo = 0) => combo
  ? `M${x0} -462H${x1}V-427C${x1 - (x1 - x0) * 0.3} -427 ${x0 + (x1 - x0) * 0.62} ${-427 + combo} ${x0 + (x1 - x0) * 0.45} ${-427 + combo}C${x0 + (x1 - x0) * 0.25} ${-427 + combo} ${x0 + (x1 - x0) * 0.1} -427 ${x0} -427Z`
  : `M${x0} -462H${x1}V-427H${x0}Z`;
// la savia que baja por el canto de dentro del brazo grueso y se queda en el fondo de la v, en una gota
const gota = (dx) => `M${896 + dx} -282Q${932 + dx} -236 ${934 + dx} -196A18 18 0 1 0 ${970 + dx} -192Q${962 + dx} -214 ${920 + dx} -218Z`; // nace dentro del brazo (sin costura) y cuelga donde la v ya se abre // donde la v ya se abre (con el brazo de Family, junto al vértice no cabe)
// la gotita bajo el remate izquierdo de la primera v, pegada al brazo por fuera
const gotita = `M${741} -427Q${745} -411 ${743} -399A12 12 0 1 0 ${766} -401L${763} -427Z`;
const D2 = 496; // la segunda v está 496 unidades a la derecha de la primera en la palabra de Family
const bola = { x: 1806, y: -622, r: 58 }; // el punto de la i de Family
// el brazo fino de la segunda v sigue subiendo: arranca con su inclinación y se curva hacia la bola (ancho del brazo fino de Family, ~38 en horizontal)
const brazo = `M${1102 + D2} -427C${1132 + D2} -505 ${1212 + D2} -598 ${1254 + D2} -650L${1290 + D2} -628C${1252 + D2} -585 ${1172 + D2} -500 ${1144 + D2} -427Z`;
// la banderita: lo que queda del remate derecho, a la izquierda del brazo, que sube en curva hasta fundirse con él
const bandera = `M${1034 + D2} -462H${1060 + D2}Q${1096 + D2} -462 ${1116 + D2} -474L${1128 + D2} -436Q${1098 + D2} -427 ${1060 + D2} -427H${1034 + D2}Z`;
const partes = [
  g[0], g[1] + g[2],                    // s, a
  v(0), v(D2),                          // las dos v sin remate derecho
  remate(713, 923), remate(1028, 1419, 9), // remate izquierdo de la primera y el que une las dos
  bandera, brazo, gotita,
  gota(0), gota(D2),
  g[6], g[7] + g[8],                    // palo de la i y la última a
];
const circulo = `M${bola.x - bola.r} ${bola.y}A${bola.r} ${bola.r} 0 1 0 ${bola.x + bola.r} ${bola.y}A${bola.r} ${bola.r} 0 1 0 ${bola.x - bola.r} ${bola.y}Z`;
fs.writeFileSync(OUT, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11 -689 2373 707" width="2373" height="707">${partes.map((d) => `<path fill="white" d="${d}"/>`).join('')}<path fill="white" d="${circulo}"/></svg>`);
console.log('ok', OUT);
