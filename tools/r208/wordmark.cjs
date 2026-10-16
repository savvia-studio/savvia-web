// RONDA 208 · Andoni (con tools/r208/wordmark-referencia.png, blanco sobre negro): «replica este wordmark y vamos a llevarlo a web para ver cómo queda».
// La palabra en Family con las v retocadas: la savia gotea en el vértice de cada v, remates ondulados y el brazo fino de la segunda v sube hasta
// hacerse el PUNTO de la i. Se CALCA de la imagen (potrace, en el scratch de la sesión: npm potrace 2.1.8) en vez de redibujarla, para que sea fiel:
// recorte a la palabra + 20 px, ×4 con lanczos, desenfoque 1,2, umbral 128 y tolerancia 1. Aquí solo se limpia: coordenadas enteras (en px ×4) y caja ajustada a la tinta.
// Uso: node tools/r208/wordmark.cjs <trazo.svg de potrace>  → public/savvia-palabra.svg
const fs = require('fs');
const src = fs.readFileSync(process.argv[2], 'utf8');
const d = src.match(/ d="([^"]+)"/)[1].replace(/-?\d+\.\d+/g, (n) => String(Math.round(+n)));
// caja de la tinta en el espacio del trazo: margen de 20 px × 4 alrededor de la palabra (944 × 272 px en la referencia)
const M = 80, W = 944 * 4, H = 272 * 4;
fs.writeFileSync('public/savvia-palabra.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${M} ${M} ${W} ${H}" width="${W}" height="${H}"><path fill="white" fill-rule="evenodd" d="${d}"/></svg>`);
console.log('ok', (fs.statSync('public/savvia-palabra.svg').size / 1024).toFixed(1), 'KB · proporción', (W / H).toFixed(4));
