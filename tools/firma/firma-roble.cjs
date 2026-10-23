// Firma: el roble de la casa en gris tenue, pequeño, y UNA línea fina que dibuja ese roble: el suelo, el tronco con su inclinación, una rama,
// la copa en lóbulos (ancha y baja, como un roble) y baja por el otro lado del tronco hasta el suelo. Una variante por persona.
// node firma-roble.cjs <salida.png> <andoni|eric> [solo-arbol]
const sharp = require('sharp'), path = require('path');
const [, , SALIDA, QUIEN = 'andoni', GUIA] = process.argv;
const W = 480, H = 300;
const CAJA = { x: 96, y: 74, w: 300, h: 206 }; // el árbol (proporción de la lámina recortada, ~1,46)
// coordenadas 0..1 de la caja del árbol
const T = {
  andoni: 'M -.22 .995 C .12 1.0 .30 .99 .42 .985 C .50 .90 .47 .76 .52 .66 C .55 .60 .54 .56 .52 .52 C .44 .46 .30 .46 .18 .41 C .10 .38 .05 .34 .02 .28 C .06 .16 .18 .08 .30 .11 C .38 .01 .56 -.02 .65 .07 C .77 .03 .92 .12 .97 .27 C .88 .37 .74 .39 .64 .45 C .60 .48 .58 .51 .57 .55 C .58 .44 .62 .31 .68 .22 C .72 .14 .81 .16 .78 .23 C .75 .29 .67 .26 .70 .19',
  eric: 'M .03 .31 C .07 .17 .20 .08 .33 .11 C .42 .02 .60 .01 .68 .09 C .80 .07 .92 .17 .93 .31 C .83 .39 .71 .42 .61 .49 C .53 .54 .41 .47 .30 .45 C .21 .44 .15 .41 .12 .35 C .09 .28 .17 .24 .20 .30 C .22 .35 .17 .39 .13 .37 C .28 .51 .44 .52 .51 .63 C .55 .74 .49 .88 .45 .985 C .60 1.0 .86 .99 1.12 .975',
};
const d = T[QUIEN].replace(/(-?\d*\.\d+|-?\d+)\s+(-?\d*\.\d+|-?\d+)/g, (m, x, y) => `${(CAJA.x + x * CAJA.w).toFixed(1)} ${(CAJA.y + y * CAJA.h).toFixed(1)}`);
(async () => {
  const lam = await sharp(path.join(__dirname, 'arbol-otono.png')).trim({ threshold: 1 }).toBuffer();
  const arbol = await sharp(lam).resize(CAJA.w, CAJA.h, { fit: 'fill' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  // gris lavado (solo el color; el alfa, al 34 %)
  for (let i = 0; i < arbol.data.length; i += 4) { const g = 0.299 * arbol.data[i] + 0.587 * arbol.data[i + 1] + 0.114 * arbol.data[i + 2], v = Math.round(g * 0.55 + 110);
    arbol.data[i] = arbol.data[i + 1] = arbol.data[i + 2] = v; arbol.data[i + 3] = Math.round(arbol.data[i + 3] * 0.34); }
  const tenue = await sharp(arbol.data, { raw: { width: arbol.info.width, height: arbol.info.height, channels: 4 } }).png().toBuffer();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><path d="${d}" fill="none" stroke="#1E1714" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const capas = [{ input: tenue, left: CAJA.x, top: CAJA.y }];
  if (GUIA !== 'solo-arbol') capas.push({ input: Buffer.from(svg), left: 0, top: 0 });
  await sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).composite(capas).png({ palette: true, colors: 64, compressionLevel: 9 }).toFile(SALIDA);
  console.log(SALIDA);
})();
