// RONDA 307, 25.ª · Andoni: «firma: modificar la copa del árbol para que sea un solo trazo continuo, pero que parezca hecho a mano». La copa de la
// rúbrica del Manifiesto (tools/firma/rubrica-copa.cjs, «Abierta por abajo», de Eric) con un temblor de pulso suave (ruido de baja frecuencia en el
// recorrido y en el grosor) → public/descargas/savvia-firma-trazos.png (150 × 93, 2× de los 75 × 47 de la firma). La de antes: tools/retirados/.
const fs = require('fs'), path = require('path'), sharp = require('sharp');
const fuente = fs.readFileSync(path.join(__dirname, 'rubrica-copa.cjs'), 'utf8');
const sin = fuente.split("\nconst s = svg(V[0])")[0]; // las definiciones (V, curva, pincel, svg), sin escribir rubrica.svg
const m = {}; new Function('module', 'require', sin + '\nmodule.svg = svg; module.V = V; module.curva = curva;')(m, require);
// el temblor: desplaza cada punto de control un poco (semilla fija) para que el arco no sea perfecto, como a pulso
let sem = 7; const azar = () => ((sem = (sem * 16807) % 2147483647) / 2147483647) - 0.5;
const v = { ...m.V[0], copa: m.V[0].copa.map(([x, y], i, a) => (i === 0 || i === a.length - 1 ? [x, y] : [x + azar() * 2.4, y + azar() * 1.8])) };
const svg = m.svg(v).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="195" ');
fs.writeFileSync(path.join(__dirname, 'firma-trazos-copa.svg'), svg + '\n');
sharp(Buffer.from(svg)).resize(150, 93, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(__dirname, '../../public/descargas/savvia-firma-trazos.png')).then(() => console.log('savvia-firma-trazos.png'));
