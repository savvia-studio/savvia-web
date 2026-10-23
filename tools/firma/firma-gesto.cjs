// Firma (23/10, 3.ª · Andoni: «el árbol en blanco y negro más pequeño y pegado a la izquierda; la firma, más estilo el ejemplo, pero que se vea
// que son líneas que generan el roble; Eric y yo, la misma»). El gesto del ejemplo (arcos largos que se cruzan, un bucle, un quiebro y una S),
// dibujando un roble: la copa ancha y baja hecha de dos arcos con lóbulos, una rama que entra, una bellota en bucle, la horquilla en quiebro, el
// tronco en S con su torsión y el pie que se abre en raíces sobre el suelo. Encima del roble pequeño, que hace de sombra.
// node firma-gesto.cjs <salida.png> [solo-arbol|guia]
const sharp = require('sharp'), path = require('path');
const [, , SALIDA, MODO] = process.argv;
const W = 312, H = 222;
const CAJA = { x: 2, y: 14, w: 300, h: 205 }; // el roble pequeño, pegado a la izquierda; las líneas van encima, a su escala
// trazos en coordenadas 0..1 de la caja del roble, sobre SU estructura: vientre de la copa, copa en lóbulos, rama que sube de la horquilla,
// una bellota en bucle en la rama derecha, la horquilla en quiebro, el tronco en S y las raíces sobre el suelo
const N = [
  'M .02 .36 C .20 .52 .40 .60 .55 .56 C .70 .52 .86 .40 .98 .26',
  'M .14 .22 C .26 .04 .48 -.02 .62 .08 C .74 .00 .90 .08 .94 .22',
  'M .36 .10 C .36 .30 .46 .46 .58 .56',
  'M .80 .46 C .72 .42 .70 .30 .78 .26 C .86 .22 .92 .32 .86 .38 C .82 .42 .76 .40 .76 .36',
  'M .66 .58 L .50 .66 C .60 .70 .66 .78 .60 .86 C .56 .92 .50 .96 .44 .99',
  'M .44 .99 C .30 .995 .16 1.0 .03 1.0 M .44 .99 C .56 1.0 .74 .995 .94 .99',
];
const D = N.map((t) => t.replace(/(-?\d*\.\d+|-?\d+)\s+(-?\d*\.\d+|-?\d+)/g, (m, x, y) => `${(CAJA.x + x * CAJA.w).toFixed(1)} ${(CAJA.y + y * CAJA.h).toFixed(1)}`));
(async () => {
  const lam = await sharp(path.join(__dirname, 'arbol-otono.png')).trim({ threshold: 1 }).toBuffer();
  const ar = await sharp(lam).resize(CAJA.w, CAJA.h, { fit: 'fill' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < ar.data.length; i += 4) { const g = 0.299 * ar.data[i] + 0.587 * ar.data[i + 1] + 0.114 * ar.data[i + 2], v = Math.round(g * 0.6 + 96);
    ar.data[i] = ar.data[i + 1] = ar.data[i + 2] = v; ar.data[i + 3] = Math.round(ar.data[i + 3] * 0.42); }
  const tenue = await sharp(ar.data, { raw: { width: CAJA.w, height: CAJA.h, channels: 4 } }).png().toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><g fill="none" stroke="#1E1714" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${D.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`;
  const capas = [{ input: tenue, left: CAJA.x, top: CAJA.y }];
  if (MODO !== 'solo-arbol') capas.push({ input: Buffer.from(svg), left: 0, top: 0 });
  await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(capas).png({ palette: true, colors: 64, compressionLevel: 9 }).toFile(SALIDA);
  console.log(SALIDA);
})();
