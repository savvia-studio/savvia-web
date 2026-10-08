// RONDA 139 · el isotipo con raíces de Andoni (~/Desktop/savvia-isotipo.svg) → isotipo, logotipo, favicon e icono de iPhone.
// node tools/r139/isotipo.cjs [desplazamiento de las letras]
const fs = require('fs'), path = require('path'), sharp = require('sharp');
const R = (p) => path.join(__dirname, '..', '..', p);
const fuente = fs.readFileSync(path.join(__dirname, 'fuente-isotipo.svg'), 'utf8');
const ISO = [...fuente.matchAll(/id="([^"]+)" d="([^"]+)"/g)].map((m) => ({ id: m[1], d: m[2].replace(/\s+/g, ' ').trim() }));
// la caja del isotipo (la forma va de 13,8·10,6 a 558·660,6; 3 unidades de aire)
const VB = { x: 10, y: 7, w: 552, h: 657 };
const pathsIso = (attrs = '') => ISO.map((p) => `<path id="${p.id}" d="${p.d}"${attrs}/>`).join('\n  ');
// 1 · el isotipo (blanco: se usa como máscara y su trazo lo lee la carga)
fs.writeFileSync(R('public/savvia-isotipo.svg'), `<svg width="${VB.w}" height="${VB.h}" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}" fill="none" xmlns="http://www.w3.org/2000/svg">\n<g fill="white">\n  ${pathsIso()}\n</g>\n</svg>\n`);
// 2 · el logotipo: el isotipo nuevo en el sitio del anterior (de 6 a 435 de alto en 439) y las letras tal cual, desplazadas para guardar el
// mismo hueco óptico entre la v y la «s» que tenía el anterior (82 unidades, medido fila a fila)
const viejo = fs.readFileSync(R('tools/retirados/savvia-logo.r138.svg'), 'utf8');
const letras = [...viejo.matchAll(/<path d="([^"]+)" fill="([^"]+)"\/>/g)].slice(1);
const K = 0.66, IX = 6, IY = 4; // la caja del isotipo en el logotipo
const DX = +(process.argv[2] ?? -14.5);
const ancho = Math.ceil(1184 + DX);
const isoLogo = `<g transform="translate(${IX} ${IY}) scale(${K}) translate(${-VB.x} ${-VB.y})" fill="#EADDE7">\n  ${pathsIso()}\n</g>`;
const letrasLogo = `<g transform="translate(${DX} 0)">\n${letras.map((m) => `<path d="${m[1]}" fill="${m[2]}"/>`).join('\n')}\n</g>`;
fs.writeFileSync(R('public/savvia-logo.svg'), `<svg width="${ancho}" height="439" viewBox="0 0 ${ancho} 439" fill="none" xmlns="http://www.w3.org/2000/svg">\n${isoLogo}\n${letrasLogo}\n</svg>\n`);
// 3 · favicon: Rosa niebla sobre Cacao, radio 14, el isotipo engordado (trazo del mismo color) para que se lea a 16–32 px
const fav = (tam, radio, margen, trazo) => {
  const k = (tam - 2 * margen) / VB.h, ox = (tam - VB.w * k) / 2, oy = margen;
  return `<svg width="${tam}" height="${tam}" viewBox="0 0 ${tam} ${tam}" xmlns="http://www.w3.org/2000/svg"><rect width="${tam}" height="${tam}"${radio ? ` rx="${radio}"` : ''} fill="#302018"/><g transform="translate(${ox.toFixed(2)} ${oy.toFixed(2)}) scale(${k.toFixed(5)}) translate(${-VB.x} ${-VB.y})" fill="#ECDDEB" stroke="#ECDDEB" stroke-width="${trazo}" stroke-linejoin="round">${ISO.map((p) => `<path d="${p.d}"/>`).join('')}</g></svg>`;
};
fs.writeFileSync(R('public/favicon.svg'), fav(64, 14, 4, 16) + '\n');
sharp(Buffer.from(fav(180, 0, 22, 10))).png().toFile(R('public/apple-touch-icon.png')).then(() => console.log('ok', { ancho, DX }));
